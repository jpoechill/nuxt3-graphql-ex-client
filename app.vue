<template>
  <div>
    <br><br>

    <!-- {{ (data && data.todos) || '' }} -->

    <div v-if="data && data.todos">
      <div v-for="(todo, index) in data.todos" :key="index">
        {{ todo }}
      </div>
    </div>
    <!-- <div v-if="data">
      <div v-for="(todo, index) in data.todos" :key="index">
        {{ todo }}
      </div>
    </div> -->
      <!-- <div v-for="(todo, index) in data.todos" :key="index">
        'cat'
      </div> -->

    <br><br>

    <!-- <button @click="refresh()" class="border-solid px-3 border-2 border-indigo-600 w-48">Get Data</button> -->
    <button @click="makeTodo('this is a title')" class="border-solid px-3 border-2 border-indigo-600 w-48">Add Todo</button>
    <button @click="removeAllTodos('title')" class="border-solid px-3 border-2 border-indigo-600 w-48">Clear All</button>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { useQuery, useMutation } from '@urql/vue';
import './assets/css/tailwind.css'

export default defineComponent({
  data () {
    return {
      cat: 'dog'
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

    const removeTodo = useMutation(`
      mutation ($id: String!) {
        removeTodo (id: $id)
      }
    `);

    return {
      removeAllTodos(title) {
        const variables = { id: title || '' };
        
        removeTodo.executeMutation(variables).then(result => {
          this.refresh()
        });
      },
      makeTodo(title) {
        const variables = { text: title || '' };
        updateTodoResult.executeMutation(variables).then(result => {
          this.refresh()
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

