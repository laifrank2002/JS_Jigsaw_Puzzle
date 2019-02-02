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
						// draw all JS_labels in the page
						for (label in this.labels)
						{
							this.labels[label].draw(context);
						}
						// draw all images in the page
						for (image in this.images)
						{
							this.images[image].draw(context);
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
						// draw all JS_labels in the page
						for (label in this.labels)
						{
							this.labels[label].draw(context);
						}
						// draw all images in the page
						for (image in this.images)
						{
							this.images[image].draw(context);
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
					
				pages["level_select"].add_button(new JS_button(25,45,40,40,"1"
					,function()
					{
						page_manager.switch_page("puzzle");
						
						puzzle_handler.set_current_puzzle(Engine.puzzles["level1"]);
						puzzle_handler.scramble();
						Game.reset_timer();
						Game.start_timer();
						
						Engine.log("Started level 1!");
					}));
				
				pages["level_select"].add_button(new JS_button(85,45,40,40,"2"
					,function()
					{
						page_manager.switch_page("puzzle");
						
						puzzle_handler.set_current_puzzle(Engine.puzzles["level2"]);
						puzzle_handler.scramble();
						Game.reset_timer();
						Game.start_timer();
						
						Engine.log("Started level 2!");
					}));
					
				pages["level_select"].add_button(new JS_button(145,45,40,40,"3"
					,function()
					{
						page_manager.switch_page("puzzle");
						
						puzzle_handler.set_current_puzzle(Engine.puzzles["level3"]);
						puzzle_handler.scramble();
						Game.reset_timer();
						Game.start_timer();
						
						Engine.log("Started level 3!");
					}));
					
				pages["level_select"].add_button(new JS_button(205,45,40,40,"4"
					,function()
					{
						page_manager.switch_page("puzzle");
						
						puzzle_handler.set_current_puzzle(Engine.puzzles["level4"]);
						puzzle_handler.scramble();
						Game.reset_timer();
						Game.start_timer();
						
						Engine.log("Started level 4!");
					}));
					
				pages["level_select"].add_label(new JS_label(400,20,"Level Select",24));
				// credits 
				pages["credits"] = new JS_page(function(context,lapse)
					{
						// draw all JS_buttons in the page
						for (button in this.buttons)
						{
							this.buttons[button].draw(context);
						}
						// draw all JS_labels in the page
						for (label in this.labels)
						{
							this.labels[label].draw(context);
						}
						// draw all images in the page
						for (image in this.images)
						{
							this.images[image].draw(context);
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
				
				pages["credits"].add_button(new JS_button(675,425,100,50,"Main Menu"
					,function()
					{
						page_manager.switch_page("main_menu");
					}));
				
				pages["credits"].add_label(new JS_label(400,75,"Thank You for Playing", 30));
				pages["credits"].add_label(new JS_label(400,125,"A special thanks to", 24));
				pages["credits"].add_label(new JS_label(400,160,"Julian Will", 18));
				pages["credits"].add_label(new JS_label(400,180,"https://github.com/LukeCastellan", 18));
				pages["credits"].add_label(new JS_label(400,250,"Sound Effects", 24));
				pages["credits"].add_label(new JS_label(400,285,"Jeremiah Focus", 18));
				pages["credits"].add_label(new JS_label(400,305,"https://twitter.com/MYSTICps", 18));
				
				// create yer own puzzle 
				pages["create_puzzle"] = new JS_page(function(context,lapse)
					{
						// draw all JS_buttons in the page
						for (button in this.buttons)
						{
							this.buttons[button].draw(context);
						}
						// draw all JS_labels in the page
						for (label in this.labels)
						{
							this.labels[label].draw(context);
						}
						// draw all images in the page
						for (image in this.images)
						{
							this.images[image].draw(context);
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
						
				pages["create_puzzle"].add_button(new JS_button(50,200,75,25,"URL:"
					,function()
					{
						var url = prompt("Enter image url:",pages["create_puzzle"].get_label_by_id("url_display").text);
						pages["create_puzzle"].get_label_by_id("url_display").text = url;
						pages["create_puzzle"].get_image_by_id("puzzle_image_preview").set_image(url);
					}));
					
				pages["create_puzzle"].add_button(new JS_button(50,230,75,25,"Width:"
					,function()
					{
						var text = prompt("Enter width:",pages["create_puzzle"].get_label_by_id("width_display").text);
						pages["create_puzzle"].get_label_by_id("width_display").text = text;
					}));	
				pages["create_puzzle"].add_button(new JS_button(50,260,75,25,"Height:"
					,function()
					{
						var text = prompt("Enter height:",pages["create_puzzle"].get_label_by_id("height_display").text);
						pages["create_puzzle"].get_label_by_id("height_display").text = text;
					}));	
				pages["create_puzzle"].add_button(new JS_button(50,290,75,25,"Name:"
					,function()
					{
						var text = prompt("Enter name:",pages["create_puzzle"].get_label_by_id("puzzle_name_display").text);
						pages["create_puzzle"].get_label_by_id("puzzle_name_display").text = text;
					}));
				pages["create_puzzle"].add_button(new JS_button(100,350,150,50,"Create Puzzle!"
					,function()
					{
						// try, else throw up an error
						try 
						{
							var url = pages["create_puzzle"].get_label_by_id("url_display").text;
							var width = parseInt(pages["create_puzzle"].get_label_by_id("width_display").text,10);
							var height = parseInt(pages["create_puzzle"].get_label_by_id("height_display").text,10);
							var name = pages["create_puzzle"].get_label_by_id("puzzle_name_display").text;
							var image = pages["create_puzzle"].get_image_by_id("puzzle_image_preview").image;
							
							Engine.log(url + "," + width + "," + height + "," + name);
							
							// don't overwrite old puzzles!
							if (Engine.puzzles[name])
							{
								throw "Name is already in use!";
							}
							
							var new_puzzle_image = new puzzle_image(url,500,400);
							Engine.puzzles[name] = new Puzzle(new_puzzle_image,width,height,50,50);
							
							page_manager.switch_page("puzzle");
							puzzle_handler.set_current_puzzle(Engine.puzzles[name]);
							puzzle_handler.scramble();
							Game.reset_timer();
							Game.start_timer();
						}
						catch(exception)
						{
							Engine.log(exception)
							pages["create_puzzle"].get_label_by_id("error_display").text = exception;
						}
					}));	
				pages["create_puzzle"].add_button(new JS_button(675,425,100,50,"Main Menu"
					,function()
					{
						page_manager.switch_page("main_menu");
					}));
					
				pages["create_puzzle"].add_label(new JS_label(150,200,"https://www.seedsavers.org/site/img/seo-images/0972-squash-cornfield-pumpkin.jpg",12, "left","url_display"));
				pages["create_puzzle"].add_label(new JS_label(150,230,"10",12, "left","width_display"));
				pages["create_puzzle"].add_label(new JS_label(150,260,"8",12, "left","height_display"));
				pages["create_puzzle"].add_label(new JS_label(150,290,"pumpkin_puzzle",12, "left","puzzle_name_display"));
				pages["create_puzzle"].add_label(new JS_label(150,450,"This is where errors go to be displayed!",18, "left","error_display"));
				
				pages["create_puzzle"].add_image(new JS_image(75,25,"https://www.seedsavers.org/site/img/seo-images/0972-squash-cornfield-pumpkin.jpg"
					,150,150,"puzzle_image_preview"));
				// main menu
				pages["main_menu"] = new JS_page(function(context,lapse)
					{
						// draw all JS_buttons in the page
						for (button in this.buttons)
						{
							this.buttons[button].draw(context);
						}
						// draw all JS_labels in the page
						for (label in this.labels)
						{
							this.labels[label].draw(context);
						}
						// draw all images in the page
						for (image in this.images)
						{
							this.images[image].draw(context);
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
				pages["main_menu"].add_button(new JS_button(325,350,150,50,"Custom Puzzle"
					,function()
					{
						
						page_manager.switch_page("create_puzzle");
					}));
				pages["main_menu"].add_button(new JS_button(325,425,150,50,"Credits"
					,function()
					{
						
						page_manager.switch_page("credits");
					}));
				pages["main_menu"].add_label(new JS_label(400,150,"JS Jigsaw Puzzle",24));
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