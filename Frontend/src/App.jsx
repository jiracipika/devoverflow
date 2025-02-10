import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./Components/Layout"
import Home from "./Pages/Home"
import Signup from "./Pages/SignUp"
import Signin from "./Pages/SignIn"
import Profile from "./Pages/Profile"
import EditProfile from "./Pages/EditProfile"
import Schedule from "./Pages/Schedule"
import Collections from "./Pages/Collections"
import Tags from "./Pages/Tags"
import TagSection from "./Pages/TagSection"
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
          <Route path="/editProfile" element={<EditProfile />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/tags" element={<Tags />} />
          <Route path="/tagSection/:id" element={<TagSection />} />
        </Route>
      </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
