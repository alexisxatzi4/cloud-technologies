
const BASE_URL = 'http://localhost:8080'

export const GET_CARS_URL = `${BASE_URL}/cars`
export const GET_CAR_URL = (id) => `${BASE_URL}/cars/${id}`
export const CREATE_CAR_URL = `${BASE_URL}/cars`
export const UPDATE_CAR_TOTAL_URL = (id) => `${BASE_URL}/cars/${id}/total`
export const BUY_CAR_URL = (id) => `${BASE_URL}/cars/${id}/buy`
export const RESERVE_CAR_URL = (id) => `${BASE_URL}/cars/${id}/reserve`

export const POST_LOGIN_URL = `${BASE_URL}/users/login`
export const POST_REGISTER_CITIZEN_URL = `${BASE_URL}/users/citizens`
export const POST_REGISTER_DEALERSHIP_URL = `${BASE_URL}/users/dealerships`

export const GET_RESERVATIONS_URL = (afm) => `${BASE_URL}/reservations/citizens/${afm}`




