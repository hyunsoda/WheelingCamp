 const mainBadgeBtn= document.querySelectorAll('.mainBadgeBtn'); // 클래스가 'item'인 모든 요소 선택

mainBadgeBtn.forEach((badge) => {
    badge.addEventListener('click', () => {
    const badgeNo = badge.id;    
    fetch("/badge/selected?badgeNo="+badge.id, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body : JSON.stringify(badgeNo)
    })
    .then((resp) => resp.json())
    .then((result) => {
        if(result > 0){
         alert('대표뱃지로 선택되었습니다.');
        console.log(result);   
        }
        alert('대표뱃지 설정에 실패했습니다.');
        console.log(result);   
    });

    });
});
 