import mongoose from 'mongoose'
class Mongodb {
  private mongodbUrl: string = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.nfbcv.mongodb.net/${process.env.MONGODB_SCHEMA}?retryWrites=true&w=majority`

  constructor() {
    if (process.env.NODE_ENV === 'test') {
      mongoose.connection.close(function () {
        console.log('Mongoose connection disconnected')
      })
    } else {
      this.setupDb()
    }
  }

  private setupDb(): void {
    mongoose.connect(this.mongodbUrl)
    const db = mongoose.connection
    db.on('error', console.error.bind(console, 'MongoDB Connection error'))
  }
}

export default Mongodb
