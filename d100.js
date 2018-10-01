var monstros = [
		{nome:"GIANT RAT", modificadorDano: -2, valorAtaque: 25},
		{nome:"GIANT BAT", modificadorDano: -3, valorAtaque: 25},
		{nome:"GIANT ANT", modificadorDano: -2, valorAtaque: 20},
		{nome:"GIANT SPIDER", modificadorDano: -1, valorAtaque: 30},
		{nome:"GOBALOTES", modificadorDano: -2, valorAtaque: 25},
		{nome:"GOBLIN", modificadorDano: -1, valorAtaque: 25},
		{nome:"GOBLIN ARCHER", modificadorDano: -1, valorAtaque: 25},
		{nome:"GOBLIN WARLOCK", modificadorDano: -1, valorAtaque: 30},
		{nome:"BEAR", modificadorDano: 0, valorAtaque: 40},
		{nome:"RAT MAN", modificadorDano: 0, valorAtaque: 30}
];

var model = {
	hp: 20,
	dano: '',
	dadoDano: '',
	dadoMonstroValorAtaque: '',
	monstroDado: '',
	monstroNome: '',
	monstroModificadorDano: '',
	monstroValorAtaque: ''
};

function atualizarTela(model) {
	document.getElementById('hp').value = model.hp;
	document.getElementById('dano').value = model.dano;
	document.getElementById('dadoDano').value = model.dadoDano;
	document.getElementById('dadoMonstroValorAtaque').value = model.dadoMonstroValorAtaque;
	document.getElementById('monstroDado').value = model.monstroDado;
	document.getElementById('monstroNome').value = model.monstroNome;
	document.getElementById('monstroModificadorDano').value = model.monstroModificadorDano;
	document.getElementById('monstroValorAtaque').value = model.monstroValorAtaque;
	
	criarTabelaMonstros();
}
	
function rolarDado(faces) {
	var valorDado = Math.floor((Math.random() * faces) + 1);
	return valorDado;
}

function rolarEncontro() {
	var dadoMonstro = rolarDado(10) - 1;
	
	model.monstroDado = dadoMonstro + 1;
	model.monstroNome = monstros[dadoMonstro].nome;
	model.monstroModificadorDano = monstros[dadoMonstro].modificadorDano;;
	model.monstroValorAtaque = monstros[dadoMonstro].valorAtaque;
	
	atualizarTela(model);
}

function rolarAv() {
	//var dadoMonstroValorAtaque = rolarDado(100);
	//model.dadoMonstroValorAtaque = dadoMonstroValorAtaque;
	
	var vetor00 = [00, 10, 20, 30,40, 50, 60, 70, 80, 90];
	var vetor0 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
	
	var dado00 = vetor00[rolarDado(10) - 1];
	var dado0 = vetor0[rolarDado(10) - 1];
	
	model.dadoMonstroValorAtaque = dado00 + dado0;
	
	var d100Imagem = "";
	
	if(dado00 == 0) {
		d100Imagem = "<img class='d10' src='faceDados/d10-00.png'>";
	} else {
		d100Imagem = "<img class='d10' src='faceDados/d10-" + dado00 + ".png'>";
	}
	
	d100Imagem += "<img class='d10' src='faceDados/d10-" + dado0 + ".png'>";
	document.getElementById('d100').innerHTML = d100Imagem;
	
	atualizarTela(model);
}

function rolarDano() {
	var dadoDano = rolarDado(6);
	var danoCalculado = calcularDano(model.monstroModificadorDano);
	
	model.dadoDano = dadoDano;
	
	if(model.dadoMonstroValorAtaque <= model.monstroValorAtaque) {
		model.dano = danoCalculado;
	} else {
		model.dano = 0;
	}
	
	var d6Imagem = "<img class='d6' src='faceDados/d6-" + model.dadoDano + ".png'>";
	document.getElementById('d6').innerHTML = d6Imagem;
	
	atualizarTela(model);
}

function calcularDano(modificadorDano) {
	var dadoDano = model.dadoDano;
	var novoDano = dadoDano + modificadorDano;
	
	if(novoDano < 0){
		return 0;
	}
	
	return novoDano;
}

function sofrerDano() {
	var novoHp = model.hp - model.dano;
	
	model.hp = novoHp;
	model.dano = 0;
	
	atualizarTela(model);
}

function criarTabelaMonstros(){
	var tabela = "<tr><th>D10</th><th>MONSTRO ENCONTRADO</th><th>AV</th><th>DMG</th></tr>";
	
	for(var i = 0; i < monstros.length; i++) {
		tabela += "<tr>";
		tabela += "<td>" + (i + 1) + "</td>";
        tabela += "<td>" + monstros[i].nome + "</td>";
		tabela += "<td>" + monstros[i].modificadorDano + "</td>";
		tabela += "<td>" + monstros[i].valorAtaque + "</td>";
		tabela += "</tr>";
	}
	
	document.getElementById('tabelaMonstros').innerHTML = tabela;
}