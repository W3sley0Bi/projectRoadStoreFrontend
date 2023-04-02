export function ActioKeyNav(key) {
  switch (key) {
    case "logout":
      localStorage.removeItem("token");
      localStorage.removeItem("uid");
      localStorage.removeItem("role");
      window.location.replace("/Login"); //check if this fun is working
      break;

    default:
      break;
  }

  return;
}
