const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE= 17;
const MONSTER_ATTACK_VALUE = 14;

let maxHealth = 100;
let currentMonsterHealt = maxHealth;
let currentPlayerHealt = maxHealth;

adjustHealthBars(maxHealth);

function attackMonster(attackMode){

    let damage;
    if(attackMode === 'ATTACK'){
        damage = ATTACK_VALUE;
    } else if(attackMode === 'STRONG-ATTACK'){
        damage = STRONG_ATTACK_VALUE;
    }

    const monsterDamage = dealMonsterDamage(damage);
    currentMonsterHealt -= monsterDamage;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealt -= playerDamage;

    if(currentMonsterHealt <=0 && currentPlayerHealt > 0){
        alert('You won!');
    } else if(currentPlayerHealt <=0 && currentMonsterHealt > 0){
        alert('You lost!');
    } else if(currentPlayerHealt <=0 && currentMonsterHealt <=0){
        alert('You have a draw');
    }
}

function attackHandler(){
    
    attackMonster('ATTACK');
    
}

function strongAttackHandler(){

    attackMonster('STRONG-ATTACK')

}

strongAttackBtn.addEventListener('click' , strongAttackHandler);
attackBtn.addEventListener('click' , attackHandler);
