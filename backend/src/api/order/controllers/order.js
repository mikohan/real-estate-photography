// "use strict";
// import Stripe from "stripe";

// // const stripe = require("stripe")(process.env.STRIPE_SK);
// const stripe = new Stripe(process.env.STRIPE_SK, {
//   apiVersion: "2022-11-15",
// });

/**
 * order controller
 */

const key = process.env.STRIPE_SK;
// @ts-ignore
const stripe = require("stripe")(key);

stripe.customers
  .create({
    email: "customer@example.com",
  })
  .then((customer) => console.log(customer.id))
  .catch((error) => console.error(error));
const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    const { products } = ctx.request.body;
    const { formData } = ctx.request.body;
    try {
      const lineItems = await Promise.all(
        products.map(async (product) => {
          let item = null;
          if (product.type === "price") {
            item = await strapi.service("api::price.price").findOne(product.id);
          }
          if (product.type === "pack") {
            item = await strapi
              .service("api::package-set.package-set")
              .findOne(product.id);
          }
          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.name,
              },
              unit_amount: Math.round(item.value * 100),
            },
            quantity: product.quantity || 1,
          };
        })
      );
      const session = await stripe.checkout.sessions.create({
        shipping_address_collection: { allowed_countries: ["US"] },
        payment_method_types: ["card"],
        mode: "payment",
        success_url: process.env.CLIENT_URL + "/success",
        cancel_url: process.env.CLIENT_URL + "/fail",
        line_items: lineItems,
      });
      await strapi.service("api::order.order").create({
        data: {
          products,
          stripeid: session.id,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address1: formData.address1,
          address2: formData.address2,
          country: formData.country,
          state: formData.state,
          zip: formData.zip,
          amount: formData.total,
        },
      });
      return { stripeSession: session };
    } catch (error) {
      console.log("In catch error", error);
      ctx.response.status = 500;
      return { error };
    }
  },
}));
