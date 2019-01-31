/**
	A puzzle image, having more properties than a regular image.
 */
function puzzle_image (path, width, height)
{
	this.image = new Image();
	this.image.onload = function()
	{
		Engine.log(this.width + "X" + this.height);
	}
	this.image.src = path;
	
	this.width = width;
	this.height = height;
	
}