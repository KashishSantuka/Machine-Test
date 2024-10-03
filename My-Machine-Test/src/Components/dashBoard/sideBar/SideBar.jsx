import { Link } from "react-router-dom";
import "./sideBar.css";

const SideBar = () => {
  return (
   <div className="Navbar">
    <section className="LeftSection">
       <Link to='/homePage'>Home</Link>
        <Link to='/employeList'>EmployeList</Link>
        <Link to="/createEmploye">CreateEmploye</Link>
        <section className="RightSection">
            <h3>Kashish- <Link to="/">Logout</Link> </h3>
            </section>

    </section>
   </div>
  )
}

export default SideBar