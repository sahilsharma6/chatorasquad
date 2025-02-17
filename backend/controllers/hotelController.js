import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const createHotel = async (req, res) => {
  try {
    const { name, phoneNo, firstName,lastName ,email,password,gender} = req.body;


   if (!name || !phoneNo || !firstName || !lastName || !email || !password) {
     console.log(req.body);
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    // Check if hotel already exists
    const existingHotel = await Hotel.findOne({ name });
    if (existingHotel) {
      return res.status(400).json({ message: "Hotel already exists. use unique name" });
    }
    
   
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists .Use diffrent email " });
    }

    // Create a new user

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: 'hotel',
      gender,
      phoneNo,
    });

    // If user exists, create the hotel
    const newHotel = new Hotel({
      name,
      userId: newUser._id,
      isValid: false,
    });

     newUser.hotelId = newHotel._id;
    await newUser.save();
    await newHotel.save();
    return res.status(201).json(newHotel);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal Server error", error });
  }
};

export const setHotelPassword = async (req, res) => {
  try {
    const { id } = req.params; // Get hotel ID from request params
    const { password } = req.body; // Get new password from request body

    if (!password) {
      return res.status(400).json({ message: 'Password is required' });
    }

    // Hash the password before saving
    // Find the hotel by ID and update the password
    const updatedHotel = await Hotel.findByIdAndUpdate(
      id,
      { protected_password: password },
      { new: true }
    );
    if (!updatedHotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.status(200).json({ message: 'Password set successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};
// validate hotel

export const validateHotel = async (req, res) => {
  const { id } = req.params;

  try {
    const hotel = await Hotel.findById(id);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    hotel.isValid = true;
    await hotel.save();
    return res.status(200).json(hotel);
  } catch (error) {
    return res.status(500).json({ message: "internal Server error", error });
  }
};





// Get all hotels
export const getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find().populate('userId'); // Populate user details if needed
    return res.status(200).json(hotels);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal Server error", error });
  }
};
//roomsdetails also

// Get a single hotel by ID
export const getHotelById = async (req, res) => {
  const { id } = req.params;
  try {
    const hotel = await Hotel.findById(id).populate('userId');
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    return res.status(200).json(hotel);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal Server error", error });
  }
}
//rooms details
// Update hotel details
export const updateHotel = async (req, res) => {
  const { id } = req.params;
  const { name,firstName,lastName,gender,age} = req.body;
console.log(req.body);

  try {
    const hotel = await Hotel.findById(id);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    hotel.name = name || hotel.name;

    const user = await User.findById(hotel.userId);
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.gender = gender || "";
    user.age = age || user.age;
    await user.save();
    await hotel.save();
    
    const updatedHotel = await Hotel.findById(id).populate('userId');

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


// change role to hotel 
// Get all validated hotels
export const getValidatedHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find({ isValid: true })
    // .populate('userId');
    return res.status(200).json(hotels);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal Server error", error });
  }
};
export const changeRoleToHotel = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user already has a hotel
    const existingHotel = await Hotel.findOne({ userId: user._id });
    if (existingHotel) {
      return res.status(400).json({ message: "User already has a hotel" });
    }

    // Check if a hotel with the given name already exists
    const hotelExists = await Hotel.findOne({ name });
    if (hotelExists) {
      return res.status(400).json({ message: "Hotel already exists" });
    }

    const newHotel = new Hotel({
      name,
      userId: user._id,
      isValid: true,
    });

    user.role = "hotel";
    user.hotelId = newHotel._id;
    await user.save();
    await newHotel.save();

    return res.status(201).json(newHotel);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};


// create a room 

export const createRoom = async (req, res) => {
  try{
    const {id}=req.params;
    const {room}= req.body;
    const hotel = await Hotel.findById(id);
    if(!hotel){
      return res.status(404).json({message:"Hotel not found"});
    }
    console.log(room);
    
    const rooms = await Room.find({hotelId:id});
     rooms.map((x)=>{
       if(x.room===room){
         return res.status(400).json({message:"Room already exists"});
       }
     });
      const newRoom = new Room({
        hotelId:id,
        room,
      });
      await newRoom.save();
      return res.status(201).json(newRoom);
  }
  catch(error){
    console.log(error);
    return res.status(500).json({message:"internal Server error",error});
  }
}


// get all rooms of a hotel

export const getRooms = async (req, res) => {
  try {
    const { id } = req.params;
    const hotel = await Hotel.findById(id);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    const rooms = await Room.find({ hotelId: id });
    return res.status(200).json(rooms);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// get a single room of a hotel

export const deleteRoom = async (req, res) => {
  try{
    const {id}=req.params;
    const room = await Room.findByIdAndDelete(id);
    if(room){
      return res.status(200).json({message:"Room deleted successfully"});
    }
   else{
    return res.status(404).json({message:"Room not found"});
  }
   }
   
  catch(error){
    console.log(error);
    return res.status(500).json({message:"internal Server error",error});
  }
}

export const getRoomById = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    // Fetch the room
    const room = await Room.findById(id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    // Fetch the associated hotel
    const hotel = await Hotel.findById(room.hotelId);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    if (password!=hotel.protected_password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    return res.status(200).json(room);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};





export const createHotelAdmin = async (req, res) => {
  try {
    const { name, phoneNo, firstName,lastName ,email,password,gender} = req.body;


   if (!name || !phoneNo || !firstName || !lastName || !email || !password) {
     console.log(req.body);
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    // Check if hotel already exists
    const existingHotel = await Hotel.findOne({ name });
    if (existingHotel) {
      return res.status(400).json({ message: "Hotel already exists. use unique name" });
    }
    
   
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists .Use diffrent email " });
    }

    // Create a new user

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: 'hotel',
      gender,
      phoneNo,
    });

    // If user exists, create the hotel
    const newHotel = new Hotel({
      name,
      userId: newUser._id,
      isValid: true,
    });

     newUser.hotelId = newHotel._id;
    await newUser.save();
    await newHotel.save();
    return res.status(201).json(newHotel);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal Server error", error });
  }
};



// export const updateHotelAdmin = async (req, res) => {
//   const { id } = req.params;
//   const { name, email,isVal} = req.body;
//   try {
//     const updatedHotel = await Hotel.findByIdAndUpdate(id, {
//       name,
//       phoneNo,
//       isValid,address,email
//     }, { new: true });
//     if (!updatedHotel) {
//       return res.status(404).json({ message: "Hotel not found" });
//     }
//     return res.status(200).json(updatedHotel);
//   } catch (error) {
//     return res.status(500).json({ message: "Server error", error });
//   }
// };
//get all hotel get all rooms all cloud kitchen
// // Delete a hotel
// export const deleteHotelAdmin = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const deletedHotel = await Hotel.findByIdAndDelete(id);
//     if (!deletedHotel) {
//       return res.status(404).json({ message: "Hotel not found" });
//     }
//     return res.status(200).json({ message: "Hotel deleted successfully" });
//   } catch (error) {
//     return res.status(500).json({ message: "Server error", error });
//   }
// };

