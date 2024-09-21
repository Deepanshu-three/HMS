import mongoose, { Schema, Document } from 'mongoose';


export interface IMedicalReport extends Document {
    patientId: mongoose.Types.ObjectId;
    doctorId: mongoose.Types.ObjectId;
    report: string;
    createdAt: Date;
  }
  
  const MedicalReportSchema: Schema = new Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    report: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  });
  
  export default mongoose.models.MedicalReport || mongoose.model<IMedicalReport>('MedicalReport', MedicalReportSchema);
  