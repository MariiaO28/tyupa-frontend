import { useDispatch } from "react-redux";
import { login, logout, registerNewUser } from "../../redux/auth/authOperations.js";

export default function PetInfo() {
  const dispatch = useDispatch();
  const handleSubmit = () => {
  dispatch(registerNewUser());
  dispatch(login())
  dispatch(logout())
  
  };
  return (
    <div>
      PetInfo
      <button onClick={handleSubmit}>Get pet info</button>
    </div>
  );
}
