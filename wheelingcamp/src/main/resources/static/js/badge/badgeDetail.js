const mainBadgeBtn = document.querySelectorAll(".mainBadgeBtn"); // 클래스가 'item'인 모든 요소 선택

mainBadgeBtn.forEach((badge) => {
  badge.addEventListener("click", () => {
    const badgeNo = badge.id;
    fetch("/badge/selected?badgeNo=" + badge.id, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((resp) => resp.json())
      .then((result) => {
        switch (result) {
          case 0:
            return showMyCustomAlertcccc();
          case 1:
            showMyCustomAlertcccccc();
            console.log(badge);
            document.querySelector(".selectedBadgeImg").src =
              "/image/badge/badgeSample" + badge.id + ".png";

            // window.location.href = "/badge/detail";
            break;
        }
      });
  });
});

// const selectedBadgeOkBtn = document.querySelector("#selectedBadgeOkBtn");
// selectedBadgeOkBtn.addEventListener("click", () => {
//   window.location.href = "/myPage/info";
// });
