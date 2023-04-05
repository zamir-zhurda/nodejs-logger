import IOrderLog from "./IOrderLog";

export default interface IUserLog {
    id: number,
    name?:string,
    orders?:IOrderLog[]
}