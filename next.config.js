/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["img.icons8.com", "res.cloudinary.com", "www.sportsuncle.com"],
  },
  security: {
    // Set the content security policy to allow 'self' and the specific origins you need.
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'",
          "'unsafe-eval'",
          "example.com",
          "another-origin.com",
        ],
        // Add any other necessary directives here.
      },
    },

    // Specify the allowed list of external domains for cross-origin communication.
    // Be sure to replace 'example.com' and 'another-origin.com' with the actual domains.
    allowedExternalDomains: ["", "another-origin.com"],
  },
  env: {
    GRAPHQL_SERVER: "https://server-flame-two.vercel.app/graph",
    SHIPPING: "Pay To Delivery Partner",
    Discount: "10",
  },
  headers: [
    {
      key: "X-Frame-Options",
      value: "DENY",
    },
    {
      key: "Content-Security-Policy",
      value:
        "default-src 'self' 'https://soilbooster.in'; image-src 'https://unsplash.com'; script-src 'self' https://www.google-analytics.com; font-src 'self' 'https://fonts.googleapis.com'",
    },
    {
      key: "X-Content-Type-Options",
      value: "nosniff",
    },
    {
      key: "Permissions-Policy",
      value:
        "camera=(); battery=(self); geolocation=(); microphone=('https://soilbooster.in')",
    },
    {
      key: "Referrer-Policy",
      value: "origin-when-cross-origin",
    },
  ],
};

module.exports = nextConfig;
