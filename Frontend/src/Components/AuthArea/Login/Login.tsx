import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import "./Login.css";
import CredentialsModel from "../../../Models/Credentials-model";
import { NavLink } from "react-router-dom";

function Login(): JSX.Element {

    const { register, handleSubmit } = useForm<CredentialsModel>();
    const navigate = useNavigate();
    
    async function send(credentials: CredentialsModel) {
        try {
            await authService.login(credentials);
            notifyService.success("Welcome Back!")
            navigate("/vacations");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="Login Box">

            <h2>Login</h2>

            <form onSubmit={handleSubmit(send)}>

                <label>Email:</label>
                <input type="text" {...register("email")} />

                <label>Password:</label>
                <input type="password" {...register("password")} />

                <button>Login</button>

                <br />
                <div>don't have account?
                <NavLink to="/register">Register</NavLink>

                </div>

            </form>

        </div>
    );
}

export default Login;
