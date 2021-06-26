let matriz= require('./MatrizDispersa');
let m= new matriz();

m.append(4,0,0);
m.append(5,0,1);
m.append(6,0,2);
m.append(7,1,0);
m.append(8,1,1);
m.append(2,1,2);
m.append(7,2,0);
m.append(8,2,1);
m.append(2,2,2);

m.printV();


m.printH();
