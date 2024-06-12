const origin = document.getElementById('origin');
const destination = document.getElementById('destination');
const letsChabak = document.getElementById('letsChabak');
const respChat = document.getElementById('respChat');
const search = document.getElementById('search');
const recommInfo = document.getElementById('recommInfo');

var originPoint = { x: '', y: '' }; // 출발지 좌표
var destinationPoint = { x: '', y: '' }; // 도착지 좌표
var waypointList = [];

//#region Chat GPT

// 사용하는 것은 Chat GPT 의 function calling:
// 기본적인 문자로 반환하는 것도 가능하지만 성공 확률이 100%가 아니다!
// function calling을 통해서 정확도(json 반환) 답변 형식을 정해줘 원하는 형태로 반환 가능
// 답변 예측 가능!

// 발급받은 API키
var apiKey = '';
// OpenAI API 엔드포인트 주소
const apiEndpoint = 'https://api.openai.com/v1/chat/completions';
// GPT 입력용 파라미터
const param = {
  type: 'object',
  properties: {
    recommList: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: '국내 캠핑 & 차박 추천 여행지, 차박 가능 장소명',
          },
          address: {
            type: 'string',
            description: '추천 여행지, 차박 가능 장소의 도로명주소',
          },
          link: {
            type: 'string',
            description:
              '추천 여행지, 차박 가능 장소에 관한 설명, 혹은 추천 이유',
          },
          info: {
            type: 'string',
            description:
              '추천 여행지의 정보를 확인할 수 있는 웹사이트 주소. 존재하지 않을 경우 빈 문자열 반환',
          },
          x: {
            type: 'number',
            description: '추천 여행지, 차박 가능 장소의 x 좌표',
          },
          y: {
            type: 'number',
            description: '추천 여행지, 차박 가능 장소의 y 좌표',
          },
        },
      },
    },
  },
  required: ['recommList'],
};

// ChatGPT API 요청
async function fetchAIResponse() {
  // Chat GPT Key 반환
  await fetch('/returnKey/chatGPTKey')
    .then((resp) => resp.text())
    .then((result) => {
      apiKey = result; // Chat GPT API Key 반환
    });

  // API 요청에 사용할 옵션
  const requestOptions = {
    method: 'POST',
    // API 요청의 헤더를 설정
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    // API 요청 파라미터
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content:
            'presume you are a guide recommending places for car camping',
        },
        {
          role: 'user',
          content: `${origin.value}부터 ${destination.value}까지 차박, 혹은 캠핑을 즐길 수 있는 여행지 루트를 추천해줘`,
        },
      ],
      // 생성할 함수 스키마
      functions: [
        {
          name: 'trip_assistance',
          description: `recommend me some camping spots, or places to camp by car starting from ${origin.value} to ${destination.value}`,
          // 함수 파라미터
          parameters: param,
        },
      ],
      function_call: { name: 'trip_assistance' },
    }),
  };

  // API 요청후 응답 처리
  try {
    const response = await fetch(apiEndpoint, requestOptions);
    const data = await response.json();
    const answ = data.choices[0].message.function_call.arguments;
    return answ;

    // 오류 발생 시
  } catch (error) {
    console.error('OpenAI API 호출 중 오류 발생:', error);
    return 'OpenAI API 호출 중 오류 발생';
  }
}

//#endregion

//#region Kakao Map

var mapContainer = document.getElementById('map'), // 지도를 표시할 div
  mapOption = {
    center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
    level: 3, // 지도의 확대 레벨
  };
var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
// 장소 검색 객체를 생성합니다
var ps = new kakao.maps.services.Places();
// 마커를 담을 배열입니다
var markers = [];
// 출발, 도착지를 담을 마커
var startMarker = null;
var endMarker = null;

// 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

// 키워드 검색을 요청하는 함수입니다
function searchPlaces(keyword) {
  var keyword = document.getElementById('keyword').value;

  if (!keyword.replace(/^\s+|\s+$/g, '')) {
    alert('키워드를 입력해주세요!');
    return false;
  }

  // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
  ps.keywordSearch(keyword, placesSearchCB);
}

// 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
function placesSearchCB(data, status, pagination) {
  if (status === kakao.maps.services.Status.OK) {
    // 정상적으로 검색이 완료됐으면
    // 검색 목록과 마커를 표출합니다
    displayPlaces(data);

    // 페이지 번호를 표출합니다
    displayPagination(pagination);
  } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
    alert('검색 결과가 존재하지 않습니다.');
    return;
  } else if (status === kakao.maps.services.Status.ERROR) {
    alert('검색 결과 중 오류가 발생했습니다.');
    return;
  }
}

// 검색 결과 목록과 마커를 표출하는 함수입니다
function displayPlaces(places) {
  var listEl = document.getElementById('placesList'),
    menuEl = document.getElementById('menu_wrap'),
    fragment = document.createDocumentFragment(),
    bounds = new kakao.maps.LatLngBounds(),
    listStr = '';

  // 검색 결과 목록에 추가된 항목들을 제거합니다
  removeAllChildNods(listEl);

  // 지도에 표시되고 있는 마커를 제거합니다
  removeMarker();

  for (var i = 0; i < places.length; i++) {
    // 마커를 생성하고 지도에 표시합니다
    var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
      marker = addMarker(placePosition, i),
      itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
    // LatLngBounds 객체에 좌표를 추가합니다
    bounds.extend(placePosition);

    // 마커와 검색결과 항목에 mouseover 했을때
    // 해당 장소에 인포윈도우에 장소명을 표시합니다
    // mouseout 했을 때는 인포윈도우를 닫습니다
    (function (marker, title) {
      kakao.maps.event.addListener(marker, 'mouseover', function () {
        displayInfowindow(marker, title);
      });

      kakao.maps.event.addListener(marker, 'mouseout', function () {
        infowindow.close();
      });

      itemEl.onmouseover = function () {
        displayInfowindow(marker, title);
      };

      itemEl.onmouseout = function () {
        infowindow.close();
      };
    })(marker, places[i].place_name);

    fragment.appendChild(itemEl);
  }

  // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
  listEl.appendChild(fragment);

  // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
  map.setBounds(bounds);
}

// 검색결과 항목을 Element로 반환하는 함수입니다
function getListItem(index, places) {
  var el = document.createElement('li'),
    itemStr =
      '<span class="markerbg marker_' +
      (index + 1) +
      '"></span>' +
      '<div class="info">' +
      '   <h5>' +
      places.place_name +
      '</h5>';

  if (places.road_address_name) {
    itemStr +=
      '    <span>' +
      places.road_address_name +
      '</span>' +
      '   <span class="jibun gray">' +
      places.address_name +
      '</span>';
  } else {
    itemStr += '    <span class="address">' + places.address_name + '</span>';
  }

  itemStr += '  <span class="tel">' + places.phone + '</span>' + '</div>';

  itemStr +=
    ' <button class="originBtn">출발</button><button class="destinationBtn">도착</button>';

  el.innerHTML = itemStr;
  el.className = 'item';

  // 출발지 도착지 버튼 클릭시 origin destination 값 재설정
  el.querySelector('.originBtn').addEventListener('click', () => {
    origin.value = places.address_name;

    startMarker?.setMap(null);
    startMarker = new kakao.maps.Marker({
      position: markers[index].getPosition(),
    });
    startMarker.setMap(map);

    originPoint.x = places.x;
    originPoint.y = places.y;
  });
  el.querySelector('.destinationBtn').addEventListener('click', () => {
    destination.value = places.address_name;

    endMarker?.setMap(null);
    endMarker = new kakao.maps.Marker({
      position: markers[index].getPosition(),
    });
    endMarker.setMap(map);

    destinationPoint.x = places.x;
    destinationPoint.y = places.y;
  });

  return el;
}

// 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
function addMarker(position, idx) {
  var imageSrc =
      'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
    imageSize = new kakao.maps.Size(36, 37), // 마커 이미지의 크기
    imgOptions = {
      spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
      spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
      offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
    },
    markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
    marker = new kakao.maps.Marker({
      position: position, // 마커의 위치
      image: markerImage,
    });

  marker.setMap(map); // 지도 위에 마커를 표출합니다
  markers.push(marker); // 배열에 생성된 마커를 추가합니다

  return marker;
}

// 지도 위에 표시되고 있는 마커를 모두 제거합니다
function removeMarker() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }

  markers = [];
}

// 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
function displayPagination(pagination) {
  var paginationEl = document.getElementById('pagination'),
    fragment = document.createDocumentFragment(),
    i;

  // 기존에 추가된 페이지번호를 삭제합니다
  while (paginationEl.hasChildNodes()) {
    paginationEl.removeChild(paginationEl.lastChild);
  }

  for (i = 1; i <= pagination.last; i++) {
    var el = document.createElement('a');
    el.href = '#';
    el.innerHTML = i;

    if (i === pagination.current) {
      el.className = 'on';
    } else {
      el.onclick = (function (i) {
        return function () {
          pagination.gotoPage(i);
        };
      })(i);
    }

    fragment.appendChild(el);
  }
  paginationEl.appendChild(fragment);
}

// 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
// 인포윈도우에 장소명을 표시합니다
function displayInfowindow(marker, title) {
  var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';

  infowindow.setContent(content);
  infowindow.open(map, marker);
}

// 검색결과 목록의 자식 Element를 제거하는 함수입니다
function removeAllChildNods(el) {
  while (el.hasChildNodes()) {
    el.removeChild(el.lastChild);
  }
}

//#endregion

//#region Kakao Mobility

var polyArray = [];

const REST_API_KEY = '3f21cdd2349ce2b74e66b6016de75dcc';

// 호출방식의 URL을 입력
const url = 'https://apis-navi.kakaomobility.com/v1/waypoints/directions';

async function getCarDirection() {
  // 요청 헤더를 추가합니다.
  const headers = {
    Authorization: `KakaoAK ${REST_API_KEY}`,
    'Content-Type': 'application/json',
  };

  const requestUrl = `${url}`; // 파라미터까지 포함된 전체 URL

  try {
    const response = await fetch(requestUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        origin: originPoint,
        destination: destinationPoint,
        waypoints: waypointList,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // 반환 데이터
    const data = await response.json();
    // 경로 표시를 위한 좌표 저장용 Array
    var linePath = [];

    // 카카오 맵에서의 경로 좌표 linePath에 추가
    for (
      let index = 0;
      index < Object.keys(data.routes[0].sections).length;
      index++
    ) {
      data.routes[0].sections[index].roads.forEach((router) => {
        router.vertexes.forEach((vertex, index) => {
          if (index % 2 === 0) {
            linePath.push(
              new kakao.maps.LatLng(
                router.vertexes[index + 1],
                router.vertexes[index]
              )
            );
          }
        });
      });
    }

    // 경로좌표 polyline
    const polyline = new kakao.maps.Polyline({
      path: linePath,
      strokeWeight: 5,
      strokeColor: '#858536',
      strokeOpacity: 0.4,
      strokeStyle: 'solid',
    });

    // 기존 폴리라인 존재시 초기화
    if (polyArray[0] != undefined) {
      polyArray[0].setMap(null);
      polyArray.shift();
    }

    // 새로운 polyline 배열에 삽입
    polyArray.push(polyline);

    polyArray[0].setMap(map);
  } catch (error) {
    console.error('Error:', error); // 에러 발생
  }
}

//#endregion

//#region Run

// 채팅 버튼 입력 시
letsChabak.addEventListener('click', () => {
  // 출발지 입력 확인
  if (!origin.value.replace(/^\s+|\s+$/g, '')) {
    alert('출발지를 입력해주세요!');
    return;
  }

  // 목적지 입력 확인
  if (!destination.value.replace(/^\s+|\s+$/g, '')) {
    alert('목적지를 정확히 입력해주세요');
    return;
  }

  fetchAIResponse()
    .then((resp) => JSON.parse(resp))
    .then((result) => {
      // 기존 마커와 경유지 지우기
      removeMarker();
      markers = [];
      waypointList = [];

      recommInfo.innerHTML = '';

      // AI 추천지 목록에 담기
      const recommList = result.recommList;

      // 지도 표시할 새로운 영역 설정
      let bounds = new kakao.maps.LatLngBounds();

      recommList.forEach((recomm, index) => {
        var el = document.createElement('li'),
          itemStr =
            '<li>' +
            '<a href="' +
            recomm.link +
            '">' +
            recomm.name +
            ': </a>' +
            '<span>' +
            recomm.info +
            '</span>' +
            '</li>';
        el.innerHTML = itemStr;
        recommInfo.appendChild(el);

        // 조회된 결과로 좌표(마커) 만들고 표시
        var placePosition = new kakao.maps.LatLng(recomm.y, recomm.x);
        marker = addMarker(placePosition, index);

        // 경유지에 추천지 추가
        waypointList.push({ x: recomm.x, y: recomm.y });

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        bounds.extend(placePosition);
      });
      // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
      map.setBounds(bounds);

      console.log(recommList);

      getCarDirection();
    });
});

//#endregion
