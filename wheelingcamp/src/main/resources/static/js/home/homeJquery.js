// JQuery 기본 설정
jQuery(document).ready(function ($) {
  // 검색 자동완성
  let searchItemList = [];

  const callItemList = () => {
    searchItemList;
    fetch('/item/allItemList') // GET 방식 요청
      .then((resp) => resp.json())
      .then((itemList) => {
        itemList.forEach((item) => {
          item.value = item.itemName;
          searchItemList.push(item);
        });
      });
  };

  callItemList();

  $('#searchbarInput').autocomplete({
    source: function (request, response) {
      var list = [];
      list = searchItemList.filter(function (item) {
        console.log(item);
        return (
          item.itemName.indexOf(request.term) === 0 ||
          item.itemName.toLowerCase().indexOf(request.term) === 0
        );
      });
      response(list);
    }, //source 는 자동완성의 대상
    select: function (event, ui) {
      // item 선택 시 이벤트
      if (ui.item.value != '') {
        window.location.href =
          'item/itemDetail?categoryCode=' +
          ui.item.categoryCode +
          '&itemNo=' +
          ui.item.itemNo;
      } else {
        event.preventDefault();
      }
    },
    response: function (event, ui) {
      if (!ui.content.length) {
        var noResult = { value: '', label: '검색 결과가 없습니다' };
        ui.content.push(noResult);
      }
    },
    focus: function (event, ui) {
      // 포커스 시 이벤트
      return false;
    },
    minLength: 2, // 최소 글자 수
    autoFocus: true, // true로 설정 시 메뉴가 표시 될 때, 첫 번째 항목에 자동으로 초점이 맞춰짐
    classes: {
      // 위젯 요소에 추가 할 클래스를 지정
      'ui-autocomplete': 'searchCustom',
    },
    delay: 500, // 입력창에 글자가 써지고 나서 autocomplete 이벤트 발생될 떄 까지 지연 시간(ms)
    disable: false, // 해당 값 true 시, 자동완성 기능 꺼짐
    position: { my: 'right top', at: 'right bottom' }, // 제안 메뉴의 위치를 식별
    close: function (event) {
      // 자동완성 창 닫아질 때의 이벤트
      console.log(event);
    },
  });
});
