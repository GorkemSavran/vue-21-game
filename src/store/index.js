import Vuex from "vuex";
import Vue from "vue";
import game from "./modules/game";

//Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
    modules:{
        game
    }
});
