"use strict";

{
	globalThis.C3.Plugins.ValerypopoffTouchPlusPlugin.Acts =
	{
		SetDontClickThroughObjects( param )
		{
			switch( param )
			{
				case 0: this.dontClickThroughObjects = false; break;
				case 1: this.dontClickThroughObjects = true; break;
				case 2: this.dontClickThroughObjects = !this.dontClickThroughObjects; break;
			}
		},

		SetDontClickThroughObjectsOnOtherLayers( param )
		{
			switch( param )
			{
				case 0: this.dontClickThroughObjectsOnOtherLayers = false; break;
				case 1: this.dontClickThroughObjectsOnOtherLayers = true; break;
				case 2: this.dontClickThroughObjectsOnOtherLayers = !this.dontClickThroughObjectsOnOtherLayers; break;
			}
		},

		SetDontClickThroughLayers( param )
		{
			switch( param )
			{
				case 0: this.dontClickThroughLayers = false; break;
				case 1: this.dontClickThroughLayers = true; break;
				case 2: this.dontClickThroughLayers = !this.dontClickThroughLayers; break;
			}
		},

		SetIgnoreInvisibleObjects( param )
		{
			switch( param )
			{
				case 0: this.ignoreInvisibleObjects = false; break;
				case 1: this.ignoreInvisibleObjects = true; break;
				case 2: this.ignoreInvisibleObjects = !this.ignoreInvisibleObjects; break;
			}
		},

		SetIgnoreInvisibleLayers( param )
		{
			switch( param )
			{
				case 0: this.ignoreInvisibleLayers = false; break;
				case 1: this.ignoreInvisibleLayers = true; break;
				case 2: this.ignoreInvisibleLayers = !this.ignoreInvisibleLayers; break;
			}
		}
	};
}