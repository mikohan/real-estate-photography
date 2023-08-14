module.exports = [
  "strapi::errors",
  "strapi::security",
  //"strapi::cors",
  {
    name: "strapi::cors",
    config: {
      //    origin: ["*"],
      origin: ["http://localhost:1337", "http://angaramedia.site"],
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"],
      headers: ["Content-Type", "Authorization", "Origin", "Accept"],
      keepHeaderOnError: true,
    },
  },
  "strapi::poweredBy",
  // {
  //   name: "strapi::cors",
  //   config: {
  //     enabled: true,
  //     headers: "*",
  //     origin: ["http://localhost:1337", "http://angaramedia.site"],
  //   },
  // },
  "strapi::logger",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
