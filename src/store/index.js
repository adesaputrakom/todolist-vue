import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // data bersifat global (global state)
    todoList: [],
  },
  getters: {
    // mengambil state ke component
    getTodolist(state) {
      return state.todoList;
    },
  },
  mutations: {
    // memodifkasi state
    setTodolist(state, data) {
      state.todoList = data;
    },
  },
  actions: {
    // fetching api
  },
  modules: {
    // membuat modul vuex berdasarkan pengelompokan
  },
});
