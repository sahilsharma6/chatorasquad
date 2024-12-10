import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./Pages/Home";
import SignupLoginForm from "./components/Login&Signup";

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<SignupLoginForm/>}/>
      </Routes>
    </Router>
  );
}

export default App;
