//registrando a service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      let reg;
      reg = await navigator.serviceWorker.register('/sw.js', { type: "module" });

      console.log('Service worker registrada! 😎', reg);
    } catch (err) {
      console.log('😥 Service worker registro falhou: ', err);
    }
  });
}

let posicaoInicial;
const irLocalizacao = document.getElementById('ir')
const capturarLocalizacao = document.getElementById('localizacao')
const latitude = document.getElementById('latitude')
const longitude = document.getElementById('longitude')
const mapa = document.getElementById('gmap_canvas')

const sucesso = (posicao) => {
  posicaoInicial = posicao
  latitude.innerHTML = posicaoInicial.coords.latitude
  longitude.innerHTML = posicaoInicial.coords.longitude
  mapa.src = "https://maps.google.com/maps?q="+ posicaoInicial.coords.latitude +","+ posicaoInicial.coords.longitude + "=&z=13&ie=UTF8&iwloc=&output=embed"

}

const erro = (error) => {
  let errorMessage
  switch(error.code){
    case 0: 
    errorMessage = "Erro desconhecido"
    break
    case 1: 
    errorMessage = "Permissão negada!"
    break

    case 2: 
    errorMessage = "Captura de posição indisponivel!" 
    break
    case 3:
      errorMessage = "Tempo de solicitacao excedido"
      break
  }
  console.log('Ocorreu um erro:' + errorMessage)
}

capturarLocalizacao.addEventListener('click', () => {
  navigator.geolocation.getCurrentPosition(sucesso, erro)
})

irLocalizacao.addEventListener('click', () => {
  posicaoInicial.coords.latitude = document.getElementById('latinput').value
  posicaoInicial.coords.longitude = document.getElementById('longinput').value
  navigator.geolocation.getCurrentPosition(sucessoIr, erro)
})