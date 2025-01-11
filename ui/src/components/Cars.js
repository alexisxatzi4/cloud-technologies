import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import {SAVE_EMPLOYEES_PAGE_URL} from "../lib/url/pageUrlConstants";
import EmployeesTable from "./tables/EmployeesTable";
import CarsTable from "./tables/CarsTable";
import useUserData from "../hooks/useUserData";

export default function Cars() {
  const {user} = useUserData()

  return (
    <div>
      <h1 className='page-title'>Cars</h1>

      {
        user ?
          <>
            <Link className='mb-3' to={SAVE_EMPLOYEES_PAGE_URL}>
              <Button>Add Car</Button>
            </Link>
            <CarsTable/>
          </>
          : 'Please log in'
      }

    </div>
  );
}
