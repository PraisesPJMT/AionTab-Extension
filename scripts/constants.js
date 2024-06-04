/**
 * This module exports constants used throughout the codebase.
 *
 * @module constants
 */

/**
 * The key for storing and retrieving the user's text
 * preference from local storage.
 *
 * @type {string}
 */
export const USER_SETTINGS = 'USER_SETTINGS';

/**
 * The key for storing and retrieving the user's text
 * preference from local storage.
 *
 * @type {string}
 */
export const USER_TEXT_OPT = 'USER_TEXT_OPT';

/**
 * The key for storing and retrieving the user's search engine
 * preference from local storage.
 *
 * @type {string}
 */
export const SEARCH_ENGINE_OPT = 'SEARCH_ENGINE_OPT';

/**
 * The key for storing and retrieving the user's text display
 * preference from local storage.
 *
 * @type {string}
 */
export const TEXT_DISPLAY_OPT = 'TEXT_DISPLAY_OPT';

/**
 * The key for storing and retrieving the user's AI Tools display
 * preference from local storage.
 *
 * @type {string}
 */
export const AI_TOOLS_DISPLAY_OPT = 'AI_TOOLS_DISPLAY_OPT';

/**
 * The key for storing and retrieving the user's bookmarks display
 * preference from local storage.
 *
 * @type {string}
 */
export const BOOKMARKS_DISPLAY_OPT = 'BOOKMARKS_DISPLAY_OPT';

/**
 * The key for storing and retrieving the user's clock display
 * preference from local storage.
 *
 * @type {string}
 */
export const CLOCK_DISPLAY_OPT = 'CLOCK_DISPLAY_OPT';

/**
 * The key for storing and retrieving the user's clock type
 * preference from local storage.
 *
 * @type {string}
 */
export const CLOCK_TYPE_OPT = 'CLOCK_TYPE_OPT';

/**
 * The key for selecting analog clock toggle element.
 *
 * @type {string}
 */
export const ANALOG_CLOCK_TOGGLE_ID = 'hiddenAnalogClockToggleInputContent';

/**
 * The key for selecting digital clock toggle element.
 *
 * @type {string}
 */
export const DIGITAL_CLOCK_TOGGLE_ID = 'hiddenDigitalClockToggleInputContent';

/**
 * The key for storing and retrieving the theme
 * preference from local storage.
 *
 * @type {string}
 */
export const THEME_OPT = 'THEME_OPT';

/**
 * The key for selecting dark theme toggle element.
 *
 * @type {string}
 */
export const DARK_THEME_TOGGLE_ID = 'hiddenDarkThemeToggleInputContent';

/**
 * The key for selecting light toggle element.
 *
 * @type {string}
 */
export const LIGHT_THEME_TOGGLE_ID = 'hiddenLightThemeToggleInputContent';

/**
 * The array for the months of the year.
 *
 * @type {array}
 */
export const MONTH_NAMES = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

/**
 * The array for the days of the year.
 *
 * @type {array}
 */
export const DAY_NAMES = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
];

export const DEFAULT_SETTINGS = {
	USER_TEXT_OPT: 'Edit this text...',
	SEARCH_ENGINE_OPT: 'google',
	THEME_OPT: true,
	TEXT_DISPLAY_OPT: true,
	BOOKMARKS_DISPLAY_OPT: true,
	AI_TOOLS_DISPLAY_OPT: true,
	CLOCK_DISPLAY_OPT: true,
	CLOCK_TYPE_OPT: false,
};
