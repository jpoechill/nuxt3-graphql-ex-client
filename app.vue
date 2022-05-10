<template>
  <div>
    <div class="container mx-auto">
      <br><br>

      <!-- {{ (data && data.todos) || '' }} -->

      <div v-if="data && data.todos">
        <div v-for="todo in data.todos" :key="todo.id">
          <input type="checkbox" class="mr-2" :id="todo.id" :value="todo.id" v-model="checkedIds">{{ todo.id }} | {{ todo.text }} | {{ todo.completed }}
        </div>
      </div>

      <br><br>
      Todo: <br>
      <input type="text" v-model="newTodoTitle" class="rounded border-2"><br>
      <button @click="makeTodo()" class="border-solid px-3 border-2 border-indigo-600 w-48">Add Todo</button>
      <br>
      <button @click="removeAllTodos()" class="border-solid px-3 border-2 border-indigo-600 w-48">Remove Todos</button> <br><br>
      <!-- <button @click="removeAllTodos('title')" class="border-solid px-3 border-2 border-indigo-600 w-48">Clear All</button> -->

    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { useQuery, useMutation } from '@urql/vue';
import './assets/css/tailwind.css'

export default defineComponent({
  data () {
    return {
      cat: 'dog',
      newTodoTitle: '',
      checkedIds: []
    }
  },
  async setup() {
    const result = useQuery({
      query: `
        query Todos {
          todos {
            id
            text
            completed
          }
        }
      `
    });

    const updateTodoResult = useMutation(`
      mutation ($text: String!) {
        createTodo (text: $text)
      }
    `);

    const removeAllTodo = useMutation(`
      mutation ($id: String!) {
        removeTodo (id: $id)
      }
    `);

    return {
      removeAllTodos() {
        console.log(this.checkedIds.toString())
        const variables = { id: this.checkedIds.toString() };
        
        removeAllTodo.executeMutation(variables).then(result => {
          this.refresh()
          this.checkedIds = []
        });
      },
      makeTodo(title) {
        const variables = { text: this.newTodoTitle || '' };
        updateTodoResult.executeMutation(variables).then(result => {
          this.refresh()
          this.newTodoTitle = ''
        });
      },
      refresh() {
        result.executeQuery({
          requestPolicy: 'network-only',
        });
      },
      fetching: result.fetching,
      data: result.data,
      error: result.error,
    };
  },
})
</script>

