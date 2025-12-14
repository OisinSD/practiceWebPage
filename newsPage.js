// Get the modal
var modal = document.getElementById("myModal");

// When the user clicks on the button, open the modal
function openModal() {
    console.log("Button Pressed");

    fetch("../components/newsModal.html")
    .then(res => res.text())
    .then(modalHTML => {
        // console.log("My modal html: ", modalHTML);
        document.getElementById('displayModal').innerHTML = modalHTML;
        modal.classList.add("test");
        // modal.style.display = "block";
    })
}

// When the user clicks on <span> (x), close the modal
function closeModal() {
     modal.classList.remove("test");
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.classList.remove("test");
    modal.style.display = "none";
  }
}



/*********** printing the news letter form **********/

function printNewsLetterFrom(){
  document.getElementById('printForm').innerHTML = `
  <div class="newsFormDiv" >
  <h2>Sign Up To Our News Letter</h2>
  <form class="newsLetterForm" onsubmit="test()" autocomplete="off" id="newsForm" >
    <div class="newsLetterEmailInput">
      
      <input type="email" id="email" name="email" placeholder="Enter your email address" class="emailInput" autocomplete="off" required>
    </div>
    <br>


    <div class="newsLetterNameInput">
      <div class="NameInput">
        <input id="firstName" class="firstNameInput" type="Text" id="usersFirstName" name="usersFirstName" placeholder="First Name" autocomplete="off" required>
      </div>
      <div class="NameInput" autocomplete="off">
        <input class="firstNameInput" type="Text" id="usersSecondName" name="usersSecondName" placeholder="Second Name" autocomplete="off" required>
      </div>
    </div><br>
   <label><b>What would you like to hear about?</b></label><br>
  <div class="topicOptions">
  <div>
    <input type="radio" id="newsTopicEverything" name="newsTopic" autocomplete="off" value="newsTopicEverything">
    <label for="newsTopicEverything">Tell Me About Everything!</label>
  </div><br>
<div>
    <input type="radio" id="newsTopicFictionBooks" name="newsTopic" autocomplete="off" value="newsTopicFictionBooks">
    <label for="newsTopicFictionBooks">Fiction Books</label>
  </div><br>
<div>
    <input type="radio" id="newsTopicNonFictionBooks" name="newsTopic" autocomplete="off" value="newsTopicNonFictionBooks">
    <label for="newsTopicNonFictionBooks">Non-fiction Books</label>
  </div><br>
<div>
    <input type="radio" id="newsTopicDiscounts" name="newsTopic" autocomplete="off" value="newsTopicDiscounts">
    <label for="newsTopicDiscounts">Discounts</label>
  </div><br>
<div>
    <input type="radio" id="newsTopicNewReleases" name="newsTopic" autocomplete="off" value="newsTopicNewReleases">
    <label for="newsTopicNewReleases">New Releases</label>
</div>
    </div>
    <br>
    <input type="submit" value="Join The Club" class="submitBtn" >
  </form>
  </div>
</div>
<div class="successfulFormSubmit" id="successfulFormSubmit" >
    <h3>✅ Form submitted successfully!</h3>
    <p id = "personalisedMessage"></p>
</div>
`
document.getElementById('newsForm').addEventListener('submit', (e) => {
  e.preventDefault();

  console.log("Test for news letter worked");
  document.getElementById('newsForm').style.display = "none";
  
  let  name = document.getElementById('firstName').value;
  const selectedTopic = document.querySelector('input[name="newsTopic"]:checked');
  let topicText = selectedTopic ? selectedTopic.nextElementSibling.textContent : "our updates";
  
  if(topicText == "Tell Me About Everything!"){
    topicText = "everything!";
  }

  document.getElementById('successfulFormSubmit').innerHTML = `<div>✅ Form submitted successfully!</div><div>
    Thank you <strong>${name}</strong> — your information has been received.<br>
    </div>
    <div>
    You’ll now receive updates about <strong>${topicText}</strong>.
    </div>
  `;
  
  
  document.getElementById('successfulFormSubmit').style.display = "flex";
})
}

