/**
 * This file contains functions related to the settings dialog and its related UI elements.
 * It exports the following functions: `openSettingsDialog` and `closeSettingsDialog`.
 *
 * @function openSettingsDialog function opens the settings dialog and changes the opacity of the "Open Settings" button.
 * @function closeSettingsDialog function closes the settings dialog and restores the opacity of the "Open Settings" button.
 *
 * @module settings
 */

import {
	THEME_OPT,
	USER_SETTINGS,
	CLOCK_TYPE_OPT,
	TEXT_DISPLAY_OPT,
	DEFAULT_SETTINGS,
	CLOCK_DISPLAY_OPT,
	AI_TOOLS_DISPLAY_OPT,
	DARK_THEME_TOGGLE_ID,
	LIGHT_THEME_TOGGLE_ID,
	BOOKMARKS_DISPLAY_OPT,
	ANALOG_CLOCK_TOGGLE_ID,
	DIGITAL_CLOCK_TOGGLE_ID,
} from './constants.js';

const settingsDialog = document.getElementById('settingsDialog');
const showSettings = document.querySelector('.openSettings');

/**
 * Toggles the display of an item based on the state of an event.
 *
 * @param {Event} event - The event that triggered the toggle.
 * @param {Object} data - An object containing the item properties.
 * @param {string} data.itemID - The ID of the item to toggle.
 * @param {string} data.itemDisplay - The display style to set on the item.
 * @param {string} data.itemStorage - The key to set in localStorage.
 * @return {void} This function does not return a value.
 */
const toggleItemDisplay = (event, data) => {
	const { itemID, itemDisplay, itemStorage, itemSettingsTag } = data;
	const itemDisplayElement = document.getElementById(itemID);
	const element = event.target.tagName.toLowerCase();

	/**
	 * Sets a value in localStorage, updates the display style of an element, and loads settings.
	 *
	 * @param {Element} item - The element to update the display style of.
	 * @param {string} storage - The key to set in localStorage.
	 * @param {string} display - The display style to set on the element.
	 * @return {void} This function does not return a value.
	 */
	const displayItem = () => {
		let savedSettings = JSON.parse(localStorage.getItem(USER_SETTINGS));
		savedSettings = { ...savedSettings, [itemStorage]: true };
		localStorage.setItem(USER_SETTINGS, JSON.stringify(savedSettings));
		itemDisplayElement.style.display = itemDisplay;
		settings[itemSettingsTag]();
	};

	/**
	 * Removes an item from the local storage and updates its display style to 'none'.
	 *
	 * @param {Element} item - The element to be removed.
	 * @param {string} storage - The key in the local storage associated with the item.
	 * @return {void} This function does not return a value.
	 */
	const removeItem = () => {
		let savedSettings = JSON.parse(localStorage.getItem(USER_SETTINGS));
		savedSettings = { ...savedSettings, [itemStorage]: false };
		localStorage.setItem(USER_SETTINGS, JSON.stringify(savedSettings));
		itemDisplayElement.style.display = 'none';
		settings[itemSettingsTag]();
	};

	if (element === 'input') {
		if (event.currentTarget.checked) {
			displayItem();
		} else {
			removeItem();
		}
	}

	if (element === 'span') {
		const labelElem = event.target.closest('label');
		const inputElement = labelElem.querySelector('input[type="checkbox"]');

		if (event.key === 'Enter') {
			if (inputElement.checked) {
				removeItem();
			} else {
				displayItem();
			}
		}
	}
};

/**
 * Opens the settings dialog and hides the "Open Settings" button.
 *
 * @return {void} This function does not return a value.
 */
export const openSettingsDialog = () => {
	settingsDialog.showModal();
	showSettings.style.opacity = '0';
};

/**
 * Closes the settings dialog and restores the opacity of the "Open Settings" button.
 *
 * @return {void} This function does not return a value.
 */
export const closeSettingsDialog = () => {
	settingsDialog.close();
	showSettings.style.opacity = '1';
};

/**
 * Toggles the display of the 'text' element based on the state of the checkbox.
 *
 * @param {Event} event - The event object triggered by the checkbox change.
 * @return {void} This function does not return anything.
 */
export const toggleTextDisplay = (event) =>
	toggleItemDisplay(event, {
		itemID: 'text',
		itemDisplay: 'block',
		itemStorage: TEXT_DISPLAY_OPT,
		itemSettingsTag: 'loadTextSettings',
	});

/**
 * Toggles the display of the 'ai' element based on the state of the checkbox.
 *
 * @param {Event} event - The event object triggered by the checkbox change.
 * @return {void} This function does not return anything.
 */
export const toggleAIToolsDisplay = (event) =>
	toggleItemDisplay(event, {
		itemID: 'ai',
		itemDisplay: 'flex',
		itemStorage: AI_TOOLS_DISPLAY_OPT,
		itemSettingsTag: 'loadAIToolsSettings',
	});

/**
 * Toggles the display of the 'bookmarks' element based on the state of the checkbox.
 *
 * @param {Event} event - The event object triggered by the checkbox change.
 * @return {void} This function does not return anything.
 */
export const toggleBookmarksDisplay = (event) =>
	toggleItemDisplay(event, {
		itemID: 'bookmarks',
		itemDisplay: 'flex',
		itemStorage: BOOKMARKS_DISPLAY_OPT,
		itemSettingsTag: 'loadBookmarksSettings',
	});

/**
 * Toggles the display of the 'clock' element based on the state of the event.
 *
 * @param {Event} event - The event object triggered by the checkbox change.
 * @return {void} This function does not return anything.
 */
export const toggleClockDisplay = (event) =>
	toggleItemDisplay(event, {
		itemID: 'clock',
		itemDisplay: 'flex',
		itemStorage: CLOCK_DISPLAY_OPT,
		itemSettingsTag: 'loadClockDisplaySettings',
	});

/**
 * Toggles the type of 'clock' element (analog or digital) displayed.
 *
 * @param {Event} event - The event object triggered by the checkbox change.
 * @return {void} This function does not return anything.
 */
export const toggleClockType = (event) => {
	let savedSettings = JSON.parse(localStorage.getItem(USER_SETTINGS));
	if (!savedSettings[CLOCK_DISPLAY_OPT]) return;

	const analogClock = document.querySelector('.analog-clock');
	const digitalClock = document.querySelector('.digital-clock');
	const targetID = event.target.id;

	const displayAnalogClock = () => {
		let savedSettings = JSON.parse(localStorage.getItem(USER_SETTINGS));
		savedSettings = { ...savedSettings, [CLOCK_TYPE_OPT]: false };
		localStorage.setItem(USER_SETTINGS, JSON.stringify(savedSettings));
		analogClock.style.display = 'block';
		digitalClock.style.display = 'none';
		settings['loadClockSettings']();
	};

	const displayDigitalClock = () => {
		let savedSettings = JSON.parse(localStorage.getItem(USER_SETTINGS));
		savedSettings = { ...savedSettings, [CLOCK_TYPE_OPT]: true };
		localStorage.setItem(USER_SETTINGS, JSON.stringify(savedSettings));
		analogClock.style.display = 'none';
		digitalClock.style.display = 'flex';
		settings['loadClockSettings']();
	};

	if (
		targetID === ANALOG_CLOCK_TOGGLE_ID ||
		(event.key === 'Enter' && targetID === ANALOG_CLOCK_TOGGLE_ID)
	) {
		displayAnalogClock();
	}

	if (
		targetID === DIGITAL_CLOCK_TOGGLE_ID ||
		(event.key === 'Enter' && targetID === DIGITAL_CLOCK_TOGGLE_ID)
	) {
		displayDigitalClock();
	}
};

/**
 * Toggles the theme of the web page based on the state of the checkbox.
 *
 * @param {Event} event - The event object triggered by the checkbox change.
 * @return {void} This function does not return anything.
 */
export const toggleTheme = (event) => {
	const tabBody = document.getElementById('main');
	const targetID = event.target.id;

	/**
	 * Sets the theme to dark and updates the local storage and settings.
	 *
	 * @return {void} This function does not return anything.
	 */
	const selectDarkTheme = () => {
		let savedSettings = JSON.parse(localStorage.getItem(USER_SETTINGS));
		savedSettings = { ...savedSettings, [THEME_OPT]: false };
		localStorage.setItem(USER_SETTINGS, JSON.stringify(savedSettings));
		tabBody.className = 'dark';
		settings['loadThemeSettings']();
	};

	/**
	 * Sets the theme to light and updates the local storage and settings.
	 *
	 * @return {void} This function does not return anything.
	 */
	const selectLightTheme = () => {
		let savedSettings = JSON.parse(localStorage.getItem(USER_SETTINGS));
		savedSettings = { ...savedSettings, [THEME_OPT]: true };
		localStorage.setItem(USER_SETTINGS, JSON.stringify(savedSettings));
		tabBody.className = 'light';
		settings['loadThemeSettings']();
	};

	if (
		targetID === DARK_THEME_TOGGLE_ID ||
		(event.key === 'Enter' && targetID === DARK_THEME_TOGGLE_ID)
	) {
		selectDarkTheme();
	}

	if (
		targetID === LIGHT_THEME_TOGGLE_ID ||
		(event.key === 'Enter' && targetID === LIGHT_THEME_TOGGLE_ID)
	) {
		selectLightTheme();
	}
};

const loadItemSettings = (itemData) => {
	const { itemID, itemToggle, itemDisplay, itemStorage } = itemData;
	let savedSettings = JSON.parse(localStorage.getItem(USER_SETTINGS));

	const itemDisplayOpt = savedSettings[itemStorage];

	const itemDisplayElement = document.getElementById(itemID);
	const itemDisplayToggle = document.getElementById(itemToggle);

	if (itemDisplayOpt) {
		itemDisplayElement.style.display = itemDisplay;
		itemDisplayToggle.checked = true;
	} else {
		itemDisplayElement.style.display = 'none';
		itemDisplayToggle.checked = false;
	}
};

export const settings = {
	loadTextSettings: () =>
		loadItemSettings({
			itemID: 'text',
			itemToggle: 'text-toggle',
			itemDisplay: 'block',
			itemStorage: TEXT_DISPLAY_OPT,
		}),

	loadAIToolsSettings: () =>
		loadItemSettings({
			itemID: 'ai',
			itemToggle: 'ai-tools-toggle',
			itemDisplay: 'flex',
			itemStorage: AI_TOOLS_DISPLAY_OPT,
		}),

	loadBookmarksSettings: () =>
		loadItemSettings({
			itemID: 'bookmarks',
			itemToggle: 'bookmarks-toggle',
			itemDisplay: 'flex',
			itemStorage: BOOKMARKS_DISPLAY_OPT,
		}),

	loadClockDisplaySettings: () =>
		loadItemSettings({
			itemID: 'clock',
			itemToggle: 'clock-toggle',
			itemDisplay: 'flex',
			itemStorage: CLOCK_DISPLAY_OPT,
		}),

	loadClockSettings: () => {
		let savedSettings = JSON.parse(localStorage.getItem(USER_SETTINGS));
		const clockTypeOpt = savedSettings[CLOCK_TYPE_OPT];
		const clockDisplayOpt = savedSettings[CLOCK_DISPLAY_OPT];

		const analogClock = document.querySelector('.analog-clock');
		const digitalClock = document.querySelector('.digital-clock');
		const clockTypeToggle = document.getElementById('clock-select');

		if (!clockDisplayOpt) {
			clockTypeToggle.disabled = true;
		} else {
			clockTypeToggle.disabled = false;
		}

		if (clockTypeOpt) {
			analogClock.style.display = 'none';
			digitalClock.style.display = 'flex';
			clockTypeToggle.checked = true;
		}

		if (!clockTypeOpt) {
			analogClock.style.display = 'block';
			digitalClock.style.display = 'none';
			clockTypeToggle.checked = false;
		}
	},

	loadThemeSettings: () => {
		let savedSettings = JSON.parse(localStorage.getItem(USER_SETTINGS));
		const themeOpt = savedSettings[THEME_OPT];
		const themeToggle = document.getElementById('theme-select');

		const tabBody = document.getElementById('main');

		if (themeOpt === false) {
			tabBody.className = 'dark';
			themeToggle.checked = false;
		} else {
			tabBody.className = 'light';
			themeToggle.checked = true;
		}
	},
};

export const loadAllSettings = () => {
	let savedSettings = JSON.parse(localStorage.getItem(USER_SETTINGS));
	savedSettings = savedSettings
		? { ...savedSettings }
		: { ...DEFAULT_SETTINGS };
	localStorage.setItem(USER_SETTINGS, JSON.stringify(savedSettings));

	settings.loadTextSettings();
	settings.loadAIToolsSettings();
	settings.loadBookmarksSettings();
	settings.loadClockDisplaySettings();
	settings.loadClockSettings();
	settings.loadThemeSettings();
};
