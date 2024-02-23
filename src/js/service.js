const services = [
  {
    id: 1,
    name: "Oral hygiene",
    image: "/src/imgs/dental-hygiene.avif",
    duration: "1 hour",
    price: "50",
  },
  {
    id: 2,
    name: "Implantus",
    image: "/src/imgs/images-implant.jpeg",
    duration: "1 hour 30 minutes",
    price: "120",
  },
  {
    id: 3,
    name: "Check up",
    image: "/src/imgs/checkup.jpeg",
    duration: "1 hour 30 minutes",
    price: "140",
  },
];

document.addEventListener("DOMContentLoaded", function () {
  const linkService = document.getElementById("link-service");

  contentDataContainer.style.display = "none";
  confirmationContainer.style.display = "none";

  const number = document.querySelector(".number-2");
  const iconCheck = document.querySelector(".icon-check-2");

  const backButton = document.getElementById("back-button-to-staff");

  backButton.addEventListener("click", function () {
    serviceContainer.style.display = "none";
    containerStaff.style.display = "flex";
  });

  const contentDiv = document.getElementById("content-service");

  services.forEach((service) => {
    const serviceDiv = document.createElement("div");
    serviceDiv.classList.add("service");

    const mainDiv = document.createElement("div");
    mainDiv.classList.add("service-content");

    const img = document.createElement("img");
    img.src = service.image;
    img.alt = service.name;

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("service-info");

    const name = document.createElement("h2");
    name.textContent = service.name;
    const duration = document.createElement("p");
    duration.textContent = "Duration: " + service.duration;
    const price = document.createElement("p");
    price.classList.add("service-price");

    price.textContent = service.price + " $";

    infoDiv.appendChild(name);
    infoDiv.appendChild(duration);

    mainDiv.appendChild(img);
    mainDiv.appendChild(infoDiv);

    serviceDiv.appendChild(mainDiv);
    serviceDiv.appendChild(price);

    const stateObject = JSON.parse(localStorage.getItem(`stateObject`));
    const serviceId = stateObject?.service_id;

    if (serviceId && serviceId === service.id) {
      serviceDiv.classList.add("selected-service");
    }

    serviceDiv.addEventListener("click", function () {
      const stateObject = JSON.parse(localStorage.getItem(`stateObject`));
      document.querySelectorAll(".service").forEach((el) => {
        el.classList.remove("selected-service");
      });

      serviceDiv.classList.add("selected-service");
      stateObject.service_id = service.id;
      localStorage.setItem(`stateObject`, JSON.stringify(stateObject));
    });

    contentDiv.appendChild(serviceDiv);
  });

  const confirmButton = document.getElementById("confirm-button-service");

  confirmButton.addEventListener("click", function (event) {
    const stateObject = JSON.parse(localStorage.getItem(`stateObject`));
    const serviceId = stateObject?.service_id;

    if (!serviceId) {
      event.preventDefault();
      alert("Please select a service member.");
    } else {
      serviceContainer.style.display = "none";
      contentDataContainer.style.display = "flex";
      number.style.display = "none";
      iconCheck.style.opacity = "1";
      linkService.style.pointerEvents = "none";
    }
  });
});
