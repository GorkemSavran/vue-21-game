<template>
  <div id="GameTable">
    <b-container class="boo-container">
      <b-row cols="3" class="boo-row">
        <b-col v-for="item in 21" :key="item" class="boo-col">
          <b-button
            class="boo-button"
            variant="outline-danger"
            :disabled="!gameTable.includes(item)"
            @click="isGameStarted === true ? makeMove(item) : slctNumber(item)"
          >{{ item }}</b-button>
          <div class="w-100"></div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "GameTable",
  computed: mapGetters(["gameTable", "turn", "isGameStarted", "playerNum"]),
  methods: {
    ...mapActions(["playerMakeMove", "selectNumber"]),
    makeMove(num) {
      if (this.turn === "computer") {
        console.log("Not your turn!");
      } else if (num === this.playerNum) {
        alert("You cannot choose your own number!");
      } else {
        this.playerMakeMove(num);
      }
    },
    slctNumber(num) {
      this.selectNumber(num);
    }
  }
};
</script>

<style scoped>
#GameTable {
  margin: auto;
}
.boo-container {
  /* background-color: aqua; */
  width: 250px;
}
.boo-col {
  /* border-style: solid; */
  margin-top: 10px;
}
.boo-button {
  width: 50px;
}
.boo-button:disabled {
  background-color: rgba(128, 128, 128, 0.432);
}
</style>
