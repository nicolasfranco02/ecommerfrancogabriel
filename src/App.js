import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Cart from "./components/Cart";
import MyProvider from "./components/cartcontex/CartContex";
import ItemDetailContainer from "./components/ItemDetailContainer";
import ItemListContainer from "./components/ItemListContainer";
import PNavBar from "./components/PNavBar";
//import { Home } from '@mui/icons-material';


function App() {
  
  return (
    <>
    <div><MyProvider>
   <BrowserRouter>
   
   <PNavBar />
   <Routes>
   <Route path="/" element={<ItemListContainer />} />
   <Route path="/categoria/:id" element={<ItemListContainer />} />
   <Route path="/items/:id" element={<ItemDetailContainer />} />
   <Route path="/Cart" element={<Cart />}/>
   </Routes>
  
</BrowserRouter>
</MyProvider>
</div>
    </>
  );
}

export default App;
