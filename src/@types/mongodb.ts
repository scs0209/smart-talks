import { Mongoose } from 'mongoose'

/* eslint-disable */

declare global {
  var mongoose: {
    promise: Promise<Mongoose> | null
    conn: Mongoose | null
  }
}
