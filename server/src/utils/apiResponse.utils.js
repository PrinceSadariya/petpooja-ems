class ApiResponse {
	constructor(resData, message = "request success!", statusCode = 200) {
		this.success = statusCode < 400;
		this.status = statusCode;
		this.message = message;
		if (resData) {
			this.data = resData;
		}
	}
}

class ApiPagingResponse {
	constructor(resData, message = "request success!", statusCode = 200) {
		const paging = resData?.paging || {};
		this.success = statusCode < 400;
		this.status = statusCode;
		this.message = message;
		this.currentPage = paging.currentPage;
		this.totalCount = paging.totalCount;
		this.hasMore = paging.hasMore;
		this.pageSize = paging.pageSize;
		this.totalPage = paging.totalPage;
		this.data = resData?.data;
	}
}

module.exports = { ApiResponse, ApiPagingResponse };
