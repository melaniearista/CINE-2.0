var Item = require('./administrador');
    let administradorinstanciado = new Item(); 
module.exports = class Administrador {
   constructor( ) {}
Guardar(req,res) { //Guarda datos del usuario en caso de registro
    var claveysaltlocal = administradorinstanciado.setPassword(req.body.CLAVE);  //registra la clave
    console.log(claveysaltlocal[0]);
   console.log(req.body.CLAVE);
	Item.create(
			{
   NOMBRE: req.body.NOMBRE,
    CLAVE: claveysaltlocal[0], //guarda la clave y el salt que es la llave
EMAIL: req.body.EMAIL,
    IMAGEN: req.body.IMAGEN,
    ESTADO: req.body.ESTADO,
             SALT: claveysaltlocal[1]   
            }, 
			function(err, item) {
				if (err)
                    {
					res.send(err);}
          else{    Item.find(function(err, item) {
				 	if (err)
				 		res.send(err)
				  res.json(item);
				});}}); }   
    Login(req,res) {
    	Item.find({EMAIL:req.body.EMAIL}, function(err, item) {
			if (err){
				res.send(err)}
        else{console.log(item[0].CLAVE);
            if(administradorinstanciado.validPassword(req.body.CLAVE,item[0].CLAVE,item[0].SALT))  //hace la comparacion para verificar si es una cuenta de administrador o no
                {
                    item[0].SALT="NO F..ING WAY";
					res.json(item); // devuelve todas las Personas en JSON	
                }
            else
                {
                    res.status(400).send({ 
                    message : "Datos incorrectos"
                }); 
                }}});}}