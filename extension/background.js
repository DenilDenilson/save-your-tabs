const baseBackendUrl = 'http://localhost:3000';

chrome.runtime.onMessage.addListener(async (message) => {
	if (message.type === 'OPEN_SESSION') {
		// console.log('En bg.js recibido un OPEN_SESSION');
		const response = await fetch(`${baseBackendUrl}/api/resolve/${message.id}`);
		const data = await response.json();

		for (const url of data.urls) {
			chrome.tabs.create({ url });
		}
	}
});
