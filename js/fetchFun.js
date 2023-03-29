// cambaire tutte le get in post poi
import axios from "axios";

export const fetchFun = async (url, method, body, token, ) => {
  let res;

  switch (method) {
    case "GET":
      res = await fetch(`${process.env.NEXT_PUBLIC_NODE_SERVER}${url}`, {
        method: `${method}`,
        headers: {
          authorization: token,
        },
      });
      break;

    case "POST":
      //check here the behaviur if you send files
      res = await fetch(`${process.env.NEXT_PUBLIC_NODE_SERVER}${url}`, {
        method: `${method}`,
        headers: {
          authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      break;
    case "DELETE":
      break;
    case "PUT":
      break;
    default:
      break;
  }
  if (!res.ok) {
      //  if (res.status === 401) {
      //   router.push("/Login");
      //   return 
      // }
    return res.status 
  } else {
    return await res.json();
  }
};
