
/* get API url of user/login */
const apiUrl = "http://localhost:5678/api/users/login";

/* get loginmessage for info error*/
const loginMessage = document.querySelector(".loginmessage");

/* function to attempt login with credentials  */
async function login(event) {

    /* prevent default form submission */
    event.preventDefault();

    /* load  <input> value */
    const formData= {
        email : document.getElementById("logemail").value,
        password : document.getElementById("password").value,
    };

    /* Log form data for debugging */
    console.log("formdata:", formData);

    /* Send POST request using fetch API */
    try {
        const response = await fetch(apiUrl , {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(formData),   // Convert form data to JSON string
        });

        /* recieve and check if the response is successfull */
        if (response.ok) {
            /* Handle successful login*/
            const responseData = await response.json();
            console.log("Success:", responseData); // debbug log to see response recieved 
            /* store responseData into a new setitem in localstorage */
            window.localStorage.setItem("token",responseData.token);
            /* redirect to index.html */
            window.location.href=("index.html");
        } else if (response.status === 404 || 401) {
            /* throw error for incorrect credentials */
            throw new Error("Email ou mots de passe incorrect !");

        } else {
            /* throw error for possible other errors */
            /* very usefull for debug *optional* */
            throw new Error("something went wrong");
        }
    } catch (error) {
        /* handle errors */
        console.error("Error:", error);
        /* set loginmessage with the throw error */
        loginMessage.innerText = error.message; // innertext to correctly add the text inside the span 
        loginMessage.style.color = "red";
    }
}

/* get login form */
const loginAcc = document.getElementById("logform")

/* attach to the submit event the login() function see login.js */
loginAcc.addEventListener("submit",login); 

 