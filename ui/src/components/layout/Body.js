import {Route, Routes} from "react-router-dom"

import {
  LOGIN_PAGE_URL, REGISTER_PAGE_URL, CARS_PAGE_URL, CREATE_CAR_PAGE_URL, RESERVATIONS_PAGE_URL
} from "../../lib/url/pageUrlConstants"
import LoginPage from "../LoginPage";
import RegisterPage from "../RegisterPage";
import CarsPage from "../CarsPage";
import CreateCarForm from "../forms/CreateCarForm";
import ReservationsPage from "../ReservationsPage";

export default function Body() {

  return (
    <div className="content">
      <Routes>

        <Route path={CARS_PAGE_URL} element={<CarsPage/>}/>
        <Route path={CREATE_CAR_PAGE_URL} element={<CreateCarForm/>}/>

        <Route path={RESERVATIONS_PAGE_URL} element={<ReservationsPage/>}/>


        <Route exact path={REGISTER_PAGE_URL} element={<RegisterPage/>}/>
        <Route exact path={LOGIN_PAGE_URL} element={<LoginPage/>}/>
      </Routes>
    </div>
  )
}