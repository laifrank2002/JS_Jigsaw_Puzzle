/**
	The renderer for puzzles on the canvas element
	A sort of JS component.
 */

var puzzle_handler = (
	function()
	{
		var viewport = {
			x: 0,
			y: 0,
			width: 600,
			height: 500,
		};	
		
		var boundingRectangle = {
			x: 0,
			y: 0,
			width: 600,
			height: 500,
		}
		
		var current_puzzle;
		// actual puzzle pieces 
		return {
			get viewport() { return viewport },
			get boundingRectangle() { return boundingRectangle },
			get current_puzzle() { return current_puzzle },
			
			initialize: function()
			{
				Engine.log("Initializing puzzle handler...");
				/*testing*/
				
			},
			
			set_current_puzzle: function(new_puzzle)
			{
				current_puzzle = new_puzzle;
			},
			
			scramble: function()
			{
				current_puzzle.scramble();
			},
			
			solve: function()
			{
				current_puzzle.solve();
			},
			
			draw: function(context)
			{
				/*
				if(current_puzzle.puzzle_image)
				{
					context.drawImage(current_puzzle.puzzle_image.image
						,-viewport.x
						,-viewport.y
						,current_puzzle.puzzle_image.width
						,current_puzzle.puzzle_image.height);
				}
				*/
				if (current_puzzle) 
				{
					current_puzzle.draw(context)
					if (current_puzzle.check())
					{
						context.font = "120px Georgia";
						
						var gradient = context.createLinearGradient(0, 0, 600, 0);
						gradient.addColorStop("0"," magenta");
						gradient.addColorStop("0.5", "blue");
						gradient.addColorStop("1.0", "red");
						
						context.fillStyle = gradient;
						context.fillText("Hooray",100,250);
						
						Game.stop_timer();
					}
				}
				
			},
			
			handle_click: function(x,y)
			{
				var mouseX = x - boundingRectangle.x;
				var mouseY = y - boundingRectangle.y;
				current_puzzle.handle_click(mouseX, mouseY);
			},
		}
	}
)();