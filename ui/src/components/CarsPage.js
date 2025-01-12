import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import {CREATE_CAR_PAGE_URL} from "../lib/url/pageUrlConstants";
import CarsTable from "./tables/CarsTable";
import useUserData from "../hooks/useUserData";

export default function CarsPage() {
  const {user, isDealership} = useUserData()

  return (
    <div>
      <h1 className='page-title'>Cars</h1>

      {
        user ?
          <>
            {isDealership && <Link className='mb-3' to={CREATE_CAR_PAGE_URL}>
              <Button>Create Car</Button>
            </Link>}
            <CarsTable/>
          </>
          : 'Please log in'
      }

    </div>
  );
}
