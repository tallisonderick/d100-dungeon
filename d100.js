function attack() {
			var hp = document.getElementById('hp').value;
			var dano = document.getElementById('dano').value;
			var novoHp = hp - dano;
			
			document.getElementById('hp').value = novoHp;
		}