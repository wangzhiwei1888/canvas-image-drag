(function() {

	var zIndex = 0;
	$('.clothes_item').on('click','.img',function(){

		zIndex = zIndex+1;
		$(this).css('z-index',zIndex);
		$('.playbox').append($(this).clone())
		$('.playbox').find('img').addClass('target')
		

	})

	touch.on(document, "DOMContentLoaded", function() {

		// var playArea = document.querySelector("#playarea");
		var logger = document.querySelector("#logger");
		

		function log(msg) {
			logger.innerText = msg;
		}

		var action = {
			rotate: function() {
				log("利用startRotate, 单指触发滚动事件");
				//rotation
				var angle = 0;
				touch.on('.target', 'touchstart', function(ev) {
					ev.startRotate();
					ev.preventDefault();
				});

				touch.on('.target', 'rotate', function(ev) {
					var totalAngle = angle + ev.rotation;
					if (ev.fingerStatus === 'end') {
						angle = angle + ev.rotation;
						log("此次滚动角度为:" + ev.rotation + "度, 方向:" + ev.direction + ".");
					}
					this.style.webkitTransform = 'rotate(' + totalAngle + 'deg)';
				});
			},
			scale: function() {
				log("双指放大与缩小目标.");

				// var target = $(".target");
				// target.style.webkitTransition = 'all ease 0.05s';
				var width = 0;
				var height = 0;
				touch.on('.target', 'touchstart', function(ev) {

					width = this.width;
					height = this.height;
					ev.preventDefault();
				});

				var initialScale = 1;
				var currentScale;

				touch.on('.target', 'pinchend', function(ev) {

					currentScale = ev.scale - 1;
					currentScale = initialScale + currentScale;
					currentScale = currentScale > 2 ? 2 : currentScale;
					currentScale = currentScale < 1 ? currentScale : currentScale;


					// this.style.webkitTransform = 'scale(' + currentScale + ')';
					// alert(target.width);
					this.style.width = width*currentScale + 'px';
					this.style.height = height*currentScale + 'px';


					log("当前缩放比例为:" + currentScale + ".");
				});

				touch.on('.target', 'pinchend', function(ev) {
					initialScale = currentScale;
				});
			},
			
			drag: function() {
				log("抓取并移动目标");

				var dx, dy;
				touch.on('.target', 'touchstart', function(ev) {

					dx = parseInt(this.style.left);
					dy = parseInt(this.style.top);
					ev.preventDefault();
				});

				// var target = document.getElementById("target");
				

				touch.on('.target', 'drag', function(ev) {

					console.log(this.style.left,this.style.top);
					dx = dx || 0;
					dy = dy || 0;

					var offx = dx + ev.x + "px";
					var offy = dy + ev.y + "px";
					this.style.left = offx;
					this.style.top = offy;

				});

				touch.on('.target', 'dragend', function(ev) {

					if(parseInt(this.style.left) < -(this.width/2))
					{
						$(this).remove();
					}
					if(parseInt(this.style.left) > $('.playbox').width()-(this.width/2))
					{
						$(this).remove();
					}
					if(parseInt(this.style.top) < -(this.height/2))
					{
						$(this).remove();
					}

					console.log(parseInt(this.style.top),$('.playbox').height(),(this.height/2))

					if(parseInt(this.style.top) > $('.playbox').height()-(this.height/2))
					{
						$(this).remove();
					}




				});
			}
		}

		$('.scale').on('click',function(){

			var str = $('.target').clone();
			$('.target').remove();
			$('.playbox').append(str);
			action.scale();

		})

		$('.drag').on('click',function(){
			var str = $('.target').clone();
			console.log(str)
			$('.target').remove();
			$('.playbox').append(str);
			action.drag();
			
		})

		$('.rotate').on('click',function(){
			var str = $('.target').clone();
			console.log(str)
			$('.target').remove();
			$('.playbox').append(str);
			action.rotate();
			
		})

	});

})();