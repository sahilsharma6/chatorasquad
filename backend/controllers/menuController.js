import Menu from "../models/Menu.js";
import Cuisine from "../models/Cuisine.js";
import Reviews from "../models/Reviews.js";
import fs from "fs";
import path from "path";

// Add Menu
export const addMenu = async (req, res) => {
    try {
        const { name, type, sellingPrice, discountedPrice, description, isAvailable, cuisine,quantity,title } = req.body;

        // Basic validation
        if (!name || !type || !sellingPrice || !description || !cuisine) {
            return res.status(400).json({ message: "Name, type, selling price, description, and cuisine are required" });
        }

        const images = req.files.map(file => file.path);
        const menu = new Menu({
            name,
            type,
            sellingPrice,
            discountedPrice,
            description,
            images,
            isAvailable,
            Cuisine: cuisine,
            quantity,
            title
        });

        await menu.save();
        res.status(201).json({ message: "Menu added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get All Menus
export const getAllMenu = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; 
        const limit = parseInt(req.query.limit) || 2;
        const skip = (page - 1) * limit;
        const menu = await Menu.find().skip(skip).limit(limit);
        const totalCount = await Menu.countDocuments();
        res.status(200).json({
            totalCount,
            totalPages: Math.ceil(totalCount / limit),
            currentPage: page,
            menu,
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get Menu Details by ID
export const getMenuDetails = async (req, res) => {
    try {
        const menu = await Menu.findById(req.params.id);
        if (!menu) {
            return res.status(404).json({ message: "Menu not found" });
        }
        res.status(200).json(menu);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get Available Menus
export const getAvailableMenu = async (req, res) => {
    try {
        const menu = await Menu.find({ isAvailable: true });
        res.status(200).json(menu);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get Trending Menus
export const getTrendingMenu = async (req, res) => {
    try {
        const menu = await Menu.find().sort({ rating: -1 }).limit(5);
        res.status(200).json(menu);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get Dairy and Beverages Menu
export const getDairyAndBeveragesMenu = async (req, res) => {
    try {
        const menu = await Menu.find({
            type: {
                $in: ["Dairy", "Beverage"],
            },
        });
        res.status(200).json(menu);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

// Update Menu
export const updateMenu = async (req, res) => {
    try {
      const { name, type, sellingPrice, discountedPrice, description, Cuisine, oldImages,quantity,title } = req.body;
  
      // Uploaded new images
      const newImages = req.files.map(file => file.path);
  
      // Merge old and new images
      const updatedImages = [...(Array.isArray(oldImages) ? oldImages : [oldImages]), ...newImages];
  
      // Validation
      if (!name || !type || !sellingPrice || !description || !Cuisine) {
        return res.status(400).json({ message: "Name, type, selling price, description, and cuisine are required" });
      }
  
      const menu = await Menu.findById(req.params.id);
      if (!menu) {
        return res.status(404).json({ message: "Menu not found" });
      }
  
      // Remove images that are not part of `oldImages`
      if (menu.images) {
        const imagesToRemove = menu.images.filter((img) => !updatedImages.includes(img));
        imagesToRemove.forEach((imagePath) => {
          const filePath = path.resolve(imagePath);
          fs.unlink(filePath, (err) => {
            if (err) console.error(`Error deleting file: ${filePath}`, err);
          });
        });
      }
  
      // Update menu
      menu.name = name;
      menu.type = type;
      menu.sellingPrice = sellingPrice;
      menu.discountedPrice = discountedPrice;
      menu.description = description;
      menu.Cuisine = Cuisine;
      menu.images = updatedImages;
      menu.quantity = quantity;
      menu. title=title
  
      await menu.save();
  
      res.status(200).json({ message: "Menu updated successfully", menu });
    } catch (error) {
      console.error("Error updating menu:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  

// Update Menu Availability
export const updateMenuAvailability = async (req, res) => {
    try {
        const { isAvailable } = req.body;

        if (isAvailable === undefined) {
            return res.status(400).json({ message: "isAvailable field is required" });
        }

        const menu = await Menu.findById(req.params.id);
        if (!menu) {
            return res.status(404).json({ message: "Menu not found" });
        }

        menu.isAvailable = isAvailable;
        await menu.save();

        res.status(200).json({ message: "Menu availability updated successfully",updatedItem :menu});
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

// Update Menu Rating
export const updateMenuRating = async (req, res) => {
    try {
        const { rating } = req.body;

        if (!rating || rating < 0 || rating > 5) {
            return res.status(400).json({ message: "Valid rating is required (0-5)" });
        }

        const menu = await Menu.findById(req.params.id);
        if (!menu) {
            return res.status(404).json({ message: "Menu not found" });
        }

        menu.rating = rating;
        await menu.save();

        res.status(200).json({ message: "Menu rating updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

// Delete Menu
export const deleteMenu = async (req, res) => {
    try {
        const id = req.params.id;

        const menu = await Menu.findById(id);
        if (!menu) {
            return res.status(404).json({ message: "Menu item not found" });
        }
        
        if (menu.images && menu.images.length > 0) {
            menu.images.forEach(imagePath => {
                const filePath = path.resolve(imagePath);
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error(`Error deleting file: ${filePath}`, err);
                    }
                });
            }
            );
        }
        

        const cuisine = await Cuisine.findOne({ name: menu.Cuisine });
        if (cuisine) {
            cuisine.items = cuisine.items.filter(item => item.toString() !== id);
            await cuisine.save();
        }

        const reviews = await Reviews.find({ menuId: id });
        for (const review of reviews) {
            await review.deleteOne();
        }

        await menu.deleteOne();
        res.status(200).json({ message: "Menu Item deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getReviws = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Menu ID is required" });
        }

        const reviews = await Reviews.find({ menuId: id });

        if (!reviews || reviews.length === 0) {
            return res.status(404).json({ message: "No reviews found for this menu item" });
        }

        res.status(200).json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const addReview = async (req, res) => {
    try {
        const { rating, review } = req.body;
        const { id: menuId } = req.params;

        if (!menuId || !rating ) {
            return res.status(400).json({ message: "Menu ID, rating,  content are required" });
        }

        if (rating < 0 || rating > 5) {
            return res.status(400).json({ message: "Rating must be between 0 and 5" });
        }

        const setreview = new Reviews({
            menuId,
            userId: req.user._id, 
            rating,
            review,
        });

        await setreview.save();
        res.status(200).json({ message: "Review added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateReview = async (req, res) => {
    try {
        const { rating, review } = req.body;
        console.log(req.body);
        
        const { id } = req.params;

        if (!id || !rating ) {
            return res.status(400).json({ message: "Review ID, rating, and review content are required" });
        }

        if (rating < 0 || rating > 5) {
            return res.status(400).json({ message: "Rating must be between 0 and 5" });
        }

        const setreview = await Reviews.findById(id);

        if (!setreview) {
            return res.status(404).json({ message: "Review not found" });
        }

        setreview.rating = rating;
        setreview.review = review;

        await setreview.save();
        res.status(200).json({ message: "Review updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Review ID is required" });
        }

        const review = await Reviews.findById(id);

        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        await review.deleteOne();
        res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getRating = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Menu ID is required" });
        }

        const reviews = await Reviews.find({ menuId: id });

        if (!reviews || reviews.length === 0) {
            return res.status(404).json({ message: "No reviews found for this menu item" });
        }

        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = totalRating / reviews.length;

        res.status(200).json({ rating: averageRating });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getReview = async (req, res) => {
    try {
        const { menuid } = req.params;

        if (!menuid) {
            return res.status(400).json({ message: "Review ID is required" });
        }

        const review = await Reviews.findOne({ menuId: menuid, userId: req.user._id });

        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        res.status(200).json(review);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
