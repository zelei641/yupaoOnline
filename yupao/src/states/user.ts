import {UserType} from "../models/user";

let currentUser:UserType;

/**
 * 当前用户信息的缓存
 * @param user
 */
const setCurrentUserState = (user : UserType) => {
    currentUser = user
}

const getCurrentUserState = () : UserType => {
    return currentUser;
}

export {
    setCurrentUserState,
    getCurrentUserState
}