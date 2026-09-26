// Get the current year
const currentYear = new Date().getFullYear();

// Display the current year in the footer
document.querySelector("#currentyear").textContent = currentYear;


// Get the date the document was last modified
const lastModified = document.lastModified;

// Display the last modified date in the footer
document.querySelector("#lastModified").textContent = lastModified;