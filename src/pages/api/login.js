import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import User from '../../models/user';
import db from '../../utils/mongoConection'
import { signToken } from '../../utils/auth';

const handler = nc();

handler.post(async (req, res) => {
    try {
        await db.connect();
        const { username_email, password } = req.body;
        const queryUsername_email = "^" + username_email + "$";

        // Check if username or email exists --> Check if password is correct --> Create jwt token --> Send token to header
        const userExists = await User.findOne({
            username: { $regex: queryUsername_email, $options: "i" },
        });
        if (!userExists) {
            const emailExists = await User.findOne({
                email: { $regex: queryUsername_email, $options: "i" },
            });
            if (!emailExists) {
                return res.json({ message: "Username/Email not found", description: "Try using different Username/Email." });
            } else {
                const validPass = await bcrypt.compare(password, emailExists.password);
                if (!validPass) return res.json({ message: "Invalid password" });
                const token = signToken(emailExists);
                res.send({
                    token,
                    _id: emailExists._id,
                    username: emailExists.username,
                    email: emailExists.email,
                    isAdmin: emailExists.isAdmin,
                });
            }
        } else {
            const validPass = await bcrypt.compare(password, userExists.password);
            if (!validPass) return res.json({ message: "Invalid password" });
            const token = signToken(userExists);
            res.send({
                token,
                _id: userExists._id,
                username: userExists.username,
                email: userExists.email,
                isAdmin: userExists.isAdmin,
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(400).send("Error. Try again.");
    }
});

export default handler;