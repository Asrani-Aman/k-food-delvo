import mongoose from 'mongoose';

const connectionString = "" + (process.env.MONGO_URI);

const connect = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(connectionString);
  }
};

export default connect;
