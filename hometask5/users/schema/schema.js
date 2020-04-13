import Joi from "@hapi/joi";
import joiValidator from "express-joi-validation";

const validator = joiValidator.createValidator({});
const schema = Joi.object({
	login: Joi.string()
		.alphanum()
		.min(5)
		.max(30)
		.required(),

	password: Joi.string()
		.pattern(new RegExp("^[a-zA-Z0-9]{8,30}$"))
		.required(),

	age: Joi.number()
		.integer()
		.min(4)
		.max(130)
		.required(),
	
	groupId: Joi.string()
	
});


export default validator.body(schema);