import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {useState, useEffect} from 'react';
import LoadingSpinner from '../utils/LoadingSpinner';
import {axiosGet, axiosPut} from '../../lib/axios';
import {GET_CAR_URL, GET_CARS_URL, UPDATE_CAR_TOTAL_URL} from '../../lib/url/apiUrlConstants';
import {Link} from 'react-router-dom';
import {Button, Form, Modal} from 'react-bootstrap';
import {useAlert} from '../utils/GlobalAlert';
import {CREATE_CAR_PAGE_URL} from '../../lib/url/pageUrlConstants';
import useCatch from '../../hooks/useCatch';
import {useForm} from "react-hook-form";
import useUserData from "../../hooks/useUserData";

export default function CarsTable() {
  const [tableData, setTableData] = useState(null)
  const {setAlert} = useAlert()
  const {cWrapper} = useCatch()
  const {register, setValue, watch, getValues, formState: {errors}} = useForm();
  const {isCitizen, afm} = useUserData()
  const [updateTotalModal, setUpdateTotalModal] = useState(false);
  const [carToUpdateTotal, setCarToUpdateTotal] = useState(null)

  const filterData = watch()

  const filterCars = () => {
    const make = filterData?.make
    const model = filterData?.model
    const fuel = filterData?.fuel

    if (make || model || fuel) {
      axiosGet(GET_CARS_URL, {
        make,
        model,
        fuel
      })
        .then(response => {
          const data = response.data;
          setTableData(data)
        })
    } else {
      setAlert({
        message: 'Fill at least one filter',
        status: 'danger'

      })
    }
  }

  const clearFilters = () => {
    setValue('make', null)
    setValue('model', null)
    setValue('fuel', null)

    axiosGet(GET_CARS_URL)
      .then(response => {
        const data = response.data;
        setTableData(data)
      })
  }

  const buyCar = (rowData) => {

    setAlert({
      message: 'Congratulations! Car bought.',
      status: 'success'
    })
  }

  const updateCarTotal = () => {

    console.log(getValues().numberOfCars)
    console.log(carToUpdateTotal)

    cWrapper(() =>
      axiosPut(
        UPDATE_CAR_TOTAL_URL(carToUpdateTotal),
        {
          total: getValues().numberOfCars,
          dealershipAfm: afm,
        },
      )
        .then(() => {
          axiosGet(GET_CAR_URL(carToUpdateTotal))
            .then((response) => {
              const data = response.data
              setTableData(previous => previous.map(it => it.id === data.id ? data : it))
            })

          setAlert({
            message: 'Car total updated!',
            status: 'success'
          })

        })
        .finally(() => {
          setValue('numberOfCars', null)
          setUpdateTotalModal(false)
        })
    )
  }

  const actionsColumnBody = (rowData) => {
    return (
      isCitizen ?
        <div className='d-flex'>
          <Link to={CREATE_CAR_PAGE_URL} state={{id: rowData.id}}>
            <i className="bi bi-car-front custom-icon mr-3" title='Reserve car for test drive'/>
          </Link>

          <i className="bi bi-currency-dollar custom-icon ml-3" title='Buy car' onClick={() => buyCar(rowData)}/>
        </div>
        : <div className='d-flex'>
          <i className="bi bi-plus-square custom-icon ml-3" title='Update total'
             onClick={() => showUpdateTotalModal(rowData)}/>
        </div>
    )
  }

  useEffect(() => {
    cWrapper(() =>
      axiosGet(GET_CARS_URL)
        .then(response => {
          const data = response.data;
          setTableData(data)
        })
    )
  }, [])

  const closeUpdateTotalModal = () => setUpdateTotalModal(false);

  const showUpdateTotalModal = (rowData) => {
    setUpdateTotalModal(true)
    setCarToUpdateTotal(rowData.id)
  };

  return (
    tableData ? <div>
        <Modal show={updateTotalModal} onHide={closeUpdateTotalModal}>
          <Modal.Header closeButton>
            <Modal.Title>Update Car Total</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Insert the number of cars
            <Form.Group className='filter-field mt-2'>
              <Form.Control
                type='text'
                placeholder='# of cars'
                {...register("numberOfCars")}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeUpdateTotalModal}>
              Close
            </Button>
            <Button variant="primary" onClick={updateCarTotal}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        <div className='filters'>
          <h3>Filters</h3>
          <div className='filters-wrapper'>
            <Form.Group className='filter-field'>
              <Form.Control
                type='text'
                placeholder='Filter by make'
                {...register("make")}
              />
            </Form.Group>
            <Form.Group className='filter-field'>
              <Form.Control
                type='text'
                placeholder='Filter by model'
                {...register("model")}
              />
            </Form.Group>
            <Form.Group className='filter-field'>
              <Form.Control
                type='text'
                placeholder='Filter by fuel'
                {...register("fuel")}
              />
            </Form.Group>

            <Button onClick={filterCars}>
              Filter Cars
            </Button>

            <Button variant="link" onClick={clearFilters}>
              Clear filters
            </Button>
          </div>
        </div>

        <DataTable value={tableData} responsiveLayout="scroll">
          <Column field="make" header="Make" className='table-row'></Column>
          <Column field="model" header="Model" className='table-row'></Column>
          <Column field="fuel" header="Fuel" className='table-row'></Column>
          <Column field="engine" header="Engine" className='table-row'></Column>
          <Column field="seats" header="Seats" className='table-row'></Column>
          <Column field="price" header="Price" className='table-row'></Column>
          <Column field="description" header="Description" className='table-row'></Column>
          <Column field="dealershipName" header="Dealership" className='table-row'></Column>
          <Column field="total" header="# of Cars" className='table-row'></Column>
          <Column field="actions" header="Actions" className='table-row' body={actionsColumnBody}></Column>
        </DataTable>
      </div>
      : <LoadingSpinner/>

  )
}