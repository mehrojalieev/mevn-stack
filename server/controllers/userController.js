const { UserSchema } = require("../models/user.model")

const getAllUers = async (req, res) => {
    try {
        const users = await UserSchema.find();
        res.status(200).json(users);
    } 
    catch (error) {
        res.status(500).json({message: error.message})    
    }
}


const getUserById = async (req, res) => {
    try {
        const user = await UserSchema.findById(req.params.id);

        if(!user) return res.status(404).json({message: 'User not found'});
        res.status(200).json(user);
    } 
    catch (error) {
        res.status(500).json({message: error.message})    
    }
}


const deleteUser = async (req, res) => {
    try {
        const deletedUser = await UserSchema.findByIdAndDelete(req.params.id);
        if(!deletedUser) return res.status(404).json({message: 'User not found'});

        res.status(200).json({message: "User deleted successfully!", user: deletedUser})
    } 
    catch (error) {
      res.status(500).json({message: error.message})    
        
    }
}

module.exports = {getAllUers, getUserById, deleteUser}