import fetch from "node-fetch"
import express from "express"
import cors from "cors"
import dotenv from 'dotenv';

dotenv.config();

const CLIENT_ID = process.env.CLIENT_ID;
const REDIRECT_URI = process.env.REDIRECT_URI;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const SERVER_URL = process.env.SERVER_URL;
const PORT = process.env.PORT || 3002;

const app = express();

app.use(cors());
app.use(express.json());
app.listen(PORT, () => {
    console.log(`app is running on ${PORT}`)
} )

app.get('/login', (req, res) => {
    let auth_query_parameters = new URLSearchParams({
        response_type: "code",
        client_id: CLIENT_ID,
        scope: "user-library-read, user-read-email, user-read-private, user-top-read, playlist-read-private, playlist-modify-private, playlist-modify-public",
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
const spotifyPostRequest = async (url, data, token) => {
    const response = await fetch(`${url}`, {
        method: "POST",
        headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    return await response.json();
}
app.post("/getMyPlaylists", async (req, res) => {
    const {token} = req.body;
    const data = await spotifyRequest("https://api.spotify.com/v1/me/playlists?limit=50&offset=0", token)
    const dataUser = await spotifyRequest(`https://api.spotify.com/v1/me`, token);
    (data.error || dataUser.error) ? res.send({
        error: {
            status: data.error.status,
            message: data.error.message
        }
    }) : res.send({data, user: dataUser});
})
app.post("/getMyTopArtists", async (req, res) => {
    const {token} = req.body;
    const data = await spotifyRequest("https://api.spotify.com/v1/me/top/artists?limit=5", token)
    data.error ? res.send({error: {status: data.error.status, message: data.error.message}}) : res.send({data});
})
app.post("/playListTracks", async (req, res) => {
    const {url, token} = req.body;
    const data = await spotifyRequest(url, token);
    data.error ? res.send({error: {status: data.error.status, message: data.error.message}}) : res.send({data});
})
app.post("/getTracksInfo", async (req, res) => {
    const {url, token} = req.body;
    const data = await spotifyRequest(url, token);
    data.error ? res.send({error: {status: data.error.status, message: data.error.message}}) : res.send({data});
})
app.post("/search", async (req, res) => {
    const {query, category, token} = req.body;
    const data = await spotifyRequest(`https://api.spotify.com/v1/search?q=${query}&type=${category}`, token);
    data.error ? res.send({error: {status: data.error.status, message: data.error.message}}) : res.send({data});
})
app.post("/nextPage", async (req, res) => {
    const {url, token} = req.body;
    const data = await spotifyRequest(url, token);
    data.error ? res.send({error: {status: data.error.status, message: data.error.message}}) : res.send({data});
})
app.post("/prevPage", async (req, res) => {
    const {url, token} = req.body;
    const data = await spotifyRequest(url, token);
    data.error ? res.send({error: {status: data.error.status, message: data.error.message}}) : res.send({data});
})
app.post("/getArtistAlbums", async (req, res) => {
    const {id, token} = req.body;
    const data = await spotifyRequest(`https://api.spotify.com/v1/artists/${id}/albums?include_groups=album`, token);
    const dataArtist = await spotifyRequest(`https://api.spotify.com/v1/artists/${id}`, token);
    (data.error || dataArtist.error) ? res.send({
        error: {
            status: data.error.status,
            message: data.error.message
        }
    }) : res.send({data, artist: dataArtist});
})
app.post("/getArtist", async (req, res) => {
    const {id, token} = req.body;
    const data = await spotifyRequest(`https://api.spotify.com/v1/artists/${id}`, token);
    data.error ? res.send({error: {status: data.error.status, message: data.error.message}}) : res.send({data});
})
app.post("/getRelatedArtists", async (req, res) => {
    const {id, token} = req.body;
    const data = await spotifyRequest(`https://api.spotify.com/v1/artists/${id}/related-artists`, token);
    data.error ? res.send({error: {status: data.error.status, message: data.error.message}}) : res.send({data});
})
app.post("/getAlbumOrPlaylist", async (req, res) => {
    const {url, token} = req.body;
    const data = await spotifyRequest(url, token);
    data.error ? res.send({error: {status: data.error.status, message: data.error.message}}) : res.send({data});
})
app.post("/createPlaylist", async (req, res) => {
    const {id, token} = req.body;
    const data = await spotifyPostRequest(`https://api.spotify.com/v1/users/${id}/playlists`, req.body.data, token);
    data.error ? res.send({error: {status: data.error.status, message: data.error.message}}) : res.send({data});
})
app.post("/getTracks", async (req, res) => {
    const {url, token} = req.body;
    const data = await spotifyRequest(url, token);
    data.error ? res.send({error: {status: data.error.status, message: data.error.message}}) : res.send({data});
})
app.post("/addItemsToPlaylist", async (req, res) => {
    const {id, url, token} = req.body;
    const data = await spotifyPostRequest(url, req.body.data, token);
    data.error ? res.send({error: {status: data.error.status, message: data.error.message}}) : res.send({data});
})
