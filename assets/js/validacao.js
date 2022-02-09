export function valida(input) {
	const tipoDeInput = input.dataset.tipo;

	if (validadores[tipoDeInput]) {
		validadores[tipoDeInput](input);
	}

	if (input.validity.valid) {
		input.parentElement.classList.remove('input-container--invalido');
		input.parentElement.querySelector('.input-mensagem-erro').innerHTML = '';
	} else {
		input.parentElement.classList.add('input-container--invalido');
		input.parentElement.querySelector('.input-mensagem-erro').innerHTML =
			mostraMensagemErro(tipoDeInput, input);
	}

	const tiposDeErro = [
		'valueMissing',
		'typeMismatch',
		'patternMismatch',
		'customError',
	];

	const mensagensDeErro = {
		nome: {
			valueMissing: 'o campo nome nao pode estar vazio',
		},
		email: {
			valueMissing: 'O campo de e-mail nao pode estar vazio',
			typeMismatch: '',
		},
		senha: {
			valueMissing: 'O campo de senha nao pode estar vazio',
			patternMismatch:
				'A senha deve conter 6 a 12 caracteres, deve conter pelo menos letra maiúscula, um numero e nao deve conter símbolos.',
		},
		dataNascimento: {
			valueMissing: 'O campo de data de nascimento nao pode estar vazio.',
			customError: 'voce deve ser maior de 18 anos para se cadastrar.',
		},
	};

	const validadores = {
		dataNascimento: (input) => validaDataNascimento(input),
	};

	function mostraMensagemErro(tipoDeInput, input) {
		let mensagem = '';
		tiposDeErro.forEach((erro) => {
			if (input.validity[erro]) {
				mensagem = mensagensDeErro[tipoDeInput][erro];
			}
		});

		return mensagem;
	}

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
		const dataMais18 = new Date(
			data.getUTCFullYear() + 18,
			data.getUTCMonth(),
			data.getUTCDate()
		);

		return dataMais18 <= dataAtual;
	}

	function validaCPF(input) {
		const cpfFormatado = input.value.replace(/\D/g, '');
		let mensagem = '';

		if (!checaCPFRepetido(cpfFormatado)) {
			mensagem = 'O CPF digitado não é válido';
		}

		input.setCustomValidity(mensagem);
	}

	function checaCPFRepetido(CPF) {
		const valoresRepetidos = [
			'00000000000',
			'11111111111',
			'22222222222',
			'33333333333',
			'44444444444',
			'55555555555',
			'66666666666',
			'77777777777',
			'88888888888',
			'99999999999',
		];

		let cpfValido = true;

		valoresRepetidos.forEach((valor) => {
			if (valor == CPF) {
				cpfValido = false;
			}
		});

		return cpfValido;
	}
}
