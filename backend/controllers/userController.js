import Address from '../models/addressModel.js';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';


export const getUser = async (req, res) => {
    try{
        const id = req.params.id;
        const user = await User.findById(id);
        if(user){
            res.status(200).json(user);
        }
        else{
            res.status(400).json({message:"User not found"});
        }
    }
    catch(error){
        res.status(500).json({message:"Internal server error"});
    }
}


export const UpdatePassword = async (req, res) => {
    try{
        const id = req.params.id;
        const {oldPassword, newPassword} = req.body;
        const user = await User.findById(id);
        if(user){
            const isMatch = await bcrypt.compare(oldPassword, user.password);
            if(isMatch){
                user.password = await bcrypt.hash(newPassword, 12);
                await user.save();
                res.status(200).json({message:"Password updated successfully"});
            }
            else{
                res.status(400).json({message:"Old password is incorrect"});
            }
        }
        else{
            res.status(400).json({message:"User not found"});
        }
    }
    catch(error){
        res.status(500).json({message:"Internal server error"});
    }
}

export const UpdateUser = async (req, res) => {
    try{
        const id = req.params.id;
        const {firstName, lastName,age ,gender} = req.body;
        const user = await User.findById(id);
        if(user){
            user.firstName = firstName;
            user.lastName = lastName;
            user.gender=gender;
            user.age = age;
        }
        else{
            res.status(400).json({message:"User not found"});
        }
    }
    catch(error){
        res.status(500).json({message:"Internal server error"});
    }
}

export const UpdatePhone = async (req, res) => {
    try{
        const id = req.params.id;
        const {phoneNo} = req.body;
        const user = await User.findById(id);
        if(user){
            user.phoneNo = phoneNo;
            await user.save();
            res.status(200).json({message:"Phone number updated successfully"});
        }
        else{
            res.status(400).json({message:"User not found"});
        }
    }
    catch(error){
        res.status(500).json({message:"Internal server error"});
    }
}

export const UpdateEmail = async (req, res) => {
    try{
        const id = req.params.id;
        const {email,password} = req.body;
        const user = await User.findById(id);
        if(user){
            const isMatch = await bcrypt.compare(password, user.password);
            if(isMatch){
                user.email = email;
                await user.save();
                res.status(200).json({message:"Email updated successfully"});
            }
            else{
                res.status(400).json({message:"Password is incorrect"});
            }
        }
        else{
            res.status(400).json({message:"User not found"});
        }
    }
    catch(error){
        res.status(500).json({message:"Internal server error"});
    }
}



export const UpdateAddress = async (req, res) => {
    try{
        const id = req.params.id;
        const {Zipcode, city, state, location} = req.body;
        const address = await Address.findById(id);
        if(address){
            address.Zipcode = Zipcode;
            address.city = city;
            address.state = state;
            address.location = location;
            await address.save();
            res.status(200).json({message:"Address updated successfully"});
        }   
        else{
            res.status(400).json({message:"Address not found"});
        }
    }
    catch(error){
        res.status(500).json({message:"Internal server error"});
    }
}

export const getAddress = async (req, res) => {
    try{
        const id = req.params.id;
        const address = await Address.findOne({userid:id});
        if(address){
            res.status(200).json(address);
        }
        else{
            res.status(200).json({message:"Address not found"});
        }
    }
    catch(error){
        res.status(500).json({message:"Internal server error"});
    }
}

export const addAddress = async (req, res) => {
    try{
        const {userid, Zipcode, city, state, location} = req.body;
        const address = new Address({
            userid,
            Zipcode,
            city,
            state,
            location
        });
        await address.save();
        res.status(200).json({message:"Address added successfully"});
    }
    catch(error){
        res.status(500).json({message:"Internal server error"});
    }
}





