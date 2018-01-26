		var IsFull = false;
          document.cancelFullScreen = document.cancelFullScreen || document.webkitCancelFullScreen || document.mozCancelFullScreen;

          // Called whenever the browser exits fullscreen.
          function onFullScreenEnter() {
            console.log("Enter fullscreen initiated from iframe");
			IsFull = true;
			document.getElementById('toggle-btn').className +=" active";
          };

          function onFullScreenExit() {
            console.log("Exit fullscreen initiated from iframe");
			IsFull = false;
			document.getElementById('toggle-btn').className = "fullscreen";
          };

          // Note: FF nightly needs about:config full-screen-api.enabled set to true.
          function enterFullscreen(id) {

            onFullScreenEnter(id);

            var el =  document.getElementById(id);

            var onfullscreenchange =  function(e){
              var fullscreenElement = document.fullscreenElement || document.mozFullscreenElement || document.webkitFullscreenElement;
              var fullscreenEnabled = document.fullscreenEnabled || document.mozFullscreenEnabled || document.webkitFullscreenEnabled;
               console.log( 'fullscreenEnabled = ' + fullscreenEnabled, ',  fullscreenElement = ', fullscreenElement, ',  e = ', e);
            }

            el.addEventListener("webkitfullscreenchange", onfullscreenchange);
            el.addEventListener("mozfullscreenchange",    onfullscreenchange);
            el.addEventListener("fullscreenchange",       onfullscreenchange);

            if (el.webkitRequestFullScreen) {
              el.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
            } else {
              el.mozRequestFullScreen();
            }
            document.querySelector('#'+id + ' button').onclick = function(){
              exitFullscreen(id);
            }
          }

          function exitFullscreen(id) {
            onFullScreenExit(id);
            document.cancelFullScreen();
            document.querySelector('#'+id + ' button').onclick = function(){
              enterFullscreen(id);
            }
          }
		  
		  function CheckFullScreen()
		  {
			 if (!IsFull)
			 {
				enterFullscreen('my-content');
			 }
				else
			{
				exitFullscreen('my-content');
			}
		  }