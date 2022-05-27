
import './App.scss';
import Trangchu from './components/Trangchu';
import Login from './components/Login';
import Signup from './components/Signup';
import Admin from './components/Admin'
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { useEffect } from 'react';
import { blockchainAction } from './redux/actions/blockchainAction';
import { useDispatch } from 'react-redux';
import Vote from './components/Vote';
function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(blockchainAction())
},[dispatch])
  
  return (
    <div className="app">
      <ToastContainer />
      <Router>
        <Routes>
          <Route path='/' exact element={<Trangchu />} />
          <Route path='/login' element={ <Login />} />
          <Route path='/admin' element={ <Admin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/event/:id' element={<Vote />} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
