import {Button, Form} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import useCatch from "../hooks/useCatch";
import {useAlert} from "./utils/GlobalAlert";
import {axiosPost} from "../lib/axios";
import {POST_REGISTER_CITIZEN_URL, POST_REGISTER_DEALERSHIP_URL} from "../lib/url/apiUrlConstants";
import {LOGIN_PAGE_URL} from "../lib/url/pageUrlConstants";
import {requiredRules} from "../lib/functions";

const initialData = {
  userType: "citizen",
  name: "",
  email: "",
  password: "",
  dealershipName: "",
  dealershipAddress: ""
};

export default function RegisterPage() {
  const {register, handleSubmit, watch, formState: {errors}} = useForm({defaultValues: initialData});
  const navigate = useNavigate();
  const {cWrapper} = useCatch();
  const {setAlert} = useAlert();

  const userType = watch("userType");

  const onSubmit = (data) => {

    if (userType === 'citizen') {
      registerCitizen(data)
    } else if (userType === 'dealership') {
      registerDealership(data)
    } else {
      setAlert({
        message: 'Invalid User Type',
        status: 'danger'
      })
    }

  };

  const registerCitizen = (data) => {
    cWrapper(() =>
      axiosPost(POST_REGISTER_CITIZEN_URL, {
        email: data.email,
        afm: data.afm,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
      })
        .then(() => {
          navigate(LOGIN_PAGE_URL)

          setAlert({
            message: 'Citizen registered!',
            status: 'success'
          })
        })
    )
  }

  const registerDealership = (data) => {
    cWrapper(() =>
      axiosPost(POST_REGISTER_DEALERSHIP_URL, {
        email: data.email,
        afm: data.afm,
        password: data.password,
        name: data.name,
        owner: data.owner,
      })
        .then(() => {
          navigate(LOGIN_PAGE_URL)

          setAlert({
            message: 'Dealership registered!',
            status: 'success'
          })
        })
    )
  }

  return (
    <Form className='form' onSubmit={handleSubmit(onSubmit)}>
      <div className='form-content'>

        <h1 className="page-title">Register</h1>

        {/* User Type Selection */}
        <Form.Group>
          <Form.Label>Register as</Form.Label>
          <Form.Select {...register("userType")}>
            <option value="citizen">Citizen</option>
            <option value="dealership">Car Dealership</option>
          </Form.Select>
        </Form.Group>

        {/* Common Fields */}
        <Form.Group className="mt-3">
          <Form.Label>AFM</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your AFM"
            {...register("afm", requiredRules)}
          />
          {errors.afm && <small className="text-danger">{errors.afm.message}</small>}
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your email"
            {...register("email", requiredRules)}
          />
          {errors.email && <small className="text-danger">{errors.email.message}</small>}
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            {...register("password", requiredRules)}
          />
          {errors.password && <small className="text-danger">{errors.password.message}</small>}
        </Form.Group>

        {/* Conditional Fields for Car Dealership */}
        {userType === "dealership" && (
          <>
            <Form.Group className="mt-3">
              <Form.Label>Dealership Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter dealership name"
                {...register("dealershipName", requiredRules)}
              />
              {errors.dealershipName && (
                <small className="text-danger">{errors.dealershipName.message}</small>
              )}
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Owner</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter owner"
                {...register("owner", requiredRules)}
              />
              {errors.owner && (
                <small className="text-danger">{errors.owner.message}</small>
              )}
            </Form.Group>
          </>
        )}

        {
          userType === "citizen" && (
            <>
              <Form.Group className="mt-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your first name"
                  {...register("firstName", requiredRules)}
                />
                {errors.firstName && (
                  <small className="text-danger">{errors.firstName.message}</small>
                )}
              </Form.Group>

              <Form.Group className="mt-3">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your last name"
                  {...register("lastName", requiredRules)}
                />
                {errors.lastName && (
                  <small className="text-danger">{errors.lastName.message}</small>
                )}
              </Form.Group>
            </>
          )
        }

        <Button type="submit" className="btn btn-primary mt-3">
          Register
        </Button>
      </div>
    </Form>
);
}
