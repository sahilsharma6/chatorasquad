import Menu from "../models/Menu.js";
import Cuisine from "../models/Cuisine.js";
export const addMenu = async (req, res) => {
    try{
        const {name, type, sellingPrice,discountedPrice, description, isAvailable, cuisine} = req.body;
        const images = req.files.map(file => file.path);
        const menu = new Menu({
            name,
            type,
            sellingPrice,
            discountedPrice,
            description,
            images,
            isAvailable,
            Cuisine:cuisine,
        });
       const cuisinefound = await Cuisine.find({name:cuisine});
         if(cuisinefound.length === 0){
            const newCuisine = new Cuisine({
                name:cuisine,
                images,
                date:Date.now(),
                items:[menu._id]

            });
            await newCuisine.save();
        }else{
            cuisinefound[0].items.push(menu._id);
            await cuisinefound[0].save();
        }
        await menu.save();
        res.status(201).json({message:"Menu added successfully"});
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Internal server error"});
    }
};

export const getAllMenu = async (req, res) => {
    try{
      const menu = await Menu.find();
      res.status(200).json(menu);
    }catch(error){
      res.status(500).json({message:"Internal server error"});
    }
};


export const getMenuDetails = async (req, res) => {
    try{
        const menu = await Menu.findById(req.params.id);
        res.status(200).json(menu);
    }catch(error){
        res.status(500).json({message:"Internal server error"});
    }
    };

   
 export const getAvailableMenu = async (req, res) => {
    try{
        const menu = await Menu.find({isAvailable:true});
        res.status(200).json(menu);
    }catch(error){
        res.status(500).json({message:"Internal server error"});
    }
}

// export const getFilteredMenu = async (req, res) => {
//     try {
//       const { searchValue } = req.query; 
//       const { cuisine, type, sellingprice, rating } = req.body; 
  
//       const query = {};
  
      
//       if (cuisine) query.Cuisine = cuisine;
//       if (type) query.type = type;
//       if (sellingprice) query.sellingprice = { $lte: Number(sellingprice) };
//       if (rating) query.rating = { $gte: Number(rating) };
  
      
//       if (searchValue) {
//         query.$or = [
//           { name: { $regex: searchValue, $options: "i" } },
//           { description: { $regex: searchValue, $options: "i" } },
//           { Cuisine: { $regex: searchValue, $options: "i" } },
//         ];
//       }
//       if (!searchValue && Object.keys(query).length === 0) {
//         const menu = await Menu.find(); 
//         return res.status(200).json(menu);
//       }
  
//       const menu = await Menu.find(query); 
//       res.status(200).json(menu);
//     } catch (error) {
//       console.error("Error fetching menu:", error);
//       res.status(500).json({ message: "Internal server error" });
//     }
//   };


export const getTrendingMenu = async (req, res) => {
    try{
        const menu = await Menu.find().sort({rating:-1}).limit(5);
        res.status(200).json(menu);
    }catch(error){
        res.status(500).json({message:"Internal server error"});
    }
}

export const getDairyAndBeveragesMenu = async (req, res) => {
    try{
        const menu = await Menu.find({type:{
            $in:["Dairy","Beverage"]
        }});
        res.status(200).json(menu);
    }catch(error){
        res.status(500).json({message:"Internal server error"});
    }
}

  export const updateMenu = async (req, res) => {
    try{
        const {name, type, sellingPrice,discountedPrice, description, image, isAvailable, cuisine} = req.body;
        const menu = await Menu.findById(req.params.id);
        menu.name = name;
        menu.type = type;
        menu.sellingPrice = sellingPrice;
        menu.discountedPrice = discountedPrice;
        menu.description = description;
        menu.image = image;
        menu.isAvailable = isAvailable;
        menu.Cuisine = cuisine;
        await menu.save();
        res.status(200).json({message:"Menu updated successfully"});
    }catch(error){
        res.status(500).json({message:"Internal server error"});
    }
};

export const updateMenuAvailability = async (req, res) => {
    try{
        const {isAvailable} = req.body;
        const menu = await Menu.findById(req.params.id);
        menu.isAvailable = isAvailable;
        await menu.save();
        res.status(200).json({message:"Menu availability updated successfully"});
    }catch(error){
        res.status(500).json({message:"Internal server error"});
    }
};


export const updateMenuRating = async (req, res) => {
    try{
        const {rating} = req.body;
        const menu = await Menu.findById(req.params.id);
        menu.rating = rating;
        await menu.save();
        res.status(200).json({message:"Menu rating updated successfully"});
    }catch(error){
        res.status(500).json({message:"Internal server error"});
    }
};

export const deleteMenu = async (req, res) => {
    try{
        const id = req.params.id;
        const menu = await Menu.findById(id);
        const cuisine = await Cuisine.find({name:menu.Cuisine});
        cuisine[0].items = cuisine[0].items.filter(item => item.toString() !== id);
        await cuisine[0].save();
        await menu.remove();


        res.status(200).json({message:"Menu deleted successfully"});
    }catch(error){
        res.status(500).json({message:"Internal server error"});

    }   
};

