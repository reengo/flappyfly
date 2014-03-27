requirejs.config({
	baseUrl : './js',
	shim : {		
		'App' : {
			deps : ['jquery', 'easel', 'sound', 'preload', 'tween', 'cssplugin']			
		} 	
	},
	paths : {
		'easel' : 'lib/easeljs/lib/easeljs-0.7.1.min', 
		'sound' : 'lib/createjs-soundjs/lib/soundjs-0.5.2.min', 
		'preload' : 'lib/createjs-preloadjs/lib/preloadjs-0.4.1.min',
		'tween' : 'lib/createjs-tweenjs/lib/tweenjs-0.5.1.combined',
		'cssplugin': 'lib/createjs-tweenjs/src/tweenjs/CSSPlugin',
		'jquery' : 'lib/jquery/dist/jquery.min',
		
		'App' : 'app',
		'Preloader' : 'states/preloader',
		'Play' : 'states/play',
		'Menu' : 'states/menu',
		'GameOver' : 'states/gameover',
		'Tilemap' : 'utils/tilemap',		
		'ParallaxLayer' : 'entities/parallaxlayer',
		'Hero' : 'entities/hero',
		'Platform' : 'entities/platform',
		'PlatformManager' : 'entities/platformmanager'
	},
	urlArgs : "bust="+(new Date()).getTime()
});

require(['App', 'jquery'], function(App, $){	
	App.initialize();		
}); 

