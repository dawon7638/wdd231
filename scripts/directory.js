const membersContainer = document.querySelector("#members");
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");


async function getMembers() {

    const response = await fetch("members.json");

    const members = await response.json();

    displayMembers(members);
}


function displayMembers(members) {

    membersContainer.innerHTML = "";

    members.forEach((member) => {

        const card = document.createElement("article");

        card.classList.add("member-card");

        card.innerHTML = `
            <img
                src="images/${member.image}"
                alt="${member.name} logo"
                loading="lazy">

            <div>

                <h2>${member.name}</h2>

                <p>${member.address}</p>

                <p>${member.phone}</p>

                <p>
                    Membership:
                    ${member.membership}
                </p>

                <a
                    href="${member.website}"
                    target="_blank"
                    rel="noopener noreferrer">
                    Visit Website
                </a>

            </div>
        `;

        membersContainer.appendChild(card);
    });
}


gridButton.addEventListener("click", () => {

    membersContainer.classList.remove("member-list");

    membersContainer.classList.add("member-grid");

    gridButton.classList.add("active");

    listButton.classList.remove("active");
});


listButton.addEventListener("click", () => {

    membersContainer.classList.remove("member-grid");

    membersContainer.classList.add("member-list");

    listButton.classList.add("active");

    gridButton.classList.remove("active");
});


getMembers();