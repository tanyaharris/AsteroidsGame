setTimeout(function(){
    var typed = new Typed('.message-1', {
        strings: ["<span>ВНИМАНИЕ</span> земля в опасности надвигается волна астероидов"],
        typeSpeed: 30, // typing speed
        backDelay: 750, // pause before backspacing
        loop: false, // loop on or off (true or false)
        loopCount: false, // number of loops, false = infinite
        showCursor: false,
		});
}, 0);

setTimeout(function(){
    var typed = new Typed('.message-2', {
        strings: ["Ваша задача спасти землю"],
        typeSpeed: 30, // typing speed
        backDelay: 750, // pause before backspacing
        loop: false, // loop on or off (true or false)
        loopCount: false, // number of loops, false = infinite
        showCursor: false,
		});
}, 2000);

setTimeout(function(){
    var typed = new Typed('.message-3', {
        strings: ["Вы являетесь пилотом космического корабля"],
        typeSpeed: 30, // typing speed
        backDelay: 750, // pause before backspacing
        loop: false, // loop on or off (true or false)
        loopCount: false, // number of loops, false = infinite
        showCursor: false,
		});
}, 4000);

setTimeout(function(){
    var typed = new Typed('.message-4', {
        strings: ["Управляйте кораблем <span>стрелками клавиатуры</span>"],
        typeSpeed: 30, // typing speed
        backDelay: 750, // pause before backspacing
        loop: false, // loop on or off (true or false)
        loopCount: false, // number of loops, false = infinite
        showCursor: false,
		});
}, 6000);

setTimeout(function(){
    var typed = new Typed('.message-5', {
        strings: ["Используйте <span>пробел для атаки</span>"],
        typeSpeed: 30, // typing speed
        backDelay: 750, // pause before backspacing
        loop: false, // loop on or off (true or false)
        loopCount: false, // number of loops, false = infinite
        showCursor: false,
		});
}, 9000);

setTimeout(function(){
    var buttonStart = document.querySelector('#zag');
    buttonStart.style.display = 'block';
}, 11000);