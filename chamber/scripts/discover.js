
// W05 Chamber Discover Page

import { places } from "../data/places.mjs";

const cardContainer = document.querySelector("#discover-cards");
const visitMessage = document.querySelector("#visit-message");

/* =========================
   DISPLAY ATTRACTIONS
========================= */

function displayPlaces() {
    cardContainer.innerHTML = "";

    places.forEach((place, index) => {

        const card = document.createElement("article");
        card.classList.add("discover-card", `card-${index + 1}`);

        // Attraction Name
        const heading = document.createElement("h2");
        heading.textContent = place.name;

        // Image
        const figure = document.createElement("figure");

        const image = document.createElement("img");
        image.src = `images/${place.image}`;
        image.alt = place.name;
        image.width = 300;
        image.height = 200;
        image.loading = "lazy";

        figure.appendChild(image);

        // Address
        const address = document.createElement("address");
        address.textContent = place.address;

        // Description
        const description = document.createElement("p");
        description.textContent = place.description;

        // Learn More Button
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = "Learn More";

        button.addEventListener("click", () => {
            window.open(
                place.url,
                "_blank",
                "noopener,noreferrer"
            );
        });

        // Add Elements to Card
        card.append(
            heading,
            figure,
            address,
            description,
            button
        );

        cardContainer.appendChild(card);
    });
}

/* =========================
   VISITOR MESSAGE
========================= */

function displayVisitMessage() {

    const lastVisit = localStorage.getItem("lastVisit");
    const currentVisit = Date.now();

    if (lastVisit === null) {

        visitMessage.textContent =
            "Welcome! Let us know if you have any questions.";

    } else {

        const millisecondsPerDay = 1000 * 60 * 60 * 24;

        const daysBetween = Math.floor(
            (currentVisit - Number(lastVisit)) / millisecondsPerDay
        );

        if (daysBetween < 1) {

            visitMessage.textContent =
                "Back so soon! Awesome!";

        } else if (daysBetween === 1) {

            visitMessage.textContent =
                "You last visited 1 day ago.";

        } else {

            visitMessage.textContent =
                `You last visited ${daysBetween} days ago.`;
        }
    }

    localStorage.setItem("lastVisit", currentVisit);
}

/* =========================
   RUN FUNCTIONS
========================= */

displayPlaces();
displayVisitMessage();
