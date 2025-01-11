import { Form } from "react-bootstrap"
import { Button } from "react-bootstrap"
import { useForm, Controller } from "react-hook-form";
import { axiosGet, axiosPost, axiosPut } from "../../lib/axios";
import { textRequiredRules } from "../../lib/functions";
import { POST_EMPLOYEES_URL, GET_EMPLOYEE_URL, PUT_EMPLOYEE_URL, GET_ATTRIBUTES_URL } from "../../lib/url/apiUrlConstants";
import { useNavigate } from 'react-router-dom';
import useCatch from "../../hooks/useCatch";
import { useAlert } from "../utils/GlobalAlert";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import DatePicker from 'react-datepicker'
import { EMPLOYEES_PAGE_URL } from "../../lib/url/pageUrlConstants";
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

export default function SaveEmployeeForm() {
    const { register, handleSubmit, reset, control, formState: { errors } } = useForm({ defaultValues: initialData });
    const navigate = useNavigate();
    const { cWrapper } = useCatch()
    const { setAlert } = useAlert()
    const location = useLocation()
    const [mode, setMode] = useState('add')
    const [attributes, setAttributes] = useState(null)

    const createEmployee = (data) => {
        data['attributes'] = data.selectedAttributes.map(it => it.value)

        cWrapper(() =>
            axiosPost(POST_EMPLOYEES_URL, data)
                .then(() => {
                    navigate(EMPLOYEES_PAGE_URL)

                    setAlert({
                        message: 'Employee added',
                        status: 'success'
                    })
                })
        )
    }

    const editEmployee = (data) => {
        data['id']= location.state.id
        data['attributes'] = data.selectedAttributes.map(it => it.value)
        cWrapper(() =>
            axiosPut(PUT_EMPLOYEE_URL(location.state.id), data)
                .then(() => {
                    navigate(EMPLOYEES_PAGE_URL)

                    setAlert({
                        message: 'Employee updated',
                        status: 'success'
                    })
                })
        )
    }

    const onSubmit = (data) => {
        if (mode === 'add') {
            createEmployee(data)
        } else {
            editEmployee(data)
        }
    }

    useEffect(() => {
        if (location.state && attributes) {
            axiosGet(GET_EMPLOYEE_URL(location.state.id))
                .then(response => {
                    const data = response.data.data

                    const selectedAttributes = attributes.filter(it => data.attributes.includes(it.id))
                        .map(it => ({ value: it.id, label: `${it.name}: ${it.value}` }))
                    reset({
                        name: data.name,
                        dateOfBirth: data.dateOfBirth,
                        car: data.car,
                        xcoordinate: data.xcoordinate,
                        ycoordinate: data.ycoordinate,
                        selectedAttributes
                    })

                    setMode('edit')
                })
        }

    }, [reset, location, attributes])

    useEffect(() => {
        axiosGet(GET_ATTRIBUTES_URL)
            .then(response => {
                const data = response.data.data;

                setAttributes(data)
            })
    }, [])

    return (
        <Form id='employeeForm' onSubmit={handleSubmit(onSubmit)} >
            <h1 className='page-title'>Save Employee</h1>
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type='text'
                    name='name'
                    placeholder='Enter name'
                    {...register("name", textRequiredRules)}
                />
                {errors.name && <small className='text-danger'>{errors.name.message}</small>}
            </Form.Group>

            <Form.Group className='mt-3'>
                <Form.Label>Date of Birth</Form.Label>
                <Controller
                    name="dateOfBirth"
                    control={control}
                    rules={{
                        required: {
                            value: true,
                            message: 'Choose date of birth'
                        }
                    }}
                    render={({ field: { onChange, value} }) =>
                        <DatePicker
                            placeholderText="Select birth date"
                            onChange={onChange}
                            selected={value}
                            dateFormat="dd/MM/yyyy"
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            className='form-control'
                        />}
                />
                {errors.dateOfBirth && <small className='text-danger'>{errors.dateOfBirth.message}</small>}
            </Form.Group>

            <Form.Group className='mt-3 flex'>
                <Form.Label>Has Car</Form.Label>
                <Form.Check
                    className='ml-3'
                    type='checkbox'
                    name='car'

                    {...register("car")}
                />
                {errors.car && <small className='text-danger'>{errors.car.message}</small>}
            </Form.Group>

            <Form.Group className='mt-3'>
                <Form.Label>X Coordinate</Form.Label>
                <Form.Control
                    type='text'
                    name='xcoordinate'
                    placeholder='Enter X Coordinate'
                    {...register("xcoordinate", textRequiredRules)}
                />
                {errors.xcoordinate && <small className='text-danger'>{errors.xcoordinate.message}</small>}
            </Form.Group>

            <Form.Group className='mt-3'>
                <Form.Label>Y Coordinate</Form.Label>
                <Form.Control
                    type='text'
                    name='ycoordinate'
                    placeholder='Enter Y Coordinate'
                    {...register("ycoordinate", textRequiredRules)}
                />
                {errors.ycoordinate && <small className='text-danger'>{errors.ycoordinate.message}</small>}
            </Form.Group>

            <Form.Group className='mt-3'>
                <Form.Label>Attributes</Form.Label>
                <Controller
                    control={control}
                    name='selectedAttributes'
                    rules={{
                        required: {
                            value: true,
                            message: "Select an attribute. If none exist, create one first."
                        }
                    }}
                    render={({ field: { onChange, onBlur, value } }) =>
                        <Select
                            onChange={onChange}
                            onBlur={onBlur}
                            value={value}
                            instanceId="attributes"
                            placeholder='Select Attributes'
                            isMulti
                            closeMenuOnSelect={false}
                            options={attributes && attributes.map(it => ({ value: it.id, label: `${it.name}: ${it.value}` }))}
                        />}
                />
                {errors.selectedAttributes && <small className='text-danger'>{errors.selectedAttributes.message}</small>}
            </Form.Group>

            <Button type='submit' className='btn btn-primary mt-3'>
                Save Employee
            </Button>
        </Form>
    )
}