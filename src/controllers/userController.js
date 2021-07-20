const User = require('../models/user');
const bcrypt = require('bcrypt');

const encryptPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);

        const encryptedPassword = await bcrypt.hash(password, salt)

        return encryptedPassword
    } catch (err) {
        return err
    }
};

module.exports = {
    async create(req, res) {

        const {
            name,
            birthDate,
            email,
            password,
            tel,
            gender,
            profi,
            registerNumber,
            specialty,
            location,
            maxDistance
        } = req.body;

        try {

            const userAlreadyExist = await User.findOne({ email });

            if (userAlreadyExist) {
                return res.status(400).send( { message: 'Já existe um email' } )
            }

            const hashedPassword = await encryptPassword(password);

            const createdUser = await User.create({
                name,
                birthDate,
                email,
                password: hashedPassword,
                tel,
                gender,
                profi,
                registerNumber,
                specialty,
                location,
                maxDistance
            })

            return res.status(200).send(createdUser);
        }
        catch(err) {
            return res.status(400).send(err)
        }
    },

    async read(req, res) {
        try {
            const allUsers = await User.find();
            return res.status(200).send(allUsers)
        } catch (error) {
            return res.status(400).send(error);
        }
    },

    async update(req, res) {
        const {
            name,
            birthDate,
            email,
            password,
            tel,
            gender,
            profi,
            registerNumber,
            specialty,
            location,
            maxDistance
        } = req.body;

        const { user_id } = req.params;

        try {

            const updatedData = {
                name,
                birthDate,
                email,
                password,
                tel,
                gender,
                profi,
                registerNumber,
                specialty,
                location,
                maxDistance
            }

            if (updatedData.password === "") {
                delete updatedData.password;
            } else {
                updatedData.password = await encryptPassword(password)
            }

            const userToUpdate = await User.updateOne({ _id: user_id }, updatedData);

            return res.status(200).send(userToUpdate);

        } catch (error) {
            return res.status(400).send(error)
        }

    },

    async delete(req, res) {
        const { user_id } = req.params;
        const { auth } = req.headers;

        if (user_id !== auth) {
            return res.status(400).send({ message: 'Não autorizado' }) 
        } 

        try {
            const deletedUser = await User.findByIdAndDelete(user_id);

            return res.status(200).send( {status: deleted, user: deletedUser} )
        } catch (error) {
            return res.status(400).send(err);
        }
    },

    async findUser(req, res) {
        const { user_id } = req.params;

        try {
            const userData = await User.findOne( { _id: user_id } );
            return res.status(200).send(userData)
        } catch (error) {
            return res.status(400).send(error);
        }
    }
}