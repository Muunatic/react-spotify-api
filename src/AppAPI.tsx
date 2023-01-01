// © 2023 Muunatic. All rights reserved.

import { bearer } from './config';

/**
 * 
 * @param {string} params - bearer key
 * @returns {string} image data
 */
async function spotifyImage(params: string): Promise<string | void> {
    await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params
        }
    }).then((res) => {
        return res.json();
    }).then((data): Promise<string> => {
        let result = document.getElementById("Image") as HTMLImageElement | null;
        return result.src = data.item.album.images[0].url;
    });
}

/**
 * 
 * @param {string} params - bearer key
 * @returns {string} name data
 */
async function spotifyName(params: string): Promise<string | void> {
    await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params
        }
    }).then((res) => {
        return res.json();
    }).then((data): Promise<string> => {
        let nameid = document.getElementById("Name");
        let altdoc = document.getElementById("Image") as HTMLImageElement | null;
        altdoc.alt = data.item.name;
        return nameid.innerHTML = data.item.name;
    });
}

/**
 * 
 * @param {string} params - bearer key
 * @returns {string} artist data
 */
async function spotifyArtist(params: string): Promise<string | void> {
    await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params
        }
    }).then((res) => {
        return res.json();
    }).then((data) => {
        let nameid = document.getElementById("Artists");
        return nameid.innerHTML = 'by ' + data.item.artists[0].name;
    });
}

/**
 * 
 * @param {string} params - bearer key
 * @returns {string} album data
 */
async function spotifyAlbum(params: string): Promise<string | void> {
    await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params
        }
    }).then((res) => {
        return res.json();
    }).then((data) => {
        let nameid = document.getElementById("Album");
        return nameid.innerHTML = 'on ' + data.item.album.name;
    });
}

/**
 * 
 * @param {string} params - bearer key
 * @returns {boolean} boolean
 */
async function spotifyIsPlaying(): Promise<boolean | void> {
    await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + bearer
        }
    }).then((res) => {
        return res.json();
    }).then((data) => {
        let isPlaying = document.getElementById("IsPlaying");
        let statusId = document.getElementById("spotifyuser");
        if (data.is_playing == true) {
            if (statusId.classList.contains("iconoffline")) {
                statusId.classList.remove("iconoffline");
                statusId.classList.add("icononline");
            }
            isPlaying.innerHTML = 'Now Playing';
            spotifyImage(bearer);
            spotifyName(bearer);
            spotifyArtist(bearer);
            spotifyAlbum(bearer);
            return console.log(data.is_playing);
        } else {
            if (statusId.classList.contains("icononline")) {
                statusId.classList.remove("icononline");
                statusId.classList.add("iconoffline");
            }
            isPlaying.innerHTML = 'Recently Played';
            spotifyImage(bearer);
            spotifyName(bearer);
            spotifyArtist(bearer);
            spotifyAlbum(bearer);
            return console.log(data.is_playing);
        }
    });
}

setInterval(async () => {
    if (await spotifyIsPlaying() == true) {
        spotifyImage(bearer);
        spotifyName(bearer);
        spotifyArtist(bearer);
        spotifyAlbum(bearer);
    } else {
        return false;
    } 
}, 5000);