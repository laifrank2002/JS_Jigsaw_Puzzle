/**
	A piece of the puzzle.
	notice, 
	x and y are also the original x and y positions and determines its snap.
 */
function puzzle_piece(puzzle_image, sx, sy, sWidth, sHeight, x, y, width, height)
{
	this.puzzle_image = puzzle_image;
	this.sx = sx;
	this.sy = sy; 
	this.sWidth = sWidth;
	this.sHeight = sHeight;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	
	this.original_x = x;
	this.original_y = y;
	
	this.selected_x = 0;
	this.selected_y = 0;
	// pixel margin for the pieces.
	this.margin = (this.width + this.height)/8;
	
	this.edges = [];
	this.neighbours = [];
	
	this.draw = function(context, stretch_x, stretch_y)
	{
		context.save();
		
		context.beginPath();
		context.lineWidth = 1;
		context.rect(this.x,this.y,this.width,this.height);
		context.stroke();
		context.clip();
		// clip in the image
		context.drawImage(this.puzzle_image.image
			,this.sx - (this.margin / stretch_x)
			,this.sy - (this.margin / stretch_y)
			,this.sWidth + ((this.margin * 2) / stretch_x)
			,this.sHeight + ((this.margin * 2) / stretch_y)
			,this.x - this.margin
			,this.y - this.margin
			,this.width + (this.margin * 2)
			,this.height + (this.margin * 2));
			
		context.restore();
	}
	
	this.isInBound = function(x, y)
	{
		/*
			For another day when I figure out the jig in the saw
		if (x >= this.x - this.margin
			&& y >= this.y - this.margin
			&& x <= this.x + this.width + this.margin
			&& y <= this.y + this.height + this.margin)
		{
			return true;
		}
		return false;
		*/
		if (x >= this.x 
			&& y >= this.y
			&& x < this.x + this.width
			&& y < this.y + this.height)
		{
			return true;
		}
		return false;
	}
	
	this.handle_select = function(x, y)
	{
		this.selected_x = x - this.x;
		this.selected_y = y - this.y;
	}
	
	this.snap = function()
	{
		// if within margins
		if (this.x >= this.original_x - this.margin
			&& this.y >= this.original_y - this.margin
			&& this.x <= this.original_x + this.margin
			&& this.y <= this.original_y + this.margin)
		{
			this.x = this.original_x;
			this.y = this.original_y;
		}
	}
}