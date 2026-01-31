const saveButton = document.getElementById('save-tabs');
const copyButton = document.getElementById('copy-link');
const input = document.getElementById('session-link');

// Estado inicial
copyButton.disabled = true;

saveButton.addEventListener('click', async () => {
	try {
		const tabs = await chrome.tabs.query({ currentWindow: true });

		const urls = tabs
			.map((tab) => tab.url)
			.filter((url) => typeof url === 'string');

		input.value = JSON.stringify(urls);
		copyButton.disabled = false;
	} catch (error) {
		console.error('Error saving tabs:', error);
	}
});

copyButton.addEventListener('click', async () => {
	try {
		await navigator.clipboard.writeText(input.value);
		alert('Link copied to clipboard!');
	} catch (error) {
		console.error('Error copying link:', error);
		alert('Failed to copy the link. Please try again.');
	}
});
