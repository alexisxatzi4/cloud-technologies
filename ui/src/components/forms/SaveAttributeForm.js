import { Form } from "react-bootstrap"
import { Button } from "react-bootstrap"
import { useForm } from "react-hook-form";
import { axiosGet, axiosPost, axiosPut } from "../../lib/axios";
import { requiredRules } from "../../lib/functions";
import { POST_ATTRIBUTES_URL, GET_ATTRIBUTE_URL, PUT_ATTRIBUTE_URL } from "../../lib/url/apiUrlConstants";
import { useNavigate } from 'react-router-dom';
import useCatch from "../../hooks/useCatch";
import { useAlert } from "../utils/GlobalAlert";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ATTRIBUTES_PAGE_URL } from "../../lib/url/pageUrlConstants";

const initialData = {
    name: '',
    value: ''
}

export default function SaveAttributeForm() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialData });
    const navigate = useNavigate();
    const { cWrapper } = useCatch()
    const { setAlert } = useAlert()
    const location = useLocation()
    const [mode, setMode] = useState('add')

    const createAttribute = (data) => {
        cWrapper(() =>
            axiosPost(POST_ATTRIBUTES_URL, data)
                .then(() => {
                    navigate(ATTRIBUTES_PAGE_URL)

                    setAlert({
                        message: 'Attribute added',
                        status: 'success'
                    })
                })
        )
    }

    const editAttribute = (data) => {
        cWrapper(() =>
            axiosPut(PUT_ATTRIBUTE_URL(location.state.id), { value: data.value })
                .then(() => {
                    navigate(ATTRIBUTES_PAGE_URL)

                    setAlert({
                        message: 'Attribute updated',
                        status: 'success'
                    })
                })
        )
    }

    const onSubmit = (data) => {

        if (mode === 'add') {
            createAttribute(data)
        } else {
            editAttribute(data)
        }


    }

    useEffect(() => {

        if (location.state) {
            cWrapper(() =>
                axiosGet(GET_ATTRIBUTE_URL(location.state.id))
                    .then(response => {
                        const data = response.data.data

                        reset({
                            name: data.name,
                            value: data.value
                        })

                        setMode('edit')
                    })
            )
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reset, location])

    return (
        <Form id='attributeForm' onSubmit={handleSubmit(onSubmit)} >
            <h1 className='page-title'>Save Attribute</h1>
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type='text'
                    name='name'
                    placeholder='Enter name'
                    disabled={mode !== 'add'}
                    {...register("name", requiredRules)}
                />
                {errors.name && <small className='text-danger'>{errors.name.message}</small>}
            </Form.Group>

            <Form.Group className='mt-3'>
                <Form.Label>Value</Form.Label>
                <Form.Control
                    type='text'
                    name='value'
                    placeholder='Enter value'
                    {...register("value", requiredRules)}
                />
                {errors.value && <small className='text-danger'>{errors.value.message}</small>}
            </Form.Group>

            <Button type='submit' className='btn btn-primary mt-3'>
                Save Attribute
            </Button>
        </Form>
    )
}