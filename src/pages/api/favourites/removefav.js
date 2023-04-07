import nc from 'next-connect';
import db from '@/utils/mongoConnect';
import User from '@/models/User';
import { isAuth } from '@/utils/auth';

const handler = nc();

handler.use(isAuth);

handler.post(async (req, res) => {
    await db.connect();
    const { id } = req.body;
    await User.findOne({ _id: req.user._id }).then((user) => {
        user.favourites.forEach((favourite, index) => {
            if (favourite.id.toString() === id.toString()) {
                user.favourites.splice(index, 1);
                user
                    .save()
                    .then((user) => res.json(user))
                    .catch((err) => res.status(400).json("Error: " + err));
            }
        });
    });
    if (!id) return res.json({ message: `Cannot find Item with id:${id}!` });
    await db.disconnect();
});

export default handler;