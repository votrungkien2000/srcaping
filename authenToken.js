import express from "express";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'


const app = express();
app.use(express.json());
dotenv.config();

const PORT = 5500;

let refreshTonkens= [];

app.post('/refreshToken', (req, res)=>{
    const refreshTonken = req.body.token;
    console.log(refreshTonken)
    if(!refreshTonken) res.sendStatus(401)
    if(!refreshTonkens.includes(refreshTonken)) res.sendStatus(403)

    jwt.verify(refreshTonken, process.env.REFRESH_TOKEN_SECRET, (err, data)=>{
        if(err) res.sendStatus(403)
        const access = jwt.sign({name: data.name}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '30s'})
        res.json({access})
    })
})

app.post('/login', (req, res) => {
    const data = req.body
    const access = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET
    , {expiresIn: '30s'}
    )
    const refreshTonken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET)
    refreshTonkens.push(refreshTonken)
    res.json({access, refreshTonken})
});
app.listen(PORT, () => {
    console.log(`server is running on PORT ${PORT}`);
});