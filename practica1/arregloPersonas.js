const personas = [
    { nombre: "Ana", edad: 22 },
    { nombre: "Luis", edad: 22 },
    { nombre: "Maria", edad: 22 },
    { nombre: "Carlos", edad: 28 }

];

const persLuis = personas.find(p => p.nombre === "Luis");
console.log(persLuis);

personas.forEach(p => {
    console.log(p.nombre + " tiene " + p.edad + " años ");
}
)

const sumaEdad = personas.reduce((total, p ) => total + p.edad, 0);
console.log("Suma de edades: " + sumaEdad);