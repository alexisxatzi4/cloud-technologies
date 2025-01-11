import { Spinner } from "react-bootstrap";

const LoadingSpinner = () => {
    return (  
        <div className='d-flex justify-content-center mt-5'>
            <Spinner variant="primary" animation="border" role="status" />
        </div>
    );
}
 
export default LoadingSpinner;