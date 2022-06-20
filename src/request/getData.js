import request from './http.js'
//数据列表接口
export const getUserlist = () => request.get("/userlist")
