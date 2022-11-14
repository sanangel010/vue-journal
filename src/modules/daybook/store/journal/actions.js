// lAS Acciones son tareas asincronas que pueden mandar a llamar una mutación.
// Estas llegan a un servidor/backEnd
// Template de actions, una accion tiene el contexto, se desestructura y toma el commit.

import journalApi from "@/api/journalApi"


// Se consume el Backend del API del Firebase
 export const loadEntries = async ( { commit } ) => {

    const { data } = await journalApi.get('/entries.json')
    
    // Cuando las entradas son nulas no existe data entonces
    // hay que hacer una validación para que el state quede
    // como un arreglo vacio y no como un undefined
    if( !data ){
        commit('setEntries', [])
        return
    }    
    
    const entries = []

    for (let id of Object.keys( data )) {
        // Se constuye un objeto para no mapear el objeto
        // raro de firebase, para tener solo la info que se va a ocupar.
        entries.push({
            id,
            ...data[id]
        })        
    }

    // Ahora se va a modificar el state,
    // Se manda a llamar el commit de esta mutacion
    commit('setEntries', entries)
}

export const updateEntry = async ( { commit }, entry ) => {
    // Se desestructura el objeto para extraer lo que necesitamos
    const { date, picture, text } = entry
    
    // Se construye este objeto como un tipo Payload que será lo que se este enviando a actualizar.
    const dataToSave = { date, picture, text }

    const respuesta = await journalApi.put( `/entries/${ entry.id }.json`,  dataToSave)
    
    // Finalmente se hace la mutación para que se propague o modifique el state.
    // commit de una mutación => udateEntry
    commit('updateEntry', { ...entry })
}

export const createEntry = async ( { commit }, entry ) => {

    // dataToSave
    // Se desestructura el objeto para extraer lo que necesitamos
    const { date, picture, text } = entry
    
    // Se construye este objeto como un tipo Payload que será lo que se este enviando a actualizar.
    const dataToSave = { date, picture, text }
    
    // respuesta con la data del backend
    const { data } = await journalApi.post( `/entries.json`,  dataToSave)

    dataToSave.id = data.name
    
    // commit -< addEntry
    commit('addEntry', dataToSave)

    return data.name
}

export const deleteEntry = async ({ commit }, id ) => {

    await journalApi.delete(`/entries/${ id }.json`)
    commit('deleteEntry', id)

    return id
}