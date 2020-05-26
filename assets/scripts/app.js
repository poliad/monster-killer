const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE= 18;
const MONSTER_ATTACK_VALUE = 16;
const HEAL_VALUE = 15;

const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG ATTACK';
const LOG_PLAYER_ATTACK = 'PLAYER ATTACK';
const LOG_PLAYER_STRONG_ATTACK = 'PLAYER STRONG ATTACK';
const LOG_PLAYER_HEAL = 'PLAYER HEAL'; 
const LOG_MONSTER_ATTACK = 'MONSTER ATTACK';
const LOG_BONUS_LIFE = 'BONUS LIFE';
const LOG_GAME_OVER = 'GAME OVER';

const enterdValue = prompt('Maximum life', '100');

let battleLog=[];
let maxHealth = parseInt(enterdValue);

if(isNaN(maxHealth) || maxHealth <=0){
    maxHealth=100;
}

let currentMonsterHealth = maxHealth;
let currentPlayerHealth = maxHealth;
let hasBonusLife = true;

adjustHealthBars(maxHealth);

function writeToLog(event, value, monsterHealth, playerHealth){
    let logEntry={
        event: event,
        value: value,
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth
    };
    if (event === LOG_PLAYER_ATTACK){
        logEntry.target = 'MONSTER';      
    }else if(event === LOG_PLAYER_STRONG_ATTACK){
        logEntry.target = 'MONSTER';
    }else if(event === LOG_MONSTER_ATTACK){
        logEntry.target = 'PLAYER';
    }else if(event === LOG_PLAYER_HEAL){
        logEntry.target = 'PLAYER';
    }else if(event === LOG_BONUS_LIFE){
        logEntry.target = 'PLAYER';
    }
    battleLog.push(logEntry);
}

function reset(){
    currentMonsterHealth = maxHealth;
    currentPlayerHealth = maxHealth;
    resetGame(maxHealth);  
}

function endRound(){
    const initialPlayerHealth=currentPlayerHealth;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;
    writeToLog(LOG_MONSTER_ATTACK, playerDamage, currentMonsterHealth, currentPlayerHealth);

    if(currentPlayerHealth<=0 && hasBonusLife){
        hasBonusLife= false;
        removeBonusLife();
        currentPlayerHealth=initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth);
        alert('You get a second chance!');
        writeToLog(LOG_BONUS_LIFE, 'BONUS LIFE USED', currentMonsterHealth, initialPlayerHealth);
    }
    if(currentMonsterHealth <=0 && currentPlayerHealth > 0){
        alert('You won!');
        writeToLog(LOG_GAME_OVER, 'PLAYER WON',currentMonsterHealth, currentPlayerHealth);
        reset();
    } else if(currentPlayerHealth <=0 && currentMonsterHealth > 0){
        alert('You lost!');
        writeToLog(LOG_GAME_OVER, 'MONSTER WON',currentMonsterHealth, currentPlayerHealth);
        reset();
    } else if(currentPlayerHealth <=0 && currentMonsterHealth <=0){
        alert('You have a draw');
        writeToLog(LOG_GAME_OVER, 'DRAW',currentMonsterHealth, currentPlayerHealth);
        reset();
    } 
}

function attackMonster(attackMode){

    let damage;
    let logEvent;
    if(attackMode === MODE_ATTACK){
        damage = ATTACK_VALUE;
        logEvent= LOG_PLAYER_ATTACK;
    } else if(attackMode === MODE_STRONG_ATTACK){
        damage = STRONG_ATTACK_VALUE;
        logEvent = LOG_PLAYER_STRONG_ATTACK;
    }

    const monsterDamage = dealMonsterDamage(damage);
    currentMonsterHealth -= monsterDamage;
    writeToLog(logEvent, damage, currentMonsterHealth, currentPlayerHealth);
    endRound();

}

function attackHandler(){
    
    attackMonster(MODE_ATTACK);
    
}

function strongAttackHandler(){

    attackMonster(MODE_STRONG_ATTACK)
}
function healHandler(){
    let healValue;
    if(currentPlayerHealth>= maxHealth - HEAL_VALUE){
        healValue=maxHealth-currentPlayerHealth;
    } else{
        healValue=HEAL_VALUE;
    }
    increasePlayerHealth(healValue);
    currentPlayerHealth += healValue;
    writeToLog(LOG_PLAYER_HEAL, healValue, currentMonsterHealth, currentPlayerHealth);
    endRound();
}
let id=1;

function logHandler(){
    for(let logEntry of battleLog){
        for(const key in logEntry){
            console.log(`#${id} ${key} => ${logEntry[key]}`);
        }
        id++;
    }
}

strongAttackBtn.addEventListener('click' , strongAttackHandler);
attackBtn.addEventListener('click' , attackHandler);
healBtn.addEventListener('click',healHandler);
logBtn.addEventListener('click',logHandler);
