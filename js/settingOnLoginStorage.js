import { setToken } from "../stores/store";
import { setUID } from "../stores/store";
import { setRole } from "../stores/store";

export const settingOnLoginStorage = async(dispatch,token, uid, role, username, email) =>{

    //token
    await localStorage.setItem("token", token);
    await dispatch(setToken(token));
    
    //uid
    await localStorage.setItem("uid", uid*1);
    await dispatch(setUID(uid));

    //role
    await localStorage.setItem("role", role*1);
    await dispatch(setRole(role));

    return window.location.replace("/");

} 