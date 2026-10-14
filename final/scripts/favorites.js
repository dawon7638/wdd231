
const KEY = 'gge-favorites-v1';

// Retrieve saved favorites from local storage
export function getFavorites() {
    try {
        const value = JSON.parse(
            localStorage.getItem(KEY) || '[]'
        );

        return Array.isArray(value) ? value : [];

    } catch {
        return [];
    }
}

// Check if an item is saved as a favorite
export function isFavorite(id) {
    return getFavorites().includes(id);
}

// Add or remove an item from favorites
export function toggleFavorite(id) {
    const values = getFavorites();

    const next = values.includes(id)
        ? values.filter(value => value !== id)
        : [...values, id];

    try {
        localStorage.setItem(
            KEY,
            JSON.stringify(next)
        );

    } catch (err) {
        console.warn(
            'Favorites could not be saved:',
            err
        );
    }

    return next;
}
