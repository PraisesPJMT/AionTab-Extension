import { updateClock } from './scripts/clock.js';
import { updateText, applyText } from './scripts/text.js';
import { SEARCH_ENGINE_OPT } from './scripts/constants.js';
import { bookmarkCLickAction } from './scripts/bookmark.js';
import { loadSearchEngine, performSearch } from './scripts/search.js';
import {
	loadSettings,
	openSettingsDialog,
	closeSettingsDialog,
	toggleClockType,
	toggleTextDisplay,
	toggleClockDisplay,
	toggleAIToolsDisplay,
	toggleBookmarksDisplay,
} from './scripts/settings.js';

// DOM Load Actions
document.addEventListener('DOMContentLoaded', () => {
	// Load Settings
	loadSettings();

	// Periodic Analog clock Update
	setInterval(updateClock, 1000);
	updateClock();

	// DOM Elements
	const searchForm = document.getElementById('searchForm');
	const searchInput = document.getElementById('searchInput');
	const searchEngineRadios = document.getElementsByName('searchEngine');

	const userTextDiv = document.getElementById('textDisplay');

	const bookmarkBtn = document.getElementById('bookmarkBtn');

	// User Text Actions
	applyText();
	userTextDiv.addEventListener('input', () => updateText());

	// Bookmark Actions
	bookmarkBtn.onclick = () => bookmarkCLickAction();

	// Stored previous search option
	const savedSearchEngine = localStorage.getItem(SEARCH_ENGINE_OPT);

	// Update previous search engine option
	loadSearchEngine();

	// Add event listener for radio buttons
	for (const radio of searchEngineRadios) {
		radio.addEventListener('change', () => {
			localStorage.setItem(SEARCH_ENGINE_OPT, radio.value);
		});
	}

	// Add event listener for search form submission
	searchForm.addEventListener('submit', (event) => {
		event.preventDefault();
		if (searchInput.value.length > 0) performSearch();
	});

	// Add event listener for Enter key press in search input
	searchInput.addEventListener('keypress', (event) => {
		if (event.key === 'Enter' && searchInput.value.length > 0) performSearch();
	});

	/* Settings Actions */

	const settingsDialog = document.getElementById('settingsDialog');
	const showSettings = document.querySelector('.openSettings');
	const closeSettings = document.querySelector('.closeSettings');

	showSettings.addEventListener('click', () => openSettingsDialog());

	closeSettings.addEventListener('click', () => closeSettingsDialog());

	// Add event listener for text display toggle
	const textDisplayToggle = document.getElementById('text-toggle');
	const textDisplaySpanToggle = document.getElementById(
		'hiddenTextToggleInputContent'
	);

	textDisplayToggle.addEventListener('change', (event) =>
		toggleTextDisplay(event)
	);
	textDisplaySpanToggle.addEventListener('keydown', (event) =>
		toggleTextDisplay(event)
	);

	// Add event listener for AI Tools display toggle
	const aiToolsDisplayToggle = document.getElementById('ai-tools-toggle');
	const aiToolsDisplaySpanToggle = document.getElementById(
		'hiddenAIToolsToggleInputContent'
	);

	aiToolsDisplayToggle.addEventListener('change', (event) =>
		toggleAIToolsDisplay(event)
	);

	aiToolsDisplaySpanToggle.addEventListener('keydown', (event) =>
		toggleAIToolsDisplay(event)
	);

	// Add event listener for bookmarks display toggle
	const bookmarksDisplayToggle = document.getElementById('bookmarks-toggle');
	const bookmarksDisplaySpanToggle = document.getElementById(
		'hiddenBookmarksToggleInputContent'
	);

	bookmarksDisplayToggle.addEventListener('change', (event) =>
		toggleBookmarksDisplay(event)
	);

	bookmarksDisplaySpanToggle.addEventListener('keydown', (event) =>
		toggleBookmarksDisplay(event)
	);

	// Add event listener for clock display toggle
	const clockDisplayToggle = document.getElementById('clock-toggle');
	const clockDisplaySpanToggle = document.getElementById(
		'hiddenClockToggleInputContent'
	);

	clockDisplayToggle.addEventListener('change', (event) =>
		toggleClockDisplay(event)
	);
	clockDisplaySpanToggle.addEventListener('keydown', (event) =>
		toggleClockDisplay(event)
	);

	// Add event listener for clock type toggle
	const clockTypeToggle = document.getElementById('clock-select');
	const analogClockSpanToggle = document.getElementById(
		'hiddenAnalogClockToggleInputContent'
	);
	const digitalClockSpanToggle = document.getElementById(
		'hiddenDigitalClockToggleInputContent'
	);

	clockTypeToggle.addEventListener('click', (event) => event.preventDefault());
	clockTypeToggle.addEventListener('change', (event) => event.preventDefault());

	analogClockSpanToggle.addEventListener('keydown', (event) =>
		toggleClockType(event)
	);
	analogClockSpanToggle.addEventListener('click', (event) =>
		toggleClockType(event)
	);

	digitalClockSpanToggle.addEventListener('keydown', (event) =>
		toggleClockType(event)
	);
	digitalClockSpanToggle.addEventListener('click', (event) =>
		toggleClockType(event)
	);
});

document.addEventListener('keydown', (event) => {
	const showSettings = document.querySelector('.openSettings');
	if (event.key === 'Escape') showSettings.style.opacity = '1';
});
