import jwtDecode from 'jwt-decode'

export const initialState = {
  user: null,
  username: "",
}

if (localStorage.getItem("jwtToken")) {
  const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("jwtToken");
  } else {
    initialState.user = decodedToken;
    initialState.username=localStorage.getItem("username")
  }
}

function authreducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
        username:action.username,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        username:''
      };
    default:
      return;
  }
}

export default authreducer