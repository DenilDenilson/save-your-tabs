console.log('🔥 Content script cargado');

window.addEventListener('message', (e) => {
	if (e.source !== window) return;

	if (e.data.type === 'OPEN_SESSION') {
		console.log('OPEN_SESSION launched');
		chrome.runtime.sendMessage({
			type: 'OPEN_SESSION',
			id: e.data.id,
		});
	}
});
