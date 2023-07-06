import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import "./Register.css";
import UserModel from "../../../Models/User-model";

function Register(): JSX.Element {

    const { register, handleSubmit } = useForm<UserModel>();
    const navigate = useNavigate();

    async function send(user: UserModel) {
        try {
            await authService.register(user);
            notifyService.success("Welcome!");
            navigate("/vacations");
        }
        catch(err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="Register Box">

            <h2>Register</h2>
			
            <form onSubmit={handleSubmit(send)}>

                <label>First name:</label>
                <input type="text" {...register("firstName")} />

                <label>Last name:</label>
                <input type="text" {...register("lastName")} />

                <label>Email:</label>
                <input type="text" {...register("email")} />

                <label>Password:</label>
                <input type="password" {...register("password")} />

                <button>Register</button>

                <div>already a member?
                    <br />
                    <NavLink to="/login">Login</NavLink>
                </div>

            </form>

        </div>
    );
}

export default Register;
