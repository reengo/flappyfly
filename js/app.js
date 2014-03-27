define('App', [
	'jquery',	
	'Preloader',
	'Menu',
	'Play',
	'GameOver',
	'easel',
	'sound',
	'preload'
], function( $, Preloader, Menu, Play, GameOver ){

	var App = {
		initialize : function(){			
			var that = this;

			this.canvas = $('#game_canvas')[0];
			this.stage = new createjs.Stage(this.canvas);

			createjs.Touch.enable(this.stage);		

			Preloader.enter(this.canvas, this.stage);
			Preloader.onExit = function(assets){
				that.assets = assets;				
				that.gotoMenu();
			}


		},		
		gotoMenu : function(){
			var that = this;
			//start Menu state			
			Menu.enter(this.canvas, this.stage, this.assets);
			Menu.onExit = function(data){				
				that.gotoPlay();
			}
		},
		gotoPlay : function(){
			var that = this;
			Play.enter(this.canvas, this.stage, this.assets);
			Play.onExit = function(data){
				console.log('Game Over');
			}
		},
		gotoGameOver : function(){

		}

	}

	return App;
});