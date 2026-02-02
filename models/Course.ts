import mongoose, { Schema, Model } from "mongoose";

export interface ICourse {
    title: string;
    slug?: string;
    description?: string;
    targetExam?: string;
    duration?: string;
    featureHighlights?: string[];
    thumbnailUrl?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const CourseSchema = new Schema<ICourse>(
    {
        title: { type: String, required: true },
        slug: { type: String, unique: true, sparse: true },
        description: { type: String },
        targetExam: { type: String },
        duration: { type: String },
        featureHighlights: [String],
        thumbnailUrl: { type: String },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

const Course: Model<ICourse> = mongoose.models.Course || mongoose.model<ICourse>("Course", CourseSchema);

export default Course;
