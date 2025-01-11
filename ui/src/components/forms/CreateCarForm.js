import {Form} from "react-bootstrap"
import {Button} from "react-bootstrap"
import {useForm} from "react-hook-form";
import { axiosPost} from "../../lib/axios";
import {positiveNumberRules, requiredRules} from "../../lib/functions";
import {
CREATE_CAR_URL
} from "../../lib/url/apiUrlConstants";
import {useNavigate} from 'react-router-dom';
import useCatch from "../../hooks/useCatch";
import {useAlert} from "../utils/GlobalAlert";
import {CARS_PAGE_URL} from "../../lib/url/pageUrlConstants";
import "react-datepicker/dist/react-datepicker.css";
import useUserData from "../../hooks/useUserData";

const initialData = {
  name: '',
  dateOfBirth: '',
  car: false,
  xcoordinate: '',
  ycoordinate: '',
  selectedAttributes: ''
}

export default function CreateCarForm() {
  const {register, handleSubmit, formState: {errors}} = useForm({defaultValues: initialData});
  const navigate = useNavigate();
  const {cWrapper} = useCatch()
  const {setAlert} = useAlert()
  const {afm} = useUserData()

  const onSubmit = (data) => {
    cWrapper(() =>
      axiosPost(CREATE_CAR_URL, {
        ...data,
        dealershipAfm: afm
      })
        .then(() => {
          navigate(CARS_PAGE_URL)

          setAlert({
            message: 'Car created!',
            status: 'success'
          })
        })
    )
  }

  return (
    <Form className='form' onSubmit={handleSubmit(onSubmit)}>
      <div className='form-content'>
        <Form.Group>
          <Form.Label>Make</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter car make'
            {...register("make", requiredRules)}
          />
          {errors.make && <small className='text-danger'>{errors.make.message}</small>}
        </Form.Group>

        <Form.Group className='mt-3'>
          <Form.Label>Model</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter car model'
            {...register("model", requiredRules)}
          />
          {errors.model && <small className='text-danger'>{errors.model.message}</small>}
        </Form.Group>

        <Form.Group className='mt-3'>
          <Form.Label>Fuel</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter car fuel'
            {...register("fuel", requiredRules)}
          />
          {errors.fuel && <small className='text-danger'>{errors.fuel.message}</small>}
        </Form.Group>

        <Form.Group className='mt-3'>
          <Form.Label>Engine</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter car engine'
            {...register("engine", positiveNumberRules)}
          />
          {errors.engine && <small className='text-danger'>{errors.engine.message}</small>}
        </Form.Group>

        <Form.Group className='mt-3'>
          <Form.Label>Seats</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter number of seats'
            {...register("seats", positiveNumberRules)}
          />
          {errors.seats && <small className='text-danger'>{errors.seats.message}</small>}
        </Form.Group>

        <Form.Group className='mt-3'>
          <Form.Label>Price</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter price'
            {...register("price", positiveNumberRules)}
          />
          {errors.price && <small className='text-danger'>{errors.price.message}</small>}
        </Form.Group>

        <Form.Group className='mt-3'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter car description'
            {...register("description")}
          />
        </Form.Group>

        <Form.Group className='mt-3'>
          <Form.Label>Number of Cars</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter number of cars'
            {...register("total", positiveNumberRules)}
          />
          {errors.total && <small className='text-danger'>{errors.total.message}</small>}
        </Form.Group>

        <Button type='submit' className='btn btn-primary mt-3'>
          Create Car
        </Button>
      </div>
    </Form>
  )
}