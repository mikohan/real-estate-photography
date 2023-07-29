'use strict';

/**
 * package-set router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::package-set.package-set');
