<template>
    <div 
        class="entry-container mb-3 pointer p-2"
        @click="$router.push({ name: 'entry', params: { id: entry.id } })"
    >
        <!-- Title -->
        <div class="entry-title d-flex">
            <span class="text-success fs-5">{{ day }}</span>
            <span class="mx-1 fs-5">{{ month }}</span>
            <span class="mx-2 fw-light">{{ yearDay }}</span>
        </div>

        <div class="entry-description">
            {{ shortText }}
        </div>
    </div>
</template>

<script>

const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio','Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
const days   = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado']

export default {
    // Para obtener los datos de cada entrada se utiliza un props.
    props: {
        entry: {
            type: Object,
            required: true
        }
    },

    // Es posible pasar el valor de la entrada/entry directo al div del: entry-description
    // de la siguiente manera {{ entry.text }}, sin embargo se usara la siguiente propiedad
    // computada para realziar un manejo de corte de texto para que no se desborde.
    computed: {
        shortText() {
            return (this.entry.text.length > 130) 
            ? this.entry.text.substring(0, 130) + ' ...'
            : this.entry.text
        },
        day() {
            const date = new Date ( this.entry.date )
            return date.getDate()
        },
        month() {
            const date = new Date ( this.entry.date )
            return months[ date.getMonth() ]
        },
        yearDay() {
            const date = new Date ( this.entry.date )
            return `${ date.getFullYear() }, ${ days[ date.getDay() ] }`
        }
    }
}
</script>

<style lang="scss" scoped>
    .entry-container {
        border-bottom: 1px solid #2c3e50;
        transition: 0.2s all ease-in;

        &:hover {
            background-color: lighten($color: grey, $amount: 45);
            transition: 0.2s all ease-in;
        }

    }

    .entry-description {
        font-size: 12px;
    }
</style>