
function JS_label(x,y,text, fontsize, textAlign, id)
{
	this.x = x;
	this.y = y;
	this.text = text;
	this.fontsize = fontsize || Canvas.DEFAULT_FONT_SIZE;
	this.align = textAlign || "center";
	this.id = id;
}

JS_label.prototype.draw = function(context)
{
	// change fontsize if it is different.
	context.font = this.fontsize + "px" + " " + Canvas.DEFAULT_FONT;
	context.beginPath();
	// measure text of current font then center text 
	var metrics = context.measureText(this.text);
	if(this.align ==="center")
	{
		context.fillText(this.text
			,this.x - metrics.width/2
			,this.y + this.fontsize/2); // height is from font.
	}
	else if (this.align === "left")
	{
		context.fillText(this.text
			,this.x
			,this.y + this.fontsize); // height is from font.
	}
	else 
	{
		this.align = "center"; // default
	}
	context.stroke();
	// reset font 
	context.font = Canvas.DEFAULT_FONT_SIZE + "px" + " " + Canvas.DEFAULT_FONT;
}
