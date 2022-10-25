const amqb = require("amqplib");

exports.publisher = async (userId) => {
  const connect = await amqb.connect(process.env.amqb_URL);
  const channel = await connect.createChannel();
  await channel.assertQueue("productAIQueue");
  channel.sendToQueue("productAIQueue", Buffer.from(userId));
  console.log("Message send - MQ");
};
