function JS_button(x,y,width,height, text, onclick)
{
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.text = text;
	this.onclick = onclick;
}

JS_button.prototype.draw = function(context)
{
	context.beginPath();
	context.rect(this.x,this.y,this.width,this.height);
	// measure text of current font then center text 
	var metrics = context.measureText(this.text);
	// measure the height of the font from the font.
	
	context.fillText(this.text
		,this.x + this.width/2 - metrics.width/2
		,this.y + this.height/2 + Canvas.DEFAULT_FONT_SIZE/2);
	context.stroke();
}

JS_button.prototype.isInBound = function(x,y)
{
	if (x >= this.x 
		&& y > this.y 
		&& x <= this.x + this.width 
		&& y <= this.y + this.height)
	{
		return true;
	}
	return false;
}

JS_button.prototype.handle_click = function(mouseX, mouseY)
{
	this.onclick(mouseX, mouseY);
}