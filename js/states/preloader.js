define('Preloader', [	
	'jquery',
	'preload'
], function($){
	var assetManifest = [
		{src:'assets/logo.png', id:'title'},
		{src:'assets/flysprite.gif', id:'fly'},
		{src:'assets/sky-bg.gif', id: 'sky' },
		{src:'assets/ground.gif', id: 'ground'},
		{src:'assets/platform.png', id: 'platforms'},
		{src:'assets/fly.wav', id:'fly_snd'},
		{src:'assets/slap.mp3', id:'slap_snd'}
	];

	var Preloader = {
		enter : function(canvas, stage){
			var that = this;

			this.stage = stage;
			this.canvas = canvas;

			this.assets = {};

			$('.ui').css('display', 'none');
			var preloaderDiv = $('#preloaderDiv');
			preloaderDiv.css('display', 'block');

			this.loadingBar = $('.progressBar');
			this.loadingBar.css('width', 0);

			this.totalAssets = assetManifest.length;
			this.loadedAssets = 0;

			this.queue = new createjs.LoadQueue();
			this.queue.installPlugin(createjs.Sound);
			this.queue.on("fileload", this.handleFileLoad, this);
			this.queue.on("complete", this.handleComplete, this);
			this.queue.loadManifest(assetManifest);

		},
		exit : function(){
			//hide the loading bar
			this.onExit(this.assets);
		},
		handleFileLoad : function(e){
			var item = e.item;
			var type = item.type;	

			if (type == createjs.LoadQueue.IMAGE) {
				this.assets[e.item.id] = e.result;
			}
			
			this.loadedAssets++;

			var percent = this.loadedAssets / this.totalAssets * 100;
			this.loadingBar.css('width', percent+'%');
		},
		handleComplete : function(){
			createjs.Sound.play("fly_snd");
			this.exit();
		}
	}

	return Preloader;

});