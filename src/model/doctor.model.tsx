import mongoose, { Schema, Document } from 'mongoose';

import { IUser } from './user.model';

export interface IDoctor extends IUser {
  specialization: string;
  experience: number;
  availableTimeSlots: Date[];
  appointments: mongoose.Types.ObjectId[];
}

const DoctorSchema: Schema = new Schema({
  specialization: { type: String, required: true },
  experience: { type: Number, required: true },
  availableTimeSlots: [{ type: Date }],
  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }],
});

export default mongoose.models.Doctor || mongoose.model<IDoctor>('Doctor', DoctorSchema);
