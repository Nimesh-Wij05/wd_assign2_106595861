 // This object stores the deposit amount for each restaurant.
var deposits = {
  // Campus Grill has a $10 deposit.
  "Campus Grill": 10,
  // Noodle Nest has a $12 deposit.
  "Noodle Nest": 12,
  // Green Bowl Co. has a $10 deposit.
  "Green Bowl Co.": 10,
  // Halal Hub has a $15 deposit.
  "Halal Hub": 15,
  // Slice Society has a $12 deposit.
  "Slice Society": 12,
  // Seoul Student BBQ has a $25 deposit.
  "Seoul Student BBQ": 25
};

// This object stores the estimated average meal price per person.
var averagePrices = {
  // Campus Grill average price.
  "Campus Grill": 18,
  // Noodle Nest average price.
  "Noodle Nest": 20,
  // Green Bowl Co. average price.
  "Green Bowl Co.": 19,
  // Halal Hub average price.
  "Halal Hub": 24,
  // Slice Society average price.
  "Slice Society": 17,
  // Seoul Student BBQ average price.
  "Seoul Student BBQ": 35
};

// This function checks whether an email looks valid.
function validEmail(email) {
  // This regular expression checks for text, an @ symbol, more text, a dot, and more text.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// This function displays error messages inside a chosen div.
function printErrors(id, errors) {
  // This finds the div by its id and puts each error on a new line.
  document.getElementById(id).innerHTML = errors.join("<br>");
}

// This line tries to find the recommendation form on the current page.
var recommendForm = document.getElementById("recommendForm");

// This if statement only runs recommendation code if the form exists on the page.
if (recommendForm) {
  // This listens for the recommendation form being submitted.
  recommendForm.addEventListener("submit", function(event) {
    // This stops the page from refreshing when the form is submitted.
    event.preventDefault();
    // This gets the selected dietary preference.
    var diet = document.getElementById("diet").value;
    // This gets the selected budget range.
    var budget = document.getElementById("budget").value;
    // This gets the selected dining purpose.
    var purpose = document.getElementById("purpose").value;
    // This sets a default restaurant before rules are checked.
    var restaurant = "Campus Grill";
    // This sets a default reason before rules are checked.
    var reason = "This is a cheap and casual student option.";

    // This rule chooses Green Bowl Co. for vegan users.
    if (diet === "Vegan") {
      // This changes the recommended restaurant.
      restaurant = "Green Bowl Co.";
      // This explains why the restaurant was chosen.
      reason = "It matches your vegan preference.";
    // This rule chooses Halal Hub for halal users.
    } else if (diet === "Halal") {
      // This changes the recommended restaurant.
      restaurant = "Halal Hub";
      // This explains why the restaurant was chosen.
      reason = "It matches your halal preference.";
    // This rule chooses Seoul Student BBQ for high budget or date purpose.
    } else if (budget === "High" || purpose === "Date") {
      // This changes the recommended restaurant.
      restaurant = "Seoul Student BBQ";
      // This explains why the restaurant was chosen.
      reason = "It suits a date, celebration or higher budget meal.";
    // This rule chooses Slice Society for friends.
    } else if (purpose === "Friends") {
      // This changes the recommended restaurant.
      restaurant = "Slice Society";
      // This explains why the restaurant was chosen.
      reason = "Pizza is easy to share with friends.";
    // This rule chooses Noodle Nest for business style meals.
    } else if (purpose === "Business") {
      // This changes the recommended restaurant.
      restaurant = "Noodle Nest";
      // This explains why the restaurant was chosen.
      reason = "It is quick, casual and not too expensive.";
    }

    // This displays the result and creates a reservation link with the restaurant name in the URL.
    document.getElementById("recommendResult").innerHTML = "<h3>Recommended: " + restaurant + "</h3><p>Reason: " + reason + "</p><a class='button' href='reservation.html?restaurant=" + encodeURIComponent(restaurant) + "'>Reserve this restaurant</a>";
  });
}

// This line tries to find the registration form on the current page.
var registerForm = document.getElementById("registerForm");

// This if statement only runs registration code if the form exists on the page.
if (registerForm) {
  // This listens for the registration form being submitted.
  registerForm.addEventListener("submit", function(event) {
    // This creates an empty list to store error messages.
    var errors = [];
    // This gets the username and removes extra spaces.
    var username = document.getElementById("username").value.trim();
    // This gets the registration email and removes extra spaces.
    var email = document.getElementById("regEmail").value.trim();
    // This gets the phone number and removes extra spaces.
    var phone = document.getElementById("regPhone").value.trim();
    // This gets the password value.
    var password = document.getElementById("password").value;
    // This gets the confirm password value.
    var confirm = document.getElementById("confirmPassword").value;
    // This checks which gender radio button is selected.
    var gender = document.querySelector("input[name='gender']:checked");
    // This gets the selected dietary preference.
    var diet = document.getElementById("dietPref").value;
    // This gets the country or region and removes extra spaces.
    var country = document.getElementById("country").value.trim();

    // This checks that the username is at least 5 characters and only uses letters, numbers, and underscores.
    if (!/^[A-Za-z0-9_]{5,}$/.test(username)) errors.push("Username must be at least 5 characters and only use letters, numbers and underscores.");
    // This checks that the email format is valid.
    if (!validEmail(email)) errors.push("Email must be in a valid format.");
    // This checks that the phone number is digits only and 8 to 15 digits long.
    if (!/^\d{8,15}$/.test(phone)) errors.push("Phone must be digits only and 8 to 15 digits long.");
    // This checks that the password meets the assignment rules.
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{10,}$/.test(password)) errors.push("Password must be at least 10 characters with uppercase, lowercase, number and special character.");
    // This checks that the two passwords match.
    if (password !== confirm) errors.push("Confirm password must match password.");
    // This checks that a gender option was selected.
    if (!gender) errors.push("Please select a gender.");
    // This checks that a dietary preference was selected.
    if (diet === "") errors.push("Please select a dietary preference.");
    // This checks that the country field is not empty.
    if (country === "") errors.push("Please enter your country or region.");

    // This prints all registration errors on the page.
    printErrors("registerErrors", errors);
    // This stops the form from submitting if there are any errors.
    if (errors.length > 0) event.preventDefault();
  });
}

// This line tries to find the reservation form on the current page.
var reservationForm = document.getElementById("reservationForm");
// This line tries to find the restaurant dropdown on the current page.
var restaurantSelect = document.getElementById("restaurantSelect");
// This line tries to find the payment method dropdown on the current page.
var paymentMethod = document.getElementById("paymentMethod");

// This function updates the deposit field when a restaurant is selected.
function updateDeposit() {
  // This puts the correct deposit amount into the readonly deposit field.
  document.getElementById("deposit").value = "$" + deposits[restaurantSelect.value];
}

// This function shows either the voucher field or the card field.
function updatePayment() {
  // This finds the voucher area div.
  var voucherArea = document.getElementById("voucherArea");
  // This finds the card area div.
  var cardArea = document.getElementById("cardArea");
  // This checks whether the selected payment method is voucher.
  if (paymentMethod.value === "Voucher") {
    // This shows the voucher code field.
    voucherArea.style.display = "block";
    // This hides the card fields.
    cardArea.style.display = "none";
  // This runs when online payment is selected.
  } else {
    // This hides the voucher code field.
    voucherArea.style.display = "none";
    // This shows the card fields.
    cardArea.style.display = "block";
  }
}

// This if statement only runs reservation code if the reservation form exists.
if (reservationForm) {
  // This reads the page URL to check if a restaurant was sent from another page.
  var params = new URLSearchParams(window.location.search);
  // This gets the restaurant value from the URL.
  var selected = params.get("restaurant");
  // This checks that the URL restaurant exists in the deposit list.
  if (selected && deposits[selected] !== undefined) restaurantSelect.value = selected;
  // This sets the starting deposit amount.
  updateDeposit();
  // This sets the starting payment field display.
  updatePayment();
  // This updates the deposit whenever the restaurant changes.
  restaurantSelect.addEventListener("change", updateDeposit);
  // This updates payment fields whenever the payment method changes.
  paymentMethod.addEventListener("change", updatePayment);

  // This listens for the same as email checkbox being changed.
  document.getElementById("sameEmail").addEventListener("change", function() {
    // This copies the reservation email into billing email if the checkbox is ticked.
    if (this.checked) document.getElementById("billingEmail").value = document.getElementById("resEmail").value;
  });

  // This listens for the reservation form being submitted.
  reservationForm.addEventListener("submit", function(event) {
    // This creates an empty list to store error messages.
    var errors = [];
    // This gets the full name and removes extra spaces.
    var name = document.getElementById("fullName").value.trim();
    // This gets the reservation email and removes extra spaces.
    var email = document.getElementById("resEmail").value.trim();
    // This gets the reservation phone number and removes extra spaces.
    var phone = document.getElementById("resPhone").value.trim();
    // This gets the selected reservation date and time.
    var dateTime = document.getElementById("dateTime").value;
    // This gets the number of people as a number.
    var people = Number(document.getElementById("people").value);
    // This gets the billing email and removes extra spaces.
    var billingEmail = document.getElementById("billingEmail").value.trim();
    // This gets the selected card type.
    var cardType = document.getElementById("cardType").value;
    // This gets the card number and removes extra spaces.
    var cardNumber = document.getElementById("cardNumber").value.trim();

    // This checks that the full name is not empty.
    if (name === "") errors.push("Full name is required.");
    // This checks that the email format is valid.
    if (!validEmail(email)) errors.push("Email must be in a valid format.");
    // This checks that the phone number has at least 10 digits.
    if (!/^\d{10,}$/.test(phone)) errors.push("Phone number must contain at least 10 digits.");
    // This checks that the date is entered and not in the past.
    if (dateTime === "" || new Date(dateTime) < new Date()) errors.push("Reservation date and time must not be in the past.");
    // This checks that the number of people is greater than zero.
    if (people <= 0) errors.push("Number of people must be greater than 0.");
    // This checks that billing email is valid.
    if (!validEmail(billingEmail)) errors.push("Billing email must be in a valid format.");

    // This only checks card details when online payment is selected.
    if (paymentMethod.value === "Online") {
      // This checks that Amex has 15 digits.
      if (cardType === "Amex" && !/^\d{15}$/.test(cardNumber)) errors.push("Amex card number must be 15 digits.");
      // This checks that Visa and Mastercard have 16 digits.
      if ((cardType === "Visa" || cardType === "Mastercard") && !/^\d{16}$/.test(cardNumber)) errors.push("Visa and Mastercard numbers must be 16 digits.");
    }

    // This prints all reservation errors on the page.
    printErrors("reservationErrors", errors);
    // This stops the form from submitting if there are any errors.
    if (errors.length > 0) event.preventDefault();
  });
}

// This line tries to find the bill calculator form on the current page.
var billForm = document.getElementById("billForm");
// This line tries to find the bill restaurant dropdown on the current page.
var billRestaurant = document.getElementById("billRestaurant");

// This function updates the bill page deposit field.
function updateBillDeposit() {
  // This puts the correct deposit into the readonly bill deposit field.
  document.getElementById("billDeposit").value = "$" + deposits[billRestaurant.value];
}

// This if statement only runs bill calculator code if the bill form exists.
if (billForm) {
  // This sets the starting bill deposit amount.
  updateBillDeposit();
  // This updates the bill deposit whenever the selected restaurant changes.
  billRestaurant.addEventListener("change", updateBillDeposit);
  // This listens for the bill form being submitted.
  billForm.addEventListener("submit", function(event) {
    // This stops the page from refreshing.
    event.preventDefault();
    // This gets the selected restaurant.
    var restaurant = billRestaurant.value;
    // This gets the number of people as a number.
    var people = Number(document.getElementById("billPeople").value);
    // This calculates the meal total before deposit.
    var mealTotal = averagePrices[restaurant] * people;
    // This gets the deposit for the selected restaurant.
    var deposit = deposits[restaurant];
    // This adds the meal estimate and deposit together.
    var finalTotal = mealTotal + deposit;

    // This checks that the number of people is valid.
    if (people <= 0) {
      // This displays an error for an invalid number of people.
      document.getElementById("billResult").innerHTML = "Please enter at least 1 person.";
    // This runs when the number of people is valid.
    } else {
      // This displays the estimated bill result on the page.
      document.getElementById("billResult").innerHTML = "<h3>Estimated total: $" + finalTotal + "</h3><p>Meal estimate: $" + mealTotal + "</p><p>Reservation deposit: $" + deposit + "</p>";
    }
  });
}
