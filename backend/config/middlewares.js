module.exports = [
  "strapi::errors",
  "strapi::security",
  //"strapi::cors",
  {
    name: "strapi::cors",
    config: {
      enabled: true,
      headers: "*",
      origin: ["http://localhost:1337", "http://angaramedia.site"],
    },
  },
  "strapi::poweredBy",
  "strapi::logger",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
