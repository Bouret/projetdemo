import Joi from 'joi';

/**
 * Transform a joi object into one with required fields.
 */
// eslint-disable-next-line import/prefer-default-export
export const getDefinitionWithRequiredFields = (definition, requiredFields) => {
    const definitionWithRequirements = {
        ...definition,
        uuid: [Joi.number, Joi.string()]
    };

    Object.entries(definition).forEach(([key, value]) => {
        if (requiredFields.includes(key)) {
            definitionWithRequirements[key] = value.required();
        }
    });

    return definitionWithRequirements;
};