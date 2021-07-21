const withPWA = require('next-pwa')
 
module.exports = withPWA({
    env:{
        BACKEND_URL:process.env.BACKEND_URL
    },
    pwa: {
        dest: 'public'
    }
})