<template>
  <div id="app">
    <div class="header">
      <h2>
        <vue-fontawesome icon="list"></vue-fontawesome>
        &nbsp; Todo List App using Vue JS
      </h2>
      <div class="todo-input">
        <form @submit.prevent="handleSubmit">
          <input class="form-control" type="text" v-model="enteredValue" />
          <button class="btn btn-primary" type="submit">Submit</button>
        </form>
      </div>
    </div>
    <div class="todolist">
      <div
        :class="{ card: true, completed: todo.complete }"
        v-for="(todo, index) in todoList"
        :key="index"
      >
        <div class="list">{{ todo.task }}</div>
        <button
          class="btn-action"
          title="Complete"
          @click="completedTask(todo.id)"
        >
          <vue-fontawesome icon="check"></vue-fontawesome>
        </button>
        <button
          class="btn-action"
          title="Edit"
          @click="!todo.complete ? editTask(todo.id) : null"
        >
          <vue-fontawesome icon="edit"></vue-fontawesome>
        </button>
        <button
          class="btn-action"
          title="Delete"
          @click="!todo.complete ? deleteTask(todo.id) : null"
        >
          <vue-fontawesome icon="trash"></vue-fontawesome>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { v1 as uuidv1 } from "uuid";
import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      enteredValue: "",
      id: null,
    };
  },
  methods: {
    ...mapMutations({
      setTodoList: "setTodolist",
    }),
    handleSubmit() {
      if (this.enteredValue) {
        //= validation
        const isValid = this.validationData();
        if (!isValid) {
          return;
        }
        if (!this.id) {
          this.addData();
        } else {
          this.updateData(this.id);
        }
      } else {
        this.$swal("warning", "please fill in the todo item!", "OK");
      }
      this.id = null;
      this.enteredValue = "";
    },
    validationData() {
      const findData = this.todoList.find(
        (item) => item.task === this.enteredValue
      );
      if (findData) {
        this.$swal("warning", "item todo is exist !", "OK");
        return false;
      }
      return true;
    },
    addData() {
      const newTask = {
        id: uuidv1(),
        task: this.enteredValue,
        complete: false,
      };

      this.todoList.push(newTask);
      this.orderData(this.todoList);
    },
    updateData(activeId) {
      const updateTodolist = this.todoList.map((todo) => {
        if (todo.id === activeId) {
          return {
            ...todo,
            task: this.enteredValue,
          };
        }
        return todo;
      });
      this.setTodoList(updateTodolist);
    },
    orderData(dataTodolist) {
      let taskPending = [];
      let taskComplete = [];
      let newTodoList = [];

      dataTodolist.forEach((item) => {
        if (!item.complete) {
          taskPending = [...taskPending, item];
        } else {
          taskComplete = [...taskComplete, item];
        }
      });

      newTodoList = [...taskPending, ...taskComplete];
      this.setTodoList(newTodoList);
    },
    completedTask(activeId) {
      const updateTodolist = this.todoList.map((todo) => {
        if (todo.id === activeId) {
          return {
            ...todo,
            complete: !todo.complete,
          };
        }
        return todo;
      });
      this.orderData(updateTodolist);
    },
    editTask(activeId) {
      const findData = this.todoList.find((item) => item.id === activeId);
      this.id = findData.id;
      this.enteredValue = findData.task;
    },
    deleteTask(activeId) {
      this.$swal
        .fire({
          title: "Are you sure?",
          text: "Delete this Data ?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            const list = this.todoList.filter((task) => {
              return task.id !== activeId;
            });
            this.setTodoList(list);
            this.$swal("Deleted!", "Data has been deleted.", "success");
          }
        });
    },
  },
  computed: {
    ...mapGetters({
      todoList: "getTodolist",
    }),
  },
};
</script>

<style>
@import "./assets/global.css";
</style>
