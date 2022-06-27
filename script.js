const imageContainer=document.getElementById('image-container');
const loader=document.getElementById('loader');

let ready=false;
let imagesLoaded=0;
let totalImages=0;
let photosArray = [];

//Create Elements for links and photos

//Check if image is loaded
function imageLoaded()
{
    imagesLoaded++;
    if(imagesLoaded===totalImages)
    {
        ready=true;
        loader.hidden=true;
    }
}
//Helper Function to Set Attributes on DOM Elements
function setAttributes(element,attributes)
{
    for(const key in attributes)
    {
        element.setAttribute(key,attributes[key]);
    }
}

function displayPhotos()
{
    totalImages=photosArray.length;
    //Run function for each object in photosArray
    imagesLoaded=0;
    photosArray.forEach((photo)=>{
        const item=document.createElement('a');

        setAttributes(item,{
            href:photo.links.html,
            target : '_blank',
        });

        //Create <img> for photo

        const img=document.createElement('img');

        setAttributes(img,{
            src:photo.urls.regular,
            alt : photo.alt_description,
            title : photo.alt_description,
        });

        //Event listner to check when each img is finished loading

        img.addEventListener('load',imageLoaded);

        item.appendChild(img);
        imageContainer.appendChild(item);

    });
}

//Unsplash API

const count=10;
const apiKey='qQBjkYyPv7SoQHzsnKJsaOEilmOPUwvPBKBLurJRrII';
const apiUrl= `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


//Get Photos
async function getPhotos()
{
    try{
        const response=await fetch(apiUrl);
        photosArray=await response.json();
        displayPhotos();
    }catch(error)
    {

    }
}


//Check to see if scrolling near bottom of page, Load more Photos
window.addEventListener('scroll',()=>{
    if(window.innerHeight+window.scrollY>=document.body.offsetHeight-1000 && ready)
    {
        ready=false;
        getPhotos();
    }
})


//On load

getPhotos();


