import { useEffect, useState } from "react";
import VacationModel from "../../../Models/Vacation-model";
import "./VacationsCards.css";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import UserModel from "../../../Models/User-model";
import { authReducer, authStore } from "../../../Redux/AuthState";
import vacationService from "../../../Services/VacationService";
import notifyService from "../../../Services/NotifyService";



interface VacationsCardsProps {
    vacation: VacationModel
}

function VacationsCards(props: VacationsCardsProps): JSX.Element {

    const navigate = useNavigate();
    const params = useParams();
    const [expanded, setExpanded] = useState(false);
    const [user, setUser] = useState<UserModel>();
    // פונקציה שתשנה את הערך של המשתנה במצב

    useEffect(() => {
        setUser(authStore.getState().user);
        const unsubscribe = authStore.subscribe(() => {
            setUser(authStore.getState().user);
        });
        return unsubscribe;
    }, [])


    const isAdmin = () => {
        return user.roleId === 1;
    }

    const toggleExpand = () => {
        setExpanded(!expanded);
    };


    function formatDate(dateStr: string) {
        const dateObj = new Date(dateStr);
        const dateString = dateObj.toLocaleDateString("en-GB");

        return `${dateString}`;
    }
    async function deleteMe(id:number) {
        try {
            const ok = window.confirm("Are you sure?");
            if(!ok) return;
            await vacationService.deleteVacation(id);
            notifyService.success("vacation has been deleted");
            navigate("/vacations");
        }
        catch(err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="VacationsCards Box">
            <div className="card">
             {user && isAdmin() &&   <NavLink to = {"/edit/" + props.vacation?.vacationId}>Edit</NavLink>}
             {user && isAdmin() && <button onClick={()=>{deleteMe(props.vacation.vacationId)}}>Delete</button>}

                <img src={props.vacation.imageUrl} alt="vacation" />
                <br />
                <span>{props.vacation.destination}</span>
                <br />
                <span> {formatDate(props.vacation.startDate)} - {formatDate(props.vacation.endDate)}</span>
                <br />
                <p className={expanded ? 'expanded' : 'collapsed'}>{props.vacation.description}
                </p>
                <NavLink onClick={toggleExpand} to={""}>{expanded ? 'reduce' : 'Read more...'}</NavLink>

                {/* <button onClick={toggleExpand}>{expanded ? 'reduce' : 'Read more...'}</button>
 */}
                <br />
                <span>Price:{props.vacation.price}$</span>
                <br />
            </div>
       
        </div>
    );
}

export default VacationsCards;


