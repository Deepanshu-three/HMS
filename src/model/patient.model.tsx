import mongoose, { Schema, Document } from 'mongoose';

import { IUser } from './user.model';

export interface IPatient extends IUser {
  age: number;
  gender: 'male' | 'female' | 'other';
  medicalHistory: string[];
}

const PatientSchema: Schema = new Schema({
  age: { type: Number, required: true },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  medicalHistory: [{ type: String }],
});

export default mongoose.models.Patient || mongoose.model<IPatient>('Patient', PatientSchema);
