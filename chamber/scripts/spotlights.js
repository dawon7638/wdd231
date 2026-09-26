const spotlightContainer =
    document.querySelector("#spotlight-container");


async function loadSpotlights() {
    try {
        const response =
            await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Unable to load member data.");
        }

        const members =
            await response.json();


        // Only Gold and Silver members can be spotlights.
        const eligibleMembers =
            members.filter((member) =>
                member.membership === "Gold" ||
                member.membership === "Silver"
            );


        // Randomize the eligible members.
        const shuffledMembers =
            [...eligibleMembers].sort(
                () => Math.random() - 0.5
            );


        // Randomly display 2 or 3 members.
        const numberOfSpotlights =
            Math.floor(Math.random() * 2) + 2;


        const selectedMembers =
            shuffledMembers.slice(
                0,
                numberOfSpotlights
            );


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

        const card =
            document.createElement("article");

        card.classList.add("spotlight-card");


        // Company logo
        const logo =
            document.createElement("img");

        logo.src =
            `images/${member.image}`;

        logo.alt =
            `${member.name} logo`;

        logo.loading = "lazy";


        // Company name
        const companyName =
            document.createElement("h3");

        companyName.textContent =
            member.name;


        // Phone
        const phone =
            document.createElement("p");

        phone.innerHTML =
            `<strong>Phone:</strong> ${member.phone}`;


        // Address
        const address =
            document.createElement("p");

        address.innerHTML =
            `<strong>Address:</strong> ${member.address}`;


        // Website
        const website =
            document.createElement("p");

        const websiteLink =
            document.createElement("a");

        websiteLink.href =
            member.website;

        websiteLink.textContent =
            "Visit Website";

        websiteLink.target =
            "_blank";

        websiteLink.rel =
            "noopener noreferrer";

        website.appendChild(websiteLink);


        // Membership level
        const membership =
            document.createElement("p");

        membership.classList.add(
            "membership-level"
        );

        membership.textContent =
            `${member.membership} Member`;


        // Add everything to the card.
        card.appendChild(logo);
        card.appendChild(companyName);
        card.appendChild(phone);
        card.appendChild(address);
        card.appendChild(website);
        card.appendChild(membership);


        // Add card to the page.
        spotlightContainer.appendChild(card);
    });
}


loadSpotlights();