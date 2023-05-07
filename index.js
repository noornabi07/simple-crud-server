const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(cors());

// noornabiprogram07
// IJHayV2t1ObuJ391


const uri = "mongodb+srv://noornabiprogram07:IJHayV2t1ObuJ391@cluster0.cnuoch3.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const database = client.db("usersDB");
    const userConnection = database.collection("users");

    app.get('/users', async(req, res) =>{
        const cursor = userConnection.find();
        const result = await cursor.toArray();
        res.send(result)
    })

    app.post('/users', async(req, res) =>{
        const user = req.body;
        console.log(user)
        const result = await userConnection.insertOne(user);
        res.send(result)
    })

    app.delete('/users/:id', async(req, res) =>{
        const id = req.params.id;
        console.log('This is delete from database:', id);
        const query = {_id: new ObjectId(id)};
        const result = await userConnection.deleteOne(query);
        res.send(result);

    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) =>{
    res.send('Simple Crud is running...')
})

app.listen(port, () =>{
    console.log(`Simple Crud Port is: ${port}`)
})



// try{

// }
// catch{

// }
// finally{

// }