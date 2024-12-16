import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./Pages/Home";
import SignupLoginForm from "./components/Login&Signup";
import Menu from "./Pages/Menu";
import ViewCart from "./Pages/users/ViewCart";
import Dashboard from "./Pages/Dashboard";
import GetMenu from "./Pages/GetMenu";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import Orders from "./Pages/users/Orders";
import DashboardLayout from "./Pages/admin/DashboardLayout";

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<SignupLoginForm/>}/>
        <Route path="/menu" element={<Menu />} />
        <Route path="/viewcart" element= {<ViewCart />} />
        <Route path="/profile" element={<Dashboard />} />
        <Route path="/menu/getmenu" element={<GetMenu />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/admin" element={<DashboardLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
