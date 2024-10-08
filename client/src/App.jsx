import UserProvider from "@provider/UserProvider";
import Navbar from "@common/navbar/Navbar";

function App() {
  return (
    <>
      <UserProvider>
        <Navbar />
      </UserProvider>
    </>
  );
}

export default App;
