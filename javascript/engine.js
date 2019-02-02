/** 
	Portable lightweight engine.
	
	REDO SELECT/DRAG'n'DROP!
		BUG- When click outside the canvas, make one click count.
	
	@author Frank Lai 2002
	@version 2018-12-11
	https://github.com/laifrank2002
 */

// animation constants 
 
var Engine = (
	function()
	{	
		// debugging
		var _log = true;
		var _debug = true;
		
		var objects = [];
		
		//sets keys pressed 
		var keys_pressed = [];
		
		//stores cursor's position from the top left corner; x corresponds to left-right; y corresponds to up-down
		var cursor = {
			x: 0,
			y: 0,
		};
		
		//for animation
		var last_time = null; 
		var lapse = 0;
		var paused = false;
		
		var frame_count = 0;
		
		var viewport = {
			x: 0,
			y: 0,
			width: 600,
			height: 500,
		};		
		// game variables 
		var puzzles = {};
		return {
			get cursor() { return cursor },
			get cursor_x() { return cursor.x },
			get cursor_y() { return cursor.y },
			
			get viewport() { return viewport },
			get puzzles() { return puzzles },
			initialize: function()
			{
				Engine.log("Initializing Engine...");
				Canvas.initialize();
				puzzle_handler.initialize();
				page_manager.initialize();
				
				mouse_handler.activate(Canvas.canvas);
				
				document.onmousemove = function(event) {
					
					var bounds = Canvas.canvas.getBoundingClientRect();
					// get internal x and y; we don't care about x and y outside the bounds!
					cursor.x = event.pageX - bounds.x;
					cursor.y = event.pageY - bounds.y;
				}
				
				// write a new puzzle 
				puzzles["pumpkin_puzzle"] = new Puzzle(image_library["pumpkin1"],6,5,50,50);
				puzzles["level1"] = new Puzzle(image_library["level1"],4,4,50,50);
				puzzles["level2"] = new Puzzle(image_library["level2"],6,5,50,50);
				puzzles["level3"] = new Puzzle(image_library["level3"],7,6,50,50);
				puzzles["level4"] = new Puzzle(image_library["level4"],6,5,50,50);
				
				requestAnimationFrame(Engine.animate); // init animation when all is ready
			},
			
			log: function(message)
			{
				if (_log)
				{
					console.log(message);
				}
			},
			
			debug: function()
			{
				setInterval(function()
				{
					Engine.log(frame_count);
					frame_count = 0;
				}, 1000);
			},
			
			toggle_pause: function()
			{
				paused = !paused;
			},
			
			// animation
			animate: function(time)
			{
				if (last_time === null)
				{
					lapse = 0;
				}
				else 
				{
					lapse = time - last_time;
				}
				
				last_time = time;
				
				if(!paused) 
				{
					Engine.draw_frame(lapse);
				}
				
				if (_debug) frame_count++; // debugging
				requestAnimationFrame(Engine.animate);
			},
			
			draw_frame: function(lapse)
			{
				// call canvas handler
				Canvas.draw(lapse);
			},
			
			// outdated, to be deprecated
			/*
			handle_click: function(event)
			{
				var bounds = Canvas.canvas.getBoundingClientRect();
				var mouseX = event.clientX - bounds.x;
				var mouseY = event.clientY - bounds.y;
				
				puzzle_handler.handle_click(mouseX, mouseY);
			},
			*/
			
			handle_mouse_up: function(event)
			{
				page_manager.current_page.handle_mouse_up(event);
			},
			// only click UI once, but click puzzle_handler twice
			handle_mouse_down: function(event)
			{
				page_manager.current_page.handle_mouse_down(event);
			},
		}
	}
)();