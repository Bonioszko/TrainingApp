import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <Link to="/register">register</Link>
      <Link to="/login">login</Link>
      <Link to="/">home</Link>
    </nav>
  );
}
