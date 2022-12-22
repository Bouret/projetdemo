import Joi from 'joi';
import { STATUS_DRAFT, STATUS_VALIDATED, STATUS_ARCHIVED } from '../constants/status.js';

export const fields = {
  name: Joi.string().min(1).max(255),
  status: Joi.string().valid(STATUS_DRAFT, STATUS_VALIDATED, STATUS_ARCHIVED),
  url: Joi.string().min(1).max(255),
};

export const requiredFields = ['name', 'status'];