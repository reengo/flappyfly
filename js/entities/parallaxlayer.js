define('ParallaxLayer', [				
		'easel',
		'sound'		
	], function(){
	var ParallaxLayer = function(opts){
		this.width = 0;
		this.height = 0;
		this.x = 0;
		this.y = 0;
		this.bitmap = null;
		this.velocity = {}			
		this.acceleration = 0;

		for(var prop in opts){		
			this[prop] = opts[prop];		
		}

		this.outside = -this.width;
		
		var graphicsLocal = new createjs.Graphics()
			.beginBitmapFill(this.bitmap)
			.drawRect(0,0, this.width, this.height)
			.endFill();
	
		this.shapeA = new createjs.Shape(graphicsLocal);
		this.shapeB = new createjs.Shape(graphicsLocal);
		this.shapeB.x = this.width;

		this.graphics = new createjs.Container();		
		this.graphics.addChild(this.shapeA, this.shapeB);

		this.graphics.x = this.x;
		this.graphics.y = this.y;		
	};

	ParallaxLayer.prototype = {
		update : function(){
			this.velocity.x = this.acceleration;			
		},
		render : function(){
			if(this.shapeA.x < this.outside){
				var temp = this.shapeA;
				temp.x = this.shapeB.x+this.width;
				this.shapeA = this.shapeB;
				this.shapeB = temp;
			}
			
			this.shapeA.x += this.velocity.x;
			this.shapeB.x += this.velocity.x;
		}

	};

	return ParallaxLayer;

});