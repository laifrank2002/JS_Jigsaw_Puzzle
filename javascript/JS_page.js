// a JS Page
function JS_page(draw,handle_mouse_up,handle_mouse_down)
{
	this.draw = draw;
	this.handle_mouse_up = handle_mouse_up;
	this.handle_mouse_down = handle_mouse_down;
	this.buttons = [];
}

JS_page.prototype.add_button = function(button)
{
	if (button !== null) this.buttons.push(button);
}