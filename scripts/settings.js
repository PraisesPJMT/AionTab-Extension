/**
 * This file contains functions related to the settings dialog and its related UI elements.
 * It exports the following functions: `openSettingsDialog` and `closeSettingsDialog`.
 *
 * @function openSettingsDialog function opens the settings dialog and changes the opacity of the "Open Settings" button.
 * @function closeSettingsDialog function closes the settings dialog and restores the opacity of the "Open Settings" button.
 *
 * @module settings
 */

import { TEXT_DISPLAY_OPT } from './constants.js';

const settingsDialog = document.getElementById('settingsDialog');
const showSettings = document.querySelector('.openSettings');
const closeSettings = document.querySelector('.closeSettings');

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
export const toggleTextDisplay = (event) => {
	const textDisplay = document.getElementById('text');
	const element = event.target.tagName.toLowerCase();

	/**
	 * Sets the localStorage item for displaying text to true,
	 * sets the display style of the text element to 'block',
	 * and loads the settings.
	 *
	 * @return {void} This function does not return anything.
	 */
	const displayText = () => {
		localStorage.setItem(TEXT_DISPLAY_OPT, true);
		textDisplay.style.display = 'block';
		loadSettings();
	};

	/**
	 * Removes the text by setting the TEXT_DISPLAY_OPT localStorage item to false,
	 * hiding the textDisplay element, and loading the settings.
	 *
	 * @return {void} This function does not return anything.
	 */
	const removeText = () => {
		localStorage.setItem(TEXT_DISPLAY_OPT, false);
		textDisplay.style.display = 'none';
		loadSettings();
	};

	if (element === 'input') {
		if (event.currentTarget.checked) {
			displayText();
		} else {
			removeText();
		}
	}

	if (element === 'span') {
		const labelElem = event.target.closest('label');
		const inputElement = labelElem.querySelector('input[type="checkbox"]');

		if (event.key === 'Enter') {
			if (inputElement.checked) {
				removeText();
			} else {
				displayText();
			}
		}
	}
};

/**
 * Loads the settings from local storage
 * - Updates the display of the text element based on the text display option.
 *
 * @return {void} This function does not return anything.
 */
export const loadSettings = () => {
	// Load text display option
	const textDisplayOpt = localStorage.getItem(TEXT_DISPLAY_OPT);

	if (textDisplayOpt) {
		const textDisplay = document.getElementById('text');
		const textDisplayToggle = document.getElementById('text-toggle');

		if (textDisplayOpt === 'true') {
			textDisplay.style.display = 'block';
			textDisplayToggle.checked = true;
		} else {
			textDisplay.style.display = 'none';
			textDisplayToggle.checked = false;
		}
	}
};
