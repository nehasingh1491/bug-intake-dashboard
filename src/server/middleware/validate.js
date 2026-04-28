import { celebrate, Joi, Segments } from "celebrate";
import {
  BUG_AREA_VALUES,
  BUG_PRIORITY_VALUES,
  BUG_STATUS_VALUES,
} from "../constants/bug.constants.js";

/**
 * Validation schemas for bug-related requests.
 */
const bugIdSchema = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.number().integer().positive().required(),
  }),
};

const bugBodySchema = {
  title: Joi.string().trim().min(3).max(160).required(),
  description: Joi.string().trim().min(1).max(2000).required(),
  status: Joi.string()
    .valid(...BUG_STATUS_VALUES)
    .default("open"),
  priority: Joi.string()
    .valid(...BUG_PRIORITY_VALUES)
    .default("medium"),
  assignedTo: Joi.string().trim().min(1).max(120).required(),
  area: Joi.string()
    .valid(...BUG_AREA_VALUES)
    .default("other"),
  stepsToReproduce: Joi.string().trim().min(1).max(2000).required(),
};

export const bugValidation = {
  list: celebrate({
    [Segments.QUERY]: Joi.object({
      status: Joi.string().valid(...BUG_STATUS_VALUES),
      priority: Joi.string().valid(...BUG_PRIORITY_VALUES),
    }),
  }),

  id: celebrate(bugIdSchema),

  create: celebrate({
    [Segments.BODY]: Joi.object(bugBodySchema),
  }),

  update: celebrate({
    ...bugIdSchema,
    [Segments.BODY]: Joi.object({
      title: bugBodySchema.title.optional(),
      description: bugBodySchema.description.optional(),
      status: Joi.string().valid(...BUG_STATUS_VALUES),
      priority: Joi.string().valid(...BUG_PRIORITY_VALUES),
      assignedTo: bugBodySchema.assignedTo.optional(),
      area: Joi.string().valid(...BUG_AREA_VALUES),
      stepsToReproduce: bugBodySchema.stepsToReproduce.optional(),
    }).min(1),
  }),

  status: celebrate({
    ...bugIdSchema,
    [Segments.BODY]: Joi.object({
      status: Joi.string()
        .valid(...BUG_STATUS_VALUES)
        .required(),
    }),
  }),
};
