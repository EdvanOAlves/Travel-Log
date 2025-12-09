'use strict'

const filterBlack = document.getElementById('filterBlack')
const closeFilter = document.getElementById('closeFilter')
const filterBlackSettings = document.getElementById('filterBlackSettings')
const closeFilterSettings = document.getElementById('closeFilterSettings')
const liListTravelMob = document.querySelectorAll('#listTypeLogMob li')
const liListTravelDesk = document.querySelectorAll('#listTypeLog li')
const liListTravelNewLog = document.querySelectorAll('#listTravel li')
const iconProfileUser = document.getElementById('profileNav')
const iconProfileMobile = document.querySelector('.containerSettings div')
const iconSettingsDesk = document.getElementById('settingsNav')
const iconSettingsMob = document.getElementById('settingsHeader')
const buttonChangePass = document.getElementById('changePass')
const buttonConfirmPass = document.getElementById('confirmPass')
const buttonCancelPass = document.getElementById('cancelPass')
const buttonDeleteAccount = document.getElementById('deleteAccount')
const buttonConfirmDeleteAccount = document.getElementById('confirmDeleteAccount')
const buttonCancelDeleteAccount = document.getElementById('cancelDeleteAccount')
const inputDateContainer = document.querySelector('.containerFilterDate')
const inputDateBegin = document.getElementById('filterDateBegin')
const inputDateEnd = document.getElementById('filterDateEnd')
const inputLocationFilter = document.getElementById('filterLocation')
const arrowChangeImgLogLeft = document.querySelectorAll('.containerArrowLeft')
const arrowChangeImgLogRight = document.querySelectorAll('.containerArrowRight')
const arrowChangeImgLogLeftLogFull = document.querySelector('.containerArrowImgLogLeftFull')
const arrowChangeImgLogRightLogFull = document.querySelector('.containerArrowImgLogRightFull')
const arrowTypeFilterDesk = document.getElementById('arrowType')
const arrowTypeFilterMobile = document.getElementById('arrowTypeMob')
const arrowNewLog = document.getElementById('arrowSelectTravel')
const newPostMobile = document.getElementById('newPost')
const buttonVisibleLog = document.getElementById('visibleTravel')
const buttonVisibleTravel = document.getElementById('visibleNewTravel')
const filterMobile = document.getElementById('mobFilter')
const newLog = document.querySelector('.logCreator')
const newTravel = document.querySelector('.viagemCreator')
const logs = document.querySelectorAll('.log')
const likeLogFull = document.querySelector('.likeLogFullImg')
const favoriteLogFull = document.querySelector('.favLogFullImg')
var idCallMessage = null
var elementHigh = null
var elementHighSettings = null

const logNavButton = document.getElementById("nav-button-log");
const viagemNavButton = document.getElementById('nav-button-viagem');
const estatisticaNavButton = document.getElementById('nav-button-estatistica');

const containerDeLogs = document.getElementById('container-de-logs');
const containerDeViagens = document.getElementById('container-de-logs');
const carrosselDeConteudo = document.getElementById('carrossel-de-conteudo');

iconSettingsDesk.addEventListener('click', goSettings)

buttonChangePass.addEventListener('click', () => {
    showModalMessagePass(event.target.id)
})
buttonDeleteAccount.addEventListener('click', () => {
    showModalMessagePass(event.target.id)
})
buttonCancelDeleteAccount.addEventListener('click', closeModalSettings)
buttonConfirmDeleteAccount.addEventListener('click', closeModalSettings)
buttonCancelPass.addEventListener('click', closeModalSettings)
buttonConfirmPass.addEventListener('click', closeModalSettings)

function closeModalSettings() {
    if (idCallMessage == 'deleteAccount') {
        const messagePass = document.getElementById('messagePass')
        console.log(123)
        messagePass.classList.toggle('showModal')
        showModalDeleteAccount()

    } else {
        filterBlackSettings.classList.toggle('showFilterSettings')
        const elementHide = document.getElementById(elementHighSettings)

        elementHide.classList.toggle('showModal')
    }
}

closeFilterSettings.addEventListener('click', closeModalSettings)

function goSettings() {
    const sectionSettings = document.getElementById('sectionSettings')

    sectionSettings.classList.add('showSection')
}

function showModalMessagePass(button_id) {
    const messagePass = document.getElementById('messagePass')

    filterBlackSettings.classList.toggle('showFilterSettings')
    messagePass.classList.toggle('showModal')

    elementHighSettings = 'messagePass'

    if (button_id == 'deleteAccount') {
        idCallMessage = 'deleteAccount'
    }
}

function showModalDeleteAccount() {
    const messageDelete = document.getElementById('messageConfirmDelete')

    filterBlackSettings.classList.toggle('showFilterSettings')
    messageDelete.classList.toggle('showModal')

    elementHighSettings = 'messageConfirmDelete'
}

newTravel.addEventListener('click', () => {
    const newLog = document.getElementById('newTravel')
    filterBlack.classList.toggle('showFilter')
    newLog.classList.toggle('showModal')

    elementHigh = 'newTravel'
})

logNavButton.addEventListener('click', () => {
    carrosselDeConteudo.classList.add('carrossel-page_1');
    carrosselDeConteudo.classList.remove('carrossel-page_2');
    carrosselDeConteudo.classList.remove('carrossel-page_3');

    logNavButton.classList.add('selected');
    viagemNavButton.classList.remove('selected');
    estatisticaNavButton.classList.remove('selected');
});

viagemNavButton.addEventListener('click', () => {
    carrosselDeConteudo.classList.remove('carrossel-page_1');
    carrosselDeConteudo.classList.add('carrossel-page_2');
    carrosselDeConteudo.classList.remove('carrossel-page_3');

    logNavButton.classList.remove('selected');
    viagemNavButton.classList.add('selected');
    estatisticaNavButton.classList.remove('selected');
});

estatisticaNavButton.addEventListener('click', () => {
    carrosselDeConteudo.classList.remove('carrossel-page_1');
    carrosselDeConteudo.classList.remove('carrossel-page_2');
    carrosselDeConteudo.classList.add('carrossel-page_3');

    logNavButton.classList.remove('selected');
    viagemNavButton.classList.remove('selected');
    estatisticaNavButton.classList.add('selected');
});

//Cria e adiciona os Logs a tela principal
function createLogs(log) {
    const containerLogs = document.getElementById('containerLogs')
    let logDiv = document.createElement('div')
    let headerLog = document.createElement('div')
    let backImg = document.createElement('div')
    let footerLog = document.createElement('div')
    let divProfile = document.createElement('div')
    let imgProfile = document.createElement('img')
    let spanName = document.createElement('span')
    let divArrow1 = document.createElement('div')
    let divArrow2 = document.createElement('div')
    let imgLog = document.createElement('img')
    let arrowRight = document.createElement('img')
    let arrowLeft = document.createElement('img')
    let divLikes = document.createElement('div')
    let imgLike = document.createElement('img')
    let numberLikes = document.createElement('span')
    let divFav = document.createElement('div')
    let imgFav = document.createElement('img')
    let numberFav = document.createElement('span')
    let divLocation = document.createElement('div')
    let imgLocation = document.createElement('img')
    let spanLocation = document.createElement('span')

    logDiv.classList.add('log')
    headerLog.classList.add('headerLog')
    backImg.classList.add('backgroundImgLog')
    footerLog.classList.add('footerLog')
    divProfile.classList.add('profileLog')
    spanName.classList.add('nameProfileLog')
    imgLog.classList.add('imgLog')
    arrowRight.classList.add('arrowImgLogRight')
    arrowLeft.classList.add('arrowImgLogLeft')
    divLikes.classList.add('likesLog')
    imgLike.classList.add('likeImg')
    numberLikes.classList.add('numberLikes')
    divFav.classList.add('favLog')
    imgFav.classList.add('favImg')
    numberFav.classList.add('numberFav')
    divLocation.classList.add('containerLocationLog')
    spanLocation.classList.add('lcoationLog')

    headerLog.append(divProfile, spanName)
    divProfile.appendChild(imgProfile)
    backImg.append(divArrow1, divArrow2, imgLog)
    divArrow1.appendChild(arrowLeft)
    divArrow2.appendChild(arrowRight)
    footerLog.append(divLikes, divFav, divLocation)
    divLikes.append(imgLike, numberLikes)
    divFav.append(imgFav, numberFav)
    divLocation.append(imgLocation, spanLocation)
    logDiv.append(headerLog, backImg, footerLog)
    containerLogs.appendChild(logDiv)

    //Validar quantidade Imgs
    if (log.midia.length == 0) {
        divArrow1.classList.add('hiddeArrowImg')
        divArrow2.classList.add('hiddeArrowImg')

    }

}

//Altera a imagem do log para a esquerda
function changeImgLeft(arrow) {
    let log = arrow.closest('.log')
    let imgLog = document.querySelector(`#${log.id} .imgLog`)
    let dataImg = imgLog.dataset.img.split(',')
    let dataPosition = Number(imgLog.dataset.position)

    if (dataPosition <= dataImg.length - 1 && dataPosition != 0) {
        let dataImgPosition = dataPosition - 1
        imgLog.src = `${dataImg[dataImgPosition]}`
        imgLog.dataset.position = dataImgPosition

        validePositionImgLog(dataImg, dataImgPosition, arrow)
    }
}

//Altera a imagem do log para a direita
function changeImgRight(arrow) {
    let log = arrow.closest('.log')
    let imgLog = document.querySelector(`#${log.id} .imgLog`)
    let dataImg = imgLog.dataset.img.split(',')
    let dataPosition = Number(imgLog.dataset.position)

    if (dataPosition < dataImg.length - 1) {
        let dataImgPosition = dataPosition + 1
        imgLog.src = `${dataImg[dataImgPosition]}`
        imgLog.dataset.position = dataImgPosition

        validePositionImgLog(dataImg, dataImgPosition, arrow)
    }
}

//Valida em qual posição a imagem está e trata possíveis erros na inserção da img
function validePositionImgLog(dataImg, positionImg, arrow) {
    if (positionImg == 0 || positionImg == dataImg.length - 1) {
        arrow.classList.toggle('hiddeArrowImg')

    } else {
        if (arrow.classList == 'containerArrowLeft') {
            let log = arrow.closest('.log')
            let arrowRight = document.querySelector(`#${log.id} .containerArrowRight`)

            arrowRight.classList.remove('hiddeArrowImg')

        } else if (arrow.classList == 'containerArrowRight') {
            let log = arrow.closest('.log')
            let arrowLeft = document.querySelector(`#${log.id} .containerArrowLeft`)

            arrowLeft.classList.remove('hiddeArrowImg')

        } else if (arrow.classList == 'containerArrowImgLogLeftFull') {
            arrowChangeImgLogRightLogFull.classList.remove('hiddeArrowImg')

        } else if (arrow.classList == 'containerArrowImgLogRightFull') {
            arrowChangeImgLogLeftLogFull.classList.remove('hiddeArrowImg')

        }
    }
}

//Adiciona as viagens na lista
function getTravelLi(li) {
    const listTravel = document.querySelector('#listTravel ul')

    let createLi = document.createElement('li')

    listTravel.appendChild(createLi)
}

//Adiciona os tipos de viagens a lista
function getTypeTravelDefault(li) {
    const listTravelDesk = document.querySelector('#listTypeLog ul')
    const listTravelMob = document.querySelector('#listTypeLogMob ul')

    let liDesk = document.createElement('li')
    let liMob = document.createElement('li')

    listTravelDesk.appendChild(liDesk)
    listTravelMob.appendChild(liMob)
}

//Insere a viagem no span de seleção
function setTravel(li) {
    const textTravel = document.querySelector('.selectTravel span')
    const listTravel = document.getElementById('listTravel')

    textTravel.innerHTML = li.textContent

    listTravel.classList.remove('expandListTravelNewLog')
}

//Insere o tipo de viagem no span de seleção
function setTypeTravel(li) {
    const textTravelDesk = document.querySelector('.containerListTypeLog span')
    const textTravelMob = document.querySelector('.containerListTypeLogMob span')
    const listTypeTravelDesk = document.getElementById('listTypeLog')
    const listTypeTravelMob = document.getElementById('listTypeLogMob')

    textTravelDesk.innerHTML = li.textContent
    textTravelMob.innerHTML = li.textContent

    listTypeTravelMob.classList.remove('expandirListMob')
    listTypeTravelDesk.classList.remove('expandirListDesk')

    //Função chamar logs pelo filtro de tipo de viagem
}

//Destaca o Log clicado
function logFull(id) {
    const logClick = document.getElementById(id).querySelectorAll('*')
    const logFull = document.getElementById('logFull').querySelectorAll('*')
    const logFull1 = document.getElementById('logFull')

    logFull[12].src = logClick[0].src

    elementHigh = logFull1.id
    filterBlack.classList.toggle('showFilter')
    logFull1.classList.toggle('showModal')

    // logFull[12].dataset.img = logClick[7].dataset.img
}

//Destaca a aba de criação de Log
function showNewLog() {
    const newLog = document.getElementById('newLog')
    filterBlack.classList.toggle('showFilter')
    newLog.classList.toggle('showModal')

    elementHigh = 'newLog'
}

//Direciona o usuário ao perfil clicado
function goProfileUser(id_use) {
    alert('Direcionamento para perfil')
}

//Valida a data dos inputs do filtro de data
function valideDateValue() {
    if (inputDateBegin.value == '') {
        inputDateBegin.animate([
            { transform: 'scale(1.05)' },
            { transform: 'scale(1)' },
            { transform: 'scale(1.05)' },
            { transform: 'scale(1)' },
        ],
            {
                duration: 2000
            })
    } else if (inputDateEnd.value == '') {
        inputDateEnd.animate([
            { transform: 'scale(1.05)' },
            { transform: 'scale(1)' },
            { transform: 'scale(1.05)' },
            { transform: 'scale(1)' },
        ],
            {
                duration: 2000
            })
    } else {
        //Função chamar logs pelo filtro de data
    }
}

//Fecha a aba destacada e o filtro escuro
closeFilter.addEventListener('click', () => {
    filterBlack.classList.toggle('showFilter')
    const elementHide = document.getElementById(elementHigh)

    elementHide.classList.toggle('showModal')
})

//Expande o container dos inputs de data e os expoe
inputDateContainer.addEventListener('click', () => {
    const inputDate = document.querySelectorAll('.filterDate')
    const spanContainer = document.querySelector('.containerFilterDate span')

    inputDateContainer.classList.add('expandFilterDate')
    spanContainer.innerHTML = '-'

    for (let i = 0; i < inputDate.length; i++) {
        inputDate[i].classList.add('showFilterDate')

    }
})

//Input da data de início do filtro
inputDateBegin.addEventListener('keypress', () => {
    if (event.key == 'Enter') {
        valideDateValue()
    }
})

//Input da data de fim do filtro
inputDateEnd.addEventListener('keypress', () => {
    if (event.key == 'Enter') {
        valideDateValue()
    }
})

//Expande o input de filtro
inputLocationFilter.addEventListener('click', () => {
    inputLocationFilter.classList.add('expandFilterLocation')

})

//Filtra os logs pela localização
inputLocationFilter.addEventListener('keypress', () => {
    if (event.key == 'Enter') {
        if (inputLocationFilter.value == '') {
            inputLocationFilter.animate([
                { transform: 'scale(1.05)' },
                { transform: 'scale(1)' },
                { transform: 'scale(1.05)' },
                { transform: 'scale(1)' },
            ],
                {
                    duration: 2000
                })

        } else {
            //Função chamar logs pela localização

        }
    }
})

//Mostra a lista de tipos de viagens no desktop
arrowTypeFilterDesk.addEventListener('click', () => {
    const listTypeTravel = document.getElementById('listTypeLog')

    arrowTypeFilterDesk.classList.toggle('arrowSelect')
    listTypeTravel.classList.toggle('expandirListDesk')
})

//Mostra o filtro para mobile
filterMobile.addEventListener('click', () => {
    const filterContainer = document.getElementById('containerFilterMob')

    filterContainer.classList.toggle('showFilterMob')
})

//Mostra a lista do tipo de viagem no mobile
arrowTypeFilterMobile.addEventListener('click', () => {
    const listTypeTravel = document.getElementById('listTypeLogMob')

    arrowTypeFilterMobile.classList.toggle('arrowSelect')
    listTypeTravel.classList.toggle('expandirListMob')

})

//Altera a imagem do Log em destaque para a esquerda
arrowChangeImgLogLeftLogFull.addEventListener('click', () => {
    let imgLog = document.querySelector(`#logFull .imgLog`)
    let dataImg = imgLog.dataset.img.split(',')
    let dataPosition = Number(imgLog.dataset.position)

    if (dataPosition <= dataImg.length - 1 && dataPosition != 0) {
        let dataImgPosition = dataPosition - 1
        imgLog.src = `${dataImg[dataImgPosition]}`
        imgLog.dataset.position = dataImgPosition

        validePositionImgLog(dataImg, dataImgPosition, arrowChangeImgLogLeftLogFull)
    }

})

//Altera a imagem do Log em destaque para a direita
arrowChangeImgLogRightLogFull.addEventListener('click', () => {
    let imgLog = document.querySelector(`#logFull .imgLog`)
    let dataImg = imgLog.dataset.img.split(',')
    let dataPosition = Number(imgLog.dataset.position)

    if (dataPosition < dataImg.length - 1) {
        let dataImgPosition = dataPosition + 1
        imgLog.src = `${dataImg[dataImgPosition]}`
        imgLog.dataset.position = dataImgPosition

        validePositionImgLog(dataImg, dataImgPosition, arrowChangeImgLogRightLogFull)
    }
})

//Destaca a aba de criação de Log para mobile
newPostMobile.addEventListener('click', showNewLog)

//Destaca a aba de criação de log para Desktop
newLog.addEventListener('click', showNewLog)

//Icone do perfil do usuário e direcionamento para ele para desktop
iconProfileUser.addEventListener('click', () => {
    goProfileUser()
})

//Icone do perfil do usuário e direcionamento para ele para mobile
iconProfileMobile.addEventListener('click', () => {
    goProfileUser()
})

//Mostra lista de viagens do usuário
arrowNewLog.addEventListener('click', () => {
    const listTravel = document.getElementById('listTravel')

    arrowNewLog.classList.toggle('changeArrowNewLog')
    listTravel.classList.toggle('expandListTravelNewLog')

})

//Troca a visibilidade do botão na criação de Log
buttonVisibleLog.addEventListener('click', () => {
    buttonVisibleLog.classList.toggle('ocultVisible')
    if (buttonVisibleLog.classList == 'ocultVisible') {
        buttonVisibleLog.innerHTML = 'Privado'
    } else {
        buttonVisibleLog.innerHTML = 'Público'
    }
})

//Troca a visibilidade do botão de criação de Travel
buttonVisibleTravel.addEventListener('click', () => {
    buttonVisibleTravel.classList.toggle('ocultVisible')
    if (buttonVisibleTravel.classList == 'ocultVisible') {
        buttonVisibleTravel.innerHTML = 'Privado'
    } else {
        buttonVisibleTravel.innerHTML = 'Público'
    }
})

//Adiciona event para as seta da esquerda
arrowChangeImgLogLeft.forEach(arrowLeft => {
    arrowLeft.addEventListener('click', () => {
        changeImgLeft(arrowLeft)
    })
})

//Adiciona event para as seta da direita
arrowChangeImgLogRight.forEach(arrowRight => {
    arrowRight.addEventListener('click', () => {
        changeImgRight(arrowRight)
    })
})

//Adiciona event para o logs e valida o event.target
logs.forEach(log => {
    log.addEventListener('click', () => {
        if (event.target.classList != 'arrowImgLogRight' && event.target.classList != 'arrowImgLogLeft' && event.target.classList != 'nameProfileLog' && event.target.classList != 'likeImg' && event.target.classList != 'favImg') {
            logFull(event.currentTarget.id)
        }
    })
});

//Event do clique da curtida no Log em destaque
likeLogFull.addEventListener('click', () => {
    if (String(likeLogFull.src).includes('img/likeEnable.png')) {
        likeLogFull.src = 'img/likeDisable.png'

    } else {
        likeLogFull.src = 'img/likeEnable.png'
    }
})

//Event do clique do favorito no Log em destaque
favoriteLogFull.addEventListener('click', () => {
    if (String(favoriteLogFull.src).includes('img/favEnable.png')) {
        favoriteLogFull.src = 'img/favDisable.png'

    } else {
        favoriteLogFull.src = 'img/favEnable.png'
    }
})

//Adiciona event para os LI de tipo de viagem para mobile
liListTravelMob.forEach(li => {
    li.addEventListener('click', () => {
        setTypeTravel(li)

    })
})

//Adiciona event para os LI de tipo de viagem para desktop
liListTravelDesk.forEach(li => {
    li.addEventListener('click', () => {
        setTypeTravel(li)

    })
})

//Adiciona event para os LI de viagens
liListTravelNewLog.forEach(li => {
    li.addEventListener('click', () => {
        setTravel(li)
    })
})

//Fecha alguns icones clicando no corpo do web-site
document.addEventListener('click', () => {
    if (!inputDateContainer.contains(event.target)) {
        const inputDate = document.querySelectorAll('.filterDate')
        const spanContainer = document.querySelector('.containerFilterDate span')

        spanContainer.innerHTML = 'Data'
        inputDateContainer.classList.remove('expandFilterDate')

        for (let i = 0; i < inputDate.length; i++) {
            inputDate[i].classList.remove('showFilterDate')

        }
    }

    if (!inputLocationFilter.contains(event.target)) {
        inputLocationFilter.classList.remove('expandFilterLocation')

    }
})