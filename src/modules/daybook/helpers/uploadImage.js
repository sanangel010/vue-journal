import axios from "axios"

const uploadImage = async ( file ) => {

    console.log('file.',file);
    
    if( !file ) return

    try {
        
        console.log('Entro al try');

        // Conifigueración para enviar el archivo a cloudninary y obtener el url del archivo guardado ahí.
        const formData = new FormData()
        formData.append('upload_preset', 'vue-curso-2022')
        formData.append('file', file)

        // Ruta de la nube personalizada de cloudinary
        const url = 'https://api.cloudinary.com/v1_1/dbxwxpzgr/image/upload'

        console.log('Antes de la llamada.');
        console.log('file.',file);
        console.log('formData.',formData);

        // Se obtiene el acceso al api de cloudinary esto podria quedar en la carpeta de apis como clodinayApi.js
        const { data } = await axios.post( url, formData )

        console.log('la data: ', data);

        console.log(data.secure_url);

        return data.secure_url

    } catch ( error ) {

        console.log('Error al cargar la imagen, revisar logs');
        console.log( error );
        return null

    }

}
// 
export default uploadImage