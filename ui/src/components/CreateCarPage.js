import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import {CREATE_CAR_PAGE_URL} from "../lib/url/pageUrlConstants";
import CarsTable from "./tables/CarsTable";
import useUserData from "../hooks/useUserData";
import CreateCarForm from "./forms/CreateCarForm";

export default function CreateCarPage() {
  const {user} = useUserData()

  return (
    <div>
      <h1 className='page-title'>Create Car</h1>

      {
        user ?
          <>
            <CreateCarForm/>
          </>
          : 'Please log in'
      }

    </div>
  );
}
