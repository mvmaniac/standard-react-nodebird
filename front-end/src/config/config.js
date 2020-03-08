export const IS_PROD = process.env.NODE_ENV === 'production';
export const FRONT_END_URL = IS_PROD ? 'http://52.78.17.178' : 'http://localhost:3060';
export const BACK_END_URL = IS_PROD ? 'http://54.180.155.87' : 'http://localhost:3065';

// export const FRONT_END_URL = IS_PROD ? 'https://react.devfactory.me' : 'http://localhost:3060';
// export const BACK_END_URL = IS_PROD ? 'https://react-api.devfactory.me' : 'http://localhost:3065';

export const IMAGE_URL = IS_PROD ? '' : `${BACK_END_URL}/`;
export const API_URL = `${BACK_END_URL}/api`;

export default {};
