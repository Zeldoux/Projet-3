/* get API url of user/login */
const apiUrl = "http://localhost:5678/api/works";



/* use of callback to refresh displayed works */
export function addWork(event,callback) {
    /* use of try/catch statement to prevent error and have a debug about it *optional* */
    try {
        /* prevent default event (refresh)*/
        event.preventDefault();

        /* get token for auth */
        const token = window.localStorage.getItem("token");
        /* load  <input> value */
        const form = event.target;
        /* store it in a const */
        let formData = new FormData(form)


        console.log("form data before request sent ",formData); // log to display formData content 


        const request = new XMLHttpRequest();

        request.open("POST",`${apiUrl}`, true);
        /* set auth token in header */
        request.setRequestHeader('Authorization', `Bearer ${token}`);
        
        /* send request POST formData */
        request.onload = function() {
            if (request.status === 201 ) {
                console.log('Form data after successful submission:', formData);
                /* retrieve request response */
                const result =JSON.parse(request.responseText);
                console.log("response:",result);
                /* check if callback and start callback to execute refresh function(fetchanddisplay(work)) */
                if (callback) callback(result);
            } else {
                console.error("something went wrong : ", request.responseText);
            }
        };
        
    /* check if response is retrieved otherwise it give an error with the response.status */
        request.onerror = function(){
            console.error("request failed");
        }
        request.send(formData)
    /* if try {} throw an exception the code in catch block is executed */
    } catch (error) {
        console.error(error);
    }
};

