
const users = require("../data/user");

//Get all users
const getUsers = (req, res) => {
    res.status(200).json({
        success: true,
        data: users
    });
}

//Get user by ID
const getUserById = (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    res.status(200).json({
        success: true,
        data: user
    });
};

//Create user
const createUser = (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            success: false,
            message: "Name and email are required"
        });
    }

    const newUser = {
        id: users.length + 1,
        name,
        email
    };

    users.push(newUser);

    res.status(201).json({
        success: true,
        data: newUser
    });
}

//DELETE USER
const deleteUser = (req, res) => {
    const id = Number(req.params.id);
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    users.splice(userIndex, 1);

    res.status(200).json({
        success: true,
        message: "User deleted successfully"
    });
}

//update user
const updateUser = (req, res) => {
    const id = Number(req.params.id);

    const { name, email } = req.body;

    const userIndex = users.findIndex(
        (user) => user.id === id
    );

    if (userIndex === -1) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    if (!name || !email) {
        return res.status(400).json({
            success: false,
            message: "Name and email are required"
        });
    }

    users[userIndex] = {
        ...users[userIndex],
        name,
        email
    };

    res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: users[userIndex]
    });
};


// search user by name


const searchUsers = (req, res) => {
    const { name, email } = req.query;

    const filteredUsers = users.filter((user) => {
        const matchName = name
            ? user.name.toLowerCase().includes(name.toLowerCase())
            : true;

        const matchEmail = email
            ? user.email.toLowerCase().includes(email.toLowerCase())
            : true;

        return matchName && matchEmail;
    });

    res.status(200).json({
        success: true,
        data: filteredUsers
    });
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    deleteUser,
    updateUser,
    searchUsers
};  
