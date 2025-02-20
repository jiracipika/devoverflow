import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./Components/Layout"
import Home from "./Pages/Home"
import Signup from "./Pages/SignUp"
import SignIn from "./Pages/SignIn"
import Profile from "./Pages/Profile"
import Collections from "./Pages/Collections"
import AskAQuestion from "./Pages/AskAQuestion"
import ProtectedRoute from "./Components/ProtectedRoute"
import PersistLogin from "./Components/PersistLogin"

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route element={<PersistLogin />}>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Layout />}>
              <Route path="" element={<Home />} />
              <Route path="collections" element={<Collections />} />
              <Route path="ask-a-question" element={<AskAQuestion />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Route>
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
