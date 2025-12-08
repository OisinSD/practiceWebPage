//  function getData(){
let bookData = [];     

fetch("../booktest.json")
     .then(response => response.json())
     .then(data => {
        //   console.log("This is the book Data:" + data.name)
        if(data){
            bookData = data;
            printFunction(bookData);
        } else{
            console.log("Cannot Load Book Data")
            document.getElementById('bookName').innerHTML = "Cannot Load Books...";
        }
    })
    .catch(error => console.error("Error loading books: ", error));
// }

// let books 

// function bringToPage(data){
    
// }

function searchForBooks(){
    let input = document.getElementById('searching').value;

    // If input is empty, clear results
    if (input === "") {
        printFunction(bookData);
        return;
    }
    // Create regex
    let regex = new RegExp(input, "i");

    // Filter countries that match the regex
    let results = bookData.filter(book => regex.test(book.name));

    // Display results
    printFunction(results);
    // document.getElementById('title').innerHTML =
    //     results.length ? results.join("<br>") : "No results found";

}

function printFunction(data){
   let bookContainer = document.getElementById('bookName');
   bookContainer.innerHTML = '';

   data.forEach(data => {
    bookContainer.innerHTML += `
        <div class="container">
            <div>
                <img src="${data.image}" alt="${data.name}" class="book-cover">
            </div>
            <div class="bookInfo" >
                <h4>${data.name}</h4>
                <p>${data.author}</p>
                <p class="price" >$${data.price}</p>
                <p class="addToCardButton">Add to Cart</p>
            </div>
        </div>`;
    }); 
}





























// document.getElementById("weatherForm").addEventListener("submit", function (e) { 
//     e.preventDefault(); // Prevent form reload

//     let cityInput = document.getElementById("cityInput").value.trim(); // Get user input

//     fetch("weather.json")
//         .then(response => response.json())
//         .then(data => { 
//             let cityData = data.find(city => city.cityName.toLowerCase() === cityInput.toLowerCase());

//             if (cityData) {
//                 // Save data in localStorage so it's available on other pages
//                 localStorage.setItem("weatherData", JSON.stringify(cityData));

//                 document.getElementById("cityName").innerText = cityData.cityName;
//                 document.getElementById("temperature").innerText = cityData.temperatureCelsius + "°C";
//                 document.getElementById("humidity").innerText = (cityData.humidity * 100) + "%";
//                 document.getElementById("uvIndex").innerText = cityData.uvIndex;
//                 document.getElementById("windSpeed").innerText = cityData.windSpeed;
//             } else {
//                 alert("City not found. Try another location.");
//             }
//         })
//         .catch(error => console.error("Error loading weather data:", error));
// });
