const buttonChat2 = document.getElementById("buttonChat2");
const startDay = document.getElementById("start-day");
const endDay = document.getElementById("end-day");
const startLoc = document.getElementById("start-loc");
const endLoc = document.getElementById("end-loc");

// 채팅 버튼 입력 시
buttonChat2.addEventListener("click", () => {
  const stDay = new Date(startDay.value);
  const edDay = new Date(endDay.value);

  console.log(stDay);

  const diff = (edDay - stDay) / (1000 * 60 * 60 * 24);

  console.log(diff);

  let question =
    stDay +
    "일부터" +
    edDay +
    "까지 계절과 날씨를 감안해서" +
    startLoc.value +
    "에서" +
    endLoc.value +
    "로 가는 길에 있는 관광지 알려줘 그리고 관광지의 x, y 좌표도 반환해줘 반환 할때는 " +
    "search = { location : 장소 이름 , xPoint : x좌표, yPoing : y좌표, address : 주소} json 형태로 반환해줘";

  ("info{point{x:, y:}}");

  console.log(question);

  fetchAIResponse(question).then((resp) => {
    respChat.innerText = resp;
  });
});
