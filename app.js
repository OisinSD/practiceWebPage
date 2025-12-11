/********* Global variable to store books into when fetched so i can use it in other functions  **************/
let bookData = [];     




/************** Fetching books from json file ***************/
function loadBooks(){

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
}





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
        





/************** Listening for when the individual book data is loaded before showing information *************/

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
            try{
                console.log("LocalStorage is cleared", localStorage.clear());
            }catch{
                console.log("Failed to clear localStorage");
            }
        }
    }catch{
        console.log("Tried to getItems but failed");
    }
})





/****** When handburger menu is clicked, CSS is changed *******/

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





/*********** fetching new information from json when user opens page ***********/


function navBar(){
    fetch("../components/navBar.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById('navBar').innerHTML = data;
    })
    highlightActiveNav();
}

function highlightActiveNav() {
    const links = document.querySelectorAll('#myTopnav a'); // all <a> in navbar
    console.log("my nav links: ", links);
    const currentPath = window.location.pathname;

    links.forEach(link => {
        // Remove any previous 'active'
        link.classList.remove('active');

        // Only add active if href matches current page
        const linkPath = new URL(link.href).pathname;
        if (linkPath === currentPath) {
            link.classList.add('active');
        }
    });
}

function loadNewsPage(){
    console.log("Detection: News page has loaded");
    let newData = [];
    fetch("../news.json")
    .then(response => response.json())
    .then(data => {
        data.map(item => {
            document.getElementById('newsTopic').innerHTML += item.general_topic;
        })
    })



}
