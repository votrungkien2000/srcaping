import express from "express";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'


const app = express();
app.use(express.json());
dotenv.config();

const PORT = process.env.PORT || 5000

const books = [
    {
        name: 'Kien',
        id: 1,
        author: 'abc'
    },
    {
        name: 'Vinh',
        id: 2,
        author: 'abc'
    },
    {
        name: 'Bao',
        id: 3,
        author: 'abc'
    }
]

app.get('/books',authenToken, (req, res) => {
    res.json({ status: 'success', data: books })
});
function authenToken(req, res, next){
    const authorizationHeader =  req.headers['authorization'];
    //Beaer Token
    const token = authorizationHeader.split(' ')[1];
    if(!token) res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,data)=>{
        console.log(err, data)
        if(err) res.sendStatus(403);
        next();
    })
}
app.listen(PORT, () => {
    console.log(`server is running on PORT ${PORT}`);
});