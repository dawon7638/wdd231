const spotlightContainer = document.querySelector("#spotlight-container");


async function loadSpotlights() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Unable to load member data.");
        }

        const data = await response.json();

        const members = data.members;

        const eligibleMembers = members.filter((member) =>
            member.membership === "Gold" ||
            member.membership === "Silver"
        );


        const shuffledMembers = [...eligibleMembers].sort(
            () => Math.random() - 0.5
        );


        const numberOfSpotlights =
            Math.floor(Math.random() * 2) + 2;


        const selectedMembers =
            shuffledMembers.slice(0, numberOfSpotlights);


        displaySpotlights(selectedMembers);

    } catch (error) {
        console.error("Spotlight error:", error);

        spotlightContainer.innerHTML =
            "<p>Business spotlight information is currently unavailable.</p>";
    }
}


function displaySpotlights(members) {
    spotlightContainer.innerHTML = "";

    members.forEach((member) => {

        const card = document.createElement("article");

        card.classList.add("spotlight-card");


        const logo = document.createElement("img");

        logo.src = member.image;
        logo.alt = `${member.name} logo`;
        logo.loading = "lazy";


        const companyName = document.createElement("h3");

        companyName.textContent = member.name;


        const phone = document.createElement("p");

        phone.innerHTML =
            `<strong>Phone:</strong> ${member.phone}`;


        const address = document.createElement("p");

        address.innerHTML =
            `<strong>Address:</strong> ${member.address}`;


        const website = document.createElement("p");

        const websiteLink = document.createElement("a");

        websiteLink.href = member.website;
        websiteLink.textContent = "Visit Website";
        websiteLink.target = "_blank";
        websiteLink.rel = "noopener noreferrer";


        website.appendChild(websiteLink);


        const membership = document.createElement("p");

        membership.classList.add("membership-level");

        membership.textContent =
            `${member.membership} Member`;


        card.appendChild(logo);
        card.appendChild(companyName);
        card.appendChild(phone);
        card.appendChild(address);
        card.appendChild(website);
        card.appendChild(membership);


        spotlightContainer.appendChild(card);
    });
}


loadSpotlights();