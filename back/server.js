import fetch from "node-fetch"
import express from "express"
import cors from "cors"
import dotenv from 'dotenv';

dotenv.config();

const CLIENT_ID = process.env.CLIENT_ID;
const REDIRECT_URI = process.env.REDIRECT_URI;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const SERVER_URL = process.env.SERVER_URL;

const app = express();

app.use(cors());
app.use(express.json());
app.listen(3002, '192.168.0.108');


app.get('/login', (req, res) => {
    let auth_query_parameters = new URLSearchParams({
        response_type: "code",
        client_id: CLIENT_ID,
        scope: "user-library-read, playlist-read-private",
        redirect_uri: REDIRECT_URI
    })
    res.redirect("https://accounts.spotify.com/authorize?" + auth_query_parameters.toString())
})

app.get("/callback", async (req, res) => {
    const code = req.query.code;
    let body = new URLSearchParams({
        code,
        redirect_uri: REDIRECT_URI,
        grant_type: "authorization_code"
    })

    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "post",
        body,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Basic " + Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64")
        }
    })
    const data = await response.json();
    res.redirect(SERVER_URL + "auth=loggedIn/" + data.access_token);
})


const spotifyRequest = async (url, token) => {
    const response = await fetch(`${url}`, {
        method: "get",
        headers: {
            Authorization: "Bearer " + token
        }
    })
    return await response.json();
}

app.post("/getMyPlaylists", async (req, res) => {
    const {token} = req.body;
    const data = await spotifyRequest("https://api.spotify.com/v1/me/playlists", token)
    data.error ? res.send({error: {status: data.error.status, message: data.error.message}}) : res.send({data});
})

app.post("/playListTracks", async (req, res) => {
    const {url, token} = req.body;
    const data = await spotifyRequest(url, token);
    res.send({data})
})