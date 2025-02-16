import Restaurant from "../models/Restaurant";
import Menu from "../models/RestaurantMenu";


export const addMenuItem = async (req, res) => {
    try {
      const { restaurantId } = req.params;
      const {
        name,
        title,
        type,
        sellingPrice,
        discountedPrice,
        offerDates,
        description,
        images,
        isAvailable,
        cuisine,
        quantity,
      } = req.body;
  
      // Check if the restaurant exists
      const restaurant = await Restaurant.findById(restaurantId);
      if (!restaurant) {
        return res.status(404).json({ message: "Restaurant not found" });
      }
  
      // Create a new menu item
      const newMenuItem = new Menu({
        name,
        title,
        type,
        sellingPrice,
        discountedPrice,
        offerDates,
        description,
        images,
        isAvailable,
        cuisine,
        quantity,
        restaurant: restaurantId, // Link to the restaurant
      });
  
      // Save menu item
      const savedMenuItem = await newMenuItem.save();
  
      // Add menu item reference to the restaurant
      restaurant.menu.push(savedMenuItem._id);
      await restaurant.save();
  
      res.status(201).json({
        message: "Menu item added successfully",
        menuItem: savedMenuItem,
      });
    } catch (error) {
      console.error("Error adding menu item:", error);
      res.status(500).json({ message: "Server error" });
    }
  };