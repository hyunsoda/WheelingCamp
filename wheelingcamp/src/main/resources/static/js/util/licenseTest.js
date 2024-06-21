const file = document.querySelector("#file");
const btn = document.querySelector("#btn");

const apiKey = "eEh3bWJCY3hMdnhjWVd1TFB0VlRvaVhYTUlhSklTUms=";

const run = async () => {
  await fetch(
    "https://4wekbqwdra.apigw.ntruss.com/custom/v1/32001/d60df6998b195d6ffc6633b8c21e2f14aa40541587e24702a19db4f4fbde87de/general?=",
    {
      method: "POST",
      headers: {
        "X-OCR-SECRET": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        images: [
          {
            format: "png",
            name: "medium",
            data: null,
            url: "",
          },
        ],
        lang: "ko",
        requestId: "string",
        resultType: "string",
        timestamp: "{{$timestamp}}",
        version: "V1",
      }),
    }
  )
    .then((resp) => resp.json())
    .then((result) => {
      console.log(result);
    });
};

btn.addEventListener("click", () => {
  run();
});
