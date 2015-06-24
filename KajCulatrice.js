/**Cette calculatrice peut etre utilisee dans n'importe quelle page, il suffit d'y inclure
*l'addresse du script "KajCulatrice.js" **/

var operation='r';
var tampon=0;
var prise=false;//cette variable signale au moteur de calcul si une entree a deja ete prise en compte
var allume=1,d=0;//la variable d signale un etat 'attente de deplacement'...
/** on va preparer un deplacement prochain....ou memoriser la position actuelle si on etait entrain de se deplacer **/
var verdep=function(){
	d+=1;
	d%=2;
	if (!d) deplacer.title='Faites un \'click\' pour deplacer la calculatrice';
	else deplacer.title='Faites un \'click\' pour maintenir cette position';
}
/**...on effectue le deplacement **/
var deplace=function(e){
	if (d){
		kajc.style.left= -120+ e.clientX+'px';
		kajc.style.top= -20+ e.clientY+'px';
	}
}
/** Ce module met la calculatrice dans sa forme reduite **/
var pli=function(){
	if (allume) garde.src=dossierLocal()+'logo_on.PNG';
	else garde.src=dossierLocal()+'logo_off.PNG';
	kajc.style.display='none';
	garde.title='Reactiver la calculatrice';
	garde.style.display='block';
}
/**ce module raffiche la calculatrice depuis sa forme reduite **/
var reveil=function(){
	garde.style.display='none';
	kajc.style.display='block';
}
/** Ce module copie l'heure actuelle du systeme pour nous l'afficher dans la montre **/
function frais(){
	var heur=new Date().toLocaleTimeString();
	document.getElementById('montre').innerHTML=heur;
}
/** Gros module qui sert a la creation du DOM de la calculatrice **/
function objets(){
	//la balise de style de la KajCulatrice
	style=document.createElement('link');
	style.href=dossierLocal()+'KajCulatrice.css';
	style.rel='stylesheet';
	style.type='text/css';
	
	var kajc=document.createElement('div');//conteneur global de la calculatrice
	kajc.id='kajc';
	var contenu=document.createElement('p');//zone d'affichage
	contenu.id='contenu';
	contenu.innerHTML='0';
	var saut1=document.createElement('hr');
	var saut2=document.createElement('hr');
	var ecran=document.createElement('div');//conteneur de mon ecran!
	ecran.id='ecran';
	ecran.appendChild(contenu);
	
	//les elements de kontrole
	var montre=document.createElement('span');
	montre.id='montre';
	var on=document.createElement('span');
	on.id='on';
	on.innerHTML='ON';
	on.onclick=initkaj;
	on.className='touche';
	//controles extra....juste pour s'ammuser
	var garde=document.createElement('img');//image de garde de ma calculatrice
	garde.id='garde';
	garde.addEventListener("click",reveil,false);
	
	var plier=document.createElement('span');
	plier.id='plier';
	plier.addEventListener("click",pli,false);
	plier.title='Reduire temporairement la calculatrice';
	
	var deplacer=document.createElement('span');
	deplacer.id='deplacer';
	deplacer.addEventListener("mousedown",verdep,false);//on verrouille le deplacement
	document.body.addEventListener("mousemove",deplace,false);//on effectue le deplacement
	deplacer.title='Faites un \'click\' pour deplacer la calculatrice';
	
	var ce=document.createElement('span');
	ce.id='ce';
	ce.innerHTML='OFF';
	ce.onclick=eteint;
	ce.className='touche';
	//zone de kontrol
	var kontrol=document.createElement('div');
	kontrol.id='kontrol';
	kontrol.appendChild(montre);
	kontrol.appendChild(on);
	kontrol.appendChild(ce);
	
	//Les touches du clavier
	var t0=document.createElement('span');
	t0.id='0';
	t0.innerHTML='0';
	t0.onclick=function(){ecrit('0');};
	t0.className='touche';
	var t1=document.createElement('span');
	t1.id='1';
	t1.innerHTML='1';
	t1.onclick=function(){ecrit('1');};
	t1.className='touche';
	var t2=document.createElement('span');
	t2.id='2';
	t2.innerHTML='2';
	t2.onclick=function(){ecrit('2');};
	t2.className='touche';
	var t3=document.createElement('span');
	t3.id='3';
	t3.innerHTML='3';
	t3.onclick=function(){ecrit('3');};
	t3.className='touche';
	var t4=document.createElement('span');
	t4.id='4';
	t4.innerHTML='4';
	t4.onclick=function(){ecrit('4');};
	t4.className='touche';
	var t5=document.createElement('span');
	t5.id='5';
	t5.innerHTML='5';
	t5.onclick=function(){ecrit('5');};
	t5.className='touche';
	var t6=document.createElement('span');
	t6.id='6';
	t6.innerHTML='6';
	t6.onclick=function(){ecrit('6');};
	t6.className='touche';
	var t7=document.createElement('span');
	t7.id='7';
	t7.innerHTML='7';
	t7.onclick=function(){ecrit('7');};
	t7.className='touche';
	var t8=document.createElement('span');
	t8.id='8';
	t8.innerHTML='8';
	t8.onclick=function(){ecrit('8');};
	t8.className='touche';
	var t9=document.createElement('span');
	t9.id='9';
	t9.innerHTML='9';
	t9.onclick=function(){ecrit('9');};
	t9.className='touche';
	var tpoint=document.createElement('span');
	tpoint.id='point';
	tpoint.innerHTML='.';
	tpoint.onclick=function(){ecrit('.');};
	tpoint.className='touche';
	var tplus=document.createElement('span');
	tplus.id='plus';
	tplus.innerHTML='+';
	tplus.onclick=function(){oper('+');};
	tplus.className='touche';
	var tmoins=document.createElement('span');
	tmoins.id='moins';
	tmoins.innerHTML='-';
	tmoins.onclick=function(){oper('-');};
	tmoins.className='touche';
	var tfois=document.createElement('span');
	tfois.id='fois';
	tfois.innerHTML='x';
	tfois.onclick=function(){oper('*');};
	tfois.className='touche';
	var tdiviser=document.createElement('span');
	tdiviser.id='diviser';
	tdiviser.innerHTML='/';
	tdiviser.onclick=function(){oper('/');};
	tdiviser.className='touche';
	var tegale=document.createElement('span');
	tegale.id='egale';
	tegale.innerHTML='=';
	tegale.onclick=function(){oper('=');};
	tegale.className='touche';
	
	//Lignes de mon clavier
	var zero=document.createElement('p');
	zero.appendChild(t0);
	zero.appendChild(tpoint);
	zero.appendChild(tegale);
	zero.appendChild(tdiviser);
	var un=document.createElement('p');
	un.appendChild(t1);
	un.appendChild(t2);
	un.appendChild(t3);
	un.appendChild(tfois);
	var quatre=document.createElement('p');
	quatre.appendChild(t4);
	quatre.appendChild(t5);
	quatre.appendChild(t6);
	quatre.appendChild(tmoins);
	var sept=document.createElement('p');
	sept.appendChild(t7);
	sept.appendChild(t8);
	sept.appendChild(t9);
	sept.appendChild(tplus);
	//le clavier lui meme
	var klavier=document.createElement('div');
	klavier.id='klavier';
	//constitution finale du clavier
	klavier.appendChild(sept);
	klavier.appendChild(quatre);
	klavier.appendChild(un);
	klavier.appendChild(zero);
	
	//constitution de la kajculatrice elle meme
	kajc.appendChild(plier);
	kajc.appendChild(deplacer);
	kajc.appendChild(ecran);
	kajc.appendChild(saut1);
	kajc.appendChild(saut2);
	kajc.appendChild(kontrol);
	kajc.appendChild(klavier);
	document.body.appendChild(kajc);
	document.body.appendChild(garde);
	document.head.insertBefore(style,document.head.firstChild);
}
/** chargeur du script de la calculatrice **/
window.onload=function(){
	objets();
	setInterval(frais,1000);
	document.getElementById('kajc').style.display='block';
};
/** ce module coordonne l'affichage sur l'ecran **/
function ecrit(valeur){
	
	var monEcran=document.getElementById('contenu');
	if (tampon=='Erreur grave!') {//on vide le tampon si il ya eu erreur precedemment
	tampon=0;
	prise=1;
	operation='r';
	}
	if (allume) {
	//l'ecran contient deja '0'
	if (monEcran.innerHTML=='0'){
		if (valeur==='.'){ //si la touche . est enfoncee
			monEcran.innerHTML='0.';
		}
		if (valeur!='.'){ //si la touche appuiyee n'est pas le .
			monEcran.innerHTML=valeur;
		}
	}
	else
	{
		if ((valeur!='.' && !prise)&&(monEcran.innerHTML.length<11)){ 
			monEcran.innerHTML+=valeur;
		}
		if (valeur!='.' && prise){ 
			monEcran.innerHTML=valeur;
		}
		if (valeur=='.' && prise && !monEcran.innerHTML.match(/\./g) ){ 
			monEcran.innerHTML='0.';
		}
		if ((valeur=='.' && !prise && ! monEcran.innerHTML.match(/\./g) )&&(monEcran.innerHTML.length<11)){ 
			monEcran.innerHTML+='.';
		}
		if (valeur=='.' && prise && monEcran.innerHTML.match(/\./g) ){ 
			monEcran.innerHTML='0.';
		}
		if (valeur=='.' && !prise && monEcran.innerHTML.match(/\./g) ){ 
			monEcran.innerHTML+='';
		}
	}
	}
	prise=false;
}
/** Petit module pour revenir a zero sans modifier l'environnement de la calculatrice **/
function effaceEcran(){
	var monEcran=document.getElementById('contenu');
	monEcran.innerHTML='0';
	prise=false;
}
/**ce module calcul l'addresse du dossier contenant le script pour les adresses des composants du script **/
function dossierLocal(){
	var i=0;
	var j=0;
	while (!!document.scripts[i] && !j){
		if (!!document.scripts[i].src.match('KajCulatrice.js')){ 
		var kaj=document.scripts[i].src;
		j=1;
		}
		i++;
	}
	kaj=kaj.substring(0,kaj.length-15);
	return kaj;
	}
/**moteur de calcul de la calculatrice**/
function oper(op){
	if (allume){
	var doc=contenu;
	//ne pas ecouter les touches d'operateurs si un message d'erreur est affiché a l'ecran
	if (operation!='r' && !prise && tampon!='Erreur grave!'){
		switch (operation){
		case '+' :
		tampon +=+doc.innerHTML;
		break;
		case '-' :
		tampon -=+ doc.innerHTML;
		break;
		case '*' :
		tampon *=+doc.innerHTML;
		break;
		case '/' :
		if (doc.innerHTML!=0){
		tampon /=+ doc.innerHTML;
		}
		else tampon='Erreur grave!';
		break;
		default:
		alert('si vous voyez ce message alors \n c\'est que vous avez modifier le code original \n sans l\'avoir compris contactez l\'auteur \n au numero (+237) 71943801.');
		}
		operation='r'; //on signale avoir pris en compte cet operateur....en reinitialisant operateur
	}else if ((operation=='r' || prise) && tampon!='Erreur grave!') tampon=+ doc.innerHTML;
		if (op!='='){
		operation=op;
		prise=1;
		doc.innerHTML=tampon;
		if (doc.innerHTML.length>=11) doc.innerHTML=tampon.toExponential(5);
		}
		if (op=='=') {
		doc.innerHTML=tampon;
		if (doc.innerHTML.length>=11) doc.innerHTML=tampon.toExponential(5);
		prise=1;
		operation='r';
		}
	}
}
/**extincteur de la calculatrice**/
function eteint(){
	document.getElementById('contenu').innerHTML='';
	allume=0;
};
/** Remise a zero de la calculatrice **/
function initkaj(){
	 document.getElementById('contenu').innerHTML='0';
	 operation='r';
	 tampon=0;
	 allume=1;
	 prise=false;
	 }

/** Si on en est la alors tout ou presque a ete fait!!!!! **/
