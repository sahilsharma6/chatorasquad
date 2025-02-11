import Address from "../models/Address.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const getUser = async (req, res) => {
  try {
    const id = req.user._id;

    const user = await User.findById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(400).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUsers = async (req, res) => {
  try {
    // Step 1: Fetch users excluding the password field
    const user = await User.find({}, { password: 0 });

    // Step 2: Fetch addresses for each user
    const users = await Promise.all(user.map(async (user) => {
      const addresses = await Address.find({ userid: user._id }, { userId: 0 }); // Exclude userId from the address response
      return {
        ...user.toObject(), // Convert user document to plain object
        addresses 
      };
    }));

    res.status(200).json(users);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Internal server error" });
  }
};

export const UpdatePassword = async (req, res) => {
  try {
    const id = req.user._id;
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(id);
    if (user) {
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (isMatch) {
        user.password = await bcrypt.hash(newPassword, 12);
        await user.save();
        res.status(200).json({ message: "Password updated successfully" });
      } else {
        res.status(400).json({ message: "Old password is incorrect" });
      }
    } else {
      res.status(400).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const UpdateUser = async (req, res) => {
  try {
    const id = req.user._id;
    const { firstName, lastName, age, gender } = req.body;
    const user = await User.findById(id);
    if (user) {
      user.firstName = firstName;
      user.lastName = lastName;
      user.gender = gender || "";
      user.age = age;
      await user.save();
      res.status(200).json({ message: "User updated successfully" });
    } else {
      res.status(400).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const UpdatePhone = async (req, res) => {
  try {
    const id = req.params.id;
    const { phoneNo } = req.body;
    const user = await User.findById(id);
    if (user) {
      user.phoneNo = phoneNo;
      await user.save();
      res.status(200).json({ message: "Phone number updated successfully" });
    } else {
      res.status(400).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const UpdateEmail = async (req, res) => {
  try {
    const id = req.params.id;
    const { email, password } = req.body;
    const user = await User.findById(id);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        user.email = email;
        await user.save();
        res.status(200).json({ message: "Email updated successfully" });
      } else {
        res.status(400).json({ message: "Password is incorrect" });
      }
    } else {
      res.status(400).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const UpdateAddress = async (req, res) => {
  try {
    const id = req.params.id;
    const { zipcode, city, state, location } = req.body;
    const address = await Address.findById(id);
    if (address) {
      address.zipcode = zipcode;
      address.city = city;
      address.state = state;
      address.location = location;
      await address.save();
      res.status(200).json({ message: "Address updated successfully" });
    } else {
      res.status(400).json({ message: "Address not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getdefaultAddress = async (req, res) => {
  try {
    const id = req.params.id;
    const address = await Address.findOne({ userid: id, type: "default" });
    if (address) {
      res.status(200).json(address);
    } else {
      res.status(400).json({ message: "Default address not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addAddress = async (req, res) => {
  try {
     let address = null;
    const userid = req.user._id;
    let { zipcode, city, state, location } = req.body;
    zipcode = parseInt(zipcode);
    const existingAddress = await Address.find({ userid });
    if (existingAddress.length === 0) {
      address = new Address({
        userid,
        zipCode: zipcode,
        city,
        state,
        location,
        type: "default",
      });

      await address.save();
    } else {
      address = new Address({
        userid,
        zipCode: zipcode,
        city,
        state,
        location,
        type: "other",
      });
      await address.save();
    }
    res.status(200).json({ address });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    const id = req.params.id;
    await Address.findByIdAndDelete(id);
    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const setDefaultAddress = async (req, res) => {
  try {
    const id = req.params.id;
    const address = await Address.findById(id);
    const userid = address.userid;
    const addresses = await Address.find({ userid });
    addresses.forEach(async (add) => {
      add.type = "other";
      await add.save();
    });

    address.type = "default";
    await address.save();
    res.status(200).json({ message: "Default address set successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAddresses = async (req, res) => {
  try {
    const id = req.user._id;
    const addresses = await Address.find({ userid: id });
    res.status(200).json(addresses);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
  
};

export const DeleteUser =async()=>{
  try {
    const email=req.body.email;
    const isDeleted=await User.findOneAndDelete({email})
    res.status(200).json(isDeleted);

  } catch (error) {
    
  }
}
export const changeUserRole = async (req, res) => {
  try {
    const { userId, newRole } = req.body; // Assuming new role is passed in request body

    // Validate role
    const validRoles = ['user', 'admin', 'hotel', 'resturant'];
    if (!validRoles.includes(newRole)) {
      return res.status(400).json({
        message: 'Invalid role provided. Valid roles are: user, admin, hotel, resturant.',
      });
    }

    // Find the user by ID and update the role
    const user = await User.findByIdAndUpdate(
      userId,
      { role: newRole },
      { new: true } // Return the updated document
    );

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    res.status(200).json({
      message: `User role changed successfully to ${newRole}`,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        phoneNo: user.phoneNo,
        gender: user.gender,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error changing user role',
      error: error.message,
    });
  }
};
