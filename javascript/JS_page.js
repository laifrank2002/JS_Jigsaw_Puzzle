// a JS Page
function JS_page(draw,handle_mouse_up,handle_mouse_down)
{
	this.draw = draw;
	this.handle_mouse_up = handle_mouse_up;
	this.handle_mouse_down = handle_mouse_down;
	this.buttons = [];
	this.labels = [];
	this.images = [];
}

JS_page.prototype.add_button = function(button)
{
	if (button !== null) this.buttons.push(button);
}

JS_page.prototype.add_label = function(label)
{
	if (label !== null) this.labels.push(label);
}

JS_page.prototype.add_image = function(image)
{
	if (image !== null) this.images.push(image);
}

JS_page.prototype.get_label_by_id = function(id)
{
	for (var label in this.labels)
	{
		if (this.labels[label].id === id) return this.labels[label];
	}
}

JS_page.prototype.get_image_by_id = function(id)
{
	for (var image in this.images)
	{
		if (this.images[image].id === id) return this.images[image];
	}
}