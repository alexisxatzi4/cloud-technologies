import { Button } from "react-bootstrap";
import AttributesTable from "./tables/AttributesTable";
import { Link } from "react-router-dom";
import { SAVE_ATTRIBUTE_PAGE_URL } from "../lib/url/pageUrlConstants";

export default function Attributes() {

    return (
        <div>
            <h1 className='page-title'>Attributes</h1>
            
            <Link className='mb-3' to={SAVE_ATTRIBUTE_PAGE_URL}>
                <Button>Add Attribute</Button>
            </Link>
            <AttributesTable />
        </div>
    );
}
