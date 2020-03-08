import React, {useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import {Icon} from 'antd';

import {IMAGE_URL} from '../config/config';
import ImagesZoom from './ImagesZoom';

const PostImages = ({images}) => {
  const [showImageZoom, setShowImageZoom] = useState(false);

  const onZoom = useCallback(() => {
    setShowImageZoom(true);
  }, []);

  const onClose = useCallback(() => {
    setShowImageZoom(false);
  }, []);

  if (images.length === 1) {
    return (
      <>
        <img src={`${IMAGE_URL}${images[0].src}`} alt="" onClick={onZoom} />
        {showImageZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }

  if (images.length === 2) {
    return (
      <>
        <div>
          <img src={`${IMAGE_URL}${images[0].src}`} alt="" width="50%" onClick={onZoom} />
          <img src={`${IMAGE_URL}${images[1].src}`} alt="" width="50%" onClick={onZoom} />
        </div>
        {showImageZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }

  return (
    <>
      <div>
        <img src={`${IMAGE_URL}${images[0].src}`} alt="" width="50%" onClick={onZoom} />
        <div
          style={{
            display: 'inline-block',
            width: '50%',
            textAlign: 'center',
            verticalAlign: 'middle'
          }}
          role="button"
          tabIndex="0"
          onClick={onZoom}
        >
          <Icon type="plus" />
          <br />
          {images.length - 1}
          개의 사진 더보기
        </div>
        {showImageZoom && <ImagesZoom images={images} onClose={onClose} />}
      </div>
    </>
  );
};

PostImages.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string
    })
  ).isRequired
};

export default PostImages;
