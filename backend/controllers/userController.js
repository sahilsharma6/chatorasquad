import Address from '../models/Address.js';
import User from '../models/User.js';
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
        const {zipcode, city, state, location} = req.body;
        const address = await Address.findById(id);
        if(address){
            address.zipcode = zipcode;
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

export const getdefaultAddress = async (req, res) => {
    try{
        const id = req.params.id;
        const address = await Address.findOne({userid:id, type:"default"});
        if(address){
            res.status(200).json(address);
        }
        else{
            res.status(400).json({message:"Default address not found"});
        }
    }
    catch(error){
        res.status(500).json({message:"Internal server error"});
    }
}

export const addAddress = async (req, res) => {
    try{
        const {userid, zipcode, city, state, location} = req.body;
        const existingAddress = await Address.find({userid});
        if(existingAddress.length === 0){
        const address = new Address({
            userid,
            zipcode,
            city,
            state,
            location,
            type:"default"
        });

        await address.save();
    }
    else{
        const address = new Address({
            userid,
            zipcode,
            city,
            state,
            location,
            type:"other"
        });
        await address.save();
    }
        res.status(200).json({message:"Address added successfully"});
    }
    catch(error){
        res.status(500).json({message:"Internal server error"});
    }
}


export const  deleteAddress = async (req, res) => {
    try{
        const id = req.params.id;
        await Address.findByIdAndDelete(id);
        res.status(200).json({message:"Address deleted successfully"});
    }
    catch(error){
        res.status(500).json({message:"Internal server error"});
    }
}
;

export const setDefaultAddress = async (req, res) => {
    try{
        const id = req.params.id;
        const address = await Address.findById(id);
        const userid = address.userid;
        const addresses = await Address.find({userid});
        addresses.forEach(async (add) => {
            add.type = "other";
            await add.save();
        });

        address.type = "default";
        await address.save();
        res.status(200).json({message:"Default address set successfully"});
    }
    catch(error){
        res.status(500).json({message:"Internal server error"});
    }
}
;

export const getAddresses = async (req, res) => {
    try{
        const id = req.params.id;
        const addresses = await Address.find({userid:id});
        res.status(200).json(addresses);
    }
    catch(error){
        res.status(500).json({message:"Internal server error"});
    }
}
;




