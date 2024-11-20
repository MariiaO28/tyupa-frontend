import { Link } from "react-router-dom";
export default function NotFoundPage() {
  return (
    <div>
      <Link to="/pet-registration">Register your pet</Link>
      <h2>This page not found</h2>
    </div>
  );
}
