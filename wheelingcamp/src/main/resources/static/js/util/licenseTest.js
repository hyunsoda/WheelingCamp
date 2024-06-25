const form = document.getElementById("uploadForm");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  let formData = new FormData(form);

  await fetch("/validateLicense/uploadImage", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      //원하는 데이터 값 가져오기

      // 증명번호 가져오기
      //   data.images[0].fields[0]
      const licenseNo = data.images[0].fields[0].inferText;
      console.log(licenseNo);
      // 취득일자는 숫자만 가져오기
      const licenseDate = data.images[0].fields[1].inferText;
      console.log(licenseDate);

      let str = licenseDate.replace(/[^0-9]/g, "");
      let driverLicenseDate = parseInt(str);
      console.log("driverLicenseDate", driverLicenseDate);
      sendLicenseData(licenseNo, driverLicenseDate);

      document.getElementById("licenseNo").value = licenseNo;
      document.getElementById("driverLicenseDate").value = driverLicenseDate;

      showalvvcvbcve3cvDFDF();
    })
    .catch((error) => {
      console.error(error);
      showalvvcvcfdfdve3cvDFDF();
    });
});

async function sendLicenseData(licenseNo, driverLicenseDate) {
  const url = "/validateLicense/insertLicenseData";
  console.log("licenseNo", licenseNo);
  console.log("driverLicenseDate", driverLicenseDate);

  const data = {
    licenseNo: licenseNo,
    driverLicenseDate: driverLicenseDate,
  };
  console.log(data);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log("response" + response);
    if (!response.ok) {
      throw new Error("NetWork response was not ok");
    }
    const result = response.json();
    console.log("Success:", result);
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
