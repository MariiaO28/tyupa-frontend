import Logo from "../../Components/Logo/Logo";
import PetInfo from "../../Components/PetInfo/PetInfo";
import TyupaAnimationComponent from "../../Components/TyupaAnimationComponent/TyupaAnimationComponent";
import styles from "./PetPage.module.css";

export default function PetPage() {
  return (
    <div className={`container, ${styles.background}`}>
        <Logo/>
        <TyupaAnimationComponent/>
        <PetInfo/>
    </div>
  )
}
