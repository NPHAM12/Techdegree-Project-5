//------------------------------
// Team Treehouse Project 5
// Public API Requests
// Nguyen Pham
//------------------------------

$(document).ready(function() {
  var url = 'https://randomuser.me/api/?results=12';

  function fetchData(link) { // fetchData() will return a "promise" once the data is retrieved from the server and then parsed to JSON.
    return fetch(link)
      .then(response => response.json()) // parses and returns JSON
      .catch(error => console.log('Oop! There is a problem with', error));
  }

  Promise.all([
      fetchData(url)
    ])
    .then(data => {
      // console.log("data: ", data); //data is an array of objects)
      // console.log("data[0]: ", data[0]); //data[0] is an object of objects (object: info and array of objects: results)
      displayMarkUpUsers(data[0].results); //data[0].results = array of 12 objects
      displayModalUser(data[0].results);
    });

  // -----------------------------------------------------------------------
  // HELPER FUNCTIONS
  // -----------------------------------------------------------------------

  //displayUsers method: display randomlly 12 users on page
  function displayMarkUpUsers(users) {
    // console.log("displayUsers Here");
    // console.log("data: ", data);
    // $.each(users, function(index, user) {
    $(users).each(function(index, user) {
      var userHtml = '<div class="card">';
            userHtml += '<div class="card-img-container">';
              userHtml += `<img class="card-img" src="${user.picture.large}" alt="${user.name.title} ${user.name.first} ${user.name.last}">`;
            userHtml += '</div>'; //end class= "card-img-container"

            userHtml += '<div class="card-info-container">';
              userHtml += `<h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>`;
              userHtml += `<p class="card-text">${user.email}</p>`;
              userHtml += `<p class="card-text cap">${user.location.city}</p>`
            userHtml += '</div>'; //end class= "card-info-container"
          userHtml += '</div>'; //end class= "gallery"
      $('#gallery').append(userHtml); // add class="card" to html
    });//end each loop
  } //end displayUsers

// displayModalUser function to display a clicked user
function displayModalUser(users){
  $('.card').each(function(index, user){
    user.addEventListener('click', function(e){
      // console.log("Clicked User: ",user);
      // console.log("User: ",users[index]);//users[index] is an object
      createModalUser(users[index]);//users[index] is an object
    });
  });
}

  // displayModalUser method: display a specific modal user window when clicking
  function createModalUser(user) {
    //DOB Format
    var year = user.dob.date.substring(2,4); //get year
    var month = user.dob.date.substring(5,7);//get month
    var day = user.dob.date.substring(8,10);//get day
    // console.log("displayModalUser Here");
    // console.log("data: ", data);
    // then add a new modal window to page when cliking
      var userHtml = '<div class="modal-container">';
            userHtml += '<div class="modal">';
                userHtml += '<button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>';
                userHtml += '<div class="modal-info-container">';
                  userHtml += `<img class="modal-img" src="${user.picture.large}" alt="${user.name.title} ${user.name.first} ${user.name.last}">`;
                  userHtml += `<h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>`;
                  userHtml += `<p class="modal-text">${user.email}</p>`;
                  userHtml += `<p class="modal-text cap">${user.location.city}</p>`;
                  userHtml += '<hr>';
                  userHtml += `<p class="modal-text">Cellphone: ${user.cell}</p>`;
                  // class="cap" transforms the first character of each word to uppercase
                  userHtml += `<p class="modal-text cap">${user.location.street}, ${user.location.city}, ${user.location.state} ${user.location.postcode}</p>`;
                  userHtml += `<p class="modal-text">Birthday: ${month}/${day}/${year}</p>`;
                userHtml += '</div>'; //end class="modal-info-container"
              userHtml += '</div>'; //end class="modal"
            userHtml += '</div>'; //end class="modal-container"
      $('#gallery').append(userHtml); // add class="modal-container" to html
      closeBtt(); //close modal user window
  } //end displayModalUser

  // searchUser() function: find a specific user
  function searchUser(){
    let filterInput;
    filterInput = document.querySelector('INPUT').value.toLowerCase();//get value from the textfield then transform to lower case
     numberOfUsers = document.querySelectorAll("div.card");
     for(let i = 0; i<numberOfUsers.length; i++){
       let cardContent = numberOfUsers[i].textContent; //read contents from all elements in class="card"
       if(cardContent.toLowerCase().indexOf(filterInput) > -1){//if contents of cards match any letters of filterInput in search box then appear those cards
         numberOfUsers[i].style.display = "";
       }else{
         numberOfUsers[i].style.display = "none";
       }
     }
  }

  // -----------------------------------------------------------------------
  // LISTENER EVENTS
  // -----------------------------------------------------------------------
  //closeBtt() method to close modal user window when clicking "X" button
  function closeBtt(){
    $('button').on('click',function(e){
        $('.modal-container').remove();
    });//end button click
  }// end closeBtt

  //Submit form for searching
  $('form').on('click', function(e){
    e.preventDefault();
    searchUser();
  });
});//end ready
