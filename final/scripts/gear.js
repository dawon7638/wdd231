
import { isFavorite, toggleFavorite } from './favorites.js';

const list = document.querySelector('#gear-list');
const status = document.querySelector('#gear-status');
const category = document.querySelector('#category-filter');
const search = document.querySelector('#gear-search');
const dialog = document.querySelector('#gear-dialog');

let gear = [];

// Create HTML elements
function element(tag, cls, text) {
    const el = document.createElement(tag);

    if (cls) {
        el.className = cls;
    }

    if (text !== undefined) {
        el.textContent = text;
    }

    return el;
}

// Display gear items
function render() {
    const q = (search?.value || '').toLowerCase().trim();
    const cat = category?.value || 'All';

    const filtered = gear.filter(item =>
        (cat === 'All' || item.category === cat) &&
        `${item.name} ${item.brand} ${item.type}`
            .toLowerCase()
            .includes(q)
    );

    list.replaceChildren();

    for (const item of filtered) {
        const card = element('article', 'card');

        card.append(
            element('p', 'eyebrow', item.category),
            element('h3', '', item.name),
            element('p', '', `Brand: ${item.brand}`),
            element('p', '', `Type: ${item.type}`)
        );

        const actions = element('div', 'card-actions');

        // View details button
        const details = element('button', '', 'View details');
        details.type = 'button';

        details.addEventListener('click', () => {
            openDetails(item);
        });

        // Save favorite button
        const favorite = element(
            'button',
            'secondary',
            isFavorite(item.id) ? '★ Saved' : '☆ Save'
        );

        favorite.type = 'button';

        favorite.setAttribute(
            'aria-label',
            `${isFavorite(item.id) ? 'Remove' : 'Save'} ${item.name} ${isFavorite(item.id) ? 'from' : 'to'} favorites`
        );

        favorite.addEventListener('click', () => {
            toggleFavorite(item.id);
            render();
        });

        actions.append(details, favorite);
        card.append(actions);
        list.append(card);
    }

    status.textContent = `Showing ${filtered.length} of ${gear.length} items.`;

    if (!filtered.length) {
        list.append(
            element(
                'p',
                'empty',
                'No matching equipment found. Try another search or category.'
            )
        );
    }
}

// Display gear details in a modal
function openDetails(item) {
    document.querySelector('#dialog-title').textContent = item.name;

    document.querySelector('#dialog-content').replaceChildren(
        element('p', '', `Brand: ${item.brand}`),
        element('p', '', `Category: ${item.category}`),
        element('p', '', `Type: ${item.type}`),
        element('p', '', item.description)
    );

    dialog.showModal();
}

// Fetch gear data from JSON
async function loadGear() {
    try {
        const response = await fetch('./data/gear.json');

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
            throw new Error('Unexpected data format');
        }

        gear = data;
        render();

    } catch (error) {
        console.error('Gear loading error:', error);

        status.textContent =
            'Unable to load gear right now. Please try refreshing the page.';
    }
}

// Event listeners
if (list) {
    category.addEventListener('change', render);
    search.addEventListener('input', render);

    document.querySelector('#dialog-close').addEventListener('click', () => {
        dialog.close();
    });

    dialog.addEventListener('click', event => {
        if (event.target === dialog) {
            dialog.close();
        }
    });

    loadGear();
}
