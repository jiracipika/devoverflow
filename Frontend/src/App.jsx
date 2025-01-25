import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./Components/Layout"
import Home from "./Pages/Home"
import Signup from "./Pages/SignUp"
import Signin from "./Pages/SignIn"
import Profile from "./Pages/Profile"
import Collections from "./Pages/Collections"
function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route path="collections" element={<Collections />} />
          <Route path="signup" element={<Signup />} />
          <Route path="signin" element={<Signin />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
