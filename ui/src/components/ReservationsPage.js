import useUserData from "../hooks/useUserData";
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";
import {useEffect, useState} from "react";
import {axiosGet} from "../lib/axios";
import {GET_RESERVATIONS_URL} from "../lib/url/apiUrlConstants";
import useCatch from "../hooks/useCatch";

export default function ReservationsPage() {
  const [tableData, setTableData] = useState(null)
  const {cWrapper} = useCatch()

  const {user, afm} = useUserData()

  useEffect(() => {
    cWrapper(() =>
      axiosGet(GET_RESERVATIONS_URL(afm))
        .then(response => {
          const data = response.data;
          setTableData(data)
        })
    )
  }, [])

  return (
    <div>
      <h1 className='page-title'>My reservations</h1>

      {
        user ?
          <>
            <DataTable value={tableData} responsiveLayout="scroll">
              <Column field="dealershipName" header="Dealership" className='table-row'></Column>
              <Column field="make" header="Make" className='table-row'></Column>
              <Column field="model" header="Model" className='table-row'></Column>
              <Column field="fuel" header="Fuel" className='table-row'></Column>
              <Column field="reservationDate" header="Date" className='table-row'></Column>
              <Column field="reservationTimeInMinutes" header="Duration in minutes" className='table-row'></Column>
            </DataTable>
          </>
          : 'Please log in'
      }

    </div>
  );
}
