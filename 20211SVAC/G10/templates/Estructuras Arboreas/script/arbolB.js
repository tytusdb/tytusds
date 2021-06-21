const velocidad = document.getElementById("velocidad")
let num_velocidad = 3;

velocidad.oninput = () => {
    document.getElementById('numero').innerHTML = velocidad.value
    //num_velocidad = (velocidad.value * 1) / 5
    num_velocidad = velocidad.value
    
}