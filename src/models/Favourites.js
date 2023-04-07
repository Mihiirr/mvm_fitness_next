import mongoose from 'mongoose';

let Favourites;

try {
    Favourites = mongoose.model('Favourites');
} catch {
    const favouriteSchema = new mongoose.Schema({
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        favourites: [
            {
                id: String,
                name: String,
                bodyPart: String,
                equipment: String,
                gifUrl: String,
                target: String
            }
        ]
    }, {
        timestamps: true,
    });
    Favourites = mongoose.model('Favourites', favouriteSchema);
}

export default Favourites;