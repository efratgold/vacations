import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { authStore } from "../../../Redux/AuthState";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import "./AuthMenu.css";
import UserModel from "../../../Models/User-model";

function AuthMenu(): JSX.Element {

    const [user, setUser] = useState<UserModel>();

    useEffect(() => {

        setUser(authStore.getState().user);

        const unsubscribe = authStore.subscribe(() => {
            setUser(authStore.getState().user);
        });

        return () => unsubscribe();

    }, []);

    function logout(): void {
        authService.logout();
        notifyService.success("Bye Bye...");
    }

    return (
        <div className="AuthMenu">

            {!user &&
                <>
                    <span>Hello Guest | </span>
                    <NavLink to="/login">Login</NavLink>
                    <span> | </span>
                    {/* <NavLink to="/register">Register</NavLink> */}
                </>
            }

            { user && 
                <>
                    <span>Hello {user.firstName} {user.lastName} | </span>
                    <NavLink to="/register" onClick={logout}>Logout</NavLink>
               </>
            }

        </div>
    );
}

export default AuthMenu;
