
import './App.css';
import Create from './Pages/Create';
import FetchAllUsers from './Pages/FetchAllUsers';
import FetchUser from './Pages/FetchUser';
import UpdateUser from './Pages/UpdateUser';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (

    <Router>
      <Routes>
        <Route index path="/" element={<Create/>} />
        <Route  path="/fetch/users" element={<FetchAllUsers/>} />
        <Route  path="/fetch" element={<FetchUser/>} />
        <Route  path="/update" element={<UpdateUser/>} />
      </Routes>
    </Router>

  );
}

export default App;
