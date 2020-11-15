const moongose = require('mongoose');

const productSchema = new moongose.Schema(
  {
    title: String,
    price: Number,
    images: Object,
    description: String,
    numReviews: Number,
    rating: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = moongose.model('Products', productSchema);
