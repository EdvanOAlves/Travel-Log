'use strict'

import { uploadImageToAzure } from "../js/uploadImageToAzure.js"

const filterBlack = document.getElementById('filterBlack')
const closeFilter = document.getElementById('closeFilter')
const liListTravelMob = document.querySelectorAll('#listTypeLogMob li')
const liListTravelDesk = document.querySelectorAll('#listTypeLog li')
const liListTravelNewLog = document.querySelectorAll('#listTravel li')
const allFollower = document.querySelectorAll('.follower')
const iconProfileUser = document.getElementById('profileNav')
const iconProfileMobile = document.querySelector('.containerSettings div')
const inputDateContainer = document.querySelector('.containerFilterDate')
const inputContainerDateMob = document.querySelector('.containerFilterDateMob')
const inputDateBegin = document.getElementById('filterDateBegin')
const inputDateEnd = document.getElementById('filterDateEnd')
const inputDateBeginMob = document.getElementById('filterDateBeginMob')
const inputDateEndMob = document.getElementById('filterDateEndMob')
const inputLocationFilter = document.getElementById('filterLocation')
const inputFollowerDesk = document.getElementById('inputFollowerDesk')
const inputFollowerMobile = document.getElementById('inputFollowerMob')
const closeInputMobile = document.getElementById('closeInputMob')
const arrowChangeImgLogLeft = document.querySelectorAll('.containerArrowLeft')
const arrowChangeImgLogRight = document.querySelectorAll('.containerArrowRight')
const arrowChangeImgLogLeftLogFull = document.querySelector('.containerArrowImgLogLeftFull')
const arrowChangeImgLogRightLogFull = document.querySelector('.containerArrowImgLogRightFull')
const arrowTypeFilterDesk = document.getElementById('arrowType')
const arrowTypeFilterMobile = document.getElementById('arrowTypeMob')
const arrowNewLog = document.getElementById('arrowSelectTravel')
const newPostMobile = document.getElementById('newPost')
const newLogDesk = document.getElementById('newLogSection')
const buttonVisibleLog = document.getElementById('visibleTravel')
const filterMobile = document.getElementById('mobFilter')
const logs = document.querySelectorAll('.log')
const likes = document.querySelectorAll('.likeImg')
const favorites = document.querySelectorAll('.favImg')
const profilesName = document.querySelectorAll('.nameProfileLog')
const likeLogFull = document.querySelector('.likeLogFullImg')
const favoriteLogFull = document.querySelector('.favLogFullImg')
var elementHigh = null

//Cria e adiciona os Logs a tela principal
function createLogs(log) {
    const containerLogs = document.getElementById('containerLogs')
    let logDiv = document.createElement('div')
    let headerLog = document.createElement('div')
    let backImg = document.createElement('div')
    let footerLog = document.createElement('div')
    let divProfile = document.createElement('div')
    let imgProfile = document.createElement('img') //
    let spanName = document.createElement('span') //
    let divArrow1 = document.createElement('div')
    let divArrow2 = document.createElement('div')
    let imgLog = document.createElement('img')
    let arrowRight = document.createElement('img')
    let arrowLeft = document.createElement('img')
    let divLikes = document.createElement('div')
    let imgLike = document.createElement('img')
    let numberLikes = document.createElement('span')//
    let divFav = document.createElement('div')
    let imgFav = document.createElement('img')
    let numberFav = document.createElement('span') //
    let divLocation = document.createElement('div')
    let imgLocation = document.createElement('img')
    let spanLocation = document.createElement('span') //

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

    // Conteudo do log
    imgProfile.src = log.foto_perfil;
    spanName.textContent = log.apelido;
    //imgLog a fazer
    numberLikes.textContent = log.curtidas;
    numberFav.textContent = log.favoritos;

    // Local precisa de uma tratativa

    const localJson = log.log[0].local[0];

    const parts = [
        localJson.nome_local,
        localJson.cidade,
        localJson.estado,
        localJson.pais.pais
    ].filter(part => part); // remove null, undefined ou string vazia
    const locationString = parts.join(' - ');

    spanLocation.textContent = locationString


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
    // if (log.midia.length == 0) {
    //     divArrow1.classList.add('hiddeArrowImg')
    //     divArrow2.classList.add('hiddeArrowImg')

    // }

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

//Cria e adiciona os seguidores
function createFollower(follower) {
    console.log(follower)
    const containerFollower = document.getElementById('containerFollowerList')
    
    let divFollower = document.createElement('div')
    let divProfile = document.createElement('div')
    let imgProfile = document.createElement('img')
    let spanName = document.createElement('span')
    
    
    spanName.classList.add('nameFollower')
    divFollower.classList.add('follower')
    divProfile.classList.add('profileFollower')
    
    divFollower.append(divProfile, spanName)
    divProfile.appendChild(imgProfile)
    
    spanName.textContent = `@${follower.apelido}`
    imgProfile.src = follower.foto_perfil
    
    
    containerFollower.appendChild(divFollower)
    
    const containerFollowerMobile = document.getElementById('resultFollower')
    let divFollowerMob = document.createElement('div')
    let divProfileMob = document.createElement('div')
    let imgProfileMob = document.createElement('img')
    let spanNameMob = document.createElement('span')

    divFollowerMob.classList.add('follower')
    spanNameMob.classList.add('nameFollower')
    divProfileMob.classList.add('profileFollower')

    spanNameMob.textContent =`@${follower.apelido}`
    imgProfileMob.src = follower.foto_perfil

    divFollowerMob.append(divProfileMob, spanNameMob)
    divProfileMob.appendChild(imgProfileMob)
    containerFollowerMobile.appendChild(divFollowerMob)

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

    logFull[3].innerHTML = logClick[3].textContent
    logFull[5].innerHTML = ''
    logFull[8].innerHTML = logClick[19].textContent
    logFull[12].src = logClick[7].src
    logFull[18].innerHTML = logClick[13].textContent
    logFull[21].innerHTML = logClick[14].textContent

    elementHigh = logFull1.id
    filterBlack.classList.toggle('showFilter')
    logFull1.classList.toggle('showModal')

    logFull[12].dataset.img = logClick[7].dataset.img
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

//Valida a data dos inputs do filtro de data para Mobile
function valideDateValueMob() {
    if (inputDateBeginMob.value == '') {
        inputDateBeginMob.animate([
            { transform: 'scale(1.05)' },
            { transform: 'scale(1)' },
            { transform: 'scale(1.05)' },
            { transform: 'scale(1)' },
        ],
            {
                duration: 2000
            })
    } else if (inputDateEndMob.value == '') {
        inputDateEndMob.animate([
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

//Separa os seguidores selecionados pelo input
function findFollower(name) {
    allFollower.forEach(follower => {
        let followerName = follower.childNodes[3].textContent

        if (followerName.includes(name)) {
            follower.style.display = 'flex'
        } else {
            follower.style.display = 'none'
        }
    })
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

//Expande o container de data para Mobile
inputContainerDateMob.addEventListener('click', () => {
    const inputDate = document.querySelectorAll('.filterDateMob')
    const spanContainer = document.querySelector('.containerFilterDateMob span')

    inputContainerDateMob.classList.add('expandFilterDate')
    spanContainer.innerHTML = '-'

    for (let i = 0; i < inputDate.length; i++) {
        inputDate[i].classList.add('showFilterDate')

    }
})

//Input da data de início do filtro para Mobile
inputDateBeginMob.addEventListener('keypress', () => {
    if (event.key == 'Enter') {
        valideDateValueMob()
    }
})

//Input da data de fim do filtro para Mobile
inputDateEndMob.addEventListener('keypress', () => {
    if (event.key == 'Enter') {
        valideDateValueMob()
    }
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

//Input de pesquisa dos seguidores para desktop
inputFollowerDesk.addEventListener('input', () => {
    findFollower(inputFollowerDesk.value)
})

//Aciona a aba de seguidores e o input de pesquisa de seguidores
inputFollowerMobile.addEventListener('click', () => {
    filterBlack.classList.toggle('showFilter')
    const resultFollower = document.getElementById('resultFollower')
    const containerInput = document.querySelector('.containerInputMob')

    containerInput.classList.toggle('inputMobileIndex')
    closeInputMobile.classList.toggle('showCloseMobileInput')
    closeFilter.classList.toggle('hiddeCloseFilter')
    containerInput.style.width = '95%'
    resultFollower.classList.toggle('showResultFollowerMobile')

    elementHigh = inputFollowerMobile.id
})

//Input de pesquisa dos seguidores
inputFollowerMobile.addEventListener('input', () => {
    findFollower(inputFollowerMobile.value)
})

//Fecha a aba de pesquisa de seguidores
closeInputMobile.addEventListener('click', () => {
    filterBlack.classList.toggle('showFilter')
    const resultFollower = document.getElementById('resultFollower')
    const containerInput = document.querySelector('.containerInputMob')

    containerInput.classList.toggle('inputMobileIndex')
    closeFilter.classList.toggle('hiddeCloseFilter')
    containerInput.style.width = '65%'
    resultFollower.classList.toggle('showResultFollowerMobile')
    closeInputMobile.classList.toggle('showCloseMobileInput')
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

//Destaca a aba de criação de Log para desktop
newLogDesk.addEventListener('click', showNewLog)

//Destaca a aba de criação de Log para mobile
newPostMobile.addEventListener('click', showNewLog)

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

//Adiciona event para as curtidas
likes.forEach(like => {
    like.addEventListener('click', () => {
        let like = event.target
        if (String(like.src).includes('img/likeEnable.png')) {
            like.src = 'img/likeDisable.png'

        } else {
            like.src = 'img/likeEnable.png'

        }
    })
})

//Adiciona event para os favoritos
favorites.forEach(favorite => {
    favorite.addEventListener('click', () => {
        let favorite = event.target
        if (String(favorite.src).includes('img/favEnable.png')) {
            favorite.src = 'img/favDisable.png'

        } else {
            favorite.src = 'img/favEnable.png'
        }
    })
})

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

//Direciona para o perfil do usuário clicado
allFollower.forEach(follower => {
    follower.addEventListener('click', () => {
        goProfileUser()
    })
})

//Direcionamento para o perfil do usuário clicado no Log
profilesName.forEach(userLog => {
    userLog.addEventListener('click', () => {
        goProfileUser()
    })
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
    // if (!inputDateContainer.contains(event.target)) {
    //     const inputDate = document.querySelectorAll('.filterDate')
    //     const spanContainer = document.querySelector('.containerFilterDate span')

    //     spanContainer.innerHTML = 'Data'
    //     inputDateContainer.classList.remove('expandFilterDate')

    //     for (let i = 0; i < inputDate.length; i++) {
    //         inputDate[i].classList.remove('showFilterDate')

    //     }
    // }

    if (!inputLocationFilter.contains(event.target)) {
        inputLocationFilter.classList.remove('expandFilterLocation')

    }
})


async function uploadImageLog() {
    const uploadParams = {
        storageAccount: "travellog",
        containerName: "logs",
        file: document.getElementById("selectImgInput").files[0],
        sasToken: 'sp=c&st=2025-12-11T00:37:42Z&se=2025-12-20T03:00:00Z&spr=https&sv=2024-11-04&sr=c&sig=iLcABEgTFCqBVhJ7FZNQhHieVnrL%2FBHgGEkqQvCoRQg%3D'
    }

    const midia = await uploadImageToAzure(uploadParams)

    console.log(JSON.stringify(midia))

}

function preview({ target }) {

    let blob = URL.createObjectURL(target.files[0])

}

document.getElementById("selectImgInput")
    .addEventListener('change', preview)

document.getElementById("saveLog")
    .addEventListener("click", uploadImageLog)


//Google api
init()

async function init() {

    //Pega a input do HTML
    const localizacao = document.getElementById("locationNewLogInput")

    //Inicializa uma nova instância do widget de auto-complete.
    let autoComplete = new google.maps.places.Autocomplete(localizacao, {

        // Não definimos nenhum valor para o campo types, para ser possível
        //buscar estabelecimentos

        fields: ["name", "address_components", "geometry"],
        types: ["establishment", "geocode"]

    })

    let localObject = []

    autoComplete.addListener('place_changed', async () => {
        let place = autoComplete.getPlace()

        localObject.push({ local_nome: place.name })

        let componentsAdress = place.address_components

        for (let components of componentsAdress) {

            if (components.types[0] == 'country') {
                localObject.push({ pais: components.long_name })
            } else if (components.types[0] == 'administrative_area_level_1') {
                localObject.push({ estado: components.long_name })
            } else if (components.types[0] == 'administrative_area_level_2') {
                localObject.push({ cidade: components.long_name })
            } else if (components.types[0] == 'sublocality') {
                localObject.push({ cidade: components.long_name })
            } else if (components.types[0] == 'locality') {
                localObject.push({ cidade: components.long_name })
            }

        }

        console.log(localObject)

        localObject = []

    })

}

// ----------------------------------------------------------
//              MÉTODOS DE INTEGRAÇÃO (Requisições)
// ----------------------------------------------------------


async function getHomeContent(id, inputFilters) {
    const params = new URLSearchParams(inputFilters)
    const endPoint = `http://localhost:8080/v1/travellog/log/following/${id}?${params.toString()}`
    const response = await fetch(endPoint)
    const data = await response.json();
    return data
}

async function getFollowingList(id){
    const endPoint = `http://localhost:8080/v1/travellog/following/${id}?`
    const response = await fetch(endPoint)
    const data = await response.json();
    return data
}

async function getExploreContent(id, inputFilters) {
    const params = new URLSearchParams(inputFilters)
    const endPoint = `http://localhost:8080/v1/travellog/log/explore/${id}?${params.toString()}`
    const response = await fetch(endPoint)
    const data = await response.json();
    return data
}


// ----------------------------------------------------------
//              MÉTODOS DE INTEGRAÇÃO (Carregamento)
// ----------------------------------------------------------

async function loadFollowingTab(id){
    let containerFollower = getElementById('containerFollowerListaaa')
    clearChildren(containerFollower)
    const followingList = await getFollowingList(id)
    followingList.items.seguindo.forEach(createFollower)
}

// carregando conteúdo da home
async function loadHomeContent(id, inputFilters) {
    console.log('1')
    clearChildren(containerLogs)
    
    const homeLogs = await getHomeContent(id, inputFilters)
    console.log(homeLogs.status_code)
    
    if (homeLogs.status_code == 404){
        loadEmptyHome(containerLogs)
    }
    else{
        homeLogs.items.logs.forEach(createLogs)
    }
}

function loadEmptyHome(){
    let emptyText = document.createElement('h2')
    emptyText.textContent = `"Opa! Nenhum conteúdo dos perfis que você segue, experimente a aba "Explorar"`
    console.log(containerLogs)

    containerLogs.appendChild(emptyText)
}

async function loadExploreContent(id, inputFilters) {
    //clearChildren(containerLogs)
    const exploreLogs = await getExploreContent(id, inputFilters)
    exploreLogs.items.logs.forEach(createLogs);
}

// ----------------------------------------------------------
//              MÉTODOS DE INTEGRAÇÃO (Funções tratativas)
// ----------------------------------------------------------

function clearChildren(container){
    while (container.firstChild){
        container.removeChild(container.firstChild)
    }
}

// ----------------------------------------------------------
//              CHAMANDO OS MÉTODOS DE INTEGRAÇÃO
// ----------------------------------------------------------
let userId = localStorage.getItem('userId');

loadHomeContent(userId)
// loadFollowingTab(userId)
// loadExploreContent(1, {})
