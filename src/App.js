
import './App.css';
import Create from './Pages/Create';
import DeleteUser from './Pages/DeleteUser';
import FetchAllUsers from './Pages/FetchAllUsers';
import FetchUser from './Pages/FetchUser';
import UpdateUser from './Pages/UpdateUser';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { StateProvider } from "./Context/StateContext";
import Home from './Pages/Home';
import InputDelete from './Pages/InputDelete';
import InputUpdate from './Pages/InputUpdate';



function App() {
  return (
    <Router>
      <StateProvider>
      <Routes>
        <Route  path="/create" element={<Create/>} />
        <Route  path="/users" element={<FetchAllUsers/>} />
        <Route  path="/fetch" element={<FetchUser/>} />
        <Route  path="/update/:email" element={<UpdateUser/>} />
        <Route path="/delete/:email" element={<DeleteUser/>} />
        <Route path="/delete/user/" element={<InputDelete />}/>
        <Route path="/update/user/" element={<InputUpdate />}/>
        <Route index path="/" element={<Home/>} />
      </Routes>
      </StateProvider>
    </Router>

  );
}

export default App;
