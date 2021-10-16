<template>
  <form @submit="onSubmit" >
      <input type="text" placeholder="Add something..." v-model="title">
      <input type="submit" value="Add">
  </form>
</template>

<script>
import {mapActions} from "vuex"
import {uuid} from "vue-uuid"
export default {
name: "TodoAdd",
data: function(){
    return {
        title: '',
    }
},
methods: {...mapActions(['addNewItem']),
onSubmit: function(e){
e.preventDefault()
this.addNewItem({
    id:uuid.v1(),
    title: this.title,
    completed: false
})
this.title = ''
}
}
}
</script>

<style>

</style>