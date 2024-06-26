const searchList = document.querySelectorAll(".search");
console.log(searchList);

searchList.forEach(e => {
    
    e.addEventListener("click", () => {
        alert("클릭");
        console.log(e);
    });
});


// 전국 목록 탐색
const searchCampArea = (locationNo, cp) => {

    fetch(`/campingArea/selectCampingAreaAll?locationNo=${locationNo}&cp=${cp}`)
    .then(resp => resp.json())
    .then(result => {

        console.log(result.campingAreaList);
        console.log(result.pagination);
    });
}

searchCampArea(0, 1);