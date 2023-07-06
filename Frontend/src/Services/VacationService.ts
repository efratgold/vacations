import axios from "axios";
import { VacationsActionType, vacationStore  } from "../Redux/VacationsState";
import appConfig from "../Utils/AppConfig";
import VacationModel from "../Models/Vacation-model";

class VacationsService {
    public async getAllVacations() {

        //take vacations from global state:
        let vacations = vacationStore.getState().vacations;
        // if we don't have vacations- get them from backend:
        if (vacations.length === 0) {
            const response = await axios.get<VacationModel[]>(appConfig.vacationsUrl);
            vacations = response.data;
            vacationStore.dispatch({ type: VacationsActionType.FetchVacations, payload: vacations});
        }
        return vacations;  
    }

  public async getOneVacation(id: number): Promise<VacationModel> {
console.log("id********",id);

    // Take vacation from global state:
    let vacations = vacationStore.getState().vacations;

    // Find the needed vacation: 
    let vacation = vacations.find(v => v.vacationId === id);

    // If vacation doesn't exist - get it from backend:
    if (!vacation) {

        // Get vacation from REST API:
        const response = await axios.get<VacationModel>(appConfig.vacationsUrl + id);

        // Extract vacation:
        vacation = response.data;

        // No need to update global state
    }

    // Return:
    return vacation;
}

    public async addVacation(vacation: VacationModel):Promise<void> {
         // Create header for sending image inside the body:
         const headers = { "Content-Type": "multipart/form-data" };
        const response = await axios.post<VacationModel>(appConfig.addVacationUrl, vacation, {headers})
        // Get the added vacation:
        const addedVacation = response.data;
         // Add that addedvacation also to the global state: 
         vacationStore.dispatch({ type: VacationsActionType.AddVacation, payload: addedVacation });
    }

        public async editVacation(vacation: VacationModel): Promise<void> {

            // Create header for sending image inside the body:
            const headers = { "Content-Type": "multipart/form-data" }
    
            // Send vacation to server:
            const response = await axios.patch<VacationModel>(appConfig.vacationsUrl + vacation.vacationId, vacation, { headers });
    
            // Get the updated vacation:
            const updatedVacation = response.data;
    
            // Update global store with the updatedProduct: 
            vacationStore.dispatch({ type: VacationsActionType.UpdateVacation, payload: updatedVacation });
        }

        public async deleteVacation(id: number):Promise<void> {
            await axios.delete(appConfig.vacationsUrl + id);
            // Delete that vacation form our global store: 
            vacationStore.dispatch({ type: VacationsActionType.DeleteVacation, payload: id });
        }
}

const vacationService = new VacationsService();// Singleton

export default vacationService;
