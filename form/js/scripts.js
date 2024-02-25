class Validar {

    constructor(){
        //Lista de validações suportadas 
        this.validacoes = [
            'data-reqired', // A sequência das exigências alteram a resposta 
            'data-min-length',
            'data-max-length',
            'data-email-validate',
        ]
    }

    // Método para iniciar a validação de todos os campos do formulário
    validacao(formulario){
        
        // Resgata todas as validaçãoes
        let validacaoAtual = document.querySelectorAll('form .error-validation');

        if(validacaoAtual.length > 0){
            this.limparValidacao(validacaoAtual);
        }

        // Pegar todos os inputs do formulário
        let inputs = formulario.querySelectorAll('input, select');
        console.log(inputs);

        // Transforma uma HTMLCollection -> array 
        let inputsArray = [...inputs]; // Pega todos elementos e transforma em um array
        console.log(inputsArray);

        // Lopp nos inputs e validação mediante ao que for encontrado
        inputsArray.forEach(function(input){

            // Loop em todas as validações existentes
            for(let i = 0; this.validacoes.length > i; i++){

                // Verifica se a validação atual existe no input
                if(input.getAttribute(this.validacoes[i]) != null){
                    
                    // Limpando a string para virar um método
                    let metodo = this.validacoes[i].replace('data-', '').replace('-', '');

                    // Valor do input
                    let valor = input.getAttribute(this.validacoes[i]);

                    // Invocar o método
                    this[metodo](input, valor);
                }
            }
        }, this);

    }

    // Verifica se um input tem um número mínimo de caracteres 
    minlength(input, minimo) {
        let tamanhoInput = input.value.length;
        let mensagemErro = `O campo precisa ter pelo menos ${minimo} caracteres`;
        if(tamanhoInput < minimo){
            this.printMessage(input, mensagemErro);
        }
    }

    // Verifica se um input passou do limite de caracteres
    maxlength(input, maximo){
        let tamanhoInput = input.value.length;
        let mensagemErro = `O campo precisa ter menos que ${maximo} caracteres`;
        if(tamanhoInput > maximo){
         this.printMessage(input, mensagemErro);
        }
    }

    // Verifica emails
    validacaoEmail(input){
        // email@email.com -> email@gmail.com.br
        let representacao = /\S+@\S+\.S+/;
        let email = input.value;
        let mensagemErro = `Insira um e-mail no padrão seunome@email.com`;
        if(!representacao.test(email)){
            this.printMessage(input, mensagemErro);
        }
    }
    
    // Verifica se o input é requirido
    reqired(input){
        let valorInput = input.value;
        if(valorInput === ''){
            let mensagemErro = `Este campo é obrigatório`;
            this.printMessage(input, mensagemErro);
        }
    }
    
    // Método para imprimir mensagens de erro na tela 
    printMessage(input, mensagem){
        // Método para identificar a quantidade de erros 
        let quantidadeErros = input.parentNode.querySelector('.error-validation');
        if(quantidadeErros === null){
            let template = document.querySelector('.error-validation').cloneNode(true);
            template.textContent = mensagem;
            let inputPai = input.parentNode; 
            template.classList.remove('template');
            inputPai.appendChild(template);
        }
    }

    // Limpa as validações da tela
    limparValidacao(validacoes){
        validacoes.forEach(el => el.remove());
    }

}


let formulario =document.getElementById("registros-form");
let botaoSubmit = document.getElementById("btn-submit");

let validar = new Validar();

//evento que dipara as validações 
botaoSubmit.addEventListener('click', function(e){
    e.preventDefault();

    validar.validacao(formulario);
});