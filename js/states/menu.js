define('Menu',[
	'jquery'
], function($){
	var Menu = {
		enter : function(canvas, stage, assets){
			var that = this;
			this.canvas = canvas;
			this.stage = stage;
			this.assets = assets;

			//initialize our DOM based UI
			$('.ui').css('display', 'none');

			this.menu = $('#menu');

			this.menu.css('display', 'block');

			this.title = $('#title');
			this.start = $('#start');

			this.title.css('opacity', 0);
			this.title.css('position', 'absolute');	
			this.title.css('margin-left', '-160px');

			//img tags can also be used as bitmap
			var startBtn = new createjs.Bitmap(this.start[0]);
			this.start.remove(); 
			
			startBtn.x = this.canvas.width/2 - startBtn.image.width/2 ;
			startBtn.y = 320;

			startBtn.on('click', this.clickStart, null, true, this);

			//draw background
			var gfx = new createjs.Graphics()
				.beginBitmapFill(this.assets['sky'])
				.drawRect(0, 0, this.canvas.width, this.canvas.height)
				.endFill();

			var background = new createjs.Shape(gfx);

			background.x = 0;

			//add to display list
			this.stage.addChild(background, startBtn);

			//listen to ticks
			createjs.Ticker.setFPS(40);
			createjs.Ticker.addEventListener('tick', this.tick);

			createjs.CSSPlugin.install( createjs.Tween );

		    createjs.Tween.get( this.title[0] )
		    	.set({ top: 0 }, this.title[0].style)
				.wait( 500 )
		    	.to({opacity:1, top:150}, 1000, createjs.Ease.easeIn)
		},
		exit : function(){
			//kill the tick listeners
			createjs.Ticker.removeEventListener('tick', this.tick);
			//remove children
			this.stage.removeAllChildren();
			//after children has been removed exit;
			this.onExit();
		},
		tick : function(){
			Menu.stage.update(); //update the stage every tick
		},
		clickStart: function(e, data){
			$(data.title).hide();
			$(data.menu).find('p').hide();
			data.exit();
		},
		handleComplete: function(){
			//animate complete
		}
	}

	return Menu;
});