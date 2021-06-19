//------variables------
let nav = document.getElementById('nav');
let menu = document.getElementById('secciones');

function cambio(){
    let posicion = window.pageYOffset;

    if (posicion <= 400){
        nav.classList.remove('nav2');
        nav.className = ('nav1');
        nav.style.transition = '1s;'
    }else{
        nav.classList.remove('nav1');
        nav.className = ('nav2');
        nav.style.transition = '1s';
    }
}

window.addEventListener('scroll',function(){
    console.log(window.pageYOffset);
    cambio();
});
