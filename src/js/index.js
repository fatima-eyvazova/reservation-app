const stateObject = {
  staff_id: 0,
  service_id: 0,
  date: "",
  time: "",
  customer: {
    name: "",
    surname: "",
    email: "",
    phone: "",
  },
};

const staffs = [
  {
    id: 1,
    name: "Alex Rosetta",
    email: "alexyrosetta@gmail.com",
    image: "/src/imgs/doctor2.jpeg",
  },
  {
    id: 2,
    name: "Maria July",
    email: "mariajuly@gmail.com",
    image: "/src/imgs/doctor.webp",
  },
];

window.addEventListener("beforeunload", () => {
  localStorage.setItem("stateObject", null);
});

const linkStaff = document.querySelector("#link-staff");
const linkService = document.querySelector("#link-service");
const linkDate = document.querySelector("#link-date");
const linkConfirmation = document.querySelector("#link-confirmation");

const containerStaff = document.querySelector("#container-staff");
const serviceContainer = document.querySelector("#service-container");
const contentDataContainer = document.querySelector("#content-data");
const confirmationContainer = document.querySelector("#confirmation");

const number = document.querySelector(".number");
const iconCheck = document.querySelector(".icon-check");

const constructResBlock = () => {
  const stateObject = JSON.parse(localStorage.getItem("stateObject"));
  const foundStaff = staffs.find(
    (staff) => staff?.id === stateObject?.staff_id
  );
  const foundService = services.find((s) => s.id === stateObject?.service_id);
  const dateTime = stateObject?.date + " / " + stateObject?.time;

  let inner = `<p><span class="text-info">Staff :</span><span class="info-item"> ${foundStaff?.name}</span></p>`;
  inner += `<p><span class="text-info">Service :</span> <span class="info-item"> ${foundService?.name} ${foundService?.price}</span></p>`;
  inner += `<p><span class="text-info">Date : </span> <span class="info-item">${dateTime}</span></p>`;
  inner += `<p><span class="text-info">Total :</span> <span class="info-item-price"> ${foundService?.price}$</span></p>`;

  resBlock.innerHTML = inner;
};

linkStaff.addEventListener("click", () => {
  containerStaff.style.display = "flex";
  serviceContainer.style.display = "none";
  contentDataContainer.style.display = "none";
  confirmationContainer.style.display = "none";
});

linkService.addEventListener("click", () => {
  containerStaff.style.display = "none";
  serviceContainer.style.display = "flex";
  contentDataContainer.style.display = "none";
  confirmationContainer.style.display = "none";
});

linkDate.addEventListener("click", () => {
  containerStaff.style.display = "none";
  serviceContainer.style.display = "none";
  contentDataContainer.style.display = "flex";
  confirmationContainer.style.display = "none";
});

linkConfirmation.addEventListener("click", () => {
  containerStaff.style.display = "none";
  serviceContainer.style.display = "none";
  contentDataContainer.style.display = "none";
  confirmationContainer.style.display = "flex";
  constructResBlock();
});

document.addEventListener("DOMContentLoaded", function () {
  serviceContainer.style.display = "none";
  contentDataContainer.style.display = "none";
  confirmationContainer.style.display = "none";

  const contentDiv = document.querySelector(".content");
  const confirmButton = document.getElementById("confirm-button-staff");
  let nextButtonClicked = false;

  staffs.forEach((staff) => {
    const staffDiv = document.createElement("div");
    staffDiv.classList.add("staff");

    const img = document.createElement("img");
    img.src = staff.image;
    img.alt = staff.name;

    staffDiv.appendChild(img);

    const info = document.createElement("div");
    info.classList.add("staff-info");

    const name = document.createElement("h2");
    name.classList.add("staff-info-name");
    name.textContent = staff.name;

    const email = document.createElement("p");
    email.textContent = staff.email;

    info.appendChild(name);
    info.appendChild(email);

    staffDiv.appendChild(info);

    const isSelected = localStorage.getItem(`selectedStaff`);
    if (isSelected === staff.id.toString()) {
      staffDiv.classList.add("selected-staff");
    }

    staffDiv.addEventListener("click", function () {
      document.querySelectorAll(".staff").forEach((el) => {
        el.classList.remove("selected-staff");
      });

      staffDiv.classList.add("selected-staff");
      stateObject.staff_id = staff.id;
      localStorage.setItem("stateObject", JSON.stringify(stateObject));

      confirmButton.disabled = false;
    });

    contentDiv.appendChild(staffDiv);
  });

  confirmButton.addEventListener("click", function (event) {
    const selectedStaff = localStorage.getItem("stateObject");

    if (!selectedStaff || !JSON.parse(selectedStaff)?.staff_id) {
      event.preventDefault();
      alert("Please select a staff member.");
    } else {
      containerStaff.style.display = "none";
      serviceContainer.style.display = "flex";
      number.style.display = "none";
      iconCheck.style.opacity = "1";
      nextButtonClicked = true;
    }
  });
  linkStaff.addEventListener("click", function (event) {
    if (!nextButtonClicked) {
      event.preventDefault();
      linkStaff.removeAttribute("href");
      linkStaff.classList.add("disabled");
    }
  });
});
