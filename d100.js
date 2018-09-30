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

function calcularDano(modificadorDano) {
	var dadoDano = rolarDado(6);
	var novoDano = dadoDano + modificadorDano;
	
	model.dadoDano = dadoDano;
	
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

function rolarEncontro() {
	var dadoMonstro = rolarDado(10) - 1;
	var dadoMonstroValorAtaque = rolarDado(100);
	var danoCalculado = calcularDano(monstros[dadoMonstro].modificadorDano);
	
	model.monstroDado = dadoMonstro + 1;
	model.monstroNome = monstros[dadoMonstro].nome;
	model.monstroModificadorDano = monstros[dadoMonstro].modificadorDano;
	model.monstroValorAtaque = monstros[dadoMonstro].valorAtaque;
	model.dadoMonstroValorAtaque = dadoMonstroValorAtaque;
	
	if(dadoMonstroValorAtaque <= monstros[dadoMonstro].valorAtaque) {
		model.dano = danoCalculado;
	} else {
		model.dano = 0;
	}
	
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