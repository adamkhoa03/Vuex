import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"
Vue.use(Vuex);

const storeData = {
  state: {
    todos: [],
    auth: {
        isAuthenticated: false
    }
  },
  getters: {
    doneTodos: state => {
      return  state.todos.filter(todo=>todo.completed)
    },
    isAuthenticated: state =>{
        return state.auth.isAuthenticated
    },
    progress: (state, getters)=>{
        return Math.round(getters.doneTodos.length/state.todos.length*100)
    }
  },
  mutations: {
      TOGGLE_AUTH(state){
       return state.auth.isAuthenticated = !state.auth.isAuthenticated
      },
      TODO_COMPLETE: (state,id)=>{
          return state.todos.map(todo=>{
              if(todo.id === id){
                  todo.completed = !todo.completed
              }
          })
      },
      TODO_DELETED: (state, id)=>{
          state.todos = state.todos.filter(todo=>todo.id != id)
      },
      NEW_ITEM: (state, data)=>{
          state.todos.unshift(data)
      },
      GET_TODOS: (state, response)=>{
          state.todos = response.data
      }
  },
  actions: {
      deleteTodo: async function(context,id){
         try {
            await axios.delete('https://jsonplaceholder.typicode.com/todos/'+id)
            return context.commit('TODO_DELETED',id)
         } catch (error) {
             console.log(error)
         }
      },
      loginLogout: function({commit}){
          return commit('TOGGLE_AUTH')
      },
      addNewItem: async function(context, data){
         try {
            await axios.post('https://jsonplaceholder.typicode.com/todos/', data)
            return context.commit('NEW_ITEM', data)
         } catch (error) {
             console.log(error)
         }
      },
      getTodo: async function({commit}){
          try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/todos/?_limit=5')
            return commit('GET_TODOS', response)
          } catch (error) {
              console.log(error)
          }
      },
      changeCompleted: async function(context, id){
          context.commit('TODO_COMPLETE', id)
      }
  }
};

const store = new Vuex.Store(storeData);
export default store;
