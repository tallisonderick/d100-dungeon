function rolarDado(faces) {
	var valorDado = Math.floor((Math.random() * faces) + 1);
	return valorDado;
}

function calcularDano(dmgModifier) {
	var dano = rolarDado(6);
	var novoDano = dano + dmgModifier;
	
	if(novoDano < 0){
		return 0;
	}
	
	return novoDano;
}

function sofrerDano() {
	var hp = document.getElementById('hp').value;
	var dano = document.getElementById('dano').value;
	var novoHp = hp - dano;
			
	document.getElementById('hp').value = novoHp;
}

function rolarEncontro() {
	var monstros = [
		{nome:"GIANT RAT", dmgModifier: -2, av: 25},
		{nome:"GIANT BAT", dmgModifier: -3, av: 25},
		{nome:"GIANT ANT", dmgModifier: -2, av: 20},
		{nome:"GIANT SPIDER", dmgModifier: -1, av: 30},
		{nome:"GOBALOTES", dmgModifier: -2, av: 25},
		{nome:"GOBLIN", dmgModifier: -1, av: 25},
		{nome:"GOBLIN ARCHER", dmgModifier: -1, av: 25},
		{nome:"GOBLIN WARLOCK", dmgModifier: -1, av: 30},
		{nome:"BEAR", dmgModifier: 0, av: 40},
		{nome:"RAT MAN", dmgModifier: 0, av: 30}
		];
		
	var monstroDado = rolarDado(10) - 1;
	
	document.getElementById('monstroDado').value = monstroDado + 1;
	document.getElementById('monstroNome').value = monstros[monstroDado].nome;
	document.getElementById('monstroModificadorDano').value = monstros[monstroDado].dmgModifier;
	document.getElementById('monstroValorAtaque').value = monstros[monstroDado].av;
		
	var monstroDadoAv = rolarDado(100);
	document.getElementById('dadoAv').value = monstroDadoAv;
	
	if(monstroDadoAv <= monstros[monstroDado].av) {
		var dano = calcularDano(monstros[monstroDado].dmgModifier);	
		document.getElementById('dano').value = dano;
	} else {
		document.getElementById('dano').value = 0;
	}
}