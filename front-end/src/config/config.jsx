const isProd = process.env.NODE_ENV === 'production';

export const BACK_END_URL = isProd
  ? 'http://nodebird-api.devfactory.me'
  : 'http://localhost:3065';

export const IMAGE_URL = isProd ? '' : `${BACK_END_URL}/`;
export const API_URL = `${BACK_END_URL}/api`;

export default {};
