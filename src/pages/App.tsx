import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Inprocess } from "./Inprocess";
import { Waiting } from "./Waiting";
import { Failed } from "./Failed";
import { NavBar } from "../components/NavBar";
import { NoPage } from "./NoPage";
import { WaitingJob } from "./WaitingJob";
import { InprocessJob } from "./InprocessJob";
import { FailedJob } from "./FailedJob";

export const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBar/>} >
          <Route index element={<Navigate to="waiting"/>} />
          <Route path="waiting" element={<Waiting/>} />
          <Route path="inprocess" element={<Inprocess/>} />
          <Route path="failed" element={<Failed/>} />
          <Route path="waiting/:queue/:id" element={<WaitingJob/>} />
          <Route path="inprocess/:id" element={<InprocessJob/>} />
          <Route path="failed/:id" element={<FailedJob/>} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
