
import { getFavorites, toggleFavorite } from './favorites.js';

const list = document.querySelector('#favorites-list');

// Load saved favorite equipment
async function load() {
    if (!list) {
        return;
    }

    try {
        // Fetch equipment data from JSON
        const response = await fetch('./data/gear.json');

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const items = await response.json();

        if (!Array.isArray(items)) {
            throw new Error('Unexpected data format');
        }

        // Filter equipment based on saved favorites
        const savedIds = getFavorites();

        const favorites = items.filter(item =>
            savedIds.includes(item.id)
        );

        list.replaceChildren();

        // Display a message if no favorites are saved
        if (!favorites.length) {
            const p = document.createElement('p');

            p.className = 'empty';
            p.textContent =
                'No favorites saved yet. Visit Gear Explorer and save equipment you like.';

            list.append(p);
            return;
        }

        // Display each saved favorite
        for (const item of favorites) {
            const card = document.createElement('article');
            card.className = 'card';

            // Create an image if the item has one
            if (item.image) {
                const img = document.createElement('img');

                img.src = item.image;
                img.alt = `${item.brand} ${item.name}`;
                img.loading = 'lazy';
                img.decoding = 'async';
                img.className = 'gear-image';

                card.append(img);
            }

            // Equipment title
            const title = document.createElement('h3');
            title.textContent = item.name;

            // Equipment details
            const detail = document.createElement('p');
            detail.textContent =
                `${item.brand} · ${item.category}`;

            // Remove favorite button
            const button = document.createElement('button');

            button.type = 'button';
            button.className = 'secondary';
            button.textContent = 'Remove favorite';

            button.addEventListener('click', () => {
                toggleFavorite(item.id);
                load();
            });

            card.append(title, detail, button);
            list.append(card);
        }

    } catch (error) {
        console.error('Favorites loading error:', error);

        list.textContent =
            'Favorites could not be loaded. Try refreshing.';
    }
}

// Initialize saved favorites
load();
