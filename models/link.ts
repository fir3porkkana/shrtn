import mongoose from 'mongoose'
import { config } from '../common/config'

const connectDb = async () => {
  console.log('connecting to MongoDB')
  try {
    await mongoose.connect(config.mongo.uri)

    console.log('connected to MongoDB')
  } catch (error) {
    if (config.mongo.uri === 'placeholder') {
      console.log('database connection string not set')
    }
    console.log(`error connecting to MongoDB: ${error.message}`)
  }
}

connectDb()

const linkSchema = new mongoose.Schema({
  shortId: String,
  originalLink: String,
  clickCount: Number,
})

linkSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    return {
      shortId: returnedObject.shortId,
      originalLink: returnedObject.originalLink,
      clickCount: returnedObject.clickCount,
    }
  },
})

export const Link = mongoose.model('Link', linkSchema)
