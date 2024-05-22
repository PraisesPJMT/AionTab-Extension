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
	CLOCK_TYPE_OPT,
	TEXT_DISPLAY_OPT,
	CLOCK_DISPLAY_OPT,
	AI_TOOLS_DISPLAY_OPT,
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
	const { itemID, itemDisplay, itemStorage } = data;
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
		localStorage.setItem(itemStorage, true);
		itemDisplayElement.style.display = itemDisplay;
		loadSettings();
	};

	/**
	 * Removes an item from the local storage and updates its display style to 'none'.
	 *
	 * @param {Element} item - The element to be removed.
	 * @param {string} storage - The key in the local storage associated with the item.
	 * @return {void} This function does not return a value.
	 */
	const removeItem = () => {
		localStorage.setItem(itemStorage, false);
		itemDisplayElement.style.display = 'none';
		loadSettings();
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
	});

/**
 * Toggles the type of 'clock' element (analog or digital) displayed.
 *
 * @param {Event} event - The event object triggered by the checkbox change.
 * @return {void} This function does not return anything.
 */
export const toggleClockType = (event) => {
	if (localStorage.getItem(CLOCK_DISPLAY_OPT) === 'false') return;

	const analogClock = document.querySelector('.analog-clock');
	const digitalClock = document.querySelector('.digital-clock');
	const targetID = event.target.id;

	const displayAnalogClock = () => {
		localStorage.setItem(CLOCK_TYPE_OPT, false);
		analogClock.style.display = 'block';
		digitalClock.style.display = 'none';
		loadSettings();
	};

	const displayDigitalClock = () => {
		localStorage.setItem(CLOCK_TYPE_OPT, true);
		analogClock.style.display = 'none';
		digitalClock.style.display = 'flex';
		loadSettings();
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
 * Loads the settings from local storage
 * - Updates the display of the text element based on the text display option.
 *
 * @return {void} This function does not return anything.
 */
export const loadSettings = () => {
	/**
	 * Loads the settings for a given item from local storage and updates its display style accordingly.
	 *
	 * @param {Object} itemData - An object containing the item properties.
	 * @param {string} itemData.itemID - The ID of the item to load settings for.
	 * @param {string} itemData.itemToggle - The ID of the toggle element associated with the item.
	 * @param {string} itemData.itemDisplay - The display style to set on the item.
	 * @param {string} itemData.itemStorage - The key to set in localStorage.
	 * @return {void} This function does not return a value.
	 */
	const loadItemSettings = (itemData) => {
		const { itemID, itemToggle, itemDisplay, itemStorage } = itemData;
		const itemDisplayOpt = localStorage.getItem(itemStorage);

		if (itemDisplayOpt) {
			const itemDisplayElement = document.getElementById(itemID);
			const itemDisplayToggle = document.getElementById(itemToggle);

			if (itemDisplayOpt === 'true') {
				itemDisplayElement.style.display = itemDisplay;
				itemDisplayToggle.checked = true;
			} else {
				itemDisplayElement.style.display = 'none';
				itemDisplayToggle.checked = false;
			}
		}
	};

	// Load text display option
	loadItemSettings({
		itemID: 'text',
		itemToggle: 'text-toggle',
		itemDisplay: 'block',
		itemStorage: TEXT_DISPLAY_OPT,
	});

	// Load AI Tools display option
	loadItemSettings({
		itemID: 'ai',
		itemToggle: 'ai-tools-toggle',
		itemDisplay: 'flex',
		itemStorage: AI_TOOLS_DISPLAY_OPT,
	});

	// Load bookmarks display option
	loadItemSettings({
		itemID: 'bookmarks',
		itemToggle: 'bookmarks-toggle',
		itemDisplay: 'flex',
		itemStorage: BOOKMARKS_DISPLAY_OPT,
	});

	// Load clock display option
	loadItemSettings({
		itemID: 'clock',
		itemToggle: 'clock-toggle',
		itemDisplay: 'flex',
		itemStorage: CLOCK_DISPLAY_OPT,
	});

	// Load clock type option
	const clockTypeOpt = localStorage.getItem(CLOCK_TYPE_OPT);
	const clockDisplayOpt = localStorage.getItem(CLOCK_DISPLAY_OPT);

	const analogClock = document.querySelector('.analog-clock');
	const digitalClock = document.querySelector('.digital-clock');
	const clockTypeToggle = document.getElementById('clock-select');

	if (clockDisplayOpt === 'false') {
		clockTypeToggle.disabled = true;
	} else {
		clockTypeToggle.disabled = false;
	}

	if (clockTypeOpt === 'true') {
		analogClock.style.display = 'none';
		digitalClock.style.display = 'flex';
		clockTypeToggle.checked = true;
	}

	if (clockTypeOpt === 'false') {
		analogClock.style.display = 'block';
		digitalClock.style.display = 'none';
		clockTypeToggle.checked = false;
	}
};
