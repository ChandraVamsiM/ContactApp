import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import Home from "./pages/Home";
import ContactInfo from "./pages/ContactInfo";
import AddEditContact from "./pages/AddEditContact";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddEditContact />} />
        <Route path="/update/:id" element={<AddEditContact />} />
        <Route path="/view/:id" element={<ContactInfo />} />
      </Routes>
    </div>
  );
}

export default App;
