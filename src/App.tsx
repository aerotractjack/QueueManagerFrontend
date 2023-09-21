import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Inprocess } from "./pages/Inprocess";
import { Waiting } from "./pages/Waiting";
import { Failed } from "./pages/Failed";
import { NavBar } from "./components/NavBar";
import { NoPage } from "./pages/NoPage";
import { Element } from "./pages/Elements";
import { InprocessJob } from "./pages/InprocessJob";
import { FailedJob } from "./pages/FailedJob";

export const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBar/>} >
          <Route index element={<Navigate to="waiting"/>} />
          <Route path="waiting" element={<Waiting/>} />
          <Route path="inprocess" element={<Inprocess/>} />
          <Route path="failed" element={<Failed/>} />
          <Route path="waiting/:queue/:id" element={<Element/>} />
          <Route path="inprocess/:id" element={<InprocessJob/>} />
          <Route path="failed/:id" element={<FailedJob/>} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
