
import { API } from "./scripts/api.js"
import { ele,renderCards,renderPlayingInfo,renderLoader } from "./scripts/ui.js"


//class ın bir örneğini oluşturma
const api = new API();

document.addEventListener("DOMContentLoaded", async() => {
    await api.getPopular();
    renderCards(api.songs);
});


// müzik listesindeki tıklanma olaylarını izleme
ele.list.addEventListener("click",(e)=>{
    if(e.target.id=== "play-btn"){
        // oynat butonuna en yakın olan .card classına erişme
        const parent = e.target.closest(".card");
        // müziğin bilgilerini ekrana basma
        renderPlayingInfo(parent.dataset);
    }
});

// arama formu gönderildiğinde
ele.searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // aratılan terime erişme
    const query = e.target[0].value;
  
    // form boşsa fonk. dururma
    if (!query) return;
  
    // ekrana loadin basma
    renderLoader();
  
    // başlığı güncelleme
    ele.title.innerHTML = `${query} İçin Sonuçlar`;
  
    // api'den şarkıları alma
    api.searchMusic(query);
  });