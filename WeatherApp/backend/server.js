import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT;

//cors : this application can be accessbile by other domain/anyone.
app.use(cors());
// express.json() : automatically converts the coming req into json.
app.use(express.json());

const API_URL = "https://api.openweathermap.org/data/3.0/onecall";
//const lat = 52.2297;
//const lon = 21.0122; 
//const time = 1586468027;

app.get("/api/weather", async (req,res) => {
    const {lon, lat, dt } = req.query;
    if(!lon || !lat || !dt){
        console.log(lat , " ", lon, " ", dt )
       return res.status(400).json({error: 'latitude, longitude and time is required.'})
    }
    try{
      const result = await axios.get(API_URL+"/timemachine",{
      params: {
      lat: lat,
      lon: lon,
      dt: dt,
      appid: process.env.OW_API_KEY
    },
    });
    console.log(result.data);
    res.json(result.data);
}catch(error){
    res.status(error.status).json({error: error.message});
}
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});