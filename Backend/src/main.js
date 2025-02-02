import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import { movieModel } from './data/db_context.js'

dotenv.config();

const model = movieModel();

const app = express();
app.use(express.json());
app.use(cors());

app.listen(process.env.PORT || 8000, () => {console.log('Server is running')});

// Get All IDs
app.get('/movies', async (req, res) =>
{
    const data = await model.find({}, ['id', '-_id']);
    res.status(200).send(data.map(x => x.id));
})

// Get a Movie with ID
app.get('/movies/:id', async (req, res) =>
{
    const data = await model.findOne({id:req.params.id}, ['-_id'])
    res.status(200).send(data)
})

//
app.get('/card/:id', async (req, res) =>
{
    const data = await model.findOne({}, ['-actors', '-script', '-regie', '-genres', '-_id'])
    res.status(200).send(data)
})

// Get all Actors
app.get('/actors', async (req, res) =>
{
    const data = await model.find({}, ['actors','-_id'])
    
    const actors = removeDoubles(data, 'actors');

    res.status(200).send(actors)
})

// Get All Regies
app.get('/regie', async (req, res) =>
{
    const data = await model.find({}, ['regie', '-_id'])
    
    const regie = removeDoubles(data, 'regie');
    
    res.status(200).send(regie)
})

//Get all Script Writers
app.get('/script', async (req, res) =>
{
    const data = await model.find({}, ['script','-_id'])
    
    const scripts = removeDoubles(data, 'script');
    
    res.status(200).send(scripts)
})

// Get all Genres
app.get('/genres', async (req, res) =>
{
    const data = await model.find({}, ['genres','-_id'])
    
    const genres = removeDoubles(data, 'genres');
    
    res.status(200).send(genres)
})


const removeDoubles = (data, param) => 
{
    const map = new Map();
    const noDoubles = []

    for(const d of data.flatMap(x => x[`${param}`]))
    {
        map.set(d,d)
    }


    map.values().forEach(x => {
        noDoubles.push(x)
    });

    return noDoubles.sort();
}