document.querySelector('.get-jokes').addEventListener('click', getJokes);

function getJokes(e) {
  const number = document.querySelector('input[type="number"]').value;

  //xhr request
  const xhr = new XMLHttpRequest();

  xhr.open('GET', `http://api.icndb.com/jokes/random/${number}`, true);
  //what do we do when we get the data
  xhr.onload =  function () {
    //make sure it came back ok - 200 status
    if(this.status === 200) {
      //need to convert our JSON string we get back and make it an object by using JSON.parse
      const response = JSON.parse(this.responseText);
      
      let output = '';

      //make sure type of object is success then loop through each property of object
      if(response.type === 'success') {
        response.value.forEach(function(joke){
          //FOR EACH ITERATION WE WWANT TO TAKE THE OUTPUT VAR AND APPEND AN LI - first 'joke' is in refernce to our current iteration we are on - second 'joke' is equal to the joke property of the object we asre inside of
          output += `<li>${joke.joke}</li>`;
        });
      } else {
       output += '<li>Something went wrong</li>';
      }

      document.querySelector('.jokes').innerHTML = output;
    }
  }

  xhr.send();

  e.preventDefault();
}