let matriz= require('./MatrizDispersa');
let m= new matriz();
m.append(4,0,0);
m.append(5,0,1);
m.append(6,0,2);
m.append(7,1,1);
m.append(8,2,2);
m.printV();
m.update(4,11,0,0);
console.log("xD")
m.printV();
