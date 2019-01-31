/**
	A puzzle, made up of puzzle pieces.
 */

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
	
	this.draw = function(context)
	{
		// draw pieces
		
		for (var x = 0; x < width; x++)
		{
			for (var y = 0; y < height; y++)
			{
				this.pieces[x][y].draw(context, this.stretch_x, this.stretch_y);
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
			for (var x = 0; x < width; x++)
			{
				for (var y = 0; y < height; y++)
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
	};
	
	this.handle_selected = function()
	{
		if(this.selected_piece)
		{
			this.selected_piece.x = Engine.cursor_x - this.selected_piece.selected_x;
			this.selected_piece.y = Engine.cursor_y - this.selected_piece.selected_y;
			
		}
	};

}

