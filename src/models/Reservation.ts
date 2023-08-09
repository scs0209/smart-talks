import mongoose, { Document, model, Schema } from 'mongoose'
import User from './User'
import Showtime from './Showtime'

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
  user: mongoose.Schema.Types.ObjectId
  showtime: mongoose.Schema.Types.ObjectId
  seatInfo: number[]
  paymentInfo?: IPaymentInfo
}

const ReservationSchema: Schema = new Schema<IReservation>({
  user: { type: mongoose.Types.ObjectId, ref: User, required: true },
  showtime: { type: mongoose.Types.ObjectId, ref: Showtime, required: true },
  seatInfo: { type: [Number], required: true },
  paymentInfo: {
    type: Object,
    required: true,
  },
})

const Reservation: mongoose.Model<IReservation> =
  mongoose.models.Reservation ||
  model<IReservation>('Reservation', ReservationSchema)

export default Reservation
