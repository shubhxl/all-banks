import { useState, useEffect } from "react";
import './Home.css';
import Table from "../../components/Table/Table";
import DataTable from "../../components/DataTable/DataTable";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { setupCache } from 'axios-cache-adapter'
import Loader from "../../components/Loader/Loader";

const cache = setupCache({
    maxAge: 15 * 60 * 1000
  })

const api = axios.create({
adapter: cache.adapter
})
  
function Home(){

    const [searchData, setSearchData] = useState('')
    const [data, setData] = useState([])
    const [city, setCity] = useState('DELHI')
    const [searchCategory, setSearchCategory] = useState('')
    const [pageNumber, setPageNumber] = useState(0);
    const [loader, setLoader] = useState(true);
    const [alert, setAlert] = useState(false);
    const [rows, setRows] = useState(10);

 
    useEffect(() => {
        api({url:`https://vast-shore-74260.herokuapp.com/banks?city=${city}`,method: 'get'})
         .then(res => {setData(res.data)
                       setLoader(false);
        })
    }, [city])

  
    let filteredData;
  
    searchCategory == '' ? filteredData = data : filteredData = data.filter(el => el[searchCategory].toLowerCase().includes(searchData.toLowerCase()))
    
    const banksPerPage = rows;

    const pagesVisited = pageNumber * banksPerPage

    const displayBanks = filteredData.slice(pagesVisited, pagesVisited+banksPerPage)

    const pageCount = Math.ceil(filteredData.length / banksPerPage)

    const changePage = ({selected}) => {
        setPageNumber(selected)
    }

    const handleInputChange = (e) => {
        if(searchCategory==''){
            setAlert(true)
        } else {
            setSearchData(e.target.value) 
            setAlert(false);
        }
    }

    const handleCategoryChange = (e) => {
        setAlert(false);
        setSearchCategory(e.target.value)
    }

    const handleCityChange =(e) => {
        setLoader(true)
        setCity(e.target.value)
    }

    const rowsPerPageChange = (e) => {
        setLoader(true)
        setRows(e.target.value)
        setLoader(false)
    }

   
    return (
        <div className="home">
             <h1 className="text-center mt-2 main-heading">Find Your Bank </h1>
             <div className='searchBox mr-2'>

                <label className="label"> <b>City:</b> </label>
                <select className="form-control" id="cityDropdown" defaultValue="DELHI" onChange={handleCityChange}>
                <option value="DELHI">Delhi</option>
                <option value="PATNA">Patna</option>
                <option value="MUMBAI">Mumbai</option>
                <option value="BENGALURU">Bengaluru</option>
                <option value="KOLKATA">Kolkata</option>
                </select>

                <select className="form-control" id="categoryDropdown" onChange={handleCategoryChange}>
                <option disabled selected>Select Category</option> 
                <option value="ifsc">IFSC</option>
                <option value="bank_name">Bank Name</option>
                <option value="branch">Branch</option>
                </select>
                


                <input type="text" className="form-control" placeholder='Type to Search' onChange={handleInputChange} />
    
                </div>

                {
                   alert && <div className="alert alert-warning mr-2" role="alert">
                   Please select a category in order to Search
                   </div>
               }                
                    
       
                
                { loader && <div className="loader"><Loader /></div> }
                <div className="container">
                 <div className="row">
                  
                
                {
                    !loader && 
                  
                    <div className="col-10 mt-5 tablewithpagination">
                    <Table>
                    <DataTable banks={displayBanks} loader={loader}/>
                    </Table>
                    <div className="mt-4 bottom">

                    <ReactPaginate 
                        previousLabel="<"
                        nextLabel= ">"
                        pageCount={pageCount}
                        onPageChange={changePage}
                        containerClassName="paginationbtn"
                        previousLinkClassName="previousBttn"
                        nextLinkClassName="nextBttn"
                        disabledClassName="paginationDisabled"
                        activeClassName="paginationActive"
                    />

                    
                    <label htmlFor="rows" className="label2">Rows per page</label>
                    <select className="form-control" defaultValue="10" id="rowsperpage" onChange={rowsPerPageChange}>
                        <option value="10">10</option> 
                        <option value="20">20</option>
                        <option value="50">30</option>
                        <option value="100">100</option>
                    </select>

                     </div>
                </div>
                }
                </div>
                </div>
               
        </div>
    )
}

export default Home;


