/**
	A puzzle, made up of puzzle pieces.
 */
 // TODO
 // detect for the jig when selecting
 // REFACTOR
 // adding buffers
 // OFFSET X OFFSET Y!
 // popping sound when snapping.
function Puzzle(puzzle_image, width, height, x, y)
{
	this.puzzle_image = puzzle_image;
	this.width = width;
	this.height = height;
	
	this.x = x || 0;
	this.y = y || 0;
	//TODO
	//this.offset_x;
	//this.offset_y;
	
	// new / original
	this.stretch_x = (this.puzzle_image.width / this.width) / (this.puzzle_image.image.width / this.width);
	this.stretch_y = (this.puzzle_image.height / this.height) / (this.puzzle_image.image.height / this.height);
	
	this.pieces = [];
	this.selected_piece = null;
	// init pieces  and original
	for (var x = 0; x < width; x++)
	{
		var line = [];
		for (var y = 0; y < height; y++)
		{
			line.push(new puzzle_piece(this.puzzle_image
				, x * (this.puzzle_image.image.width / this.width)
				, y * (this.puzzle_image.image.height / this.height)
				, (this.puzzle_image.image.width / this.width)
				, (this.puzzle_image.image.height / this.height)
				, x * (this.puzzle_image.width / this.width) + this.x
				, y * (this.puzzle_image.height / this.height) + this.y
				, (this.puzzle_image.width / this.width)
				, (this.puzzle_image.height / this.height)));
			
		}
		this.pieces.push(line);
	}
	
	// for each piece, add edges
	for (var x = 0; x < width; x++)
	{
		for (var y = 0; y < height; y++)
		{
			// set neighbours and check neighbours for juts
			
			// north
			if (y > 0)
			{
				this.pieces[x][y].edges.north.neighbour = this.pieces[x][y-1];
				// add juts
				if (this.pieces[x][y].edges.north.jut === "normal"
					&& this.pieces[x][y-1].edges.south.jut === "normal")
				{
					if (Math.random() > 0.6)
					{
						this.pieces[x][y].edges.north.jut = "tooth";
						this.pieces[x][y-1].edges.south.jut = "hole";
					}
					else 
					{
						this.pieces[x][y].edges.north.jut = "hole";
						this.pieces[x][y-1].edges.south.jut = "tooth";
					}
				}
			}
			// south
			if (y < height - 1)
			{
				this.pieces[x][y].edges.south.neighbour = this.pieces[x][y+1];
				// add juts
				if (this.pieces[x][y].edges.south.jut === "normal"
					&& this.pieces[x][y+1].edges.north.jut === "normal")
				{
					if (Math.random() > 0.3)
					{
						this.pieces[x][y].edges.south.jut = "tooth";
						this.pieces[x][y+1].edges.north.jut = "hole";
					}
					else 
					{
						this.pieces[x][y].edges.south.jut = "hole";
						this.pieces[x][y+1].edges.north.jut = "tooth";
					}
				}
			}
			// east 
			if (x < width - 1)
			{
				this.pieces[x][y].edges.east.neighbour = this.pieces[x+1][y];
				// add juts
				if (this.pieces[x][y].edges.east.jut === "normal"
					&& this.pieces[x+1][y].edges.west.jut === "normal")
				{
					if (Math.random() > 0.2)
					{
						this.pieces[x][y].edges.east.jut = "tooth";
						this.pieces[x+1][y].edges.west.jut = "hole";
					}
					else 
					{
						this.pieces[x][y].edges.east.jut = "hole";
						this.pieces[x+1][y].edges.west.jut = "tooth";
					}
				}
			}
			// west  
			if (x > 0)
			{
				this.pieces[x][y].edges.west.neighbour = this.pieces[x-1][y];
				// add juts
				if (this.pieces[x][y].edges.west.jut === "normal"
					&& this.pieces[x-1][y].edges.east.jut === "normal")
				{
					if (Math.random() > 0.2)
					{
						this.pieces[x][y].edges.west.jut = "tooth";
						this.pieces[x-1][y].edges.east.jut = "hole";
					}
					else 
					{
						this.pieces[x][y].edges.west.jut = "hole";
						this.pieces[x-1][y].edges.east.jut = "tooth";
					}
				}
			}
		}
	} // end of adding edges
	
}

Puzzle.prototype.draw = function(context)
{
	// draw a border around the puzzle.
	context.beginPath();
	context.rect(this.x,this.y,this.puzzle_image.width,this.puzzle_image.height);
	context.stroke();
	// draw pieces in reverse order in order to convey selecting order.
	// draw all snapped first.
	
	for (var x = this.width - 1; x >= 0; x--)
	{
		for (var y = this.height - 1; y >= 0; y--)
		{
			if (this.pieces[x][y].isSnapped)
			{
				this.pieces[x][y].draw(context, this.stretch_x, this.stretch_y);
			}
		}
	}
	
	// then draw unsnapped 
	
	for (var x = this.width - 1; x >= 0; x--)
	{
		for (var y = this.height - 1; y >= 0; y--)
		{
			if (!this.pieces[x][y].isSnapped)
			{
				this.pieces[x][y].draw(context, this.stretch_x, this.stretch_y);
			}
		}
	}
}

Puzzle.prototype.handle_click = function(x,y)
{
	// drop the piece if it exists
	if (this.selected_piece)
	{
		this.selected_piece.snap();
		this.selected_piece = null;
	}
	else 
	{
		var mouseX = x;
		var mouseY = y;
		
		// test unsnapped first 
		
		for (var x = 0; x < this.width; x++)
		{
			for (var y = 0; y < this.height; y++)
			{
				if (!this.pieces[x][y].isSnapped)
				{
					if(this.pieces[x][y].isInBound(mouseX,mouseY))
					{
						this.selected_piece = this.pieces[x][y];
						this.selected_piece.handle_select(mouseX,mouseY);
						Engine.log(this.selected_piece);
						return;
					}
				}
			}
		}
		
		// then test snapped
		
		for (var x = 0; x < this.width; x++)
		{
			for (var y = 0; y < this.height; y++)
			{
				if (this.pieces[x][y].isSnapped)
				{
					if(this.pieces[x][y].isInBound(mouseX,mouseY))
					{
						this.selected_piece = this.pieces[x][y];
						this.selected_piece.handle_select(mouseX,mouseY);
						Engine.log(this.selected_piece);
						return;
					}
				}
			}
		}
	}
}

Puzzle.prototype.handle_selected = function()
{
	if(this.selected_piece)
	{
		this.selected_piece.move(Engine.cursor_x - this.selected_piece.selected_x
			,Engine.cursor_y - this.selected_piece.selected_y);
	}
}

Puzzle.prototype.scramble = function()
{
	for (var x = this.width - 1; x >= 0; x--)
	{
		for (var y = this.height - 1; y >= 0; y--)
		{
			this.pieces[x][y].move(Math.random() * (puzzle_handler.boundingRectangle.width - puzzle_handler.boundingRectangle.x)
				,Math.random() * (puzzle_handler.boundingRectangle.height - puzzle_handler.boundingRectangle.y));
		}
	}
}

Puzzle.prototype.check = function()
{
	var flag = true;
	for (var x = 0; x < this.width; x++)
	{
		for (var y = 0; y < this.height; y++)
		{
			if (!this.pieces[x][y].isSnapped)
			{
				flag = false;
			}
		}
	}
	return flag;
}

Puzzle.prototype.solve = function()
{
	for (var x = 0; x < this.width; x++)
	{
		for (var y = 0; y < this.height; y++)
		{
			if (!this.pieces[x][y].isSnapped)
			{
				this.pieces[x][y].x = this.pieces[x][y].original_x;
				this.pieces[x][y].y = this.pieces[x][y].original_y;
				this.pieces[x][y].snap();
			}
		}
	}
}
