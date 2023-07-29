'use strict';

/**
 * package-set service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::package-set.package-set');
