import {addWork} from "./addworks.js"; // import of function Delete from delete.js
import {fetchAndDisplayWorks} from "./Works.js"; // import of function Delete from delete.js

/************* CONSTANT FOR SELECTOR ****************/

/* get login button id */
const loginButton = document.getElementById("loginbtn");

/* get token from localstorage */
let token = window.localStorage.getItem("token")
console.log("Token on page load:", token);  // Debugging

/* const for modal window id */
const modalWindow = document.getElementById("modal1");
const modalGallery = document.getElementById("modallist");
const modalAddWindow = document.getElementById("modaladd");

/* const of the container of the gallerylist */
const gallerylist = document.querySelector(".gallery");
const modallist = document.querySelector(".modal-gallery");

/* call of the function fetchanddisplayworks by default  */    
fetchAndDisplayWorks(gallerylist);

/* check if token exist*/
if (token) {
    /* if true then start loggedinstate function */
    loggedInState(token);   
}


/************** FUNCTION PART ***************/


/* Function to handle logged-in state */
function loggedInState(token) {
    /* if not to check token */
    if (!token) {
        return;  // Exit the function if no token is found
        
    }
    /* debug print to see token */
    console.log("logged in with token " , token );

    /* load login/logout button to change it */
    loginButton.innerText = "Logout";

    /****** DISPLAY MODAL PART ******/
    
    /* create new header above the navbar*/
    const newHeader = document.createElement("div");
    newHeader.classList.add("logged-in-header");
    /* add into it the icons and the text */
    newHeader.innerHTML = '<span><button id="showmodal" class="modal-showbtn nostyle-btn"><i class="fa-regular fa-pen-to-square"></i>Mode édition</button></span>'
    /* insert the new header into the body element before the first child (header) */
    document.body.insertBefore(newHeader, document.body.firstChild);

    /* modify header margin */
    const header = document.querySelector("header");
    header.style.margin = "80px 0";


    /**** PORTFOLLIO OF MODAL ****/

    /* get portfollio to add the new span and modify gallery style */
    const projectIcon = document.querySelector("#portfolio");
    /* get gallery to modify style */
    const gallery = document.querySelector(".gallery");

    /* create a button to be added to the portfollio */
    const icon = document.createElement("span");
    /* add into it the html code */
    icon.innerHTML = '<button id="showmodal" class="modal-showbtn nostyle-btn"><i class="fa-regular fa-pen-to-square"></i>modifier</button>'

    /* insert the new icon span into portfollio before first child (h2)*/
    projectIcon.insertBefore(icon , projectIcon.firstElementChild);
    /* modify gallery margin */
    gallery.style.margin = "3rem 0 0 0";


    /* hide filter selection */
    const filter = document.querySelector(".filter");
    filter.style.display = "none";

    /* add event listener to the button to display modal */
    const modalBtn = document.querySelectorAll(".modal-showbtn");
    /* get the two modal btn and add event listener to display modal on click */
    modalBtn.forEach(buttons => {
        buttons.addEventListener("click",showModal);

    });
    
}

/* function to handle logout */
function logout(){
    /* remove from localstorage "token" */
    window.localStorage.removeItem("token");
    token = null;
    /* set window location to index.html */
    window.location.href = "./index.html";
    window.location.reload()
    /* debug loggin */
    console.log("logged out");
}
/* function to display login Window/page*/
function loginWindow() {    
    window.location.href = "./login.html";
}



async function showModal(){
    await fetchAndDisplayWorks(modallist);
    /* set display to flex */
    modalWindow.style.display = "flex";

    modalGallery.style.display="flex";

    /* add eventlistener on the quit button */
    const quitBtn = document.getElementById("modal-quit");
    quitBtn.addEventListener("click",function() {
        modalWindow.style.display = "none";
        modalGallery.style.display = "none";

    });

    /* get add Img Window id and display it if addbutton is click */
    const modalAddBtn = document.getElementById("modal-addbtn");

    /* display add img window by calling function on event listener */
    modalAddBtn.addEventListener("click",displayAddWindow);
    // close the modal window when click outside of it 
    document.addEventListener("click",function(event) {
        if (modalWindow.style.display === "none"){
            return; // Skip if window is already hidden
        }
        /* hide modal window if click outside of it */
        if (event.target === modalWindow){
            quitModal();
        } 
    });       

}


/*function to display uploaded img */
function previewFile(){
    const oldimg = document.querySelector(".uploaded-image");
    if (oldimg){
        oldimg.remove();
    }
    /* const of img uploaded and display output */
    const input = document.getElementById("image_uploads");
    console.log(input);
    /* get input type=file content and store it in a const curFiles */
    const curFiles = input.files;
    for (const file of curFiles) {
        output.innerHTML = ''; // Clear previous images
        const image = document.createElement("img");
        image.src = URL.createObjectURL(file);
        image.alt = image.title = input.name;
        image.classList.add("uploaded-image"); // Add a class for styling

        /* get all element of the addwindow */
        const container = document.querySelector(".modal-addwindow_addimg");
        /* get all children element of addwindow */
        const containerchildren = container.children
        console.log(container.children)
        /* loop to set all element to hide */
        for (let e = 0 ; e < containerchildren.length; e++){
            containerchildren[e].style.display = "none";
        }
        
        /* add image element to be displayed */
        container.appendChild(image);

    }
}

/* function to display the add img window */
function displayAddWindow(){
    /*reset form when addwindow is displayed */

    resetForm()
    /*set submit button disabled by default */
    /* const to handle disabled/enabled effect of submit */
    const validationBtn = document.getElementById("addimgrequest");
    /*set submit button disabled by default */
    validationBtn.disabled = "true";
    validationBtn.style.backgroundColor = "#A7A7A7";

    /* const to be added to an array to add eventlistener */
    const title = document.getElementById("add_title");
    const category = document.getElementById("category");
    const fileinput = document.getElementById("image_uploads");
    
    /* put all input in a array to be used with ForEach() */
    const input =[ title, category, fileinput];
    /* give all input eventlistener "change" */
    input.forEach((element) => {
        /* remove previous event listener to avoid duplicated */
        element.removeEventListener("change",handleInputChange)
        /* add event listener after removing potential duplicate */
        element.addEventListener("change", handleInputChange)
        
    });

    /* modal add window display part */

    modalGallery.style.display = "none";
    modalAddWindow.style.display = "flex";
    
    const modalReturnBtn = document.getElementById("modal-return");


    /* set up return btn to gallery with event listener*/
    modalReturnBtn.addEventListener("click",function(){
        modalAddWindow.style.display ="none";
        modalGallery.style.display ="flex";
    });


    /* set up quit btn */
    const quitBtn = document.getElementById("modaladd-quit");
    quitBtn.addEventListener("click",quitModal);
 
    const submitWork = document.getElementById("modal_postreq");
    /* remove previous event listener to avoid duplicate */
    submitWork.removeEventListener("submit", handleSubmit);

    /* event listener to start addwork function and refresh list display */
    submitWork.addEventListener("submit", handleSubmit);

}

/* function to reset form */
function resetForm(){
    /* reset form if window closed */
    const form = document.getElementById("modal_postreq")
    console.log("modaladd window closed reset : ", form);
    form.reset();
    /* Clear file input (input[type=file] doesn't reset via form.reset()) */
    const fileInput = document.getElementById("image_uploads");
    fileInput.value = "";
    console.log("form reset : ", form);

    /*reset form window display */

    /* get addwindow element */
    const container = document.querySelector(".modal-addwindow_addimg");
    /* get all children element of addwindow */
    const containerChildren = container.children
    console.log(container.children)
    /* get image element displayed */
    const image = document.querySelector(".uploaded-image");
    /* remove image element to be displayed */
    if (image) {
        console.log("img before removing it ",image);
        image.remove();
    }
    /* loop to set all element to be visible again */
    for (let e = 0 ; e < containerChildren.length; e++){
        containerChildren[e].style.display = "flex";
    }
    const previousError = document.querySelector(".error_alert");
    if (previousError){
        previousError.remove();
    }

}

/********* EVENT LISTENER PART  **********/

/* set eventlistener to button id */
loginButton.addEventListener("click" , function() {
    if (token) {
        logout();
    } else {
        loginWindow();
    }
});


/* function to submit work */
async function handleSubmit(event){
    event.preventDefault();
    /* Calls the addWork function, passing an async callback function as an argument */
    addWork(event, async () => { // Inside the callback function
        /* set callback function of addwork */
        await fetchAndDisplayWorks(gallerylist);
        await fetchAndDisplayWorks(modallist);
        quitModal();
    })
}




function handleInputChange(){
    /* const to handle disabled/enabled effect of submit */
    
    const validationBtn = document.getElementById("addimgrequest");
    /* const to be check for validationbtn enable/disable */
    const title = document.getElementById("add_title");
    const category = document.getElementById("category");
    const fileinput = document.getElementById("image_uploads");


    /* Check if each input is filled */
    if (title.value && category.value && fileinput.files.length > 0) {
        console.log("nothing empty");
        /* if they are change background color and set disabled to false */
        validationBtn.style.backgroundColor ="#1D6154"
        validationBtn.disabled = false;
        
    } else {
        /* if one of them is empty set disabled to true */
        console.log("something is empty");
        validationBtn.style.backgroundColor = "#A7A7A7";
        validationBtn.disabled = true;
    };

    /* const to get file size */
    const file = fileinput.files[0];
    /* set up max file size */
    const maxSize = 4 * 1024 * 1024 ; // 4MB 
    console.log("max size " ,maxSize);
    console.log("file :", file)

    /* get old img uploaded to avoid reload of img if already set up */
    const uploadedimg = document.querySelector(".uploaded-image");
    if (uploadedimg){
        return;
    }
    /* check if size of file is over the limit or not */
    if (file && file.size <= maxSize ){
        /* if its not handle normal process*/
        console.log("file size correct");
        /* display  uploaded files */
        previewFile();
           

    } else {
        /* if its over the size limit display error msg */
        /* get previous error msg */
        const previouserror = document.querySelector(".error_alert");
        /* if there is error msg  */
        if (previouserror) {
            /* remove previous error */
            previouserror.remove();
        }
        console.log("file size over the limit");
        /* create error msg to be displayed */
        const errorMessage = document.createElement("span");
        /* add class list error_alert to the error msg */
        errorMessage.classList.add("error_alert")
        errorMessage.style.color = "red";
        /* error msg text */
        errorMessage.innerText = "Fichier de taille incorrect , ne doit pas dépasser 4MB .";
        /* append the error msg to the container of modal text */
        const alertContainer = document.querySelector(".modal-addwindow_addimg");
        alertContainer.appendChild(errorMessage);
        /* set file input empty */
        fileinput.value = ""
        

    }
}

function quitModal(){
    modalWindow.style.display = "none";
    modalGallery.style.display = "none";
    modalAddWindow.style.display = "none";
}