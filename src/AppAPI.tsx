// © 2023 Muunatic. All rights reserved.

import { bearer } from './config';
import { dataInterface } from './interface';

/**
 * @module AppAPI
 * @author Muunatic
 * @version 0.2.0
 */
class AppAPI {

    /**
     * @protected
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
     * @private
     * @async
     * @param {string} params - bearer key
     * @returns {Promise<string | void>} image data
     */
    private async spotifyImage(params: string): Promise<string | void> {
        return await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + params
            }
        }).then((res) => {
            return res.json();
        }).then((data: dataInterface): string | void => {
            if (data.item == null) {
                return;
            } else {
                const imgid = document.getElementById("Image") as HTMLImageElement;
                const result = data.item.album.images[0].url;
                if (result == imgid.src) {
                    return;
                } else if (result != imgid.src) {
                    return imgid.src = result;
                }
            }
        });
    }

    /**
     * Get currently playing name
     * 
     * @private
     * @async
     * @param {string} params - bearer key
     * @returns {Promise<string | void>} name data
     */
    private async spotifyName(params: string): Promise<string | void> {
        return await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + params
            }
        }).then((res) => {
            return res.json();
        }).then((data: dataInterface): string | void => {
            if (data.item == null) {
                return;
            } else {
                const nameid = document.getElementById("Name") as HTMLElement;
                const altdoc = document.getElementById("Image") as HTMLImageElement;
                const result = data.item.name;
                if (result == nameid.innerHTML) {
                    return;
                } else if (result != nameid.innerHTML) {
                    altdoc.alt = result;
                    return nameid.innerHTML = result;
                }
            }
        });
    }

    /**
     * Get currently playing artist
     * 
     * @private
     * @async
     * @param {string} params - bearer key
     * @returns {Promise<string | void>} artist data
     */
    private async spotifyArtist(params: string): Promise<string | void> {
        return await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + params
            }
        }).then((res) => {
            return res.json();
        }).then((data: dataInterface): string | void => {
            if (data.item == null) {
                return;
            } else {
                const artistid = document.getElementById("Artists") as HTMLElement;
                const result = 'by ' + data.item.artists[0].name;
                if (result == artistid.innerHTML) {
                    return;
                } else if (result != artistid.innerHTML) {
                    return artistid.innerHTML = result;
                }
            }
        });
    }

    /**
     * Get currently playing album
     * 
     * @private
     * @async
     * @param {string} params - bearer key
     * @returns {Promise<string | void>} album data
     */
    private async spotifyAlbum(params: string): Promise<string | void> {
        return await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + params
            }
        }).then((res) => {
            return res.json();
        }).then((data: dataInterface): string | void => {
            if (data.item == null) {
                return;
            } else {
                const nameid = document.getElementById("Album") as HTMLElement;
                const result = 'on ' + data.item.album.name;
                if (result == nameid.innerHTML) {
                    return;
                } else if (result != nameid.innerHTML) {
                    return nameid.innerHTML = result;
                }
            }
        });
    }

    /**
     * Is user currently playing?
     * 
     * @private
     * @async
     * @param {string} params - bearer key
     * @returns {Promise<boolean | null | undefined>} boolean data
     */
    private async spotifyIsPlaying(params: string): Promise<boolean | null | undefined> {
        return await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + params
            }
        }).then((res) => {
            return res.json();
        }).then((data: dataInterface): boolean | null | undefined => {
            if (data.item == null) {
                return null;
            } else {
                const isPlaying = document.getElementById("IsPlaying") as HTMLElement;
                const statusId = document.getElementById("spotifyuser") as HTMLElement;
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
                    return true;
                } else if (data.is_playing == false) {
                    if (statusId.classList.contains("icononline")) {
                        statusId.classList.remove("icononline");
                        statusId.classList.add("iconoffline");
                    }
                    isPlaying.innerHTML = 'Recently Played';
                    this.spotifyImage(params);
                    this.spotifyName(params);
                    this.spotifyArtist(params);
                    this.spotifyAlbum(params);
                    return false;
                }
            }
        });
    }

    /**
     * Start App
     * 
     * @public
     * @async
     * @returns {Promise<void>} get data
     */
    public async start(): Promise<void> {
        if (await this.spotifyIsPlaying(this.OAuth) == true) {
            return console.log('Start');
        } else if (await this.spotifyIsPlaying(this.OAuth) == false) {
            return console.error('Failed to start!');
        } 
    }

    /**
     * Update Data
     * 
     * @public
     * @async
     * @returns {Promise<void>} update data
     */
    public async update(): Promise<void> {
        if (await this.spotifyIsPlaying(this.OAuth) == true) {
            return console.log('Data updated');
        } else if (await this.spotifyIsPlaying(this.OAuth) == false) {
            return console.error('Failed to update data!');
        } 
    }
}

const api = new AppAPI(bearer);
api.start().then(async () => {
    setInterval(() => {
        api.update();
    }, 5000);
});
