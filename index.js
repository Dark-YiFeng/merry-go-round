/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-05-22 10:38:36
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-05-22 10:39:01
 */ 
//每张图片围绕着Y轴转动等分角度，再沿Z轴平移一定距离
function init() {
    var img = document.getElementsByTagName('img')
    var len = img.length
    var deg = 360 / len
    for (var i = 0; i < len; i++) {
        img[i].style.cssText = `transform: rotateY(${deg*i}deg) translateZ(350px);
                                transition: transform 1s ${(len-i)*0.1}s;`
    }
    bindEvent()
}
 
var body = document.body
var box = document.getElementById('box')
var lastX, lastY, nowX, nowY,
    disX = 0,
    disY = 0,
    roY = 0,
    roX = -10, //初始box的rotateX为-10deg
    timer
 
//监听鼠标按下事件
function bindEvent() {
    body.addEventListener('mousedown', mouseDown)
}
 
//鼠标按下事件执行的方法
//鼠标按下后，同时监听鼠标移动和鼠标松开事件
function mouseDown(e) {
    clearInterval(timer)
    var e = e || window.event
    e.preventDefault()
    lastX = e.clientX
    lastY = e.clientY
    body.addEventListener('mousemove', mouseMove)
    body.addEventListener('mouseup', mouseUp)
}
 
//鼠标移动事件方法
//根据鼠标移动的偏移量，设置box的XY轴转动角度
function mouseMove(e) {
    var e = e || window.event
    nowX = e.clientX
    nowY = e.clientY
    disX = nowX - lastX
    disY = nowY - lastY
    roX -= disY * 0.2
    roY += disX * 0.2
    box.style.cssText =
        `transform:rotateX(${roX}deg) rotateY(${roY}deg);
        cursor:move;`
    lastX = nowX
    lastY = nowY
}
 
//鼠标松开事件方法
//鼠标松开后，设置转动角度逐渐减小的循环函数，在转动角度可以忽略不计时，停止循环
function mouseUp() {
    body.removeEventListener('mousemove', mouseMove)
    clearInterval(timer)
    timer = setInterval(function () {
        disX *= 0.98
        disY *= 0.98
        roX -= disY * 0.2
        roY += disX * 0.2
        box.style.cssText =
            `transform:rotateX(${roX}deg) rotateY(${roY}deg);
            cursor:pointer;`
        if (Math.abs(disX) < 0.1 && Math.abs(disY) < 0.1) {
            clearInterval(timer)
        }
    }, 20)
}
 
init()