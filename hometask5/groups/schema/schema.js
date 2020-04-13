import Joi from "@hapi/joi";
import joiValidator from "express-joi-validation";

const validator = joiValidator.createValidator({});
const schema = Joi.object({
	name: Joi.string()
		.alphanum()
		.min(3)
		.max(20)
		.required(),

	permissions: Joi.array()
		.min(1)
		.required()
});

export default validator.body(schema);
