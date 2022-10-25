const Product = require("../models/product");
const got = require("got");
const mongoose = require("mongoose");

exports.getImageUrls = async (productId) => {
  try {
    const products = await Product.findById(productId).select({ images: 1, _id: 0 });
    if (!products) return;
    const newImages = [];
    const images = products.images;
    for (i in images) {
      const newAlt = [];
      const response = await fetchGot(images[i].url);
      const parsedData = JSON.parse(response.body);
      parsedData.result.tags.forEach((element) => {
        newAlt.push(element.tag.en);
      });
      newImages.push({ alt: newAlt.toString(), url: images[i].url });
    }
    const a = await Product.findOneAndUpdate({ _id: productId }, { images: newImages, isConfirmed: true });
  } catch (error) {
    console.log(error);
  }
};

exports.mongoconnect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("db connected");
  } catch (error) {
    console.log(error);
  }
};

const fetchGot = async (url) => {
  try {
    const response = await got("https://api.imagga.com/v2/tags?limit=3&image_url=" + encodeURIComponent(url), {
      username: process.env.GOT_API_KEY,
      password: process.env.GOT_API_SECRET,
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};
