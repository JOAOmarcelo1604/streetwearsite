addEventListener('DOMContentLoaded', function() {
    var carousel = document.querySelector('.carousel');
    var carouselItems = document.querySelectorAll('.carousel-item');
    var carouselLargura = carousel.offsetWidth;
    var currentPosition = 0;
    var velocidade = 2; 
    var idcarouselint;

    function comecarScroll() {
        idcarouselint = setInterval(scrollCarousel, 30); 
    }

    function stopScroll() {
        clearInterval(idcarouselint);
    }

    function scrollCarousel() {
        currentPosition -= velocidade;
        carousel.style.transform = 'translateX(' + currentPosition + 'px)';

        if (currentPosition <= -carouselLargura) {
            var firstItem = carouselItems[0];
            carousel.appendChild(firstItem.cloneNode(true));
            carousel.removeChild(firstItem);
            currentPosition += carouselLargura;
        }
    }

    carousel.addEventListener('mouseover', stopScroll);
    carousel.addEventListener('mouseout', comecarScroll);

    comecarScroll();
});

function buscarCEP(event) {
    event.preventDefault(); 

    let cep = document.getElementById("cep").value;
    var url = "https://brasilapi.com.br/api/cep/v2/" + cep;

    fetch(url)
      .then(function (resposta){
        resposta.json().then(function(dados){
          console.log(dados);
          exibirResultado(dados);
          exibirConfirmacaoEndereco();
        })
      })
      .catch(function(erro){
        console.log("Ocorreu um erro ao buscar os dados", erro);
      });
  }

  function exibirResultado(dados) {
    var resultTextArea = document.getElementById("result");
    resultTextArea.value = "Sua cidade é " + dados.city + " e seu estado é " + dados.state + " e sua rua é " + dados.street;
  }

  function exibirConfirmacaoEndereco() {
    var endereco = document.getElementById("result").value;
    var confirmacao = confirm("O endereço de entrega é:\n\n" + endereco + "\n\nConfirma?");
    
    if (confirmacao) {
      alert("Endereço confirmado!");
    } else {
      alert("Verifique o endereço e faça as alterações necessárias.");
    }
  }


  
  