import { createVideo, deleteVideo, getVideo, getVideoList, updateVideo, getPresignedUrl } from '../managers/videoManager.js';

export const handleGetVideoList = (request) => getVideoList(request.query);
export const handleGetVideo = (request) => getVideo(request.params.uuid);
export const handlePostVideo = (request) => createVideo(request.payload);
export const handlePatchVideo = (request) => updateVideo(request.params.uuid, request.payload);
export const handleDeleteVideo = (request) => deleteVideo(request.params.uuid);
export const handleGetPresignedUrl = (request) => getPresignedUrl(request.params.uuid);