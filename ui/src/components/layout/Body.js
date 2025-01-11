import {Route, Routes} from "react-router-dom"

import {
 LOGIN_PAGE_URL, REGISTER_PAGE_URL, CARS_PAGE_URL, SAVE_CARS_PAGE_URL
} from "../../lib/url/pageUrlConstants"
import SaveEmployeeForm from "../forms/SaveEmployeeForm"
import LoginPage from "../LoginPage";
import RegisterPage from "../RegisterPage";
import CarsPage from "../Cars";

export default function Body() {

  return (
    <div className="content">
      <Routes>

        <Route path={CARS_PAGE_URL} element={<CarsPage/>}/>
        <Route path={SAVE_CARS_PAGE_URL} element={<SaveEmployeeForm/>}/>


        <Route exact path={REGISTER_PAGE_URL} element={<RegisterPage/>}/>
        <Route exact path={LOGIN_PAGE_URL} element={<LoginPage/>}/>
      </Routes>
    </div>
  )
}