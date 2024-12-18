import mongoose from 'mongoose';

const MenuSchema = mongoose.Schema(
  {
   name:{
         type:String,
         required:true,
   },
   type:{
         type:String,
         required:true,
         enum:['Veg','Non-Veg','Egg'],
   },
    price:{
            type:Number,
            required:true,
            
    },
    description:{
            type:String,
            required:true,
    },
    image:{
            type:String,
            required:true,
    },
    isAvailable:{
            type:Boolean,
            required:true,
            default:true,
    },
    Cuisine:{
            type:String,
            required:true,
            enum:['Indian','Chinese','Italian','Mexican','Continental'],
    },
  },
  {
    timestamps: true,
  }
);

const Menu = mongoose.model('Menu', MenuSchema);

export default Menu;