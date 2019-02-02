// manages JSPages
var page_manager = (
	function()
	{
		var pages = {};
		var current_page;
		return {
			get current_page() { return current_page },
			
			initialize: function()
			{
				// puzzle page
				pages["puzzle"] = new JS_page(function(context, lapse)
					{
						// handle 
						if (puzzle_handler.current_puzzle)
						{
							puzzle_handler.current_puzzle.handle_selected();
						}
						// draw 
						context.save();
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
						
						// draw all JS_buttons in the page
						context.font = Canvas.DEFAULT_FONT_SIZE + "px" + " " + Canvas.DEFAULT_FONT;
						for (button in this.buttons)
						{
							this.buttons[button].draw(context);
						}
						
					}
					,function(event)
					{
						// we get internal canvas x and y
						// simplifies a lot of code.
						var bounds = Canvas.canvas.getBoundingClientRect();
						var mouseX = event.clientX - bounds.x;
						var mouseY = event.clientY - bounds.y;
						
						puzzle_handler.handle_click(mouseX, mouseY);
					}
					,function(event)
					{
						// we get internal canvas x and y
						// simplifies a lot of code.
						var bounds = Canvas.canvas.getBoundingClientRect();
						var mouseX = event.clientX - bounds.x;
						var mouseY = event.clientY - bounds.y;
						
						if (mouseX < puzzle_handler.boundingRectangle.width - puzzle_handler.boundingRectangle.x
							&& mouseY < puzzle_handler.boundingRectangle.height - puzzle_handler.boundingRectangle.y
							&& mouseX > puzzle_handler.boundingRectangle.x
							&& mouseY > puzzle_handler.boundingRectangle.y)
						{
							puzzle_handler.handle_click(mouseX, mouseY);
						}
						else 
						{
							Game.handle_click(mouseX, mouseY);
							for (button in this.buttons)
							{
								if(this.buttons[button].isInBound(mouseX,mouseY))
								{
									this.buttons[button].handle_click(mouseX,mouseY);
								}
							}
						}
					});
				
				pages["puzzle"].add_button(new JS_button(650,325,100,50,"Scramble"
					,function()
					{
						puzzle_handler.current_puzzle.scramble();
						
						Engine.log("Scrambled the puzzle");
					}));
				
				pages["puzzle"].add_button(new JS_button(650,400,100,50,"Main Menu"
					,function()
					{
						page_manager.switch_page("main_menu");
						
						Game.stop_timer();
						
						Engine.log("Game stopped");
					}));
				
				// level select 
				pages["level_select"] = new JS_page(function(context,lapse)
					{
						// draw all JS_buttons in the page
						for (button in this.buttons)
						{
							this.buttons[button].draw(context);
						}
					}
					,function(event)
					{
						
					}
					,function(event)
					{
						// we get internal canvas x and y
						// simplifies a lot of code.
						var bounds = Canvas.canvas.getBoundingClientRect();
						var mouseX = event.clientX - bounds.x;
						var mouseY = event.clientY - bounds.y;
						
						for (button in this.buttons)
						{
							if(this.buttons[button].isInBound(mouseX,mouseY))
							{
								this.buttons[button].handle_click(mouseX,mouseY);
							}
						}
					});
				
				pages["level_select"].add_button(new JS_button(675,425,100,50,"Main Menu"
					,function()
					{
						page_manager.switch_page("main_menu");
					}));
					
				pages["level_select"].add_button(new JS_button(25,25,40,40,"1"
					,function()
					{
						page_manager.switch_page("puzzle");
						
						puzzle_handler.set_current_puzzle(Engine.puzzles["level1"]);
						puzzle_handler.scramble();
						Game.reset_timer();
						Game.start_timer();
						
						Engine.log("Started level 1!");
					}));
				
				pages["level_select"].add_button(new JS_button(85,25,40,40,"2"
					,function()
					{
						page_manager.switch_page("puzzle");
						
						puzzle_handler.set_current_puzzle(Engine.puzzles["level2"]);
						puzzle_handler.scramble();
						Game.reset_timer();
						Game.start_timer();
						
						Engine.log("Started level 2!");
					}));
					
				pages["level_select"].add_button(new JS_button(145,25,40,40,"3"
					,function()
					{
						page_manager.switch_page("puzzle");
						
						puzzle_handler.set_current_puzzle(Engine.puzzles["level3"]);
						puzzle_handler.scramble();
						Game.reset_timer();
						Game.start_timer();
						
						Engine.log("Started level 3!");
					}));
					
				pages["level_select"].add_button(new JS_button(205,25,40,40,"4"
					,function()
					{
						page_manager.switch_page("puzzle");
						
						puzzle_handler.set_current_puzzle(Engine.puzzles["level4"]);
						puzzle_handler.scramble();
						Game.reset_timer();
						Game.start_timer();
						
						Engine.log("Started level 4!");
					}));
				// main menu
				pages["main_menu"] = new JS_page(function(context,lapse)
					{
						// draw all JS_buttons in the page
						for (button in this.buttons)
						{
							this.buttons[button].draw(context);
						}
					}
					,function(event)
					{
						
					}
					,function(event)
					{
						// we get internal canvas x and y
						// simplifies a lot of code.
						var bounds = Canvas.canvas.getBoundingClientRect();
						var mouseX = event.clientX - bounds.x;
						var mouseY = event.clientY - bounds.y;
						
						for (button in this.buttons)
						{
							if(this.buttons[button].isInBound(mouseX,mouseY))
							{
								this.buttons[button].handle_click(mouseX,mouseY);
							}
						}
					});
					
				pages["main_menu"].add_button(new JS_button(325,200,150,50,"Start"
					,function()
					{
						
						page_manager.switch_page("puzzle");
						
						if(!puzzle_handler.current_puzzle)
						{
							puzzle_handler.set_current_puzzle(Engine.puzzles["level1"]);
							puzzle_handler.scramble();
							Game.reset_timer();
						}
						
						Game.start_timer();
						
						Engine.log("Game started!");
					}));
				
				pages["main_menu"].add_button(new JS_button(325,275,150,50,"Level Select"
					,function()
					{
						
						page_manager.switch_page("level_select");
					}));
				// setting up default page (It really shouldn't be here)
				current_page = pages["main_menu"];
			},
			
			switch_page: function(id)
			{
				if (pages[id])
				{
					current_page = pages[id];
					Engine.log("Navigated to page: " + id);
				}
			},
			
		}
	}
)();