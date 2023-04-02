import nc from 'next-connect';
import db from '@/utils/mongoConnect';
import User from '@/models/User';

const handler = nc();

handler.post(async (req, res) => {
    try {
        await db.connect();
        const user_id = req.body.userId;
        await User.deleteOne({ _id: user_id })
        if (!user_id) return res.json({ message: "Cannot find user!" });
        await db.disconnect();
    } catch (err) {
        console.log(err);
        return res.status(400).send("Error. Try again.");
    }
});

export default handler;