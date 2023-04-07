
import { fetchFun } from "./fetchFun";


async function deleteFile(idFile,token) {
   let conf = confirm("Are you sure you wanna cancel it?");
   if(!conf) return
    const res = await fetchFun("/deleteFile", "POST", {idFile}, token);
    location.reload()
}

module.exports = {
        deleteFile,
};