import {Link} from "react-router-dom";
import {
  EMPLOYEES_PAGE_URL,
  ATTRIBUTES_PAGE_URL,
  LOGIN_PAGE_URL,
  REGISTER_PAGE_URL
} from "../../lib/url/pageUrlConstants";

export default function Header() {


  return (
    <header className="header">
      <h1 className="title">Car Dealership</h1>
      <ul className="navigation-bar">
        <div className="left-nav">
          <li><Link to={ATTRIBUTES_PAGE_URL}>Attributes</Link></li>
          <li><Link to={EMPLOYEES_PAGE_URL}>Employees</Link></li>
        </div>
        <div className="right-nav">
          <li><Link to={REGISTER_PAGE_URL}>Register</Link></li>
          <li><Link to={LOGIN_PAGE_URL}>Login</Link></li>
        </div>
      </ul>


    </header>
  );
}
