import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {useState, useEffect} from 'react';
import LoadingSpinner from '../utils/LoadingSpinner';
import {axiosGet, axiosPost, axiosPut} from '../../lib/axios';
import {
  BUY_CAR_URL,
  GET_CAR_URL,
  GET_CARS_URL, RESERVE_CAR_URL,
  UPDATE_CAR_TOTAL_URL
} from '../../lib/url/apiUrlConstants';
import {Button, Form, Modal} from 'react-bootstrap';
import {useAlert} from '../utils/GlobalAlert';
import useCatch from '../../hooks/useCatch';
import {useForm} from "react-hook-form";
import useUserData from "../../hooks/useUserData";

export default function CarsTable() {
  const [tableData, setTableData] = useState(null)
  const {setAlert} = useAlert()
  const {cWrapper} = useCatch()
  const {register, setValue, watch, getValues} = useForm();
  const {isCitizen, afm} = useUserData()
  const [updateTotalModal, setUpdateTotalModal] = useState(false);
  const [carToUpdateTotal, setCarToUpdateTotal] = useState(null)
  const [carToReserve, setCarToReserve] = useState(null)
  const [reserveCarModal, setReserveCarModal] = useState(false);

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

    cWrapper(() =>
      axiosPost(BUY_CAR_URL(rowData.id))
        .then(() => {
          axiosGet(GET_CAR_URL(rowData.id))
            .then((response) => {
              const data = response.data
              setTableData((previous) =>
                previous.map((it) => (it.id === data.id ? {...it, ...data} : it))
              );
              setAlert({
                message: 'Congratulations! Car bought.',
                status: 'success'
              })
            })
        })
    )
  }

  const updateCarTotal = () => {

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
          <i className="bi bi-car-front custom-icon" title='Reserve car for test drive'
             onClick={() => showReserveCarModal(rowData)}/>
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
  const closeReserveCarModal = () => setReserveCarModal(false);

  const showUpdateTotalModal = (rowData) => {
    setUpdateTotalModal(true)
    setCarToUpdateTotal(rowData.id)
  };

  const showReserveCarModal = (rowData) => {
    setReserveCarModal(true)
    setCarToReserve(rowData.id)
  };

  const reserveCar = () => {
    cWrapper(() =>
      axiosPost(
        RESERVE_CAR_URL(carToReserve),
        {
          citizenAfm: afm,
          reservationDate: getValues().reservationDateTime,
          reservationTimeInMinutes: getValues().duration,
        },
      )
        .then(() => {
          axiosGet(GET_CAR_URL(carToReserve))
            .then((response) => {
              const data = response.data
              setTableData(previous => previous.map(it => it.id === data.id ? data : it))
            })

          setAlert({
            message: 'Car reserved!',
            status: 'success'
          })

        })
        .finally(() => {
          setValue('reservationDateTime', null)
          setValue('duration', null)
          setReserveCarModal(false)
        })
    )
  }

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

        <Modal show={reserveCarModal} onHide={closeReserveCarModal}>
          <Modal.Header closeButton>
            <Modal.Title>Reserve a Car for test drive</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="date-field mt-2">
                <Form.Label>Reservation Date & Time</Form.Label>
                <Form.Control
                  type="datetime-local"
                  {...register("reservationDateTime")}
                />
              </Form.Group>

              <Form.Group className="date-field mt-3">
                <Form.Label>Duration</Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  placeholder="Enter duration in minutes"
                  {...register("duration")}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeReserveCarModal}>
              Close
            </Button>
            <Button variant="primary" onClick={reserveCar}>
              Reserve Car
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