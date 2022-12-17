import { z } from "zod";

const entitySchema = z
	.object({
		"name_first": z.string().min(2),
		"name_last": z.string().min(2),
		"document_ssn": z.string().regex(/^([0-9]){9}$/),
		"email_address": z.string().email()
	})
	.partial()
	.superRefine((val, ctx) => {
		if (
			(val.name_first && !val.name_last) ||
			(val.name_last && !val.name_first)
		) {
			ctx.addIssue({
				"code": z.ZodIssueCode.invalid_arguments,
				"message": "Both first and last name required"
			});
		} else if (
			!val.name_first &&
			!val.name_last &&
			!val.document_ssn &&
			!val.email_address
		) {
			ctx.addIssue({
				"code": z.ZodIssueCode.invalid_arguments,
				"message":
					"Missing requirements: (name_first AND name_last) OR document_ssn OR email_address"
			});
		}
	});

export default entitySchema;
