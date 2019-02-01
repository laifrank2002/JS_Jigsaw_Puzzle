var mouse_handler = (
	function()
	{		
		return {

			activate: function(element)
			{
				element.addEventListener("mousedown", Engine.handle_mouse_down, false);
				element.addEventListener("mouseup", Engine.handle_mouse_up, false);
			},
			
			deactivate: function(element)
			{
				element.removeEventListener("mousedown", Engine.handle_mouse_down, false);
				element.addEventListener("mouseup", Engine.handle_mouse_up, false);
			},
		}
	}
)();