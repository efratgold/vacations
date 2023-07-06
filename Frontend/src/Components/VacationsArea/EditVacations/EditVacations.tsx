import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import notifyService from "../../../Services/NotifyService";
import vacationService from "../../../Services/VacationService";
import "./EditVacations.css";
import VacationModel from "../../../Models/Vacation-model";

function EditVacations(): JSX.Element {

    const params = useParams();
    const { register, handleSubmit, setValue } = useForm<VacationModel>();
    const navigate = useNavigate();
    const [vacation, setVacation] = useState<VacationModel>();

    // Get vacation to edit:
    useEffect(() => {
        const id = +params.vacationId;
        

        vacationService.getOneVacation(id)
            .then(responseVacation => {

                const startDate = new Date(responseVacation.startDate);
                startDate.setDate(startDate.getDate() + 1); // add one day
                const formatStartDate = startDate.toISOString().slice(0, 10);

                const endDate = new Date(responseVacation.endDate);
                endDate.setDate(endDate.getDate() + 1); // add one day
                const formatEndDate = endDate.toISOString().slice(0, 10);
                
                setValue("vacationId", responseVacation.vacationId);
                setValue("destination", responseVacation.destination);
                setValue("description", responseVacation.description);
                setValue("startDate", formatStartDate);
                setValue("endDate", formatEndDate );
                setValue("price", responseVacation.price);

                setVacation(responseVacation);
            })
            .catch(err => notifyService.error(err));
    }, []);

    async function send(vacation: VacationModel) {        
        try {
            vacation.image = (vacation.image as unknown as FileList)[0];
            await vacationService.editVacation(vacation);
            notifyService.success("vacation has been updated");
            navigate("/vacations");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }
    return (
        <div className="EditVacations">

            <h2>Edit Vacation</h2>
            <form onSubmit={handleSubmit(send)}>

                <input type="hidden" {...register("vacationId")} />

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
                <input type="file" accept="image/*"/*accept="image/'jpeg','jpg', 'png','bmp'" */{...register("image")} />

                <img src={vacation?.imageUrl} />

                <button>Update</button>

            </form>
        </div>
    );
}

export default EditVacations;
