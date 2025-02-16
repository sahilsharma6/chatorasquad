import RestaurantMenu from "../models/RestaurantMenu.js";
import RestaurantCuisine from "../models/RestaurantCuisine.js";
import fs from "fs";
import path from "path";
import Restaurant from "../models/Restaurant.js";
// Create a new restaurant menu


// Add Menu
export const addRestaurantMenu = async (req, res) => {
    try {
        const { name, type, sellingPrice, discountedPrice, description, isAvailable, cuisine,quantity,title,restaurantId } = req.body;

        // Basic validation
        if (!name || !type || !sellingPrice || !description || !cuisine || !restaurantId) {
            return res.status(400).json({ message: "Name, type, selling price, description, and cuisine are required" });
        }

        const images = req.files ? req.files.map(file => file.path) : [];

        const findRestaurant = await RestaurantCuisine.findOne({ _id: restaurantId });
        if (!findRestaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }

        const menu = new RestaurantMenu({
            restaurantId,
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


// Get all restaurant menu
export const getRestaurantMenu = async (req, res) => {
    try {
        const { id } = req.params;
        const menu = await RestaurantMenu.find({ restaurantId:id });
        res.status(200).json(menu);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};


// Get restaurant menu by id
export const getRestaurantMenuById = async (req, res) => {
    try {
        const { id } = req.params;
        const menu = await RestaurantMenu.findById(id);
        if (!menu) {
            return res.status(404).json({ message: "Menu not found" });
        }
        res.status(200).json(menu);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Update restaurant menu

export const updateRestaurantMenu = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, type, sellingPrice, discountedPrice, description, isAvailable, cuisine,quantity,title } = req.body;

        // Basic validation
        if (!name || !type || !sellingPrice || !description || !cuisine) {
            return res.status(400).json({ message: "Name, type, selling price, description, and cuisine are required" });
        }

        const menu = await RestaurantMenu.findById(id);
        if (!menu) {
            return res.status(404).json({ message: "Menu not found" });
        }

        const images = req.files.map(file => file.path);

        const updatedMenu = {
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
        };

        await RestaurantMenu.findByIdAndUpdate(id, updatedMenu, { new: true });
        res.status(200).json({ message: "Menu updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Delete restaurant menu
export const deleteRestaurantMenu = async (req, res) => {
    try {
        const { id } = req.params;
        const menu = await RestaurantMenu.findById(id);
        if (!menu) {
            return res.status(404).json({ message: "Menu not found" });
        }

        await RestaurantMenu.findByIdAndDelete(id);
        res.status(200).json({ message: "Menu deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};


// create restuarant cuisine

export const addRestaurantCuisine = async (req, res) => {
    try {
        const { name, restaurantId} = req.body;

        // Basic validation
        if (!name || !restaurantId) {
            return res.status(400).json({ message: "Name and restaurantId is required" });
        }

        const findRestaurant = await RestaurantCuisine.findOne({ _id: restaurantId });
        if (!findRestaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }



        const cuisine = new RestaurantCuisine({
            restaurantId, 
            name 
        });
        await cuisine.save();
        res.status(201).json({ message: "Cuisine added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};


// Get all restaurant cuisine
export const getRestaurantCuisine = async (req, res) => {
    try {
         const { id } = req.params;
        const cuisine = await RestaurantCuisine.find({ restaurantId:id });
        res.status(200).json(cuisine);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// delete restaurant cuisine
export const deleteRestaurantCuisine = async (req, res) => {
    try {
        const { id } = req.params;
        const cuisine = await RestaurantCuisine.findById(id);
        if (!cuisine) {
            return res.status(404).json({ message: "Cuisine not found" });
        }

        await RestaurantCuisine.findByIdAndDelete(id);
        res.status(200).json({ message: "Cuisine deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// update restaurant cuisine

export const updateRestaurantCuisine = async (req, res) => {
    try {
        const { id } = req.params;
        const { name} = req.body;

        // Basic validation
        if (!name ) {
            return res.status(400).json({ message: "Name is required" });
        }

        const cuisine = await RestaurantCuisine.findById(id);
        if (!cuisine) {
            return res.status(404).json({ message: "Cuisine not found" });
        }

        const updatedCuisine = {
            name
        };

        await RestaurantCuisine.findByIdAndUpdate(id, updatedCuisine, { new: true });
        res.status(200).json({ message: "Cuisine updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};


