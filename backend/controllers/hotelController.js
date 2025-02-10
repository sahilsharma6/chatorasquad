import Hotel from "../models/Hotel.js";
import User from "../models/User.js";


export const createHotel = async (req, res) => {
  try {
    const { name, phoneNo, userId } = req.body;

    // Check if hotel already exists
    const existingHotel = await Hotel.findOne({ name });
    if (existingHotel) {
      return res.status(400).json({ message: "Hotel already exists." });
    }

    // Check if user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(400).json({ message: "User not found." });
    }

    // If user exists, create the hotel
    const newHotel = new Hotel({
      name,
      phoneNo,
      userId
    });

    await newHotel.save();
    return res.status(201).json(newHotel);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};


// Get all hotels
export const getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find().populate('userId', 'name email'); // Populate user details if needed
    return res.status(200).json(hotels);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

// Get a single hotel by ID
export const getHotelById = async (req, res) => {
  const { id } = req.params;

  try {
    const hotel = await Hotel.findById(id).populate('userId', 'name email');
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    return res.status(200).json(hotel);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

// Update hotel details
export const updateHotel = async (req, res) => {
  const { id } = req.params;
  const { name, phoneNo, isValid } = req.body;

  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(id, {
      name,
      phoneNo,
      isValid
    }, { new: true });

    if (!updatedHotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    return res.status(200).json(updatedHotel);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

// Delete a hotel
export const deleteHotel = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedHotel = await Hotel.findByIdAndDelete(id);
    if (!deletedHotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    return res.status(200).json({ message: "Hotel deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};
