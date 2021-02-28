import React, {useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {PlusOutlined} from '@ant-design/icons';

import ImagesZoom from './imagesZoom';
import {IMAGE_URL} from '../config/config';

const BoxImageStyled = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #f0f0f0;

  img[role='presentation'] {
    display: inline-block;
    width: 50%;
    cursor: pointer;
  }
`;

const BoxMoreStyled = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  cursor: pointer;
`;

const PostImages = ({images}) => {
  const [isShowImages, setIsShowImages] = useState(false);

  const onZoom = useCallback(() => {
    setIsShowImages(true);
  }, []);

  const onClose = useCallback(() => {
    setIsShowImages(false);
  }, []);

  if (images.length === 1) {
    const image = images[0];

    return (
      <BoxImageStyled>
        <img
          src={`${IMAGE_URL}${image.thumbnail}`}
          alt={image.src}
          onClick={onZoom}
          role="presentation"
        />
        {isShowImages && <ImagesZoom images={images} onClose={onClose} />}
      </BoxImageStyled>
    );
  }

  if (images.length === 2) {
    const image1 = images[0];
    const image2 = images[1];

    return (
      <BoxImageStyled>
        <img
          src={`${IMAGE_URL}${image1.thumbnail}`}
          alt={image1.thumbnail}
          onClick={onZoom}
          role="presentation"
        />
        <img
          src={`${IMAGE_URL}${image2.thumbnail}`}
          alt={image2.thumbnail}
          onClick={onZoom}
          role="presentation"
        />
        {isShowImages && <ImagesZoom images={images} onClose={onClose} />}
      </BoxImageStyled>
    );
  }

  const image = images[0];

  return (
    <BoxImageStyled>
      <img
        src={`${IMAGE_URL}${image.thumbnail}`}
        alt={image.thumbnail}
        onClick={onZoom}
        role="presentation"
      />
      <BoxMoreStyled onClick={onZoom} role="presentation">
        <PlusOutlined />
        <span>{images.length - 1}개의 사진 더보기</span>
      </BoxMoreStyled>
      {isShowImages && <ImagesZoom images={images} onClose={onClose} />}
    </BoxImageStyled>
  );
};

PostImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default PostImages;
