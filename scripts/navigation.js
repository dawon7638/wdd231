// Get the menu button from the HTML
const menuButton = document.querySelector("#menu-button");

// Get the navigation menu from the HTML
const navigation = document.querySelector("#navigation");

// Listen for a click on the hamburger button
menuButton.addEventListener("click", () => {

    // Add or remove the "open" class
    navigation.classList.toggle("open");

    // Check whether the menu is currently open
    const isOpen = navigation.classList.contains("open");

    // Update the accessibility attribute
    menuButton.setAttribute("aria-expanded", isOpen);

    // Change the hamburger icon
    if (isOpen) {
        menuButton.textContent = "✕";
        menuButton.setAttribute("aria-label", "Close navigation menu");
    } else {
        menuButton.textContent = "☰";
        menuButton.setAttribute("aria-label", "Open navigation menu");
    }
});