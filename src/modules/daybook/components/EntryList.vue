<template>
  <div class="entry-list-container">
    <div class="px-2 pt-2">
        <input 
            type="text"
            class="form-control"
            placeholder="Buscar entrada"
            v-model="term"
        />
    </div>

    <div class="mt-2 d-flex fñex-column">
        <button class="btn btn-primary mx-3"
            @click="$router.push({ name: 'entry', params: { id: 'new' } })"
        >
            <i class="fa fa-plus-circle">
                Nueva entrada
            </i>
        </button>
    </div>

    <div class="entry-scrollarea">
        <Entry
            v-for="entry in entriesByTerm"
            :key="entry.id"
            :entry="entry"
        />
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { defineAsyncComponent } from 'vue'

export default {
    components:{
        Entry: defineAsyncComponent( () => import('./Entry.vue') )
    },
    // Se obtienen los getters mediante una propiedad computada.
    computed: {
        ...mapGetters('journal', ['getEntriesByTerm']),
        entriesByTerm() {
            return this.getEntriesByTerm( this.term )
        }
    },
    // Para leer la info de los getters
    data() {
        return {
            // Termino de busqueda
            term: ''
        }
    }
}
</script>

<style lang="scss" scoped>
    .entry-list-container {
        border-right: 1px solid #2c3e50;
        height: calc(100vh - 56px);
    }

    .entry-scrollarea {
        height: calc(100vh - 110px);
        overflow:scroll;
    }
</style>