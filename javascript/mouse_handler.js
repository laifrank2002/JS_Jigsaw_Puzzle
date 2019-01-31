var mouse_handler = (
	function()
	{		
		return {

			activate: function(element)
			{
				element.addEventListener("mousedown", Engine.handle_click, false);
				element.addEventListener("mouseup", Engine.handle_click, false);
				element.addEventListener("contextmenu", Engine.handle_click, false);
			},
			
			deactivate: function(element)
			{
				element.removeEventListener("mousedown", Engine.handle_click, false);
				element.addEventListener("mouseup", Engine.handle_click, false);
				element.removeEventListener("contextmenu", Engine.handle_click, false);
			},
		}
	}
)();