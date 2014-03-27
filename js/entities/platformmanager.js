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

		//precreate the platforms to memory
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
			y : 330,
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
		
		//put the platforms in a list
		this.collidables.push(groundPlatform);
		this.collidables.push(startPlatform);
		this.collidables.push(platform2);

		// add platform graphics to display list
		this.graphics = new createjs.Container();
		for(var i in this.collidables){
			this.graphics.addChild( this.collidables[i].graphics );
		}
		//keep a reference to the last platform
		this.lastPlatformIndex = this.collidables.length - 1;

		this.graphics.x = this.x;
		this.graphics.y = this.y;
	};

	PlatformManager.prototype = {
		update : function(){			
			/* loop through objects */
			for(var i in this.collidables){				
				this.collidables[i].update();

				// if a platform is on the left offscreen
				if(this.collidables[i].isOutsideLeft){
					//move the left platform to the back of the last platform
					var lastPlatform = this.collidables[this.lastPlatformIndex];
					var lastX = lastPlatform.x + lastPlatform.width;

				    //get a random shape
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
			//render
			for(var i in this.collidables){
				this.collidables[i].render();
			}	
		}
	}

	return PlatformManager;

});