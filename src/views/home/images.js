const { ipcRenderer } = require('electron')
const { $, convertDuration } = require('./../helper')
const imgDom = $('img')
const pre = $('pre')
const next = $('next')
pre.addEventListener('click', () => {
    let imgSrcIndex = imgDom.src.split('.')[0].substr(-1);
    if (imgSrcIndex === '1') {
        imgDom.src = imgDom.src.replace(imgSrcIndex, '3')
    } else {
        imgDom.src = imgDom.src.replace(imgSrcIndex, `${Number(imgSrcIndex) - 1}`)
    }
})
next.addEventListener('click', () => {
    let imgSrcIndex = imgDom.src.split('.')[0].substr(-1);
    if (imgSrcIndex === '3') {
        imgDom.src = imgDom.src.replace(imgSrcIndex, '1')
    } else {
        imgDom.src = imgDom.src.replace(imgSrcIndex, `${Number(imgSrcIndex) + 1}`)
    }
})