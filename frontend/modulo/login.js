'use strict'

const body = document.querySelector('body')
const cardLogin = document.getElementById('cardLogin')
const cardRegister = document.getElementById('cardRegister')
const cardResultRegister = document.getElementById('cardResultRegister')
const filterBlack = document.getElementById('filterBlack')
const buttonLogin = document.getElementById('enter')
const buttonRegister = document.getElementById('register')
const buttonRegisterGo = document.getElementById('registerGo')
const closeRegister = document.querySelector('.containerClose img')
const closeResultRegister = document.querySelector('#cardResultRegister img')
const buttonGoLogin = document.getElementById('goLogin')
const eyePass = document.getElementById('eyePass')
const eyeConfirm = document.getElementById('eyeConfirm')
var widthScreen
var emailStorage

//Função para troca de imagem e cor do background
var indexImg = 0
function changeBackgroundImage() {
    const imageBg = document.querySelector('.backgroundImg')
    const imgPlaces = document.querySelector('.containerImg img')
    const spanLocation = document.querySelector('.containerLocation span')
    const backgroundFilterColor = document.getElementById('backgroundFilterColor')
    const backgroundColor = [
        'linear-gradient(0deg, rgba(252, 122, 51, 1) 0%, rgba(248, 249, 250, 1) 100%)',
        'linear-gradient(0deg,rgba(224, 183, 126, 1) 0%, rgba(248, 249, 250, 1) 100%)',
        'linear-gradient(0deg,rgba(0, 34, 61, 1) 0%, rgba(248, 249, 250, 1) 100%)',
        'linear-gradient(0deg,rgba(232, 217, 183, 1) 0%, rgba(248, 249, 250, 1) 100%)',
        'linear-gradient(0deg,rgba(207, 144, 46, 1) 0%, rgba(248, 249, 250, 1) 100%)',
        'linear-gradient(0deg,rgba(218, 170, 169, 1) 0%, rgba(248, 249, 250, 1) 100%)',
        'linear-gradient(0deg,rgba(191, 91, 93, 1) 0%, rgba(248, 249, 250, 1) 100%)'
    ]
    const images = [
        'img/goldenGate.jpg',
        'img/esfinge.jpg',
        'img/torreEiffel.webp',
        'img/cristoRedentor.jpg',
        'img/louvre.jpg',
        'img/monteFuji.jpg',
        'img/sydney.jpg'
    ]
    const positionValues = [
        15,
        40,
        70,
        0,
        65,
        40,
        25
    ]
    const locationPlaces = [
        'Califórnia - USA',
        'Cairo - Egito',
        'Paris - França',
        'Rio de Janeiro - Brasil',
        'Paris - França',
        'Ilha de Honshu - Japão',
        'Sydeney - Austrália'
    ]

    if (indexImg == 7) {
        indexImg = 0
    }

    setTimeout(() => {
        backgroundFilterColor.style.background = `${backgroundColor[indexImg]}`

        imageBg.style.backgroundImage = `url(${images[indexImg]})`
        imageBg.style.backgroundPosition = `${positionValues[indexImg]}% 0%`

        imgPlaces.src = `${images[indexImg]}`
        spanLocation.innerHTML = `${locationPlaces[indexImg]}`

        indexImg++
    }, 500);

    backgroundFilterColor.animate(
        [
            { opacity: 1 },
            { opacity: 0 },
            { opacity: 1 }
        ],
        {
            duration: 1000
        }
    )
    imgPlaces.animate(
        [
            { opacity: 1 },
            { opacity: 0 },
            { opacity: 1 }
        ],
        {
            duration: 1000
        }
    )
}

//Funções para as ações dos botões de Login e Cadastro
buttonLogin.addEventListener('click', () => {
    let email = document.getElementById('email').value
    let pass = document.getElementById('pass').value
    let spans = document.querySelectorAll('.containerInputsLogin span')
    for (let i = 0; i < spans.length; i++) {
        spans[i].innerHTML = ""

    }

    if (email.length > 255) {
        spans[0].innerHTML = "E-mail excede o número máximo de caracteres permitidos"

    } else if (pass.length > 25) {
        spans[1].innerHTML = "Senha excede o número máximo de caracteres permitidos"

    } else if (email.length == 0) {
        spans[0].innerHTML = "Campo obrigatório vazio"

    } else if (pass.length == 0) {
        spans[1].innerHTML = "Campo obrigatório vazio"

    } else {
        let animationVerify = document.querySelector('.animationVerify')
        let circleProgress = document.querySelector('.circle')
        animationVerify.style.opacity = 1

        if (true) {
            circleProgress.classList.add('disableCircle')
            setTimeout(() => {
                let circleImg = document.querySelector('.circle img')
                circleImg.src = 'img/confirm.png'
                circleProgress.classList.remove('disableCircle')
                circleProgress.classList.add('enableCircle')
            }, 760);
        }
    }

})

buttonRegister.addEventListener('click', () => {
    let inputs = document.querySelectorAll('.containerInputsRegister input')
    let checkBox = document.getElementById('checkTerms')

    checkBox.checked = false

    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = ''

    }

    if (widthScreen < 1280) {
        cardLogin.style.display = 'none'

    } else {
        filterBlack.style.display = 'flex'

    }

    cardRegister.style.display = 'flex'
})

buttonRegisterGo.addEventListener('click', () => {
    let name = document.getElementById('name')
    let e_mail = document.getElementById('e_mail')
    let nickname = document.getElementById('nickname')
    let phone = document.getElementById('phone')
    let password = document.getElementById('password')
    let confirmPass = document.getElementById('confirmPass')
    let checkBox = document.getElementById('checkTerms')

    let spans = document.querySelectorAll('.containerInputsRegister span')
    for (let i = 0; i < spans.length; i++) {
        spans[i].innerHTML = ""

    }

    if (name.value.length > 100) {
        spans[0].innerHTML = 'Nome excede número de caracteres'

    } else if (nickname.value.length > 25) {
        spans[1].innerHTML = 'Apelido excede número de caracteres'

    } else if (phone.value.length > 20) {
        spans[2].innerHTML = 'Telefone excede número de caracteres'

    } else if (e_mail.value.length > 255) {
        spans[3].innerHTML = 'E-mail excede número de caracteres'

    } else if (password.value.length > 25) {
        spans[4].innerHTML = 'Senha excede número de caracteres'

    } else if (name.value.length == 0) {
        spans[0].innerHTML = 'Campo obrigatório vazio'

    } else if (nickname.value.length == 0) {
        spans[1].innerHTML = 'Campo obrigatório vazio'

    } else if (phone.value.length == 0) {
        spans[2].innerHTML = 'Campo obrigatório vazio'

    } else if (e_mail.value.length == 0) {
        spans[3].innerHTML = 'Campo obrigatório vazio'

    } else if (password.value.length == 0) {
        spans[4].innerHTML = 'Campo obrigatório vazio'

    } else if (password.value != confirmPass.value) {
        spans[5].innerHTML = 'Senha incorreta, tente novamente'

    } else if (!checkBox.checked) {
        let terms = document.querySelector('.containerCheckbox label')
        terms.style.animation = 'notChecked 2s linear'
        setTimeout(() => {
            terms.style.animation = 'none'
        }, 2000);

    } else {
        storageEmail(e_mail.value)

        cardRegister.style.display = 'none'
        cardResultRegister.style.display = 'flex'

    }


})

closeRegister.addEventListener('click', () => {
    if (widthScreen < 1280) {
        cardLogin.style.display = 'flex'

    } else {
        filterBlack.style.display = 'none'

    }

    cardRegister.style.display = 'none'
})

closeResultRegister.addEventListener('click', () => {
    if (widthScreen < 1280) {
        cardLogin.style.display = 'flex'

    } else {
        filterBlack.style.display = 'none'

    }

    cardResultRegister.style.display = 'none'
})

buttonGoLogin.addEventListener('click', () => {
    if (widthScreen < 1280) {
        cardLogin.style.display = 'flex'

    } else {
        filterBlack.style.display = 'none'

    }

    cardResultRegister.style.display = 'none'

    let email = document.getElementById('email')
    email.value = emailStorage
})

//Funções para ocultar ou visualizar a senha
eyePass.addEventListener('click', () => {
    let password = document.getElementById('password')
    let notViewPass = document.querySelector('.containerPassInput:nth-child(5) .notView')

    if (password.type === 'password') {
        password.setAttribute('type', 'text')
        notViewPass.classList.add('hiddenPass')
        console.log(123)

    } else {
        password.setAttribute('type', 'password')
        notViewPass.classList.remove('hiddenPass')
    }

})

eyeConfirm.addEventListener('click', () => {
    let confirmPass = document.getElementById('confirmPass')
    let notViewPass = document.querySelector('.containerPassInput:nth-child(2) .notView')

    if (confirmPass.type === 'password') {
        confirmPass.setAttribute('type', 'text')
        notViewPass.classList.add('hiddenPass')

    } else {
        confirmPass.setAttribute('type', 'password')
        notViewPass.classList.remove('hiddenPass')
    }
})

function getWidthScreen() {
    widthScreen = body.offsetWidth

}

//Função para manipular os cards durante o redimensionamento da tela
function showCardsResponse() {
    if (widthScreen >= 1280) {
        cardLogin.style.display = 'flex'

        if (cardRegister.style.display == 'flex') {
            filterBlack.style.display = 'flex'
        }

    } else if (widthScreen < 1280 && cardRegister.style.display == 'flex') {
        cardLogin.style.display = 'none'
        filterBlack.style.display = 'none'
    }
}

//Função para armazenar o valor do email usado na área de cadastro
function storageEmail(email) {
    emailStorage = email
}

setInterval(changeBackgroundImage, 7500);

changeBackgroundImage()
getWidthScreen()
window.addEventListener('resize', getWidthScreen)
window.addEventListener('resize', showCardsResponse)