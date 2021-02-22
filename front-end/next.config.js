const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

module.exports = withBundleAnalyzer({
  compress: true,
  webpack(config) {
    // console.log('config', config);
    // console.log('rules', config.module.rules);

    const isProd = process.env.NODE_ENV === 'production';
    const plugins = [...config.plugins];

    // 추가로 플러그인을 설치가 필요한 경우
    // if (prod) {
    //   plugins.push();
    // }

    return {
      ...config,
      mode: isProd ? 'production' : 'development',
      devtool: isProd ? 'hidden-source-map' : 'eval',
      plugins
    };
  }
});
