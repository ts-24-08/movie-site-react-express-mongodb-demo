import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3000, () => {console.log('Server is running')});

// Get All IDs
app.get('/movies', (req, res) =>
{

})


// Get a Movie with ID

// Get all Actors

// Get All Regies

//Get all Script Writers

// Get all Genres

// Get Movies by FSK

// Get Movies bei Release Year

// Get Movies by rating

// Get Movies by Title;