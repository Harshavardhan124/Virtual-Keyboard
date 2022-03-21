let keysEl = document.querySelectorAll('.keys');
let spaceEl = document.querySelector('.space');
let leftShiftEl = document.querySelector('.left-shift');
let leftCtrlEl = document.querySelector('.left-ctrl');
let rightCtrlEl = document.querySelector('.right-ctrl');
let rightShiftEl = document.querySelector('.right-shift');
let capsLockEl = document.querySelector('.capslock');
let bodyEl = document.querySelector('body');
let keyboardBgEl = document.querySelector('.keyboard-bg');
let textEl = document.querySelector('.text');
let changeColorEl = document.querySelector('.change-color');
let colorInputEl = document.querySelector('.colors-input');
let bgColorChangerEl = document.querySelector('.bg-color-changer');

textEl.focus();

function moveCursorToEnd(){
    setTimeout(function(){
        textEl.selectionStart = textEl.selectionEnd = textEl.value.length;
        textEl.focus();
    }, 0)
}

let isCaps = false;
function onClickKey(element){
    if(!element.classList.contains('special')) {
        let prevValue = textEl.value;
        console.log(element.innerText);
        if(isCaps){
            textEl.value = prevValue + element.innerText;
        } else {
            textEl.value = prevValue + element.innerText.toLowerCase();
        }
        element.classList.add('active');
        element.classList.add('remove');
        setTimeout(() => {
            element.classList.remove('active');
            element.classList.remove('remove');
        }, 100);
    } else {
        if(element.classList.contains('capslock')) {
            if(element.classList.contains('active')) {
                isCaps=false;
                element.classList.remove('active');
            } else {
                isCaps = true;
                element.classList.add('active');
            }
        }
    }

    moveCursorToEnd();
}


for (let i = 0; i < keysEl.length; i++){
    keysEl[i].setAttribute('keyname', keysEl[i].innerText);
    keysEl[i].setAttribute('lowerKeyname', keysEl[i].innerText.toLowerCase());
    keysEl[i].addEventListener('click', function(){
        onClickKey(this);
    })
}


window.addEventListener('keydown', function(e){
    for (let i = 0; i < keysEl.length; i++){
        if(e.key === keysEl[i].getAttribute('keyname') || e.key === keysEl[i].getAttribute('lowerKeyname')) {
            keysEl[i].classList.add('active');
        }
        if(e.code == 'Space'){
            spaceEl.classList.add('active');
        }
        if(e.code === 'ShiftLeft') {
            rightShiftEl.classList.remove('active');
        } 
        if(e.code === 'ShiftRight') {
            leftShiftEl.classList.remove('active');
        }
        if (e.code === 'CapsLock') {
            capsLockEl.classList.add('active');
            isCaps = true;
        }
        if (e.code === 'ControlLeft') {
            leftCtrlEl.classList.add('active');
        }
        if(e.code === 'ControlRight') {
            rightCtrlEl.classList.add('active');
        }
    }
})

window.addEventListener('keyup', function(e){
    for (let i = 0; i < keysEl.length; i++){
        if(e.key === keysEl[i].getAttribute('keyname') || e.key === keysEl[i].getAttribute('lowerKeyname')) {
            keysEl[i].classList.remove('active');
            keysEl[i].classList.add('remove');
        }
        if(e.code == 'Space'){
            spaceEl.classList.remove('active');
            spaceEl.classList.add('remove');
        }
        if(e.code === 'shiftLeft') {
            rightShiftEl.classList.remove('active');
            rightShiftEl.classList.remove('remove');
        }
        if(e.code === 'shiftRight') {
            leftShiftEl.classList.remove('active');
            leftShiftEl.classList.remove('remove');
        }
        if (e.code === 'ControlLeft') {
            leftCtrlEl.classList.remove('active');
        }
        if(e.code === 'ControlRight') {
            rightCtrlEl.classList.remove('active');
        }
        setTimeout(() => {
            keysEl[i].classList.remove('remove');
        });
    }
})

colorInputEl.addEventListener('input', function(){
    for(let i = 0; i < keysEl.length; i++){
        keysEl[i].style.color = colorInputEl.value;
    } 
    keyboardBgEl.style.background = colorInputEl.value;
})