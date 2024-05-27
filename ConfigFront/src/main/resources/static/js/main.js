document.addEventListener("DOMContentLoaded", function() {
    var searchInput = this.documentElement.querySelector(".locationSearch")
    
    // 마우스 클릭 시 placeholder 텍스트 삭제
    searchInput.addEventListener('focus', function() {
        this.removeAttribute('placeholder');
    });

    // 포커스를 잃으면 다시 placeholder 텍스트 삽입
    searchInput.addEventListener('blur', function() {
        if (!this.value.trim()) {
            this.setAttribute('placeholder', '캠핑장을 검색하세요');
        }
    });
});