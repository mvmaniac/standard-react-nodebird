const AWS = require('aws-sdk');
const Sharp = require('sharp');

const S3 = new AWS.S3({
  region: 'ap-northeast-2'
});

exports.handler = async (event, context, callback) => {
  const Bucket = event.Records[0].s3.bucket.name;
  const Key = event.Records[0].s3.object.key;

  const decodeKey = decodeURIComponent(Key); // 한글 파일명을 위한 디코딩
  const filename = decodeKey.split('/')[decodeKey.split('/').length - 1];
  const ext = decodeKey.split('.')[decodeKey.split('.').length - 1];

  console.log(Key, decodeKey, filename, ext);

  const requiredFormat = ext === 'jpg' ? 'jpeg' : ext; // sharp에서는 jpg 대신 jpeg 사용

  try {
    const s3Object = await S3.getObject({
      // S3에서 이미지를 받아 옴
      Bucket,
      Key: decodeKey
    }).promise();

    console.log('original', s3Object.Body.length);

    const resizedImage = await Sharp(s3Object.Body)
      .resize(800, 800, {
        fit: 'inside'
      })
      .toFormat(requiredFormat)
      .toBuffer();

    console.log('resize', resizedImage.length);

    await S3.putObject({
      Body: resizedImage,
      Bucket,
      Key: `thumb/${filename}`
    }).promise();

    console.log('put');

    return callback(null, `thumb/${filename}`);
  } catch (e) {
    console.error(e);
    return callback(e);
  }
};
