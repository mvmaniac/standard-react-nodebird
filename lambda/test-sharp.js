const fs = require('fs');
const Sharp = require('sharp');

const removeResizeImage = (path) => {
  try {
    fs.unlinkSync(path);
  } catch (error) {
    // nothing
  }
};

removeResizeImage('./uploads/626x900_resize.jpg');
removeResizeImage('./uploads/640x640_resize.jpg');
removeResizeImage('./uploads/640x885_resize.jpg');
removeResizeImage('./uploads/850x637_resize.jpg');

const image626x900 = './uploads/626x900.jpg';
const image640x640 = './uploads/640x640.jpg';
const image640x885 = './uploads/640x885.jpg';
const image850x637 = './uploads/850x637.jpg';

// 626x900 -> 452x650 으로 변환
Sharp(image626x900)
  .resize(650, 650, {
    fit: Sharp.fit.inside,
    withoutEnlargement: true
  })
  .toFile('./uploads/626x900_resize.jpg');

// 640x640 -> 640x640 으로 유지
// withoutEnlargement 옵션 떄문에 사이즈 유지
Sharp(image640x640)
  .resize(650, 650, {
    fit: Sharp.fit.inside,
    withoutEnlargement: true
  })
  .toFile('./uploads/640x640_resize.jpg');

// 640x885 -> 487x650 으로 변환
Sharp(image640x885)
  .resize(650, 650, {
    fit: Sharp.fit.inside,
    withoutEnlargement: true
  })
  .toFile('./uploads/640x885_resize.jpg');

// 850x637 -> 650x487 으로 변환
Sharp(image850x637)
  .resize(650, 650, {
    fit: Sharp.fit.inside,
    withoutEnlargement: true
  })
  .toFile('./uploads/850x637_resize.jpg');
