'use strict'

import { uploadImageToAzure } from "../js/uploadImageToAzure.js"

var id_user = null
let localObject = []
let data_user
const buttonSaveTravel = document.getElementById('saveNewTravel')
const updateLogIcon = document.getElementById('editLogIcon')
const updateLogButton = document.getElementById('updateLogButton')
const saveLog = document.getElementById('saveLog')
const filterBlack = document.getElementById('filterBlack')
const closeFilter = document.getElementById('closeFilter')
const filterBlackSettings = document.getElementById('filterBlackSettings')
const closeFilterSettings = document.getElementById('closeFilterSettings')
const iconProfileUser = document.getElementById('profileNav')
const iconProfileMobile = document.querySelector('.containerSettings div')
const sectionSettings = document.getElementById('sectionSettings')
const inputConfirmPass = document.getElementById('passChangeInput')
const iconSettingsDesk = document.getElementById('settingsNav')
const iconSettingsMob = document.getElementById('settingsHeader')
const buttonChangePass = document.getElementById('changePass')
const buttonConfirmPass = document.getElementById('confirmPass')
const buttonCancelPass = document.getElementById('cancelPass')
const buttonDeleteAccount = document.getElementById('deleteAccount')
const buttonConfirmDeleteAccount = document.getElementById('confirmDeleteAccount')
const buttonCancelDeleteAccount = document.getElementById('cancelDeleteAccount')
const inputDateContainer = document.querySelector('.containerFilterDate')
const inputContainerDateMob = document.querySelector('.containerFilterDateMob')
const inputDateBegin = document.getElementById('filterDateBegin')
const inputDateEnd = document.getElementById('filterDateEnd')
const inputDateBeginMob = document.getElementById('filterDateBeginMob')
const inputDateEndMob = document.getElementById('filterDateEndMob')
const inputLocationFilter = document.getElementById('filterLocation')
const arrowChangeImgLogLeft = document.querySelectorAll('.containerArrowLeft')
const arrowChangeImgLogRight = document.querySelectorAll('.containerArrowRight')
const arrowChangeImgLogLeftLogFull = document.querySelector('.containerArrowImgLogLeftFull')
const arrowChangeImgLogRightLogFull = document.querySelector('.containerArrowImgLogRightFull')
const arrowTypeFilterDesk = document.getElementById('arrowType')
const arrowTypeFilterMobile = document.getElementById('arrowTypeMob')
const arrowNewLog = document.getElementById('arrowSelectTravel')
const arrowNewTravel = document.getElementById('arrowSelectTypeTravel')
const newPostMobile = document.getElementById('newPost')
const buttonVisibleLogUpdate = document.getElementById('visibleTravelUpdate')
const buttonVisibleLog = document.getElementById('visibleTravel')
const buttonVisibleTravel = document.getElementById('visibleNewTravel')
const filterMobile = document.getElementById('mobFilter')
const newLog = document.querySelector('.logCreator')
const newTravel = document.querySelector('.viagemCreator')
const logs = document.querySelectorAll('.log')
const travels = document.querySelectorAll('.viagem')
const returnTravels = document.getElementById('returnToTravels')
const likeLogFull = document.querySelector('.likeLogFullImg')
const favoriteLogFull = document.querySelector('.favLogFullImg')
const buttonFollower = document.getElementById('followUser')
const editNickname = document.getElementById('editNickname')
const inputName = document.getElementById('updateName')
const editName = document.getElementById('editName')
const inputNickname = document.getElementById('updateNickname')
const editDescription = document.getElementById('editDescription')
const inputDescription = document.getElementById('updateDescriptionProfile')
var elementUpdate = null
var idCallMessage = null
var elementHigh = null
var elementHighSettings = null

const logNavButton = document.getElementById("nav-button-log");
const viagemNavButton = document.getElementById('nav-button-viagem');
const estatisticaNavButton = document.getElementById('nav-button-estatistica');

const containerDeLogs = document.getElementById('container-de-logs');
const containerDeViagens = document.getElementById('container-de-logs');
const carrosselDeConteudo = document.getElementById('carrossel-de-conteudo');

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

    let containerDeLogs = document.getElementById('container-de-logs')

    let logDiv = document.createElement('div')
    let imgLog = document.createElement('img')
    let footer = document.createElement('footer')
    let imgFooter = document.createElement('img')
    let span = document.createElement('span')

    logDiv.classList.add('log')
    imgLog.classList.add('logThumbnail')
    imgFooter.classList.add('locationIcon')
    footer.classList.add('logFooter')
    span.classList.add('footerTxt')

    logDiv.append(imgLog, footer)
    footer.append(imgFooter, span)
    containerDeLogs.append(logDiv)

    logDiv.id = `log${log.log_id}`
    logDiv.dataset.id = log.log_id
    imgFooter.src = 'img/Location_Icon.svg'

    span.innerHTML = `${log.local[0].nome_local}, ${log.local[0].cidade} - ${log.local[0].estado}, ${log.local[0].pais.pais}`

    let dateFimChar = log.data_postagem.slice(0, 10)
    let spliceDate = dateFimChar.split('-')

    let dataFim = `${spliceDate[2]}/${spliceDate[1]}/${spliceDate[0]}`

    logDiv.dataset.date = dataFim
    logDiv.dataset.descricao = log.descricao
    logDiv.dataset.curtidas = log.curtidas
    logDiv.dataset.favoritos = log.favoritos
    logDiv.dataset.travel = log.viagem_titulo
    logDiv.dataset.idtravel = log.viagem_id

    //Remove as aspas do link para colocar no src da img
    let thumbnailLog = String(log.midias[0].link).replace(/"/g, '')
    let imgDataSet = thumbnailLog

    for (let i = 1; i < log.midias.length; i++) {
        imgDataSet += `,${log.midias[i].link}`

    }

    imgLog.dataset.img = imgDataSet

    let imgLogFirst = imgDataSet.split(',')
    imgLog.src = imgLogFirst[0]

    logDiv.addEventListener('click', () => {
        logFull(logDiv.id)
    })

    //Validar quantidade Imgs
    // if (log.midia.length == 0) {
    //     divArrow1.classList.add('hiddeArrowImg')
    //     divArrow2.classList.add('hiddeArrowImg')

    // }

}

function createLogsTravel(log, id_viagem) {
    if (log.viagem_id == id_viagem) {
        let containerDeLogs = document.querySelector('.containerTravelLogs')

        let logDiv = document.createElement('div')
        let imgLog = document.createElement('img')
        let footer = document.createElement('footer')
        let imgFooter = document.createElement('img')
        let span = document.createElement('span')

        logDiv.classList.add('log')
        imgLog.classList.add('logThumbnail')
        imgFooter.classList.add('locationIcon')
        footer.classList.add('logFooter')
        span.classList.add('footerTxt')

        logDiv.append(imgLog, footer)
        footer.append(imgFooter, span)
        containerDeLogs.append(logDiv)

        logDiv.id = `log${log.log_id}`
        logDiv.dataset.id = log.log_id
        imgFooter.src = 'img/Location_Icon.svg'

        span.innerHTML = `${log.local[0].nome_local} - ${log.local[0].cidade}, ${log.local[0].estado}, ${log.local[0].pais.pais}`

        //Remove as aspas do link para colocar no src da img
        let thumbnailLog = String(log.midias[0].link).replace(/"/g, '')
        let imgDataSet = thumbnailLog

        for (let i = 1; i < log.midias.length; i++) {
            imgDataSet += `,${log.midias[i].link}`

        }

        imgLog.dataset.img = imgDataSet

        let imgLogFirst = imgDataSet.split(',')
        imgLog.src = imgLogFirst[0]

        logDiv.addEventListener('click', () => {
            logFull(logDiv.id)
        })

        //Validar quantidade Imgs
        // if (log.midia.length == 0) {
        //     divArrow1.classList.add('hiddeArrowImg')
        //     divArrow2.classList.add('hiddeArrowImg')

        // }
    }

}

//Cria viagens
function createTravel(travel) {
    console.log(travel)
    const containerTravel = document.getElementById('container-de-viagens')
    let divTravel = document.createElement('div')
    let img = document.createElement('img')
    let footer = document.createElement('footer')
    let spanTxt = document.createElement('span')
    let span = document.createElement('span')

    divTravel.append(img, footer)
    footer.append(spanTxt, span)
    containerTravel.appendChild(divTravel)

    divTravel.classList.add('viagem')
    img.classList.add('logThumbnail')
    footer.classList.add('viagemFooter')
    spanTxt.classList.add('footerTxt')
    span.classList.add('viagemData')

    spanTxt.innerHTML = travel.viagem_titulo


    img.src = travel.thumbnail
    divTravel.id = `travel${travel.id_viagem}`
    divTravel.dataset.id = travel.id_viagem
    let dateFimChar = travel.data_inicio.slice(0, 10)
    let spliceDate = dateFimChar.split('-')

    let dataFim = `${spliceDate[2]}/${spliceDate[1]}/${spliceDate[0]}`

    span.innerHTML = dataFim

    divTravel.addEventListener('click', () => {
        showLogsTravel(divTravel.dataset.id)
    })
}

//Adiciona dados do usuário
function setDataUser(user) {
    let imgSettings = document.querySelector('.profileImgSettings')
    let nicknameSettings = document.querySelector('.nickNameSettings')
    let nameSettings = document.querySelector('.nameSettings')
    let logsSettings = document.querySelector('.logsSettings')
    let seguidoresSettings = document.querySelector('.followerSettings')
    let seguindoSettings = document.querySelector('.followingSettings')
    let descricaoSettings = document.querySelector('.descriptionSettings')
    let nameUserDesk = document.getElementById('nameUserDesk')
    let profileIconDesk = document.getElementById('imgProfileDesk')
    let profileIcon = document.getElementById('profileHeader')

    // Caso o perfil não pertença ao usuário
    if (perfilId != userId) {
        loadVisitorContent(user)

    } else {
        loadOwnerContent(user)
    }


    nameUserDesk.innerHTML = user.apelido
    imgSettings.src = user.foto_perfil
    nicknameSettings.innerHTML = user.apelido
    nameSettings.innerHTML = user.nome
    console.log(user)



    seguidoresSettings.innerHTML = `Seguidores ${user.seguidores.length}`
    seguindoSettings.innerHTML = `Seguindo ${user.seguindo.length}`

    let imgProfile = document.getElementById('imgProfile')
    let name = document.querySelector('.profileNickname')
    let logs = document.querySelector('.titleInfo')
    let followers = document.querySelector('.followerInfo .titleInfo:nth-child(1)')
    let following = document.querySelector('.followerInfo .titleInfo:nth-child(2)')
    let description = document.querySelector('.profileDescription')

    name.innerHTML = user.apelido
    if (user.logs) {
        logs.textContent = `Logs ${user.logs.length}`
        logsSettings.textContent = `Logs ${user.logs.length}`
    }
    else {
        logsSettings.textContent = `Logs 0`
        logs.textContent = `Logs 0`
    }



    followers.innerHTML = `Seguidores ${user.seguidores.length}`
    following.innerHTML = `Seguindo ${user.seguindo.length}`

    if (user.foto_perfil == "null") {
        profileIcon.src = 'img/emptyProfileUser.jpg'
        profileIconDesk.src = 'img/emptyProfileUser.jpg'
        imgProfile.src = 'img/emptyProfileUser.jpg'
        imgSettings.src = 'img/emptyProfileUser.jpg'

    } else {
        profileIcon.src = user.foto_perfil
        profileIconDesk.src = user.foto_perfil
        imgProfile.src = user.foto_perfil
        imgSettings.src = user.foto_perfil
    }

    if (user.descricao === "null") {
        descricaoSettings.innerHTML = 'Que tal adicionar uma descrição?'
        description.innerHTML = 'Que tal adicionar uma descrição?'

    } else {
        descricaoSettings.innerHTML = user.descricao
        description.innerHTML = user.descricao
    }
}

function loadOwnerContent() {

    const btnFollow = document.getElementById('followUser')
    btnFollow.remove()

}

function loadVisitorContent(user) {
    const followBody = { usuario_id: Number(perfilId), seguidor_id: Number(userId) }
    const newLog = document.querySelector('.logCreator')

    newLog.classList.add('display-none')

    const btnFollow = document.getElementById('followUser')


    const perfilSeguidores = user.seguidores

    for (let seguidor of perfilSeguidores) {
        if (seguidor.seguidor_id == userId) {
            btnFollow.classList.add('enabled')
        }
    }
    if (btnFollow.classList.contains('enabled')) {
        btnFollow.textContent = 'Seguindo'
    } else {
        btnFollow.textContent = 'Seguir'
    }

    // Função de seguir
    btnFollow.onclick = async () => {
        const seguidoresSettings = document.querySelector('.followerSettings')
        const seguidoresContagem = document.querySelector('.followerInfo .titleInfo:nth-child(1)')
        let alteracao = await alternarSeguindo(user.id, btnFollow)
        let oldContagem = seguidoresSettings.textContent.split(' ')[1]
        let newContagem = Number(oldContagem) + alteracao
        seguidoresSettings.textContent = `Seguidores ${newContagem}`
        seguidoresContagem.textContent = `Seguidores ${newContagem}`
    }
}

// Quando der click no botão de seguir
async function alternarSeguindo(perfil_id, btnFollow) {
    const body = {
        usuario_id: Number(perfil_id),
        seguidor_id: Number(userId)
    }

    if (btnFollow.classList.contains('enabled')) {
        removeFollow(body)
        btnFollow.classList.remove('enabled')
        btnFollow.textContent = 'Seguir'
        return -1

    } else {
        addFollow(body)
        btnFollow.classList.add('enabled')
        btnFollow.textContent = 'Seguindo'
        return +1
    }
}


async function addFollow(followBody) {
    let url = `http://localhost:8080/v1/travellog/follow/`

    const options = {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(followBody)
    }
    let response = await fetch(url, options)
}

async function removeFollow(followBody) {
    await fetch('http://localhost:8080/v1/travellog/follow/', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(followBody)

    })
}

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
    let des = document.getElementById('descriptionNewLog').value
    let via = Number(document.querySelector('.selectTravel span').dataset.id)
    let vis = document.getElementById('visibleTravel').textContent

    if (vis == 'Público') {
        vis = true

    } else {
        vis = false
    }

    let imgLink = await uploadImageLog()

    let newLog = {
        descricao: des,
        viagem_id: via,
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

    localObject = []

    if (resultValidar != false) {
        alert(resultValidar)

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

        alert('Log criado com sucesso!')
        filterBlack.classList.toggle('showFilter')
        const elementHide = document.getElementById(elementHigh)
        elementHide.classList.toggle('showModal')
    }

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

    let input = document.getElementById('locationNewLogInput')

    input.value = ''
    des.value = ''
    via.innerHTML = 'Selecione a Viagem'
    
    localObject = []
}

//Atualiza um log
async function updateLog() {
    let id_log = updateLogIcon.dataset.id
    let des = document.getElementById('descriptionUpdateLog').value
    let via = Number(document.querySelector('.selectTravelUpdate span').dataset.idtravel)
    let vis = document.getElementById('visibleTravelUpdate').textContent

    if (vis == 'Público') {
        vis = true

    } else {
        vis = false
    }

    let imgLink = await uploadImageLogUpdate()

    let newLog = {
        descricao: des,
        viagem_id: via,
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

    localObject = []

    if (resultValidar != false) {
        alert(resultValidar)

    } else {
        let bodyPost = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newLog),
        }

        let url = `http://localhost:8080/v1/travellog/log/${id_log}`
        let response = await fetch(url, bodyPost)

        filterBlack.classList.toggle('showFilter')
        const elementHide = document.getElementById(elementHigh)
        alert('Log atualizado com sucesso!')
        elementHide.classList.toggle('showModal')
    }

    // let containerMessageMain = document.getElementById('containerMessageMain')
    // let plane = document.querySelector('.planeAnimation')
    // let hiddeSpan = document.querySelector('.converSpan')

    // message.innerHTML = 'Log atualizado com sucesso!'
    // containerMessageMain.style.animation = 'showMessage 5.2s linear'
    // plane.style.animation = 'movePlane 4.6s linear'
    // hiddeSpan.style.animation = 'moveSpan 4.8s linear'

    // setTimeout(() => {
    //     containerMessageMain.style.animation = 'none'
    //     plane.style.animation = 'none'
    //     hiddeSpan.style.animation = 'none'
    // }, 6000);
}

async function deleteLog(id_log) {
    let bodyPost = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    }

    let url = `http://localhost:8080/v1/travellog/log/${id_log}`
    let response = await fetch(url, bodyPost)

    filterBlack.classList.toggle('showFilter')
    const elementHide = document.getElementById(elementHigh)

    elementHide.classList.toggle('showModal')
}

function validarDateTravel(travel) {
    if (travel.titulo == null || travel.titulo == '' || travel.titulo == undefined || travel.titulo.length > 50) {
        return 'Nome inválido!'

    } else if (travel.usuario_id == null || travel.usuario_id == '' || travel.usuario_id == undefined || isNaN(travel.usuario_id)) {
        return 'ID da usuário inválido!'

    } else if (travel.tipo_viagem_id == null || travel.tipo_viagem_id == '' || travel.tipo_viagem_id == undefined || isNaN(travel.tipo_viagem_id)) {
        return 'ID da viagem inválida!'

    } else if (travel.visivel == null || travel.visivel == '' || travel.visivel == undefined) {
        return 'Visibilidade do Log inválida!'

    } else if (travel.thumbnail == null || travel.thumbnail == '' || travel.thumbnail == undefined || travel.thumbnail.length > 255) {
        return 'Foto inválida!'

    } else if (travel.data_inicio == null || travel.data_inicio == '' || travel.data_inicio == undefined) {
        return 'Data início inválida!'

    } else if (travel.data_fim == null || travel.data_fim == '' || travel.data_fim == undefined) {
        return 'Data fim inválida!'

    } else {
        return false

    }
}

//Cria uma viagem
async function postTravel() {
    let name = document.getElementById('inputNameTravel').value
    let data_inicio = document.getElementById('dateTravelBegin').value
    let data_fim = document.getElementById('dateTravelEnd').value
    let visivel = document.getElementById('visibleNewTravel').textContent
    let tipo_viagem = document.querySelector('.selectTypeTravel span')

    if (visivel == 'Público') {
        visivel = true

    } else {
        visivel = false
    }

    let imgLink = await uploadImageTravel()

    let newTravel = {
        usuario_id: Number(userId),
        titulo: name,
        data_inicio: data_inicio,
        data_fim: data_fim,
        visivel: true,
        tipo_viagem_id: Number(tipo_viagem.dataset.id),
        thumbnail: imgLink
    }

    let resultValidar = validarDateTravel(newTravel)

    localObject = []

    if (resultValidar != false) {
        alert(resultValidar)

    } else {
        let bodyPost = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTravel),
        }

        let url = `http://localhost:8080/v1/travellog/travel`
        let response = await fetch(url, bodyPost)

        filterBlack.classList.toggle('showFilter')
        const elementHide = document.getElementById(elementHigh)
        alert('Viagem criada com sucesso!')
        elementHide.classList.toggle('showModal')

    }

    // let containerMessageMain = document.getElementById('containerMessageMain')
    // let plane = document.querySelector('.planeAnimation')
    // let hiddeSpan = document.querySelector('.converSpan')

    // message.innerHTML = 'Viagem criada com sucesso!'
    // containerMessageMain.style.animation = 'showMessage 5.2s linear'
    // plane.style.animation = 'movePlane 4.6s linear'
    // hiddeSpan.style.animation = 'moveSpan 4.8s linear'

    // setTimeout(() => {
    //     containerMessageMain.style.animation = 'none'
    //     plane.style.animation = 'none'
    //     hiddeSpan.style.animation = 'none'
    // }, 6000);
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

    createLi.innerHTML = li.viagem_titulo
    createLi.dataset.id = li.id_viagem

    listTravel.appendChild(createLi)
}

//Adiciona os tipos de viagens a lista
function getTypeTravelDefault(li) {
    const listTravelDesk = document.querySelector('#listTypeLog ul')
    const listTravelMob = document.querySelector('#listTypeLogMob ul')
    const listTravelNewTravel = document.querySelector('#listTypeTravel ul')

    let liDesk = document.createElement('li')
    let liMob = document.createElement('li')
    let liTravel = document.createElement('li')

    liDesk.innerHTML = li.nome
    liMob.innerHTML = li.nome
    liTravel.innerHTML = li.nome

    liTravel.dataset.id = li.id

    listTravelDesk.appendChild(liDesk)
    listTravelMob.appendChild(liMob)
    listTravelNewTravel.appendChild(liTravel)
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

//Exibe Logs relacionados com aquela viagem
function showLogsTravel(travel_id) {
    const nameTravel = document.querySelector(`#travel${travel_id} .footerTxt`)
    const sectionLogs = document.getElementById('logsOfTravel')
    const titleTravel = document.getElementById('tittleTravelSelect')

    sectionLogs.classList.toggle('showLogsTravel')

    titleTravel.innerHTML = nameTravel.textContent

    const container = document.querySelector('.containerTravelLogs')
    clearChildren(container)

    data_user.perfil.logs.forEach(log => {
        createLogsTravel(log, travel_id)
    })


}

//Destaca o Log clicado
async function logFull(id) {
    const logClickElement = document.getElementById(id)
    const location = document.querySelector(`#${logClickElement.id} .footerTxt`)
    const logClick = logClickElement.querySelectorAll('*')
    const logFull = document.getElementById('logFull').querySelectorAll('*')
    const logFull1 = document.getElementById('logFull')

    console.log(logFull)
    logFull[15].src = logClick[0].src

    elementHigh = logFull1.id
    filterBlack.classList.toggle('showFilter')
    logFull1.classList.toggle('showModal')

    logFull[7].dataset.id = logClickElement.dataset.id
    logFull[15].dataset.img = logClick[0].dataset.img
    logFull[6].innerHTML = logClickElement.dataset.travel
    logFull[11].innerHTML = location.textContent
    logFull[21].innerHTML = logClickElement.dataset.curtidas
    logFull[24].innerHTML = logClickElement.dataset.favoritos
    logFull[26].innerHTML = logClickElement.dataset.date
    logFull[28].innerHTML = logClickElement.dataset.descricao

    logFull[19].classList.add('selectable')
    logFull[22].classList.add('selectable')


    //Carregando se foi favoritado ou curtido
    let dadosInteracoes = await getDataInteractions(logClickElement.dataset.id)

    if (dadosInteracoes[0].curtido == 1) {
        likeLogFull.classList.add('enabled')
        likeLogFull.src = 'img/likeEnable.png'
    } else {
        likeLogFull.src = 'img/likeDisable.png'
    }

    if (dadosInteracoes[0].favorito) {
        favoriteLogFull.classList.add('enabled')
        favoriteLogFull.src = 'img/favEnable.png'
    }
    else {
        favoriteLogFull.src = 'img/favDisable.png'
    }

    let url = `http://localhost:8080/v1/travellog/comment/${logClickElement.dataset.id}`
    let response = await fetch(url)
    let comments = await response.json()
    if (comments.status_code == 404) {
        logFull[34].textContent = 0
    } else {
        logFull[34].innerHTML = comments.items.comentarios.length
        const container = document.querySelector('.containerCommentsMain')
        clearChildren(container)
        comments.items.comentarios.forEach(comment => {
            createComments(comment)
        })
    }

    // Evento de deixar curtida
    logFull[19].onclick = async () => {
        let alteracao = await alternarCurtida(logClickElement.dataset.id)
        let oldContagem = logFull[21].textContent
        logFull[21].textContent = Number(oldContagem) + alteracao
    }

    //Evento de favoritar
    logFull[22].onclick = async () => {
        let alteracao = await alternarFavorito(logClickElement.dataset.id)
        let oldContagem = logFull[24].textContent
        logFull[24].textContent = Number(oldContagem) + alteracao
    }


}

//Puxando informações sobre interação
async function getDataInteractions(log_id) {
    let url = `http://localhost:8080/v1/travellog/interacoes/${userId}?log_id=${log_id}`

    let response = await fetch(url)

    let interacoes = await response.json()
    return interacoes.items.interacoes
}

// Quando der click em curtir
async function alternarCurtida(log_id) {
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
    console.log(response)

    if (likeLogFull.classList.contains('enabled')) {
        likeLogFull.classList.remove('enabled')
        likeLogFull.src = 'img/likeDisable.png'
        return -1

    } else {
        likeLogFull.classList.add('enabled')
        likeLogFull.src = 'img/likeEnable.png'
        return +1
    }
}
// Quando der click em favorito
async function alternarFavorito(log_id) {
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
    console.log(response)

    if (favoriteLogFull.classList.contains('enabled')) {
        favoriteLogFull.classList.remove('enabled')
        favoriteLogFull.src = 'img/favDisable.png'
        return -1

    } else {
        favoriteLogFull.classList.add('enabled')
        favoriteLogFull.src = 'img/favEnable.png'
        return +1
    }
}

//Criar comentários
function createComments(comment) {
    const container = document.querySelector('.containerCommentsMain')
    let divComment = document.createElement('div')
    let header = document.createElement('div')
    let contaienrImg = document.createElement('div')
    let imgProfile = document.createElement('img')
    let name = document.createElement('span')
    let p = document.createElement('p')
    let date = document.createElement('span')

    divComment.classList.add('comment')
    header.classList.add('headerComments')
    contaienrImg.classList.add('profileComment')
    name.classList.add('nameCommentLog')
    p.classList.add('commentText')
    date.classList.add('dateComment')

    container.appendChild(divComment)
    divComment.append(header, p, date)
    header.append(contaienrImg, imgProfile, name)

    name.innerHTML = comment.apelido
    p.innerHTML = comment.conteudo
    imgProfile.src = comment.foto_perfil

    let dateChar = comment.data_publicacao.slice(0, 10)
    let spliceDate = dateChar.split('-')

    let dateComment = `${spliceDate[2]}/${spliceDate[1]}/${spliceDate[0]}`
    date.innerHTML = dateComment

}

//Destaca a aba de atualização de Log
function showUpdateLog(id_log) {
    let log = document.getElementById(`log${id_log}`)
    let location = document.querySelector(`#log${id_log} .footerTxt`)
    const updateLog = document.getElementById('updateLog')
    const updateLogElement = updateLog.querySelectorAll('*')
    const logFull = document.getElementById('logFull')

    logFull.classList.remove('showModal')
    updateLog.classList.add('showModal')

    updateLogElement[12].innerHTML = log.dataset.travel
    updateLogElement[12].dataset.idtravel = log.dataset.idtravel
    updateLogElement[21].value = location.textContent
    updateLogElement[20].innerHTML = log.dataset.descricao

    elementHigh = 'updateLog'
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


//Ícone para voltar a tela do perfil
iconProfileUser.addEventListener('click', () => {
    sectionSettings.classList.remove('showSection')
})

//Exibe aba de configurações
function goSettings() {
    sectionSettings.classList.add('showSection')
}

//Função exibir inputs de atualização
function showInputUpdate(input_id) {
    let inputShow = document.getElementById(input_id)

    inputShow.classList.toggle('showInput')
    inputShow.focus()
}

//Validar entrada de dados Input
function valideDatasInputUpdate(input_id) {
    if (input_id == 'updateNickname') {
        let nickName = inputNickname.value

        if (nickName.length > 25 || nickName == '' || nickName == null || nickName == undefined) {
            alert('Nickname Inválido')

        } else {
            elementUpdate = 'nickname'
            showModalMessagePass()

        }

    } else if (input_id == 'updateName') {
        let name = inputName.value

        if (name.length > 100 || name == '' || name == null || name == undefined) {
            alert('Nome Inválido')

        } else {
            elementUpdate = 'name'
            showModalMessagePass()

        }

    } else if (input_id == 'updateDescriptionProfile') {
        let description = inputDescription.value

        if (description.length > 250 || description == '' || description == null || description == undefined) {
            alert('Descrição Inválida')

        } else {
            elementUpdate = 'description'
            showModalMessagePass()

        }

    }
}

//Direcionamento para endpoints selecionados
function sendReqOfUpdate() {
    if (idCallMessage == 'deleteAccount') {
        showModalDeleteAccount()
    } else {
        if (elementUpdate == 'nickname') {
            inputNickname.classList.remove('showInput')
            alert('update nickname')

        } else if (elementUpdate == 'name') {
            inputName.classList.remove('showInput')
            alert('update name')

        } else if (elementUpdate == 'description') {
            inputDescription.classList.remove('showInput')
            alert('update description')

        } else if (elementUpdate == 'pass') {
            alert('update pass')
        }

        const inputPass = document.getElementById('passChangeInput')
        inputPass.value = ''

        closeModalSettings()
    }

}

//Função padrão para fechar modais
function closeModalSettings() {
    filterBlackSettings.classList.remove('showFilterSettings')
    const elementHide = document.getElementById(elementHighSettings)

    elementHide.classList.remove('showModal')
}

//Exibe mensagem de confirmação de senha
function showModalMessagePass(button_id) {
    const messagePass = document.getElementById('messagePass')

    inputConfirmPass.focus()
    filterBlackSettings.classList.toggle('showFilterSettings')
    messagePass.classList.toggle('showModal')

    elementHighSettings = 'messagePass'

    if (button_id == 'deleteAccount') {
        idCallMessage = 'deleteAccount'

    } else {
        idCallMessage = 'changePass'

    }
}

//Exibe mensagem de deletar a conta
function showModalDeleteAccount() {
    const messageDelete = document.getElementById('messageConfirmDelete')
    const messagePass = document.getElementById('messagePass')

    messagePass.classList.remove('showModal')
    filterBlackSettings.classList.add('showFilterSettings')
    messageDelete.classList.toggle('showModal')

    elementHighSettings = 'messageConfirmDelete'
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

//Expande o input de filtro
inputLocationFilter.addEventListener('click', () => {
    inputLocationFilter.classList.add('expandFilterLocation')

})

saveLog.addEventListener('click', postLog)

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

// Altera a imagem do Log em destaque para a esquerda
// arrowChangeImgLogLeftLogFull.addEventListener('click', () => {
//     let imgLog = document.querySelector(`#logFull .imgLog`)
//     let dataImg = imgLog.dataset.img.split(',')
//     let dataPosition = Number(imgLog.dataset.position)

//     if (dataPosition <= dataImg.length - 1 && dataPosition != 0) {
//         let dataImgPosition = dataPosition - 1
//         imgLog.src = `${dataImg[dataImgPosition]}`
//         imgLog.dataset.position = dataImgPosition

//         validePositionImgLog(dataImg, dataImgPosition, arrowChangeImgLogLeftLogFull)
//     }

// })

// //Altera a imagem do Log em destaque para a direita
// arrowChangeImgLogRightLogFull.addEventListener('click', () => {
//     let imgLog = document.querySelector(`#logFull .imgLog`)

//     let dataImg = imgLog.dataset.img.split(',')
//     let dataPosition = Number(imgLog.dataset.position)

//     if (dataPosition < dataImg.length - 1) {
//         let dataImgPosition = dataPosition + 1
//         imgLog.src = `${dataImg[dataImgPosition]}`
//         imgLog.dataset.position = dataImgPosition

//         validePositionImgLog(dataImg, dataImgPosition, arrowChangeImgLogRightLogFull)
//     }
// })

// Destaca a aba de atualização de Log para mobile
updateLogIcon.addEventListener('click', () => {
    showUpdateLog(event.currentTarget.dataset.id)
})

//Atualiza o Log
updateLogButton.addEventListener('click', () => {
    updateLog()
})

//Destaca a aba de criação de Log para mobile
newPostMobile.addEventListener('click', showNewLog)

//Destaca a aba de criação de log para Desktop
newLog.addEventListener('click', showNewLog)

//Exibe aba de criação de viagens
newTravel.addEventListener('click', () => {
    const newTravel = document.getElementById('newTravel')
    filterBlack.classList.toggle('showFilter')
    newTravel.classList.toggle('showModal')

    elementHigh = 'newTravel'
})

//Icone do perfil do usuário e direcionamento para ele para mobile
iconProfileMobile.addEventListener('click', () => {
    sectionSettings.classList.remove('showSection')
})

//Mostra lista de viagens do usuário para a criação do Log
arrowNewLog.addEventListener('click', () => {
    const listTravel = document.getElementById('listTravel')

    arrowNewLog.classList.toggle('changeArrowNewLog')
    listTravel.classList.toggle('expandListTravelNewLog')

})

//Mostra lista de tipos de viagens do usuário para a criação da viagem
arrowNewTravel.addEventListener('click', () => {
    const listTravel = document.getElementById('listTypeTravel')

    arrowNewTravel.classList.toggle('changeArrowNewTravel')
    listTravel.classList.toggle('expandListTravelNewTravel')

})

buttonSaveTravel.addEventListener('click', () => {
    postTravel()
})

//Troca a visibilidade do botão na atualização de Log
buttonVisibleLogUpdate.addEventListener('click', () => {
    buttonVisibleLogUpdate.classList.toggle('ocultVisible')
    if (buttonVisibleLogUpdate.classList == 'ocultVisible') {
        buttonVisibleLogUpdate.innerHTML = 'Privado'
    } else {
        buttonVisibleLogUpdate.innerHTML = 'Público'
    }
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

//Event do clique do favorito no Log em destaque
favoriteLogFull.addEventListener('click', () => {
    if (String(favoriteLogFull.src).includes('img/favEnable.png')) {
        favoriteLogFull.src = 'img/favDisable.png'

    } else {
        favoriteLogFull.src = 'img/favEnable.png'
    }
})

//Adiciona event a travel
travels.forEach(travel => {
    travel.addEventListener('click', showLogsTravel)
})

//Função de retorno as travels
returnTravels.addEventListener('click', () => {
    const sectionLogs = document.getElementById('logsOfTravel')

    sectionLogs.classList.toggle('showLogsTravel')

})

//Ícone para exibir aba de configurações
iconSettingsDesk.addEventListener('click', goSettings)

//Ícone para exibit aba de configurações para Mobile
iconSettingsMob.addEventListener('click', goSettings)

//Editar nickname
editNickname.addEventListener('click', () => {
    showInputUpdate('updateNickname')
})

//Event para atualizar nickname
inputNickname.addEventListener('keypress', () => {
    if (event.key == 'Enter') {
        valideDatasInputUpdate(inputNickname.id)

    }
})

//Editar nome
editName.addEventListener('click', () => {
    showInputUpdate('updateName')
})

//Event para atualizar nome
inputName.addEventListener('keypress', () => {
    if (event.key == 'Enter') {
        valideDatasInputUpdate(inputName.id)

    }
})

//Editar descrição
editDescription.addEventListener('click', () => {
    showInputUpdate('updateDescriptionProfile')
})

//Event para atualizar descrição
inputDescription.addEventListener('keypress', () => {
    if (event.key == 'Enter') {
        valideDatasInputUpdate(inputDescription.id)

    }
})

//Ícone de fechar modais
closeFilterSettings.addEventListener('click', closeModalSettings)

//Event para acionar a tecla Enter para o input de confirmar senha
inputConfirmPass.addEventListener('keypress', () => {
    if (event.key == 'Enter') {
        sendReqOfUpdate()
    }
})

//Botão para direcionar a confirmação da senha para trocá-la
buttonChangePass.addEventListener('click', () => {
    elementUpdate = 'pass'
    showModalMessagePass(event.target.id)
})

//Botão para direcionar a confirmação da senha para deletar a conta
buttonDeleteAccount.addEventListener('click', () => {
    showModalMessagePass(event.target.id)
})

//Botão para cancelar o delete da conta
buttonCancelDeleteAccount.addEventListener('click', closeModalSettings)

//Botão de confirmar delete da conta
buttonConfirmDeleteAccount.addEventListener('click', closeModalSettings)

//Botão de cancelar senha
buttonCancelPass.addEventListener('click', closeModalSettings)

//Botão para confirmar a senha, e lógica para tratar direcionamento de modais
buttonConfirmPass.addEventListener('click', () => {
    sendReqOfUpdate()
})

//Fecha ícones quando a aba de configurações for clicada
sectionSettings.addEventListener('click', () => {
    if (!editNickname.contains(event.target) && !inputNickname.contains(event.target)) {
        inputNickname.classList.remove('showInput')

    }

    if (!editName.contains(event.target) && !inputName.contains(event.target)) {
        inputName.classList.remove('showInput')

    }

    if (!editDescription.contains(event.target) && !inputDescription.contains(event.target)) {
        inputDescription.classList.remove('showInput')

    }
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


// INTEGRAÇÃO
async function getAllDatasProfile(inputFilters) {
    const params = new URLSearchParams(inputFilters)
    let url = `http://localhost:8080/v1/travellog/user/profile/${userId}?${params.toString()}&perfil_id=${perfilId}`
    let response = await fetch(url)

    let data = await response.json()
    data_user = data.items

    if (data.items.perfil.logs) {
        data.items.perfil.logs.forEach((log) => {

            createLogs(log)
        })
    }

    if (data.items.perfil.viagens) {
        data.items.perfil.viagens.forEach((travel) => {
            createTravel(travel)
        })

        data.items.perfil.viagens.forEach((travel) => {
            getTravelLi(travel)
        })
    }
    const liListTravelNewLog = document.querySelectorAll('#listTravel li')

    //Adiciona event para os LI de viagens
    liListTravelNewLog.forEach(li => {
        li.addEventListener('click', () => {
            setTravel(li)
        })
    })

    setDataUser(data.items.perfil)
}

async function getTypeTravel() {
    let url = "http://localhost:8080/v1/travellog/traveltype/"
    let response = await fetch(url)

    let type = await response.json()
    type.items.tipos_viagens.forEach((type) => {
        getTypeTravelDefault(type)
    })

    const liListTravelMob = document.querySelectorAll('#listTypeLogMob li')
    const liListTravelDesk = document.querySelectorAll('#listTypeLog li')
    const liListNewTravel = document.querySelectorAll('#listTypeTravel li')

    //Adiciona event para os LI de tipo de viagem para mobile
    liListTravelMob.forEach((li) => {
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

    liListNewTravel.forEach(li => {
        li.addEventListener('click', () => {
            const textNewTravel = document.querySelector('.selectTypeTravel span')
            const listNewTravel = document.getElementById('listTypeTravel')

            listNewTravel.classList.remove('expandListTravelNewTravel')
            textNewTravel.innerHTML = li.textContent
            textNewTravel.dataset.id = li.dataset.id
        })
    })
}


// -------------------------------------------------------------------------
//              MÉTODOS DE INTEGRAÇÃO COM GOOGLE E AZURE
// -------------------------------------------------------------------------
async function uploadImageTravel() {
    const uploadParams = {
        storageAccount: "travellog",
        containerName: "logs",
        file: document.getElementById("selectImgInputTravel").files[0],
        sasToken: 'sp=c&st=2025-12-11T00:37:42Z&se=2025-12-20T03:00:00Z&spr=https&sv=2024-11-04&sr=c&sig=iLcABEgTFCqBVhJ7FZNQhHieVnrL%2FBHgGEkqQvCoRQg%3D'
    }

    const midia = await uploadImageToAzure(uploadParams)

    return String(midia)

}

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

async function uploadImageLogUpdate() {
    const uploadParams = {
        storageAccount: "travellog",
        containerName: "logs",
        file: document.getElementById("selectImgUpdateInput").files[0],
        sasToken: 'sp=c&st=2025-12-11T00:37:42Z&se=2025-12-20T03:00:00Z&spr=https&sv=2024-11-04&sr=c&sig=iLcABEgTFCqBVhJ7FZNQhHieVnrL%2FBHgGEkqQvCoRQg%3D'
    }

    const midia = await uploadImageToAzure(uploadParams)

    return JSON.stringify(midia)

}

function preview({ target }) {

    let blob = URL.createObjectURL(target.files[0])

}

document.getElementById("selectImgInput")
    .addEventListener('change', preview)

document.getElementById("selectImgUpdateInput")
    .addEventListener('chenge', preview)
// document.getElementById("saveLog")
//     .addEventListener("click", uploadImageLog)


init()
initUpdate()

async function init() {

    //Pega a input do HTML
    const localizacao = document.getElementById("locationNewLogInput")

    //Inicializa uma nova instância do widget de auto-complete.
    let autoComplete = new google.maps.places.Autocomplete(localizacao, {

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
        localObject.push({cidade: cidade})
    })

}

async function initUpdate() {

    //Pega a input do HTML
    const localizacao = document.getElementById("locationUpdateLogInput")

    //Inicializa uma nova instância do widget de auto-complete.
    let autoComplete = new google.maps.places.Autocomplete(localizacao, {

        fields: ["name", "address_components", "geometry"],
        types: ["establishment", "geocode"]

    })

    autoComplete.addListener('place_changed', async () => {
        let place = autoComplete.getPlace()

        localObject.push({ local_nome: place.name })

        let componentsAdress = place.address_components

        for (let components of componentsAdress) {
            let extractCidade

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
    })

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
//              Verdadeiro inicio (Chamando as funções)
// ----------------------------------------------------------

const userId = localStorage.getItem('userId')
const perfilId = localStorage.getItem('perfilId')
getTypeTravel()
getAllDatasProfile()