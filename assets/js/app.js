const randomInt = Math.floor(Math.random() * (5 - 1 + 1) + 1);

const PEXELS_API_KEY = 'xwsT4H7COfCJbKR5CubRdawR69fcIbztDwuzuDnBtU8XnsFx4IQVP8L5';
const PEXELS_URLS = [
    `https://api.pexels.com/v1/search?query=landscape&page=${randomInt}`,
    `https://api.pexels.com/v1/search?query=landscape&page=${randomInt + 2}`,
    `https://api.pexels.com/v1/search?query=landscape&page=${randomInt + 4}`,
    `https://api.pexels.com/v1/search?query=landscape&page=${randomInt + 6}`
];

const gridContainer = document.getElementById('grid_images');
const GRID_ROWS = 5;
const GRID_COLS = 5;
const MIN_ITEMS = 4;
let fetchInProgress = false; // Prevent duplicate fetch calls

async function fetchRandomImages() {
    if (fetchInProgress) return []; // Prevent double-fetching
    fetchInProgress = true;
    const allImages = [];

    try {
        for (const url of PEXELS_URLS) {
            const response = await fetch(url, {
                headers: {
                    Authorization: PEXELS_API_KEY
                }
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            const images = data.photos.map(image => image.src.medium);
            allImages.push(...images); // Combine all images from different pages
        }
    } catch (error) {
        console.error('Failed to fetch images:', error.message);
    } finally {
        fetchInProgress = false;
    }
    return allImages;
}

function generateRandomLayout(rows, cols, minItems) {
    const layout = Array.from({ length: rows }, () => Array(cols).fill(0));
    let currentItem = 1;
    let attempts = 0; // Counter to prevent infinite loops

    while (!isGridFilled(layout) && attempts < 1000) { // Limit attempts to avoid infinite loop
        const block = getRandomBlock(rows, cols);
        if (placeBlock(layout, block, currentItem)) {
            currentItem++;
        }

        if (currentItem > minItems && isGridFilled(layout)) {
            break;
        }
        attempts++;
    }
    return layout;
}

function getRandomBlock(rows, cols) {
    const possibleShapes = [
        { width: 1, height: 1 },
        { width: 1, height: 2 },
        { width: 3, height: 2 },
        { width: 3, height: 3 },
        { width: 2, height: 2 }
    ];
    return possibleShapes[Math.floor(Math.random() * possibleShapes.length)];
}

function placeBlock(layout, block, item) {
    const rows = layout.length;
    const cols = layout[0].length;

    for (let row = 0; row <= rows - block.height; row++) {
        for (let col = 0; col <= cols - block.width; col++) {
            if (isBlockAvailable(layout, row, col, block)) {
                for (let r = row; r < row + block.height; r++) {
                    for (let c = col; c < col + block.width; c++) {
                        layout[r][c] = item;
                    }
                }
                return true;
            }
        }
    }
    return false;
}

function isBlockAvailable(layout, row, col, block) {
    for (let r = row; r < row + block.height; r++) {
        for (let c = col; c < col + block.width; c++) {
            if (layout[r][c] !== 0) {
                return false;
            }
        }
    }
    return true;
}

function isGridFilled(layout) {
    return layout.flat().every(cell => cell !== 0);
}

async function renderGrid(layout) {
    gridContainer.innerHTML = '';
    gridContainer.style.gridTemplateRows = `repeat(${GRID_ROWS}, 1fr)`;
    gridContainer.style.gridTemplateColumns = `repeat(${GRID_COLS}, 1fr)`;

    const uniqueItems = new Set(layout.flat());
    const images = await fetchRandomImages();

    if (images.length < uniqueItems.size) {
        console.warn("Not enough images to fill the grid uniquely.");
        return; // Exit if not enough images
    }

    const usedImages = new Set();

    uniqueItems.forEach(item => {
        if (item === 0) return;

        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');

        const { rowStart, rowEnd, colStart, colEnd } = findGridItemPositions(layout, item);
        gridItem.style.gridRowStart = rowStart;
        gridItem.style.gridRowEnd = rowEnd;
        gridItem.style.gridColumnStart = colStart;
        gridItem.style.gridColumnEnd = colEnd;

        let randomImage;
        do {
            randomImage = images[Math.floor(Math.random() * images.length)];
        } while (usedImages.has(randomImage)); // Ensure image is unique
        usedImages.add(randomImage);

        gridItem.style.backgroundImage = `url(${randomImage})`;
        gridItem.style.backgroundSize = 'cover';
        gridItem.style.backgroundPosition = 'center';
        gridContainer.appendChild(gridItem);
    });
}

function findGridItemPositions(layout, item) {
    let rowStart, colStart, rowEnd, colEnd;
    for (let row = 0; row < layout.length; row++) {
        for (let col = 0; col < layout[row].length; col++) {
            if (layout[row][col] === item) {
                if (rowStart === undefined) rowStart = row + 1;
                if (colStart === undefined) colStart = col + 1;
                rowEnd = row + 2;
                colEnd = col + 2;
            }
        }
    }
    return { rowStart, rowEnd, colStart, colEnd };
}

// Only a single definition of CreateGrid is needed
function CreateGrid() {
    const layout = generateRandomLayout(GRID_ROWS, GRID_COLS, MIN_ITEMS);
    renderGrid(layout);
}

// Initialize grid when content is loaded
window.addEventListener('DOMContentLoaded', () => {
    CreateGrid();
});