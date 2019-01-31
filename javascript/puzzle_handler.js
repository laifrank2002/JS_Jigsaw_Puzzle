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
		
		var current_puzzle;
		// actual puzzle pieces 
		return {
			get viewport() { return viewport },
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
				if (current_puzzle) current_puzzle.draw(context);
			},
			
			handle_click: function(x,y)
			{
				current_puzzle.handle_click(x,y);
			},
		}
	}
)();