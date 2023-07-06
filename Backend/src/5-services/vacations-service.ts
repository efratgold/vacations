import dal from "../4-utils/dal";
import { OkPacket } from "mysql";
import appConfig from "../4-utils/app-config";
import imageHandler from "../4-utils/image-handler";
import VacationModel from "../2-models/vacation-model";
import { ResourceNotFoundError } from "../2-models/client-errors";

// async function getAllVacations():Promise<VacationModel[]> {

//     const sql = `SELECT
//                     vacationId,
//                     destination,
//                     description,
//                     startDate,
//                     endDate,
//                     price,
//                     CONCAT('${appConfig.imagesUrl}', ImageName) AS imageUrl
//                     FROM vacations`;


//                     const sql = `
//     SELECT DISTINCT
// 	V.*,
// 	EXISTS(SELECT * FROM followers WHERE vacationId = F.vacationId AND userId = ?) AS isFollowing,
// 	COUNT(F.userId) AS followersCount
//     FROM vacations as V LEFT JOIN followers as F`

//     const vacations = dal.execute(sql)
//     return vacations;
// }

async function getAllVacationsWithFollowDetails(userId: number): Promise<VacationModel[]> {
    const sql = `
    SELECT DISTINCT
	V.*,
	EXISTS(SELECT * FROM followers WHERE vacationId = F.vacationId AND userId = ?) AS isFollowing,
	COUNT(F.userId) AS followersCount
    FROM vacations as V LEFT JOIN followers as F
    ON V.vacationId = F.vacationId
    GROUP BY vacationId
    ORDER BY isFollowing DESC
    `;
    const vacations = await dal.execute(sql, [userId]);
    return vacations;
}


async function getOneVacation(id: number): Promise<VacationModel> {

    const sql = `SELECT
                    vacationId,
                    destination,
                    description,
                    startDate,
                    endDate,
                    price,
                    CONCAT('${appConfig.imagesUrl}',ImageName) AS imageUrl
                    FROM vacations WHERE vacationId = ?`

    const vacations = await dal.execute(sql, [id]);

    const vacation = vacations[0];
    console.log("/////////////",vacation);

    if (!vacation) throw new ResourceNotFoundError(id);
console.log("**************",vacation.image);

    return vacation;
}

async function addVacation(vacation:VacationModel):Promise<VacationModel>{

    vacation.addValidate();

    let imageName = null;
    if(vacation.image) {
        imageName = await imageHandler.saveImage(vacation.image);
        vacation.imageUrl = appConfig.imagesUrl + imageName;
    }
    const sql = "INSERT INTO vacations VALUES(DEFAULT, ?, ?, ?, ?, ?, ?)";

    const result:OkPacket = await dal.execute(sql,[vacation.destination,vacation.description,vacation.startDate,vacation.endDate,vacation.price,imageName])
    vacation.vacationId = result.insertId;
   
    return vacation;
}

//Update vacation option to admin 
async function updateVacation(vacation: VacationModel): Promise<VacationModel> {
console.log("vacat*********",vacation);

    //TODO : Validation joi
    vacation.updateValidate();

    //Take original image name:
    let imageName = await getVacationImageName(vacation.vacationId);

    //If user send image to update
    if (vacation.image) {

        //Update image:
        imageName = await imageHandler.updateImage(vacation.image, imageName)

    }
    //Set back Image url:
    vacation.imageUrl = appConfig.imagesUrl + imageName;

    // Create query: 
    const sql = `UPDATE vacations SET
        destination = ?,
        description = ?,
        startDate = ?,
        endDate = ?,
        price = ?,
        imageName = ?
        WHERE vacationId = ? `;

    //Execute:
    const result: OkPacket = await dal.execute(sql,
        [vacation.destination, vacation.description, vacation.startDate,
        vacation.endDate, vacation.price, imageName, vacation.vacationId])

    //If vacation not found
    if (result.affectedRows === 0) throw new ResourceNotFoundError(vacation.vacationId);

    //Remove image file from returned vacation
    delete vacation.image;

    return vacation;

}




async function deleteVacation(id: number):Promise<void> {
    const sql = `DELETE FROM vacations WHERE vacationId =?`
    const result:OkPacket = await dal.execute(sql,[id]);
    if(result.affectedRows === 0) throw new ResourceNotFoundError(id)
  
}

async function getVacationImageName(id: number):Promise<string> {
    const sql = `SELECT imageName FROM vacations WHERE vacationId = ${id}`;
    const vacations = await dal.execute(sql);
    const vacation = vacations[0];
    if(!vacation) return null;
    const imageName = vacation.imageName;
    return imageName;
}



export default {
    getAllVacationsWithFollowDetails,
    getOneVacation,
    addVacation,
    updateVacation,
    deleteVacation,
    getVacationImageName

    
};

