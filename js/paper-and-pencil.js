function AppViewModel() {
	var self = this;

	self.tabelaDeEncontro = ko.observableArray([
		{ min: 1, max: 10, nome: "GIANT RAT", valorAtaque: 25, modificadorDano: -2, hp: 3 },
		{ min: 11, max: 20, nome: "GIANT BAT", valorAtaque: 25, modificadorDano: -3, hp: 2 },
		{ min: 21, max: 25, nome: "GIANT ANT", valorAtaque: 20, modificadorDano: -2, hp: 3 },
		{ min: 26, max: 30, nome: "GIANT SPIDER", valorAtaque: 30, modificadorDano: -1, hp: 6 },
		{ min: 31, max: 33, nome: "GOBALOTE", valorAtaque: 25, modificadorDano: -2, hp: 3 },
		{ min: 34, max: 37, nome: "GOBLIN", valorAtaque: 25, modificadorDano: -1, hp: 2 },
		{ min: 38, max: 41, nome: "GOBLIN ARCHER", valorAtaque: 25, modificadorDano: -1, hp: 2 },
		{ min: 42, max: 42, nome: "GOBLIN WARLOCK", valorAtaque: 30, modificadorDano: -1, hp: 7 },
		{ min: 43, max: 44, nome: "BEAR", valorAtaque: 40, modificadorDano: 0, hp: 10 },
		{ min: 45, max: 46, nome: "RAT MAN", valorAtaque: 30, modificadorDano: 0, hp: 3 }
	]);

	self.combate = new Combate();

	self.combateTerminou = ko.observable();
	self.dadoReacao = ko.observable();
	self.resultadoReacao = ko.observable();
	self.resultadoFinalDoCombate = ko.observable();

	self.aplicarDadosDoCombate = function () {
		self.combateTerminou(self.combate.combateTerminou);
		self.dadoReacao(self.combate.dadoReacao);
		self.resultadoReacao(self.combate.resultadoReacao);
		self.resultadoFinalDoCombate(self.combate.resultadoFinalDoCombate);
	}

	self.rolarReacao = function () {
		var dado = rolarDado(10);
		self.combate.descobrirReacao(dado);
		self.aplicarDadosDoCombate();
	};

}

//window.Combate = new Combate();

ko.applyBindings(new AppViewModel());

function Combate() {
	var self = this;

	self.combateTerminou = false;
	self.dadoReacao = 0;

	self.resultadoReacao = "";
	self.resultadoFinalDoCombate = "";

	self.descobrirReacao = function (dado) {
		self.dadoReacao = dado;
		self.resultadoFinalDoCombate = dado;
		self.combateTerminou = true;
	};
}

var tabelaDeEncontro = [
	{ min: 1, max: 10, nome: "GIANT RAT", valorAtaque: 25, modificadorDano: -2, hp: 3 },
	{ min: 11, max: 20, nome: "GIANT BAT", valorAtaque: 25, modificadorDano: -3, hp: 2 },
	{ min: 21, max: 25, nome: "GIANT ANT", valorAtaque: 20, modificadorDano: -2, hp: 3 },
	{ min: 26, max: 30, nome: "GIANT SPIDER", valorAtaque: 30, modificadorDano: -1, hp: 6 },
	{ min: 31, max: 33, nome: "GOBALOTE", valorAtaque: 25, modificadorDano: -2, hp: 3 },
	{ min: 34, max: 37, nome: "GOBLIN", valorAtaque: 25, modificadorDano: -1, hp: 2 },
	{ min: 38, max: 41, nome: "GOBLIN ARCHER", valorAtaque: 25, modificadorDano: -1, hp: 2 },
	{ min: 42, max: 42, nome: "GOBLIN WARLOCK", valorAtaque: 30, modificadorDano: -1, hp: 7 },
	{ min: 43, max: 44, nome: "BEAR", valorAtaque: 40, modificadorDano: 0, hp: 10 },
	{ min: 45, max: 46, nome: "RAT MAN", valorAtaque: 30, modificadorDano: 0, hp: 3 }
];

function MonstroEncontrado(tabelaDeEncontro) {
	var self = this;

	self.hp = tabelaDeEncontro.hp;
	self.tabelaDeEncontro = tabelaDeEncontro;
}

function Personagem(hp, forca) {
	var self = this;

	self.hp = hp;
	self.forca = forca;
}

function LocalAtingido() {
	var self = this;

	self.dadoDeLocal = '';
	self.localAtingido = '';
	self.modificadorDeDano = '';
}

function ReacaoDoMonstro() {
	var self = this;

	self.dadoDeReacao = '';
	self.reacaoDoMonstro = '';
}

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
}

function rolarDado(faces) {
	var valorDado = Math.floor((Math.random() * faces) + 1);
	return valorDado;
}

function rolarEncontro() {
	var dadoMonstro = rolarDado(10);
	var pos = dadoMonstro - 1;

	model.monstroDado = dadoMonstro;
	model.monstroNome = tabelaDeEncontro[pos].nome;
	model.monstroModificadorDano = tabelaDeEncontro[pos].modificadorDano;;
	model.monstroValorAtaque = tabelaDeEncontro[pos].valorAtaque;

	var d10Imagem = "<img class='d10' src='faceDados/d10-" + model.monstroDado + ".png'>";
	document.getElementById('d10').innerHTML = d10Imagem;

	atualizarTela(model);
}

function rolarAv() {
	var dadoDezena = (rolarDado(10) - 1) * 10;
	var dadoUnidade = (rolarDado(10) - 1);
	var somaDado = dadoDezena + dadoUnidade;

	if (somaDado == 0) {
		model.dadoMonstroValorAtaque = 100;
	} else {
		model.dadoMonstroValorAtaque = somaDado;
	}

	if (dadoDezena == 0) {
		var d100Imagem = "<img class='d10' src='faceDados/d10-00.png'>";
	} else {
		var d100Imagem = "<img class='d10' src='faceDados/d10-" + dadoDezena + ".png'>";
	}

	d100Imagem += "<img class='d10' src='faceDados/d10-" + dadoUnidade + ".png'>";
	document.getElementById('d100').innerHTML = d100Imagem;

	atualizarTela(model);
}

function rolarDano() {
	model.dadoDano = rolarDado(6);

	var danoCalculado = calcularDano(model.monstroModificadorDano);

	if (model.dadoMonstroValorAtaque <= model.monstroValorAtaque) {
		model.dano = danoCalculado;
	} else {
		model.dano = 0;
	}

	var d6Imagem = "<img class='d6' src='faceDados/d6-" + model.dadoDano + ".png'>";
	document.getElementById('d6').innerHTML = d6Imagem;

	atualizarTela(model);
}

function calcularDano(modificadorDano) {
	var dano = model.dadoDano + modificadorDano;

	if (dano < 0) return 0;

	return dano;
}

function sofrerDano() {
	model.hp = model.hp - model.dano;

	atualizarTela(model);
}