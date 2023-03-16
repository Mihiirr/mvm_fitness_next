import mongoose from 'mongoose';

let User;

try {
    User = mongoose.model('User');
} catch {
    const userSchema = new mongoose.Schema({
        username: { type: String, required: true, unique: true },
        phone: { type: Number },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, required: true, default: false },
    }, {
        timestamps: true,
    });
    User = mongoose.model('User', userSchema);
}

export default User;