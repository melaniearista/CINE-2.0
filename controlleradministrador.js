var Item = require('./administrador');
    let administradorinstanciado = new Item();
module.exports = class Administrador {
   constructor( ) {}
Guardar(req,res) { // Guarda los datos en cada registro
    var claveysaltlocal = administradorinstanciado.setPassword(req.body.CLAVE);  //registra la clave
    console.log(claveysaltlocal[0]);
   console.log(req.body.CLAVE);
	Item.create(
			{
    NOMBRE: req.body.NOMBRE,
    CLAVE: claveysaltlocal[0], //Guarda la contraseña y el salt
    EMAIL: req.body.EMAIL,
    IMAGEN: req.body.IMAGEN,
             SALT: claveysaltlocal[1]   
            }, 
			function(err, item) {
				if (err)
                    {
					res.send(err);}
          else{    Item.find(function(err, item) {
				 	if (err)
				 		res.send(err)
              for(var ele in item)
                  {
                      item[ele].SALT = "Arista la Artista";
                      item[ele].CLAVE = "bbcita";
                  }
				  res.json(item);
				});}}); }   
 Modificar(req,res) {   // Modifica val segun id
		Item.update( {_id : req.body.id},
					{$set:
			{
  NOMBRE: req.body.NOMBRE,
    CLAVE: req.body.CLAVE,
EMAIL:req.body.EMAIL,
    IMAGEN: req.body.IMAGEN,
            }}, 
			function(err, item) {
				if (err)
                    {
					res.send(err);}
				// Devuelve todas las personas
          else{
                Item.find(function(err, item) {
				 	if (err)
				 		res.send(err)
				  res.json(item);
				});
                
                
          }
               	
			});
    
    
    
}   
    Eliminar(req,res) {
	Item.remove({_id : req.body.id}, 
			function(err, item) {
				if (err)
                    {
					res.send(err);}
				//Tiene y devuelve todas las personas
          else{
                Item.find(function(err, item) {
				 	if (err)
				 		res.send(err)
				  res.json(item);
				});
                
                
          }
               	
			});
    
    
    
}
Seleccionartodos(req,res) { //Selecciona todos los datos
		Item.find(
		function(err, item) {
			if (err)
                
                {
				res.send(err)
                }else{
                
                
					res.json(item); // Devuelve todas las Personas en JSON	
                    	 
                }
				}
			);
    
    
    
}
    Login(req,res) {
    	Item.find({EMAIL:req.body.EMAIL}, function(err,item) {
			if (err){
				res.send(err)}
        else{console.log(item[0].CLAVE);
            if(administradorinstanciado.validPassword(req.body.CLAVE,item[0].CLAVE,item[0].SALT))  //hace la comparacion para verificar si es una cuenta de administrador o no
                {
                    item[0].SALT="NO F..ING WAY";
					res.json(item); // Devuelve todas las Personas en JSON	
                }
            else
                {
                    res.status(400).send({ 
                    message : "Datos incorrectos"
                }); 
                }}});}
}