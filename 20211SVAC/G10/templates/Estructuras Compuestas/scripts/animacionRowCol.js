const canvas = document.getElementById('lienzo')
const ctx = canvas.getContext("2d")

let x = 80
let y = 80
let l = 60
let columna_final = 0
let fila_final = 0

function crearMatriz(i, j, contenido) {
    reiniciar_posixiones()

    x = 80 + (i * 70)
    y = 80 + (j * 70)
    let tx = x + 30
    let ty = y + 35

    limitex(x)
    limitey(y)
    //this.limitex(this.x)
    //this.limitey(this.y)

    //let order = new recorrido(this.limiteX, this.limiteY)

    ctx.beginPath()
    ctx.lineWidth = 2
    ctx.strokeStyle = "rgb(48, 71, 94)"
    ctx.rect(x, y, l, l)
    ctx.stroke()

    ctx.beginPath()
    ctx.textAlign="center";
    ctx.font = "bold 12pt sans-serif"
    ctx.fillStyle = "rgb(48, 71, 94)" 
    ctx.fillText(contenido, tx, ty, l)
    ctx.stroke()
}

function borrar_canvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}


function reiniciar_posixiones() {
    x = 80
    y = 80
    l = 60
}

function limitex(numero){
    if(numero > columna_final) {
        columna_final = numero
    }

}

function limitey(numero){
    if(numero > fila_final) {
        fila_final = numero
    }
}

let inicioX  = 105
let inicioY = 105

async function rowMajor() {
    //console.log(`Row ${columna_final} ${fila_final}`)
    
    let limite_x = columna_final + 25
    window.requestAnimationFrame(function loop(){
        ctx.beginPath()
        ctx.fillStyle = "rgb(240, 84, 84, 0.6)"
        ctx.fillRect(inicioX, inicioY, 10, 10)
        
        if(inicioX == limite_x) {
            let nivel = inicioY + 70
            console.log(nivel)
            ctx.beginPath()
            ctx.fillStyle = "rgb(240, 84, 84, 0.6)"
            ctx.fillRect(inicioX, inicioY, 10, 10)

            if(inicioX == 80) {
                window.webkitCancelAnimationFrame()
            }

            inicioX -= 1
            window.requestAnimationFrame(loop)
            
           
        }
        inicioX += 1
        window.requestAnimationFrame(loop)
    })
    
}

async function columnMajor() {
    console.log(`Col ${columna_final} ${fila_final}`)
    ctx.beginPath()
    ctx.fillStyle = "rgb(240, 84, 84, 0.6)"
    ctx.fillRect(105, 105, 10, 10)
}