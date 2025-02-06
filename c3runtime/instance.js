"use strict";

{
	globalThis.C3.Plugins.ValerypopoffTouchPlusPlugin.Instance = class SingleGlobalInstance extends globalThis.ISDKInstanceBase
	{
		
		constructor()
		{
			super();

            const properties = this._getInitProperties();
			
			// Initialise object properties
			this.dontClickThroughObjects = false;
			this.dontClickThroughObjectsOnOtherLayers = false;
			this.dontClickThroughLayers = false;
			this.ignoreInvisibleObjects = false;
			this.ignoreInvisibleLayers = false;			
			
			if (properties)
			{
				this.dontClickThroughObjects = properties[0];
				this.dontClickThroughObjectsOnOtherLayers = properties[1];
				this.dontClickThroughLayers = properties[2];
				this.ignoreInvisibleObjects = properties[3];
				this.ignoreInvisibleLayers = properties[4];
			}

			

			// Highjack System Touch Plugin's conditions

			//console.log(this);

			const touch_condition_names = ["IsTouchingObject"];
			const touch_trigger_names = ["OnDoubleTapGestureObject", "OnHoldGestureObject", "OnTapGestureObject", "OnTouchObject"];
			
			this.TypesLayersWithCoords = function(ptx, pty)
			{
				var TypesLayers = [];
				var JustTypes = [];
				var curr_layout = this._runtime._layoutManager.GetMainRunningLayout();
				var topmost_layer = undefined;

				for(var i=0; i<curr_layout.GetLayers().length; i++)
				{
					var curr_layer = curr_layout.GetLayers()[i];

						//console.log(curr_layer)

					// Ignore Invisible layers
					if( !(this.ignoreInvisibleLayers && (!curr_layer.IsVisible() || curr_layer.GetOpacity()==0 ) ) )
					{
						//if( topmost_layer === undefined )
							topmost_layer = curr_layer;

						for(var k=0; k<curr_layer._GetInstances().length; k++)
						{
							var curr_instance = curr_layer._GetInstances()[k];

							var xy_arr = curr_instance._worldInfo.GetLayer()._CanvasToLayer(ptx, pty, curr_instance._worldInfo.GetTotalZElevation(), this._runtime.GetDisplayScale());

							// Ignore Invisible objects
							var flag = true;
							if( this.ignoreInvisibleObjects && (!curr_instance._worldInfo.IsVisible() || curr_instance._worldInfo.GetOpacity()==0) )
								flag = false;

							if( flag && curr_instance._worldInfo.ContainsPoint(xy_arr[0], xy_arr[1]) )
							{
								TypesLayers.push( [curr_instance.GetObjectClass(), curr_layer] );
								JustTypes.push( curr_instance.GetObjectClass() );
							}
						}
					}
				}

				return { TypesLayers: TypesLayers, topmost_layer: topmost_layer, JustTypes: JustTypes };
			}
			

			function FamilyHasMember( obj, member )
			{
				var family_members_arr = obj.GetFamilyMembers();

				if( !family_members_arr || family_members_arr.length == 0 )
					return false;

				if( family_members_arr.indexOf(member) >= 0 )
					return true;

				return false;
			}

			function FamilyHasMemberFromList( obj, members_list )
			{
				var family_members_arr = obj.GetFamilyMembers();

				if( !family_members_arr || family_members_arr.length == 0 )
					return false;

				//var has = false;
				var exception_found = {}

				try
				{
					family_members_arr.forEach( family_member =>
					{
						members_list.forEach( member => 
						{
							if( family_member == member[0] )
							{
								throw exception_found;
								//has = true;
							}
						})
					})
				} catch( e )
				{
					if( e === exception_found )
						return true
					else
						throw e;
				}

				return false;
			}

			var ValerypopoffTouchPlusPluginInstance = this;

			this.highjack = function()
			{
				//console.log("highjack")
				// Triggers

				//for( var sheet_key of this._runtime._eventSheetManager._sheetsByName.keys() )
				for( var sheet_key of this._runtime.GetEventSheetManager()._sheetsByName.keys() )
				{
					//console.log( "-------------------------" )
					//console.log( "sheet_key", sheet_key )

					var sheet = this._runtime.GetEventSheetManager()._sheetsByName.get(sheet_key);
					//console.log( "sheet._triggers", sheet._triggers )

					for( var ObjectClass_key of sheet._triggers.keys() )
					{
						// Skip plugins other than globalThis.C3.Plugins.Touch
						if( !ObjectClass_key || !( ObjectClass_key.GetPlugin() instanceof globalThis.C3.Plugins.Touch ) )
							continue;

						var trigger_map = sheet._triggers.get(ObjectClass_key);
						//console.log( "trigger_map", trigger_map )
						//console.log( "ObjectClass_key", ObjectClass_key )

						if( ! (trigger_map instanceof Map) )
							trigger_map = trigger_map.methodMap;

						var trigger_keys = Array.from(trigger_map.keys());

						/*
						if( trigger_map instanceof Map )
							var trigger_keys = Array.from(trigger_map.keys());
						else
							var trigger_keys = Array.from(trigger_map.methodMap.keys());
						*/
						
						trigger_keys.forEach( trigger_key => 
						{
							//console.log( "-----" )
							//console.log( "trigger_key", trigger_key )

							touch_trigger_names.forEach((trigger_name)=>
							{  
								//console.log( "trigger_name", trigger_name )
								
								//console.log( globalThis.C3.Plugins.Touch.Cnds )

								//console.log( trigger_key == globalThis.C3.Plugins.Touch.Cnds[ trigger_name ] || globalThis.C3.Plugins.Touch.Cnds[ trigger_name ].name == "new_ace" )

								//if( trigger_key == globalThis.C3.Plugins.Touch.Cnds[ trigger_name ] /*|| globalThis.C3.Plugins.Touch.Cnds[ trigger_name ].name == "new_ace"*/ )
								if( trigger_key.name == trigger_name /*|| globalThis.C3.Plugins.Touch.Cnds[ trigger_name ].name == "new_ace"*/ )
								{
									//console.log( "trigger_name", trigger_name )

									//if( globalThis.C3.Plugins.Touch.Cnds[ trigger_name ].name != "new_ace" )

									{
										//console.log( "altering trigger_name", trigger_name )
										//console.log( "globalThis.C3.Plugins.Touch.Cnds[ trigger_name ]: ↓ " )
										//console.log( globalThis.C3.Plugins.Touch.Cnds[ trigger_name ] )

										//console.log( globalThis.C3.Plugins.Touch.Cnds )
										//console.log( "globalThis.C3.Plugins.Touch.Cnds[ trigger_name ]" )
										//console.log( globalThis.C3.Plugins.Touch.Cnds[ trigger_name ] )
										//console.log(trigger_key == globalThis.C3.Plugins.Touch.Cnds[ trigger_name ])


										// changing for the first time
										if( trigger_key == globalThis.C3.Plugins.Touch.Cnds[ trigger_name ] )
											globalThis.C3.Plugins.Touch.Cnds[ "old_" + trigger_name ] = globalThis.C3.Plugins.Touch.Cnds[ trigger_name ];

										//console.log("trigger_map.keys")
										//console.log( Array.from((trigger_map.keys())) )
										var arr = trigger_map.get(trigger_key);
										//console.log( "arr", arr )

										
										trigger_map.delete( trigger_key );


										function new_ace(type)
										{
											//console.log( "this", this )
											//console.log( "type", type )

											var ret = globalThis.C3.Plugins.Touch.Cnds[ "old_" + trigger_name ].apply(this, [type] );

											if( !ret )
												return ret;
											else // ret == true
											{
												var obj = ValerypopoffTouchPlusPluginInstance.TypesLayersWithCoords(this._curTouchX, this._curTouchY);
												var TypesLayers = obj.TypesLayers;
												var JustTypes = obj.JustTypes;

													//console.log(obj);

												if( ValerypopoffTouchPlusPluginInstance.dontClickThroughObjects )
												{
													if( TypesLayers.length == 0 || ( TypesLayers[TypesLayers.length-1][0]!=type && !FamilyHasMember(type, TypesLayers[TypesLayers.length-1][0]) ) )
														return false;
												} 

												if( ValerypopoffTouchPlusPluginInstance.dontClickThroughObjectsOnOtherLayers )
												{
													if( TypesLayers.length == 0 )
														return false;

													var target_layer = undefined;
													TypesLayers.forEach( TypeLayer =>
													{
														if( target_layer == undefined && TypeLayer[0] == type )
															target_layer = TypeLayer[1]; 
													})


													for( var i=TypesLayers.length-1; i>=0; i-- )
													{
														if( TypesLayers[i][0]==type && TypesLayers[i][1] == target_layer)
															break;

														if( TypesLayers[i][0]!=type && !FamilyHasMember(type, TypesLayers[i][0]) && TypesLayers[i][1] != target_layer )
															return false;
													}
												} 

												if( ValerypopoffTouchPlusPluginInstance.dontClickThroughLayers )
												{
														//console.log("dontClickThroughLayers")

													if( TypesLayers.length == 0 )
														return false;

													if( TypesLayers[TypesLayers.length-1][1] != obj.topmost_layer )
														return false;
												} 
												
												if( JustTypes.indexOf(type) == -1 && !FamilyHasMemberFromList(type, TypesLayers) )
													return false;												

												return ret;
											}
										}

										// changing for the first time
										if( trigger_key == globalThis.C3.Plugins.Touch.Cnds[ trigger_name ] )
											globalThis.C3.Plugins.Touch.Cnds[ trigger_name ] = new_ace;

										trigger_map.set( globalThis.C3.Plugins.Touch.Cnds[ trigger_name ], arr );
										//trigger_map.set( new_ace, arr );

										//console.log( "arr", trigger_map.get(globalThis.C3.Plugins.Touch.Cnds[ trigger_name ]) )
									} /*else
									{
										//console.log("trigger_map.keys alternative")
										//console.log( Array.from((trigger_map.keys())) )
										var arr = trigger_map.get(trigger_key);
									} */
																		
									arr.forEach(val=>
									{
										var conditions = val[0].GetConditions();

										conditions.forEach(condition=>
										{
											//console.log( condition );

											if( condition._objectClass && condition._objectClass._plugin instanceof globalThis.C3.Plugins.Touch )
											{
												condition._func = globalThis.C3.Plugins.Touch.Cnds[ trigger_name ];

												condition.Run = globalThis.C3.Plugins.Touch.Cnds[ trigger_name ].
													bind( this._runtime.GetPluginManager().
														GetPluginByConstructorFunction(globalThis.C3.Plugins.Touch).
														GetSingleGlobalInstance().
														GetSdkInstance(), condition._parameters[0].GetObjectClass() )
											}
										})
									})
									
									
								}
								
							})
						})
					}
				}


				// Conditions

				//var lyouts_arr = this._runtime.GetLayoutManager().GetAllLayouts();

				//lyouts_arr.forEach( layout => 
				//{
					//var cnds_map = layout.GetEventSheet().GetEventSheetManager()._cndsBySid;
					var cnds_map = this._runtime.GetEventSheetManager()._cndsBySid;

					touch_condition_names.forEach( touch_condition_name => 
					{
						globalThis.C3.Plugins.Touch.Cnds[ "old_" + touch_condition_name ] = globalThis.C3.Plugins.Touch.Cnds[ touch_condition_name ];

						globalThis.C3.Plugins.Touch.Cnds[ touch_condition_name ] = function(type)
						{
							var ret = globalThis.C3.Plugins.Touch.Cnds[ "old_" + touch_condition_name ].apply(this, [type] );

							if( !ret )
								return ret;
							else // ret == true
							{
								var obj = ValerypopoffTouchPlusPluginInstance.TypesLayersWithCoords(this._curTouchX, this._curTouchY);
								var TypesLayers = obj.TypesLayers;
								var JustTypes = obj.JustTypes;

									//console.log(obj);

								if( ValerypopoffTouchPlusPluginInstance.dontClickThroughObjects )
								{
									if( TypesLayers.length == 0 || ( TypesLayers[TypesLayers.length-1][0]!=type && !FamilyHasMember(type, TypesLayers[TypesLayers.length-1][0]) ) )
										return false;
								} 

								if( ValerypopoffTouchPlusPluginInstance.dontClickThroughObjectsOnOtherLayers )
								{
										if( TypesLayers.length == 0 )
											return false;

										var target_layer = undefined;
										TypesLayers.forEach( TypeLayer =>
										{
											if( target_layer == undefined && TypeLayer[0] == type )
												target_layer = TypeLayer[1]; 
										})


										for( var i=TypesLayers.length-1; i>=0; i-- )
										{
											if( TypesLayers[i][0]==type && TypesLayers[i][1] == target_layer)
												break;

											if( TypesLayers[i][0]!=type && !FamilyHasMember(type, TypesLayers[i][0]) && TypesLayers[i][1] != target_layer )
												return false;
										}
								} 

								if( ValerypopoffTouchPlusPluginInstance.dontClickThroughLayers )
								{
										//console.log("dontClickThroughLayers")

									if( TypesLayers.length == 0 )
										return false;

									if( TypesLayers[TypesLayers.length-1][1] != obj.topmost_layer )
										return false;
								} 
								
								if( JustTypes.indexOf(type) == -1 && !FamilyHasMemberFromList(type, TypesLayers) )
									return false;												

								return ret;
							}
						}

						for( var cnd_key of cnds_map.keys() )
						{
							var cnd = cnds_map.get(cnd_key);

							if( cnd && cnd._objectClass && cnd._objectClass._plugin instanceof globalThis.C3.Plugins.Touch &&
								cnd._func.name == touch_condition_name)
							{
								//console.log(cnd._func)

								cnd._func = globalThis.C3.Plugins.Touch.Cnds[ touch_condition_name ];							
							}
						}
					})
					
					
				//})

				/*
				this._runtime.GetLayoutManager()._allLayouts[0]._eventSheet._eventSheetManager._allSheets.forEach( sheet =>
				{
					sheet._PostInit()
				})	
				*/

				//this._runtime.GetLayoutManager()._allLayouts[0]._eventSheet._eventSheetManager._allSheets.forEach( sheet =>
				this._runtime.GetEventSheetManager()._allSheets.forEach( sheet =>
				{
					function _PostInit()
					{
						function _PostInit(a)
						{
				            //-------
				            if( this instanceof C3.EventScript )
				            	return;

				            if( this instanceof C3.EventInclude )
				            	return;

				            if( this instanceof C3.EventVariable )
				            	return;
				            //---------

				            this._hasElseBlock = !!a,
				            this._IdentifyTopLevelGroup(),
				            this._IdentifySolModifiersIncludingParents(),
				            this._IdentifyTriggerParents();
				            
				            for (const b of this._conditions)
				            {
				            	//-----
				            	if( b.GetObjectClass() && b.GetObjectClass().GetPlugin() instanceof globalThis.C3.Plugins.Touch )
				            	//------
				                	b._PostInit();
				            }
				            
				            /*
				            if (0 < this._actions.length) {
				                let b = !1;
				                for (const c of this._actions)
				                    //c._PostInit(),
				                    c.HasReturnType() && (b = !0);
				                b ? (this._RunActions = this._RunActions_ReturnValue,
				                this._DebugRunActions = this._DebugRunActions_ReturnValue) : (this._RunActions = this._RunActions_Fast,
				                this._DebugRunActions = this._DebugRunActions_Fast)
				            }
				            */
				            
				            const b = this._subEvents;
				            
				            for (let c = 0, d = b.length; c < d; ++c) {
				                const a = c < d - 1 && b[c + 1].IsElseBlock();
				                //b[c]._PostInit(a)
				                _PostInit.call(b[c], a)
				            }
				            
				            this._debugData && this._UpdateCanRunFast(),
				            this._perfRecord && this._GetPerfRecordParent()._GetPerfRecord().children.push(this._perfRecord)
				        }

				        const a = this._events;
				        for (let b = 0, c = a.length; b < c; ++b) {
				            const d = b < c - 1 && a[b + 1]instanceof C3.EventBlock && a[b + 1].IsElseBlock();
				            
				            //a[b]._PostInit(d)
				            _PostInit.call( a[b], d )
					    }
    				}

					_PostInit.call( sheet )
				})	

			
			}

			var initalizer_timer = setInterval( ()=>
			{
				if( !this._runtime.GetPluginManager().GetPluginByConstructorFunction(globalThis.C3.Plugins.Touch) )
					return;

				
				var lyouts_arr = this._runtime.GetLayoutManager().GetAllLayouts();

				if( !lyouts_arr )
					return;

				var notready = false;

/*				lyouts_arr.forEach( layout => 
				{
					var event_sheet_name = layout._eventSheetName;

					if( !this._runtime.GetLayoutManager().GetMainRunningLayout() ||
						!event_sheet_name || 
						!this._runtime.GetEventSheetManager() ||
						!this._runtime.GetEventSheetManager().GetEventSheetByName(event_sheet_name) || 
						!this._runtime.GetEventSheetManager()._cndsBySid  
					  )
						notready = true;

					// if( !layout.GetEventSheet() || !layout.GetEventSheet().GetEventSheetManager() || !layout.GetEventSheet().GetEventSheetManager()._cndsBySid  )
					// 	notready = true;
				})*/

				var mainRunningLayout = this._runtime.GetLayoutManager().GetMainRunningLayout();

				if( !mainRunningLayout ||
					!mainRunningLayout._eventSheetName || 
					!this._runtime.GetEventSheetManager() ||
					!this._runtime.GetEventSheetManager().GetEventSheetByName(mainRunningLayout._eventSheetName) || 
					!this._runtime.GetEventSheetManager()._cndsBySid  
				)
					notready = true;
					  


				if( notready )
					return;
				
				clearTimeout(initalizer_timer);

				this.highjack();
				
			}, 200)
		}

		
		_release()
		{
			super._release();
		}
		
		_saveToJson()
		{
			return {
				// data to be saved for savegames
			};
		}
		
		_loadFromJson(o)
		{
			// load state for savegames
		}
	};
}