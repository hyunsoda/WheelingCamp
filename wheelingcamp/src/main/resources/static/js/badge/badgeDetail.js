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
            return alert("대표뱃지 설정에 실패했습니다.");
          case 1:
            alert("대표뱃지가 설정되었습니다.");
            window.location.href = "/badge/detail";
            break;
        }
      });
  });
});
