define('Hero',[	
	'easel',
	'sound',
	'preload'
	], function(){
	var Hero = function(opts){
		// INITIALIZE PROPERTIES		
		this.width = 30;
		this.height = 30;
		this.x = 0;
		this.y = 0;		
		this.spriteSheet = null;
		this.acceleration = 0.8;	
		this.velocity = {x: 0, y: 0};
		this.controlOff = false;

		for(var prop in opts){		
			this[prop] = opts[prop];		
		}

		this.alive = true;
		this.onGround = false;

		this.boundingBox = new createjs.Rectangle(20, 20, this.width, this.height);
	
		var boundingBoxGfx = new createjs.Graphics()
			.drawRect(this.boundingBox.x, 
					this.boundingBox.y, 
					this.boundingBox.width, 
					this.boundingBox.height);
		var debugBox = new createjs.Shape(boundingBoxGfx);
		
		this.animation = new createjs.Sprite(this.spriteSheet);
		this.animation.gotoAndPlay('fly');
		
		this.graphics = new createjs.Container();		
		this.graphics.addChild(this.animation, debugBox);

		this.graphics.x = this.x;
		this.graphics.y = this.y;
	};

	Hero.prototype = {
		update : function(){
			if(this.collision){	
				if(this.animation.currentAnimation != 'fly')
					this.animation.gotoAndPlay('fly');
				this.onGround = true;				
				this.collision = null;
			}else{							
				this.velocity.y += this.acceleration;			
			}

			if( this.velocity.y >= 0 ){
				this.animation.gotoAndPlay('fall');
			}

			this.x += this.velocity.x;
			this.y += this.velocity.y;

			if(this.y > 800){
				this.y = -50;
			}			
		},
		stop: function(){
			this.velocity.x = this.velocity.x = 0;
		},
		render : function(){
			this.graphics.x = this.x;
			this.graphics.y = this.y;			
		},
		getFuturePosition : function(){
			return {
				x : this.x + this.velocity.x,
				y : this.y + this.velocity.y
			}
		},
		jump : function(){	
			this.animation.gotoAndPlay('flap');
			this.onGround = false;
			this.velocity.y = -10;
		},
		collide : function(objB, data){
			if(data.width < data.height){
				this._separateX(objB, data);
			}else{
				this._separateY(objB, data);	
			}
		},
		_separateX : function(objB, data){
			var overlap = data.width;
			var objBX = objB.getFuturePosition().x;		

			if(objBX > this.x){		
				this.x -= overlap; 
				this.velocity.x = objB.velocity.x;

				this.hit = true;
				this.controlOff = true;
			}else{
				this.x += overlap;
			}
		},
		_separateY : function(objB, data){
			var overlap = data.height;	

			if(overlap > 1 ){
				this.y = (objB.y + objB.boundingBox.y) - this.boundingBox.height - this.boundingBox.y;
				this.velocity.y = 0;	

				this.hit = true;
				this.alive = false;
			}
		}
	}	

	return Hero;
})