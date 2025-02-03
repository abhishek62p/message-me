import mongoose, { Schema, Document} from "mongoose";

export interface Message extends Document {
    content: string;
    createdAt: Date
}

const MessageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})


export interface User extends Document {
    username: string;
    email: string;
    password: string;
    verifiyCode: string;
    verifiyCodeExpiry: Date;
    isVerified: boolean;
    isAcceptingMessage: boolean
    message: Message[]
}

const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/.+\@.+\..+/, 'please use a valid email address']  // using regex for matching valid email. { ignore this }
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    verifiyCode: {
        type: String,
        required: [true, 'Password is required']
    },
    verifiyCodeExpiry: {
        type: Date,
        required: [true, 'verifiy code Expiry is required']
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAcceptingMessage: {
        type: Boolean,
        default: true
    },
    message: [MessageSchema]
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model('User', UserSchema)

export default UserModel;