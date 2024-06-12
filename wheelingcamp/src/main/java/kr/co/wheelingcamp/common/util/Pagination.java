package kr.co.wheelingcamp.common.util;

public class Pagination {
	private int currentPage; // 현재 페이지 번호
	private int listCount; // 전체 게시글 수

	private int limit = 10; // 한 페이지 목록에 보여지는 게시글 수
	private int pageSize = 10; // 보여질 페이지 번호 개수

	private int maxPage; // 마지막 페이지 번호
	private int startPage; // 보여지는 맨 앞 페이지 번호
	private int endPage; // 보여지는 맨 뒤 페이지 번호

	private int prevPage; // 이전 페이지 모음의 마지막 번호
	private int nextPage; // 다음 페이지 모음의 시작 번호
	 public boolean hasPrevious() {
	        return currentPage > 1;
	    }
	public Pagination(int currentPage, int listCount) {
		this.currentPage = currentPage;
		this.listCount = listCount;

		calculate(); // 필드 계산 메서드 호출
	}

	public Pagination(int currentPage, int listCount, int limit, int pageSize) {

		this.currentPage = currentPage;
		this.listCount = listCount;
		this.limit = limit;
		this.pageSize = pageSize;

		calculate();
	}

	public int getCurrentPage() {
		return currentPage;
	}

	public int getListCount() {
		return listCount;
	}

	public int getLimit() {
		return limit;
	}

	public int getPageSize() {
		return pageSize;
	}

	public int getMaxPage() {
		return maxPage;
	}

	public int getStartPage() {
		return startPage;
	}

	public int getEndPage() {
		return endPage;
	}

	public int getPrevPage() {
		return prevPage;
	}

	public int getNextPage() {
		return nextPage;
	}

	public void setCurrentPage(int currentPage) {
		this.currentPage = currentPage;
		calculate();
	}

	public void setListCount(int listCount) {
		this.listCount = listCount;
		calculate();
	}

	public void setLimit(int limit) {
		this.limit = limit;
		calculate();
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
		calculate();
	}

	@Override
	public String toString() {
		return "Pagenation [currentPage=" + currentPage + ", listCount=" + listCount + ", limit=" + limit
				+ ", pageSize=" + pageSize + ", maxPage=" + maxPage + ", startPage=" + startPage + ", endPage="
				+ endPage + ", prevPage=" + prevPage + ", nextPage=" + nextPage + "]";
	}

	/**
	 * 페이징 처리에 필요한 값을 계산해서 필드에 대입한느 메서드, (maxPage, startPage, endPage, prevPage,
	 * nextPage)
	 * 
	 */
	private void calculate() {
    // maxPage : 최대 페이지 == 마지막 페이지 == 총 페이지 수
    maxPage = (int) Math.ceil((double) listCount / limit);

    // startPage : 페이지 번호 목록의 시작 번호
    startPage = ((currentPage - 1) / pageSize) * pageSize + 1;

    // endPage : 페이지 번호 목록의 끝 번호
    endPage = startPage + pageSize - 1;

    // 페이지 끝 번호가 최대 페이지 수를 초과한 경우
    if (endPage > maxPage) {
        endPage = maxPage;
    }

    // prevPage : "<" 클릭 시 이동할 페이지 번호
    if (currentPage <= pageSize) {
        prevPage = 1;
    } else {
        prevPage = startPage - 1;
    }

    // nextPage : ">" 클릭 시 이동할 페이지 번호
    if (endPage >= maxPage) {
        nextPage = maxPage;
    } else {
        nextPage = endPage + 1;
    }
}
}
