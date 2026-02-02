import mongoose, { Schema, Model } from "mongoose";

export interface ITeacher {
    name: string;
    subject: string;
    qualification?: string;
    experience?: string;
    photoUrl?: string;
    order: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const TeacherSchema = new Schema<ITeacher>(
    {
        name: { type: String, required: true },
        subject: { type: String, required: true },
        qualification: { type: String },
        experience: { type: String },
        photoUrl: { type: String },
        order: { type: Number, default: 0 },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

const Teacher: Model<ITeacher> = mongoose.models.Teacher || mongoose.model<ITeacher>("Teacher", TeacherSchema);

export default Teacher;
