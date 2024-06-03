// JQuery 기본 설정
jQuery(document).ready(function ($) {
  // 상품 리스트 불러오기
  let searchBoardList = [];

  const callBoardList = () => {
    boardList.forEach((board) => {
      searchBoardList.push(board);
    });
  };

  callBoardList();

  // 검색 자동완성
  $('#searchQuery').autocomplete({
    // autocomplete 구현 시작부

    source: function (request, response) {
      response(
        $.map(searchBoardList, function (obj, key) {
          var boardName = obj.boardTitle.toUpperCase();

          if (boardName.indexOf(request.term.toUpperCase()) != -1) {
            return {
              label: obj.boardTitle, // Label for Display
              value: obj.boardNo, // Value
            };
          } else {
            return null;
          }
        })
      );
    }, //source 는 자동완성의 대상

    select: function (event, ui) {
      // board 선택 시 이벤트
      if (ui.item.value != '') {
        window.location.href = '/board/' + ui.item.value + '?cp=' + currentPage;
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
      'ui-autocomplete': 'ui-autocomplete-highlight',
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
