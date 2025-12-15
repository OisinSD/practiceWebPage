
function loadCheckoutForm(){
    fetch("../components/checkoutForm.html")
    .then(response => response.text())
    .then(formHTML => {
        document.getElementById('shoppingCartCheckoutPlusActiveCart').innerHTML = formHTML;
        // console.log(formHTML);
        getBooksInCart();
    })
}


function totalNumOfBooksInCart(){
    let myBooksInCart = JSON.parse(localStorage.getItem("booksInCart")) || [];
    let totalNumOfBooksInCart = 0;
    myBooksInCart.map(item => {

        totalNumOfBooksInCart++; 
    })
    document.getElementById('totalNunOfBooksInCart').innerText = totalNumOfBooksInCart;
}

function getBooksInCart(){
    let myBooksInCart = JSON.parse(localStorage.getItem("booksInCart")) || [];
 calculateTotalPrice();
  
    myBooksInCart.forEach(book => {
       
        const bookPrice = book.price * book.cartQuantity;
        document.getElementById('myCart').innerHTML += `
        <div class="cartCard">
            <div class="cardCardRows">
                <p>${book.name}</p>
                <i onClick="removeBookFromCart(${book.id})" class="fa-trash-o"></i>
            </div>
        <div class="cardCardRows">
        <div>
            <p id="bookPrice-${book.id}">€${bookPrice}</p>
        </div>
            <div class="cardCardRows">
                <p class="cartButtons" onClick="quantity('minus', ${book.id})">-</p>
                <p id="cartQuantity-${book.id}">${book.cartQuantity}</p>
                <p class="cartButtons" onClick="quantity('plus', ${book.id})">+</p>
            </div>
        </div>
        `
    })
   
}


function removeBookFromCart(bookID){
    let booksInCart = JSON.parse(localStorage.getItem("booksInCart")) || [];
    console.log("Current books in Cart before deleting:", booksInCart);
    booksInCart = booksInCart.filter(book => book.id != bookID) ;
}


function quantity(action, bookID) {
    let booksInCart = JSON.parse(localStorage.getItem("booksInCart")) || [];
    const book = booksInCart.find(b => b.id == bookID);
    const bookprice = book.price;
    if (!book) return;
    let currentQuantityInCart = book.cartQuantity;
    if(book.cartQuantity + 1 > book.quantity && action === "plus"){
        
        return alert(`Oops! You’ve reached the maximum available stock for ${book.name}.\n\nThere are only ${book.quantity} left in stock.\n\n We aplogise for the inconvenience`)
    }

    if (action === 'plus') {
        book.cartQuantity++;
    } else if (action === 'minus' && book.cartQuantity > 1) {
        book.cartQuantity--;
    }

    
    
    // Update the quantity in the DOM
    document.getElementById(`cartQuantity-${bookID}`).innerText = book.cartQuantity;
    document.getElementById(`bookPrice-${book.id}`).innerText = "€" + book.price * book.cartQuantity;
 
    // Save back to localStorage
    localStorage.setItem("booksInCart", JSON.stringify(booksInCart));
    calculateTotalPrice();
}

// let totelPrice = 0;
function  calculateTotalPrice(){
    totalPrice = 0;
    let booksInCart = JSON.parse(localStorage.getItem("booksInCart")) || [];
    booksInCart.forEach(item => {
        totalPrice += item.price * item.cartQuantity; 
    })
    console.log("TOtalPrice", totalPrice)
    document.getElementById('Price').innerText = "Total Price: €" + Math.round(totalPrice);
    console.log("Total price: ", totalPrice);
}

function ClearCart(){
    localStorage.clear();
    location.reload();
}