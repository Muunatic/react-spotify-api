// © 2023 Muunatic. All rights reserved.

import { bearer } from './config';

/**
 * @module spotifyAPI
 * @author Muunatic
 * @version 0.2.0
 */
class spotifyAPI {

    /**
     * @type {string} - OAuth must be string type
     */
    protected OAuth: string;

    /**
     * @param {string} key - bearer key 
     */
    constructor(key: string) {
        this.OAuth = key;
    }

    /**
     * Get currently playing image
     * 
     * @async
     * @param {string} params - bearer key
     * @returns {string} image data
     */
    private async spotifyImage(params: string): Promise<string | void> {
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
     * Get currently playing name
     * 
     * @async
     * @param {string} params - bearer key
     * @returns {string} name data
     */
    private async spotifyName(params: string): Promise<string | void> {
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
     * Get currently playing artist
     * 
     * @async
     * @param {string} params - bearer key
     * @returns {string} artist data
     */
    private async spotifyArtist(params: string): Promise<string | void> {
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
     * Get currently playing album
     * 
     * @async
     * @param {string} params - bearer key
     * @returns {string} album data
     */
    private async spotifyAlbum(params: string): Promise<string | void> {
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
     * Is user currently playing?
     * 
     * @async
     * @param {string} params - bearer key
     * @returns {boolean} boolean
     */
    private async spotifyIsPlaying(params: string): Promise<boolean | void> {
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
            let isPlaying = document.getElementById("IsPlaying");
            let statusId = document.getElementById("spotifyuser");
            if (data.is_playing == true) {
                if (statusId.classList.contains("iconoffline")) {
                    statusId.classList.remove("iconoffline");
                    statusId.classList.add("icononline");
                }
                isPlaying.innerHTML = 'Now Playing';
                this.spotifyImage(params);
                this.spotifyName(params);
                this.spotifyArtist(params);
                this.spotifyAlbum(params);
                return console.log(data.is_playing);
            } else {
                if (statusId.classList.contains("icononline")) {
                    statusId.classList.remove("icononline");
                    statusId.classList.add("iconoffline");
                }
                isPlaying.innerHTML = 'Recently Played';
                this.spotifyImage(params);
                this.spotifyName(params);
                this.spotifyArtist(params);
                this.spotifyAlbum(params);
                return console.log(data.is_playing);
            }
        });
    }

    /**
     * Start App
     * 
     * @async
     * @returns {boolean} boolean
     */
    async start(): Promise<boolean | void> {
        setInterval(async () => {
            if (await this.spotifyIsPlaying(this.OAuth) == true) {
                this.spotifyImage(this.OAuth);
                this.spotifyName(this.OAuth);
                this.spotifyArtist(this.OAuth);
                this.spotifyAlbum(this.OAuth);
            } else {
                console.error('Failed to start!');
                return false;
            } 
        }, 5000);
    }

}

const api = new spotifyAPI(bearer);
api.start();