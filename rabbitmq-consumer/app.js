require("dotenv").config();
const { getImageUrls, mongoconnect } = require("./utils/helper");
const amqp = require("amqplib");

async function rabbit_consumer() {
  try {
    await mongoconnect();
    const mqconnection = await amqp.connect(process.env.amqb_URL);
    const channel = await mqconnection.createChannel();
    console.log("Waiting for message");
    channel.consume("productAIQueue", async (message) => {
      console.log("Message has arrived!");
      const productID = message.content.toString();
      await getImageUrls(productID);
      channel.ack(message);
      console.log(`Process OK - ${productID}`);
    });
  } catch (err) {
    console.log(err);
  }
}

rabbit_consumer();
