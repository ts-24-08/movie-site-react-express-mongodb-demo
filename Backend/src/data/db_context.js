import mongoose from 'mongoose';

import dotenv from 'dotenv'

dotenv.config();

//DB
const dbUrl = process.env.DB
mongoose.connect(dbUrl).then(() => {console.log('HI from DB')}) 

export const movieModel = () =>
{
    const movieSchema = new mongoose.Schema(
    {
        id:String,
        url:String,
        image:String,
        title:String,
        rating:Number,
        release:Number,
        fsk:Number,
        length:String,
        description:String,
        genres:[{type:String}],
        regie:[{type:String}],
        script:[{type:String}],
        actors:[{type:String}]
    });

    return mongoose.model('movies', movieSchema);
}