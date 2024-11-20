// import { useSelector } from "react-redux"
// import { selectIsLoggedIn } from "../../redux/auth/authSelectors"
import { Navigate } from "react-router-dom";

export default function PrivateRoute({component,redirectTo}){ 
  const isLoggedIn = true;
  return  isLoggedIn ? component: <Navigate to={redirectTo}/>
  
}

