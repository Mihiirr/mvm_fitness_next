import nc from 'next-connect';
import db from '@/utils/mongoConnect';
import User from '@/models/User';

const handler = nc();

handler.get(async (req, res) => {
    try {
        await db.connect();
        const users = await await User.find();
        if (!users) return res.json({ message: "Something went wrong while fetching all users!" });
        await db.disconnect();
        res.send(users);
    } catch (err) {
        console.log(err);
        return res.status(400).send("Error. Try again.");
    }
});

export default handler;