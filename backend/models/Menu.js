import mongoose from "mongoose";

const MenuSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    title:{
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
      default :0
    },
    offerDates:{
      start:{type:Date , default: Date.now},
      end:{type:Date , default: Date.now},
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
      default:10,
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

MenuSchema.post('find', function (docs) {
  const now = new Date();
  const tomorrow = new Date(now);
  console.log(tomorrow);
  
  tomorrow.setDate(now.getDate() - 1); // Set 'tomorrow' to one day in the future
  docs.forEach(doc => {
    if (tomorrow > doc.offerDates.end) {
      doc.discountedPrice = doc.sellingPrice; // Update discounted price if the offer has expired
      doc.markModified('discountedPrice'); // Mark the field as modified
    }
  });
});

const Menu = mongoose.model("Menu", MenuSchema);

export default Menu;
