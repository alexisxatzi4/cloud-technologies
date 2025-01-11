
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useState, useEffect } from 'react';
import LoadingSpinner from '../utils/LoadingSpinner';
import { axiosGet } from '../../lib/axios';
import { GET_EMPLOYEES_URL } from '../../lib/url/apiUrlConstants';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { SAVE_EMPLOYEES_PAGE_URL } from '../../lib/url/pageUrlConstants';
import useCatch from '../../hooks/useCatch';

export default function EmployeesTable() {
    const [tableData, setTableData] = useState(null)
    const { cWrapper } = useCatch()

    const actionsColumnBody = (rowData) => {
        return (
            <>
                <Link to={SAVE_EMPLOYEES_PAGE_URL} state={{ id: rowData.id }}>
                    <i className="bi bi-pencil custom-icon mr-3" title='Edit' />
                </Link>
            </>
        )
    }

    const booleanColumnBody = (rowData) => {
        return rowData.car ? 'Yes' : 'No'
    }

    useEffect(() => {
        cWrapper(() =>
            axiosGet(GET_EMPLOYEES_URL)
                .then(response => {
                    const data = response.data.data;

                    setTableData(data)
                })
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        tableData ? <div >
            <DataTable value={tableData} responsiveLayout="scroll" >
                <Column field="name" header="Name" className='table-row'></Column>
                <Column field="dateOfBirth" header="Date Of Birth" className='table-row'></Column>
                <Column field="car" header="Car" className='table-row' body={booleanColumnBody}></Column>
                <Column field="xcoordinate" header="X Coordinate" className='table-row'></Column>
                <Column field="ycoordinate" header="Y Coordinate" className='table-row'></Column>
                <Column field="actions" header="" className='table-row' body={actionsColumnBody}></Column>
            </DataTable>
        </div>
            : <LoadingSpinner />

    )
}