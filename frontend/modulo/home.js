'use strict'

import { uploadImageToAzure } from "../js/uploadImageToAzure.js"

let localObject = []
const filterBlack = document.getElementById('filterBlack')
const closeFilter = document.getElementById('closeFilter')
const liListTravelMob = document.querySelectorAll('#listTypeLogMob li')
const liListTravelDesk = document.querySelectorAll('#listTypeLog li')
const liListTravelNewLog = document.querySelectorAll('#listTravel li')
const allFollower = document.querySelectorAll('.follower')
const iconProfileUser = document.getElementById('profileNav')
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
async function createLogs(log) {
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
    spanLocation.classList.add('locationLog')

    //Header do log (identificador do autor)
    spanName.classList.add('selectable')
    divProfile.classList.add('selectable')

    spanName.onclick = async () => {
        loadProfile(log.usuario_id)
    }
    divProfile.onclick = async () => {
        loadProfile(log.usuario_id)
    }


    // Conteudo do log
    logDiv.id = `log${log.log[0].log_id}`
    imgLike.src = 'img/likeDisable.png'
    imgFav.src = 'img/favDisable.png'
    spanName.textContent = log.apelido;

    //Coloquei essa tratativa para conseguir acessar com banco de dados sem imagens
    if (log.log[0].midias != undefined) {
        let thumbnailLog = String(log.log[0].midias[0].link).replace(/"/g, '')
        imgLog.src = thumbnailLog
    }
    numberLikes.textContent = log.log[0].curtidas;
    numberFav.textContent = log.log[0].favoritos;

    //Carregando se foi favoritado ou curtido

    if (log.curtido == 1) {
        imgLike.classList.add('enabled')
        imgLike.src = 'img/likeEnable.png'
    } else {
        imgLike.src = 'img/likeDisable.png'
    }

    if (log.favoritado) {
        imgFav.classList.add('enabled')
        imgFav.src = 'img/favEnable.png'
    }
    else {
        imgFav.src = 'img/favDisable.png'
    }

    imgLocation.src = 'img/location.png'

    if (log.foto_perfil == "null") {
        imgProfile.src = 'img/emptyProfileUser.jpg'

    } else {
        imgProfile.src = log.foto_perfil;
    }

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


    logDiv.addEventListener('click', () => {
        logFull(logDiv.id)
    })

    let dateFimChar = log.log[0].data_postagem.slice(0, 10)
    let spliceDate = dateFimChar.split('-')

    let dataFim = `${spliceDate[2]}/${spliceDate[1]}/${spliceDate[0]}`

    logDiv.dataset.id = log.log[0].log_id
    logDiv.dataset.date = dataFim
    logDiv.dataset.descricao = log.log[0].descricao
    logDiv.dataset.curtidas = log.log[0].curtidas
    logDiv.dataset.favoritos = log.log[0].favoritos
    logDiv.dataset.travel = log.viagem[0].titulo
    logDiv.dataset.idtravel = log.viagem[0].viagem_id

    //Validar quantidade Imgs
    // if (log.midia.length == 0) {
    //     divArrow1.classList.add('hiddeArrowImg')
    //     divArrow2.classList.add('hiddeArrowImg')

    // }
    // Evento de deixar curtida
    divLikes.onclick = async (event) => {
        event.stopPropagation()

        let alteracao = await alternarCurtida(log.log[0].log_id, imgLike)

        let oldContagem = numberLikes.textContent
        numberLikes.textContent = Number(oldContagem) + alteracao
    }

    //Evento de favoritar
    divFav.onclick = async (event) => {
        event.stopPropagation()

        let alteracao = await alternarFavorito(log.log[0].log_id, imgFav)

        let oldContagem = numberFav.textContent
        numberFav.textContent = Number(oldContagem) + alteracao
    }

}


// Quando der click em curtir
async function alternarCurtida(log_id, imgLike) {
    //Rota
    const url = `http://localhost:8080/v1/travellog/like/`

    //configurando
    const options = {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },

        //conteúdo
        body: JSON.stringify({
            log_id: log_id, usuario_id: userId
        })
    }
    let response = await fetch(url, options)


    if (imgLike.classList.contains('enabled')) {
        imgLike.classList.remove('enabled')
        imgLike.src = 'img/likeDisable.png'
        return -1

    } else {
        imgLike.classList.add('enabled')
        imgLike.src = 'img/likeEnable.png'
        return +1
    }
}

// Quando der click em favorito
async function alternarFavorito(log_id, imgFav) {
    //Rota
    const url = `http://localhost:8080/v1/travellog/favorite/`

    //configurando
    const options = {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },

        //conteúdo
        body: JSON.stringify({
            log_id: log_id, usuario_id: userId
        })
    }
    let response = await fetch(url, options)

    if (imgFav.classList.contains('enabled')) {
        imgFav.classList.remove('enabled')
        imgFav.src = 'img/favDisable.png'
        return -1

    } else {
        imgFav.classList.add('enabled')
        imgFav.src = 'img/favEnable.png'
        return +1
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

//Cria e adiciona os seguidores
function createFollower(follower) {
    const containerFollower = document.getElementById('containerFollowerList')

    let divFollower = document.createElement('div')
    let divProfile = document.createElement('div')
    let imgProfile = document.createElement('img')
    let spanName = document.createElement('span')


    spanName.classList.add('nameFollower')
    divFollower.classList.add('follower')
    divFollower.classList.add('selectable')
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

    spanNameMob.textContent = `@${follower.apelido}`
    if (follower.foto_perfil == "null") {
        imgProfile.src = 'img/emptyProfileUser.jpg'

    } else {
        imgProfileMob.src = follower.foto_perfil

    }


    divFollowerMob.append(divProfileMob, spanNameMob)
    divProfileMob.appendChild(imgProfileMob)

    if (follower.id) {
        divFollower.addEventListener('click', () => loadProfile(follower.id))
    }
    else {
        divFollower.addEventListener('click', () => loadProfile(follower.seguido_id))
    }


    containerFollowerMobile.appendChild(divFollowerMob)

}

//Adiciona as viagens na lista
function getTravelLi(li) {
    console.log(li)
    const listTravel = document.querySelector('#listTravel ul')

    let createLi = document.createElement('li')
    createLi.innerHTML = li.viagem_titulo
    createLi.dataset.id = li.id_viagem

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
    textTravel.dataset.id = li.dataset.id

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
async function logFull(id) {
    const logClickElement = document.getElementById(id)
    const location = document.querySelector(`#${logClickElement.id} .locationLog`)
    const logClick = logClickElement.querySelectorAll('*')
    const logFull = document.getElementById('logFull').querySelectorAll('*')
    const logFull1 = document.getElementById('logFull')

    logFull[12].src = logClick[9].src

    elementHigh = logFull1.id
    filterBlack.classList.toggle('showFilter')
    logFull1.classList.toggle('showModal')

    logFull[3].dataset.id = logClickElement.dataset.id
    logFull[3].innerHTML = logClick[3].textContent
    logFull[12].dataset.img = logClick[0].dataset.img
    logFull[5].innerHTML = logClickElement.dataset.travel
    logFull[8].innerHTML = location.textContent
    logFull[18].innerHTML = logClickElement.dataset.curtidas
    logFull[21].innerHTML = logClickElement.dataset.favoritos
    logFull[23].innerHTML = logClickElement.dataset.date
    logFull[25].innerHTML = logClickElement.dataset.descricao

    let url = `http://localhost:8080/v1/travellog/comment/${logClickElement.dataset.id}`

    let response = await fetch(url)

    let comments = await response.json()

    if (comments.status_code == 404) {
        logFull[31].innerHTML = 0

    } else {
        logFull[31].innerHTML = comments.length
        const container = document.querySelector('.containerCommentsMain')
        clearChildren(container)
        comments.items.comentario.forEach((comment) => {
            createComments(comment)
        })
    }

}

//Destaca a aba de criação de Log
function showNewLog() {
    const newLog = document.getElementById('newLog')
    filterBlack.classList.toggle('showFilter')
    newLog.classList.toggle('showModal')

    elementHigh = 'newLog'
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
    alternarAbaFiltroMobile()

})

async function alternarAbaFiltroMobile() {
    const filterContainer = document.getElementById('containerFilterMob')

    //Exibindo o menu de filtro
    if (!filterContainer.classList.contains('showFilterMob')) {
        filterContainer.classList.toggle('showFilterMob')
    } else { //Fechando, vai coletar os filtros e aplicar
        const dataInicio = inputDateBeginMob.value;
        const dataFim = inputDateEndMob.value;
        // A IMPLEMENTAR
        const localPais = ''
        const localEstado = ''
        const localCidade = ''
        const nomeLocal = ''
        const tipoViagemId = ''
        const filterBody = {
            data_inicio: dataInicio,
            data_fim: dataFim,
            local_pais: localPais,
            local_estado: localEstado,
            local_cidade: localCidade,
            nome_local: nomeLocal,
            tipo_viagem_id: tipoViagemId
        }

        //Decidindo qual página vai recarregar (tem que ser a atual)
        if (currentPage == 'home') {
            loadHomeContent(userId, filterBody)
        }
        if (currentPage == 'favorites') {
            loadFavoriteContent(userId, filterBody)
        }
        if (currentPage == 'explore') {
            loadExploreContent(userId, filterBody)

        }


        filterContainer.classList.toggle('showFilterMob')
    }



}

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

iconProfileUser.addEventListener('click', (event) => {
    event.stopPropagation()
    loadProfile(userId)
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

async function setDataProfile() {
    const nameUserDesk = document.getElementById('nameUserDesk')
    const profileIconDesk = document.getElementById('imgProfileDesk')
    const profileIcon = document.getElementById('profileHeader')

    profileIcon.addEventListener('click', () => {
        loadProfile(userId)
    })

    let dataUser = await getUserData()

    if (dataUser.items.usuario.foto_perfil == "null") {
        profileIcon.src = 'img/emptyProfileUser.jpg'
        profileIconDesk.src = 'img/emptyProfileUser.jpg'

    } else {
        profileIcon.src = dataUser.items.usuario.foto_perfil
        profileIconDesk.src = dataUser.items.usuario.foto_perfil
    }


    nameUserDesk.innerHTML = dataUser.items.usuario.apelido
}


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

    return String(midia)
}

function preview({ target }) {

    let blob = URL.createObjectURL(target.files[0])

}

document.getElementById("selectImgInput")
    .addEventListener('change', preview)

const btnSaveLog = document.getElementById('saveLog')
btnSaveLog.addEventListener("click", postLog)


init()

//Google api
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

    autoComplete.addListener('place_changed', async () => {
        let place = autoComplete.getPlace()

        localObject.push({ local_nome: place.name })

        let componentsAdress = place.address_components

        let cidade
        for (let components of componentsAdress) {

            if (components.types[0] == 'country') {
                localObject.push({ pais: components.long_name })
            } else if (components.types[0] == 'administrative_area_level_1') {
                localObject.push({ estado: components.long_name })
            } else if (components.types[0] == 'administrative_area_level_2') {
                cidade = components.long_name
            } else if (components.types[0] == 'sublocality') {
                cidade = components.long_name
            } else if (components.types[0] == 'locality') {
                cidade = components.long_name
            }

        }
        localObject.push({ cidade: cidade })

    })

}

// ----------------------------------------------------------
//              MÉTODOS DE INTEGRAÇÃO (Requisições)
// ----------------------------------------------------------

async function getFollowingList(id) {
    const endPoint = `http://localhost:8080/v1/travellog/following/${id}`
    const response = await fetch(endPoint)
    const data = await response.json();
    return data
}

async function getToFollowList() {
    const endPoint = `http://localhost:8080/v1/travellog/user/`
    const response = await fetch(endPoint)
    const data = await response.json();
    return data
}

async function getHomeContent(id, inputFilters) {
    const params = new URLSearchParams(inputFilters)
    const endPoint = `http://localhost:8080/v1/travellog/log/following/${id}?${params.toString()}`
    const response = await fetch(endPoint)
    const data = await response.json();
    return data
}

async function getUserData() {
    let url = `http://localhost:8080/v1/travellog/user/${userId}`
    let response = await fetch(url)
    let data = await response.json()

    return data
}


async function getExploreContent(id, inputFilters) {
    const params = new URLSearchParams(inputFilters)
    const endPoint = `http://localhost:8080/v1/travellog/log/explore/${id}?${params.toString()}`
    const response = await fetch(endPoint)
    const data = await response.json();
    return data
}

async function getUserTravels() {
    const endPoint = `http://localhost:8080/v1/travellog/travel/${userId}`
    const response = await fetch(endPoint)
    const data = await response.json()

    return data
}


// ----------------------------------------------------------
//              MÉTODOS DE INTEGRAÇÃO (Carregamento)
// ----------------------------------------------------------

function initHome() {
    const btnHome = document.getElementById('mobHome')
    const btnHomePc = document.getElementById('deskHome')
    btnHome.addEventListener('click', () => loadHomeContent(userId))
    btnHomePc.addEventListener('click', () => loadHomeContent(userId))
}

function initExplorar() {
    const btnExplorar = document.getElementById('mobLikes')
    const btnExplorarPc = document.getElementById('deskLikes')
    btnExplorar.addEventListener('click', () => loadExploreContent(userId))
    btnExplorarPc.addEventListener('click', () => loadExploreContent(userId))
}

function initFavoritos() {
    const btnFavoritos = document.getElementById('mobFav')
    const btnFavoritsPc = document.getElementById('deskFav')
    btnFavoritos.addEventListener('click', () => loadFavoriteContent(userId))
    btnFavoritsPc.addEventListener('click', () => loadFavoriteContent(userId))

}

function initExplorarDesk() {
    const btnExplorar = document.getElementById('deskLikes');
    btnExplorar.addEventListener('click', () => loadExploreContent(userId))
}

async function getTravels() {
    let data = await getUserTravels()

    data.items.viagens.forEach((travel) => {
        getTravelLi(travel)

        const liListTravelNewLog = document.querySelectorAll('#listTravel li')

        //Adiciona event para os LI de viagens
        liListTravelNewLog.forEach(li => {
            li.addEventListener('click', () => {
                setTravel(li)
            })
        })
    })
}

//Para carregar a lista de perfis seguindo
async function loadFollowingTab(id) {

    let containerFollower = document.getElementById('containerFollowerList')


    clearChildren(containerFollower)

    const followingList = await getFollowingList(id)

    if (followingList.status_code == 404) {
        loadToFollowTab(containerLogs)
    }
    else {
        followingList.items.seguindo.forEach(createFollower)
    }
    // followingList.items.seguindo.forEach(createFollower)
}

// Para carregar todos os usuarios, é o discover de perfis
async function loadToFollowTab(containerLogs) {

    const toFollowList = await getToFollowList()

    const searchInput = document.getElementById('inputFollowerDesk')
    searchInput.placeholder = "Usuários"
    toFollowList.items.usuario.forEach(createFollower)

}

// carregando conteúdo da home
async function loadHomeContent(id, inputFilters) {
    currentPage ='home'
    clearChildren(containerLogs)

    const homeLogs = await getHomeContent(id, inputFilters)

    if (homeLogs.status_code == 404) {
        loadEmptyHome(containerLogs)
    }
    else {
        homeLogs.items.logs.forEach(createLogs)
    }
}

// favoritos provisório, fazer um endpoint no backend para maior eficiência
async function loadFavoriteContent(id, inputFilters) {
    currentPage = 'favorites'
    clearChildren(containerLogs)
    const exploreLogs = await getExploreContent(id, inputFilters)
    const logArray = exploreLogs.items.logs
    let favoriteLogs = []

    for (let i = logArray.length - 1; i >= 0; i--) {
        const log = logArray[i]
        if (log.favoritado) {
            favoriteLogs.push(log)
        }
    }

    favoriteLogs.forEach(createLogs)
}

function loadEmptyHome() {
    let emptyText = document.createElement('h2')
    emptyText.textContent = `"Opa! Nenhum conteúdo dos perfis que você segue, experimente a aba "Explorar"`

    containerLogs.appendChild(emptyText)
}

async function loadExploreContent(id, inputFilters) {
    currentPage = 'explore'
    clearChildren(containerLogs)
    const exploreLogs = await getExploreContent(id, inputFilters)
    if (exploreLogs.status_code == 404){
        let emptyText = document.createElement('h2')
        emptyText.textContent = "Nenhum conteudo encontrado"
    
        containerLogs.appendChild(emptyText)
    }

    if (exploreLogs.items.logs){
        exploreLogs.items.logs.forEach(createLogs);
    }

}

// ----------------------------------------------------------
//              MÉTODOS DE INTEGRAÇÃO (Funções tratativas)
// ----------------------------------------------------------

function clearChildren(container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild)
    }
}

// ----------------------------------------------------------
//              MÉTODOS DE INTEGRAÇÃO (Para abrir outra página)
// ----------------------------------------------------------
function loadProfile(perfil_id) {
    localStorage.setItem('perfilId', perfil_id)
    window.location.href = `profile.html`

}
// ----------------------------------------------------------
//              MÉTODOS DE INTEGRAÇÃO (Para postagem e atualização)
// ----------------------------------------------------------
function validarDateLog(log) {
    if (log.descricao == null || log.descricao == '' || log.descricao == undefined || log.descricao.length > 1500) {
        return 'Descrição inválida!'

    } else if (log.viagem_id == null || log.viagem_id == '' || log.viagem_id == undefined || isNaN(log.viagem_id)) {
        return 'ID da viagem inválida!'

    } else if (log.visivel == null || log.visivel == '' || log.visivel == undefined) {
        return 'Visibilidade do Log inválida!'

    } else if (log.nome_pais == null || log.nome_pais == '' || log.nome_pais == undefined || log.nome_pais.length > 255) {
        return 'País inválido!'

    } else if (log.estado == null || log.estado == '' || log.estado == undefined || log.estado.length > 75) {
        return 'Estado inválido!'

    } else if (log.cidade == null || log.cidade == '' || log.cidade == undefined || log.cidade.length > 75) {
        return 'Cidade inválida!'

    } else if (log.nome_local == null || log.nome_local == '' || log.nome_local == undefined || log.nome_local.length > 255) {
        return 'Nome do local inválid0!'

    } else if (log.midias[0].link == null || log.midias[0].link == '' || log.midias[0].link == undefined || log.midias[0].link.length > 255) {
        return 'Foto inválida!'

    } else {
        return false

    }
}

//Criar log
async function postLog() {
    let des = document.getElementById('descriptionNewLog')
    let via = document.querySelector('.selectTravel span')
    let vis = document.getElementById('visibleTravel')

    if (vis.textContent == 'Público') {
        vis = true

    } else {
        vis = false
    }

    let imgLink = await uploadImageLog()

    console.log(localObject)
    let newLog = {
        descricao: des.value,
        viagem_id: Number(via.dataset.id),
        visivel: true,
        nome_pais: localObject[3].cidade,
        estado: localObject[2].pais,
        cidade: localObject[1].estado,
        nome_local: localObject[0].local_nome,
        midias: [
            { link: imgLink }
        ]
    }

    let resultValidar = validarDateLog(newLog)

    if (resultValidar != false) {
        console.log(resultValidar)

    } else {
        let bodyPost = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newLog),
        }

        let url = `http://localhost:8080/v1/travellog/log/`
        let response = await fetch(url, bodyPost)

        // let containerMessageMain = document.getElementById('containerMessageMain')
        // let plane = document.querySelector('.planeAnimation')
        // let hiddeSpan = document.querySelector('.converSpan')

        // containerMessageMain.style.animation = 'showMessage 5.2s linear'
        // plane.style.animation = 'movePlane 4.6s linear'
        // hiddeSpan.style.animation = 'moveSpan 4.8s linear'

        // setTimeout(() => {
        //     containerMessageMain.style.animation = 'none'
        //     plane.style.animation = 'none'
        //     hiddeSpan.style.animation = 'none'
        // }, 6000);

        filterBlack.classList.toggle('showFilter')
        const elementHide = document.getElementById(elementHigh)
        alert('Log criado com sucesso!')
        elementHide.classList.toggle('showModal')
    }

    let input = document.getElementById('locationNewLogInput')

    input.value = ''
    des.value = ''
    via.innerHTML = 'Selecione a Viagem'
    localObject = []
}

// ----------------------------------------------------------
//              CHAMANDO OS MÉTODOS DE INTEGRAÇÃO
// ----------------------------------------------------------
const userId = localStorage.getItem('userId')
let currentPage;
initExplorar()
initExplorarDesk()
initHome()
initFavoritos()
loadHomeContent(userId)
loadFollowingTab(userId)
setDataProfile()
getTravels()