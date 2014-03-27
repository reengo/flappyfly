define('Play',[
	'ParallaxLayer',
	'PlatformManager',
	'Hero'
], function(ParallaxLayer, PlatformManager, Hero){
	var Play = {
		enter : function(canvas, stage, assets){
			var that = this;
			this.canvas = canvas;
			this.stage = stage;
			this.assets = assets;
			this.gameOver = false;

			this.settings = {
				speed: 40 //frames per second
			}

			//main controls
			//bind to mouseup event

			this.stage.on('click', this.handleInput, null, false, this);
			
			//render the backgrounds first
			this.renderBackgrounds();

			//render the hero next
			this.renderHero();	

			//render platforms
			this.renderPlatforms();
			//set FPS and start listening to game ticks
			createjs.Ticker.setFPS( this.settings.speed );
			createjs.Ticker.addEventListener( 'tick', this.tick );
		},
		exit : function(){
			console.log('ITS GAME OVER');
		},
		tick : function( e ){
			if(Play.hero.alive){
				if(Play.jumpClicked){	
					Play.hero.jump();
					createjs.Sound.play("fly_snd");
					Play.jumpClicked = false;
				}

				//update			
				Play.collideWithGroup(Play.hero, Play.platformManager);
				Play.hero.update();		
				Play.hero.render();
				Play.platformManager.update();
				Play.platformManager.render();	
				for(var i in Play.parallaxLayer){
					Play.parallaxLayer[i].update();
					Play.parallaxLayer[i].render();
				}	
			}else{
				//show death state
				createjs.Sound.play('slap_snd');
				Play.gameOver = true;
				//Play.hero.stop();		
				Play.exit();
			}
			

						

			Play.stage.update();
		},
		renderHero : function(){
			//setup spritesheets
			var spriteSheetData = {
				animations : {
					flap : {
						frames : [0, 1, 2, 3, 4, 5],
						frequency: 2,
						next : 'false'
					},
					fly : {
						frames : [6, 7, 8, 9],
						frequency: 2
					},
					fall : {
						frames : [9],
						frequency: 2
					}
				},
				frames : {
					width : 68.5, height: 57
				},
				images : [ this.assets['fly'] ]
			};
		
			//initialize hero
			this.hero = new Hero({
				spriteSheet : new createjs.SpriteSheet( spriteSheetData ),
				x : 100,
				y: 100,
				velocity : {x: 0, y:5}
			});

			//render to stage
			this.stage.addChild( this.hero.graphics );
		},
		renderBackgrounds: function(){
			//create an array of backgrounds
			this.parallaxLayer = [];

			//create a ParallaxLayer named sky
			this.parallaxLayer['sky'] = new ParallaxLayer({
				bitmap: this.assets['sky'], 
				x: 0, y: 0, 
				width: 800,
				height: 600, 
				velocity: {x: 0, y: 0},
				acceleration : 0
			});

			//create a ParallaxLayer called ground
			this.parallaxLayer['ground'] = new ParallaxLayer({
				bitmap: this.assets['ground'], 
				x: 0, y: 300, 
				width: 700,
				height: 300, 
				velocity: {x: -0.5, y: 0},
				acceleration : -2
			});

			//add elements to stage
			this.stage.addChild(
				this.parallaxLayer['sky'].graphics,
				this.parallaxLayer['ground'].graphics
			);
		},
		renderPlatforms: function(){
			//create a platform manager
			this.platformManager = new PlatformManager({
				bitmap : this.assets['platforms'], 
				x : 0, y: 0, 
				acceleration: -2
			});

			//render it to stage
			this.stage.addChild( this.platformManager.graphics );
		},
		handleInput : function(){
			Play.jumpClicked = true;
		},
		collideWithGroup : function(objA, objB){			
			var groupB = objB.collidables;
			for(var i in groupB){				
				this.collides(objA, groupB[i], objA.collide, objB.collide);
			}
		},		
		collides : function(objA, objB, objACallback, objBCallback){			
			var rect1 = objA.boundingBox;
			var rect2 = objB.boundingBox;
			
			// calculate if there is an overlap between the bounds
			var r1={}, r2={};

			r1.left = rect1.x + objA.getFuturePosition().x;
			r1.top = rect1.y + objA.getFuturePosition().y;
			r1.right = r1.left + rect1.width;
			r1.bottom = r1.top + rect1.height;

			r2.left = rect2.x + objB.getFuturePosition().x;
			r2.top = rect2.y + objB.getFuturePosition().y;
			r2.right = r2.left + rect2.width;
			r2.bottom = r2.top + rect2.height;

			var x_overlap = Math.max(0, Math.min(r1.right, r2.right) - Math.max(r1.left, r2.left));
			var y_overlap = Math.max(0, Math.min(r1.bottom, r2.bottom) - Math.max(r1.top, r2.top));			
			
			if (x_overlap > 0 && y_overlap > 0) {	
				objACallback.call(objA, objB, {width: x_overlap, height: y_overlap})						   
			} else {
			  	return null;
			}			
		}
	}

	return Play;
});