const cbInput = document.querySelector('#cbInput');
const cbBtn = document.querySelector('#cbBtn');

// 발급받은 API키
var apiKey = '';
// OpenAI API 엔드포인트 주소
const apiEndpoint = 'https://api.openai.com/v1/chat/completions';
// GPT 입력용 파라미터
const param = {
  type: 'object',
  properties: {
    return: {
      type: 'object',
      properties: {
        feeling: {
          type: 'string',
          description: '강아지의 감정, 한글로',
        },
        bark: {
          type: 'string',
          description: '강아지 언어로 번역된 문장',
        },
      },
    },
    reason: {
      type: 'string',
      description: '번역한 이유를 적어주세요.',
    },
  },
  required: ['return', 'reason'],
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
            '당신은 강아지 언어 번역가로써 인간의 언어를 강아지 언어로 번역하는 일을 하고 있습니다. 강아지들이 인간의 언어를 이해할 수 있도록 도와주세요.',
        },
        {
          role: 'user',
          content: `다음의 인간어 ${cbInput.value}를 강아지어로 번역해주세요.`,
        },
      ],
      // 생성할 함수 스키마
      functions: [
        {
          name: 'dog_translator',
          description: `return '강아지어로 번역된 문장'`,
          // 함수 파라미터
          parameters: param,
        },
      ],
      function_call: { name: 'dog_translator' },
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
    alert('OpenAI API 호출 중 오류 발생, 다시 시도해주세요');
    location.reload(true);
    return 'OpenAI API 호출 중 오류 발생';
  }
}

cbBtn.addEventListener('click', async () => {
  await fetchAIResponse().then((resp) => {
    const answ = JSON.parse(resp);

    // 번역 결과 출력
    document.querySelector(
      '#cbOutput'
    ).innerText = `강아지어: ${answ.return.bark}, 감정: ${answ.return.feeling}, 번역 이유: ${answ.reason}`;
  });
});
