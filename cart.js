
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
    document.getElementById('totalNumOfBooksInCart').innerText = totalNumOfBooksInCart;
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
    document.getElementById('Price').innerText = "Total Price: €" + totalPrice.toFixed(2);
    console.log("Total price: ", totalPrice);
}

function ClearCart(){
    localStorage.clear();
    location.reload();
}


function customerBuysBooks(){
    let booksInCart = JSON.parse(localStorage.getItem("booksInCart")) || [];
    console.log("empty Cart Test", booksInCart);
    if(booksInCart.length == 0) {
        alert("You Curently Have No Items In Your Cart.");
        return;
    }

    event.preventDefault();
    loadLoadingIcon();
    window.setTimeout(test, 3000);
    // test()

    


    //loading set timer
    //bring to new page or hide all cart information 
    //Successful message 
    // link to home page to buy more books localstorage is cleared
}

function loadLoadingIcon(){
    // document.body.style.filter = 'blur(2px)';
    document.getElementById('loading').innerHTML = `
    <div class="blurEffect"></div>
    <div>
    <img src="https://png.pngtree.com/png-vector/20220630/ourmid/pngtree-loading-indicator-icon-vector-illustration-design-progression-site-load-vector-png-image_37466228.png" alt="loading..." class="loadingImg"> 
    </div>`
}

function test(){
        let booksInCart = JSON.parse(localStorage.getItem("booksInCart")) || [];
        document.getElementById('shoppingCartCheckoutPlusActiveCart').style.display = "none";
        console.log("total price from buy button");

        let boughtItems = document.getElementById('userSuccessfullyBoughtItems').innerHTML;
        let finalTotalPrice = 0;
            boughtItems = `
            <div class="successfullPurchase">
                <h3>✅ Successful Purchase!</h3>
                <h4>Thanks for shopping with us! We’ve received your order and will let you know once it ships.<h4>
            
                <div class="article-card">
                    <div class="smallreportTopOfCard">
                        <h3>Your Purchase order</h3>
                        <h3>Order No. ${(Math.random()* 3000).toFixed(0)}</h3>
                    </div>
                    <div class="spliter">
                        <hr>
                    </div>
                    <div class="smallreportTopOfCard">
                        <h3>Summary of Purchase</h3>
                    </div>
                    
                        <div class="ItemsInReceipt">`;
                            booksInCart.forEach(item =>{
                                finalTotalPrice += item.price * item.cartQuantity; 
                                boughtItems += `
                                <div class="containerItemsInReceipt">
                                    <p>${item.name}</p>
                                    <p>€${((item.price).toFixed(2))*item.cartQuantity}</p>
                                </div>`
                            });
                    boughtItems += `
                        </div>
                        <div class="spliter">
                        <hr>
                    </div>
                    <div class="smallreportTopOfCard">
                        <h3>Total: </h3>
                        <h3>€${finalTotalPrice.toFixed(2)}</h3>
                    </div>
                    <button onclick="continueShoppingAfterPurchase()" class="buttonStyle">Continue Shopping</button>
                    </div>
            </div>
            `
             document.getElementById('userSuccessfullyBoughtItems').innerHTML = boughtItems;
}

function continueShoppingAfterPurchase(){
    window.location.href = "../pages/index.html";
    localStorage.clear();
}