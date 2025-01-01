import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Home from "./Pages/Home";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Menu from "./Pages/Menu";
import ViewCart from "./Pages/users/ViewCart";
import GetMenu from "./Pages/GetMenu";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import Orders from "./Pages/users/Orders";
import DashboardLayout from "./Pages/admin/DashboardLayout";
import Navbar from "./components/Navbar";
import Gallery from "./Pages/Gallery";
import Profile from "./Pages/Profile";
import ProfileSettings from "./Pages/ProfileSettings";
import ProtectedRoute from "./components/ProtectedRoutes";
import GetMenuDetails from "./components/GetMenu/GetMenuDetails";
import RefundPolicy from "./Pages/RefundPolicy";
import TermsConditions from "./Pages/TermsConditions";
import Privacy from "./Pages/Privacy";


import OrderDetails from "./Pages/users/OrderDetails";

function Layout() {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");
  const isAuthRoute =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!isAdminRoute && !isAuthRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/update" element={<ProfileSettings />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/viewcart" element={<ViewCart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/menu/getmenu" element={<GetMenu />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/orders" element={<Orders />} />
        <Route
          path="/menu/details/:id"
          element={<GetMenuDetails />}
        />

        <Route path="/refund" element={<RefundPolicy />} />
        <Route path="/terms" element={<TermsConditions />} />
        <Route path="/privacy" element={<Privacy />} />

        {/* Protected Routes */}
        <Route path="/order/details/:id" element={
          <ProtectedRoute allowedRoles={['admin','user']} >
          <OrderDetails />
          </ProtectedRoute>
          } />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        />

        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <UserProvider>
      <Router>
        <Layout />
      </Router>
    </UserProvider>
  );
}

export default App;
