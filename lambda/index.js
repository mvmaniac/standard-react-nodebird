const path = require('path');
const AWS = require('aws-sdk');
const Sharp = require('sharp');

const S3 = new AWS.S3({
  region: 'ap-northeast-2'
});

exports.handler = async (event, context, callback) => {
  const Bucket = event.Records[0].s3.bucket.name; // nodebird-s3
  const Key = event.Records[0].s3.object.key;

  const decodeKey = decodeURIComponent(Key.replace(/\+/g, ' ')); // 한글 파일명을 위한 디코딩

  const dirname = path.dirname(decodeKey).replace('origin/', '');
  const filename = path.basename(decodeKey);
  const thumbPath = `thumb/${dirname}/${filename}`;

  const extname = path.extname(decodeKey).replace('.', '').toLowerCase();
  const requiredFormat = extname === 'jpg' ? 'jpeg' : extname; // sharp에서는 jpg 대신 jpeg 사용

  console.log('Key: ', Key);
  console.log('decodeKey: ', decodeKey);
  console.log('dirname: ', dirname);
  console.log('filename: ', filename);
  console.log('extname: ', extname);

  try {
    const s3Object = await S3.getObject({
      // S3에서 이미지를 받아 옴
      Bucket,
      Key: decodeKey
    }).promise();

    console.log('getObject length: ', s3Object.Body.length);

    const resizedImage = await Sharp(s3Object.Body)
      .resize(800, 800, {
        fit: Sharp.fit.inside,
        withoutEnlargement: true
      })
      .toFormat(requiredFormat)
      .toBuffer();

    console.log('resize length: ', resizedImage.length);

    await S3.putObject({
      Body: resizedImage,
      Bucket,
      Key: thumbPath
    }).promise();

    console.log('put complete...');

    return callback(null, thumbPath);
  } catch (e) {
    console.error(e);
    return callback(e);
  }
};
