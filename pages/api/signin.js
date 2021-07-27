import nc from "next-connect";
import middleware from '../../lib/mongodb';

const handler = nc()
    .use(middleware)
    .post((req, res) => {
        const body= req.body;
        req.db.collection('users').find({ email: body.name, password: body.pass }).toArray((err, result)=>{
            if (err) throw err;
            res.send(result);
        });
    })

export default handler;
