import './App.css';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Home from './pages/home/Home';
import BankDetail from './pages/bank-details/BankDetail';
import ErrorPage from './pages/errorpage/ErrorPage';

function App() {

  return ( <div className='App'>
    
     <BrowserRouter>
      <Routes>

        <Route path="/all-banks" index element={<Home/>} />
        <Route path="/bank-details/:ifsc" element={<BankDetail />} />
        <Route path="" element={<Navigate to="/all-banks" />} />
        <Route path="*" element={<ErrorPage />} />

      </Routes>
     </BrowserRouter>
     </div>
  );
}

export default App;
