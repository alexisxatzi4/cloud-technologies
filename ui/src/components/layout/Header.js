import {Link} from "react-router-dom";
import {
  LOGIN_PAGE_URL,
  REGISTER_PAGE_URL, CARS_PAGE_URL, RESERVATIONS_PAGE_URL
} from "../../lib/url/pageUrlConstants";
import {useNavigate} from "react-router-dom";
import useUserData from "../../hooks/useUserData";
import {removeItem} from "../../lib/storage";

export default function Header() {
  const navigate = useNavigate();

  const {user, isCitizen} = useUserData()
  const handleLogout = () => {
    removeItem('user')
    navigate(LOGIN_PAGE_URL);
  };


  return (
    <header className="header">
      <h1 className="title">Car Dealership</h1>
      <ul className="navigation-bar">
        {user && <div className="left-nav">
          <li><Link to={CARS_PAGE_URL}>Cars</Link></li>
          {
            isCitizen && <li><Link to={RESERVATIONS_PAGE_URL}>My Reservations</Link></li>
          }
        </div>}


        <div className="right-nav">

          {
            user ? <>
                <li>
                  <button onClick={handleLogout} className="nav-link-button">
                    Logout
                  </button>
                </li>
              </>

              : <>
                <li><Link to={REGISTER_PAGE_URL}>Register</Link></li>
                <li><Link to={LOGIN_PAGE_URL}>Login</Link></li>
              </>
          }


        </div>
      </ul>


    </header>
  );
}
