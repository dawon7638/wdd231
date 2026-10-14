
const menu = document.querySelector('#menu-button');
const nav = document.querySelector('#site-nav');

// Toggle the mobile navigation menu
if (menu && nav) {
    menu.addEventListener('click', () => {
        const open = nav.classList.toggle('open');

        menu.setAttribute(
            'aria-expanded',
            String(open)
        );
    });
}

// Display the current year in the footer
const year = document.querySelector('#year');

if (year) {
    year.textContent = new Date().getFullYear();
}
