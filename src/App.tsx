import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Inprocess } from "./pages/Inprocess";
import { Waiting } from "./pages/Waiting";
import { Failed } from "./pages/Failed";
import { NavBar } from "./components/NavBar";

export const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBar/>} >
          <Route index element={<Navigate to="waiting"/>} />
          <Route path="waiting" element={<Waiting/>} />
          <Route path="inprocess" element={<Inprocess/>} />
          <Route path="failed" element={<Failed/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
