import myAxios from "../plugins/my-Axios";
import {getCurrentUserState, setCurrentUserState} from "../states/user";


/**
 * 获取当前登录的用户信息 返回给需要的页面
 */
export const getCurrentUser = async () => {
    const currentUser = getCurrentUserState();
    console.log(1)
    console.log(currentUser)
    //如果可以获取到当前信息 就返回当前信息
    if (currentUser)
    {
        return currentUser;
    }

    //如果不存在就从远程获取
    const res = await myAxios.get('/user/current')
    if (res.code === 0)
    {
        setCurrentUserState(res.data);
        console.log(1)
        console.log(getCurrentUserState())
        return res.data;
    }

    //获取失败就返回null
    return null;
}
