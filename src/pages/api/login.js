import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import { signToken } from '../../utils/auth';
import db from '@/utils/mongoConnect';
import User from '@/models/User';

const handler = nc();

handler.post(async (req, res) => {
    try {
        await db.connect();
        const { username_email, password } = req.body;
        // Check if username or email exists --> Check if password is correct --> Create jwt token --> Send token to header
        const userExists = await User.findOne({ username: username_email });
        if (!userExists) {
            const emailExists = await User.findOne({ email: username_email });
            if (!emailExists) {
                return res.json({ message: "Username/Email not found", description: "Try using different Username/Email." });
            } else {
                const validPass = await bcrypt.compare(password, emailExists.password);
                if (!validPass) return res.json({ message: "Invalid password" });
                const token = signToken(JSON.parse(JSON.stringify(emailExists)));
                res.send({
                    token,
                    _id: emailExists._id,
                    username: emailExists.username,
                    email: emailExists.email,
                    phone: emailExists.phone,
                    height: emailExists.height,
                    weight: emailExists.weight,
                    isAdmin: emailExists.isAdmin,
                });
            }
        } else {
            const validPass = await bcrypt.compare(password, userExists.password);
            if (!validPass) return res.json({ message: "Invalid password" });
            const token = signToken(JSON.parse(JSON.stringify(userExists)));
            res.send({
                token,
                _id: userExists._id,
                username: userExists.username,
                email: userExists.email,
                phone: userExists.phone,
                height: userExists.height,
                weight: userExists.weight,
                isAdmin: userExists.isAdmin
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(400).send("Error. Try again.");
    }
});

export default handler;