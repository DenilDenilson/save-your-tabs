const input = document.querySelector('#session-link');
const button = document.querySelector('#open-btn');
const pstatus = document.querySelector('#status');

function getSessionCodeFromUrl() {
	const parts = window.location.pathname.split('/');
	const pathnameCode = parts[1];
	if (pathnameCode) {
		return pathnameCode;
	}
	
	// Para algun futuro:
	const params = new URLSearchParams(window.location.search);
	const queryCode = params.get('session');
	if (queryCode) {
		return queryCode;
	}

	const hashCode = window.location.hash.slice(1);
	if (hashCode) {
		return hashCode;
	}

	return '';
}

function setStatus(message) {
	if (pstatus) {
		pstatus.textContent = message;
	}
}

const sessionCodeFromUrl = getSessionCodeFromUrl();
if (input && sessionCodeFromUrl) {
	input.value = sessionCodeFromUrl;
}

if (button) {
	button.addEventListener('click', () => {
		if (!input) {
			setStatus('No se encontró el campo de sesión');
			return;
		}

		const link = input.value.trim();
		if (!link) {
			setStatus('Ingrese un link o código válido');
			return;
		}

		// Permite pegar un link completo o solo el código de sesión.
		const sessionId = link.split('/').filter(Boolean).pop();
		if (!sessionId) {
			setStatus('Link inválido');
			return;
		}

		window.postMessage(
			{
				type: 'OPEN_SESSION',
				id: sessionId,
			},
			'*',
		);

		setStatus('Intentando abrir con la extensión ...');
	});
}
