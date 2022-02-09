export function valida(input) {
	const tipoDeInput = input.dataset.tipo;

	if (validadores[tipoDeInput]) {
		validadores[tipoDeInput](input);
	}

	if (input.valid) {
		input.parentElement.classList.remove('input-container--invalido');
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = '';
	} else {
		input.parentElement.classList.add('input-container--invalido');
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = '';
	}

    const mensagensDeErro = {
    nome:{
       valueMissing: 'o campo nome nao pode estar vazio',
    },
    email:{
        valueMissing: 'O campo de e-mail nao pode estar vazio',
        typeMismatch: ''
    },
    senha: {
        valueMissing: 'O campo de senha nao pode estar vazio',
        patternMismatch: 'A senha deve conter 6 a 12 caracteres, deve conter pelo menos letra maiúscula, um numero e nao deve conter símbolos.'
    },
    dataNascimento:{
        valueMissing: 'O campo de data de nascimento nao pode estar vazio.',
        customError: 'voce deve ser maior de 18 anos para se cadastrar.'
    }
              
}



const validadores = {
	dataNascimento: (input) => validaDataNascimento(input),
};

const dataNascimento = document.querySelector('#nascimento');

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
	const dataMais18 = new Date(
		data.getUTCFullYear() + 18,
		data.getUTCMonth(),
		data.getUTCDate()
	);

	return dataMais18 <= dataAtual;
}
