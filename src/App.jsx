import { useEffect, useState } from "react";
import "./App.css";
import { Navbar } from "./components/Navbar/Navbar";
import { Home } from "./pages/Home";
import { MainRoutes } from "./pages/MainRoutes";
import UserDashboard from "./pages/UserDashboard";
import { Dashboard } from "./components/User Dashboard/Dashboard";
import { Navbar as UserNavbar } from "./components/User Dashboard/UserNavbar";
import Footer from "./components/Footer/Footer";
import { auth } from "./firebase/Firebase";
function App() {
  const [log, setLog] = useState(false);
  const [user, setUser] = useState();
  const handleLog = () => {
    setLog(!log);
  };
  useEffect(() => {
    auth.onAuthStateChanged(() => {
      setUser(auth.currentUser);
    });
    return () => {};
  }, []);
  return (
    <div className="App">
      {user ? (
        <UserNavbar handleLog={handleLog} />
      ) : (
        <Navbar handleLog={handleLog} />
      )}
      {user ? <Dashboard /> : null}
      <MainRoutes user={user} />

      {!user ? <Footer /> : null}
    </div>
  );
}

export default App;
