import mongoose, { Schema, Model } from "mongoose";

export interface ITopper {
    name: string;
    exam: string;
    score?: string;
    rank?: string;
    year: number;
    photoUrl?: string;
    course?: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const TopperSchema = new Schema<ITopper>(
    {
        name: { type: String, required: true },
        exam: { type: String, required: true },
        score: { type: String },
        rank: { type: String },
        year: { type: Number, required: true },
        photoUrl: { type: String },
        course: { type: Schema.Types.ObjectId, ref: 'Course' }
    },
    { timestamps: true }
);

const Topper: Model<ITopper> = mongoose.models.Topper || mongoose.model<ITopper>("Topper", TopperSchema);

export default Topper;
