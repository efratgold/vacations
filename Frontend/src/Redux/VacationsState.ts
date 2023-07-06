
// //- לנהל אותם ברמת אפליקציה - כי כמה קומפוננטות צריכות אותו 
// // - מה המידע של המוצרים שומר בצורה גלובלית שלא נלך שוב לשרת
// // 1. Vacations State - The application level state regarding vacations: 


// import VacationModel from "../Models/vacation-model";
import { createStore } from "redux";
import VacationModel from "../Models/Vacation-model";



export class VacationsState {
    public vacations: VacationModel[] = [];
}

export enum VacationsActionType {
    FetchVacations,
    AddVacation,
    UpdateVacation,
    DeleteVacation,
    AddFollow,
    RemoveFollow
}

export interface VacationsAction {
    type: VacationsActionType;
    payload: any;
}

export function vacationsReducer(currentState = new VacationsState(), action: VacationsAction): VacationsState {


    // Duplicate current state into a new state:
    const newState = { ...currentState };

    // Perform the needed action on the newState:
    switch (action.type) {

        case VacationsActionType.FetchVacations: // Here, the payload is all vacations for saving
            newState.vacations = action.payload;
            break;

        case VacationsActionType.AddVacation: // Here, the payload is a vacation object for adding
            newState.vacations.push(action.payload);
            break;

        case VacationsActionType.UpdateVacation: // Here, the payload is a vacation object for updating
            const indexToUpdate = newState.vacations.findIndex(v => v.vacationId === action.payload.vacationId);
            if (indexToUpdate >= 0) {
                newState.vacations[indexToUpdate] = action.payload;
            }
            break;

        case VacationsActionType.DeleteVacation: // Here, the payload is the vacation id for deleting
            const indexToDelete = newState.vacations.findIndex(v => v.vacationId === action.payload)
            if (indexToDelete >= 0) {
                newState.vacations.splice(indexToDelete, 1);
            }
            break;

         case VacationsActionType.AddFollow: // Here, the payload is the vacation id for addFollow
            const indexToAddFollow = newState.vacations.findIndex(v => v.vacationId === action.payload)
            if (indexToAddFollow >= 0) {
                newState.vacations[indexToAddFollow].isFollowing = true;
                newState.vacations[indexToAddFollow].followersCount += 1;
            }
            break;
        case VacationsActionType.RemoveFollow: // Here, the payload is the vacation id for removeFollow
            const indexToRemoveFollow = newState.vacations.findIndex(v => v.vacationId === action.payload)
            if (indexToRemoveFollow >= 0) {
                newState.vacations[indexToAddFollow].isFollowing = false;
                newState.vacations[indexToAddFollow].followersCount -= 1;
            }
            break;    
            
    }

    // Return the newState: 
    return newState;
}
// 5. vacations Store - The manager object handling redux:
export const vacationStore = createStore(vacationsReducer);