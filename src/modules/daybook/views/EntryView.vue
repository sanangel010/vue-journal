<template>

<template v-if="entry">
    <div 
        class="entry-title d-flex justify-content-between p-2">
            
            <div>
                <span class="text-success fs-3 fw-bold"> {{ day }} </span>
                <span class="mx-1 fs-3">{{ month }}</span>
                <span class="mx-2 fs-4 fw-light">{{ yearDay }}</span>
            </div>

            <div>

                <input type="file"                    
                    @change="onselectedImage"
                    ref="imageSelector"
                    v-show="false"
                    accept="image/png, image/jpeg"
                >

                <button 
                    v-if="entry.id"
                    @click="onDeleteEntry"                
                    class="btn btn-danger mx-2">
                    Borrar
                    <i class="fa fa-trash-alt"></i>
                </button>

                <button class="btn btn-primary"
                    @click="onselectImage">
                    Subir foto
                    <i class="fa fa-upload"></i>
                </button>
            </div>

    </div>
    <hr>
    <div 
        class="d-flex flex-column px-3 h-75">
        <textarea 
            v-model="entry.text"
            placeholder="¿ Qué sucedió hoy ?">
        </textarea>
    </div>

    <!-- <img 
    src="https://scontent.fmex15-1.fna.fbcdn.net/v/t31.18172-8/18077310_1671357592877662_1769865196671142586_o.jpg?stp=cp0_dst-jpg_e15_p320x320_q65&_nc_cat=109&ccb=1-7&_nc_sid=2d5d41&_nc_ohc=2pF-Gb8vl5kAX-6a7Co&_nc_ht=scontent.fmex15-1.fna&oh=00_AfAq5NtiRcR-u-EjtdeO__yuuVkKFPhMzZX7QelXHi8JTg&oe=638F9C32" 
    alt="entry-picture"
    class="img-thumbnail"
    > -->

    <img 
        v-if="entry.picture && !localImage"
        :src="entry.picture" 
        alt="entry-picture"
        class="img-thumbnail">

    <img 
        v-if="localImage"
        :src="localImage" 
        alt="entry-picture"
        class="img-thumbnail">

</template>

  <!-- Botón de + para agregar la entrada -->
  <Fab 
    icon="fa-save"    
    @on:click="saveEntry"
  />


</template>

<script>
/* IMPORTS ZONE */
import { defineAsyncComponent } from 'vue'
import { mapGetters, mapActions } from 'vuex' // Computada

// Se importa: sweetalert2 que maneja mensajes de alerta chulos.
import Swal from 'sweetalert2'

// No lleva llaves debido a que solo existe un elemento que importar.
import getDayMonthYear from '../helpers/getDayMonthYear'
import uploadImage from '../helpers/uploadImage'


        export default {
            props: {
                id: {
                    type: String,
                    required: true
                }
            },
            components: {
                Fab: defineAsyncComponent( () => import('../components/Fab.vue'))
            },

            data() {
                return {
                    // Entrada reactiva
                    entry: null,
                    localImage: null,
                    fileToUpload: null
                }
            },

            // Se obtienen los getters mediante una propiedad computada.
            computed: {
                ...mapGetters('journal', ['getEntryById']),  
                                
                // Se obtienen los datos de las fechas resultados de la refactorización.
                // vienen del ayudador: helpers/getDayMonthYear.js
                 day() {
                     const { day } = getDayMonthYear( this.entry.date )
                     return day
                 },
                 month() {
                    const { month } = getDayMonthYear( this.entry.date )
                    return month
                },
                 yearDay() {
                    const { yearDay } = getDayMonthYear( this.entry.date )
                    return yearDay
                }
                
            },

            methods: {
                ...mapActions('journal', ['updateEntry','createEntry','deleteEntry']),

                loadEntry() {
                    
                    let entry;

                    // Si se encuentra la entrada con id new, significa que se viene de la pantalla
                    // para el registro de entrada nueva, en caso contrario se re.
                    if( this.id === 'new' ) {
                        // Se genera unanueva entrada con datos vacios para proceder a la creación de la misma.
                        entry = {
                            text: '',
                            date: new Date().getTime()
                        }
                    }
                    else{
                        // Es posible traer la función: this.getEntryById
                        // Entrada que se esta leyendo
                        entry = this.getEntryById( this.id )

                        // Para sacar al usuario en caso de no tener valor se redirecciona al router.
                        if(!entry) 
                            return this.$router.push({ name: 'no-entry' })
                    }

                    // Pero si existe se asigna el valor del Get
                    this.entry = entry
                },

                async saveEntry() {

                    // Configuración de los mensajes personalizados.
                    new Swal({
                        title: 'Espere por favor',
                        allowOutsideClick: false
                    })
                    Swal.showLoading()

                    
                    // Se hace el guardado de la imagen en cloudinary
                    const picture  = await uploadImage( this.fileToUpload )

                    // Se manda a guardar en la bd la ur de la imagen.
                    this.entry.picture = picture

                    // En caso de que tenga valor quiere decir que se debe actualizar la entrada.
                    if( this.entry.id )
                    {
                        // Action del journal module
                       await this.updateEntry(this.entry)

                    } else { // En caso contrario se debera crear una nueva entrada.
                        
                        // Crear una nueva entrada
                        const id = await this.createEntry(this.entry)

                        // Se redirecciona a la pagina de la entrada con el parametro id, en virtud que ya
                        // ha persistido en la bd.
                        this.$router.push({ name: 'entry', params: { id } })                        
                    }

                    this.fileToUpload = null

                    // Mensaje de configuración.
                    Swal.fire('Guardado', 'Entrada registrada con éxito','success')

                },

                async onDeleteEntry(){

                    // Se configura el mensaje con sweet alert.
                    const { isConfirmed } = await Swal.fire({
                        title: '¿Está seguro?',
                        text: 'Una vez borrado, no se puede recuperar',
                        showDenyButton: true,
                        confirmButtonText: 'Si, estoy seguro'
                    })
                    
                    // El objeto que retorna muestra información referente a la respuesta
                    // seleccionada por el usuario.
                    if( isConfirmed ){
                        new Swal({
                            title: 'Expere por favor',
                            allowOutsideClick: false
                        })
                        Swal.showLoading()

                        // Elimina la nueva entrada
                        await this.deleteEntry(this.entry.id)

                        // Se redirecciona a la pagina de la entrada con el parametro id, en virtud que ya
                        // ha persistido en la bd.
                        this.$router.push({ name: 'no-entry' })

                        // Mensaje de configuración.
                        Swal.fire('Eliminado', '','success')
                    }
                    
                },

                onselectedImage( event ){
                    const file = event.target.files[0]

                    if( !file ){
                        // Si se abre la imagen y se cancela se eliminara la imagen.
                        this.localImage = null
                        this.fileToUpload = null
                        return
                    }

                    // Se asigna el archivo seleccionado 
                    this.fileToUpload = file

                    // Procedimiento para leer la imagen y cargarla en la pantalla.
                    const fr = new FileReader()
                    fr.onload = () => this.localImage = fr.result
                    fr.readAsDataURL( file )
                },

                onselectImage() {
                    this.$refs.imageSelector.click()
                }

            },

            created() {
                this.loadEntry()
            },

            watch: {
                // Se tiene el id debido a que ya se declaro en el props y con ello es posible ver 
                // el valor acutual de id y el valor anterior.
                id() {
                    this.loadEntry()
                }
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