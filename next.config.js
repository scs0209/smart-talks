/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 정적 사이트 생성 설정
  exportPathMap: async function () {
    return {
      '/signup': { page: '/signup' },
      '/login': { page: '/login' },
      '/index': { page: '/index' },
      // 다른 페이지들도 필요에 따라 추가해줍니다.
    }
  },
}

module.exports = nextConfig
