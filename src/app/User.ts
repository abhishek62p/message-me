import mongoose, { Schema, Document } from mongoose;

export interface Message {
    content: String;
    createdAt: Date
}