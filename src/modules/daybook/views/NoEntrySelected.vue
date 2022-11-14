<template>
  
  <div class="d-flex justify-content-center">    
    <div>
    <img  
    height="400" 
    width="500" 
    src="https://media1.giphy.com/media/9J7tdYltWyXIY/giphy.gif?cid=790b7611ede248f2b86067e54c5dbaa9175101f21f8d30a1&rid=giphy.gif&ct=g" 
    alt="oouch">  
    <h1 class="align-self-center">No hay nada seleccionado..</h1>        
</div>
  </div>


  <!-- Botón para agregar. -->
  <Fab
    @on:click="createNewEntry"
   />

</template>

<script>
    import { defineAsyncComponent } from 'vue'

    export default ({
        components: {
            Fab: defineAsyncComponent( () => import('../components/Fab.vue') )
        },

        methods: {
            createNewEntry() {
                this.$router.push( { name: 'entry', params: { id: 'new' } } )
            }
        }
        
    })
</script>


<style lang="scss" scoped>
    div {
        height: 100%;
    }
</style>