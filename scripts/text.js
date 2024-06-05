/**
 * This file contains functions related to user custom text.
 * It exports the following functions: `loadText`, and `updateText`.
 *
 * @function loadText - Applies the stored user text to the 'textDisplay' element if it exists.
 * @function updateText - Updates the text content of the 'textDisplay' element and stores it in the local storage.
 *
 * @module search
 */

import { USER_TEXT_OPT, USER_SETTINGS } from './constants.js';

/**
 * Applies the stored user text to the 'textDisplay' element if it exists.
 *
 * @return {void} This function does not return anything.
 */
export const loadText = () => {
	const userTextDiv = document.getElementById('textDisplay');
	const settings = JSON.parse(localStorage.getItem(USER_SETTINGS));

	if (settings[USER_TEXT_OPT]) {
		userTextDiv.textContent = settings[USER_TEXT_OPT];
	}
};

/**
 * Updates the text content of the 'textDisplay' element and
 * stores it in the local storage.
 *
 * @return {void} This function does not return anything.
 */
export const updateText = () => {
	const userTextDiv = document.getElementById('textDisplay');
	let savedSettings = JSON.parse(localStorage.getItem(USER_SETTINGS));
	savedSettings = {
		...savedSettings,
		[USER_TEXT_OPT]: userTextDiv.textContent,
	};

	localStorage.setItem(USER_SETTINGS, JSON.stringify(savedSettings));
};
