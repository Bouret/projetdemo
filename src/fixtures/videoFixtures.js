import {
  STATUS_DRAFT,
  STATUS_VALIDATED
} from '../constants/status.js';

export default [{
      uuid: '5b3e0326-c770-42c6-8338-b036ebf9fd37',
      name: 'Video 1',
      created_at: '2022-08-08 14:47:28',
      updated_at: null,
      deleted_at: null,
      status: STATUS_DRAFT,
      url: 'https://kevinbouret.s3.eu-west-1.amazonaws.com/5b3e0326-c770-42c6-8338-b036ebf9fd37/video.mp4'
  },
  {
      uuid: '1020909c-8990-4dae-a85e-b3ec7e957040',
      name: 'Video 2',
      created_at: '2022-08-08 14:47:28',
      updated_at: null,
      deleted_at: null,
      status: STATUS_VALIDATED,
      url: 'https://kevinbouret.s3.eu-west-1.amazonaws.com/1020909c-8990-4dae-a85e-b3ec7e957040/video.mp4'
  },
];