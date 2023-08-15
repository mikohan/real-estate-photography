module.exports = [
  "strapi::errors",
  "strapi::security",
  //"strapi::cors",
  "strapi::poweredBy",
  {
    name: "strapi::cors",
    config: {
      //    origin: ["*"],
      origin: [
        "http://localhost:1337",
        "http://localhost:3001",
        "http://localhost",
        "http://angaramedia.site",
        "http://api.angaramedia.site",
      ],
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"],
      headers: ["Content-Type", "Authorization", "Origin", "Accept"],
      keepHeaderOnError: true,
    },
  },
  "strapi::logger",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
