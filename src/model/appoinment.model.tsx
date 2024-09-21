import mongoose, { Schema, Document } from 'mongoose';

export interface IAppointment extends Document {
    patientId: mongoose.Types.ObjectId;
    doctorId: mongoose.Types.ObjectId;
    time: Date;
    status: 'scheduled' | 'completed' | 'canceled';
    meetingLink: string;
  }
  
  const AppointmentSchema: Schema = new Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    time: { type: Date, required: true },
    status: { type: String, enum: ['scheduled', 'completed', 'canceled'], default: 'scheduled' },
    meetingLink: { type: String, required: false },
  });
  
  export default mongoose.models.Appointment || mongoose.model<IAppointment>('Appointment', AppointmentSchema);
  