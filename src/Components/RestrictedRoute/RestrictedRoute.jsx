// import { useSelector } from "react-redux";
// import { selectIsLoggedIn } from "../../redux/auth/authSelectors";
import { Navigate } from "react-router-dom";

export default function RestrictedRoute({ component, redirectTo }) {
  const isLoggedIn = false;
  return isLoggedIn ? <Navigate to={redirectTo} /> : component;
}