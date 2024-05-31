// 발급받은 API키
var apiKey = '';
// OpenAI API 엔드포인트 주소를 변수로 저장
const apiEndpoint = 'https://api.openai.com/v1/chat/completions';

// GPT 용 인풋 창과 버튼
const buttonChat = document.getElementById('buttonChat');
const inputChat = document.getElementById('inputChat');
// 답변 저장용 div
const respChat = document.getElementById('respChat');

// ChatGPT API 요청
async function fetchAIResponse(prompt) {
  // Chat GPT Key 반환
  await fetch('/returnKey/chatGPTKey')
    .then((resp) => resp.text())
    .then((result) => {
      apiKey = result; // Chat GPT API Key 반환
    });

  console.log(apiKey);

  // API 요청에 사용할 옵션
  const requestOptions = {
    method: 'POST',
    // API 요청의 헤더를 설정
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'ft:gpt-3.5-turbo-0613:personal::9UVsFKgH', // 사용할 AI 모델
      messages: [
        {
          role: 'user', // 메시지 역할을 user로 설정
          content: prompt, // 사용자가 입력한 메시지
        },
      ],
      temperature: 0.8, // 모델의 출력 다양성
      max_tokens: 1024, // 응답받을 메시지 최대 토큰(단어) 수 설정
      top_p: 1, // 토큰 샘플링 확률을 설정
      frequency_penalty: 0.5, // 일반적으로 나오지 않는 단어를 억제하는 정도
      presence_penalty: 0.5, // 동일한 단어나 구문이 반복되는 것을 억제하는 정도
      stop: ['Human'], // 생성된 텍스트에서 종료 구문을 설정
    }),
  };

  // API 요청후 응답 처리
  try {
    const response = await fetch(apiEndpoint, requestOptions);
    const data = await response.json();
    const answ = data.choices[0].message.content;
    return answ;

    // 오류 발생 시
  } catch (error) {
    console.error('OpenAI API 호출 중 오류 발생:', error);
    return 'OpenAI API 호출 중 오류 발생';
  }
}

// 채팅 버튼 입력 시
buttonChat.addEventListener('click', () => {
  fetchAIResponse(inputChat.value).then((resp) => {
    respChat.innerText = resp;
  });
});
