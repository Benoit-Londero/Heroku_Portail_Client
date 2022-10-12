// backend/index.js

const express = require("express");
const {con} = require('./db');
const path = require('path');
const cors = require('cors');


const stripe = require('stripe')('sk_test_51JPNMRKlBZDgS2fN3ms2M0w6rY4ldLHn3t2jMdsRBcdMe7KvaGtx5OxHJIP83c3zu8qg6GM0NjM83wYGunj7g2p900s1crxxyd');
const endpointSecret = 'whsec_796d1aa6a6a2abb7344ef2a5512b87f6b184c607121d6bd8d4530143849cc280';
const app = express();

const router = require("./config/router.js");

app.use(cors());
app.use(express.json());
/* app.use(express.static(path.join(__dirname, 'public'))); */

app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
    let event = request.body;
    // Only verify the event if you have an endpoint secret defined.
    // Otherwise use the basic event deserialized with JSON.parse
    if (endpointSecret) {
      // Get the signature sent by Stripe
      const signature = request.headers['stripe-signature'];
      try {
        event = stripe.webhooks.constructEvent(
          request.body,
          signature,
          endpointSecret
        );
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
        return response.sendStatus(400);
      }
    }
  
    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
        // Then define and call a method to handle the successful payment intent.
        // handlePaymentIntentSucceeded(paymentIntent);
        break;
      case 'payment_method.attached':
        const paymentMethod = event.data.object;
        // Then define and call a method to handle the successful attachment of a PaymentMethod.
        // handlePaymentMethodAttached(paymentMethod);
        break;
      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`);
    }
  
    // Return a 200 response to acknowledge receipt of the event
    response.send();
  });

app.use("/", router);

module.exports = app;



