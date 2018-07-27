new Vue({
    el: '#app',
    data: {
        playerHealth: 80,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame: function () {
            this.gameIsRunning = true;
            this.playerHealth = 80;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack: function () {
            var damage = this.calculateDamage(4, 9);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: '지수의 콩을 향한 사랑의 볼터치 ~~ (' + damage + ' 데미지)'
            });
            if (this.checkWin()) {
                return;
            }

            this.monsterAttacks();
        },
        specialAttack: function () {
            var damage = this.calculateDamage(1, 15);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: '★★★★★ 지수의 콩을 향한 스페셜 어택 ~~(' + damage + ' 데미지) ★★★★★'
            });
            if (this.checkWin()) {
                return;
            }
            this.monsterAttacks();
        },
        heal: function () {
            if (this.playerHealth <= 90) {
                this.playerHealth += 8;
            }
            this.turns.unshift({
                isPlayer: true,
                text: '얍삽보이 지수는 선두를 먹고 8의 체력을 회복했따'
            })
            this.monsterAttacks();
        },
        giveUp: function () {
            this.gameIsRunning = false;
        },
        monsterAttacks: function () {
            var damage = this.calculateDamage(5, 10);
            this.playerHealth -= damage;
            this.checkWin();
            this.turns.unshift({
                isPlayer: false,
                text: 'Kong the Princess의 가학적 공격 ~~(' + damage + ' 데미지)'
            });
        },
        calculateDamage: function (min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin: function () {
            if (this.monsterHealth <= 0) {
                if (confirm('더 지수 승리! 한겜더 콜? ')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            } else if (this.playerHealth <= 0) {
                if (confirm('당신은 Kong the princess에게 산산조각 났다. 리겜 콜?')) {
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
