import "@styles/App.scss";

import UserProvider from "@provider/UserProvider";

import Navbar from "@common/navbar/Navbar";

function App() {
  return (
    <div className="app">
      <UserProvider>
        <Navbar />
      </UserProvider>
    </div>
  );
}

export default App;
