import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './components/Home';
import Navbar from './components/Navbar';
import TaskState from './components/TaskState';
import Login from './components/Login';
import Signup from './components/Signup';
import Alert from './components/Alert';
import AlertState from './components/AlertState';

function App() {
  return (
    <TaskState>
      <AlertState>
      <Router>
        <Navbar />
        <Alert/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </Router>
      </AlertState>
    </TaskState>
  );
}

export default App;
