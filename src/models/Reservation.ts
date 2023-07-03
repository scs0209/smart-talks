import mongoose, { Schema, Document, model } from 'mongoose'

export interface IPaymentInfo extends Document {
  amount: number
  method: string
  status: string
}

const PaymentInfoSchema: Schema = new Schema<IPaymentInfo>({
  amount: { type: Number, required: true },
  method: { type: String, required: true },
  status: { type: String, required: true },
})

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
  seat_info: { type: [Number], required: false },
  payment_info: { type: PaymentInfoSchema, required: false },
})

const Reservation: mongoose.Model<IReservation> =
  mongoose.models.Reservation ||
  model<IReservation>('Reservation', ReservationSchema)

export default Reservation
