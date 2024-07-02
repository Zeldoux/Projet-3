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
/* put API data into HTML element */
async function displayData(works){

    /*select element to remove actual work */
    const gallery = document.querySelector(".gallery");

    /* remove already present HTML work */
    gallery.innerHTML = "";

    /* loop for to take each work inside works json */
    for (let i = 0 ; i < works.length; i++) { /* potential use of Foreach possible ?*/


        /* create html element for each retrieved works */
        const worksFigure = document.createElement("figure");
        
        /* append child worksImg to worksFigure to correspond to the HTML form */
        const worksImg = document.createElement("img");
        worksImg.src = works[i].imageUrl;
        worksImg.alt = works[i].title; /**/
        worksFigure.appendChild(worksImg);

        /* append child worksFigcap to worksFigure to fit to the actual HTML*/
        const worksFigcap = document.createElement("figcaption");
        worksFigcap.textContent = works[i].title;
        worksFigure.appendChild(worksFigcap);

        /* put back in gallery works elements retrieved from API */
        gallery.appendChild(worksFigure)

        console.log('Added figure:', worksFigure);

    }

}