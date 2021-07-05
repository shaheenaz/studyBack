'use strict'
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());

app.get('/all',homeHandler )
app.post('/addFav',addFavHamdler)
app.get('/getFav',getFavHandler)
app.delete('/deleteFav',deleteHandler)
app.put('/updateFav',updateFavHandler)

const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/study', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect(process.env.MONGODBURL, {useNewUrlParser: true, useUnifiedTopology: true});

const favSchema = new mongoose.Schema({
    name: String,
    url : String,
  });

  const favModal = mongoose.model('fav', favSchema);


 





function homeHandler (req,res){
    const url = `https://pokeapi.co/api/v2/pokemon`
    axios
    .get(url)
    .then(ret=>{
        res.send(ret.data.results)
    })
}

function addFavHamdler (req,res){
const {name,url} = req.body // عسان عملت  باس لاوبجكت فبدي الاوبجكت بدي
const picked = new favModal({
    name : name,
    url :url,
})

picked.save()


}



function getFavHandler (req,res){
   favModal.find({},(err,date)=>{
        res.send(date)
    })
}

function deleteHandler (req,res){
    const id = req.query.id // عشان عملت باس لبارميتر
    favModal.deleteOne({_id :id},(err,date)=>{ // هون بمسح وحدة اللي الها الاي دي
        favModal.find({},(err,date)=>{
            res.send(date) // هون برجع بعطيه المعلومات بعد الحذف
        })
    })
}


function updateFavHandler (req,res){
    const {name,url,id} = req.body
    console.log(req.body)
    favModal.find({_id :id},(err,data)=>{
        data[0].name=name
        data[0].url=url
        data[0].save() 
        .then(()=>{
            favModal.find({},(err,date)=>{
                res.send(date) // هون برجع بعطيه المعلومات بعد الحذف
            })  
        })
        
        


    })
}


app.listen(PORT ,() => {console.log('hi')})








