 
 function getData(){
     fetch("../books.json")
     .then(response => response.json())
     .then(data => {
        //   console.log("This is the book Data:" + data.name)
        if(data){
            data.map(printFunction);
        } else{
            console.log("Cannot Load Book Data")
            document.getElementById('bookName').innerHTML = "Cannot Load Books...";
        }
    })
    .catch(error => console.error("Error loading books: ", error));
}
function printFunction(data){
    document.getElementById('bookName').innerHTML += `
    <div class="card">
        <div class="container">
            <h4><b>${data.name}</b></h4>
            <p>${data.author}</p>
            <p>$${data.price}</p>
        </div>
    </div>`;

}
        //  .catch(error => console.error("Error loading book data:", error))
































document.getElementById("weatherForm").addEventListener("submit", function (e) { 
    e.preventDefault(); // Prevent form reload

    let cityInput = document.getElementById("cityInput").value.trim(); // Get user input

    fetch("weather.json")
        .then(response => response.json())
        .then(data => { 
            let cityData = data.find(city => city.cityName.toLowerCase() === cityInput.toLowerCase());

            if (cityData) {
                // Save data in localStorage so it's available on other pages
                localStorage.setItem("weatherData", JSON.stringify(cityData));

                document.getElementById("cityName").innerText = cityData.cityName;
                document.getElementById("temperature").innerText = cityData.temperatureCelsius + "°C";
                document.getElementById("humidity").innerText = (cityData.humidity * 100) + "%";
                document.getElementById("uvIndex").innerText = cityData.uvIndex;
                document.getElementById("windSpeed").innerText = cityData.windSpeed;
            } else {
                alert("City not found. Try another location.");
            }
        })
        .catch(error => console.error("Error loading weather data:", error));
});
