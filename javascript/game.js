/**
	A JS Componentesque to go along the puzzle.
		Includes
			Timer
			Buttons
 */
var Game = (
	function()
	{
		var boundingRectangle = {
			x: 600,
			y: 0,
			width: 200,
			height: 500,
		}
		
		var x = boundingRectangle.x;
		var y = boundingRectangle.y;
		var width = boundingRectangle.width;
		var height = boundingRectangle.height;
		
		var time = 0;
		var timer_active = false;
		
		return {
			get boundingRectangle() { return boundingRectangle },
			
			draw: function(context, lapse)
			{
				// update everything
				if (timer_active)
				{
					time += lapse;
				}
				// 
				context.fillStyle = "white";
				
				context.beginPath();
				context.rect(x,y,width,height);
				context.fill();
				context.stroke();
				
				// write the clock.
				context.fillStyle = "black";
				context.font = "60px Arial"
				var secondsString = Math.round(((time / 1000))%60).toString();
				if (secondsString.length < 2) secondsString = "0" + secondsString;
				
				var minuteString = Math.floor((time/1000)/60).toString();
				if (minuteString.length < 2) minuteString = "0" + minuteString;
				
				context.fillText(minuteString+":"+secondsString,x+25,y+80);
			},
			
			start_timer: function()
			{
				timer_active = true;
			},
			
			stop_timer: function()
			{
				timer_active = false;
			},
			
			reset_timer: function()
			{
				time = 0;
			},
			
			handle_click: function(x,y)
			{
				var mouseX = x - boundingRectangle.x;
				var mouseY = y - boundingRectangle.y;
				
				// convert to internal coordinates.
			},
		}
	}
)();

