import nc from 'next-connect';
import db from '@/utils/mongoConnect';
import User from '@/models/User';
import { isAuth } from '@/utils/auth';

const handler = nc();

handler.use(isAuth);

handler.patch(async (req, res) => {
    await db.connect();
    User.findOne({ _id: req.user._id }).then((user) => {
        const { id, name, bodyPart, equipment, gifUrl, target } = req.body;
        const favExists = user.favourites.some((fav) => fav.id === id);
        favExists ? res.json({ message: "Item already added!" }) : user.favourites.push({ id, name, bodyPart, equipment, gifUrl, target });
        user.save().then((user) => res.json(user)).catch((err) => res.status(400).json("Error" + err));
    }).catch((err) => {
        console.log(err);
        return res.status(400).send("Error. Try again.");
    })
    await db.disconnect();
});

export default handler;