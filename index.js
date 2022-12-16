const express = require("express");
const uuid = require("uuid");
const app = express();
app.use(express.json());
let movies = [{
    id: 1,
    title: "Inception",
    director: "Christophel nolan",
    release_date: "2022/05/12"
}, {
    id: 2,
    title: "Hum sath sath hai",
    director: "Uday chopra",
    release_date: "2022/06/12"
},
{
    id: 3,
    title: "Koi mil gaya",
    director: "Uday chopra",
    release_date: "2022/08/12"
},
{
    id: 4,
    title: "Uri",
    director: "Uday chopra",
    release_date: "2022/07/12"
}
]

//get the movie
app.get("/movie", (req, res) => {
    res.send(movies);
})

//add the movie to list
app.post("/movies", (req, res) => {
    let movie = req.body;
    console.log(req.body)
    let newMovie = {
        id: uuid.v4(),
        title: req.body.title,
        director: req.body.director,
        relese_date: req.body.release_date
    }
    movies.push(newMovie);
    res.json({msg:"movie added successfully"});
})

app.get("/movies/:id",(req,res)=>{
    let found = movies.some((movie)=>movie.id===req.params.id);
    if(found){
        let movie = movies.filter((movie)=>{
          return movie.id ===req.params.id;
        })
        res.json(movie);
    }else{
        res.sendStatus(400);
    }
})

app.delete("/movies/:id",(req,res)=>{
    let found = movies.some((movie)=>movie.id===parseInt(req.params.id));
    if(found){
        movies = movies.filter((movie)=>{
            return movie.id !==parseInt(req.params.id);
          })
          res.json({msg:"delete successfully"});
    }else{
        res.sendStatus(400).json({msg:"not found"});
    }
    
})
app.listen(3000, () => {
    console.log("server started on port 3000");
})