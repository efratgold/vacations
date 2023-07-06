import { Navigate, Route, Routes } from "react-router-dom";
import Insert from "../../VacationsArea/Insert/AddVacation";
// import Home from "../../HomeArea/Home/Home";
import PageNotFound from "../PageNotFound/PageNotFound";
import Register from "../../AuthArea/Register/Register";
import Login from "../../AuthArea/Login/Login";
import VacationsList from "../../VacationsArea/VacationsList/VacationsList";
import EditVacations from "../../VacationsArea/EditVacations/EditVacations";
import AddVacation from "../../VacationsArea/Insert/AddVacation";

function Routing(): JSX.Element {
    return (
        <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            
            {/* <Route path="/home" element={<Home />} /> */}
            <Route path="/vacations" element={<VacationsList />} />
            <Route path="/insert" element={<AddVacation />} />
            <Route path="/edit/:vacationId" element={<EditVacations />} />
            <Route path="/" element={<Navigate to="/register" />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
}

export default Routing;
