const express = require('express')
const cors=require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port =  process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb://localhost:27017`;
//`mongodb+srv://twitter_admin:CQXrLHuJ7riqCxTZ@cluster0.hfahong.mongodb.net/?retryWrites=true&w=majority`;

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
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    //
    const postCollection=client.db('database').collection('posts');
    const userCollection=client.db('database').collection('users');
    //get
    app.get('/user', async (req, res) => {
      const user = await userCollection.find().toArray();
      res.send(user);
  })
  app.get('/loggedInUser', async (req, res) => {
      const email = req.query.email;
      const user = await userCollection.find({ email: email }).toArray();
      res.send(user);
  })
  app.get('/post', async (req, res) => {
      const post = (await postCollection.find().toArray()).reverse();
      res.send(post);
  })
  app.get('/userPost', async (req, res) => {
      const email = req.query.email;
      const post = (await postCollection.find({ email: email }).toArray()).reverse();
      res.send(post);
  })

  // post
  app.post('/register', async (req, res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user);
      res.send(result);
  })
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World! from twitter')
})

app.listen(port, () => {
  console.log(`twitter app listening on port ${port}`)
})