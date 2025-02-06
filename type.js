"use strict";

{
	const SDK = globalThis.SDK;
const PLUGIN_CLASS = SDK.Plugins.ValerypopoffTouchPlusPlugin;
	
	PLUGIN_CLASS.Type = class ValerypopoffTouchPlusPluginType extends SDK.ITypeBase
	{
		constructor(sdkPlugin, iObjectType)
		{
			super(sdkPlugin, iObjectType);
		}
	};
}