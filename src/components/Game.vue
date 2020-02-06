<template>
  <div id="Game">
    <h1 v-if="playerNum === null">Select A Number And Game Will Start...</h1>
    <PlayerComponent v-if="playerNum != null" :timer="computerTimer" whose="computer"></PlayerComponent>
    <GameTable
      id="GameTable"
      :gameTable="gameTable"
      :turn="turn"
      :selectedNumber="playerNum"
      @make-move="makeMove"
      @select-number="selectNumber"
    ></GameTable>
    <PlayerComponent
      v-if="playerNum != null"
      :timer="playerTimer"
      whose="player"
      :selectedNumber="playerNum"
    ></PlayerComponent>
  </div>
</template>

<script>
import GameTable from "./GameTable";
import PlayerComponent from "./PlayerComponent";
export default {
  name: "Game",
  components: {
    GameTable,
    PlayerComponent
  },
  data() {
    return {
      gameTable: [],
      playerNum: null,
      computerNum: null,
      playerTimer: 0,
      computerTimer: 0,
      turn: "computer",
      interval: null
    };
  },
  methods: {
    selectNumber(num) {
      this.playerNum = num;
      this.computerNum = Math.floor(Math.random() * 21) + 1;
      console.log("Computer select: " + this.computerNum);
      //start game by set timer
      this.setTimer();
    },
    makeMove(num) {
      if (this.turn === "computer") {
        if (num === this.playerNum) {
          alert("You won!Computer selected your number!");
          this.restartGame();
          return;
        } else {
          let idx = this.gameTable.findIndex(number => number === num);
          this.gameTable.splice(idx, 1);
          this.turn = "player";
          this.setTimer();
        }
      } else {
        if (num === this.computerNum) {
          alert("You lost!You chose computer's number!");
          this.restartGame();
        } else {
          let idx = this.gameTable.findIndex(number => number === num);
          this.gameTable.splice(idx, 1);
          this.turn = "computer";
          this.setComputerMove();
          this.setTimer();
        }
      }
    },
    setComputerMove() {
      //random seconds later
      //computer will make move
      let selectableNums = this.gameTable.filter(e => e != this.computerNum);
      if (selectableNums.length === 0) {
        alert("You won!Computer selected your number!");
        this.restartGame();
        return;
      }
      console.log(selectableNums);
      setTimeout(() => {
        let rndIdx = Math.floor(Math.random() * selectableNums.length) + 1;
        let rndNum = selectableNums[rndIdx];
        console.log("Computer selected: " + rndNum);
        this.makeMove(rndNum);
      }, Math.floor(Math.random() * 5000));
    },
    setTimer() {
      //first reset timers
      clearInterval(this.interval);
      this.computerTimer = 0;
      this.playerTimer = 0;
      if (this.turn === "computer") {
        this.computerTimer = 15;
        this.interval = setInterval(() => {
          if (this.computerTimer <= 0.1) {
            clearInterval(this.interval);
          } else {
            this.computerTimer -= 0.1;
          }
        }, 100);
      } else {
        this.playerTimer = 15;
        this.interval = setInterval(() => {
          if (this.playerTimer <= 0.1) {
            clearInterval(this.interval);
            alert("Time is out!");
            this.restartGame();
          } else {
            this.playerTimer -= 0.1;
          }
        }, 100);
      }
    },
    restartGame() {
      location.reload();
    }
  },
  watch: {
    playerNum() {
      //when we select our number, game will be started
      //so just once call setComputerMove
      if (this.playerNum != null) {
        this.setComputerMove();
      }
    }
  },
  created() {
    //create game table
    for (let index = 0; index < 21; index++) {
      this.gameTable.push(index + 1);
    }
  }
};
</script>

<style scoped>
#Game {
  width: auto;
  margin: auto;
  height: auto;
  text-align: center;
}
#GameTable {
  margin: 15px 0px 15px 0px;
}
</style>