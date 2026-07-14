const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://annet-paul:annet123@ac-rrnjxoo-shard-00-00.bcqym4j.mongodb.net:27017,ac-rrnjxoo-shard-00-01.bcqym4j.mongodb.net:27017,ac-rrnjxoo-shard-00-02.bcqym4j.mongodb.net:27017/petdb?ssl=true&replicaSet=atlas-stpu0i-shard-0&authSource=admin&appName=Cluster0").then(
    () => {
        console.log("mongodb connected")
    }
).catch(
    (error) => {
        console.log(error)
    }
)


const Pet=mongoose.model("Pets",new mongoose.Schema(
    {
        bookId: String,
        petName: String,
        petType: String,
        breed: String,
        age: String,
        weight: String,
        status: String,
        ownerName: String,
        ownerPhone: String,
        ownerEmail: String,
        inDate: String,
        outDate: String,
        kenNum: String
    }
))

app.post("/view-pet",async(req,res)=> {
    const pets=await Pet.find()
    res.json(pets);
});

app.post("/add-pet",async (req,res) => {
    await Pet.create(req.body)
    res.json({"status":"success"});
});

app.listen(3000, ()=> {
    console.log("server started")
});