let matriz= require('./MatrizDispersa');
let lista= require('./Lista');
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
m.deleteP(4);
m.deleteP(5);
m.deleteP(6);
console.log("xd")
m.printV();
let l= new lista();
l.appendO(2);
l.appendO(3);
l.appendO(5);
console.log(l.Size());
l.print();
l.eliminar(2)
l.eliminar(3)
l.eliminar(5)
console.log(l.Size());
l.print();
l.appendO(4)
console.log(l.Size());
l.print();

let md=new matriz();
md.append("lisa",2,6)
md.append("wanda",4,1);
md.append("Joan",3,1);
md.append("Oscar",2,1);
md.append("Katherina",1,2);
md.printV();
