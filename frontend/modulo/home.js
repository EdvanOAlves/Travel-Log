'use strict'

const inputDateContainer = document.querySelector('.containerFilterDate')
const arrowTypeFilterDesk = document.getElementById('arrowType')
const filterBlack = document.getElementById('filterBlack')
const closeFilter = document.getElementById('closeFilter')
const inputFollowerMobile = document.getElementById('inputFollowerMob')
const closeInputMobile = document.getElementById('closeInputMob')
const inputFollowerDesk = document.getElementById('inputFollowerDesk')
const filterMobile = document.getElementById('mobFilter')
const arrowTypeFilterMobile = document.getElementById('arrowTypeMob')
var elementHigh = null
const logs = document.querySelectorAll('.log')
const newPostMobile = document.getElementById('newPost')
const newLogDesk = document.getElementById('newLogSection')

logs.forEach(log => {
    log.addEventListener('click', () => {
        logFull(event.currentTarget.id)
    })
});

function logFull(id) {
    const logClick = document.getElementById(id).querySelectorAll('*')
    const logFull = document.getElementById('logFull').querySelectorAll('*')
    const logFull1 = document.getElementById('logFull')
    console.log(logFull)
    console.log(logClick)
    // const imgLogFull = document.querySelector(`#${id} .profileLogFull img`)
    // const nameProfile = document.querySelector(`#${id} .nameProfileLogFull`)
    // const travelLog = document.querySelector(`#${id} .nameTravel`)
    // const location = document.querySelector(`#${id} .locationLogFull`)
    // const imgLog = document.querySelector(`#${id} .imgLogFull`)
    // const numberLikes = document.querySelector(`#${id} .numberLikesFull`)
    // const numberFav = document.querySelector(`#${id} .numberFavFull`)
    // console.log(logClick[3].textContent)
    logFull[3].innerHTML = logClick[3].textContent
    logFull[5].innerHTML = ''
    logFull[8].innerHTML = logClick[19].textContent
    logFull[12].src = logClick[7].src
    logFull[18].innerHTML = logClick[13].textContent
    logFull[21].innerHTML = logClick[14].textContent

    elementHigh = logFull1.id
    filterBlack.style.display = 'flex'
    logFull1.style.opacity = 1
    logFull1.style.pointerEvents = 'all'
}

newLogDesk.addEventListener('click', showNewLog)

newPostMobile.addEventListener('click', showNewLog)

arrowTypeFilterDesk.addEventListener('click', () => {
    const listTypeTravel = document.getElementById('listTypeLog')
    listTypeTravel.classList.toggle('expandirDesk')
})

closeFilter.addEventListener('click', () => {
    filterBlack.style.display = 'none'
    const elementHide = document.getElementById(elementHigh)

    elementHide.style.display = 'none'
    elementHide.style.opacity = 0
    elementHide.style.pointerEvents = 'none'
})

filterMobile.addEventListener('click', () => {
    const filterContainer = document.getElementById('containerFilterMob')

    filterContainer.classList.toggle('show')
})

arrowTypeFilterMobile.addEventListener('click', () => {
    const listTypeTravel = document.getElementById('listTypeLogMob')
    listTypeTravel.classList.toggle('expandir')

})

inputFollowerMobile.addEventListener('click', () => {
    filterBlack.style.display = 'flex'
    const resultFollower = document.getElementById('resultFollower')
    const containerInput = document.querySelector('.containerInputMob')
    closeInputMobile.style.display = 'flex'
    closeFilter.style.opacity = 0
    containerInput.style.width = '95%'
    resultFollower.style.display = 'flex'
})

closeInputMobile.addEventListener('click', () => {
    filterBlack.style.display = 'none'
    const resultFollower = document.getElementById('resultFollower')
    const containerInput = document.querySelector('.containerInputMob')

    closeFilter.style.opacity = 1
    containerInput.style.width = '65%'
    resultFollower.style.display = 'none'
    closeInputMobile.style.display = 'none'
})

inputDateContainer.addEventListener('click', () => {
    const inputDate = document.querySelectorAll('.filterDate')
    const spanContainer = document.querySelector('.containerFilterDate span')
    inputDateContainer.style.width = '95%'

    spanContainer.innerHTML = '-'
    for (let i = 0; i < inputDate.length; i++) {
        inputDate[i].style.zIndex = 10

    }
})


function showNewLog() {
    const newLog = document.getElementById('newLog')
    filterBlack.style.display = 'flex'
    newLog.style.display = 'flex'
    newLog.style.pointerEvents = 'all'
    newLog.style.opacity = 1


    elementHigh = 'newLog'
}