let Listacircular=require('./ListaCircular');
let l=new Listacircular();
l.appendI(1);
l.appendI(2);
l.appendI(3);
l.appendI(4);
l.appendI(5);
l.appendI(4);
l.repeat=true;
l.appendI(4);
l.imprimir();
l.Lnodos();
l.Ledges();
