import { Routes, Route } from "react-router-dom";
import UserProvider from "@provider/UserProvider";
import Navbar from "@common/navbar/Navbar";
import UserLogin from "@auth/user-login/UserLogin";

function App() {
  return (
    <>
      <UserProvider>
        <Navbar />

        <Routes>
          <Route path="/user-login" element={<UserLogin />} />
        </Routes>
      </UserProvider>
    </>
  );
}

export default App;
