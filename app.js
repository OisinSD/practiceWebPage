//  function getData(){
let bookData = [];     


/************** Fetching books from json file ***************/

fetch("../booktest.json")
     .then(response => response.json())
     .then(data => {
        bookData = data;
        //   console.log("This is the book Data:" + data.name)
        if(document.getElementById('bookName')){
            printFunction(data);
        } else{
            console.log("Cannot Load Book Data")
            document.getElementById('bookName').innerHTML = "Cannot Load Books...";
        }
    })
    .catch(error => {
        console.error("Error loading books: ", error)
    });




/********** Filtering using the search bar method ************/

function searchForBooks(){
    let input = document.getElementById('searching').value;
    if (input === "") {
        printFunction(bookData);
        return;
    }
    let regex = new RegExp(input, "i");
    let results = bookData.filter(book => regex.test(book.name));
    printFunction(results);
   
}


/**** Printing the books method *****/

function printFunction(data){
   let bookContainer = document.getElementById('bookName');
   bookContainer.innerHTML = '';

   data.forEach(data => {
    // console.log("This is my book data", data);
    bookContainer.innerHTML += `
        <div class="container" onclick="selectingBook('${data.id}')">
            <div>
                <img src="${data.image}" alt="${data.name}" class="book-cover">
            </div>
            <div class="bookInfo" >
                <h4 class="bookName">${data.name}</h4>
                <p>${data.author}</p>
                <p class="price" >€${data.price}</p>
            </div>
        </div>`;
        // console.log("Making each book data a string", JSON.stringify(data));
    }); 
}


/******* when user Clicks a book  *******/

function selectingBook(dataID){
    let book = bookData.find(book => book.id == dataID)

        // console.log("book data", book); 
    if(book){

        localStorage.setItem("selectedBook", JSON.stringify(book));
        window.location.href = "../pages/bookPage.html";
    }else{
        console.log("Unable to setItem");
    }
        // console.log("Local storage: ", localStorage.getItem("selectedBook")); //Test if data is being set to local storage
    }
        
    document.addEventListener("DOMContentLoaded", () => {
    console.log("eventListener occured");
    //  selectedBookRaw;
    try{
        let selectedBookRaw = localStorage.getItem("selectedBook");
        if(selectedBookRaw){
            let selectedBook = JSON.parse(selectedBookRaw);
            document.getElementById('bookDisplay').innerHTML = `
            <div class="bookContainer">
                <div>
                    <img src="${selectedBook.image}" alt="${selectedBook.name}" class="individualbook-cover">
                </div>
                <div>
                    <h1 class="bookTitle" >${selectedBook.name}</h4>
                    <br>
                    <p><b>Author:</b> ${selectedBook.author}</p>
                    <br>
                    <p class="price">€${selectedBook.price}</p>
                    <p>${selectedBook.quantity}</p>
                    <br><br>
                    <button class="addToCartButton" role="button" onclick="addToCart('${selectedBook}')">Add To Cart</button>
                
                </div>
            </div>
            <div class="spliter">
                <hr>
            </div>
            <div class="bookDescription">
                <h1>Description</h1>
                <p>${selectedBook.description}</p>
            </div>
            `
        }
    }catch{
        console.log("Tried to getItems but failed");
    }
})





function myFunction() {
  let x = document.getElementById("myTopnav")
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

/********* When user adds book to cart: user will be brought to Cart page with that specific books information ***********/

function addToCart(bookIDAddedToCart){
    // let book = bookData.find(book => book.id == bookIDAddedToCart);
        try{
            window.location.href = "../pages/cart.html";
            document.getElementById('myBookInCart').innerHTML = `<p>HEllo World</p>`;
            console.log("it worked");
        }catch{
            console.log("Unable to Load book info into Cart");
            document.getElementById('myBookInCart').innerHTMl = "Unable to load book into Cart";
        }
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
