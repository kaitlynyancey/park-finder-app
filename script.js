'use strict'

const apiKey = "r4rEEF0JLPgIQcxnr7pg4yodGdz6Krf0mSWQ0jpl";
const searchURL = "https://developer.nps.gov/api/v1/parks"

function formSubmit(){
    $('form').submit(event => {
        event.preventDefault();
        var state = $("#state").val();
        console.log(state);
        var num = $("#searchNum").val();
        console.log(num);
        fetchParks(state,num);
       });
}

function fetchParks(state,num){
  var url = searchURL + "?" + "api_key=" + apiKey + `&stateCode=${state}` + `&limit=${num}`;
  console.log(url)

  fetch(url)
    .then(response => {
        if (response.ok){
            return response.json();
        }
        throw new Error(response.statusText)
    })
    .then(responseJson => displayResults(responseJson))
    .catch(error => alert('Something went wrong. Try again.'));
}

function displayResults(responseJson){
  $('.results').removeClass("hidden");
  $('#results-section').empty();
  console.log(responseJson);
  for(let i=0; i < responseJson.data.length; i++){
    var parkName = responseJson.data[i].fullName;
    var description = responseJson.data[i].description;
    var website = responseJson.data[i].url;
    var address = "";
    if(responseJson.data[i].addresses.length){
        if(responseJson.data[i].addresses[0].line2 && responseJson.data[i].addresses[0].line3){
            address = responseJson.data[i].addresses[0].line1 + ", " + responseJson.data[i].addresses[0].line2 + ", " + responseJson.data[i].addresses[0].line3 + ", " + responseJson.data[i].addresses[0].city + ", " + responseJson.data[i].addresses[0].stateCode + " " + responseJson.data[i].addresses[0].postalCode;
        }
        else if(responseJson.data[i].addresses[0].line2){
            address = responseJson.data[i].addresses[0].line1 + ", " + responseJson.data[i].addresses[0].line2 + ", " + responseJson.data[i].addresses[0].city + ", " + responseJson.data[i].addresses[0].stateCode + " " + responseJson.data[i].addresses[0].postalCode;
        }
        else{
            address = responseJson.data[i].addresses[0].line1 + ", " + responseJson.data[i].addresses[0].city + ", " + responseJson.data[i].addresses[0].stateCode + " " + responseJson.data[i].addresses[0].postalCode;
        }
    }
    else {
        address = "Address not found";
    }
    
    $("#results-section").append(
      `<li>
        <p><b>Name: </b>${parkName}</p>
        <p><b>Description:</b> ${description}</p>
        <p><b>Website: </b><a href="${website}" target="_blank">${website}</a></p>
        <p><b>Address: </b>${address}</p>
      </li>`
    )
  }

}

function resetPage(){
    $("button.js-reset").on("click", function(event){
        $('.results').addClass('hidden');
    })
}

function callFunction(){
  formSubmit();
  resetPage();
}

$(callFunction)