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
    try {
      const lineItems = await Promise.all(
        products.map(async (product) => {
          const item = await strapi
            .service("api::price.price")
            .findOne(product.id);
          console.log("ITEM", item);
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
      console.log("SESSION", session);
      await strapi.service("api::order.order").create({
        data: {
          products,
          stripeid: session.id,
          email: session.email,
          phone: session.phone,
          name: session.name,
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
