var estructurasLineales = function() {
    if (this.constructor === estructurasLineales) {
        throw new Error("¡No se puede instanciar la clase abstracta!");
    }
    // estructurasLineales initialization...
};
estructurasLineales.prototype.add = function() {
    throw new Error("Abstract method!");
}
estructurasLineales.prototype.delete = function() {
    throw new Error("Abstract method!");
}

estructurasLineales.prototype.refresh = function() {
    throw new Error("Abstract method!");
}
estructurasLineales.prototype.search = function() {
    throw new Error("Abstract method!");
}
estructurasLineales.prototype.cargar = function() {
    throw new Error("Abstract method!");
}
estructurasLineales.prototype.guardar = function() {
    throw new Error("Abstract method!");
}

module.export=estructurasLineales

/*
var Animal = function() {
    if (this.constructor === Animal) {
      throw new Error("Can't instantiate abstract class!");
    }
};

Animal.prototype.say = function() {
    throw new Error("Abstract method!");
}

var Cat = function() {
    Animal.apply(this, arguments);
};
Cat.prototype = Object.create(Animal.prototype);
Cat.prototype.constructor = Cat;

Cat.prototype.say = function() {
    console.log('meow');
}

var Dog = function() {
    Animal.apply(this, arguments);
};
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.say = function() {
    console.log('bark');
}

var cat = new Cat();
var dog = new Dog();

cat.say();
dog.say();*/
