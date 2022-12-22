import Boom from '@hapi/boom';
import {
    v4 as uuidv4
} from 'uuid';
import moment from 'moment';

import getPool from '../config/database.js';
import restQueryBuilder from '../lib/restQueryBuilder.js';
import {
    getPreSignedUrl
} from '../lib/s3.js';
import buckets from '../constants/buckets.js';
import {
    STATUS_ARCHIVED
} from '../constants/status.js';

/**
 * Create a video.
 * @param {object} payload
 * @return {object} video representation.
 */
export const createVideo = async (payload) => {
    try {
        const pool = getPool().promise();
        const uuid = uuidv4();

        const data = {
            ...payload,
            uuid,
            created_at: moment().format('YYYY-MM-DD HH:mm:ss')
        };

        const [result] = await pool.query('INSERT INTO videos SET ?', data);

        if (result.affectedRows !== 1) {
            return Boom.badData();
        }

        return await getVideo(uuid);

    } catch (error) {
        throw Boom.internal();
    }
};

/**
 * Get single one video.
 * @param {string} uuid
 * @return {object} video representation.
 */
export const getVideo = async (uuid) => {

    try {
        const pool = getPool().promise();
        const [rows] = await pool.query('SELECT * FROM videos WHERE uuid = ?', [uuid]);

        if (rows.length === 0) {
            return Boom.notFound();
        }

        return rows.pop();

    } catch (error) {
        throw Boom.internal();
    }
};

/**
 * Get videos by filters.
 * @param {object} queryParams
 * @return {object} video representation.
 */
export const getVideoList = async (queryParams) => {
    const pool = getPool().promise();

    try {
        const [query, params] = restQueryBuilder('videos', queryParams);
        const [rows] = await pool.query(query, params);

        return rows;

    } catch (error) {
        throw Boom.internal();
    }
};

/**
 * Update a video.
 * @param {string} uuid
 * @param {objet} payload
 * @return {object} Video representation.
 */
export const updateVideo = async (uuid, payload) => {
    try {
        const dateNow = moment().format('YYYY-MM-DD HH:mm:ss');
        const pool = getPool().promise();
        const data = {
            ...payload,
            updated_at: dateNow,
            deleted_at: payload.status == STATUS_ARCHIVED ? dateNow : null
        };

        const [result] = await pool.query('UPDATE videos SET ? WHERE uuid = ?', [data, uuid]);

        if (result.affectedRows !== 1) {
            return Boom.badData();
        }

        return getVideo(uuid);
    } catch (error) {
        throw Boom.internal();
    }
};

/**
 * Delete a video.
 * @param {string} uuid
 * @return {object} Response.
 */
export const deleteVideo = async (uuid) => {

    try {
        const pool = getPool().promise();
        const [rows] = await pool.query('SELECT * FROM videos WHERE uuid = ?', [uuid]);

        if (rows.length === 0) {
            return Boom.notFound();
        }

        await pool.query('DELETE FROM videos WHERE uuid = ?', [uuid]);

        return {
            "statusCode": 200,
            "message": "Video successfully deleted"
        };

    } catch (error) {
        console.log(error);
        throw Boom.internal();
    }
};

/**
 * Get a presigned url to upload video.
 * @param {string} uuid
 * @return {string} Presigned url.
 */
export const getPresignedUrl = async (uuid) => {

    const presignedUrl = getPreSignedUrl(`${uuid}/video.mp4`, buckets.demo);

    return presignedUrl;
};