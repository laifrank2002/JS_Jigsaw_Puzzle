/** 
	Wrapper for canvas object. Does much of the animation.
	Some code taken from clocks-in-a-cooler.
	https://github.com/Clocks-in-a-Cooler
	@author Frank Lai 2002
	@version 2018-12-11
	https://github.com/laifrank2002
 */

var Canvas = (
	function()
	{
		// constants 
		var DEFAULT_CANVAS = "main_canvas";
		var DEFAULT_FONT_SIZE = 18;
		var DEFAULT_FONT = "Consolas";
		// private fields
		var canvas;
		var context;
		
		return {
			get canvas() {return canvas},
			get DEFAULT_FONT_SIZE() { return DEFAULT_FONT_SIZE },
			get DEFAULT_FONT() { return DEFAULT_FONT },
			initialize: function()
			{
				Engine.log("Initializing Canvas...");
				canvas = document.getElementById(DEFAULT_CANVAS);
				context = canvas.getContext("2d");
			},
			
			draw: function(lapse)
			{				
				//up to this point, nothing has been drawn yet!
				
				// clear and draw
				context.clearRect(0, 0, canvas.width, canvas.height);
				// reset font
				context.font = DEFAULT_FONT_SIZE + "px" + " " + DEFAULT_FONT;
				// leave everything to page_manager
				page_manager.current_page.draw(context, lapse);
				/*
				// draw from the current_page
				// draw a border around the viewport of the puzzle
				context.strokeStyle = "black";
				context.lineWidth = "1px";
				context.beginPath();
				context.rect(puzzle_handler.viewport.x
					,puzzle_handler.viewport.y
					,puzzle_handler.viewport.width
					,puzzle_handler.viewport.height);
				// clip the puzzle inside the puzzle.
				context.clip(); 
				context.stroke();
				
				// call the viewport from the puzzle 
				puzzle_handler.draw(context);
				
				// restore to draw UI.
				context.restore();
				
				// draw the UI on the right.
				Game.draw(context, lapse);
				*/
			},

		}
	}
)();