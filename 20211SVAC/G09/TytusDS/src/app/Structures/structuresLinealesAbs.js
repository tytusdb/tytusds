import Velocity from "Velocity"

function anima(){
    console.log("entro a la funcion")

    Velocity(document.getElementById("",
    {
        opacity: 0.5
    },
    {
        duration: 1000
    }))
    $(".btn1").velocity({
        translateY: [0,500],
        left: "600px",
    },{
        duration:500,
        display: 'block'
    });

    /*$(".animar").on('click', function(){
        $(".btn1").velocity({
            left: "600px",
        },{
            duration:500,
        });
    });*/

    //$("#b1").velocity("fadeIn", { duration: 1500 });
/*$(document).ready(function()
{
    $(".animar").on('click', function(){
        console.log("entro a la funcion")
        $(".btn1").velocity({
            left: "600px",
        },{
            duration:500,
        });
    });
}
)*/
}