const input = document.querySelector('#session-link');
const button = document.querySelector('#open-btn');
const pstatus = document.querySelector('#status');

button.addEventListener('click', () => {
	const link = input.value.trim();
	if (!link) {
		pstatus.textContent = 'Ingrese un link válido';
		return;
	}

	// Extraer ID
	const sessionId = link.split('/').pop();
	if (!sessionId) {
		pstatus.textContent = 'Link inválido';
		return;
	}

	// Enviar mensaje
	window.postMessage(
		{
			type: 'OPEN_SESSION',
			id: sessionId,
		},
		'*',
	);

	pstatus.textContent = 'Intentando abrir con la extensión ...';
});
