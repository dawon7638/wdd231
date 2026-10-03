const params = new URLSearchParams(window.location.search);

document.querySelector("#first-name").textContent =
    params.get("first") || "";

document.querySelector("#last-name").textContent =
    params.get("last") || "";

document.querySelector("#email").textContent =
    params.get("email") || "";

document.querySelector("#phone").textContent =
    params.get("phone") || "";

document.querySelector("#organization").textContent =
    params.get("organization") || "";

const timestamp = params.get("timestamp");
const submitted = document.querySelector("#submitted");

if (timestamp) {
    const date = new Date(timestamp);

    submitted.textContent = date.toLocaleString();
}