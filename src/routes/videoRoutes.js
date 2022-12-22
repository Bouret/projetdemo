import Joi from 'joi';
import {
    handleDeleteVideo,
    handleGetVideo,
    handleGetVideoList,
    handlePatchVideo,
    handlePostVideo,
    handleGetPresignedUrl,
} from '../handlers/videoHandler.js';
import {
    getDefinitionWithRequiredFields
} from '../lib/validation.js';
import {
    fields as videoFields,
    requiredFields as videoRequiredFields
} from '../definitions/videoDefinition.js';

const validateUuid = {
    params: Joi.object({
        uuid: [Joi.string()],
    }),
};

export default [{
        method: 'GET',
        path: '/videos',
        handler: handleGetVideoList,
        options: {
            validate: {
                query: Joi.object({
                    limit: Joi.number(),
                    orderby: Joi.string(),
                    filter: Joi.any(),
                    filteroperator: Joi.any(),
                }),
            },
        },
    },
    {
        method: 'GET',
        path: '/videos/{uuid}',
        handler: handleGetVideo,
        options: {
            validate: validateUuid,
        },
    },
    {
        method: 'POST',
        path: '/videos',
        handler: handlePostVideo,
        options: {
            validate: {
                payload: Joi.object(getDefinitionWithRequiredFields(videoFields, videoRequiredFields)),
            },
        },
    },
    {
        method: 'PATCH',
        path: '/videos/{uuid}',
        handler: handlePatchVideo,
        options: {
            validate: {
                ...validateUuid,
                payload: Joi.object(videoFields),
            },
        },
    },
    {
        method: 'DELETE',
        path: '/videos/{uuid}',
        handler: handleDeleteVideo,
        options: {
            validate: validateUuid,
        },
    },
    {
        method: 'GET',
        path: '/presigned-url/{uuid}',
        handler: handleGetPresignedUrl,
        options: {
            validate: validateUuid,
        },
    },
];