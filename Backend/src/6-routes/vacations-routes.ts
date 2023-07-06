import express, { Request, Response, NextFunction } from "express";
import VacationModel from "../2-models/vacation-model";
import vacationsService from "../5-services/vacations-service";
import imageHandler from "../4-utils/image-handler";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import verifyAdmin from "../3-middleware/verify-admin";
import cyber from "../4-utils/cyber";
import followService from "../5-services/follow-service";

const router = express.Router();

router.get("/vacations",verifyLoggedIn,async (request: Request, response: Response, next: NextFunction) => {
    try { 
        const userId = cyber.getUserIdFromToken(request.headers.authorization);     
        const vacations = await vacationsService.getAllVacationsWithFollowDetails(userId);
        response.json(vacations)
    }
    catch(err: any) {
        next(err);
    }
});

router.get("/vacations/:id([0-9]+)",verifyLoggedIn,async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        const vacation = await vacationsService.getOneVacation(id);
        response.json(vacation);
    }
    catch (err: any) {
        next(err);
    }
});

router.post("/newVacation",verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.image = request.files?.image;
        const vacation = new VacationModel(request.body);
        const addVacation = await vacationsService.addVacation(vacation);
        response.sendStatus(201).json(addVacation);
    }
    catch(err: any) {
        next(err);
    }
});

router.patch("/vacations/:id([0-9]+)",verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        console.log("requ",request);
        
        request.body.vacationId = +request.params.id;

        // Take image if exist:
        request.body.image = request.files?.image;

        const vacation = new VacationModel(request.body);
        console.log("4444");

        const updateVacation = await vacationsService.updateVacation(vacation);
        console.log("333");

        response.json(updateVacation);
    }
    catch (err: any) {
        console.log("2222");

        next(err);
        
    }
});

router.delete("/vacations/:id([0-9]+)",verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id =+request.params.id;
        await vacationsService.deleteVacation(id);
        response.status(204);
    }
    catch(err: any) {
        next(err);
    }
});

router.get("/vacations/images/:imageName", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const imageName = request.params.imageName;
        const imagePath = imageHandler.getImagePath(imageName);
        response.sendFile(imagePath)
    }
    catch(err: any) {
        next(err);
    }
});


router.post("/addFollow/:vacationId",verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
     const userId = +cyber.getUserIdFromToken(request.headers.authorization);
     const vacationId = +request.params.vacationId;

     await followService.addFollow(userId, vacationId);
     response.sendStatus(201);
    }
    catch(err: any) {
        next(err);
    }
});
router.delete("/deleteFollow/:vacationId",verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
     const userId = +cyber.getUserIdFromToken(request.headers.authorization);
     const vacationId = +request.params.vacationId;

     await followService.unFollow(userId, vacationId);
     response.status(204);
    }
    catch(err: any) {
        next(err);
    }
});

export default router;
