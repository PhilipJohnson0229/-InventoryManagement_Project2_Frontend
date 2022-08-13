import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { NavBar } from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Home } from './components/StoreInventory/Home';
import { Items } from './components/StoreInventory/Items';
import { Stores } from './components/StoreInventory/Stores';
import Jaxnation from "./components/StoreInventory/Jaxnation";
import DynamicPage from "./components/StoreInventory/DynamicPage";

function App() {
  return (
    <BrowserRouter>
    <NavBar> 
    <section className='nav-section'>
      <div className='nav-item'>
        <Link className='nav-item' to="/">Home</Link>
      </div>
      <div className='nav-item'>
        <Link className='nav-item' to="/cards">Store Locator</Link>
      </div>
      <div className='nav-item'>
        <Link className='nav-item' to="/table">Items</Link>
      </div>
      <div className='nav-item'>
        <Link className='nav-item' to="/table/Jaxnation">Jaxnation</Link>
      </div>
    </section>
    </NavBar>
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/table" element={<Items/>}/>
        <Route path="/table/Jaxnation" element={<Jaxnation/>}/>
        <Route path="/table/:id" element={<DynamicPage/>}/>
        <Route path="/cards" element={<Stores/>}/>
    </Routes>
    </BrowserRouter>
    
  );
}

export default App;
