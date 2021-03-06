import { MongoClient } from 'mongodb';
import nextConnect from 'next-connect';
const uri = process.env.MONGODB_URI;
const db = process.env.MONGODB_DB;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function database(req, res, next) {
  if (!client.isConnected()) await client.connect();
  req.dbClient = client;
  req.db = client.db(db);
  return next();
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;