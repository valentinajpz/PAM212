function simularPeticionAPI() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("Datos recibidos correctamente");
        }, 5000);
        });
    }

    async function obtenerDatos(params) {
        const datos = await simularPeticionAPI();
        console.log("resultado: ", datos)        
    }

    obtenerDatos();