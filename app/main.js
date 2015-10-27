/**
 * @author Jerry
 */
requirejs.config({
	paths: {
		"app": "app",
		"calc": "calc",
		"data-collector": "data-collector",
		"data-validator": "data-validator",
		"data-collection": "data-collection",
		"joint-algorithm": "joint-algorithm",
		"no-joint-algorithm": "no-joint-algorithm",
	}
});

require(["app"], function(App){
	var app = new App();
	
	app.Init();
});
