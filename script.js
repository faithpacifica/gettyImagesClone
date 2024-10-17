
'use strict';

const auth = 'tBJImcd6MCRolQYpH1igugryDsVuXZvHUMglXHeqMVuA12TGjREVzuBO';
const gallery = document.querySelector('.gallery')
const searchInput = document.querySelector('.search-input');
const form = document.querySelector('.search-form');
let fetchLink;
let searchValue;
let page = 1;
const more = document.querySelector('.more')
let currentSearch;

// EventListeners
searchInput.addEventListener('input', updateInput);
form.addEventListener('submit', (e) => {
    e.preventDefault();
    currentSearch = searchValue;
    searchPhotos(searchValue)
});
more.addEventListener('click', loadMore)

// Update Search Input
function updateInput(e) {
    searchValue = e.target.value;
}

// Fetch API
async function fetchApi(url) {
    const dataFetch = await fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: auth,
        }
    })
    const data = await dataFetch.json();
    return data;
}

// Generate photos
function generatePics(data) {
    data.photos.forEach((photo) => {
        const galleryImage = document.createElement('div');
        galleryImage.classList.add('gallery-img')
        galleryImage.innerHTML = `
    <div class='gallery-info'>
        <div class="gallery-info__header">
         <p>${photo.photographer}</p>
         <a href="${photo.src.large}" target="_blank">Download</a>  
       </div>
  
    <img src="${photo.src.large}"></img>
    </div>
    `;
        gallery.appendChild(galleryImage);
    })
}

// Curated Photos
async function curatedPhotos() {
    fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1";
    const data = await fetchApi(fetchLink);
    generatePics(data)
}

curatedPhotos();

function clearSearch() {
    gallery.innerHTML = ''
    searchInput.innerHTML = ''
}


// Search Photos
async function searchPhotos(query) {
    clearSearch();
    fetchLink = `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`;
    const data = await fetchApi(fetchLink);
    generatePics(data);
}

// Load More Photos
async function loadMore() {
    page++;
    if (currentSearch) {
        fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=15&page=${page}`
    } else {
        fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`
        }

        const data = await fetchApi(fetchLink)
        generatePics(data);
    }