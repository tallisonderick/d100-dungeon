var monstros = [
		{nome:"GIANT RAT", danoModificador: -2, av: 25},
		{nome:"GIANT BAT", danoModificador: -3, av: 25},
		{nome:"GIANT ANT", danoModificador: -2, av: 20},
		{nome:"GIANT SPIDER", danoModificador: -1, av: 30},
		{nome:"GOBALOTES", danoModificador: -2, av: 25},
		{nome:"GOBLIN", danoModificador: -1, av: 25},
		{nome:"GOBLIN ARCHER", danoModificador: -1, av: 25},
		{nome:"GOBLIN WARLOCK", danoModificador: -1, av: 30},
		{nome:"BEAR", danoModificador: 0, av: 40},
		{nome:"RAT MAN", danoModificador: 0, av: 30}
];

var model = {
	hp: 20,
	dano: 0,
	danoDado: 0
};

function atualizarTela(model) {
	document.getElementById('hp').value = model.hp;
	
	criarTabelaMonstros();
}
	
function rolarDado(faces) {
	var valorDado = Math.floor((Math.random() * faces) + 1);
	return valorDado;
}

function calcularDano(danoModificador) {
	var danoDado = rolarDado(6);
	var novoDano = danoDado + danoModificador;
	
	model.danoDado = danoDado;
	
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
	var monstroDado = rolarDado(10) - 1;
	
	document.getElementById('monstroDado').value = monstroDado + 1;
	document.getElementById('monstroNome').value = monstros[monstroDado].nome;
	document.getElementById('monstroModificadorDano').value = monstros[monstroDado].danoModificador;
	document.getElementById('monstroValorAtaque').value = monstros[monstroDado].av;
		
	var monstroDadoAv = rolarDado(100);
	document.getElementById('dadoAv').value = monstroDadoAv;
	
	if(monstroDadoAv <= monstros[monstroDado].av) {
		model.dano = calcularDano(monstros[monstroDado].danoModificador);	
		document.getElementById('dano').value = model.dano;
	} else {
		document.getElementById('dano').value = 0;
	}
	
	document.getElementById('danoDado').value = model.danoDado;
}

function criarTabelaMonstros(){
	var tabela = "<tr><th>D100</th><th>MONSTRO ENCONTRADO</th><th>AV</th><th>DMG</th></tr>";
	for(var i = 0; i < monstros.length; i++) {
		tabela += "<tr>";
		tabela += "<td>" + (i + 1) + "</td>";
        tabela += "<td>" + monstros[i].nome + "</td>";
		tabela += "<td>" + monstros[i].danoModificador + "</td>";
		tabela += "<td>" + monstros[i].av + "</td>";
		tabela += "</tr>";
	}
	document.getElementById('tabelaMonstros').innerHTML = tabela;	
}