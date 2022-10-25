const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  secure: true,
});

exports.uploadImage = async (url, productId) => {
  const result = await cloudinary.uploader.upload(url, { folder: `/mq-products/${productId}` });
  return result.secure_url;
};
