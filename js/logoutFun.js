export function logOut(key){
    if(key=='logout'){
localStorage.removeItem('token');
localStorage.removeItem('uid');
localStorage.removeItem('role');
window.location.replace('/Login')
    }
return
}



