import mongoose from 'mongoose';

let User;

try {
    User = mongoose.model('User');
} catch {
    const userSchema = new mongoose.Schema({
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        phone: { type: Number },
        isAdmin: { type: Boolean, required: true, default: false },
        height: { type: Number },
        weight: { type: Number }
    }, {
        timestamps: true,
    });
    User = mongoose.model('User', userSchema);
}

export default User;