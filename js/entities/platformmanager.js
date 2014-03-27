define("PlatformManager", [	
	"Platform"	
	], function(Platform){

	var PlatformManager = function(opts){		
		this.collidables = [];
		this.x = 0;
		this.y = 0;				

		for(var prop in opts){		
			this[prop] = opts[prop];		
		}		

		var groundPlatform = new Platform({
			tilesheet : '',
			rows : 10,
			cols : 1000,
			x : 0,
			y : 485,
			acceleration : 0
		});

		var startPlatform = new Platform({
			tilesheet : this.bitmap,
			rows : 10,
			cols : 3,
			y : 10000,
			acceleration : this.acceleration
		});

		var platform2 = new Platform({
			tilesheet : this.bitmap,
			rows : 10,
			cols : 3,
			y : 330,
			x : 400,
			acceleration : this.acceleration
		});
		
		this.collidables.push(groundPlatform);
		this.collidables.push(startPlatform);
		this.collidables.push(platform2);

		this.graphics = new createjs.Container();
		for(var i in this.collidables){
			this.graphics.addChild( this.collidables[i].graphics );
		}

		this.lastPlatformIndex = this.collidables.length - 1;

		this.graphics.x = this.x;
		this.graphics.y = this.y;
	};

	PlatformManager.prototype = {
		update : function(){			
			for(var i in this.collidables){				
				this.collidables[i].update();

				if(this.collidables[i].isOutsideLeft){
					var lastPlatform = this.collidables[this.lastPlatformIndex];
					var lastX = lastPlatform.x + lastPlatform.width;

					this.collidables[i].reset({
						cols: 3,
						rows: 5,
						y : lastPlatform.y + (Math.random() * 50 - 50), 
						x : lastX + 200});
					this.lastPlatformIndex = i;
				};
			}
		},
		render : function(){
			for(var i in this.collidables){
				this.collidables[i].render();
			}	
		}
	}

	return PlatformManager;

});