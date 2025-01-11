import {Button, Form} from "react-bootstrap";
import {textRequiredRules} from "../../lib/functions";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import useCatch from "../../hooks/useCatch";
import {useAlert} from "../utils/GlobalAlert";
import {axiosPost} from "../../lib/axios";
import {POST_LOGIN_URL} from "../../lib/url/apiUrlConstants";
import {setItem} from "../../lib/storage";
import useUserData from "../../hooks/useUserData";
import {CARS_PAGE_URL} from "../../lib/url/pageUrlConstants";

const initialData = {
  email: '',
  password: ''
}

export default function LoginPage() {
  const {register, handleSubmit, formState: {errors}} = useForm({ defaultValues: initialData });
  const navigate = useNavigate();
  const {cWrapper} = useCatch()
  const {setAlert} = useAlert()

  const onSubmit = (data) => {
    cWrapper(() =>
      axiosPost(POST_LOGIN_URL, data)

        .then((response) => {
          const user = response.data

          setItem('user', user)

          navigate(CARS_PAGE_URL)

          setAlert({
            message: 'Logged in!',
            status: 'success'
          })
        })
    )
    console.log('login')
  }

  return (
    <Form id='registerForm' onSubmit={handleSubmit(onSubmit)}>
      <h1 className='page-title'>Login</h1>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type='text'
          placeholder='Enter email'
          {...register("email", textRequiredRules)}
        />
        {errors.email && <small className='text-danger'>{errors.email.message}</small>}
      </Form.Group>

      <Form.Group className='mt-3'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          placeholder='Enter password'
          {...register("password", textRequiredRules)}
        />
        {errors.password && <small className='text-danger'>{errors.password.message}</small>}
      </Form.Group>

      <Button type='submit' className='btn btn-primary mt-3'>
        Login
      </Button>
    </Form>
  )
}