var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var restar = document.getElementById('restart');
var restar_cont = document.getElementById('conteiner_restart');
var ctxRestart = restar.getContext('2d');
var isPlaing = false;

var start = document.getElementById('startgame');
var ctxstart = start.getContext('2d');
var start_knp = document.getElementById('zag');
var timer = 0;
var x = 0;
var life = 3;
var score = 0;
var ship = {
	x:300,
	y:300,
	dx:5,
	isRight: false,
	isLeft: false,
	isUp:false,
	isDown:false,
	isProbel: false
};
//Создание структуры dx dy - скорость изменения координат
//var asteroid = {x:0,y:300,dx:1,dy:2};

//Создание массива астероидов
var asteroid = [];
//Создание массива выстрелов
var fire = [];
//Создание массива взрыва
var expl = [];
//Создание массива щита
 var sheld = [];
//Загружем картинки


var fireImg = new Image();
fireImg.src = './images/fire.png';

var shipImg = new Image();
shipImg.src = './images/ship01.png';

var asterImg = new Image();
asterImg.src = './images/astero.png';

var fonImg = new Image();
fonImg.src = './images/fon.png';
var explImg = new Image();
explImg.src = './images/expl222.png';
var schitImg = new Image();
schitImg.src = './images/shield.png';

//Обработка событий клавиатуры
document.addEventListener("keydown", function(e){
	var keyID = e.keyCode || e.which;
    var keyChar = String.fromCharCode(keyID);
    
    if(keyID  == 39)
    {
        ship.isRight = true;
        e.preventDefault();
    }
    if(keyID == 38){
    	ship.isUp = true;
    	e.preventDefault();
    }
    if(keyID == 40){
    	ship.isDown = true;
    	e.preventDefault();
    }
    if(keyID  == 37)
    {
        ship.isLeft = true;
        e.preventDefault();
    }
    if(keyID == 32)
    {
        ship.isProbel = true;
        e.preventDefault();
    }
});
document.addEventListener("keyup", function(e){
var keyID = e.keyCode || e.which;
    var keyChar = String.fromCharCode(keyID);
    
    if(keyID  == 39)
    {
        ship.isRight = false;
        e.preventDefault();
    }
    if(keyID  == 37)
    {
        ship.isLeft = false;
        e.preventDefault();
    }
    if(keyID == 38){
    	ship.isUp = false;
    	e.preventDefault();
    }
    if(keyID == 40){
    	ship.isDown = false;
    	e.preventDefault();
    }
    if(keyID == 32)
    {
        ship.isProbel = false;
        e.preventDefault();
    }
});

//Созданеи текста очков
function scoreDraw(){
	context.fillStyle = "White";
	context.font = "22px Russo One";
	context.fillText("Очки: "+score,30,520);
}
//Жизни
function lifeDraw(){
	context.fillStyle = "White";
	context.font = "22px Russo One";
	context.fillText("Жизни: "+life,20,550)
}

function game(){//основной игровой цикл
	if(isPlaing){
	update();
	render();
	requestAnimationFrame(game);//Создается бесконечный цикл для запуска игры, работет в хроме
	}
}

function update(){//Обновление данных, физика
	
	if(ship.isRight)
        ship.x += ship.dx;
    if(ship.isLeft)
         ship.x -= ship.dx;
     if(ship.isUp){
     	ship.y -= ship.dx;
     }
     if (ship.isDown) {
     	ship.y += ship.dx;
     }
	//Запуск астероидов по очереди каждые десять кадров(фрэймов)
	timer++;
	if(timer%50==0){
		//Заполнение массива астероидов элементами
		asteroid.push({
			x:Math.random()*560,//Генерация случайной координаты икс от 0 до 600
			y:-50,
			dx:Math.random()*2-1,
			dy:Math.random()*2+1,
			del: 0
		});
	}
	//Выстрелы по таймеру автоматические
	if(ship.isProbel){
		if(timer%8==0){
		fire.push({
			x:ship.x+10,
			y:ship.y,
			dx:0,
			dy:-5.2
		});
		}
	}
	//двигаем пули
	for(i in fire){
		fire[i].x += fire[i].dx;
		fire[i].y += fire[i].dy;

		if(fire[i].y<-30)fire.splice(i,1);
	}

	//анимация взрывов
	for(i in expl){
		expl[i].animix=expl[i].animix+0.3;//0.3 это скорость анимации
		if(expl[i].animix>7){//первое условие это идем по верхнему ряду 7 это число элементов в ряде
			expl[i].animy++;
			expl[i].animix = 0
		}
		if(expl[i].animy>7) expl.splice(i,1);
	}
	//анимация щита
	sheld.animx=sheld.animx+1;
	if (sheld.animx>4) {sheld.animy++; sheld.animx=0}
	if (sheld.animy>3) {
	sheld.animx=0; sheld.animy=0;
	}

	for(i in asteroid){
	//физика
	asteroid[i].x += asteroid[i].dx;
	asteroid[i].y += asteroid[i].dy;

	//границы
	if(asteroid[i].x>=540 || asteroid[i].x<0) asteroid[i].dx = -asteroid[i].dx;
	if(asteroid[i].y>580 ) asteroid.splice(i,1);//если астероид зашел за пределы экрана то его удаляем
//Проверка на столкновение автероида с кораблем
	if(Math.abs(asteroid[i].x+30-ship.x-25)<60 && Math.abs(asteroid[i].y-ship.y)<26){
		if(timer%6==0){
			life--;
			if(life<=0) {updateRestart();}
		};
			
		}
	//проверим каждый астероид на столкновение с каждой пулей
	for(j in fire){
		if(Math.abs(asteroid[i].x+30-fire[j].x-15)<60 && Math.abs(asteroid[i].y-fire[j].y)<30){//25 это учитывание половины размера астероида
			//произошло столкновение
		//Увеличиваем очки
		score++;
		//спан взрыва
		expl.push({x:asteroid[i].x-30,y:asteroid[i].y-30,animix:0,animy:0});

		//помечаем астероид на удаление
		asteroid[i].del = 1;
		fire.splice(j,1);break;
		}
	}
		//Удаление астероида
		if(asteroid[i].del == 1)asteroid.splice(i,1);
	}
	

}
function updateRestart(){
	canvas.style.display = "none";
	restar_cont.style.display = "block";
	ctxRestart.font = "30px Russo One";
	ctxRestart.fillStyle = "white";
	ctxRestart.fillText(''+score,345,180);
}
restar.addEventListener("click",function(){

restar_cont.style.display = "none";
	canvas.style.display = "block";
	score = 0;
	life = 3;
	ship.x = 300;
	ship.y = 500;
	asteroid = [];
	
});

start_knp.addEventListener('click',function(){
	isPlaing = true;
	var constart = document.getElementById('conteiner_startgame');
	constart.style.display = "none";
	canvas.style.display = "block";
	game();
	//startGame();
});

function render(){//функция занимается отрисовкой
context.drawImage(fonImg,0,0,600,600);//Отрисовка фона !Важен порядок, слой за слоем

scoreDraw();
lifeDraw();
context.drawImage(shipImg,ship.x,ship.y); //Отрисовка корабля
for(i in fire){
	context.drawImage(fireImg,fire[i].x,fire[i].y,30,30);
};
context.drawImage(schitImg, 192*Math.floor(sheld.animx),192*Math.floor(sheld.animy),192,192, sheld.x-25, sheld.y-25, 100, 100);
for(i in asteroid){
context.drawImage(asterImg,asteroid[i].x,asteroid[i].y,60,60);
}
//рисуем взрывы
for (i in expl){
	context.drawImage(explImg,128*Math.floor(expl[i].animix),128*Math.floor(expl[i].animy),128,128,expl[i].x,expl[i].y,100,100);
}//128 это размер спрайта

};