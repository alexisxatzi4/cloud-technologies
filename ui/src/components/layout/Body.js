import {Route, Routes} from "react-router-dom"
import Attributes from '../Attributes'
import Employees from '../Employees'
import SaveAttributeForm from "../forms/SaveAttributeForm"
import {
  SAVE_ATTRIBUTE_PAGE_URL,
  ATTRIBUTES_PAGE_URL,
  EMPLOYEES_PAGE_URL,
  SAVE_EMPLOYEES_PAGE_URL, LOGIN_PAGE_URL, REGISTER_PAGE_URL, CARS_PAGE_URL
} from "../../lib/url/pageUrlConstants"
import SaveEmployeeForm from "../forms/SaveEmployeeForm"
import LoginPage from "../forms/LoginPage";
import RegisterForm from "../forms/RegisterForm";
import Cars from "../Cars";

export default function Body() {

  return (
    <div className="content">
      <Routes>
        <Route path={ATTRIBUTES_PAGE_URL} element={<Attributes/>}/>
        <Route path={SAVE_ATTRIBUTE_PAGE_URL} element={<SaveAttributeForm/>}/>
        <Route path={EMPLOYEES_PAGE_URL} element={<Employees/>}/>
        <Route path={SAVE_EMPLOYEES_PAGE_URL} element={<SaveEmployeeForm/>}/>

        <Route path={CARS_PAGE_URL} element={<Cars/>}/>


        <Route exact path={REGISTER_PAGE_URL} element={<RegisterForm/>}/>
        <Route exact path={LOGIN_PAGE_URL} element={<LoginPage/>}/>
      </Routes>
    </div>
  )
}