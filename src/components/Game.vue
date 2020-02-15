<template>
  <div id="Game">
    <h1 v-if="!isGameStarted">Select A Number And Game Will Start...</h1>
    <PlayerComponent v-if="isGameStarted" compId="computer"></PlayerComponent>
    <GameTable id="GameTable"></GameTable>
    <PlayerComponent v-if="isGameStarted" compId="player"></PlayerComponent>
  </div>
</template>

<script>
import GameTable from "./GameTable";
import PlayerComponent from "./PlayerComponent";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Game",
  components: {
    GameTable,
    PlayerComponent
  },
  computed: mapGetters(["isGameStarted", "turn","computerNum","playerNum"]),
  watch: {
    turn(newVal) {
      console.log("Turn: " + newVal);
      if (newVal === "computer") {
        let rndSec = Math.floor(Math.random() * 3000);
        console.log(rndSec + " seconds later computer will make move");
        setTimeout(() => {
          this.computerMakeMove();
        }, rndSec);
      }
    }
  },
  methods: {
    ...mapActions(["setTimer", "computerMakeMove"])
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