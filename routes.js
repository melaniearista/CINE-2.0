var controllerpelicula = require('./controllerpelicula.js');
var controllerAdministrador = require('./controlleradministrador.js');
module.exports = function(app) {
	var clasepelicula = new controllerpelicula();
	app.post('/api/nuevapelicula', clasepelicula.Guardar);
	app.post('/api/modificapelicula', clasepelicula.Modificar);
	app.post('/api/eliminapelicula', clasepelicula.Eliminar);
	app.post('/api/seleccionapelicula', clasepelicula.Seleccionartodos);
	app.post('/api/seleccionarpeliculaporfecha', clasepelicula.Seleccionarporfecha);
	app.post('/api/seleccionarporid', clasepelicula.Seleccionarporid);
	app.post('/api/seleccionarpeliculapornombre', clasepelicula.Seleccionarpornombre);
    
    var claseadm = new controllerAdministrador();
    app.post('/api/nuevoadm', claseadm.Guardar);
    app.post('/api/loginadm', claseadm.Login);
    
	app.get('*', function(req,res) {//localhost:8080
		res.sendfile('./login.html');//Carga unica de la vista
	});
};