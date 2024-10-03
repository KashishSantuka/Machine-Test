import { useAuth0 } from "@auth0/auth0-react";
// import LoginPage from "./Components/loginPage/Login.jsx";
import "./App.css";

function App() {
  const { user, loginWithRedirect } = useAuth0();
  console.log("Current User", user);
  return (
    <>
     <section>
        <button onClick={() => loginWithRedirect()}>Login With Redirect</button>
      </section>
    </>
  );
}

export default App;
