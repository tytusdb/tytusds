function getString(){
    var data = document.getElementById("dato").value;
    var byte = [];
    for(var i = 0; i<data.length;i++){
        var char = data.charCodeAt(i).toString(2);
        byte.push(char);
        
    }
    console.log(byte);  
    getHamming(byte);
}
function getHamming(bytes){
    var retstr= "";

    var str = ""
    for(var i = 0; i<bytes.length; i++){
        str +=bytes[i];
    }
    var i = 1;
    var j = 0;
    console.log("Byte: "+str);
    
    while(j<str.length){
        
        if(ispower(i)){
            retstr+="p";
            
            i++;
            
            

        }else{
            retstr+=str[j];
            j++;
            i++;
        }
        // else if(i==0){

        //     var paridad=0;
        //     for (let k = 0; k < bytes.length; k+=2) {
        //         if (bytes[bytes.length-k]==1){
        //             paridad++;
        //         }
        //     }
        //     if(paridad%2!=0){
        //         retstr.push("1");
        //         i++;
        //     }

        // }else{
        //    retstr.push(bytes[j]); 
        //    j++;
        //    i++;
        // }


    }
    //   1 101 00011011 00
    // 0011101000011011100

    // 1101000110110001110
    var parityindex="";
    
    for (let i = 0; i < retstr.length; i++) {

        if(retstr.charAt(i)=="p"){

            var paridad = 0;

            for (let k = i; k < retstr.length; k+=2*(i+1)) {

                for (let l = 0; l < i+1; l++) {
                    
                    if(retstr[k+l]=="1"){
                        paridad++;
                        
                    }
                }
                
            }
            
            if(paridad%2!=0){
                parityindex+="1"
                console.log("cambio 1: "+retstr[i]);
            }else{
                parityindex+="0"
                console.log("cambio 0: "+retstr[i]);
            }
        }else if (retstr[i]!=undefined){
            parityindex+=retstr[i];
        }

    }

    document.getElementById("cod").innerHTML = parityindex;
     
    
}

function ispower(n){
    var i = 0;
    while(true){
        if(Math.pow(2,i)==n){
            return true;
        }else if(Math.pow(2,i)>n){
            return false;
        }
        i++;
    }
}
