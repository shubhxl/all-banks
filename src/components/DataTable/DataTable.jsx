import React from 'react';
import './DataTable.css';
import {useNavigate} from 'react-router-dom';

function DataTable({banks}) {

let navigate = useNavigate();


   return <div className='main-table table-responsive'>
    <table className='table'>

    <thead className="thead-light">
        <tr>
            <th style={{width: "20%"}}>Bank Name</th>
            <th style={{width: "20%"}}>IFSC</th>
            <th style={{width: "20%"}}>Branch</th>
            <th style={{width: "10%"}}>BankID</th>
            <th style={{width: "30%"}}>Address</th>

        </tr>
    </thead>
     
        { 
            banks.length == 0 
            ?    <p className='not-found'> No banks found in the search !! </p>

            :    <tbody> 
                { 
                banks.map((bank, i) => {
                return <tr style={{cursor:'pointer'}} onClick={() => navigate(`/bank-details/${bank.ifsc}?city=${bank.city}`)} key={i}>
                    <td>{bank.bank_name}</td>
                    <td>{bank.ifsc}</td>
                    <td>{bank.branch}</td>
                    <td>{bank.bank_id}</td>
                    <td>{bank.address}</td>
                </tr>
                })
                }
            </tbody>
        }
          
      
  


</table>

</div>
  

}

export default DataTable;
