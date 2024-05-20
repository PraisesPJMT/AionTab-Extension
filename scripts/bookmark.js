/**
 * This file contains the functionality related to bookmark actions.
 * It defines the bookmarkCLickAction function to toggle the visibility of bookmarks and animate the transition.
 *
 * @module bookmark
 */

const bookmarks = document.getElementById('markItems');

/**
 * Toggles the visibility of the bookmarks and animates the transition.
 *
 * @return {void} This function does not return a value.
 */
export const bookmarkCLickAction = () => {
	if (bookmarks.style.display === 'flex') {
		// Collape bookmarks
		bookmarks.style.opacity = '0.2';
		bookmarks.style.gap = '0';
		bookmarks.style.transform = 'translateX(-100%)';
		setTimeout(() => {
			bookmarks.style.display = 'none';
		}, 500);
	} else {
		// Extend bookmarks
		bookmarks.style.display = 'flex';
		setTimeout(() => {
			bookmarks.style.opacity = '1';
			bookmarks.style.transform = 'translateX(0)';
		}, 1);
		setTimeout(() => {
			bookmarks.style.gap = '2rem';
		}, 300);
	}
};
