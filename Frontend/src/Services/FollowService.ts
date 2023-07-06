import axios from "axios"
import appConfig from "../Utils/AppConfig"
import { VacationsActionType, vacationStore } from "../Redux/VacationsState"

class FollowService {
    public async addFollow(userId:number,vacationId:number):Promise<void> {
      await axios.post(appConfig.addFollowUrl + vacationId)

        vacationStore.dispatch({type:VacationsActionType.AddFollow, payload:vacationId})

    }
    public async deleteFollow(userId:number,vacationId:number):Promise<void> {
        await axios.delete(appConfig.deleteFollowUrl + vacationId)
  
          vacationStore.dispatch({type:VacationsActionType.RemoveFollow, payload:vacationId})
  
      }
}
    export default FollowService