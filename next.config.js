const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
});
 
module.exports = withPWA({
  // Any other Next.js config options here
}); 