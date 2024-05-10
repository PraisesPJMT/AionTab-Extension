/**
 * This module contains functions for updating the analog and digital clocks with the current time.
 *
 * @module clock
 */

/**
 * Updates the analog and digital clocks with the current time.
 *
 * @return {void} This function does not return a value.
 */
export const updateClock = () => {
	// Analog elements
	const secondHand = document.querySelector('.second-hand');
	const minsHand = document.querySelector('.min-hand');
	const hourHand = document.querySelector('.hour-hand');

	// Digital elements
	const secondDigit = document.querySelector('.seconds');
	const minsDigit = document.querySelector('.minutes');
	const hourDigit = document.querySelector('.hour');

	/**
	 * Updates the 'data' attribute of each element in the 'elems' array with the
	 * corresponding value from the 'data' array.
	 *
	 * @param {Element[]} elems - The array of elements to update.
	 * @param {string[]} data - The array of values to update the 'data' attribute with.
	 * @return {void} This function does not return a value.
	 */
	const updateValues = (elems, data) => {
		elems.forEach((elem, index) => elem.setAttribute('data', data[index]));
	};

	/**
	 * Returns the current date.
	 *
	 * @return {Date} The current date.
	 */
	const getCurrentDate = () => new Date();

	// Get the current time
	const currentDate = getCurrentDate();

	// Get the current time values
	const seconds = currentDate.getSeconds();
	const mins = currentDate.getMinutes();
	const hours = currentDate.getHours();

	// Get the corresponding time values as strings
	const secondsStr = seconds.toString();
	const minsStr = mins.toString();
	const hoursStr = hours.toString();

	// Update the analog clock hands
	secondHand.style.transform = `rotate(${(seconds / 60) * 360}deg)`;
	minsHand.style.transform = `rotate(${(mins / 60) * 360}deg)`;
	hourHand.style.transform = `rotate(${(hours / 12) * 360}deg)`;

	// Update the digital clock values
	updateValues([secondDigit, minsDigit, hourDigit], [secondsStr, minsStr, hoursStr]);
};

