import mongoose, { Schema, Document } from 'mongoose';



export interface IOnlineMeeting extends Document {
    appointmentId: mongoose.Types.ObjectId;
    meetingLink: string;
    startTime: Date;
    endTime: Date;
    status: 'pending' | 'in-progress' | 'completed';
  }
  
  const OnlineMeetingSchema: Schema = new Schema({
    appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment', required: true },
    meetingLink: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
  });
  
  export default mongoose.models.OnlineMeeting || mongoose.model<IOnlineMeeting>('OnlineMeeting', OnlineMeetingSchema);
  