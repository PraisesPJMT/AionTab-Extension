/**
 * This file contains functions related to user custom text.
 * It exports the following functions: `applyText`, and `updateText`.
 *
 * @function applyText - Applies the stored user text to the 'textDisplay' element if it exists.
 * @function updateText - Updates the text content of the 'textDisplay' element and stores it in the local storage.
 *
 * @module search
 */

import { USER_TEXT_OPT } from './constants.js';

/**
 * Applies the stored user text to the 'textDisplay' element if it exists.
 *
 * @return {void} This function does not return anything.
 */
export const applyText = () => {
	const userTextDiv = document.getElementById('textDisplay');
	const storedValue = localStorage.getItem(USER_TEXT_OPT);

	if (storedValue) {
		userTextDiv.textContent = storedValue;
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
	localStorage.setItem(USER_TEXT_OPT, userTextDiv.textContent);
};
