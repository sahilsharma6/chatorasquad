import Menu from "../models/Menu.js";

export const addMenu = async (req, res) => {
    try{
        const {name, type, price, description, image, isAvailable, Cuisine} = req.body;
        const menu = new Menu({
            name,
            type,
            price,
            description,
            image,
            isAvailable,
            Cuisine
        });
        await menu.save();
        res.status(201).json({message:"Menu added successfully"});
    }catch(error){
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

    export const getMenuBySearch = async (req, res) => {
        const searchValue = req.query.searchValue;
      
        try {
          if (!searchValue) {
            return res.status(400).json({ message: "Query parameter is required" });
          }
      
          const menu = await Menu.find({
            $or: [
              { name: { $regex: searchValue, $options: "i" } }, 
              { description: { $regex: searchValue, $options: "i" } },
              { Cuisine: { $regex: searchValue, $options: "i" } }, 
            ],
          });
      
          res.status(200).json(menu);
        } catch (error) {
          console.error("Error fetching menu:", error);
          res.status(500).json({ message: "Internal server error" });
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
export const getFilteredMenu = async (req, res) => {
    try {
      const { cuisine, type, price, rating } = req.query;
  
      const query = {};
      if (cuisine) query.Cuisine = cuisine; 
      if (type) query.type = type;         
      if (price) query.price = { $lte: Number(price) };
      if (rating) query.rating = { $gte: Number(rating) };
      const menu = await Menu.find(query);
      res.status(200).json(menu);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };


  export const updateMenu = async (req, res) => {
    try{
        const {name, type, price, description, image, isAvailable, Cuisine} = req.body;
        const menu = await Menu.findById(req.params.id);
        menu.name = name;
        menu.type = type;
        menu.price = price;
        menu.description = description;
        menu.image = image;
        menu.isAvailable = isAvailable;
        menu.Cuisine = Cuisine;
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
        await Menu.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"Menu deleted successfully"});
    }catch(error){
        res.status(500).json({message:"Internal server error"});

    }   
};

