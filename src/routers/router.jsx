import { Routes, Route } from "react-router-dom";
import List from "../page/List.jsx";
import Detail from "../page/Detail.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<List />} />
      <Route path="/pokemon/:name" element={<Detail />} />
    </Routes>
  );
}
