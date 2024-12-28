import Logo from '../../Components/Logo/Logo.jsx'
import PetSignUpForm from '../../Components/PetSignUpForm/PetSignUpForm'
import css from './PetSignUpPage.module.css'

export default function PetSignUpPage() {
  return (
    <div className = {css.container}>
    <Logo/>
    <PetSignUpForm/>
    </div>
  )
}
