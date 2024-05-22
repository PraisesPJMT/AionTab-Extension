import { USER_TEXT_OPT, SEARCH_ENGINE_OPT } from './scripts/constants.js';
import { updateClock } from './scripts/clock.js';
import { loadSearchEngine, performSearch } from './scripts/search.js';
import { updateText, applyText } from './scripts/text.js';
import { bookmarkCLickAction } from './scripts/bookmark.js';
import {
	closeSettingsDialog,
	loadSettings,
	openSettingsDialog,
	toggleTextDisplay,
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

	// Settings toggle elements
	const textDisplayToggle = document.getElementById('text-toggle');
	const textDisplaySpanToggle = document.getElementById(
		'hiddenTextToggleInputContent'
	);

	const aiToolsDisplayToggle = document.getElementById('text-toggle');

	showSettings.addEventListener('click', () => openSettingsDialog());

	closeSettings.addEventListener('click', () => closeSettingsDialog());

	// Add event listener for text display toggle
	textDisplayToggle.addEventListener('change', (event) =>
		toggleTextDisplay(event)
	);
	textDisplaySpanToggle.addEventListener('keydown', (event) =>
		toggleTextDisplay(event)
	);
});

document.addEventListener('keydown', (event) => {
	const showSettings = document.querySelector('.openSettings');
	if (event.key === 'Escape') showSettings.style.opacity = '1';
});
