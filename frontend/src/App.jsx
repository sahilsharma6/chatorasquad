import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";

import Home from "./Pages/Home";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Menu from "./Pages/Menu";
import ViewCart from "./Pages/users/ViewCart";
import Dashboard from "./Pages/Dashboard";
import GetMenu from "./Pages/GetMenu";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import Orders from "./Pages/users/Orders";
import DashboardLayout from "./Pages/admin/DashboardLayout";
import Navbar from "./components/Navbar";
import Gallery from "./Pages/Gallery";
import PassUpdate from "./Pages/PassUpdate";


function Layout() {
  const location = useLocation();
  
  
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>

      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/update" element={<PassUpdate />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/viewcart" element={<ViewCart />} />
        <Route path="/profile" element={<Dashboard />} />
        <Route path="/menu/getmenu" element={<GetMenu />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/admin/*" element={<DashboardLayout />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
