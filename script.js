// DOM Load Actions
document.addEventListener('DOMContentLoaded', () => {
	// Periodic Analog clock Update
	setInterval(updateClock, 1000);
	updateClock();

	// DOM Elements
	const searchForm = document.getElementById('searchForm');
	const searchInput = document.getElementById('searchInput');
	const searchEngineRadios = document.getElementsByName('searchEngine');

	// Stored previous search option
	const savedSearchEngine = localStorage.getItem('searchEngine');

	// Update previous search engine option
	if (savedSearchEngine) {
		for (const radio of searchEngineRadios) {
			if (radio.value === savedSearchEngine) {
				radio.checked = true;
				break;
			}
		}
	}

	// Add event listener for radio buttons
	for (const radio of searchEngineRadios) {
		radio.addEventListener('change', () => {
			localStorage.setItem('searchEngine', radio.value);
		});
	}

	// Add event listener for search form submission
	searchForm.addEventListener('submit', (event) => {
		event.preventDefault();
		if (searchInput.value.length > 0) performSearch();
	});

	// Add event listener for Enter key press in search input
	searchInput.addEventListener('keypress', (event) => {
		if (event.key === 'Enter' && searchInput.value.length > 0) performSearch();
	});
});

// Function to perform search
const performSearch = () => {
	const searchEngine = document.querySelector(
		'input[name="searchEngine"]:checked'
	).value;
	const searchInput = document.getElementById('searchInput').value;
	const searchUrl = getSearchUrl(searchEngine, searchInput);
	window.location.href = searchUrl;
};

// Update Analog Clock
const updateClock = () => {
	// Analog elements
	const secondHand = document.querySelector('.second-hand');
	const minsHand = document.querySelector('.min-hand');
	const hourHand = document.querySelector('.hour-hand');

	// Digital Elements
	const secondDigit = document.querySelector('.seconds');
	const minsDigit = document.querySelector('.minutes');
	const hourDigit = document.querySelector('.hour');

	const updateValues = (elems, data) => {
		elems.forEach((elem, index) => elem.setAttribute('data', data[index]));
	};

	const now = new Date();

	const seconds = now.getSeconds();
	const secondsDegrees = (seconds / 60) * 360 + 90;
	secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
	updateValues(
		secondDigit.querySelectorAll('.digits'),
		String(seconds).padStart(2, '0')
	);

	const mins = now.getMinutes();
	const minsDegrees = (mins / 60) * 360 + (seconds / 60) * 6 + 90;
	minsHand.style.transform = `rotate(${minsDegrees}deg)`;
	updateValues(
		minsDigit.querySelectorAll('.digits'),
		String(mins).padStart(2, '0')
	);

	const hour = now.getHours();
	const hourDegrees = (hour / 12) * 360 + (mins / 60) * 30 + 90;
	hourHand.style.transform = `rotate(${hourDegrees}deg)`;
	updateValues(
		hourDigit.querySelectorAll('.digits'),
		String(hour).padStart(2, '0')
	);

	const dayOfWeek = now.getDay();

	// Get the day of the month (1 - 31)
	const dayOfMonth = now.getDate();

	// Get the month (0 = January, 1 = February, ..., 11 = December)
	const month = now.getMonth();

	// Define an array of month names
	const monthNames = [
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

	// Get the name of the month using the array
	const monthName = monthNames[month];

	// Define an array of day names
	const dayNames = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	];

	// Get the name of the day using the array
	const dayName = dayNames[dayOfWeek];
	const dateElems = document.querySelectorAll('.date');
	if (dateElems) {
		dateElems.forEach(
			(dateElem) =>
				(dateElem.innerText = `${dayName.substring(
					0,
					3
				)} | ${monthName.substring(0, 3)} ${dayOfMonth}`)
		);
	}
};

// Generate Search URL
const getSearchUrl = (engine, query) => {
	switch (engine) {
		case 'google':
			return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
		case 'bing':
			return `https://www.bing.com/search?q=${encodeURIComponent(query)}`;
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

// User Text Actions
const userTextDiv = document.getElementById('textDisplay');
const storedValue = localStorage.getItem('userText');

if (storedValue) {
	userTextDiv.textContent = storedValue;
}

userTextDiv.addEventListener('input', () => {
	localStorage.setItem('userText', userTextDiv.textContent);
});

// Bookmark Actions
const bookmarks = document.getElementById('markItems');
const bookmarkBtn = document.getElementById('bookmarkBtn');
bookmarkBtn.onclick = () => {
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
