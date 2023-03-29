export function ActioKeyNav(key) {
  switch (key) {
    case "logout":
      localStorage.removeItem("token");
      localStorage.removeItem("uid");
      localStorage.removeItem("role");
      window.location.replace("/Login");
      break;

    default:
      break;
  }

  return;
}
