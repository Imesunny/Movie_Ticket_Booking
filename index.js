//Step1: collect references of the DOM elements
const container = document.querySelector(".container");
const seats = document.querySelectorAll(
  ".row .seat:not(.sold)"
); /* References to all the available seats excluding the sold seats*/

const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

//Step 2: call event listeners, as can't put onClick events on every seats row
//event listener for movie selection change

movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  updateSelectedCount();

  //store selected movie data
  setMovieData(e.target.selectedIndex, e.target.value);
});

//event listeners for seat clicks
container.addEventListener("click", (e) => {
  console.log(e);
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("sold")
  ) {
    e.target.classList.toggle("selected");
    //update display count and total
    updateSelectedCount();
  }
});

//Step 3: Define Functions to update selected count and total
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  //get an array of all selected seats indices
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  console.log(seatsIndex);
  //store the selected seats index into the local storage
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  //calculate selected seats and count
  const selectedSeatsCounts = selectedSeats.length;

  //update the UI with the selected seats count and the total price.

  count.innerText = selectedSeatsCounts;
  total.innerText = selectedSeatsCounts * ticketPrice;
  setMovieData(movieSelect.selectedIndex, movieSelect.value);
}

//Step 4: Define function to set selected movie data, in local storage
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", JSON.stringify(movieIndex));
  localStorage.setItem("selectedMoviePrice", JSON.stringify(moviePrice));
}

//step 5: Define function to populate UI with local Storage data
function display() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  console.log(selectedSeats);

  //if there are selected seats mark them as selected in the UI;

  if (selectedSeats != null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        //because the default index is 0;
        seat.classList.add("selected");
      }
    });
  }

  //if there's a selected movie index, then set it in the dropdown
  //get selected movie data from the Local storage
  const selectedMovieIndex = JSON.parse(
    localStorage.getItem("selectedMovieIndex")
  );
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}
//step 6: Initial setup of count, total and UI based on save data.
//ticket Price to set default value
display();
let ticketPrice = +movieSelect.value;

updateSelectedCount();
