const resBlock = document.querySelector("#result-block");

document.addEventListener("DOMContentLoaded", function () {
  const backButtonToDate = document.getElementById("back-button-to-date");

  backButtonToDate.addEventListener("click", function () {
    confirmationContainer.style.display = "none";
    contentDataContainer.style.display = "flex";
  });
});

const btn = document.querySelector("#confirm-button-finish");
const form = document.querySelector("form");
const numberEl = document.querySelector(".number-4");
const iconCheckEl = document.querySelector(".icon-check-4");

const firstNameInput = form.querySelector(
  'input[type="text"][name="first-name"]'
);

function showModal(message) {
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close"> 
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
      <path d="M0 0h24v24H0z" fill="none"/>
    </svg></span>
      <p class="message">${message}</p>
    </div>
  `;
  document.body.appendChild(modal);

  const closeButton = modal.querySelector(".close");
  closeButton.addEventListener("click", function () {
    modal.style.display = "none";
    window.location.href = "index.html";
  });

  modal.style.display = "block";
}

btn.addEventListener("click", function () {
  const firstName = form
    .querySelector('input[type="text"][name="first-name"]')
    .value.trim();
  const lastName = form
    .querySelector('input[type="text"][name="last-name"]')
    .value.trim();
  const email = form.querySelector('input[type="email"]').value.trim();
  const phone = form
    .querySelector('input[type="number"][name="phone"]')
    .value.trim();

  if (!firstName || !lastName || !email || !phone) {
    alert("Please fill in all fields.");
    return;
  }

  if (!isValidEmail(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  if (!isValidPhoneNumber(phone)) {
    alert("Please enter a valid phone number.");
    return;
  }

  const stateObject = JSON.parse(localStorage.getItem(`stateObject`));
  stateObject.customer.name = firstName;
  stateObject.customer.surname = lastName;
  stateObject.customer.email = email;
  stateObject.customer.phone = phone;

  localStorage.setItem("stateObject", JSON.stringify(stateObject));

  showModal("Confirmation successfully completed!");
});

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhoneNumber(phone) {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone);
}
