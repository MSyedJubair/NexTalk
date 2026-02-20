import { Route, Routes } from "react-router"
import Home from "./Root/Pages/Home"
import RootLayout from "./Root/RootLayout"
import AuthLayout from "./Auth/AuthLayout"
import Signin from "./Auth/Forms/Signin"
import Signup from "./Auth/Forms/Signup"
import Chat from "./Root/Pages/Chat"

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<AuthLayout/>}>
        <Route path="/sign-in" element={<Signin/>}/>
        <Route path="/sign-up" element={<Signup/>}/>
      </Route>

      {/* Private Routes */}
      <Route element={<RootLayout/>}>
        <Route index element={<Home/>}/>
        <Route path="/user/:id" element={<Chat/>} />
      </Route>
    </Routes>
  )
}

export default App