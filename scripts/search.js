/**
 * This file contains functions related to search operations.
 * It exports the following functions: `performSearch`, `loadSearchEngine`, and `getSearchUrl`.
 *
 * @function performSearch - Performs a search operation based on the selected search engine and search input.
 * @function loadSearchEngine - Loads the search engine option based on the saved search engine value.
 * @function getSearchUrl - Returns the search URL based on the given search engine and query.
 *
 * @module search
 */

import { SEARCH_ENGINE_OPT, USER_SETTINGS } from './constants.js';

const searchEngineRadios = document.getElementsByName('searchEngine');

/**
 * Returns the search URL based on the given search engine and query.
 *
 * @param {string} engine - The search engine to use. Can be 'google', 'bing', 'brave', 'duckduckgo', or 'youtube'.
 * @param {string} query - The search query.
 * @return {string} The search URL.
 */
const getSearchUrl = (engine, query) => {
	switch (engine) {
		case 'google':
			return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
		case 'bing':
			return `https://www.bing.com/search?q=${encodeURIComponent(query)}`;
		case 'brave':
			return `https://search.brave.com/search?q=${encodeURIComponent(query)}`;
		case 'duckduckgo':
			return `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
		case 'youtube':
			return `https://www.youtube.com/results?search_query=${encodeURIComponent(
				query
			)}`;
		default:
			return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
	}
};

/**
 * Performs a search operation based on the selected search engine and search input.
 *
 * @return {void} N/A
 */
export const performSearch = () => {
	const searchEngine = document.querySelector(
		'input[name="searchEngine"]:checked'
	).value;
	const searchInput = document.getElementById('searchInput').value;
	const searchUrl = getSearchUrl(searchEngine, searchInput);
	window.location.href = searchUrl;
};

/**
 * Loads the search engine option based on the saved search engine value.
 *
 * @return {void} N/A
 */
export const loadSearchEngine = () => {
	let settings = JSON.parse(localStorage.getItem(USER_SETTINGS));

	const savedSearchEngine = settings[SEARCH_ENGINE_OPT];

	if (savedSearchEngine) {
		for (const radio of searchEngineRadios) {
			if (radio.value === savedSearchEngine) {
				radio.checked = true;
				break;
			}
		}
	}
};
