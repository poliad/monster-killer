const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE= 18;
const MONSTER_ATTACK_VALUE = 16;
const HEAL_VALUE = 15;


const enterdValue = prompt('Maximum life', '100');

let maxHealth = parseInt(enterdValue);

if(isNaN(maxHealth) || maxHealth <=0){
    maxHealth=100;
}
let currentMonsterHealt = maxHealth;
let currentPlayerHealt = maxHealth;
let hasBonusLife = true;

adjustHealthBars(maxHealth);

function reset(){
    currentMonsterHealt = maxHealth;
    currentPlayerHealt = maxHealth;
    resetGame(maxHealth);  
}

function endRound(){
    const initialPlayerHealth=currentPlayerHealt;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealt -= playerDamage;

    if(currentPlayerHealt<=0 && hasBonusLife){
        hasBonusLife= false;
        removeBonusLife();
        currentPlayerHealt=initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth);
        alert('You get a second chance!');
    }
    if(currentMonsterHealt <=0 && currentPlayerHealt > 0){
        alert('You won!');
        reset();
    } else if(currentPlayerHealt <=0 && currentMonsterHealt > 0){
        alert('You lost!');
        reset();
    } else if(currentPlayerHealt <=0 && currentMonsterHealt <=0){
        alert('You have a draw');
        reset();
    } 
}

function attackMonster(attackMode){

    let damage;
    if(attackMode === 'ATTACK'){
        damage = ATTACK_VALUE;
    } else if(attackMode === 'STRONG-ATTACK'){
        damage = STRONG_ATTACK_VALUE;
    }

    const monsterDamage = dealMonsterDamage(damage);
    currentMonsterHealt -= monsterDamage;
    endRound();

}

function attackHandler(){
    
    attackMonster('ATTACK');
    
}

function strongAttackHandler(){

    attackMonster('STRONG-ATTACK')

}
function healHandler(){
    let healValue;
    if(currentPlayerHealt>= maxHealth - HEAL_VALUE){
        healValue=maxHealth-currentPlayerHealt;
    } else{
        healValue=HEAL_VALUE;
    }
    increasePlayerHealth(healValue);
    currentPlayerHealt += healValue;
    endRound();
}

strongAttackBtn.addEventListener('click' , strongAttackHandler);
attackBtn.addEventListener('click' , attackHandler);
healBtn.addEventListener('click',healHandler);
