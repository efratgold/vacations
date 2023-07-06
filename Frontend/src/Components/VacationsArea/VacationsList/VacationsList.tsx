import { useEffect, useState } from "react";
import notifyService from "../../../Services/NotifyService";
import vacationService from "../../../Services/VacationService";
import VacationsCards from "../VacationsCards/VacationsCards";
import "./VacationsList.css"
import VacationModel from "../../../Models/Vacation-model";
import { NavLink } from "react-router-dom";
import { vacationStore } from "../../../Redux/VacationsState";
import UserModel from "../../../Models/User-model";
import { authStore } from "../../../Redux/AuthState";

function VacationsList(): JSX.Element {

    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const [user, setUser] = useState<UserModel>();
    // const [filterByDate, setFilterByDate] = useState(false);




    useEffect(()=> {
        vacationService.getAllVacations()
        .then(responseVacations => setVacations(responseVacations))
        .catch(err => notifyService.error(err));
  /////refresh
//         const unsubscribe = vacationStore.subscribe(()=>{
//             const dup = [...vacationStore.getState().vacations]
//             setVacations(dup); בשיעור של 12.3.23 הביא קבצים של הפרוייקט הסקריפט
//         })

// return unsubscribe;
         
    }, []);

    useEffect(() => {
        setUser(authStore.getState().user);
        const unsubscribe = authStore.subscribe(() => {
            setUser(authStore.getState().user);
            console.log("**********");
            
        });

        return unsubscribe;
    }, []);

    const isAdmin = () => {
        return user.roleId === 1;
    }

    
    return (
        <div className="VacationsList">
            
			<h2>vacations</h2>
            {user && isAdmin() &&<NavLink to={"/insert/"}>Add vacation</NavLink>}

            <br />
            <br />
            <div className="Cards">
            {vacations.map(v => <VacationsCards key={v.vacationId} vacation={v} />)}
          
            

            </div>
            
        </div>
    );
}

export default VacationsList;
