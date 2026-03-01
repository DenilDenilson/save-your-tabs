const saveButton = document.getElementById('save-tabs');
const copyButton = document.getElementById('copy-link');
const input = document.getElementById('session-link');

// Estado inicial
copyButton.disabled = true;

const baseBackendUrl = 'https://save-your-tabs.vercel.app/';
const baseWebUrl = 'https://syt.denil.org';

saveButton.addEventListener('click', async () => {
	try {
		const tabs = await chrome.tabs.query({ currentWindow: true });

		const urls = tabs
			.map((tab) => tab.url)
			.filter((url) => typeof url === 'string');

		// Enviar al backend
		const response = await fetch(`${baseBackendUrl}/api/save`, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify({ urls }),
		});

		if (!response.ok) {
			throw new Error('Backend error');
		}
		const data = await response.json();
		const sessionLink = `${baseWebUrl}/${data.id}`;

		input.value = sessionLink;
		copyButton.disabled = false;
	} catch (error) {
		input.value = error.message;
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
