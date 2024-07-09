
/* get API url of user/login */
const apiUrl = "http://localhost:5678/api/works";


/* function to attempt login with credentials  */
export async function deleteWork(event) {

    /* prevent default form submission */
    event.preventDefault();
    const deleteButton = event.currentTarget;
    /* Find the corresponding figure element */
    const figureElement = deleteButton.closest("figure");
    /* Get the ID of the image */
    const workId = figureElement.getAttribute("data-id");
    
    /* check if works id actualy exist */
    if (!workId) {
        console.error("Work ID not found");
        return;
    }
    console.log("Image ID to delete:", workId);

    /* Send DELETE request using fetch API */
    try {
        let actualtoken = window.localStorage.getItem("token");
        console.log(actualtoken);
        /* fetch `${apiUrl}/${workId}` is same as  = const url = apiUrl + "/" + workId; */
        const response = await fetch(`${apiUrl}/${workId}`, { // concatenate apiUrl with workId as the DELETE method ask for it 
            method: "DELETE",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${actualtoken}`
            }
        });
        /* recieve and check if the response is successfull */
        if (response.ok) {
            console.log("Image deleted successfully");
        } else {
            /* throw error for possible other errors */
            throw new Error("something went wrong");
        }
    } catch (error) {
        /* handle errors */
        console.error("Error:", error);
    }
}

 