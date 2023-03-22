import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import { signToken } from '../../utils/auth';
import clientPromise from '../../../lib/mongodb';

const handler = nc();

handler.post(async (req, res) => {
    try {
        // const { db } = await connectToDatabase();
        const client = await clientPromise;
        const db = await client.db("mvm_fitness_next");
        const { username_email, password } = req.body;
        // Check if username or email exists --> Check if password is correct --> Create jwt token --> Send token to header
        const userExists = await db.collection("users").findOne({
            username: username_email
        });
        if (!userExists) {
            const emailExists = await db.collection("users").findOne({
                email: username_email,
            });
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
                    phone: emailExists.phone,
                    email: emailExists.email,
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
                phone: userExists.phone,
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