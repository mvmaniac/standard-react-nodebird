import React, {useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import Slick from 'react-slick';
import {
  Global,
  Overlay,
  Header,
  SlickWrapper,
  CloseBtn,
  Indicator,
  ImgWrapper
} from './styles';

import {IMAGE_URL} from '../../config/config';

const ImagesZoom = ({images, onClose}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const onError = useCallback((event) => {
    const {target} = event;
    target.src = `${IMAGE_URL}${target.alt}`;
  }, []);

  return (
    <Overlay>
      <Global />
      <Header>
        <h1>상세 이미지</h1>
        <CloseBtn onClick={onClose} />
      </Header>
      <SlickWrapper>
        <div>
          <Slick
            initialSlide={0}
            afterChange={(slide) => setCurrentSlide(slide)}
            infinite
            arrows={false}
            slidesToShow={1}
            slidesToScroll={1}
          >
            {images.map((image) => (
              <ImgWrapper key={image.src}>
                <img
                  src={`${IMAGE_URL}${image.src}`}
                  alt={image.src}
                  onError={onError}
                />
              </ImgWrapper>
            ))}
          </Slick>
          <Indicator>
            <div>
              {currentSlide + 1} /{images.length}
            </div>
          </Indicator>
        </div>
      </SlickWrapper>
    </Overlay>
  );
};

ImagesZoom.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClose: PropTypes.func.isRequired
};

export default ImagesZoom;
