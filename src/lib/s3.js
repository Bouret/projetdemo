import {
  getSignedUrl
} from '@aws-sdk/s3-request-presigner';
import {
  S3Client,
  PutObjectCommand
} from '@aws-sdk/client-s3';

export const s3 = () =>
  new S3Client({
      region: process.env.AWS_REGION,
  });

/**
* Return a presigned url.
*
* @param {string} Key S3 file path.
* @param {string} Bucket S3 bucket.
* @return {Promise} S3 presigned url.
*/
export const getPreSignedUrl = (Key, Bucket) => {
  const putObjectParams = {
      Bucket,
      Key,
      ACL: 'public-read',
      ContentType: 'binary/octet-stream',
  };
  const command = new PutObjectCommand(putObjectParams);

  return getSignedUrl(s3(), command, {
      expiresIn: 3600
  });
};