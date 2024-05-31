import { updateClock } from './clock.js';
import { updateText, loadText } from './text.js';
import { SEARCH_ENGINE_OPT } from './constants.js';
import { bookmarkCLickAction } from './bookmark.js';
import { loadSearchEngine, performSearch } from './search.js';
import {
	loadSettings,
	openSettingsDialog,
	closeSettingsDialog,
	toggleTheme,
	toggleClockType,
	toggleTextDisplay,
	toggleClockDisplay,
	toggleAIToolsDisplay,
	toggleBookmarksDisplay,
} from './settings.js';

// DOM Load Actions
document.addEventListener('DOMContentLoaded', () => {
	/* Tab initialization */
	loadText();
	updateClock();
	loadSettings();
	loadSearchEngine();

	/* Clock Actions */
	// Periodic clock Update
	setInterval(updateClock, 1000);

	/* Text Actions */
	const userTextDiv = document.getElementById('textDisplay');

	// Add event listener for text input
	userTextDiv.addEventListener('input', () => updateText());

	/* Bookmarks Actions */
	const bookmarkBtn = document.getElementById('bookmarkBtn');

	// Add event listener for bookmark button
	bookmarkBtn.onclick = () => bookmarkCLickAction();

	/* Search Actions */
	const searchForm = document.getElementById('searchForm');
	const searchInput = document.getElementById('searchInput');
	const searchOptions = document.getElementById('searchEngine');
	const searchLabels = searchOptions.querySelectorAll('label[for]');
	const searchEngineRadios = document.getElementsByName('searchEngine');

	// Add event listener for radio buttons
	for (const radio of searchEngineRadios) {
		radio.addEventListener('change', () => {
			localStorage.setItem(SEARCH_ENGINE_OPT, radio.value);
		});
	}

	// Add event listener for label when using keyboard
	for (const label of searchLabels) {
		label.addEventListener('keydown', (event) => {
			if (event.key === 'Enter') {
				const radioInput = label.querySelector('input[type="radio"]');
				radioInput.checked = true;
			}
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
	const showSettings = document.querySelector('.openSettings');
	const closeSettings = document.querySelector('.closeSettings');

	// Add event listener for settings button
	showSettings.addEventListener('click', () => openSettingsDialog());

	// Add event listener for close settings button
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

	// Add event listener for theme toggle
	const themeToggle = document.getElementById('theme-select');
	const darkThemeSpanToggle = document.getElementById(
		'hiddenDarkThemeToggleInputContent'
	);
	const lightThemeSpanToggle = document.getElementById(
		'hiddenLightThemeToggleInputContent'
	);

	themeToggle.addEventListener('click', (event) => event.preventDefault());
	themeToggle.addEventListener('change', (event) => event.preventDefault());

	darkThemeSpanToggle.addEventListener('keydown', (event) =>
		toggleTheme(event)
	);
	darkThemeSpanToggle.addEventListener('click', (event) => toggleTheme(event));

	lightThemeSpanToggle.addEventListener('keydown', (event) =>
		toggleTheme(event)
	);
	lightThemeSpanToggle.addEventListener('click', (event) => toggleTheme(event));
});

document.addEventListener('keydown', (event) => {
	const showSettings = document.querySelector('.openSettings');
	if (event.key === 'Escape') showSettings.style.opacity = '1';
});
