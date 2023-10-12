import {url,options} from "./constants.js";
import { renderCards } from './ui.js';

// API İşlemleri
export class API {
    constructor(){
        this.songs = [];
    }

    // Popüler müzikler için istek atma
    async getPopular(){
        try{
            // API isteği atar
            const res = await fetch(url,options);
            const data = await res.json();
            // class ta tuttuğumuz değşikeni günceller
            this.songs = data.tracks;
        } catch(err){
            console.log("veirleri alırken hata oluştu",err);
        }
    }

     // aratılan içeriğe erişme
    async searchMusic(query) {
    const res = await fetch(
      `https://shazam.p.rapidapi.com/search?term=${query}&locale=TR&offset=0&limit=20`,
      options
    );

    const data = await res.json();

    // bize gelen diziyi işliyicez
    // objelerin içerisindeki track katmanını aradan kaldırıcac
    const newData = data.tracks.hits.map((song) => ({
      ...song.track,
    }));

    // müzikleri ekrana basma
    renderCards(newData);
    }

};