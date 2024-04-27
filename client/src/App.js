import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { AuthProvider } from './context/auth';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer} from 'react-toastify';
import Login from './pages/Loginpage';
import Register from './pages/Registerpage';
import Event from './pages/Eventpage';
import Category from './pages/categorypage';
function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
              <Route path='/' element={<Login></Login>} />
              <Route path='/Home' element={<Home></Home>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/register' element={<Register/>}/>
              <Route path='/Event' element={<Event></Event>}></Route>
              <Route path='/category' element={<Category></Category>}></Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
