'use strict'

const inputDateContainer = document.querySelector('.containerFilterDate')
const inputLocationFilter = document.getElementById('filterLocation')
const arrowTypeFilterDesk = document.getElementById('arrowType')
const filterBlack = document.getElementById('filterBlack')
const closeFilter = document.getElementById('closeFilter')
const inputFollowerMobile = document.getElementById('inputFollowerMob')
const closeInputMobile = document.getElementById('closeInputMob')
const inputFollowerDesk = document.getElementById('inputFollowerDesk')
const filterMobile = document.getElementById('mobFilter')
const arrowTypeFilterMobile = document.getElementById('arrowTypeMob')
const logs = document.querySelectorAll('.log')
const newPostMobile = document.getElementById('newPost')
const newLogDesk = document.getElementById('newLogSection')
const likes = document.querySelectorAll('.likeImg')
const favorites = document.querySelectorAll('.favImg')
const profilesName = document.querySelectorAll('.nameProfileLog')
const liListTravelMob = document.querySelectorAll('#listTypeLogMob li')
const liListTravelDesk = document.querySelectorAll('#listTypeLog li')
const arrowChangeImgLogLeft = document.querySelectorAll('.arrowImgLogLeft')
const arrowChangeImgLogRight = document.querySelectorAll('.arrowImgLogRight')
var elementHigh = null

arrowChangeImgLogLeft.forEach(arrowLeft => {
    arrowLeft.addEventListener('click', () => {
        changeImgLeft(arrowLeft)
    })
})

arrowChangeImgLogRight.forEach(arrowRight => {
    arrowRight.addEventListener('click', () => {
        changeImgRight(arrowRight)
    })
})

function changeImgLeft(arrow) {
    let log = arrow.closest('.log')
    let imgLog = document.querySelector(`#${log.id} .imgLog`)

    let dataImgPosition = Number(imgLog.dataset.position)
    let dataImg = imgLog.dataset.img.split(',')

    imgLog.src = `${dataImg[dataImgPosition]}`

    imgLog.dataset.position = dataImgPosition - 1
}

function changeImgRight(arrow) {
    let log = arrow.closest('.log')
    let imgLog = document.querySelector(`#${log.id} .imgLog`)

    let dataImgPosition = Number(imgLog.dataset.position)
    let dataImg = imgLog.dataset.img.split(',')

    imgLog.src = `${dataImg[dataImgPosition]}`

    imgLog.dataset.position = dataImgPosition + 1
}

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

}

function getTypeTravelDefault(li) {
    const listTravelDesk = document.querySelector('#listTypeLog ul')
    const listTravelMob = document.querySelector('#listTypeLogMob ul')

    let liDesk = document.createElement('li')
    let liMob = document.createElement('li')

    listTravelDesk.appendChild(liDesk)
    listTravelMob.appendChild(liMob)
}

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
}

function setTypeTravel(li) {
    const textTravelDesk = document.querySelector('.containerListTypeLog span')
    const textTravelMob = document.querySelector('.containerListTypeLogMob span')
    const listTypeTravelDesk = document.getElementById('listTypeLog')
    const listTypeTravelMob = document.getElementById('listTypeLogMob')

    textTravelDesk.innerHTML = li.textContent
    textTravelMob.innerHTML = li.textContent

    listTypeTravelMob.classList.toggle('expandirListMob')
    listTypeTravelDesk.classList.remove('expandirListDesk')
}

function createFollower(follower) {
    const containerFollower = document.querySelector('containerFollowerList')
    let divFollower = document.createElement('div')
    let divProfile = document.createElement('div')
    let imgProfile = document.createElement('img')
    let spanName = document.createElement('span')

    divFollower.classList.add('follower')
    divProfile.classList.add('profileFollower')

    divFollower.append(divProfile, spanName)
    divProfile.appendChild(imgProfile)
    containerFollower.appendChild(divFollower)

}

newLogDesk.addEventListener('click', showNewLog)

newPostMobile.addEventListener('click', showNewLog)

arrowTypeFilterDesk.addEventListener('click', () => {
    const listTypeTravel = document.getElementById('listTypeLog')

    arrowTypeFilterDesk.classList.toggle('arrowSelect')
    listTypeTravel.classList.toggle('expandirListDesk')
})

closeFilter.addEventListener('click', () => {
    filterBlack.classList.toggle('showFilter')
    const elementHide = document.getElementById(elementHigh)

    elementHide.classList.toggle('showModal')
})

filterMobile.addEventListener('click', () => {
    const filterContainer = document.getElementById('containerFilterMob')

    filterContainer.classList.toggle('showFilterMob')
})

arrowTypeFilterMobile.addEventListener('click', () => {
    const listTypeTravel = document.getElementById('listTypeLogMob')

    arrowTypeFilterMobile.classList.toggle('arrowSelect')
    listTypeTravel.classList.toggle('expandirListMob')

})

inputFollowerMobile.addEventListener('click', () => {
    filterBlack.classList.toggle('showFilter')
    const resultFollower = document.getElementById('resultFollower')
    const containerInput = document.querySelector('.containerInputMob')

    containerInput.classList.toggle('inputMobileIndex')
    closeInputMobile.classList.toggle('showCloseMobileInput')
    closeFilter.classList.toggle('hiddeCloseFilter')
    containerInput.style.width = '95%'
    resultFollower.classList.toggle('showResultFollowerMobile')
})

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

inputDateContainer.addEventListener('click', () => {
    const inputDate = document.querySelectorAll('.filterDate')
    const spanContainer = document.querySelector('.containerFilterDate span')

    inputDateContainer.classList.add('expandFilterDate')
    spanContainer.innerHTML = '-'

    for (let i = 0; i < inputDate.length; i++) {
        inputDate[i].classList.add('showFilterDate')

    }
})

inputLocationFilter.addEventListener('click', () => {
    inputLocationFilter.classList.add('expandFilterLocation')

})

function showNewLog() {
    const newLog = document.getElementById('newLog')
    filterBlack.classList.toggle('showFilter')
    newLog.classList.toggle('showModal')

    elementHigh = 'newLog'
}

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

logs.forEach(log => {
    log.addEventListener('click', () => {
        if (event.target.classList != 'arrowImgLogRight' && event.target.classList != 'arrowImgLogLeft' && event.target.classList != 'nameProfileLog' && event.target.classList != 'likeImg' && event.target.classList != 'favImg') {
            logFull(event.currentTarget.id)
        }
    })
});

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

liListTravelMob.forEach(li => {
    li.addEventListener('click', () => {
        setTypeTravel(li)

    })
})

liListTravelDesk.forEach(li => {
    li.addEventListener('click', () => {
        setTypeTravel(li)

    })
})