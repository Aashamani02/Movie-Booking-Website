var movies = [];

const fetchData = async () => {

  const res = await fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=f531333d637d0c44abc85b3e74db2186&language=en-US&page=1');
  const data = await res.json();
  movies.push(...data.results);

  // Loader Element
  document.querySelector("#Loader").style.display = "none";
  
  console.log(movies);

  movies.forEach(movie => createMovieCard(movie));
}

const createMovieCard = async (movie) => {

  const a = document.createElement('a');
  a.className = 'movie-link';
  a.href = "#"; // Anchor tag's href

  const div = document.createElement('div');
  div.classList.add('card');

  const img = document.createElement('img');
  img.src = `https://image.tmdb.org/t/p/w500${
    movie.poster_path}`;

  const h4 = document.createElement('h4');
  h4.innerText = movie.title;

  a.appendChild(img);
  a.appendChild(h4);

  div.appendChild(a);
  const cardGrid = document.getElementById('card-grid');
  cardGrid.appendChild(div);

  // Add click event to movie cards
  a.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default anchor behavior
    showSeatSelection(movie);
  });
  
}

const showSeatSelection = (movie) => {
  const movieGrid = document.getElementById('card-grid');
  const seatingDiv = document.getElementById('seating');
  const bookButton = document.getElementById('bookButton');

  movieGrid.style.display = "none"; // Hide movie grid
  seatingDiv.style.display = "grid"; // Show seating grid
  bookButton.style.display = "block"; // Show book button
}

const totalSeats = 24;
const availableSeats = 16;
let selectedSeats = [];

const seatingDiv = document.getElementById("seating");
const leftSeatsDiv = document.getElementById("left-seats");
const rightSeatsDiv = document.getElementById("right-seats");
const bookButton = document.getElementById("bookButton");
const formContainer = document.getElementById("formContainer");
const bookingDetails = document.getElementById("bookingDetails");
const emailInput = document.getElementById("email");
const phoneNumberInput = document.getElementById("phoneNumber");
const purchaseButton = document.getElementById("purchaseButton");
const confirmationDetails = document.getElementById("confirmationDetails");
const bookingConfirmation = document.getElementById("bookingConfirmation");

for (let i = 1; i <= totalSeats; i++) {
  const seat = document.createElement("div");
  seat.className = "seat";
  seat.innerText = i;
  
  if (Math.random() < availableSeats / totalSeats) {
    seat.addEventListener("click", () => toggleSeatBooking(seat));
  } else {
    seat.className += " unavailable";
  }
  
  seatingDiv.appendChild(seat);

  if (i <= totalSeats / 2) {
    leftSeatsDiv.appendChild(seat);
  } else {
    rightSeatsDiv.appendChild(seat);
  }
}

function toggleSeatBooking(seat) {
  if (seat.classList.contains("booked")) {
    seat.classList.remove("booked", "selected");
    selectedSeats = selectedSeats.filter(item => item !== seat);
  } else {
    seat.classList.add("booked", "selected");
    selectedSeats.push(seat);
  }

  if (selectedSeats.length > 0) {
    bookButton.style.display = "block";
  } else {
    bookButton.style.display = "none";
    formContainer.style.display = "none";
  }
}

bookButton.addEventListener("click", () => {
  formContainer.style.display = "block";
  const selectedSeatNumbers = selectedSeats.map(seat => seat.innerText).join(", ");
  bookingDetails.innerText = `Confirm your booking for seat numbers: ${selectedSeatNumbers}`;
});

emailInput.addEventListener("input", validateForm);
phoneNumberInput.addEventListener("input", validateForm);

function validateForm() {
  const email = emailInput.value.trim();
  const phoneNumber = phoneNumberInput.value.trim();

  if (email !== "" && phoneNumber !== "") {
    purchaseButton.disabled = false;
  } else {
    purchaseButton.disabled = true;
  }
}

const bookingForm = document.getElementById("bookingForm");
bookingForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const selectedSeatNumbers = selectedSeats.map(seat => seat.innerText).join(", ");
  const email = emailInput.value;
  const phoneNumber = phoneNumberInput.value;

  const confirmationMessage = `Booking Details:<br>Seat Numbers: ${selectedSeatNumbers}<br>Email: ${email}<br>Phone Number: ${phoneNumber}`;
  confirmationDetails.innerHTML = confirmationMessage;
  bookingConfirmation.style.display = "block";
  formContainer.style.display = "none"; // Hide the form after submission
});
