
const state = {
    gameTable: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
    isGameStarted: false,
    computerNum: null,
    playerNum: null,
    turn: "player",
    remaining: 15,
    timerInterval: null
}

const getters = {
    gameTable: (state) => state.gameTable,
    playerNum: (state) => state.playerNum,
    computerNum: (state) => state.computerNum,
    remaining: (state) => state.remaining,
    turn: (state) => state.turn,
    isGameStarted: (state) => state.isGameStarted
}

const actions = {
    selectNumber({ commit }, num) {
        commit("selectNumber", num);
    },
    playerMakeMove({ commit, dispatch }, num) {
        commit("playerMakeMove", num);
        dispatch("setTimer");
    },
    computerMakeMove({ commit, dispatch }) {
        commit("computerMakeMove");
        dispatch("setTimer");
    },
    setTimer({ commit }) {
        commit("setTimer")
    }
}

const mutations = {
    selectNumber(state, num) {
        state.playerNum = num;//player selected
        let computerSelectable = state.gameTable.filter(n => n !== num);
        let rndIdx = Math.floor(Math.random() * 21);
        state.computerNum = computerSelectable[rndIdx];//computer selected
        state.isGameStarted = true;//game is started
        mutations.setTimer();
    },
    playerMakeMove(state, num) {
        if (num === state.computerNum) {
            mutations.clearTimerInterval();
            alert("You lost!You selected computer's number!");
            mutations.restartGame();
        } else {
            let idx = state.gameTable.findIndex(v => v === num);
            state.gameTable.splice(idx, 1);
            clearInterval(state.timerInterval);
            state.timerInterval = null;
            state.remaining = 15;
            state.turn = "computer";
        }
    },
    computerMakeMove(state) {
        let computerSelectable = state.gameTable.filter(n => n !== state.computerNum);
        console.log("Computer can only selects these number: " + computerSelectable);
        let rndIdx = Math.floor(Math.random() * computerSelectable.length);
        let selectedNum = computerSelectable[rndIdx];
        console.log("Computers choice: " + selectedNum);
        if (selectedNum === state.playerNum) {
            mutations.clearTimerInterval();
            alert("You won!Computer selected your number!");
            mutations.restartGame();
        } else {
            let idx = state.gameTable.findIndex(v => v === selectedNum);
            state.gameTable.splice(idx, 1);
            clearInterval(state.timerInterval);
            state.timerInterval = null;
            state.remaining = 15;
            state.turn = "player";
        }

    },
    setTimer() {
        state.timerInterval = setInterval(() => {
            state.remaining -= 0.1
            if (state.remaining <= 0.1) {
                if (state.turn === "computer") {
                    mutations.clearTimerInterval();
                    alert("You won!Computer's time is up!");
                    mutations.restartGame();
                } else if (state.turn === "player") {
                    mutations.clearTimerInterval();
                    alert("You lost!Your time is up!");
                    mutations.restartGame();
                }
            }
        }, 100);
    },
    clearTimerInterval() {
        clearInterval(state.timerInterval);
        state.timerInterval = null;
    },
    restartGame() {
        location.reload();
    },

}

export default {
    state,
    getters,
    actions,
    mutations
}