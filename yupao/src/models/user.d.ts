/**
 * 用户类别
 */
export type UserType = {
    id:number;
    username:string;
    userAccount:string;
    avatarUrl?:string;
    profile?:string;
    gender: number;
    phone:string;
    email:string;
    userStatus:number;
    userRole:number;
    createTime:Date;
    tags:string;
    pCode:string;
};