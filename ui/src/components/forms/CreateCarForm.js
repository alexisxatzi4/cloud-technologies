import {Form} from "react-bootstrap"
import {Button} from "react-bootstrap"
import {useForm, Controller} from "react-hook-form";
import {axiosGet, axiosPost, axiosPut} from "../../lib/axios";
import {positiveNumberRules, requiredRules} from "../../lib/functions";
import {
  POST_EMPLOYEES_URL,
  GET_EMPLOYEE_URL,
  PUT_EMPLOYEE_URL,
  GET_ATTRIBUTES_URL
} from "../../lib/url/apiUrlConstants";
import {useNavigate} from 'react-router-dom';
import useCatch from "../../hooks/useCatch";
import {useAlert} from "../utils/GlobalAlert";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import DatePicker from 'react-datepicker'
import {EMPLOYEES_PAGE_URL} from "../../lib/url/pageUrlConstants";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select'

const initialData = {
  name: '',
  dateOfBirth: '',
  car: false,
  xcoordinate: '',
  ycoordinate: '',
  selectedAttributes: ''
}

export default function CreateCarForm() {
  const {register, handleSubmit, reset, control, formState: {errors}} = useForm({defaultValues: initialData});
  const navigate = useNavigate();
  const {cWrapper} = useCatch()
  const {setAlert} = useAlert()
  const location = useLocation()
  const [mode, setMode] = useState('add')
  const [attributes, setAttributes] = useState(null)

  const createEmployee = (data) => {
    // data['attributes'] = data.selectedAttributes.map(it => it.value)
    //
    // cWrapper(() =>
    //     axiosPost(POST_EMPLOYEES_URL, data)
    //         .then(() => {
    //             navigate(EMPLOYEES_PAGE_URL)
    //
    //             setAlert({
    //                 message: 'Employee added',
    //                 status: 'success'
    //             })
    //         })
    // )
  }

  const editEmployee = (data) => {
    // data['id']= location.state.id
    // data['attributes'] = data.selectedAttributes.map(it => it.value)
    // cWrapper(() =>
    //     axiosPut(PUT_EMPLOYEE_URL(location.state.id), data)
    //         .then(() => {
    //             navigate(EMPLOYEES_PAGE_URL)
    //
    //             setAlert({
    //                 message: 'Employee updated',
    //                 status: 'success'
    //             })
    //         })
    // )
  }

  const onSubmit = (data) => {
    // if (mode === 'add') {
    //     createEmployee(data)
    // } else {
    //     editEmployee(data)
    // }
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
            placeholder='Enter number of seats'
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

        <Button type='submit' className='btn btn-primary mt-3'>
          Create Car
        </Button>
      </div>
    </Form>
  )
}