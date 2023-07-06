import Joi from "joi";
import { ValidationError } from "./Client-errors";

class VacationModel {

    public vacationId: number;
    public destination: string;
    public description: string;
    public startDate: string;
    public endDate: string;
    public price: number;
    public imageUrl: string;
    public image: File;
    public isFollowing: boolean;
    public followersCount: number;


    private static addValidationSchema = Joi.object({
        vacationId: Joi.number().positive().optional().integer(),
        destination: Joi.string().required(),
        description: Joi.string().required(),
        startDate: Joi.date().required().min('now').iso(),
        endDate: Joi.date().required().min(Joi.ref('startDate')).iso(),
        price: Joi.number().required().max(10000).min(0),
        image: Joi.object().required()/*.valid('jpeg','jpg', 'png','bmp')*/
    })
    public addValidate(): void {
        const result = VacationModel.addValidationSchema.validate(this);
        if(result.error) throw new ValidationError(result.error.message);
    }

    private static updateValidationSchema = Joi.object({
        vacationId: Joi.number().positive().integer().required(),
        destination: Joi.string().required(),
        description: Joi.string().required(),
        startDate: Joi.date().required().min('now').iso(),
        endDate: Joi.date().required().min(Joi.ref('startDate')).iso(),
        price: Joi.number().required().max(10000).min(0),
        /*image: Joi.object().optional(),/*.valid('jpeg','jpg', 'png','bmp')*/
    })
    public updateValidate(): void {
        const result = VacationModel.updateValidationSchema.validate(this);
        if(result.error) throw new ValidationError(result.error.message);
    }
}


export default VacationModel;