import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import clientPromise from '../../../lib/mongodb';

const handler = nc();

handler.post(async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db(process.env.MONGO_DB);
        const { username, phone, email, password } = req.body;

        // Check if the email/username is already in the database.
        const emailExists = await db.collection("users").findOne({ email });
        const usernameExists = await db.collection("users").findOne({ username });
        if (emailExists && usernameExists) return res.json({ message: "Email/Username already exists", description: "Try using different Email and Username." })
        if (emailExists) return res.json({ message: "Email already exists", description: "Try using different Email." });
        if (usernameExists) return res.json({ message: "Username already exists", description: "Try using different Username." });

        // Salt and Hash password.
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Creating new user.
        const data = await db.collection("users").insertOne({ username, phone, email, password: hashedPassword, isAdmin: false });
        res.send(data.insertedId);
    } catch (err) {
        return res.status(400).send(`Error. Try again. ${err}`);
    }
});

export default handler;