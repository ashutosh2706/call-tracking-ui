import Dashboard from "./Dashboard"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Client from "./Client";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}/>
        <Route path="/client" element={<Client />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
