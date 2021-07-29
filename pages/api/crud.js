import nc from "next-connect";
import middleware from '../../lib/mongodb';
import { ObjectID } from 'mongodb';

const handler = nc()
    .use(middleware)
    .get(async (req, res) => {
        let { query } = req;
        if (query._id) {
            query._id = ObjectID(query._id);
        }
        req.db.collection('users').find(query).toArray((err, result) => {
            if (err) throw err;
            res.send(result);
        });
    })
    .post(async (req, res) => {
        let { body } = req;
        let date = new Date();
        let document = {
            "_id": new ObjectID(),
            "role": 'user',
            "root": false,
            "avatar": 'https://img-premium.flaticon.com/png/512/2202/premium/2202112.png?token=exp=1627308479~hmac=d18a9e8131be3d0cb0ab0459eb5e2e14',
            "name": body.name,
            "email": body.email,
            "password": body.pass,
            "createdAt": date,
            "updatedAt": date,
            "deletedAt": 0
        }
        let result = await req.db.collection('users').insertOne(document)
        res.send(result);
    })
    .put(async (req, res) => {
        let { body } = req;
        body.updatedAt = new Date();
        let _id = ObjectID(body._id);
        delete body._id;
        let result = await req.db.collection('users').updateOne({ _id }, { $set: body }, { upsert: true });
        res.send(result);
    })
    .delete(async (req, res) => {
        let _id = ObjectID(req.body._id);
        let result = await req.db.collection('users').deleteOne({ _id });
        res.send(result);
    });

export default handler;
