import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import notifyService from "../../../Services/NotifyService";
import vacationService from "../../../Services/VacationService";
import "./AddVacation.css";
import VacationModel from "../../../Models/Vacation-model";

function AddVacation(): JSX.Element {

    const {register, handleSubmit} = useForm<VacationModel>();

    const navigate = useNavigate();


    
        async function send(vacation: VacationModel) {
            try {
                vacation.image = (vacation.image as unknown as FileList)[0];
                await vacationService.addVacation(vacation);
                notifyService.success("Vacation has been added");
                navigate("/vacations");
            }
            catch(err: any) {
                notifyService.error(err);
            }
        }
    return (
        <div className="AddVacation">
			<h2>Add Vacation</h2>
            <form onSubmit={handleSubmit(send)}>

                <label>Destination:</label>
                <input type="text" {...register("destination")} required minLength={2} maxLength={30} />

                <label>Description:</label>
                <input type="text" {...register("description")} required minLength={15} maxLength={3000} />

                <label>Start Date:</label>
                <input type="date" {...register("startDate")} required />

                <label>End Date:</label>
                <input type="date" {...register("endDate")} required  />

                <label>Price:</label>
                <input type="number" {...register("price")} required min={0} max={10000} />

                <label>Image: </label>
                <input type="file"accept="image/*" /*accept="image/'jpeg','jpg', 'png','bmp'" */{...register("image")} required/>

                <button>Add</button>

            </form>
        </div>
    );
}

export default AddVacation;
