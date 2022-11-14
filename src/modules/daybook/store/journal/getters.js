// Para traer información del state.
// Forma rapida de leer el state.

// Se hace un pequeño truco para que la función retorne otra función
// para poder hacer el envío de parametro term.
export const getEntriesByTerm =  ( state ) => ( term = '' ) => {
    // Se trabaja la logica del filtrado, si el termino es 0, se envía todo
    // el listado ya que no existe termino de busqueda
    if( term.length === 0  ) return state.entries

    // Regresa todas las entradas que coincidan con el termino de busqueda. 
    return state.entries
            .filter( entry => entry.text
                        .toLowerCase()
                        .includes( term.toLocaleLowerCase() ) )
}

export const getEntryById = ( state ) => ( id = '' ) => {    
    // Si se regresara solo: state
    // eso provocaría que el state se etaría modificando asi que se implementa 
    // desestructurando el state
    const entry = state.entries.find( entry => entry.id === id )

    if( !entry ) return 
    return { ...entry }
}

