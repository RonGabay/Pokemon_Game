const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 15;

const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG_ATTACK';

const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_HEAL_PLAYER = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';

let battleLog = []; // array created
let lastLogEntry;
let chosenMaxLife ;


function getMaxHealthValue()
{
  const enteredValue = prompt('Enter health for you and moster', '100');
  const parseValue = parseInt(enteredValue);
  if(isNaN(parseValue) || parseValue <= 0) 
  {
    throw{message: 'invalid user input,not a number'};
  }
  return parseValue;
}

try {
  chosenMaxLife = getMaxHealthValue();
} catch (error) {
  console.log(error);
  chosenMaxLife = 100;
  alert('Error: you entered something wrong, the value is 100');
} /* finally {

} */

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
const initialPlayerHealth = currentPlayerHealth;
let hasBonusLife = true;

adjustHealthBar(chosenMaxLife);


function attackMonster(mode)
{
  let damageAttack;
  let logEvent;
  if(mode === MODE_ATTACK)
  {
    damageAttack = ATTACK_VALUE;
    logEvent = LOG_EVENT_PLAYER_ATTACK;
  }
  else if(mode === MODE_STRONG_ATTACK)
  {
    damageAttack = STRONG_ATTACK_VALUE;
    logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
  }

  const monsterDamage = dealMonsterDamage(damageAttack);
  currentMonsterHealth -= monsterDamage;

  writeToLog(
    logEvent,
    damageAttack,
    currentMonsterHealth,
    currentPlayerHealth
  );

  endRound();
}

function attackHandler()
{
  attackMonster(MODE_ATTACK); // argument inside ()
}

function strongAttackHandler()
{
  attackMonster(MODE_STRONG_ATTACK); // argument inside ()
}

function healPlayerHandler()
{
  let healValue;
  if(currentPlayerHealth >= chosenMaxLife - HEAL_VALUE)
  {
    healValue = chosenMaxLife - currentPlayerHealth;
    alert('You cannot heal more then your initial player health');
  }
  else {
    healValue = HEAL_VALUE;
  }

  currentPlayerHealth += healValue;
  increasePlayerHealth(healValue);

  writeToLog(
    LOG_EVENT_HEAL_PLAYER,
    healValue,
    currentMonsterHealth,
    currentPlayerHealth
  );

  endRound();
}

function printLogHandler()
{
  let j = 0;
  while (j < 3) {
    console.log('---------------');
    j++;
  }

  let i = 1;
  for (const logEntry of battleLog)
  {
    if ((!lastLogEntry && lastLogEntry !== 0) || lastLogEntry < i)
    {
       console.log(`#${i}`);
       for(const key in logEntry)
       {
         console.log(`${key} => ${logEntry[key]}`);
       }
       lastLogEntry = i;
       break;
    }
    i++;
  }
}

function writeToLog(event, value, monsterHealth, playerHealth)
{
  let logEntry = {
    event: event,
    value: value,
    monsterHealth: monsterHealth,
    playerHealth: playerHealth,
  };

  switch (event) {
    case LOG_EVENT_PLAYER_ATTACK:
      logEntry.target = 'Monster';
      break;

    case LOG_EVENT_PLAYER_STRONG_ATTACK:
      logEntry.target = 'Monster';
      break;

    case LOG_EVENT_MONSTER_ATTACK:
      logEntry.target = 'PLAYER';
      break;

    case LOG_EVENT_HEAL_PLAYER:
      logEntry.target = 'PLAYER';
      break;

    case LOG_EVENT_GAME_OVER:
      break;
  
    default:
      console.log('Error: switch system');
      break;
  }
  
  battleLog.push(logEntry);
}

function reset()
{
  currentPlayerHealth = chosenMaxLife;
  currentMonsterHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}

function endRound()
{
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;

  writeToLog(
    LOG_EVENT_MONSTER_ATTACK,
    playerDamage,
    currentMonsterHealth,
    currentPlayerHealth
  );

  if(currentPlayerHealth <= 0 && hasBonusLife)
  {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth;
    setPlayerHealth(currentPlayerHealth);
    alert('You lost your bonus life, Good luck!');
  }

  if(currentPlayerHealth > 0 && currentMonsterHealth <= 0)
  {
    alert('You Won');
    writeToLog(
      LOG_EVENT_GAME_OVER,
      'PLAYER WON',
      currentMonsterHealth,
      currentPlayerHealth
    );
  } 
  else if(currentMonsterHealth > 0 && currentPlayerHealth <= 0)
  {
    alert('You Lose');
    writeToLog(
      LOG_EVENT_GAME_OVER,
      'MONSTER WON',
      currentMonsterHealth,
      currentPlayerHealth
    );
  }
  else if(currentMonsterHealth <= 0 && currentPlayerHealth <= 0)
  {
    alert('A Draw');
    writeToLog(
      LOG_EVENT_GAME_OVER,
      'A DRAW',
      currentMonsterHealth,
      currentPlayerHealth
    );
  }

  if(currentPlayerHealth <= 0 || currentMonsterHealth <= 0)
  {
    reset();
  }
}


attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', printLogHandler);