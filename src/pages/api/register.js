import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import User from '../../models/user';
import db from '../../utils/mongoConection'
import { signToken } from '../../utils/auth';

const handler = nc();

handler.post(async (req, res) => {
    try {
        await db.connect();
        const { username, email, password } = req.body;

        // Check if the email/username is already in the database.
        const emailExists = await User.findOne({ email });
        const usernameExists = await User.findOne({ username });
        if (emailExists && usernameExists) return res.json({ message: "Email/Username already exists!!!", description: "Try using different Email and Username." })
        if (emailExists) return res.json({ message: "Email already exists", description: "Try using different Email." });
        if (usernameExists) return res.json({ message: "Username already exists", description: "Try using different Username." });

        // Salt and Hash password.
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Creating new user.
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            isAdmin: false,
        });
        const user = await newUser.save();
        await db.disconnect();
        const token = signToken(user);
        res.send({
            token,
            _id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } catch (err) {
        console.log(err);
        return res.status(400).send("Error. Try again.");
    }
});

export default handler;