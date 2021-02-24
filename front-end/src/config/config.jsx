const isProd = process.env.NODE_ENV === 'production';

export const API_URL = isProd
  ? 'http://nodebird-api.devfactory.me'
  : 'http://localhost:3065';

export default {};
