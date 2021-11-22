var anchoCanvas=700;
var altoCamvas=300;
var canvas, contextoCanvas;


var frameParSegundo = 50;


const teclado = (()=>{ evento.keyCode == 32})
const touch = (()=>{evento.click})


var imagenDinosaurio;
var imagenNube;
var imagenNubedos;
var imagenSol;
var imagenCactus;
var imagenSol;


var suelo = 200;
var atributosDinosaurio ={posicionx: suelo, velocidady:0, gravedad:2, salto:28, velocidadymax:9, saltando:false};
var nivel={velocidad:9, marcador:0, muerto:false, numeroNivel:1};
var cactus={posicionx: anchoCanvas:+100, posiciony: suelo-25,};
var nube={posicionx:400, posiciony:100, velocidad:1};
var nubedos={posicionx:200, posiciony:50, velocidad:2};
var sol={posicionx:300, posiciony:20, velocidad:0}
var suelog={posicionx:0, posiciony:suelo+30};

document.addEventListener('click', function(evento){
     if (touch) {
     	if(nivel.muerto == false)
     		saltar();
     	else{
     		nivel.velocidad=9;
     		nube.velocidad=1;
     		nubedos.velocidad=2;
     		sol.velocidad= 0;
     		cactus.posicionx= anchoCanvas+100;
     		nube.posicionx= anchoCanvas+100;
     		nubedos.posicionx= anchoCanvas+100;
     		sol.posicionx=300;
     		nivel.marcador=0;
     		nivel.muerto=false;
     	}
     }

});


document.addEventListener('keydown', function(evento){
     if (teclado) {
     	if(nivel.muerto == false)
     		saltar();
     	else{
     		nivel.velocidad=9;
     		nube.velocidad=1;
     		nubedos.velocidad=2;
     		sol.velocidad= 0;
     		cactus.posicionx= anchoCanvas+100;
     		nube.posicionx= anchoCanvas+100;
     		nubedos.posicionx= anchoCanvas+100;
     		sol.posicionx=300;
     		nivel.marcador=0;
     		nivel.muerto=false;
     	}
     }

});


function cargaImagenes(){
	imagenDinosaurio= new Image();
	imagenDinosaurio.src='img/Dinosaurio.png';

	imagenNube= new Image();
	imagenNube.src='img/Nube.jpg';

	imagenNubedos= new Image();
	imagenNubedos.src='img/Nubedos.png';

	imagenSol= new Image();
	imagenSol.src='img/Sol.jpg';

	imagenCactus= new Image();
	imagenCactus.src='img/Cactus.jpg';

	imagenSuelo= new Image();
	imagenSuelo.src='img/Suelo.png';
}

function inicializa(){
	canvas = document.getElementById('canvas');
	contextoCanvas= canvas.getContext('2d');
	cargaImagenes();
}


function borrarCanvas(){
	canvas.width = anchoCanvas;
	canvas.heght = altoCanvas;
}


function dibujaDinosaurio(){
	contextoCanvas.drawImage(imagenDinosaurio,0,0,413,549,100,atributosDinosaurio.posiciony,50,60 );
}



function dibujaCactus(){
	contextoCanvas.drawImage(imagenCactus,0,0,69,135,cactus.posicionx,cactus.posiciony,38,75);
}


function movimientoCactus(){
	if (cactus.posicionx < -100) {
		cactus.posicionx = anchoCanvas + 100;
		nivel.marcador++;
	} else {
		cactus.posicionx -- nivel.velocidad;
	}
}



function dibujaSuelo(){
	contextoCanvas.drawImage(imagenSuelo,suelog.posicionx,0,700,30,0,suelog.posiciony,900,30);
}


function movimientoSuelo(){
 if (suelog.posicionx < -120) {
		cactus.posicionx = 0;
	} else {
		suelog.posicionx +- nivel.velocidad;
	}
}



function dibujaNube(){
	contextoCanvas.drawImage(imagenNube,0,0,533,289,nube.posicionx,nube.posiciony,82,31);
}


function movimientoNube(){
	if (nube.posicionx < -100) {
		nube.posicionx = anchoCanvas + 100;
	} else {
		nube.posicionx -- nube.velocidad;
	}
}

function dibujaNubedos(){
	contextoCanvas.drawImage(imagenNubedos,0,0,533,289,nubedos.posicionx,nubedos.posiciony,82,31);
}


function movimientoNubedos(){
	if (nubedos.posicionx < -100) {
		nubedos.posicionx = anchoCanvas + 100;
	} else {
		nubedos.posicionx -- nubedos.velocidad;
	}
}



function dibujaSol(){
	contextoCanvas.drawImage(imagenSol,0,0,533,289,sol.posicionx,sol.posiciony,82,31);
}


function saltar(){
	atributosDinosaurio.saltando=true;
    atributosDinosaurio.velocidad=atributosDinosaurio.salto;

}

function gravedad(){
	if(atributosDinosaurio.saltando==true){
		if (atributosDinosaurio.posiciony - atributosDinosaurio.velocidad - atributosDinosaurio.gravedad> suelo) {
			atributosDinosaurio.saltando=false;
			atributosDinosaurio.velocidad=0;
			atributosDinosaurio.posiciony=suelo;
		} else {
			atributosDinosaurio.velocidad-=atributosDinosaurio.gravedad;
			atributosDinosaurio.posiciony-=atributosDinosaurio.velocidady;
		}
	}
}

function choque(){
	if (cactus.posicionx>=100 && cactus.posicionx <=150) {
		if (atributosDinosaurio.posiciony>=suelo-25) {
			nivel.muerto=true;
			nivel.velocidad=0;
			nube.velocidad=0;
			nubedos.velocidad=0;
		} 
	}
}



function puntuacion(){
	contextoCanvas.font="20px impact";
	contextoCanvas.fillStyle="#000000";
	contextoCanvas.fillText('PUNTEO:${nivel.marcador}',520.50);
	contextoCanvas.fillText('NIVEL:${nivel.numeroNivel}',120,50);
	contextoCanvas.fillText('DESARROLLADO POR ZANTIAGO',100,290);
	if (nivel.muerto == true) {
		contextoCanvas.font="60px impact";
		contextoCanvas.fillText('fin del juego',150,350);
	}
}


setInterval(function(){
	principal();
},1000/frameParSegundo);


function principal(){
	borrarCanvas();
	choque();
	movimientoSuelo();
	movimientoCactus();
	movimientoNube();
	movimientoNubedos();
	dibujaSuelo();
	dibujaNube();
	dibujaNubedos();
	dibujaSol();
	atributosDinosaurio();
	dibujaCactus();
	gravedad();
	puntuacion();
}

























































