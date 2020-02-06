<template>
  <div id="GameTable">
    <b-container class="boo-container">
      <b-row cols="3" class="boo-row">
        <b-col v-for="item in 21" :key="item" class="boo-col">
          <b-button
            class="boo-button"
            variant="outline-danger"
            :disabled="!gameTable.includes(item)"
            @click="selectedNumber != null ? makeMove(item) : selectNumber(item)"
          >{{ item }}</b-button>
          <div class="w-100"></div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "GameTable",
  props: {
    gameTable: {
      type: Array,
      required: true
    },
    selectedNumber: {
      type: Number
    },
    turn: {
      type: String
    }
  },
  methods: {
    makeMove(item) {
      if (this.selectedNumber === item) {
        alert("You cannot chose your selected number!");
      } else if (this.turn != "computer") {
        this.$emit("make-move", item);
      }
    },
    selectNumber(num) {
      this.$emit("select-number", num);
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
