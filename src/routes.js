import { BrowserRouter, Routes, Route } from "react-router-dom";
import Estates from './pages/Estates';
import NewUpdate from './pages/NewUpdate';

export default function EstatesRouter(){
  
  return(

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Estates/>} />
        <Route path="/newupdate/:estate_id" element={<NewUpdate/>} />
      </Routes>
    </BrowserRouter>
    
  );

}