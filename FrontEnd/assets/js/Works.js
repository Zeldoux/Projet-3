import { deleteWork } from "./delete.js";
import {filterOnlyObject} from "./filter.js";
import {filterOnlyApart} from "./filter.js";
import {filterOnlyHotel} from "./filter.js";
 /* import Filter.js to retrieve all filter function */

/* API URL */
const apiUrl = "http://localhost:5678/api/works";

/* function to retrieve API data works with GET */
async function fetchWorks(){

    /* use of try/catch statement to prevent error and have a debug about it *optional* */
    try {
        const response = await fetch(apiUrl);

    /* check if response is retrieved otherwise it give an error with the response.status */
        if (!response.ok) {
            /* the throw statement throws a user-defined exception .*/
            throw new Error(`HTTP error! status: ${response.status}`);
            /* Execution of the current function will stop and control is passed to the first catch block */
        }

        /* get Json Data from work */
        const works = await response.json();

        /* return works from response*/
        return works;

    /* if try {} throw an exception the code in catch block is executed */
    } catch (error) {
        console.error("error while retreving works data");
        return [];
    }

}

/* const for modal gallery display update */
const gallerylist = document.querySelector(".gallery");
const modallist = document.querySelector(".modal-gallery");

/* put API data into HTML element */
async function displayData(works , container){

    /*select element to remove actual work */

    /* remove already present HTML work */
    container.innerHTML = "";

    /* loop for to take each work inside works json */
    for (let i = 0 ; i < works.length; i++) { /* potential use of Foreach possible ?*/


        /* create html element for each retrieved works */
        const worksFigure = document.createElement("figure");
        
        worksFigure.setAttribute("data-id", works[i].id); // Set the data-id attribute
        
        /* append child worksImg to worksFigure to correspond to the HTML form */
        const worksImg = document.createElement("img");
        worksImg.src = works[i].imageUrl;
        worksImg.alt = works[i].title; /**/
        worksFigure.appendChild(worksImg);


        /* create delete trash  icons to delete works only in modal */
        if (container.classList.contains("modal-gallery")){
            const icon = document.createElement("span");
            /* add into it the html code */
            icon.innerHTML = '<button class="modal-deletebtn" id="delete-btn" action="#" method="DELETE"><i class="fa-solid fa-trash-can"></i></button>'
            worksFigure.appendChild(icon)
            /* event listener to set up delete function on delete btn */
            icon.querySelector(".modal-deletebtn").addEventListener("click", async function(event){
                await deleteWork(event); // Call deleteWork and await its completion
                await fetchAndDisplayWorks(modallist); // Refresh modal content after deletion
                await fetchAndDisplayWorks(gallerylist); // refresh main gallery content after deletion
            })
        }


        /* check if container is class = gallery if so it add figcaption */
        if (container.classList.contains("gallery")) {
        /* append child worksFigcap to worksFigure to fit to the actual HTML*/
        const worksFigcap = document.createElement("figcaption");
        worksFigcap.textContent = works[i].title;
        worksFigure.appendChild(worksFigcap);

        /* put back in gallery works elements retrieved from API */

        }
        /* container is the actual document we want to add this to */
        container.appendChild(worksFigure)

        console.log('Added figure:', worksFigure);
    }

}


/* retrieve filter  button */
const filterObject = document.getElementById("Objets-filter");
const filterAll = document.getElementById("Tous-filter");
const filterApart = document.getElementById("Appartements-filter");
const filterHotel = document.getElementById("Hotelrestau-filter")



/* function to call the fletch and display the work */
export async function fetchAndDisplayWorks(container) {
    /* take works data from API with function fetchWorks */
    const works = await fetchWorks();

    /* display data from API with function displayData */
    displayData(works,container);

    /* event listener to start filter "object only" option on click */
    filterObject.addEventListener("click", async function() {

        /* call specific filter function to the new variable filteredWork */ 
        const filteredWork = await filterOnlyObject(works);

        /* change color on click to sim focus effect */
        filterObject.style.color = "white";
        filterObject.style.backgroundColor="#1D6154";

        /* set other filter to default style (not focus) */ 
        filterApart.style.color = "";
        filterApart.style.backgroundColor="";
        filterHotel.style.color = "";
        filterHotel.style.backgroundColor="";
        filterAll.style.color = "";
        filterAll.style.backgroundColor="";

        /* console.log to check what filterOnlyObject() return */
        console.log("filteredwork :", filteredWork);

        /* call function to display filtered work */
        displayData(filteredWork,container);
        
    });

    /* event listener to start filter "Apart only" option on click */
    filterApart.addEventListener("click", async function() {
        const filteredWork = await filterOnlyApart(works);

        /* change color on click to sim focus effect */
        filterApart.style.color = "white";
        filterApart.style.backgroundColor="#1D6154";

        /* set other filter to default style (not focus) */ 
        filterObject.style.color = "";
        filterObject.style.backgroundColor="";
        filterHotel.style.color = "";
        filterHotel.style.backgroundColor="";
        filterAll.style.color = "";
        filterAll.style.backgroundColor="";
        console.log("filteredwork :", filteredWork);
        displayData(filteredWork,container);
        
    });

    /* event listener to start filter "Hotel only" option on click */
    filterHotel.addEventListener("click", async function() {
        const filteredWork = await filterOnlyHotel(works);
        /* change color on click to sim focus effect */
        filterHotel.style.color = "white";
        filterHotel.style.backgroundColor="#1D6154";

        /* set other filter to default style (not focus) */ 
        filterObject.style.color = "";
        filterObject.style.backgroundColor="";
        filterApart.style.color = "";
        filterApart.style.backgroundColor="";
        filterAll.style.color = "";
        filterAll.style.backgroundColor="";

        console.log("filteredwork :", filteredWork);
        displayData(filteredWork,container);
        console.log("filteredwork :", filteredWork);
        displayData(filteredWork,container);
        
    });

    /* event listener to launch filter all option on click */
    filterAll.addEventListener("click" ,function() {
        displayData(works,container);
        filterAll.style.color = "white";
        filterAll.style.backgroundColor="#1D6154";

        /* set other filter to default style (not focus) */ 
        filterObject.style.color = "";
        filterObject.style.backgroundColor="";
        filterApart.style.color = "";
        filterApart.style.backgroundColor="";
        filterHotel.style.color = "";
        filterHotel.style.backgroundColor="";
    })
}




