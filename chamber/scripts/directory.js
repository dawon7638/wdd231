const memberContainer = document.querySelector("#member-container");

const gridButton = document.querySelector("#grid-view");
const listButton = document.querySelector("#list-view");


async function getMembers() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Unable to load member data.");
        }

        const members = await response.json();

        displayMembers(members);

    } catch (error) {
        console.error("Directory error:", error);

        memberContainer.innerHTML =
            "<p>Business directory information is currently unavailable.</p>";
    }
}


function displayMembers(members) {
    memberContainer.innerHTML = "";

    members.forEach((member) => {

        const card = document.createElement("article");

        card.classList.add("member-card");


        const logo = document.createElement("img");

        logo.src = `images/${member.image}`;
        logo.alt = `${member.name} logo`;
        logo.loading = "lazy";


        const companyName = document.createElement("h2");

        companyName.textContent = member.name;


        const address = document.createElement("p");

        address.innerHTML =
            `<strong>Address:</strong> ${member.address}`;


        const phone = document.createElement("p");

        phone.innerHTML =
            `<strong>Phone:</strong> ${member.phone}`;


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
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);
        card.appendChild(membership);


        memberContainer.appendChild(card);
    });
}


gridButton.addEventListener("click", () => {

    memberContainer.classList.remove("member-list");
    memberContainer.classList.add("member-grid");

    gridButton.classList.add("active");
    listButton.classList.remove("active");
});


listButton.addEventListener("click", () => {

    memberContainer.classList.remove("member-grid");
    memberContainer.classList.add("member-list");

    listButton.classList.add("active");
    gridButton.classList.remove("active");
});


getMembers();