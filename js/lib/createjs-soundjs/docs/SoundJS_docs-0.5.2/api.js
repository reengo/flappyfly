YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "Event",
        "EventDispatcher",
        "FlashPlugin",
        "HTMLAudioPlugin",
        "Sound",
        "SoundInstance",
        "SoundJS",
        "Utility Methods",
        "WebAudioPlugin"
    ],
    "modules": [
        "CreateJS",
        "SoundJS"
    ],
    "allModules": [
        {
            "displayName": "CreateJS",
            "name": "CreateJS",
            "description": "A collection of Classes that are shared across all the CreateJS libraries.  The classes are included in the minified\nfiles of each library and are available on the createsjs namespace directly.\n\n<h4>Example</h4>\n     myObject.addEventListener(\"change\", createjs.proxy(myMethod, scope));"
        },
        {
            "displayName": "SoundJS",
            "name": "SoundJS",
            "description": "The SoundJS library manages the playback of audio on the web. It works via plugins which abstract the actual audio\nimplementation, so playback is possible on any platform without specific knowledge of what mechanisms are necessary\nto play sounds.\n\nTo use SoundJS, use the public API on the {{#crossLink \"Sound\"}}{{/crossLink}} class. This API is for:\n<ul><li>Installing audio playback Plugins</li>\n     <li>Registering (and preloading) sounds</li>\n     <li>Creating and playing sounds</li>\n     <li>Master volume, mute, and stop controls for all sounds at once</li>\n</ul>\n\n<b>Controlling Sounds</b><br />\nPlaying sounds creates {{#crossLink \"SoundInstance\"}}{{/crossLink}} instances, which can be controlled individually.\n<ul><li>Pause, resume, seek, and stop sounds</li>\n     <li>Control a sound's volume, mute, and pan</li>\n     <li>Listen for events on sound instances to get notified when they finish, loop, or fail</li>\n</ul>\n\n<h4>Feature Set Example</h4>\n     createjs.Sound.alternateExtensions = [\"mp3\"];\n     createjs.Sound.addEventListener(\"fileload\", createjs.proxy(this.loadHandler, this));\n     createjs.Sound.registerSound(\"path/to/mySound.ogg\", \"sound\");\n     function loadHandler(event) {\n         // This is fired for each sound that is registered.\n         var instance = createjs.Sound.play(\"sound\");  // play using id.  Could also use full sourcepath or event.src.\n         instance.addEventListener(\"complete\", createjs.proxy(this.handleComplete, this));\n         instance.volume = 0.5;\n     }\n\n<h4>Browser Support</h4>\nAudio will work in browsers which support HTMLAudioElement (<a href=\"http://caniuse.com/audio\">http://caniuse.com/audio</a>)\nor WebAudio (<a href=\"http://caniuse.com/audio-api\">http://caniuse.com/audio-api</a>). A Flash fallback can be added\nas well, which will work in any browser that supports the Flash player."
        }
    ]
} };
});