
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { SAVE_EMPLOYEES_PAGE_URL } from "../lib/url/pageUrlConstants";
import EmployeesTable from "./tables/EmployeesTable";

export default function Employees() {
    return (
        <div>
            <h1 className='page-title'>Employees</h1>

            <Link className='mb-3' to={SAVE_EMPLOYEES_PAGE_URL}>
                <Button>Add Employee</Button>
            </Link>
            <EmployeesTable />
        </div>
    );
}
