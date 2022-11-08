<template>
  <div class="entry-title d-flex justify-content-between p-2">
        
        <div>
            <span class="text-success fs-3 fw-bold">15</span>
            <span class="mx-1 fs-3">Julio</span>
            <span class="mx-2 fs-4 fw-light">15</span>
        </div>

        <div>
            <button class="btn btn-danger mx-2">
                Borrar
                <i class="fa fa-trash-alt"></i>
            </button>

            <button class="btn btn-primary">
                Subir foto
                <i class="fa fa-upload"></i>
            </button>
        </div>

  </div>

  <hr>

  <div class="d-flex flex-column px-3 h-75">
    <textarea placeholder="¿ Qué sucedió hoy ?"></textarea>
  </div>

  <!-- Botón de + para agyregar la entrada -->
  <Fab 
    icon="fa-save"
  />

  <img 
  src="https://scontent.fmex15-1.fna.fbcdn.net/v/t31.18172-8/18077310_1671357592877662_1769865196671142586_o.jpg?stp=cp0_dst-jpg_e15_p320x320_q65&_nc_cat=109&ccb=1-7&_nc_sid=2d5d41&_nc_ohc=2pF-Gb8vl5kAX-6a7Co&_nc_ht=scontent.fmex15-1.fna&oh=00_AfAq5NtiRcR-u-EjtdeO__yuuVkKFPhMzZX7QelXHi8JTg&oe=638F9C32" 
  alt="entry-picture"
  class="img-thumbnail"
  >

</template>

<script>
    import { defineAsyncComponent } from 'vue'
        export default {
            components: {
                Fab: defineAsyncComponent( () => import('../components/Fab.vue'))
            }
        }
</script>

<style lang="scss" scoped>
    textarea {
        font-size: 20px;
        border: none;
        height: 100px;

        &:focus {
            outline: none;
        }
    }

    img {
        width: 200px;
        position: fixed;
        bottom: 150px;
        right: 20px;
        box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);
    }

</style>