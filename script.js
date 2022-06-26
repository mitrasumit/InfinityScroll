const imageContainer=document.getElementById('image-container');
const loader=document.getElementById('loader');

let photosArray = [];

//Create Elements for links and photos

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
    //Run function for each object in photosArray

    photosArray.forEach((photo)=>{
        const item=document.createElement('a');
        // item.setAttribute('href',photo.links.html);
        // item.setAttribute('target','_blank');

        setAttributes(item,{
            href:photo.links.html,
            target : '_blank',
        });

        //Create <img> for photo

        const img=document.createElement('img');
        // img.setAttribute('src',photo.urls.regular);
        // img.setAttribute('alt',photo.alt_description);
        // img.setAttribute('title',photo.alt_description);

        setAttributes(img,{
            src:photo.urls.regular,
            alt : photo.alt_description,
            title : photo.alt_description,
        });

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


//On load

getPhotos();


