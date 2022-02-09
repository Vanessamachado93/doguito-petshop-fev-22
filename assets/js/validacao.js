const validaDataNascimento = document.querySelector('#nascimento');
dataNascimento.addEventListener('blur', (evento) => {
	validaDataNascimento(evento.target);
});

function validaDataNascimento(input) {
	const dataRecebida = new Date(input.value);
	let mensagem = '';

	if (!maiorQue18(dataRecebida)) {
		mensagem = 'Voce deve ser maior que 18 anos para se cadastrar';
	}

	input.setCustomValidity(mensagem);
}

function maiorQue18(data) {
	const dataAtual = new Date();
	const daMais18 = new Date(
		data.getUTCFullYear() + 18,
		getUTCMonth(),
		data.getUTCDate()
	);

	return dataMais18 <= dataAtual;
}
