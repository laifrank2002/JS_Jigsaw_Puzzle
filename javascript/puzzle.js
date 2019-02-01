/**
	A puzzle, made up of puzzle pieces.
 */
// TODO
// ALL THOSE THAT ARE SNAPPED ARE OF A LOWER PRIORITY THAN THOSE THAT AREN'T SNAPPED.
function Puzzle(puzzle_image, width, height)
{
	this.puzzle_image = puzzle_image;
	this.width = width;
	this.height = height;
	
	// new / original
	this.stretch_x = (this.puzzle_image.width / this.width) / (this.puzzle_image.image.width / this.width);
	this.stretch_y = (this.puzzle_image.height / this.height) / (this.puzzle_image.image.height / this.height);
	
	this.pieces = [];
	this.selected_piece = null;
	// init pieces 
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
				, x * (this.puzzle_image.width / this.width)
				, y * (this.puzzle_image.height / this.height)
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
			// check neighbours
			
			// north
			if (y > 0)
			{
				if (this.pieces[x][y].edges.north === "normal"
					&& this.pieces[x][y-1].edges.south === "normal")
				{
					if (Math.random() > 0.6)
					{
						this.pieces[x][y].edges.north = "tooth";
						this.pieces[x][y-1].edges.south = "hole";
					}
					else 
					{
						this.pieces[x][y].edges.north = "hole";
						this.pieces[x][y-1].edges.south = "tooth";
					}
				}
			}
			// south
			if (y < 0)
			{
				if (this.pieces[x][y].edges.south === "normal"
					&& this.pieces[x][y+1].edges.north === "normal")
				{
					if (Math.random() > 0.3)
					{
						this.pieces[x][y].edges.south = "tooth";
						this.pieces[x][y+1].edges.north = "hole";
					}
					else 
					{
						this.pieces[x][y].edges.south = "hole";
						this.pieces[x][y+1].edges.north = "tooth";
					}
				}
			}
			// east 
			if (x < width - 1)
			{
				if (this.pieces[x][y].edges.east === "normal"
					&& this.pieces[x+1][y].edges.west === "normal")
				{
					if (Math.random() > 0.2)
					{
						this.pieces[x][y].edges.east = "tooth";
						this.pieces[x+1][y].edges.west = "hole";
					}
					else 
					{
						this.pieces[x][y].edges.east = "hole";
						this.pieces[x+1][y].edges.west = "tooth";
					}
				}
			}
			// west  
			if (x > 0)
			{
				if (this.pieces[x][y].edges.west === "normal"
					&& this.pieces[x-1][y].edges.east === "normal")
				{
					if (Math.random() > 0.2)
					{
						this.pieces[x][y].edges.west = "tooth";
						this.pieces[x-1][y].edges.east = "hole";
					}
					else 
					{
						this.pieces[x][y].edges.west = "hole";
						this.pieces[x-1][y].edges.east = "tooth";
					}
				}
			}
		}
	} // end of adding edges
	
	
	
	this.draw = function(context)
	{
		// draw pieces in reverse order in order to convey selecting order.
		// draw all snapped first.
		
		for (var x = width - 1; x >= 0; x--)
		{
			for (var y = height - 1; y >= 0; y--)
			{
				if (this.pieces[x][y].isSnapped)
				{
					this.pieces[x][y].draw(context, this.stretch_x, this.stretch_y);
				}
			}
		}
		
		// then draw unsnapped 
		
		for (var x = width - 1; x >= 0; x--)
		{
			for (var y = height - 1; y >= 0; y--)
			{
				if (!this.pieces[x][y].isSnapped)
				{
					this.pieces[x][y].draw(context, this.stretch_x, this.stretch_y);
				}
			}
		}
		
		//this.pieces[1][1].draw(context, this.stretch_x, this.stretch_y);
	};
	
	this.handle_click = function(x, y)
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
			
			for (var x = 0; x < width; x++)
			{
				for (var y = 0; y < height; y++)
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
			
			for (var x = 0; x < width; x++)
			{
				for (var y = 0; y < height; y++)
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
	};
	
	this.handle_selected = function()
	{
		if(this.selected_piece)
		{
			this.selected_piece.x = Engine.cursor_x - this.selected_piece.selected_x;
			this.selected_piece.y = Engine.cursor_y - this.selected_piece.selected_y;
			this.selected_piece.restitute();
		}
	};
	
	this.scramble = function()
	{
		for (var x = width - 1; x >= 0; x--)
		{
			for (var y = height - 1; y >= 0; y--)
			{
				this.pieces[x][y].move(Math.random() * (puzzle_handler.boundingRectangle.width - puzzle_handler.boundingRectangle.x)
					,Math.random() * (puzzle_handler.boundingRectangle.height - puzzle_handler.boundingRectangle.y));
			}
		}
	};
	
	// check if we've won or not.
	this.check = function()
	{
		var flag = true;
		for (var x = 0; x < width; x++)
		{
			for (var y = 0; y < height; y++)
			{
				if (!this.pieces[x][y].isSnapped)
				{
					flag = false;
				}
			}
		}
		return flag;
	}
	
	// solves the puzzle.
	this.solve = function()
	{
		for (var x = 0; x < width; x++)
		{
			for (var y = 0; y < height; y++)
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
}

