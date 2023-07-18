import mongoose, { Document, model, Schema } from 'mongoose'

export interface IPaymentInfo extends Document {
  imp_uid: string
  merchant_uid: string
  amount: number
  method: string
  status: string
  paid_at: number
  success: boolean
  error_msg?: string
}

export interface IReservation extends Document {
  user_id: mongoose.Schema.Types.ObjectId
  showtime_id: mongoose.Schema.Types.ObjectId
  seat_info?: number[]
  payment_info?: IPaymentInfo
}

const ReservationSchema: Schema = new Schema<IReservation>({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  showtime_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Showtime',
    required: true,
  },
  seat_info: { type: [Number], required: true },
  payment_info: {
    type: Object,
    required: true,
  },
})

const Reservation: mongoose.Model<IReservation> =
  mongoose.models.Reservation ||
  model<IReservation>('Reservation', ReservationSchema)

export default Reservation
