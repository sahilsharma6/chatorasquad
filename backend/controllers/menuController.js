import Menu from "../models/Menu.js";
import Cuisine from "../models/Cuisine.js";
import Reviews from "../models/Reviews.js";
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
        
    //    const cuisinefound = await Cuisine.find({name:cuisine});
    //      if(cuisinefound.length === 0){
    //         const newCuisine = new Cuisine({
    //             name:cuisine,
    //             images,
    //             date:Date.now(),
    //             items:[menu._id]

    //         });
    //         await newCuisine.save();
    //     }else{
    //         cuisinefound[0].items.push(menu._id);
    //         await cuisinefound[0].save();
    //     }
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
    try {
        const id = req.params.id;

        const menu = await Menu.findById(id);
        if (!menu) {
            return res.status(404).json({ message: "Menu item not found" });
        }
     
        const cuisine = await Cuisine.findOne({ name: menu.Cuisine });
        if (cuisine) {
            cuisine.items = cuisine.items.filter(item => item.toString() !== id);
            await cuisine.save();
        }

       const reviews = await Reviews.find({menuId:id});
         reviews.forEach(async review => {
            await review.deleteOne();
        }
        );
        
        await menu.deleteOne();

        res.status(200).json({ message: "Menu Item deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};



export const getReviws = async (req, res) => {
    try{
        const review = await Reviews.find({menuId:req.params.id});
        res.status(200).json(review);
    }catch(error){
        res.status(500).json({message:"Internal server error"});
    }
}

export const addReview = async (req, res) => {
    try{
        const {rating, review} = req.body;
        const setreview = new Reviews({
            menuId:req.params.id,
            userId:req.user._id,
            rating,
            review
        });
        await setreview.save();
        res.status(201).json({message:"Review added successfully"});
    }catch(error){
        res.status(500).json({message:"Internal server error"});
    }
}

export const updateReview = async (req, res) => {
    try{
        const {rating, review} = req.body;
        const setreview = await Reviews.findById(req.params.id);
        setreview.rating = rating;
        setreview.review = review;
        await setreview.save();
        res.status(200).json({message:"Review updated successfully"});
    }catch(error){
        res.status(500).json({message:"Internal server error"});
    }
}

export const deleteReview = async (req, res) => {
    try{
        const id = req.params.id;
        await Reviews.findByIdAndDelete(id);
        res.status(200).json({message:"Review deleted successfully"});
    }catch(error){
        res.status(500).json({message:"Internal server error"});
    }
}


export const getRating = async (req, res) => {
    try{
        const reviews = await Reviews.find({menuId:req.params.id});
        let sum = 0;
        reviews.forEach(review => {
            sum+=review.rating;
        });
        const rating = sum/reviews.length;
        res.status(200).json({rating});
    }
    catch(error){
        res.status(500).json({message:"Internal server error"});
    }
}

