console.log("연결 확인");

// 지역 이름을 받아서 그 지역 캠핑장을 불러오는 함수
const searchLocation = (doName) => {
  fetch("/location/camp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: doName,
  })
    .then((resp) => resp.json())
    .then((result) => {});
};

// 지역 클릭 시 클릭한 지역에 있는 캠핑장 나타내는 함수
const clickLocation = (id) => {
  let doName = "";

  switch (id) {
    case "KR42":
      doName = "강원도";
      break;
    case "KR41":
      doName = "경기도";
      break;
    case "KR44":
      doName = "충청남도";
      break;
    case "KR28":
      doName = "인천";
      break;
    case "KR45":
      doName = "전라북도";
      break;
    case "KR46":
      doName = "전라남도";
      break;
    case "KR48":
      doName = "경상남도";
      break;
    case "KR26":
      doName = "부산";
      break;
    case "KR31":
      doName = "울산";
      break;
    case "KR47":
      doName = "경상북도";
      break;
    case "KR49":
      doName = "제주";
      break;
    case "KR11":
      doName = "서울";
      break;
    case "KR30":
      doName = "대전";
      break;
    case "KR50":
      doName = "세종";
      break;
    case "KR43":
      doName = "충청북도";
      break;
    case "KR29":
      doName = "광주";
      break;
    case "KR27":
      doName = "대구";
      break;
  }

  console.log(doName);
  searchLocation(doName);
};

// 지역을 고를 시 option값(지역 value)에 있는 캠핌장 나타내는 함수
const selectLocation = (value) => {
  let doName = "";

  switch (value) {
    case "0":
      doName = "전국";
      break;
    case "1":
      doName = "서울";
      break;
    case "2":
      doName = "경기도";
      break;
    case "3":
      doName = "인천";
      break;
    case "4":
      doName = "강원도";
      break;
    case "5":
      doName = "충청남도";
      break;
    case "6":
      doName = "대전";
      break;
    case "7":
      doName = "충청북도";
      break;
    case "8":
      doName = "세종";
      break;
    case "9":
      doName = "부산";
      break;
    case "10":
      doName = "울산";
      break;
    case "11":
      doName = "대구";
      break;
    case "12":
      doName = "경상북도";
      break;
    case "13":
      doName = "경상남도";
      break;
    case "14":
      doName = "전라남도";
      break;
    case "15":
      doName = "광주";
      break;
    case "16":
      doName = "전라북도";
      break;
    case "17":
      doName = "제주";
      break;
  }

  console.log(doName);
  searchLocation(doName);
};

// 클릭 이벤트 처리
document.querySelectorAll(".search").forEach((loc) => {
  loc.addEventListener("click", (e) => {
    clickLocation(e.target.id);
  });
});

// 불러온 지역을 넣을 div
// const locationTop = document.querySelector(".location-camp-top");

// 맨 처음 로드 될때 전국으로 검색한 화면
searchLocation("전국");


// 차는 필요없어요 클릭 시 캠핑용품 페이지로 이동
document.querySelector(".car-reservation-btn").addEventListener("click",()=>{
  location.href="/item/itemList?categoryCode=2";
});