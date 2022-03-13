export interface IQueryResponse {
	isError: boolean,
	errorMsg: string,
	isSuccess: boolean,
	successMsg: string
}

export const defaultQueryResponse: IQueryResponse = {
	isError: false,
	errorMsg: "",
	isSuccess: false,
	successMsg: ""
}