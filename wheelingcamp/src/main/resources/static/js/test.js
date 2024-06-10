const origin = document.getElementById('origin').value;
const destination = document.getElementById('destination').value;
const buttonChat = document.getElementById('buttonChat');
const respChat = document.getElementById('respChat');

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
            description: '차박, 캠핑 추천지 이름',
          },
          address: {
            type: 'string',
            description: '차박, 캠핑 추천지 주소지',
          },
          link: {
            type: 'string',
            description:
              '추천 주소지의 정보를 확인할 수 있는 웹사이트 주소 링크',
          },
          x: {
            type: 'number',
            description: '차박, 캠핑 추천지 x 좌표',
          },
          y: {
            type: 'number',
            description: '차박, 캠핑 추천지 y 좌표',
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
          content: '관광 가이드라고 생각하세요',
        },
        {
          role: 'user',
          content: `${origin}부터 ${destination}까지의 캠핑 여행지 추천해줘`,
        },
      ],
      // 생성할 함수 스키마
      functions: [
        {
          name: 'trip_assistance',
          description:
            '출발지와 목적지사이에 존재하는 추천 캠핑지 주소 목록을 알려줘',
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

// 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
function addMarker(position, idx, title) {
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
}

// 지도 위에 표시되고 있는 마커를 모두 제거합니다
function removeMarker() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
}

//#endregion

//#region Kakao Mobility

var polyArray = [];
const REST_API_KEY = '3f21cdd2349ce2b74e66b6016de75dcc';

// 호출방식의 URL을 입력
const url = 'https://apis-navi.kakaomobility.com/v1/directions';

async function getCarDirection() {
  // 요청 헤더를 추가합니다.
  const headers = {
    Authorization: `KakaoAK ${REST_API_KEY}`,
    'Content-Type': 'application/json',
  };

  // 표3의 요청 파라미터에 필수값을 적어줍니다.
  const queryParams = new URLSearchParams({
    // 출발지
    origin: origin,
    // 도착지
    destination: destination,
    // 경유지
    waypoints: [{ name: 'name0', x: 127.11341936045922, y: 37.39639094915999 }],
  });

  const requestUrl = `${url}?${queryParams}`; // 파라미터까지 포함된 전체 URL

  try {
    const response = await fetch(requestUrl, {
      method: 'GET',
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // 반환 데이터
    const data = await response.json();
    // 경로 표시를 위한 좌표 저장용 Array
    var linePath = [];

    // 카카오 맵에서의 경로 좌표 linePath에 추가
    data.routes[0].sections[0].roads.forEach((router) => {
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

    // 경로좌표 polyline
    const polyline = new kakao.maps.Polyline({
      path: linePath,
      strokeWeight: 5,
      strokeColor: '#000000',
      strokeOpacity: 0.7,
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
buttonChat.addEventListener('click', () => {
  fetchAIResponse()
    .then((resp) => JSON.parse(resp))
    .then((result) => {
      const recommList = result.recommList;
      bounds = new kakao.maps.LatLngBounds();

      recommList.forEach((recomm, index) => {
        var placePosition = new kakao.maps.LatLng(recomm.y, recomm.x);
        marker = addMarker(placePosition, index);

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        bounds.extend(placePosition);
      });
      // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
      map.setBounds(bounds);
      console.log(result);
    });
});

//#endregion
