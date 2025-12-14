/********* Global variable to store books into when fetched so i can use it in other functions  **************/
let bookData = [];     




/************** Fetching books from json file ***************/
function loadBooks(){

    fetch("../json/booktest.json")
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
            <div class="bookInfo">
                <h4 class="bookName">${data.name}</h4>
                <p>${data.author}</p>
                <p class="price" >€${data.price}</p>
                <button class="addToCartButton" role="button" onclick="">Add To Cart</button>
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
            let discountPrice = selectedBook.price * 0.75;
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
                    <p class="price"><s>€${selectedBook.price}</s> €${discountPrice}</p>
                    <br>
                    <p>Only <u><b>${selectedBook.quantity}</b></u> left in Stock!!</p>
                    <br>
                    <p>${descriptionShorten(selectedBook.description)}<button onclick="scollToDescription()" class="readMoreLink"><u>read more</u></button></p>
                    <br>
                    <button class="addToCartButton" role="button" onclick="addToCart('${selectedBook}')">Add To Cart</button>
                
                </div>
            </div>
            <div class="spliter">
                <hr>
            </div>
            <div id="individualBookDescription"class="bookDescription">
                <h1>Description</h1>
                <p>${selectedBook.description}</p>
            </div>
            `
            try{
                // console.log("LocalStorage is cleared", localStorage.clear());
            }catch{
                console.log("Failed to clear localStorage");
            }
        }
    }catch{
        console.log("Tried to getItems but failed");
    }
})

/*********** user pressed read more so is brought to description section in individual book page ************/
function scollToDescription(){
    document.getElementById('individualBookDescription').scrollIntoView({
        behavior: "smooth"
    });
}

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





/*********** fetching nav bar ***********/

async function navBar(){
    await fetch("../components/navBar.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById('navBar').innerHTML = data;
    })
    highlightActiveNav();
}

/********** Changing style class on current page link on navBar **********/

function highlightActiveNav() {
    const links = document.querySelectorAll('#myTopnav a'); // all <a> in navbar
    const currentPath = window.location.pathname;

    console.log("C Page:", currentPath, " | Links ", links);

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

/********** loading news information and printing it **********/

async function loadNewsPage(){

    console.log("News page loaded - Fetching news data");

    let newsData = [];
    let newsHTML = "";
    
    fetch("../json/news.json")
    .then(response => response.json())
    .then(data => {
        newsData = data;
        
        fetch("../components/newsCards.html")
        .then(res => res.text())
       .then(html => {
           newsHTML = html;
           
           newsData.forEach((item,index) => {
               if(index == newsData.length-1){
                    document.getElementById('bigNews').innerHTML += `
                    <div class="article-cardBig">
                        <div class="cardBig-top">
                            <span class="news-topicBig">${item.general_topic}</span>
                            <span class="news-dateBig">${item.date}</span>
                        </div>

                        <div class="cardBig-bottom">
                            <span class="bigNewsItemTitle"><b>${item.title}</b></span>

                            <div class="writer-infoBig">
                                <div class="writer-avatarBig"></div>
                                <span>${item.writer}</span>
                            </div>
                        </div>
                    </div>`;
               } else{

                    let filledHTML = newsHTML
                   .replace("${item.general_topic}", item.general_topic)
                   .replace("${item.read_time}", item.read_time)
                   .replace("${item.date}", item.date)
                   .replace("${item.image_link}", item.image_link)
                   .replace("${item.title}", item.title)
                   .replace("${item.description}", descriptionShorten(item.description))
                   .replace("${item.writer}", item.writer);
                   document.getElementById('newsCard').innerHTML += filledHTML;
                   
                }

            })
        });
    });
}


// document.getElementById('card').addEventListener("click", () => {
//     maxLenOfDescription = itemDescription.length;
//     console.log("Length of news description:", itemDescription.length)
//     descriptionShorten(itemDescription)
// })

//add an on click here to make the maxLenOfDescription longer 
function descriptionShorten(itemDescription){
    const maxLenOfDescription = 110;
    let shortDescription = itemDescription.substring(0, maxLenOfDescription);
    return shortDescription + "...";
}


/********** Fetching form for news page **********/