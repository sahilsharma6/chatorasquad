import mongoose from "mongoose";
const MenuSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: "No Title",
    },
    type: {
      type: String,
      required: true,
      // enum: ["Veg", "Dairy", "Beverage"],
    },
    sellingPrice: {
      type: Number,
      required: true,
    },
    discountedPrice: {
      type: Number,
      default: 0,
    },
    offerDates: {
      start: { type: Date, default: Date.now },
      end: { type: Date, default: Date.now },
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      // required: true,
    },
    isAvailable: {
      type: Boolean,
      required: true,
      default: true,
    },
    Cuisine: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 10,
    },
    // rating: {
    //   type: Number,
    //   default: 0,
    // },
    // reviews: {
    //   type: [String],
    // },
  },
  {
    timestamps: true,
  }
);
// Middleware for find
MenuSchema.post('find', async function (docs) {
  await updateDiscountedPrice(docs);
});
// Middleware for findOne
MenuSchema.post('findOne', async function (doc) {
  if (doc) {
    await updateDiscountedPrice([doc]); // Pass as array for consistency
  }
});
// Middleware for findByIdAndUpdate
MenuSchema.post('findByIdAndUpdate', async function (doc) {
  if (doc) {
    await updateDiscountedPrice([doc]); // Ensure the updated document is checked
  }
});
// Middleware for findOneAndUpdate
MenuSchema.post('findOneAndUpdate', async function (doc) {
  if (doc) {
    await updateDiscountedPrice([doc]); // Ensure the updated document is checked
  }
});
// Function to update discounted price based on offer expiration
const updateDiscountedPrice = async (docs) => {
  const now = new Date();
  const tomorrow = new Date(now);
  // Set 'tomorrow' to one day in the future
  tomorrow.setDate(now.getDate() - 1); 
  for (const doc of docs) {
    if (tomorrow > doc.offerDates.end) {
      doc.discountedPrice = doc.sellingPrice; // Update discounted price if the offer has expired
      doc.markModified('discountedPrice'); // Mark the field as modified
      await doc.save(); // Permanently save the updated document in the database
    }
  }
};
const Menu = mongoose.model("Menu", MenuSchema);
export default Menu;