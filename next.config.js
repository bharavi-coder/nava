 
/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   trailingSlash: true,
//   output: "export",          // fully static export
//   images: { unoptimized: true }, // disables server-side optimization
//   assetPrefix: "/",          // absolute paths for CSS/JS/images
// };
// module.exports = nextConfig;

const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  output: "export",       // must be "standalone" for dynamic site
  images: { unoptimized: true },
  assetPrefix: "/",           
};

// module.exports = nextConfig;

/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   trailingSlash: true,
//   images: {
//     unoptimized: true, // needed for static export
//   },
//   assetPrefix: 'https://wonderlandpreschool.in/newsite/', // <-- absolute path
// };

// module.exports = nextConfig;

// const nextConfig = {
//   reactStrictMode: true,
//   trailingSlash: true,          // adds / at the end of URLs
//   basePath: '/demosite',       // <-- subfolder where your site is hosted
//   assetPrefix: '/demosite/',   // <-- prefix for _next/static/css, JS, images
//   images: {
//     unoptimized: true,          // required for next export
//   },
// };

module.exports = nextConfig;