new Vue({
    el: "#app",
    data:{
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns:[],
        monsterAttacks:[]
    },
    methods:{
        startGame: function(){
            this.gameIsRunning = true
            this.playerHealth = 100
            this.monsterHealth = 100
            this.turns = []
        },
        attack: function(){
            let minusMonsterHealth = this.damage(3, 10);
            this.monsterHealth -= minusMonsterHealth
            this.turns.unshift({ isPlayer: true, isHeal: false, text: `Player hits Monster for ${minusMonsterHealth}`})
            if (this.checkHealth()) {
                return;
            };
            this.monsterAttack();
        },
        specialAttack: function() {
            let minusMonsterHealth = this.damage(10, 25);
            this.monsterHealth -= minusMonsterHealth
            this.turns.unshift({ isPlayer: true, isHeal: false,text: `Player hits Monster hard for ${minusMonsterHealth}` })
            if(this.checkHealth()){
                return;
            };
            this.monsterAttack();
        },
        heal: function(){
            if(this.playerHealth <= 90){
                this.playerHealth += 10;
            }else{
                this.playerHealth = 100
            }
            this.turns.unshift({ isPlayer: true, isHeal: true, text: `Player heals for 10` })
            this.monsterAttack();
        },
        giveUp: function() {
            this.gameIsRunning = false;
        },
        damage: function (min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min)
        },
        monsterAttack: function(){
            let minusPlayerHealth = this.damage(5, 12);
            this.playerHealth -= minusPlayerHealth
            this.checkHealth();
            this.turns.unshift({ isPlayer: false, isHeal: false, text: `Monster hits Player for ${minusPlayerHealth}` })
        },
        checkHealth: function(){
            if (this.monsterHealth <= 0) {
                if (confirm('you won! New Game?')){
                    this.startGame();
                }else{
                    this.gameIsRunning = false;
                }
                return true;
            } else if (this.playerHealth <= 0){
                if (confirm('you lost :( New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        }
    }
});