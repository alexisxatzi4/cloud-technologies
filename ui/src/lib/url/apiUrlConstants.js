
const BASE_URL = 'http://localhost:8080'

export const GET_ATTRIBUTES_URL = `${BASE_URL}/attributes`
export const GET_ATTRIBUTE_URL = (id) => `${BASE_URL}/attributes/${id}`
export const POST_ATTRIBUTES_URL = `${BASE_URL}/attributes`
export const PUT_ATTRIBUTE_URL = (id) => `${BASE_URL}/attributes/${id}`
export const DELETE_ATTRIBUTE_URL = (id) => `${BASE_URL}/attributes/${id}`

export const GET_EMPLOYEES_URL = `${BASE_URL}/employees`
export const GET_EMPLOYEE_URL = (id) => `${BASE_URL}/employees/${id}`
export const POST_EMPLOYEES_URL = `${BASE_URL}/employees`
export const PUT_EMPLOYEE_URL = (id) => `${BASE_URL}/employees/${id}`

export const GET_CARS_URL = `${BASE_URL}/cars`
export const CREATE_CAR_URL = `${BASE_URL}/cars`

export const POST_LOGIN_URL = `${BASE_URL}/users/login`
export const POST_REGISTER_CITIZEN_URL = `${BASE_URL}/users/citizens`
export const POST_REGISTER_DEALERSHIP_URL = `${BASE_URL}/users/dealerships`




