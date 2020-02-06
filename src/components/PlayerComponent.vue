<template>
  <div id="PlayerComponent">
    <div id="imgContainer">
      <table>
        <tr>
          <td>
            <b-img class="b-img" v-bind="mainProps" :src="src" rounded="circle" alt="Circle image"></b-img>
          </td>
          <td>
            <p>{{ whose.toUpperCase() }}</p>
            <p v-if="selectedNumber">Your number is {{selectedNumber}}</p>
            <p v-show="hurry">Hurry up!Pick a number!</p>
          </td>
        </tr>
      </table>
    </div>
    <div>
      <b-progress :max="15" class="progress" show-value>
        <b-progress-bar :value="timer" :variant="progressVariant"></b-progress-bar>
      </b-progress>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlayerComponent",
  props: {
    timer: {
      type: Number,
      required: true
    },
    whose: {
      type: String,
      required: true
    },
    selectedNumber: {
      type: Number,
    }
  },
  data() {
    return {
      progressVariant: "success",
      mainProps: {
        width: 75,
        height: 75,
        class: "m1"
      },
      src: null
    };
  },
  computed: {
    hurry() {
      if (this.timer < 5 && this.whose === "player" && this.timer != 0) {
        return true;
      } else {
        return false;
      }
    }
  },
  updated() {
    if (this.timer > 10) {
      this.progressVariant = "success";
    } else if (this.timer > 5) {
      this.progressVariant = "warning";
    } else {
      this.progressVariant = "danger";
    }
  },
  created() {
    if (this.whose === "computer") {
      this.src =
        "https://cdn.pixabay.com/photo/2016/03/31/19/58/avatar-1295430_960_720.png";
    } else {
      this.src =
        "https://cdn.pixabay.com/photo/2016/03/31/19/58/avatar-1295431_960_720.png";
    }
  }
};
</script>

<style scoped>
#PlayerComponent {
  margin: auto;
  width: 300px;
  height: 130px;
  border-style: solid;
  border-width: 0.5px;
  border-radius: 5px;
  padding: 5px;
  text-align: start;
  font-size: 14px;
}
#imgContainer {
  margin: 0px 0px 15px 0px;
}
/* .componentImage {
  display: inline-block;
}
.componentInfo {
  display: inline-block;
  background-color: brown;
} */
p {
  margin: 0px 0px 0px 0px;
}
</style>