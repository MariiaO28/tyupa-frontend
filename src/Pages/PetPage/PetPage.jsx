import Logo from "../../Components/Logo/Logo";
import PetInfo from "../../Components/PetInfo/PetInfo";
import TyupaAnimationComponent from "../../Components/TyupaAnimationComponent/TyupaAnimationComponent";

export default function PetPage() {
  return (
    <div className="container">
        <Logo/>
        <TyupaAnimationComponent/>
        <PetInfo/>
    </div>
  )
}
