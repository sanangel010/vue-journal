// Son sincronas y hacen la modificación del state.
// el state es reactivo y cuando cambie se van a notificar a todos los componenetes
// que esten escuchando o varios lugares.
// Para que una action cambie el state hay que comprometerce o hacer un commit de una mutación

export const setEntries =  (  state, entries  ) => {

    // Se desestructura el state.entries actual y se esparecen las nuevas entradas, 
    // se crea un nuevo arreglo con los valores actuales y los anteriores.
    //                   ACTUALES         NUEVAS 
    state.entries = [...state.entries, ...entries]

    // Aqui ya se puede establecer por que ya se obtuvo la información.
    state.isLoading = false
}
//                             Viejo  -  Actualizado   
export const updateEntry =  ( state, entry ) => {
    // Se busca el objeto que se ha enviado a actualizar, para obtener el que va a sufrir cambios.
    const idx = state.entries.map( e => e.id ).indexOf(entry.id)

    // Con esta modificación del state avisa que existio una modificación y actualiza la información
    // del state para que se vena reflejados los cambios en las pantallas que consuman info del state.
    state.entries[idx] = entry
}


export const addEntry =  ( state, entry ) => {
    // state -> entries  -> la nueva entrada debe ser la primera.
    state.entries = [ entry, ...state.entries ]
}

export const deleteEntry = ( state, id ) => {
    
    // Se remueve del state el elemento que coincida con el ID.
    state.entries = state.entries.filter( entry => entry.id !== id )
}