import React from 'react';
import './BankDetail.css'
import { useState, useEffect} from 'react';
import {useParams, useSearchParams, useNavigate, Link} from 'react-router-dom';
import axios from 'axios';
import Loader from '../../components/Loader/Loader';

function BankDetail() {

  let {ifsc} = useParams();

  const [data, setData] = useState('');
  const [loader, setLoader] =useState(true)
  
  let [searchParams, setSearchParams] = useSearchParams();

  let city = searchParams.get("city");


  const navigate = useNavigate();

  useEffect(() => {

    if(city!=null){
      localStorage.setItem('city', city)
    }

  }, [city])
  
  useEffect(() => {

    let selectedCity = localStorage.getItem('city')

    axios.get(`https://vast-shore-74260.herokuapp.com/banks?city=${selectedCity}`)
      .then(res => {
        const bank = res.data.filter(el => el['ifsc'].toLowerCase().includes(ifsc.toLowerCase()))
        setData(bank[0])
        setLoader(false)
      })

      navigate(`/bank-details/${ifsc}`)
    
  }, [])

  return <div className='mt-2 details'>
       <h1 style={{fontFamily: '\'Times New Roman\', Times, serif'}}>Bank Detail Page</h1>
       <div className="main-div">

    {
      loader || !data 
      ? (  <div className='loader'>
           <Loader />
           </div>
           ) 
      :      <div className='shadow p-3 rounded main-detail'> 
              <div>
                <b> {data.bank_name} </b>
              </div>
              <div>
              <b>  IFSC: </b> {data.ifsc} 
              </div>
              <div>   
              <b>  Branch: </b> {data.branch}
              </div>
              <div> 
              <b> BankID: </b> {data.bank_id}
              </div>
              <div className='address'> 
              <b> Address: </b> {data.address}
              </div>   
              </div>
    }

       </div>
      <Link to="/all-banks">
       <button type="button" className="btn btn-dark">All Banks</button>
       </Link>
  </div>;
}

export default BankDetail;
