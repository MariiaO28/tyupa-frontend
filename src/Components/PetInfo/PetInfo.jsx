import { useDispatch } from "react-redux";
import { fetchPetData } from "../../redux/pets/petsOperations";

export default function PetInfo() {
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(fetchPetData());
  };
  return (
    <div>
      PetInfo
      <button onClick={handleSubmit}>Get pet info</button>
    </div>
  );
}
