const monsterHealthBar = document.getElementById("id-monsterHealth");
const playerHealthBar = document.getElementById("id-playerHealth");
const bonusLife = document.getElementById("id-bonusLife");

const attackBtn = document.getElementById("id-attackBtn");
const strongAttackBtn = document.getElementById("id-strongAttackBtn");
const healBtn = document.getElementById("id-healBtn");
const logBtn = document.getElementById("id-logBtn");

function adjustHealthBar(maxLife)
{
  monsterHealthBar.value = maxLife;
  monsterHealthBar.max = maxLife;
  playerHealthBar.value = maxLife;
  playerHealthBar.max = maxLife;
}

function dealMonsterDamage(damage)
{
  const dealtDamage = Math.random() * damage;
  monsterHealthBar.value -= dealtDamage;
  return dealtDamage;
}

function dealPlayerDamage(damage)
{
  const dealtDamage = Math.random() * damage;
  playerHealthBar.value -= dealtDamage;
  return dealtDamage;
}

function increasePlayerHealth(health)
{
  playerHealthBar.value += health;
}

function setPlayerHealth(health)
{
  playerHealthBar.value = health;
}

function resetGame(reset)
{
  monsterHealthBar.value = reset;
  playerHealthBar.value = reset;
}

function removeBonusLife()
{
  bonusLife.parentNode.removeChild(bonusLife);
}