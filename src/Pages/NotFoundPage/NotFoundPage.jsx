import { Link } from 'react-router-dom';
import css from './NotFoundPage.modulle.css';

export default function NotFoundPage() {
  return (
    <div className = {css.container}>
      <p>Page is not found!</p>
      <p> Please <Link to="/pet-registration">register your pet.</Link></p>
    </div>
  );
}
