const times = [
  { start_time: "09:00", end_time: "09:30" },
  { start_time: "09:30", end_time: "10:00" },
  { start_time: "10:00", end_time: "10:30" },
];

let selectedDateTime =
  JSON.parse(localStorage.getItem("selectedDateTime")) || {};

let selectedDateElement = null;
let selectedTimeElement = null;

const backButtonToService = document.getElementById("back-button-to-service");
const nextBtn = document.querySelector("#confirm-button-date");
const numberElement = document.querySelector(".number-3");
const iconCheckElement = document.querySelector(".icon-check-3");

backButtonToService.addEventListener("click", function () {
  contentDataContainer.style.display = "none";
  serviceContainer.style.display = "flex";
});

nextBtn.addEventListener("click", () => {
  contentDataContainer.style.display = "none";
  confirmationContainer.style.display = "flex";
  numberElement.style.display = "none";
  iconCheckElement.style.opacity = "1";
  constructResBlock();
});

function generateCalendar(year, month) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const calendarDiv = document.getElementById("calendar");
  calendarDiv.innerHTML = `<p>${monthNames[month]} ${year}</p>`;

  const table = document.createElement("table");
  const headerRow = table.insertRow();
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  weekdays.forEach((day) => {
    const th = document.createElement("th");
    th.textContent = day;
    headerRow.appendChild(th);
  });

  const daysContainer = document.getElementById("selected-day-info");
  daysContainer.innerHTML = "";

  let date = 1;

  for (let i = 0; i < 6; i++) {
    const row = table.insertRow();
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDayIndex) {
        const cell = row.insertCell();
        cell.textContent = "";
      } else if (date > daysInMonth) {
        break;
      } else {
        const cell = row.insertCell();
        const selectedDate = new Date(year, month, date);
        const dateString = selectedDate.toDateString();

        cell.textContent = date;

        if (selectedDateTime[dateString]) {
          const selectedTimeData = selectedDateTime[dateString];
          if (selectedTimeData.start_time && selectedTimeData.end_time) {
            cell.classList.add("selected-date");
            cell.classList.add("selected-time");
          }
        }

        cell.addEventListener("click", function () {
          if (selectedDateElement) {
            selectedDateElement.classList.remove("selected-date");
          }
          cell.classList.add("selected-date");
          selectedDateElement = cell;

          const formattedDate = selectedDate.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          });

          daysContainer.innerHTML = `<div><p>${formattedDate}</p></div>`;

          const ulElement = document.createElement("ul");
          times.forEach((time) => {
            const liElement = document.createElement("li");
            const startTimeP = document.createElement("p");
            startTimeP.textContent = time.start_time;
            const endTimeP = document.createElement("p");
            endTimeP.textContent = time.end_time;
            liElement.appendChild(startTimeP);
            liElement.appendChild(endTimeP);
            ulElement.appendChild(liElement);

            liElement.addEventListener("click", function () {
              if (selectedTimeElement) {
                selectedTimeElement.classList.remove("selected-time");
              }
              liElement.classList.add("selected-time");
              selectedTimeElement = liElement;

              const stateObject = JSON.parse(
                localStorage.getItem(`stateObject`)
              );

              stateObject.date = selectedDate
                .toLocaleDateString()
                .split(".")
                .reverse()
                .join("-");
              stateObject.time = time.start_time;
              localStorage.setItem("stateObject", JSON.stringify(stateObject));
            });
          });
          daysContainer.appendChild(ulElement);

          if (localStorage.getItem("selectedDateTime")) {
            const selectedDateTimeString =
              localStorage.getItem("selectedDateTime");
            const [selectedDateStr, selectedTimeStr] =
              selectedDateTimeString.split(" ");
            if (selectedDateStr === formattedDate) {
              const selectedTime = selectedTimeStr.split(" - ")[0];
              const selectedLiElement = ulElement.querySelector(
                `p:contains(${selectedTime})`
              ).parentNode;
              selectedLiElement.classList.add("selected-time");
              selectedTimeElement = selectedLiElement;
            }
          }
        });

        date++;
      }
    }
  }

  const defaultSelectedDay = document.createElement("div");
  defaultSelectedDay.innerHTML = "<p>Selected day</p>";
  daysContainer.appendChild(defaultSelectedDay);

  calendarDiv.appendChild(table);
}

generateCalendar(2024, 1);
