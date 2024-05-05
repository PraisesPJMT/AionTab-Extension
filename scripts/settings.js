/**
 * This file contains functions related to the settings dialog and its related UI elements.
 * It exports the following functions: `openSettingsDialog` and `closeSettingsDialog`.
 *
 * @function openSettingsDialog function opens the settings dialog and changes the opacity of the "Open Settings" button.
 * @function closeSettingsDialog function closes the settings dialog and restores the opacity of the "Open Settings" button.
 *
 * @module settings
 */

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
