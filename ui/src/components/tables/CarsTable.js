import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {useState, useEffect} from 'react';
import LoadingSpinner from '../utils/LoadingSpinner';
import {axiosGet} from '../../lib/axios';
import {GET_CARS_URL} from '../../lib/url/apiUrlConstants';
import {Link} from 'react-router-dom';
import {Button, Form} from 'react-bootstrap';
import {useAlert} from '../utils/GlobalAlert';
import {CREATE_CAR_PAGE_URL} from '../../lib/url/pageUrlConstants';
import useCatch from '../../hooks/useCatch';
import {useForm} from "react-hook-form";

export default function CarsTable() {
  const [tableData, setTableData] = useState(null)
  const {setAlert} = useAlert()
  const {cWrapper} = useCatch()
  const {register,setValue,watch, getValues, formState: {errors}} = useForm();

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

  const handleDelete = (rowData) => {

  }

  const actionsColumnBody = (rowData) => {
    return (
      <>
        <Link to={CREATE_CAR_PAGE_URL} state={{id: rowData.id}}>
          <i className="bi bi-pencil custom-icon mr-3" title='Edit'/>
        </Link>

        <i className="bi bi-trash custom-icon mr-3" title='Delete' onClick={() => handleDelete(rowData)}/>
      </>

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    tableData ? <div>
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