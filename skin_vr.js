// Garden Gnome Software - VR - Skin
// Pano2VR 7.1.8/20986
// Filename: custom_feather_vr.ggsk
// Generated 2025-08-04T14:52:55

function pano2vrVrSkin(player,base) {
	player.addVariable('node_cloner_vr_hasUp', 2, false, { ignoreInState: 0  });
	player.addVariable('node_cloner_vr_hasDown', 2, false, { ignoreInState: 0  });
	player.addVariable('open_image_hs', 0, "", { ignoreInState: 0  });
	player.addVariable('open_info_hs', 0, "", { ignoreInState: 0  });
	player.addVariable('open_video_hs', 0, "", { ignoreInState: 0  });
	var me=this;
	var skin=this;
	var flag=false;
	var vrSkinAdded=false;
	var hotspotTemplates={};
	var skinKeyPressed = 0;
	this.player=player;
	this.player.vrSkinObj=this;
	this.ggUserdata=player.userdata;
	this.lastSize={ w: -1,h: -1 };
	var basePath="";
	// auto detect base path
	if (base=='?') {
		var scripts = document.getElementsByTagName('script');
		for(var i=0;i<scripts.length;i++) {
			var src=scripts[i].src;
			if (src.indexOf('skin.js')>=0) {
				var p=src.lastIndexOf('/');
				if (p>=0) {
					basePath=src.substr(0,p+1);
				}
			}
		}
	} else
	if (base) {
		basePath=base;
	}
	this.elementMouseDown={};
	this.elementMouseOver={};
	var i;
	var hs,el,els,elo,ela,geometry,material;
	
	this.findElements=function(id,regex) {
		var r=[];
		var stack=[];
		var pat=new RegExp(id,'');
		stack.push(me.skinGroup);
		while(stack.length>0) {
			var e=stack.pop();
			if (regex) {
				if (pat.test(e.userData.ggId)) r.push(e);
			} else {
				if (e.userData.ggId==id) r.push(e);
			}
			if (e.children.length > 0) {
				for(var i=0;i<e.children.length;i++) {
					stack.push(e.children[i]);
				}
			}
		}
		return r;
	}
	
	this.posInSkin=function(el, clonerParent) {
		var curParent = el.parent;
		var pos = {x: el.position.x, y: el.position.y};
		while (curParent && curParent != me.skinGroup) {
			pos.x += curParent.position.x;
			pos.y += curParent.position.y;
			if (curParent.parent) {
				curParent = curParent.parent;
			} else {
				curParent = clonerParent
			}
		}
		return pos;
	}
	
	this._=function(text, params) {
		return player._(text, params);
	}
	this.languageChanged=function() {
		if (!me.skinGroup) return;
		var stack=[];
		stack.push(me.skinGroup);
		while(stack.length>0) {
			var e=stack.pop();
			if (e.userData && e.userData.ggUpdateText) {
				e.userData.ggUpdateText();
			}
			for(var i=0;i<e.children.length;i++) {
				stack.push(e.children[i]);
			}
		}
	}
	player.addListener('languagechanged', this.languageChanged);
	this.getElementVrPosition = function(el, x, y) {
		var vrPos = {};
		var renderableEl = el.parent && (el.parent.type == 'Mesh' || el.parent.type == 'Group');
		switch (el.userData.hanchor) {
			case 0:
			vrPos.x = (renderableEl ? el.parent.position.x : 0) - ((renderableEl ? el.parent.userData.width : 800) / 200.0) + (x / 100.0) + (el.userData.width / 200.0);
			break;
			case 1:
			vrPos.x = (renderableEl ? el.parent.position.x : 0) + (x / 100.0);
			break;
			case 2:
			vrPos.x = (renderableEl ? el.parent.position.x : 0) + ((renderableEl ? el.parent.userData.width : 800) / 200.0) - (x / 100.0) - (el.userData.width / 200.0);
			break;
		}
		switch (el.userData.vanchor) {
			case 0:
			vrPos.y = (renderableEl ? el.parent.position.y : 0) + ((renderableEl ? el.parent.userData.height : 600) / 200.0) - (y / 100.0) - (el.userData.height / 200.0);
			break;
			case 1:
			vrPos.y = (renderableEl ? el.parent.position.y : 0) - (y / 100.0);
			break;
			case 2:
			vrPos.y = (renderableEl ? el.parent.position.y : 0) - ((renderableEl ? el.parent.userData.height : 600) / 200.0) + (y / 100.0) + (el.userData.height / 200.0);
			break;
		}
		vrPos.x += el.userData.curScaleOffX;
		vrPos.y += el.userData.curScaleOffY;
		return vrPos;
	}
	this.skin_nodechangeCallback = function() {
		me.ggUserdata=player.userdata;
	};
	this.addSkin=function() {
		if (me.vrSkinAdded) return;
		me.vrSkinAdded = true;
		var hs='';
		this.ggCurrentTime=new Date().getTime();
		this.skinGroup=player.getSkinGroup();
		el = new THREE.Group();
		el.userData.setOpacityInternal = function(v) {};
		el.translateX(0.07);
		el.translateY(-1.76);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 640;
		el.userData.height = 115;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'thumbnails';
		el.userData.x = 0.07;
		el.userData.y = -1.76;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.010);
		el.renderOrder = 1;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._thumbnails.material) me._thumbnails.material.opacity = v;
			me._thumbnails.visible = (v>0 && me._thumbnails.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._thumbnails.visible
			let parentEl = me._thumbnails.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._thumbnails.userData.opacity = v;
			v = v * me._thumbnails.userData.parentOpacity;
			me._thumbnails.userData.setOpacityInternal(v);
			for (let i = 0; i < me._thumbnails.children.length; i++) {
				let child = me._thumbnails.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._thumbnails.userData.parentOpacity = v;
			v = v * me._thumbnails.userData.opacity
			me._thumbnails.userData.setOpacityInternal(v);
			for (let i = 0; i < me._thumbnails.children.length; i++) {
				let child = me._thumbnails.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._thumbnails = el;
		el.userData.ggId="thumbnails";
		me._thumbnails.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getIsTour() == false))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._thumbnails.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._thumbnails.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._thumbnails.ggCurrentLogicStateVisible == 0) {
			me._thumbnails.visible=((!me._thumbnails.material && Number(me._thumbnails.userData.opacity>0)) || Number(me._thumbnails.material.opacity)>0)?true:false;
			me._thumbnails.userData.visible=true;
				}
				else {
			me._thumbnails.visible=((!me._thumbnails.material && Number(me._thumbnails.userData.opacity>0)) || Number(me._thumbnails.material.opacity)>0)?true:false;
			me._thumbnails.userData.visible=true;
				}
			}
		}
		me._thumbnails.logicBlock_visible();
		me._thumbnails.userData.ggUpdatePosition=function (useTransition) {
		}
		el = new THREE.Group();
		el.userData.setOpacityInternal = function(v) {};
		el.translateX(-2.45);
		el.translateY(0.075);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 150;
		el.userData.height = 100;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'node_cloner_vr';
		el.userData.x = -2.45;
		el.userData.y = 0.075;
		el.userData.hanchor = 0;
		el.userData.vanchor = 0;
		el.translateZ(0.020);
		el.renderOrder = 2;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._node_cloner_vr.material) me._node_cloner_vr.material.opacity = v;
			me._node_cloner_vr.visible = (v>0 && me._node_cloner_vr.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._node_cloner_vr.visible
			let parentEl = me._node_cloner_vr.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._node_cloner_vr.userData.opacity = v;
			v = v * me._node_cloner_vr.userData.parentOpacity;
			me._node_cloner_vr.userData.setOpacityInternal(v);
			for (let i = 0; i < me._node_cloner_vr.children.length; i++) {
				let child = me._node_cloner_vr.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._node_cloner_vr.userData.parentOpacity = v;
			v = v * me._node_cloner_vr.userData.opacity
			me._node_cloner_vr.userData.setOpacityInternal(v);
			for (let i = 0; i < me._node_cloner_vr.children.length; i++) {
				let child = me._node_cloner_vr.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._node_cloner_vr = el;
		el.userData.ggNumRepeat = 1;
		el.userData.ggNumRows = 0;
		el.userData.ggNumCols = 0;
		el.userData.ggUpdating = false;
		el.userData.ggFilter = [];
		el.userData.ggInstances = [];
		el.getFilteredNodes = function(tourNodes, filter) {
			var filteredNodes = [];
			for (var i = 0; i < tourNodes.length; i++) {
				var nodeId = tourNodes[i];
				var passed = true;
				var nodeData = player.getNodeUserdata(nodeId);
				if (filter.length > 0) {
					for (var j=0; j < filter.length; j++) {
						if (nodeData['tags'].indexOf(filter[j].trim()) == -1) passed = false;
					}
				}
				if (passed) {
					filteredNodes.push(nodeId);
				}
			}
			return filteredNodes;
		}
		el.userData.ggUpdate = function(filter) {
			if(me._node_cloner_vr.userData.ggUpdating == true) return;
			me._node_cloner_vr.userData.ggUpdating = true;
			var el=me._node_cloner_vr;
			var curNumRows = 0;
			curNumRows = me._node_cloner_vr.userData.ggNumRepeat;
			if (curNumRows < 1) curNumRows = 1;
			if (typeof filter=='object') {
				el.userData.ggFilter = filter;
			} else {
				filter = el.userData.ggFilter;
			};
			if (me.ggTag) filter.push(me.ggTag);
			filter=filter.sort();
			if ((el.userData.ggNumRows == curNumRows) && (el.userData.ggInstances.length > 0) && (filter.length === el.userData.ggCurrentFilter.length) && (filter.every(function(value, index) { return value === el.userData.ggCurrentFilter[index] }) )) {
				me._node_cloner_vr.userData.ggUpdating = false;
				return;
			} else {
				el.userData.ggNumCols = 1;
				el.userData.ggNumRows = curNumRows;
			var centerOffsetHor = 0;
			var centerOffsetVert = 0;
				me._node_cloner_vr.userData.ggCloneOffsetChanged = false;
			}
			el.userData.ggCurrentFilter = filter;
			el.userData.ggInstances = [];
			el.remove(...el.children);
			var tourNodes = player.getNodeIds();
			var row = 0;
			var column = 0;
			var currentIndex = 0;
			var keepCloning = true;
			me._node_cloner_vr.userData.ggNumFilterPassed = 0;
			var firstNode;
			for (var i = 0; i < el.userData.ggTagTable.length; i++) {
				var cItem = el.userData.ggTagTable[i];
				firstNode = '';
				cItem.nodecount = 0;
				for (var j=0; j < tourNodes.length; j++) {
					var nodeData = player.getNodeUserdata(tourNodes[j]);
					if ((nodeData['tags'].indexOf(cItem.tag) != -1) || (cItem.tag=='')) {
						var passed = true;
						if (filter.length > 0) {
							for (var k=0; k < filter.length; k++) {
								if (nodeData['tags'].indexOf(filter[k].trim()) == -1) passed = false;
							}
						}
						if (passed) {
							cItem.nodecount++;
							if (firstNode == '') firstNode = tourNodes[j];
						}
					}
				}
				cItem.firstnode=firstNode;
				if (cItem.nodecount == 0) continue;
				me._node_cloner_vr.userData.ggNumFilterPassed++;
				var nodeId = {};
				nodeId['tag'] = cItem.tag;
				nodeId['title'] = cItem.title;
				nodeId['description'] = cItem.description;
				nodeId['nodecount'] = cItem.nodecount;
				nodeId['firstnode'] = cItem.firstnode;
				if (!keepCloning || i < me._node_cloner_vr.userData.ggCloneOffset) continue;
				var parameter={};
				parameter.top = -(centerOffsetVert / 100.0) - (row * me._node_cloner_vr.userData.height) / 100.0;
				parameter.left = (centerOffsetHor / 100.0) + (column * me._node_cloner_vr.userData.width) / 100.0;
				parameter.index=currentIndex;
				var inst = new SkinCloner_node_cloner_vr_Class(nodeId, me, el, parameter);
				currentIndex++;
				el.userData.ggInstances.push(inst);
				var bbox = new THREE.Box3().setFromObject(inst.__obj);
				var clonerPosInSkin = skin.posInSkin(me._node_cloner_vr, me.ggParent);
				if (bbox.min.x + clonerPosInSkin.x >= -4 && bbox.max.x + clonerPosInSkin.x <= 4 && bbox.min.y + clonerPosInSkin.y >= -3 && bbox.max.y + clonerPosInSkin.y <= 3) el.add(inst.__obj);
				row++;
				if (row >= el.userData.ggNumRows) {
					row = 0;
					column++;
					el.userData.ggNumCols++;
				}
			}
			me._node_cloner_vr.userData.ggNodeCount = me._node_cloner_vr.userData.ggNumFilterPassed;
			me._node_cloner_vr.userData.ggUpdating = false;
			player.triggerEvent('clonerchanged');
		}
		el.userData.ggFilter = [];
		el.userData.ggTagTable = [
			{tag:"GF_Thumb",title:"Ground Floor",description:""},
			{tag:"apartment_thumb",title:"Apartment Floor",description:""},
			{tag:"12th_thumb",title:"12th Floor",description:""},
			{tag:"Roof_Floor_thumb",title:"Pool",description:""},
			{tag:"Theatre_thumb",title:"Mini theatre",description:""},
			];
		el.userData.ggId="node_cloner_vr";
		me._node_cloner_vr.userData.ggUpdatePosition=function (useTransition) {
		}
		me._thumbnails.add(me._node_cloner_vr);
		width = 0.42;
		height = 0.42;
		roundedRectShape = new THREE.Shape();
		roundedRectShape.moveTo((-width / 2.0) + 0.12, (height / 2.0));
		roundedRectShape.lineTo((width / 2.0) - 0.12, (height / 2.0));
		roundedRectShape.arc(0, -0.12, 0.12, Math.PI / 2.0, 2.0 * Math.PI, true);
		roundedRectShape.lineTo((width / 2.0), (-height / 2.0) + 0.12);
		roundedRectShape.arc(-0.12, 0, 0.12, 2.0 * Math.PI, 3.0 * Math.PI / 2.0, true);
		roundedRectShape.lineTo((-width / 2.0) + 0.12, (-height / 2.0));
		roundedRectShape.arc(0, 0.12, 0.12, 3.0 * Math.PI / 2.0, Math.PI, true);
		roundedRectShape.lineTo((-width / 2.0), (height / 2.0) - 0.12);
		roundedRectShape.arc(0.12, 0, 0.12, Math.PI, Math.PI / 2.0, true);
		geometry = new THREE.ShapeGeometry(roundedRectShape);
		geometry.name = 'page_up_bg_geometry';
		geometry.computeBoundingBox();
		var min = geometry.boundingBox.min;
		var max = geometry.boundingBox.max;
		var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
		var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
		var vertexPositions = geometry.getAttribute('position');
		var vertexUVs = geometry.getAttribute('uv');
		for (var i = 0; i < vertexPositions.count; i++) {
			var v1 = vertexPositions.getX(i);
			var	v2 = vertexPositions.getY(i);
			vertexUVs.setX(i, (v1 + offset.x) / range.x);
			vertexUVs.setY(i, (v2 + offset.y) / range.y);
		}
		geometry.uvsNeedUpdate = true;
		material = new THREE.MeshBasicMaterial( { color: new THREE.Color(0.290196, 0.290196, 0.290196).convertSRGBToLinear(), side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'page_up_bg_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 0.588235;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._page_up_bg.material.opacity = v * me._page_up_bg.userData.backgroundColorAlpha;
			if (me._page_up_bg.userData.ggSubElement) {
				me._page_up_bg.userData.ggSubElement.material.opacity = v
				me._page_up_bg.userData.ggSubElement.visible = (v>0 && me._page_up_bg.userData.visible);
			}
			me._page_up_bg.visible = (v>0 && me._page_up_bg.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._page_up_bg.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._page_up_bg.userData.backgroundColorAlpha = v;
			me._page_up_bg.userData.setOpacity(me._page_up_bg.userData.opacity);
		}
		el.translateX(3.34);
		el.translateY(0.065);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 42;
		el.userData.height = 42;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'page_up_bg';
		el.userData.x = 3.34;
		el.userData.y = 0.065;
		el.userData.hanchor = 2;
		el.userData.vanchor = 0;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._page_up_bg.visible
			let parentEl = me._page_up_bg.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._page_up_bg.userData.opacity = v;
			v = v * me._page_up_bg.userData.parentOpacity;
			me._page_up_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._page_up_bg.children.length; i++) {
				let child = me._page_up_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._page_up_bg.userData.parentOpacity = v;
			v = v * me._page_up_bg.userData.opacity
			me._page_up_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._page_up_bg.children.length; i++) {
				let child = me._page_up_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = false;
		el.userData.visible = false;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._page_up_bg = el;
		el.userData.ggId="page_up_bg";
		me._page_up_bg.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((me.elementMouseOver['page_up_bg'] == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._page_up_bg.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._page_up_bg.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._page_up_bg.ggCurrentLogicStateScaling == 0) {
					me._page_up_bg.userData.transitionValue_scale = {x: 1.2, y: 1.2, z: 1.0};
					for (var i = 0; i < me._page_up_bg.userData.transitions.length; i++) {
						if (me._page_up_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._page_up_bg.userData.transitions[i].interval);
							me._page_up_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._page_up_bg.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._page_up_bg.scale.set(transition_scale.startScale.x + (me._page_up_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._page_up_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._page_up_bg.position.x = (me._page_up_bg.position.x - me._page_up_bg.userData.curScaleOffX) + scaleOffX;
						me._page_up_bg.userData.curScaleOffX = scaleOffX;
						me._page_up_bg.position.y = (me._page_up_bg.position.y - me._page_up_bg.userData.curScaleOffY) + scaleOffY;
						me._page_up_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._page_up_bg.userData.transitions.splice(me._page_up_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._page_up_bg.userData.transitions.push(transition_scale);
				}
				else {
					me._page_up_bg.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._page_up_bg.userData.transitions.length; i++) {
						if (me._page_up_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._page_up_bg.userData.transitions[i].interval);
							me._page_up_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._page_up_bg.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._page_up_bg.scale.set(transition_scale.startScale.x + (me._page_up_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._page_up_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._page_up_bg.position.x = (me._page_up_bg.position.x - me._page_up_bg.userData.curScaleOffX) + scaleOffX;
						me._page_up_bg.userData.curScaleOffX = scaleOffX;
						me._page_up_bg.position.y = (me._page_up_bg.position.y - me._page_up_bg.userData.curScaleOffY) + scaleOffY;
						me._page_up_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._page_up_bg.userData.transitions.splice(me._page_up_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._page_up_bg.userData.transitions.push(transition_scale);
				}
			}
		}
		me._page_up_bg.logicBlock_scaling();
		me._page_up_bg.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('node_cloner_vr_hasUp') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._page_up_bg.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._page_up_bg.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._page_up_bg.ggCurrentLogicStateVisible == 0) {
			me._page_up_bg.visible=((!me._page_up_bg.material && Number(me._page_up_bg.userData.opacity>0)) || Number(me._page_up_bg.material.opacity)>0)?true:false;
			me._page_up_bg.userData.visible=true;
				}
				else {
			me._page_up_bg.visible=false;
			me._page_up_bg.userData.visible=false;
				}
			}
		}
		me._page_up_bg.logicBlock_visible();
		me._page_up_bg.userData.onclick=function (e) {
			skin.findElements('node_cloner_vr')[0].userData.ggGoUp();
		}
		me._page_up_bg.userData.onmouseenter=function (e) {
			me.elementMouseOver['page_up_bg']=true;
			me._page_up_bg.logicBlock_scaling();
		}
		me._page_up_bg.userData.ontouchend=function (e) {
			me._page_up_bg.logicBlock_scaling();
		}
		me._page_up_bg.userData.onmouseleave=function (e) {
			me.elementMouseOver['page_up_bg']=false;
			me._page_up_bg.logicBlock_scaling();
		}
		me._page_up_bg.userData.ggUpdatePosition=function (useTransition) {
		}
		geometry = new THREE.PlaneGeometry(0.42, 0.42, 5, 5 );
		geometry.name = 'page_up_geometry';
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAABUCAYAAAAcaxDBAAABlUlEQVR4nO3bIU5DQRSF4X/62ENlC65LaFC1GAwbYx8YDLaKNKygDlrZRbwO5kHq2+Tec3N+98bM5EvemJsB55xzzjnnnHPOOeecc865crWoje+/Pxdjmz0P/fz+8/B4jDrHrZtFbTz24YPeXkeGr8Vht4o6x60LA71o3s9tWwU1DLQN/QU4TZ9lUMPuUIDFYbfq57YF5tPSqc365rhc7yPPdU2hoFAPNRwUaqGmAIU6qGlAoQZqKlDQR00HCtqoKUFBFzUtKGiipgYFPdT0oKCFKgEKOqgyoKCBKgUK+VHlQCE3qiQo5EWVBYWcqNKgkA81w0zpqo7L9b7N+uZiad7H9hZ1HnnQbMmDXvzyf52mAWBI0ndotvsThEEzYoIoaFZMEATNjAlioNkxQQ'+
	'hUARNEQFUwQQBUCROSg6phQmJQRUxICqqKCQlBlTEhGag6JiQCrYAJSUCrYEIC0EqY4EcLNy8MtCImBI5ApkFaKUzIMVMqgwlwF7Xx0Man/8ezyzqPZ51zzjnnnHPOOeecc8455wr2C/Ymf60AFnZ4AAAAAElFTkSuQmCC');
		texture.colorSpace = player.getVRTextureColorSpace();
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'page_up_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.materialNormal = material;
		el.translateX(-0.01);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 42;
		el.userData.height = 42;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'page_up';
		el.userData.x = -0.01;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.040);
		el.renderOrder = 4;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._page_up.material) me._page_up.material.opacity = v;
			me._page_up.visible = (v>0 && me._page_up.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._page_up.visible
			let parentEl = me._page_up.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._page_up.userData.opacity = v;
			v = v * me._page_up.userData.parentOpacity;
			me._page_up.userData.setOpacityInternal(v);
			for (let i = 0; i < me._page_up.children.length; i++) {
				let child = me._page_up.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._page_up.userData.parentOpacity = v;
			v = v * me._page_up.userData.opacity
			me._page_up.userData.setOpacityInternal(v);
			for (let i = 0; i < me._page_up.children.length; i++) {
				let child = me._page_up.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._page_up = el;
		el.userData.ggId="page_up";
		me._page_up.userData.ggUpdatePosition=function (useTransition) {
		}
		me._page_up_bg.add(me._page_up);
		me._thumbnails.add(me._page_up_bg);
		width = 0.42;
		height = 0.42;
		roundedRectShape = new THREE.Shape();
		roundedRectShape.moveTo((-width / 2.0) + 0.12, (height / 2.0));
		roundedRectShape.lineTo((width / 2.0) - 0.12, (height / 2.0));
		roundedRectShape.arc(0, -0.12, 0.12, Math.PI / 2.0, 2.0 * Math.PI, true);
		roundedRectShape.lineTo((width / 2.0), (-height / 2.0) + 0.12);
		roundedRectShape.arc(-0.12, 0, 0.12, 2.0 * Math.PI, 3.0 * Math.PI / 2.0, true);
		roundedRectShape.lineTo((-width / 2.0) + 0.12, (-height / 2.0));
		roundedRectShape.arc(0, 0.12, 0.12, 3.0 * Math.PI / 2.0, Math.PI, true);
		roundedRectShape.lineTo((-width / 2.0), (height / 2.0) - 0.12);
		roundedRectShape.arc(0.12, 0, 0.12, Math.PI, Math.PI / 2.0, true);
		geometry = new THREE.ShapeGeometry(roundedRectShape);
		geometry.name = 'page_down_bg_geometry';
		geometry.computeBoundingBox();
		var min = geometry.boundingBox.min;
		var max = geometry.boundingBox.max;
		var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
		var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
		var vertexPositions = geometry.getAttribute('position');
		var vertexUVs = geometry.getAttribute('uv');
		for (var i = 0; i < vertexPositions.count; i++) {
			var v1 = vertexPositions.getX(i);
			var	v2 = vertexPositions.getY(i);
			vertexUVs.setX(i, (v1 + offset.x) / range.x);
			vertexUVs.setY(i, (v2 + offset.y) / range.y);
		}
		geometry.uvsNeedUpdate = true;
		material = new THREE.MeshBasicMaterial( { color: new THREE.Color(0.290196, 0.290196, 0.290196).convertSRGBToLinear(), side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'page_down_bg_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 0.588235;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._page_down_bg.material.opacity = v * me._page_down_bg.userData.backgroundColorAlpha;
			if (me._page_down_bg.userData.ggSubElement) {
				me._page_down_bg.userData.ggSubElement.material.opacity = v
				me._page_down_bg.userData.ggSubElement.visible = (v>0 && me._page_down_bg.userData.visible);
			}
			me._page_down_bg.visible = (v>0 && me._page_down_bg.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._page_down_bg.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._page_down_bg.userData.backgroundColorAlpha = v;
			me._page_down_bg.userData.setOpacity(me._page_down_bg.userData.opacity);
		}
		el.translateX(-3.34);
		el.translateY(0.065);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 42;
		el.userData.height = 42;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'page_down_bg';
		el.userData.x = -3.34;
		el.userData.y = 0.065;
		el.userData.hanchor = 0;
		el.userData.vanchor = 0;
		el.translateZ(0.040);
		el.renderOrder = 4;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._page_down_bg.visible
			let parentEl = me._page_down_bg.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._page_down_bg.userData.opacity = v;
			v = v * me._page_down_bg.userData.parentOpacity;
			me._page_down_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._page_down_bg.children.length; i++) {
				let child = me._page_down_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._page_down_bg.userData.parentOpacity = v;
			v = v * me._page_down_bg.userData.opacity
			me._page_down_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._page_down_bg.children.length; i++) {
				let child = me._page_down_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = false;
		el.userData.visible = false;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._page_down_bg = el;
		el.userData.ggId="page_down_bg";
		me._page_down_bg.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((me.elementMouseOver['page_down_bg'] == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._page_down_bg.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._page_down_bg.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._page_down_bg.ggCurrentLogicStateScaling == 0) {
					me._page_down_bg.userData.transitionValue_scale = {x: 1.2, y: 1.2, z: 1.0};
					for (var i = 0; i < me._page_down_bg.userData.transitions.length; i++) {
						if (me._page_down_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._page_down_bg.userData.transitions[i].interval);
							me._page_down_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._page_down_bg.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._page_down_bg.scale.set(transition_scale.startScale.x + (me._page_down_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._page_down_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._page_down_bg.position.x = (me._page_down_bg.position.x - me._page_down_bg.userData.curScaleOffX) + scaleOffX;
						me._page_down_bg.userData.curScaleOffX = scaleOffX;
						me._page_down_bg.position.y = (me._page_down_bg.position.y - me._page_down_bg.userData.curScaleOffY) + scaleOffY;
						me._page_down_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._page_down_bg.userData.transitions.splice(me._page_down_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._page_down_bg.userData.transitions.push(transition_scale);
				}
				else {
					me._page_down_bg.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._page_down_bg.userData.transitions.length; i++) {
						if (me._page_down_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._page_down_bg.userData.transitions[i].interval);
							me._page_down_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._page_down_bg.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._page_down_bg.scale.set(transition_scale.startScale.x + (me._page_down_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._page_down_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._page_down_bg.position.x = (me._page_down_bg.position.x - me._page_down_bg.userData.curScaleOffX) + scaleOffX;
						me._page_down_bg.userData.curScaleOffX = scaleOffX;
						me._page_down_bg.position.y = (me._page_down_bg.position.y - me._page_down_bg.userData.curScaleOffY) + scaleOffY;
						me._page_down_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._page_down_bg.userData.transitions.splice(me._page_down_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._page_down_bg.userData.transitions.push(transition_scale);
				}
			}
		}
		me._page_down_bg.logicBlock_scaling();
		me._page_down_bg.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('node_cloner_vr_hasDown') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._page_down_bg.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._page_down_bg.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._page_down_bg.ggCurrentLogicStateVisible == 0) {
			me._page_down_bg.visible=((!me._page_down_bg.material && Number(me._page_down_bg.userData.opacity>0)) || Number(me._page_down_bg.material.opacity)>0)?true:false;
			me._page_down_bg.userData.visible=true;
				}
				else {
			me._page_down_bg.visible=false;
			me._page_down_bg.userData.visible=false;
				}
			}
		}
		me._page_down_bg.logicBlock_visible();
		me._page_down_bg.userData.onclick=function (e) {
			skin.findElements('node_cloner_vr')[0].userData.ggGoDown();
		}
		me._page_down_bg.userData.onmouseenter=function (e) {
			me.elementMouseOver['page_down_bg']=true;
			me._page_down_bg.logicBlock_scaling();
		}
		me._page_down_bg.userData.ontouchend=function (e) {
			me._page_down_bg.logicBlock_scaling();
		}
		me._page_down_bg.userData.onmouseleave=function (e) {
			me.elementMouseOver['page_down_bg']=false;
			me._page_down_bg.logicBlock_scaling();
		}
		me._page_down_bg.userData.ggUpdatePosition=function (useTransition) {
		}
		geometry = new THREE.PlaneGeometry(0.42, 0.42, 5, 5 );
		geometry.name = 'page_down_geometry';
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAABUCAYAAAAcaxDBAAABmUlEQVR4nO3ZIU4DURSF4f/NsIfKKbiGBZAGVYvBsAckG8OwgirSJdRBK7uImYegBETlkHvPy/ld1Zx8YqbJBeecc84555xzzjnnnHPOueYq0QPm7PrjfRhL99jX6e3z5v4YseEq4qH/0XDYrcapbKksxto/A7cRO7qIh87dcNit6lS2wCJ6izzoBcxT6etT1B7pd+hFzK5ujsv1PmqTLGhGTBAFzYoJgqCZMUEMNDsmCIEqYIIIqAomCIAqYUJyUDVMSAyqiAlJQVUxISGoMiYkA1XHhESgLWBCEtBWMCEBaEuYEAzaGiYEgraICYEnkDqWV/7cgFrAhAZuStkKAz0f0k4/v+tUtsNht4raM1f+KM2c/zbNXDgotIWaAhTaQU0DCm2gpgIFfdR0oK'+
	'CNmhIUdFHTgoImampQ0ENNDwpaqBKgoIMqAwoaqFKgkB9VDhRyo0qCQl5UWVDIiSoNCvlQ5W9Kx+V6X7q64fecsjgfAEOSB4WLqGE1AQrfqD3jHaW+9GV8iN7jnHPOOeecc84555xzzjnXUF8CG36cvR5moAAAAABJRU5ErkJggg==');
		texture.colorSpace = player.getVRTextureColorSpace();
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'page_down_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.materialNormal = material;
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 42;
		el.userData.height = 42;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'page_down';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.050);
		el.renderOrder = 5;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._page_down.material) me._page_down.material.opacity = v;
			me._page_down.visible = (v>0 && me._page_down.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._page_down.visible
			let parentEl = me._page_down.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._page_down.userData.opacity = v;
			v = v * me._page_down.userData.parentOpacity;
			me._page_down.userData.setOpacityInternal(v);
			for (let i = 0; i < me._page_down.children.length; i++) {
				let child = me._page_down.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._page_down.userData.parentOpacity = v;
			v = v * me._page_down.userData.opacity
			me._page_down.userData.setOpacityInternal(v);
			for (let i = 0; i < me._page_down.children.length; i++) {
				let child = me._page_down.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._page_down = el;
		el.userData.ggId="page_down";
		me._page_down.userData.ggUpdatePosition=function (useTransition) {
		}
		me._page_down_bg.add(me._page_down);
		me._thumbnails.add(me._page_down_bg);
		me.skinGroup.add(me._thumbnails);
		el = new THREE.Group();
		el.userData.setOpacityInternal = function(v) {};
		el.translateX(-3.27);
		el.translateY(2.27);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 46;
		el.userData.height = 46;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = '_close_skin';
		el.userData.x = -3.27;
		el.userData.y = 2.27;
		el.userData.hanchor = 0;
		el.userData.vanchor = 0;
		el.translateZ(0.020);
		el.renderOrder = 2;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me.__close_skin.material) me.__close_skin.material.opacity = v;
			me.__close_skin.visible = (v>0 && me.__close_skin.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me.__close_skin.visible
			let parentEl = me.__close_skin.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me.__close_skin.userData.opacity = v;
			v = v * me.__close_skin.userData.parentOpacity;
			me.__close_skin.userData.setOpacityInternal(v);
			for (let i = 0; i < me.__close_skin.children.length; i++) {
				let child = me.__close_skin.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me.__close_skin.userData.parentOpacity = v;
			v = v * me.__close_skin.userData.opacity
			me.__close_skin.userData.setOpacityInternal(v);
			for (let i = 0; i < me.__close_skin.children.length; i++) {
				let child = me.__close_skin.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me.__close_skin = el;
		el.userData.ggId="_close_skin";
		me.__close_skin.userData.ggUpdatePosition=function (useTransition) {
		}
		width = 0.46;
		height = 0.46;
		roundedRectShape = new THREE.Shape();
		roundedRectShape.moveTo((-width / 2.0) + 0.12, (height / 2.0));
		roundedRectShape.lineTo((width / 2.0) - 0.12, (height / 2.0));
		roundedRectShape.arc(0, -0.12, 0.12, Math.PI / 2.0, 2.0 * Math.PI, true);
		roundedRectShape.lineTo((width / 2.0), (-height / 2.0) + 0.12);
		roundedRectShape.arc(-0.12, 0, 0.12, 2.0 * Math.PI, 3.0 * Math.PI / 2.0, true);
		roundedRectShape.lineTo((-width / 2.0) + 0.12, (-height / 2.0));
		roundedRectShape.arc(0, 0.12, 0.12, 3.0 * Math.PI / 2.0, Math.PI, true);
		roundedRectShape.lineTo((-width / 2.0), (height / 2.0) - 0.12);
		roundedRectShape.arc(0.12, 0, 0.12, Math.PI, Math.PI / 2.0, true);
		geometry = new THREE.ShapeGeometry(roundedRectShape);
		geometry.name = 'close_skin_geometry';
		geometry.computeBoundingBox();
		var min = geometry.boundingBox.min;
		var max = geometry.boundingBox.max;
		var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
		var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
		var vertexPositions = geometry.getAttribute('position');
		var vertexUVs = geometry.getAttribute('uv');
		for (var i = 0; i < vertexPositions.count; i++) {
			var v1 = vertexPositions.getX(i);
			var	v2 = vertexPositions.getY(i);
			vertexUVs.setX(i, (v1 + offset.x) / range.x);
			vertexUVs.setY(i, (v2 + offset.y) / range.y);
		}
		geometry.uvsNeedUpdate = true;
		material = new THREE.MeshBasicMaterial( { color: new THREE.Color(0.290196, 0.290196, 0.290196).convertSRGBToLinear(), side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'close_skin_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 0.588235;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._close_skin.material.opacity = v * me._close_skin.userData.backgroundColorAlpha;
			if (me._close_skin.userData.ggSubElement) {
				me._close_skin.userData.ggSubElement.material.opacity = v
				me._close_skin.userData.ggSubElement.visible = (v>0 && me._close_skin.userData.visible);
			}
			me._close_skin.visible = (v>0 && me._close_skin.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._close_skin.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._close_skin.userData.backgroundColorAlpha = v;
			me._close_skin.userData.setOpacity(me._close_skin.userData.opacity);
		}
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 46;
		el.userData.height = 46;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'close_skin';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._close_skin.visible
			let parentEl = me._close_skin.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._close_skin.userData.opacity = v;
			v = v * me._close_skin.userData.parentOpacity;
			me._close_skin.userData.setOpacityInternal(v);
			for (let i = 0; i < me._close_skin.children.length; i++) {
				let child = me._close_skin.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._close_skin.userData.parentOpacity = v;
			v = v * me._close_skin.userData.opacity
			me._close_skin.userData.setOpacityInternal(v);
			for (let i = 0; i < me._close_skin.children.length; i++) {
				let child = me._close_skin.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._close_skin = el;
		el.userData.ggId="close_skin";
		me._close_skin.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((me.elementMouseOver['close_skin'] == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._close_skin.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._close_skin.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._close_skin.ggCurrentLogicStateScaling == 0) {
					me._close_skin.userData.transitionValue_scale = {x: 1.2, y: 1.2, z: 1.0};
					for (var i = 0; i < me._close_skin.userData.transitions.length; i++) {
						if (me._close_skin.userData.transitions[i].property == 'scale') {
							clearInterval(me._close_skin.userData.transitions[i].interval);
							me._close_skin.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._close_skin.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._close_skin.scale.set(transition_scale.startScale.x + (me._close_skin.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._close_skin.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._close_skin.position.x = (me._close_skin.position.x - me._close_skin.userData.curScaleOffX) + scaleOffX;
						me._close_skin.userData.curScaleOffX = scaleOffX;
						me._close_skin.position.y = (me._close_skin.position.y - me._close_skin.userData.curScaleOffY) + scaleOffY;
						me._close_skin.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._close_skin.userData.transitions.splice(me._close_skin.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._close_skin.userData.transitions.push(transition_scale);
				}
				else {
					me._close_skin.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._close_skin.userData.transitions.length; i++) {
						if (me._close_skin.userData.transitions[i].property == 'scale') {
							clearInterval(me._close_skin.userData.transitions[i].interval);
							me._close_skin.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._close_skin.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._close_skin.scale.set(transition_scale.startScale.x + (me._close_skin.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._close_skin.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._close_skin.position.x = (me._close_skin.position.x - me._close_skin.userData.curScaleOffX) + scaleOffX;
						me._close_skin.userData.curScaleOffX = scaleOffX;
						me._close_skin.position.y = (me._close_skin.position.y - me._close_skin.userData.curScaleOffY) + scaleOffY;
						me._close_skin.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._close_skin.userData.transitions.splice(me._close_skin.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._close_skin.userData.transitions.push(transition_scale);
				}
			}
		}
		me._close_skin.logicBlock_scaling();
		me._close_skin.userData.onclick=function (e) {
			player.setVRSkinVisibility("0");
		}
		me._close_skin.userData.onmouseenter=function (e) {
			me.elementMouseOver['close_skin']=true;
			me._close_skin.logicBlock_scaling();
		}
		me._close_skin.userData.ontouchend=function (e) {
			me._close_skin.logicBlock_scaling();
		}
		me._close_skin.userData.onmouseleave=function (e) {
			me.elementMouseOver['close_skin']=false;
			me._close_skin.logicBlock_scaling();
		}
		me._close_skin.userData.ggUpdatePosition=function (useTransition) {
		}
		geometry = new THREE.PlaneGeometry(0.44, 0.44, 5, 5 );
		geometry.name = 'close_skin_icon_geometry';
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAABYCAYAAABxlTA0AAAB90lEQVR4nO3cMVLbQBhA4bcZF/gQ9nAVHyMUoeNGNO6gIMfQVTzWIUzBjFKADAwGAtlf+yvzvg4Ka/UsBNbuApIkSZIkSZIkSZIileqv2HWL1Xp5BdDvD1s2m4fqx6gpeLw/ar4YwGq9vCqF61K4Xp2f3dB1i9rHqKbrFqvzs5vjeJ9C11Q98EtlKBdpI49xh3IReZjqgfv9YTuU4W78OmXkE3GHMtz1+8O29qHq34Ph/RPY3V82vydPPLaYwJAzcoMxxQWGXJEbjSU2MOSI3HAM8YGhbeTGb/A0gaHNiSb46ZkuMEx7wgniwtSBYZoTTxIXWgSG2ACJ4kKrwBATIllcaBkY6gZJGBdaB4Y6YZLGhQyB4d8CJY4LWQLD90IljwuZAsPXgs0gLmQLDH'+
	'8XbiZxIWNg+DggMJe4kDUwvBOZ3wBl4Ofz9/LGhcyB4dN5s+xxIXtgeIq8vH151cLj1dzvDr8yx4XgWWVlD3y8Rby+euHxPpxutvqEvLcIf8kF8s+0QH7QCORH5UA+7Ank48pAPnAP5JRRICc9AzltH8iFJ4FcOhXIxX+BXL4aKMFV9P8uwM4Qt/FY3AQzy00wGeOOZr+NK3Pc0YRjjNmrnDkuwGbz0O/uL9/sSJ3bXuWUcUcnIkfw3xnMbbySJEmSJEmSJEmSXvkDirSVZz1JFTMAAAAASUVORK5CYII=');
		texture.colorSpace = player.getVRTextureColorSpace();
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'close_skin_icon_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.materialNormal = material;
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 44;
		el.userData.height = 44;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'close_skin_icon';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.040);
		el.renderOrder = 4;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._close_skin_icon.material) me._close_skin_icon.material.opacity = v;
			me._close_skin_icon.visible = (v>0 && me._close_skin_icon.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._close_skin_icon.visible
			let parentEl = me._close_skin_icon.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._close_skin_icon.userData.opacity = v;
			v = v * me._close_skin_icon.userData.parentOpacity;
			me._close_skin_icon.userData.setOpacityInternal(v);
			for (let i = 0; i < me._close_skin_icon.children.length; i++) {
				let child = me._close_skin_icon.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._close_skin_icon.userData.parentOpacity = v;
			v = v * me._close_skin_icon.userData.opacity
			me._close_skin_icon.userData.setOpacityInternal(v);
			for (let i = 0; i < me._close_skin_icon.children.length; i++) {
				let child = me._close_skin_icon.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._close_skin_icon = el;
		el.userData.ggId="close_skin_icon";
		me._close_skin_icon.userData.ggUpdatePosition=function (useTransition) {
		}
		me._close_skin.add(me._close_skin_icon);
		me.__close_skin.add(me._close_skin);
		me.player.setVRHideSkinButton(me.__close_skin);
		el = new THREE.Group();
		el.userData.setOpacityInternal = function(v) {};
		el.translateX(-3.27);
		el.translateY(2.27);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 46;
		el.userData.height = 46;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = '_open_skin';
		el.userData.x = -3.27;
		el.userData.y = 2.27;
		el.userData.hanchor = 0;
		el.userData.vanchor = 0;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me.__open_skin.material) me.__open_skin.material.opacity = v;
			me.__open_skin.visible = (v>0 && me.__open_skin.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me.__open_skin.visible
			let parentEl = me.__open_skin.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me.__open_skin.userData.opacity = v;
			v = v * me.__open_skin.userData.parentOpacity;
			me.__open_skin.userData.setOpacityInternal(v);
			for (let i = 0; i < me.__open_skin.children.length; i++) {
				let child = me.__open_skin.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me.__open_skin.userData.parentOpacity = v;
			v = v * me.__open_skin.userData.opacity
			me.__open_skin.userData.setOpacityInternal(v);
			for (let i = 0; i < me.__open_skin.children.length; i++) {
				let child = me.__open_skin.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me.__open_skin = el;
		el.userData.ggId="_open_skin";
		me.__open_skin.userData.ggUpdatePosition=function (useTransition) {
		}
		width = 0.46;
		height = 0.46;
		roundedRectShape = new THREE.Shape();
		roundedRectShape.moveTo((-width / 2.0) + 0.12, (height / 2.0));
		roundedRectShape.lineTo((width / 2.0) - 0.12, (height / 2.0));
		roundedRectShape.arc(0, -0.12, 0.12, Math.PI / 2.0, 2.0 * Math.PI, true);
		roundedRectShape.lineTo((width / 2.0), (-height / 2.0) + 0.12);
		roundedRectShape.arc(-0.12, 0, 0.12, 2.0 * Math.PI, 3.0 * Math.PI / 2.0, true);
		roundedRectShape.lineTo((-width / 2.0) + 0.12, (-height / 2.0));
		roundedRectShape.arc(0, 0.12, 0.12, 3.0 * Math.PI / 2.0, Math.PI, true);
		roundedRectShape.lineTo((-width / 2.0), (height / 2.0) - 0.12);
		roundedRectShape.arc(0.12, 0, 0.12, Math.PI, Math.PI / 2.0, true);
		geometry = new THREE.ShapeGeometry(roundedRectShape);
		geometry.name = 'open_skin_geometry';
		geometry.computeBoundingBox();
		var min = geometry.boundingBox.min;
		var max = geometry.boundingBox.max;
		var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
		var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
		var vertexPositions = geometry.getAttribute('position');
		var vertexUVs = geometry.getAttribute('uv');
		for (var i = 0; i < vertexPositions.count; i++) {
			var v1 = vertexPositions.getX(i);
			var	v2 = vertexPositions.getY(i);
			vertexUVs.setX(i, (v1 + offset.x) / range.x);
			vertexUVs.setY(i, (v2 + offset.y) / range.y);
		}
		geometry.uvsNeedUpdate = true;
		material = new THREE.MeshBasicMaterial( { color: new THREE.Color(0.290196, 0.290196, 0.290196).convertSRGBToLinear(), side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'open_skin_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 0.588235;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._open_skin.material.opacity = v * me._open_skin.userData.backgroundColorAlpha;
			if (me._open_skin.userData.ggSubElement) {
				me._open_skin.userData.ggSubElement.material.opacity = v
				me._open_skin.userData.ggSubElement.visible = (v>0 && me._open_skin.userData.visible);
			}
			me._open_skin.visible = (v>0 && me._open_skin.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._open_skin.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._open_skin.userData.backgroundColorAlpha = v;
			me._open_skin.userData.setOpacity(me._open_skin.userData.opacity);
		}
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 46;
		el.userData.height = 46;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'open_skin';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 0;
		el.userData.vanchor = 0;
		el.translateZ(0.040);
		el.renderOrder = 4;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._open_skin.visible
			let parentEl = me._open_skin.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._open_skin.userData.opacity = v;
			v = v * me._open_skin.userData.parentOpacity;
			me._open_skin.userData.setOpacityInternal(v);
			for (let i = 0; i < me._open_skin.children.length; i++) {
				let child = me._open_skin.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._open_skin.userData.parentOpacity = v;
			v = v * me._open_skin.userData.opacity
			me._open_skin.userData.setOpacityInternal(v);
			for (let i = 0; i < me._open_skin.children.length; i++) {
				let child = me._open_skin.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._open_skin = el;
		el.userData.ggId="open_skin";
		me._open_skin.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((me.elementMouseOver['open_skin'] == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._open_skin.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._open_skin.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._open_skin.ggCurrentLogicStateScaling == 0) {
					me._open_skin.userData.transitionValue_scale = {x: 1.2, y: 1.2, z: 1.0};
					for (var i = 0; i < me._open_skin.userData.transitions.length; i++) {
						if (me._open_skin.userData.transitions[i].property == 'scale') {
							clearInterval(me._open_skin.userData.transitions[i].interval);
							me._open_skin.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._open_skin.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._open_skin.scale.set(transition_scale.startScale.x + (me._open_skin.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._open_skin.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._open_skin.position.x = (me._open_skin.position.x - me._open_skin.userData.curScaleOffX) + scaleOffX;
						me._open_skin.userData.curScaleOffX = scaleOffX;
						me._open_skin.position.y = (me._open_skin.position.y - me._open_skin.userData.curScaleOffY) + scaleOffY;
						me._open_skin.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._open_skin.userData.transitions.splice(me._open_skin.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._open_skin.userData.transitions.push(transition_scale);
				}
				else {
					me._open_skin.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._open_skin.userData.transitions.length; i++) {
						if (me._open_skin.userData.transitions[i].property == 'scale') {
							clearInterval(me._open_skin.userData.transitions[i].interval);
							me._open_skin.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._open_skin.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._open_skin.scale.set(transition_scale.startScale.x + (me._open_skin.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._open_skin.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._open_skin.position.x = (me._open_skin.position.x - me._open_skin.userData.curScaleOffX) + scaleOffX;
						me._open_skin.userData.curScaleOffX = scaleOffX;
						me._open_skin.position.y = (me._open_skin.position.y - me._open_skin.userData.curScaleOffY) + scaleOffY;
						me._open_skin.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._open_skin.userData.transitions.splice(me._open_skin.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._open_skin.userData.transitions.push(transition_scale);
				}
			}
		}
		me._open_skin.logicBlock_scaling();
		me._open_skin.userData.onclick=function (e) {
			player.setVRSkinVisibility("1");
		}
		me._open_skin.userData.onmouseenter=function (e) {
			me.elementMouseOver['open_skin']=true;
			me._open_skin.logicBlock_scaling();
		}
		me._open_skin.userData.ontouchend=function (e) {
			me._open_skin.logicBlock_scaling();
		}
		me._open_skin.userData.onmouseleave=function (e) {
			me.elementMouseOver['open_skin']=false;
			me._open_skin.logicBlock_scaling();
		}
		me._open_skin.userData.ggUpdatePosition=function (useTransition) {
		}
		geometry = new THREE.PlaneGeometry(0.44, 0.44, 5, 5 );
		geometry.name = 'open_skin_icon_geometry';
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAABYCAYAAABxlTA0AAADhUlEQVR4nO3Xz28TRxQH8O/bGEKMOCDqpMiOnU0gjapKSFEU2yFU9F4EFxBqcygihDOq1FP/gkotNyRIKg5VKhVOyb+QNHEQl4oDEBoSe+NCnVY9IFwr/vF62LGzokSQWXPi+zlEmTczb3ae17NrgIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIjeb9KOJAlvKY6qc+Tgdm398dD4i3bk/B+909G3kTgOABt9m08gF+rvYpmPHi0eerk/4mJf4+/N3rFi2HyhCpzM5z5GHTMAsiZUE+BWJdr1zZ8fnngZ9uIAAKqSXF/5EsD3ALpNtATg64KbnoWItmOZnue/HTxQ/vc7BaYAREx4WRy9nO/LPrTNa13g3vXcWVH5BdDO1yRdjTTqp9aOnSzZ5gfQLO'+
	'5NAFd2GTFdcNNXwxZ54Pdfu2tOx4ICg6/prqjgoudm5mxyOzaTEt5SXBS3A8UtK7QAQOH/Gaw6kRmohvuG+Hduq7gC2RLIVmDIldTT3Bdh1oCqVB3nx0Bx1eylbNoHRHE74S3FbdJbFdjZlm8BHDbN+WpnJOb1Z1N1laGdAuiZVH7ltE1+f/qdDvjHQjMwlXdHe/LuaA+gU62oyA9mrJXU2r3PAPkc8D/AusqQ159NVTsjMQDzZthhs+c9syowBOOtBKLXn8VHygBQHEivAnq32aeKU1b5AZgHWre/nGwV3MwMRBQiWnAzM4E7ubv58LOhHToeaN319wA8i4+UHdHrra7AnvfCrsD01uwKrFhs/ttQuXa0eD8KAPG1lUFAzjf7RLBge2EbfZtP4L8tQKGx5HpuEqriP/hykwqNmaElM9aK1GUx0Drv7wE4Wrwfbahc'+
	'a3UF9ryn/DaTEt5S3Kk6D7BzDpcV+pdAegM55wtu+lyYJ3zyaW4CwE87F+sfC4HiQlQn8gPZWds1/A/s3hygZ1oRqCeQDwBETewfjdQ+8ZLjf+w1vdUdvNk7VlTBJQAVE4oKJAlTXAFWt+vbk2FfnwpuehbAdLOt0FiwuACm8/2Zn8OsARHd16hNCrDaivh7aRa3otCvbIoLhDiDPTczJ44OA1gOhGsC3KhEu4afH/90a7e5b01EC276qqhOwBwXRklUJ9rxDgwAa8dOlirRrmEBbgCoBbqWxdFhrz87v9vcN+FP5Ve0+6cyEREREREREREREREREREREREREREREREREb3v/gPi80jAYGkxJQAAAABJRU5ErkJggg==');
		texture.colorSpace = player.getVRTextureColorSpace();
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'open_skin_icon_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.materialNormal = material;
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 44;
		el.userData.height = 44;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'open_skin_icon';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.050);
		el.renderOrder = 5;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._open_skin_icon.material) me._open_skin_icon.material.opacity = v;
			me._open_skin_icon.visible = (v>0 && me._open_skin_icon.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._open_skin_icon.visible
			let parentEl = me._open_skin_icon.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._open_skin_icon.userData.opacity = v;
			v = v * me._open_skin_icon.userData.parentOpacity;
			me._open_skin_icon.userData.setOpacityInternal(v);
			for (let i = 0; i < me._open_skin_icon.children.length; i++) {
				let child = me._open_skin_icon.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._open_skin_icon.userData.parentOpacity = v;
			v = v * me._open_skin_icon.userData.opacity
			me._open_skin_icon.userData.setOpacityInternal(v);
			for (let i = 0; i < me._open_skin_icon.children.length; i++) {
				let child = me._open_skin_icon.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._open_skin_icon = el;
		el.userData.ggId="open_skin_icon";
		me._open_skin_icon.userData.ggUpdatePosition=function (useTransition) {
		}
		me._open_skin.add(me._open_skin_icon);
		me.__open_skin.add(me._open_skin);
		me.player.setVRShowSkinButton(me.__open_skin);
		width = 0.46;
		height = 0.46;
		roundedRectShape = new THREE.Shape();
		roundedRectShape.moveTo((-width / 2.0) + 0.12, (height / 2.0));
		roundedRectShape.lineTo((width / 2.0) - 0.12, (height / 2.0));
		roundedRectShape.arc(0, -0.12, 0.12, Math.PI / 2.0, 2.0 * Math.PI, true);
		roundedRectShape.lineTo((width / 2.0), (-height / 2.0) + 0.12);
		roundedRectShape.arc(-0.12, 0, 0.12, 2.0 * Math.PI, 3.0 * Math.PI / 2.0, true);
		roundedRectShape.lineTo((-width / 2.0) + 0.12, (-height / 2.0));
		roundedRectShape.arc(0, 0.12, 0.12, 3.0 * Math.PI / 2.0, Math.PI, true);
		roundedRectShape.lineTo((-width / 2.0), (height / 2.0) - 0.12);
		roundedRectShape.arc(0.12, 0, 0.12, Math.PI, Math.PI / 2.0, true);
		geometry = new THREE.ShapeGeometry(roundedRectShape);
		geometry.name = 'exit_vr_geometry';
		geometry.computeBoundingBox();
		var min = geometry.boundingBox.min;
		var max = geometry.boundingBox.max;
		var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
		var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
		var vertexPositions = geometry.getAttribute('position');
		var vertexUVs = geometry.getAttribute('uv');
		for (var i = 0; i < vertexPositions.count; i++) {
			var v1 = vertexPositions.getX(i);
			var	v2 = vertexPositions.getY(i);
			vertexUVs.setX(i, (v1 + offset.x) / range.x);
			vertexUVs.setY(i, (v2 + offset.y) / range.y);
		}
		geometry.uvsNeedUpdate = true;
		material = new THREE.MeshBasicMaterial( { color: new THREE.Color(0.290196, 0.290196, 0.290196).convertSRGBToLinear(), side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'exit_vr_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 0.588235;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._exit_vr.material.opacity = v * me._exit_vr.userData.backgroundColorAlpha;
			if (me._exit_vr.userData.ggSubElement) {
				me._exit_vr.userData.ggSubElement.material.opacity = v
				me._exit_vr.userData.ggSubElement.visible = (v>0 && me._exit_vr.userData.visible);
			}
			me._exit_vr.visible = (v>0 && me._exit_vr.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._exit_vr.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._exit_vr.userData.backgroundColorAlpha = v;
			me._exit_vr.userData.setOpacity(me._exit_vr.userData.opacity);
		}
		el.translateX(-3.27);
		el.translateY(1.72);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 46;
		el.userData.height = 46;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'exit_vr';
		el.userData.x = -3.27;
		el.userData.y = 1.72;
		el.userData.hanchor = 1;
		el.userData.vanchor = 2;
		el.translateZ(0.040);
		el.renderOrder = 4;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._exit_vr.visible
			let parentEl = me._exit_vr.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._exit_vr.userData.opacity = v;
			v = v * me._exit_vr.userData.parentOpacity;
			me._exit_vr.userData.setOpacityInternal(v);
			for (let i = 0; i < me._exit_vr.children.length; i++) {
				let child = me._exit_vr.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._exit_vr.userData.parentOpacity = v;
			v = v * me._exit_vr.userData.opacity
			me._exit_vr.userData.setOpacityInternal(v);
			for (let i = 0; i < me._exit_vr.children.length; i++) {
				let child = me._exit_vr.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._exit_vr = el;
		el.userData.ggId="exit_vr";
		me._exit_vr.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((me.elementMouseOver['exit_vr'] == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._exit_vr.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._exit_vr.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._exit_vr.ggCurrentLogicStateScaling == 0) {
					me._exit_vr.userData.transitionValue_scale = {x: 1.2, y: 1.2, z: 1.0};
					for (var i = 0; i < me._exit_vr.userData.transitions.length; i++) {
						if (me._exit_vr.userData.transitions[i].property == 'scale') {
							clearInterval(me._exit_vr.userData.transitions[i].interval);
							me._exit_vr.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._exit_vr.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._exit_vr.scale.set(transition_scale.startScale.x + (me._exit_vr.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._exit_vr.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._exit_vr.position.x = (me._exit_vr.position.x - me._exit_vr.userData.curScaleOffX) + scaleOffX;
						me._exit_vr.userData.curScaleOffX = scaleOffX;
						me._exit_vr.position.y = (me._exit_vr.position.y - me._exit_vr.userData.curScaleOffY) + scaleOffY;
						me._exit_vr.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._exit_vr.userData.transitions.splice(me._exit_vr.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._exit_vr.userData.transitions.push(transition_scale);
				}
				else {
					me._exit_vr.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._exit_vr.userData.transitions.length; i++) {
						if (me._exit_vr.userData.transitions[i].property == 'scale') {
							clearInterval(me._exit_vr.userData.transitions[i].interval);
							me._exit_vr.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._exit_vr.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._exit_vr.scale.set(transition_scale.startScale.x + (me._exit_vr.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._exit_vr.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._exit_vr.position.x = (me._exit_vr.position.x - me._exit_vr.userData.curScaleOffX) + scaleOffX;
						me._exit_vr.userData.curScaleOffX = scaleOffX;
						me._exit_vr.position.y = (me._exit_vr.position.y - me._exit_vr.userData.curScaleOffY) + scaleOffY;
						me._exit_vr.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._exit_vr.userData.transitions.splice(me._exit_vr.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._exit_vr.userData.transitions.push(transition_scale);
				}
			}
		}
		me._exit_vr.logicBlock_scaling();
		me._exit_vr.userData.onclick=function (e) {
			player.exitVR();
			player.setVRSkinVisibility("0");
		}
		me._exit_vr.userData.onmouseenter=function (e) {
			me.elementMouseOver['exit_vr']=true;
			me._exit_vr.logicBlock_scaling();
		}
		me._exit_vr.userData.ontouchend=function (e) {
			me._exit_vr.logicBlock_scaling();
		}
		me._exit_vr.userData.onmouseleave=function (e) {
			me.elementMouseOver['exit_vr']=false;
			me._exit_vr.logicBlock_scaling();
		}
		me._exit_vr.userData.ggUpdatePosition=function (useTransition) {
		}
		geometry = new THREE.PlaneGeometry(0.37, 0.37, 5, 5 );
		geometry.name = 'exit_vr_icon_geometry';
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,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');
		texture.colorSpace = player.getVRTextureColorSpace();
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'exit_vr_icon_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.materialNormal = material;
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 37;
		el.userData.height = 37;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'exit_vr_icon';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.050);
		el.renderOrder = 5;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._exit_vr_icon.material) me._exit_vr_icon.material.opacity = v;
			me._exit_vr_icon.visible = (v>0 && me._exit_vr_icon.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._exit_vr_icon.visible
			let parentEl = me._exit_vr_icon.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._exit_vr_icon.userData.opacity = v;
			v = v * me._exit_vr_icon.userData.parentOpacity;
			me._exit_vr_icon.userData.setOpacityInternal(v);
			for (let i = 0; i < me._exit_vr_icon.children.length; i++) {
				let child = me._exit_vr_icon.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._exit_vr_icon.userData.parentOpacity = v;
			v = v * me._exit_vr_icon.userData.opacity
			me._exit_vr_icon.userData.setOpacityInternal(v);
			for (let i = 0; i < me._exit_vr_icon.children.length; i++) {
				let child = me._exit_vr_icon.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._exit_vr_icon = el;
		el.userData.ggId="exit_vr_icon";
		me._exit_vr_icon.userData.ggUpdatePosition=function (useTransition) {
		}
		me._exit_vr.add(me._exit_vr_icon);
		me.skinGroup.add(me._exit_vr);
		geometry = new THREE.PlaneGeometry(2.39, 1.76, 5, 5 );
		geometry.name = 'Image 1_geometry';
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,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');
		texture.colorSpace = player.getVRTextureColorSpace();
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true, } );
		material.name = 'Image 1_material';
		el = new THREE.Mesh( geometry, material );
		el.translateX(3.195);
		el.translateY(2.29);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 239;
		el.userData.height = 176;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'Image 1';
		el.userData.x = 3.195;
		el.userData.y = 2.29;
		el.userData.hanchor = 2;
		el.userData.vanchor = 0;
		el.translateZ(0.050);
		el.renderOrder = 5;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._image_1.material) me._image_1.material.opacity = v;
			me._image_1.visible = (v>0 && me._image_1.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._image_1.visible
			let parentEl = me._image_1.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._image_1.userData.opacity = v;
			v = v * me._image_1.userData.parentOpacity;
			me._image_1.userData.setOpacityInternal(v);
			for (let i = 0; i < me._image_1.children.length; i++) {
				let child = me._image_1.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._image_1.userData.parentOpacity = v;
			v = v * me._image_1.userData.opacity
			me._image_1.userData.setOpacityInternal(v);
			for (let i = 0; i < me._image_1.children.length; i++) {
				let child = me._image_1.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._image_1 = el;
		el.userData.ggId="Image 1";
		me._image_1.userData.ggUpdatePosition=function (useTransition) {
		}
		me.skinGroup.add(me._image_1);
		me._thumbnails.logicBlock_visible();
		me._thumbnails.userData.setOpacity(1.00);
		me._node_cloner_vr.userData.setOpacity(1.00);
		me._node_cloner_vr.userData.ggUpdate();
		me._page_up_bg.logicBlock_scaling();
		me._page_up_bg.logicBlock_visible();
		me._page_up_bg.userData.setOpacity(1.00);
		me.elementMouseOver['page_up_bg']=false;
		me._page_up.userData.setOpacity(1.00);
		me._page_down_bg.logicBlock_scaling();
		me._page_down_bg.logicBlock_visible();
		me._page_down_bg.userData.setOpacity(1.00);
		me.elementMouseOver['page_down_bg']=false;
		me._page_down.userData.setOpacity(1.00);
		me._close_skin.logicBlock_scaling();
		me._close_skin.userData.setOpacity(1.00);
		me.elementMouseOver['close_skin']=false;
		me._close_skin_icon.userData.setOpacity(1.00);
		me._open_skin.logicBlock_scaling();
		me._open_skin.userData.setOpacity(1.00);
		me.elementMouseOver['open_skin']=false;
		me._open_skin_icon.userData.setOpacity(1.00);
		me._exit_vr.logicBlock_scaling();
		me._exit_vr.userData.setOpacity(1.00);
		me.elementMouseOver['exit_vr']=false;
		me._exit_vr_icon.userData.setOpacity(1.00);
		me._image_1.userData.setOpacity(1.00);
		me.eventactivehotspotchangedCallback = function() {
			for(var i = 0; i < me._node_cloner_vr.userData.ggInstances.length; i++) {
				me._node_cloner_vr.userData.ggInstances[i].ggEvent_activehotspotchanged();
			}
			if (hotspotTemplates.hasOwnProperty('ht_node')) {
				for(var i = 0; i < hotspotTemplates['ht_node'].length; i++) {
					hotspotTemplates['ht_node'][i].ggEvent_activehotspotchanged();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_image')) {
				for(var i = 0; i < hotspotTemplates['ht_image'].length; i++) {
					hotspotTemplates['ht_image'][i].ggEvent_activehotspotchanged();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_info')) {
				for(var i = 0; i < hotspotTemplates['ht_info'].length; i++) {
					hotspotTemplates['ht_info'][i].ggEvent_activehotspotchanged();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_video_file')) {
				for(var i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
					hotspotTemplates['ht_video_file'][i].ggEvent_activehotspotchanged();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_video_url')) {
				for(var i = 0; i < hotspotTemplates['ht_video_url'].length; i++) {
					hotspotTemplates['ht_video_url'][i].ggEvent_activehotspotchanged();
				}
			}
		};
		player.addListener('activehotspotchanged', me.eventactivehotspotchangedCallback);
		me.eventchangenodeCallback = function() {
			for(var i = 0; i < me._node_cloner_vr.userData.ggInstances.length; i++) {
				me._node_cloner_vr.userData.ggInstances[i].ggEvent_changenode();
			}
			if (hotspotTemplates.hasOwnProperty('ht_node')) {
				for(var i = 0; i < hotspotTemplates['ht_node'].length; i++) {
					hotspotTemplates['ht_node'][i].ggEvent_changenode();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_image')) {
				for(var i = 0; i < hotspotTemplates['ht_image'].length; i++) {
					hotspotTemplates['ht_image'][i].ggEvent_changenode();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_info')) {
				for(var i = 0; i < hotspotTemplates['ht_info'].length; i++) {
					hotspotTemplates['ht_info'][i].ggEvent_changenode();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_video_file')) {
				for(var i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
					hotspotTemplates['ht_video_file'][i].ggEvent_changenode();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_video_url')) {
				for(var i = 0; i < hotspotTemplates['ht_video_url'].length; i++) {
					hotspotTemplates['ht_video_url'][i].ggEvent_changenode();
				}
			}
			me.skin_nodechangeCallback();
			me._page_up_bg.logicBlock_visible();
			me._page_down_bg.logicBlock_visible();
		};
		player.addListener('changenode', me.eventchangenodeCallback);
		me.eventconfigloadedCallback = function() {
			for(var i = 0; i < me._node_cloner_vr.userData.ggInstances.length; i++) {
				me._node_cloner_vr.userData.ggInstances[i].ggEvent_configloaded();
			}
			if (hotspotTemplates.hasOwnProperty('ht_node')) {
				for(var i = 0; i < hotspotTemplates['ht_node'].length; i++) {
					hotspotTemplates['ht_node'][i].ggEvent_configloaded();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_image')) {
				for(var i = 0; i < hotspotTemplates['ht_image'].length; i++) {
					hotspotTemplates['ht_image'][i].ggEvent_configloaded();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_info')) {
				for(var i = 0; i < hotspotTemplates['ht_info'].length; i++) {
					hotspotTemplates['ht_info'][i].ggEvent_configloaded();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_video_file')) {
				for(var i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
					hotspotTemplates['ht_video_file'][i].ggEvent_configloaded();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_video_url')) {
				for(var i = 0; i < hotspotTemplates['ht_video_url'].length; i++) {
					hotspotTemplates['ht_video_url'][i].ggEvent_configloaded();
				}
			}
			me._thumbnails.logicBlock_visible();
			me._page_up_bg.logicBlock_visible();
			me._page_down_bg.logicBlock_visible();
		};
		player.addListener('configloaded', me.eventconfigloadedCallback);
		me.eventvarchanged_node_cloner_vr_hasDownCallback = function() {
			me._page_down_bg.logicBlock_visible();
		};
		player.addListener('varchanged_node_cloner_vr_hasDown', me.eventvarchanged_node_cloner_vr_hasDownCallback);
		me.eventvarchanged_node_cloner_vr_hasUpCallback = function() {
			me._page_up_bg.logicBlock_visible();
		};
		player.addListener('varchanged_node_cloner_vr_hasUp', me.eventvarchanged_node_cloner_vr_hasUpCallback);
		me.eventvarchanged_open_image_hsCallback = function() {
			if (hotspotTemplates.hasOwnProperty('ht_image')) {
				for(var i = 0; i < hotspotTemplates['ht_image'].length; i++) {
					hotspotTemplates['ht_image'][i].ggEvent_varchanged_open_image_hs();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_info')) {
				for(var i = 0; i < hotspotTemplates['ht_info'].length; i++) {
					hotspotTemplates['ht_info'][i].ggEvent_varchanged_open_image_hs();
				}
			}
		};
		player.addListener('varchanged_open_image_hs', me.eventvarchanged_open_image_hsCallback);
		me.eventvarchanged_open_info_hsCallback = function() {
			if (hotspotTemplates.hasOwnProperty('ht_info')) {
				for(var i = 0; i < hotspotTemplates['ht_info'].length; i++) {
					hotspotTemplates['ht_info'][i].ggEvent_varchanged_open_info_hs();
				}
			}
		};
		player.addListener('varchanged_open_info_hs', me.eventvarchanged_open_info_hsCallback);
		me.eventvarchanged_open_video_hsCallback = function() {
			if (hotspotTemplates.hasOwnProperty('ht_video_file')) {
				for(var i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
					hotspotTemplates['ht_video_file'][i].ggEvent_varchanged_open_video_hs();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_video_url')) {
				for(var i = 0; i < hotspotTemplates['ht_video_url'].length; i++) {
					hotspotTemplates['ht_video_url'][i].ggEvent_varchanged_open_video_hs();
				}
			}
		};
		player.addListener('varchanged_open_video_hs', me.eventvarchanged_open_video_hsCallback);
	};
	this.removeSkin=function() {
	};
	function SkinCloner_node_cloner_vr_Class(item, parentScope, ggParent, parameter) {
		var me=this;
		me.parentScope=parentScope;
		me.ggParent=ggParent;
		me.findElements=skin.findElements;
		me.ggIndex=parameter.index;
		me.ggTag = item['tag'];
		me.ggTitle = item['title'];
		me.ggDescription = item['description'];
		me.ggNodeCount = item['nodecount'];
		me.ggNodeId=item['firstnode'];
		me.ggUserdata=skin.player.getNodeUserdata(me.ggNodeId);
		me.ggUserdata.nodeId=me.ggNodeId;
		me.elementMouseDown={};
		me.elementMouseOver={};
			me.__obj = new THREE.Group;
			me.__obj.name = 'node_cloner_vr_subElement';
			me.__obj.position.x = parameter.left;
			me.__obj.position.y = parameter.top;
			me.__obj.userData.ggIsActive = function() {
				var tags = player.userdata.tags;
				if (tags.indexOf(me.ggTag) == -1) return false;
				for(var i=0;i<me.parent.userData.ggCurrentFilter.length;i++) {
					if (tags.indexOf(me.parent.userData.ggCurrentFilter[i])==-1) return false;
				}
				return true;
			}
			me.__obj.userData.ggElementNodeId=function() {
				return me.userData.ggNodeId;
			}
		width = 1.5;
		height = 0.92;
		roundedRectShape = new THREE.Shape();
		roundedRectShape.moveTo((-width / 2.0) + 0.2, (height / 2.0));
		roundedRectShape.lineTo((width / 2.0) - 0.2, (height / 2.0));
		roundedRectShape.arc(0, -0.2, 0.2, Math.PI / 2.0, 2.0 * Math.PI, true);
		roundedRectShape.lineTo((width / 2.0), (-height / 2.0) + 0.2);
		roundedRectShape.arc(-0.2, 0, 0.2, 2.0 * Math.PI, 3.0 * Math.PI / 2.0, true);
		roundedRectShape.lineTo((-width / 2.0) + 0.2, (-height / 2.0));
		roundedRectShape.arc(0, 0.2, 0.2, 3.0 * Math.PI / 2.0, Math.PI, true);
		roundedRectShape.lineTo((-width / 2.0), (height / 2.0) - 0.2);
		roundedRectShape.arc(0.2, 0, 0.2, Math.PI, Math.PI / 2.0, true);
		geometry = new THREE.ShapeGeometry(roundedRectShape);
		geometry.name = 'node_image_geometry';
		geometry.computeBoundingBox();
		var min = geometry.boundingBox.min;
		var max = geometry.boundingBox.max;
		var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
		var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
		var vertexPositions = geometry.getAttribute('position');
		var vertexUVs = geometry.getAttribute('uv');
		for (var i = 0; i < vertexPositions.count; i++) {
			var v1 = vertexPositions.getX(i);
			var	v2 = vertexPositions.getY(i);
			vertexUVs.setX(i, (v1 + offset.x) / range.x);
			vertexUVs.setY(i, (v2 + offset.y) / range.y);
		}
		geometry.uvsNeedUpdate = true;
		loader = new THREE.TextureLoader();
		el.userData.ggNodeId=nodeId;
		texture = loader.load(basePath + 'images_vr/node_image_' + nodeId + '.webp');
		texture.colorSpace = player.getVRTextureColorSpace();
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'node_image_material';
		el = new THREE.Mesh( geometry, material );
		el.translateX(0);
		el.translateY(0);
		el.scale.set(0.87, 0.87, 1.0);
		el.userData.width = 150;
		el.userData.height = 92;
		el.userData.scale = {x: 0.87, y: 0.87, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'node_image';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.010);
		el.renderOrder = 1;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._node_image.material) me._node_image.material.opacity = v;
			me._node_image.visible = (v>0 && me._node_image.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._node_image.visible
			let parentEl = me._node_image.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._node_image.userData.opacity = v;
			v = v * me._node_image.userData.parentOpacity;
			me._node_image.userData.setOpacityInternal(v);
			for (let i = 0; i < me._node_image.children.length; i++) {
				let child = me._node_image.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._node_image.userData.parentOpacity = v;
			v = v * me._node_image.userData.opacity
			me._node_image.userData.setOpacityInternal(v);
			for (let i = 0; i < me._node_image.children.length; i++) {
				let child = me._node_image.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._node_image = el;
		el.userData.ggId="node_image";
		me._node_image.userData.ggIsActive=function() {
			return player.getCurrentNode()==this.userData.ggElementNodeId();
		}
		el.userData.ggElementNodeId=function() {
			return this.userData.ggNodeId;
		}
		me._node_image.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((me.elementMouseOver['node_image'] == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._node_image.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._node_image.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._node_image.ggCurrentLogicStateScaling == 0) {
					me._node_image.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._node_image.userData.transitions.length; i++) {
						if (me._node_image.userData.transitions[i].property == 'scale') {
							clearInterval(me._node_image.userData.transitions[i].interval);
							me._node_image.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._node_image.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._node_image.scale.set(transition_scale.startScale.x + (me._node_image.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._node_image.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._node_image.position.x = (me._node_image.position.x - me._node_image.userData.curScaleOffX) + scaleOffX;
						me._node_image.userData.curScaleOffX = scaleOffX;
						me._node_image.position.y = (me._node_image.position.y - me._node_image.userData.curScaleOffY) + scaleOffY;
						me._node_image.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._node_image.userData.transitions.splice(me._node_image.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._node_image.userData.transitions.push(transition_scale);
				}
				else {
					me._node_image.userData.transitionValue_scale = {x: 0.87, y: 0.87, z: 1.0};
					for (var i = 0; i < me._node_image.userData.transitions.length; i++) {
						if (me._node_image.userData.transitions[i].property == 'scale') {
							clearInterval(me._node_image.userData.transitions[i].interval);
							me._node_image.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._node_image.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._node_image.scale.set(transition_scale.startScale.x + (me._node_image.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._node_image.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._node_image.position.x = (me._node_image.position.x - me._node_image.userData.curScaleOffX) + scaleOffX;
						me._node_image.userData.curScaleOffX = scaleOffX;
						me._node_image.position.y = (me._node_image.position.y - me._node_image.userData.curScaleOffY) + scaleOffY;
						me._node_image.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._node_image.userData.transitions.splice(me._node_image.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._node_image.userData.transitions.push(transition_scale);
				}
			}
		}
		me._node_image.logicBlock_scaling();
		me._node_image.userData.onclick=function (e) {
			player.openNext("{"+me.ggNodeId+"}","");
		}
		me._node_image.userData.onmouseenter=function (e) {
			me.elementMouseOver['node_image']=true;
			me._node_title.logicBlock_alpha();
			me._node_image.logicBlock_scaling();
		}
		me._node_image.userData.ontouchend=function (e) {
			me._node_image.logicBlock_scaling();
		}
		me._node_image.userData.onmouseleave=function (e) {
			me.elementMouseOver['node_image']=false;
			me._node_title.logicBlock_alpha();
			me._node_image.logicBlock_scaling();
		}
		me._node_image.userData.ggUpdatePosition=function (useTransition) {
		}
		width = 1.5;
		height = 0.4;
		roundedRectShape = new THREE.Shape();
		roundedRectShape.moveTo((-width / 2.0) + 0, (height / 2.0));
		roundedRectShape.lineTo((width / 2.0) - 0, (height / 2.0));
		roundedRectShape.lineTo((width / 2.0), (-height / 2.0) + 0.2);
		roundedRectShape.arc(-0.2, 0, 0.2, 2.0 * Math.PI, 3.0 * Math.PI / 2.0, true);
		roundedRectShape.lineTo((-width / 2.0) + 0.2, (-height / 2.0));
		roundedRectShape.arc(0, 0.2, 0.2, 3.0 * Math.PI / 2.0, Math.PI, true);
		roundedRectShape.lineTo((-width / 2.0), (height / 2.0) - 0);
		geometry = new THREE.ShapeGeometry(roundedRectShape);
		geometry.name = 'node_title_geometry';
		geometry.computeBoundingBox();
		var min = geometry.boundingBox.min;
		var max = geometry.boundingBox.max;
		var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
		var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
		var vertexPositions = geometry.getAttribute('position');
		var vertexUVs = geometry.getAttribute('uv');
		for (var i = 0; i < vertexPositions.count; i++) {
			var v1 = vertexPositions.getX(i);
			var	v2 = vertexPositions.getY(i);
			vertexUVs.setX(i, (v1 + offset.x) / range.x);
			vertexUVs.setY(i, (v2 + offset.y) / range.y);
		}
		geometry.uvsNeedUpdate = true;
		material = new THREE.MeshBasicMaterial( {side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'node_title_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 0.666667;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._node_title.material.opacity = v;
			if (me._node_title.userData.hasScrollbar) {
				me._node_title.userData.scrollbar.material.opacity = v;
				me._node_title.userData.scrollbarBg.material.opacity = v;
			}
			if (me._node_title.userData.ggSubElement) {
				me._node_title.userData.ggSubElement.material.opacity = v
				me._node_title.userData.ggSubElement.visible = (v>0 && me._node_title.userData.visible);
			}
			me._node_title.visible = (v>0 && me._node_title.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._node_title.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._node_title.userData.backgroundColorAlpha = v;
			me._node_title.userData.setOpacity(me._node_title.userData.opacity);
		}
		el.translateX(0);
		el.translateY(-0.26);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 150;
		el.userData.height = 40;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'node_title';
		el.userData.x = 0;
		el.userData.y = -0.26;
		el.userData.hanchor = 1;
		el.userData.vanchor = 2;
		el.translateZ(0.020);
		el.renderOrder = 2;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._node_title.visible
			let parentEl = me._node_title.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._node_title.userData.opacity = v;
			v = v * me._node_title.userData.parentOpacity;
			me._node_title.userData.setOpacityInternal(v);
			for (let i = 0; i < me._node_title.children.length; i++) {
				let child = me._node_title.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._node_title.userData.parentOpacity = v;
			v = v * me._node_title.userData.opacity
			me._node_title.userData.setOpacityInternal(v);
			for (let i = 0; i < me._node_title.children.length; i++) {
				let child = me._node_title.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 0.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._node_title = el;
		el.userData.textLines = [];
		el.userData.backgroundColor = new THREE.Color(0, 0, 0).convertSRGBToLinear();
		el.userData.textColor = new THREE.Color(0.117647, 0.870588, 0.784314).convertSRGBToLinear();
		el.userData.textColorAlpha = 1;
		var canvas = document.createElement('canvas');
		canvas.width = 300;
		canvas.height = 80;
		el.userData.textCanvas = canvas;
		el.userData.textCanvasContext = canvas.getContext('2d');
		el.userData.ggStripTags = function(text) {
			let doc = new DOMParser().parseFromString(text, 'text/html');
			return doc.body.textContent || '';
		}
		el.userData.ggWrapText = function(scrollbar) {
			me._node_title.userData.totalHeightCanv = 2 * (18);
			me._node_title.userData.textLines = [];
			var ctx = me._node_title.userData.textCanvasContext;
			var words = [];
			let tmpText = String(me._node_title.userData.ggText);
			let whiteSpaceIndex = -1;
			do {
				whiteSpaceIndex = tmpText.search(/[\s]/);
				if (whiteSpaceIndex != -1) {
					words.push(tmpText.substr(0, whiteSpaceIndex));
					tmpText = tmpText.substr(whiteSpaceIndex);
					if (tmpText.charAt(0) == '\n') {
						words.push('\n');
					}
					tmpText = tmpText.substr(1);
				} else {
					words.push(tmpText);
				}
			} while (whiteSpaceIndex != -1);
			var line = '';
			for (var i = 0; i < words.length; i++) {
				if (words[i] == '\n') {
					me._node_title.userData.textLines.push(line);
					line = '';
					me._node_title.userData.totalHeightCanv += me._node_title.userData.lineHeightCanv;
					continue;
				}
				var testLine;
				if (line == '') {
					testLine = words[i]
				} else {
					testLine = line + ' ' + words[i];
				}
				var metrics = ctx.measureText(testLine);
				var testWidth = metrics.width;
				if (testWidth > (2 * (me._node_title.userData.width - 10 - (scrollbar ? 25 : 0))) && i > 0) {
					me._node_title.userData.textLines.push(line);
					line = words[i];
					me._node_title.userData.totalHeightCanv += me._node_title.userData.lineHeightCanv;
				} else {
					line = testLine;
				}
			}
			me._node_title.userData.textLines.push(line);
			me._node_title.userData.totalHeightCanv += me._node_title.userData.lineHeightCanv;
		}
		el.userData.ggPaintCanvasText = function() {
			var canv = me._node_title.userData.textCanvas;
			var ctx = me._node_title.userData.textCanvasContext;
			ctx.clearRect(0, 0, canv.width, canv.height);
			ctx.fillStyle = 'rgba(' + me._node_title.userData.backgroundColor.r * 255 + ', ' + me._node_title.userData.backgroundColor.g * 255 + ', ' + me._node_title.userData.backgroundColor.b * 255 + ', ' + me._node_title.userData.backgroundColorAlpha + ')';
			ctx.fillRect(0, 0, canv.width, canv.height);
			ctx.fillStyle = 'rgba(' + me._node_title.userData.textColor.r * 255 + ', ' + me._node_title.userData.textColor.g * 255 + ', ' + me._node_title.userData.textColor.b * 255 + ', ' + me._node_title.userData.textColorAlpha + ')';
			ctx.textBaseline = 'top';
			var x = (me._node_title.userData.boxWidthCanv - (me._node_title.userData.hasScrollbar ? 50 : 0)) / 2;
			ctx.textAlign = 'center';
			var y = 2 * 13;
			y += (canv.height - me._node_title.userData.totalHeightCanv - (2 * 5)) / 2;
			for (var i = 0; i < me._node_title.userData.textLines.length; i++) {
				ctx.fillText(me._node_title.userData.textLines[i], x, y);
				y += me._node_title.userData.lineHeightCanv;
			}
			var textTexture = new THREE.CanvasTexture(canv);
			textTexture.name = 'node_title_texture';
			textTexture.minFilter = THREE.LinearFilter;
			textTexture.colorSpace = THREE.LinearSRGBColorSpace;
			textTexture.wrapS = THREE.ClampToEdgeWrapping;
			textTexture.wrapT = THREE.ClampToEdgeWrapping;
			if (me._node_title.material.map) {
				me._node_title.material.map.dispose();
			}
			me._node_title.material.map = textTexture;
		}
		el.userData.ggRenderText = function() {
			for (let i = 0; i < me._node_title.children.length; i++) {
				let child = me._node_title.children[i];
				if (child.name.includes('scrollbar')) me._node_title.remove(child);
			}
			var canv = me._node_title.userData.textCanvas;
			var ctx = me._node_title.userData.textCanvasContext;
			ctx.font = '32px Verdana';
			me._node_title.userData.lineHeightCanv = 32 * 1.2;
			me._node_title.userData.ggWrapText(false);
			me._node_title.userData.boxWidthCanv = 2 * me._node_title.userData.width;
			me._node_title.userData.boxHeightCanv = 2 * me._node_title.userData.height;
			me._node_title.userData.hasScrollbar = false;
			canv.width = me._node_title.userData.boxWidthCanv;
			canv.height = me._node_title.userData.boxHeightCanv;
			ctx.font = '32px Verdana';
			me._node_title.userData.ggPaintCanvasText();
		}
		me._node_title.userData.ggUpdateText=function(force) {
			var params = [];
			params.push(player._(String(me.ggUserdata.title)));
			var hs = player._("%1", params);
			if (hs!=this.ggText || force) {
				this.ggText=me._node_title.userData.ggStripTags(hs);
				this.ggRenderText();
			}
		}
		me._node_title.userData.ggUpdateText();
		el.userData.setBackgroundColor = function(v) {
			me._node_title.userData.backgroundColor = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._node_title.userData.backgroundColorAlpha = v;
		}
		el.userData.setTextColor = function(v) {
			me._node_title.userData.textColor = v;
		}
		el.userData.setTextColorAlpha = function(v) {
			me._node_title.userData.textColorAlpha = v;
		}
		el.userData.ggId="node_title";
		me._node_title.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['node_image'] == true)) && 
				((me.ggUserdata.title != ""))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._node_title.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._node_title.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				if (me._node_title.ggCurrentLogicStateAlpha == 0) {
					me._node_title.userData.transitionValue_alpha = 1;
					for (var i = 0; i < me._node_title.userData.transitions.length; i++) {
						if (me._node_title.userData.transitions[i].property == 'alpha') {
							clearInterval(me._node_title.userData.transitions[i].interval);
							me._node_title.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._node_title.material ? me._node_title.material.opacity : me._node_title.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._node_title.userData.setOpacity(transition_alpha.startAlpha + (me._node_title.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._node_title.userData.transitions.splice(me._node_title.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._node_title.userData.transitions.push(transition_alpha);
				}
				else {
					me._node_title.userData.transitionValue_alpha = 0;
					for (var i = 0; i < me._node_title.userData.transitions.length; i++) {
						if (me._node_title.userData.transitions[i].property == 'alpha') {
							clearInterval(me._node_title.userData.transitions[i].interval);
							me._node_title.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._node_title.material ? me._node_title.material.opacity : me._node_title.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._node_title.userData.setOpacity(transition_alpha.startAlpha + (me._node_title.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._node_title.userData.transitions.splice(me._node_title.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._node_title.userData.transitions.push(transition_alpha);
				}
			}
		}
		me._node_title.logicBlock_alpha();
		me._node_title.userData.ggUpdatePosition=function (useTransition) {
		}
		me._node_image.add(me._node_title);
		me.__obj.add(me._node_image);
		me._node_image.logicBlock_scaling();
		me._node_image.userData.setOpacity(1.00);
		me.elementMouseOver['node_image']=false;
		me._node_title.logicBlock_alpha();
		me._node_title.userData.setOpacity(0.00);
			me.ggEvent_activehotspotchanged=function() {
				me._node_title.logicBlock_alpha();
			};
			me.ggEvent_changenode=function() {
				me._node_title.logicBlock_alpha();
			};
			me.ggEvent_configloaded=function() {
				me._node_title.logicBlock_alpha();
			};
	};
	function SkinHotspotClass_ht_video_url(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.ggUserdata.nodeId=nodeId;
		me.elementMouseDown={};
		me.elementMouseOver={};
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el = new THREE.Group();
		el.userData.setOpacityInternal = function(v) {};
		el.name = 'ht_video_url';
		el.userData.x = 3.28;
		el.userData.y = 2.08;
		el.userData.hanchor = 0;
		el.userData.vanchor = 0;
		el.translateZ(0.020);
		el.renderOrder = 2;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_video_url.visible
			let parentEl = me._ht_video_url.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_url.userData.opacity = v;
			v = v * me._ht_video_url.userData.parentOpacity;
			me._ht_video_url.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_url.children.length; i++) {
				let child = me._ht_video_url.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_url.userData.parentOpacity = v;
			v = v * me._ht_video_url.userData.opacity
			me._ht_video_url.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_url.children.length; i++) {
				let child = me._ht_video_url.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_url = el;
		el.userData.ggId="ht_video_url";
		el.userData.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.userData.ggElementNodeId)) {
					return this.parentNode.userData.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_video_url.userData.onclick=function (e) {
			player.triggerEvent('hsproxyclick', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_video_url.userData.ondblclick=function (e) {
			player.triggerEvent('hsproxydblclick', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_video_url.userData.onmouseenter=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_video_url']=true;
			player.triggerEvent('hsproxyover', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_video_url.userData.onmouseleave=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_video_url']=false;
			player.triggerEvent('hsproxyout', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_video_url.userData.ggUpdatePosition=function (useTransition) {
		}
		width = 0.45;
		height = 0.45;
		roundedRectShape = new THREE.Shape();
		roundedRectShape.moveTo((-width / 2.0) + 0.12, (height / 2.0));
		roundedRectShape.lineTo((width / 2.0) - 0.12, (height / 2.0));
		roundedRectShape.arc(0, -0.12, 0.12, Math.PI / 2.0, 2.0 * Math.PI, true);
		roundedRectShape.lineTo((width / 2.0), (-height / 2.0) + 0.12);
		roundedRectShape.arc(-0.12, 0, 0.12, 2.0 * Math.PI, 3.0 * Math.PI / 2.0, true);
		roundedRectShape.lineTo((-width / 2.0) + 0.12, (-height / 2.0));
		roundedRectShape.arc(0, 0.12, 0.12, 3.0 * Math.PI / 2.0, Math.PI, true);
		roundedRectShape.lineTo((-width / 2.0), (height / 2.0) - 0.12);
		roundedRectShape.arc(0.12, 0, 0.12, Math.PI, Math.PI / 2.0, true);
		geometry = new THREE.ShapeGeometry(roundedRectShape);
		geometry.name = 'ht_video_url_bg_geometry';
		geometry.computeBoundingBox();
		var min = geometry.boundingBox.min;
		var max = geometry.boundingBox.max;
		var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
		var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
		var vertexPositions = geometry.getAttribute('position');
		var vertexUVs = geometry.getAttribute('uv');
		for (var i = 0; i < vertexPositions.count; i++) {
			var v1 = vertexPositions.getX(i);
			var	v2 = vertexPositions.getY(i);
			vertexUVs.setX(i, (v1 + offset.x) / range.x);
			vertexUVs.setY(i, (v2 + offset.y) / range.y);
		}
		geometry.uvsNeedUpdate = true;
		material = new THREE.MeshBasicMaterial( { color: new THREE.Color(0.290196, 0.290196, 0.290196).convertSRGBToLinear(), side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'ht_video_url_bg_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 0.588235;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._ht_video_url_bg.material.opacity = v * me._ht_video_url_bg.userData.backgroundColorAlpha;
			if (me._ht_video_url_bg.userData.ggSubElement) {
				me._ht_video_url_bg.userData.ggSubElement.material.opacity = v
				me._ht_video_url_bg.userData.ggSubElement.visible = (v>0 && me._ht_video_url_bg.userData.visible);
			}
			me._ht_video_url_bg.visible = (v>0 && me._ht_video_url_bg.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._ht_video_url_bg.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_video_url_bg.userData.backgroundColorAlpha = v;
			me._ht_video_url_bg.userData.setOpacity(me._ht_video_url_bg.userData.opacity);
		}
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 45;
		el.userData.height = 45;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_video_url_bg';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.010);
		el.renderOrder = 1;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_video_url_bg.visible
			let parentEl = me._ht_video_url_bg.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_url_bg.userData.opacity = v;
			v = v * me._ht_video_url_bg.userData.parentOpacity;
			me._ht_video_url_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_url_bg.children.length; i++) {
				let child = me._ht_video_url_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_url_bg.userData.parentOpacity = v;
			v = v * me._ht_video_url_bg.userData.opacity
			me._ht_video_url_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_url_bg.children.length; i++) {
				let child = me._ht_video_url_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = false;
		el.userData.visible = false;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_url_bg = el;
		el.userData.ggId="ht_video_url_bg";
		me._ht_video_url_bg.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((me.elementMouseOver['ht_video_url_bg'] == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._ht_video_url_bg.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._ht_video_url_bg.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._ht_video_url_bg.ggCurrentLogicStateScaling == 0) {
					me._ht_video_url_bg.userData.transitionValue_scale = {x: 1.2, y: 1.2, z: 1.0};
					for (var i = 0; i < me._ht_video_url_bg.userData.transitions.length; i++) {
						if (me._ht_video_url_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_video_url_bg.userData.transitions[i].interval);
							me._ht_video_url_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._ht_video_url_bg.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_url_bg.scale.set(transition_scale.startScale.x + (me._ht_video_url_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_video_url_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_video_url_bg.position.x = (me._ht_video_url_bg.position.x - me._ht_video_url_bg.userData.curScaleOffX) + scaleOffX;
						me._ht_video_url_bg.userData.curScaleOffX = scaleOffX;
						me._ht_video_url_bg.position.y = (me._ht_video_url_bg.position.y - me._ht_video_url_bg.userData.curScaleOffY) + scaleOffY;
						me._ht_video_url_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_video_url_bg.userData.transitions.splice(me._ht_video_url_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_video_url_bg.userData.transitions.push(transition_scale);
				}
				else {
					me._ht_video_url_bg.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._ht_video_url_bg.userData.transitions.length; i++) {
						if (me._ht_video_url_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_video_url_bg.userData.transitions[i].interval);
							me._ht_video_url_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._ht_video_url_bg.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_url_bg.scale.set(transition_scale.startScale.x + (me._ht_video_url_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_video_url_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_video_url_bg.position.x = (me._ht_video_url_bg.position.x - me._ht_video_url_bg.userData.curScaleOffX) + scaleOffX;
						me._ht_video_url_bg.userData.curScaleOffX = scaleOffX;
						me._ht_video_url_bg.position.y = (me._ht_video_url_bg.position.y - me._ht_video_url_bg.userData.curScaleOffY) + scaleOffY;
						me._ht_video_url_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_video_url_bg.userData.transitions.splice(me._ht_video_url_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_video_url_bg.userData.transitions.push(transition_scale);
				}
			}
		}
		me._ht_video_url_bg.logicBlock_scaling();
		me._ht_video_url_bg.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage == ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_video_url_bg.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_video_url_bg.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._ht_video_url_bg.ggCurrentLogicStateVisible == 0) {
			me._ht_video_url_bg.visible=((!me._ht_video_url_bg.material && Number(me._ht_video_url_bg.userData.opacity>0)) || Number(me._ht_video_url_bg.material.opacity)>0)?true:false;
			me._ht_video_url_bg.userData.visible=true;
				}
				else {
			me._ht_video_url_bg.visible=false;
			me._ht_video_url_bg.userData.visible=false;
				}
			}
		}
		me._ht_video_url_bg.logicBlock_visible();
		me._ht_video_url_bg.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				(((player.getVariableValue('open_video_hs') !== null) && (player.getVariableValue('open_video_hs')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._ht_video_url_bg.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._ht_video_url_bg.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				if (me._ht_video_url_bg.ggCurrentLogicStateAlpha == 0) {
					me._ht_video_url_bg.userData.transitionValue_alpha = 0;
					for (var i = 0; i < me._ht_video_url_bg.userData.transitions.length; i++) {
						if (me._ht_video_url_bg.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_video_url_bg.userData.transitions[i].interval);
							me._ht_video_url_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_video_url_bg.material ? me._ht_video_url_bg.material.opacity : me._ht_video_url_bg.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_url_bg.userData.setOpacity(transition_alpha.startAlpha + (me._ht_video_url_bg.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_video_url_bg.userData.transitions.splice(me._ht_video_url_bg.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_video_url_bg.userData.transitions.push(transition_alpha);
				}
				else {
					me._ht_video_url_bg.userData.transitionValue_alpha = 1;
					for (var i = 0; i < me._ht_video_url_bg.userData.transitions.length; i++) {
						if (me._ht_video_url_bg.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_video_url_bg.userData.transitions[i].interval);
							me._ht_video_url_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_video_url_bg.material ? me._ht_video_url_bg.material.opacity : me._ht_video_url_bg.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_url_bg.userData.setOpacity(transition_alpha.startAlpha + (me._ht_video_url_bg.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_video_url_bg.userData.transitions.splice(me._ht_video_url_bg.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_video_url_bg.userData.transitions.push(transition_alpha);
				}
			}
		}
		me._ht_video_url_bg.logicBlock_alpha();
		me._ht_video_url_bg.userData.onclick=function (e) {
			player.setVariableValue('open_video_hs', player.getVariableValue('open_video_hs') + "<"+me.hotspot.id+">");
			me._ht_video_url_popup.userData.ggInitMedia(player._(me.hotspot.url));
		}
		me._ht_video_url_bg.userData.onmouseenter=function (e) {
			me.elementMouseOver['ht_video_url_bg']=true;
			me._ht_video_url_title.logicBlock_alpha();
			me._ht_video_url_bg.logicBlock_scaling();
		}
		me._ht_video_url_bg.userData.ontouchend=function (e) {
			me._ht_video_url_bg.logicBlock_scaling();
		}
		me._ht_video_url_bg.userData.onmouseleave=function (e) {
			me.elementMouseOver['ht_video_url_bg']=false;
			me._ht_video_url_title.logicBlock_alpha();
			me._ht_video_url_bg.logicBlock_scaling();
		}
		me._ht_video_url_bg.userData.ggUpdatePosition=function (useTransition) {
		}
		geometry = new THREE.PlaneGeometry(0.36, 0.36, 5, 5 );
		geometry.name = 'ht_video_url_icon_geometry';
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAEVklEQVR4nO2bX2hTVxzHP7+TppsKwqZYR22S1tbBwAqrLNG9DGFPA8dkL3sYW7duvo8h2L0rYwh7XTenvuxlMNnY20CfXBJQwQoDbWyb1jI7/AOCf2jM+e0huWlSk6ze/Fm8OZ+nc0/OOd+TL/d+b7j5XXA4HA6Hw+FwOBwOh6PDkHof7sxc2JbDjJgQ4XZtqBY2Ty6Mnbkx/OY/7dStatDAbPKgQSYV4u3czHoQSFv02OLQvt/apLfK2MWL4dtbnnynyng7xBtBhFNb7/QcvrR3b66VOj3lBxXmKEsictqKvRqC5VZuYj3koc+o2a2qHyP0qzJ+e8sTgE9aqVs6gwZmkwcF+bVwpD/35mUiM5K430pxPwzPpDavhDgJvA+g6LutvNzMakMmKSguda'+
	'o5AJmRxP3ePJ+iLBV65Ggr9QwU7lZeIIvI6U41xyMzkrgvomcABBI7Mxe2NWvt6Hx6MDqfHvSODUAOM+J1WLFXmyXWSqww7bXL9+8bVROZSx9Rq9fU6jXPpB4AEyJstTCuEwJ5PYRg2Rbbjf5O659J7QjNp8+gHCh15u1+YM7UntYdRG8kD4VCTFeYA4gpZFxP9WnBp+/WlU0vPHz8raITXp/AdYVd5eO60qBIJjUmDx/9VGbGXTEyIWrvqcr58rHddYkVgxhDsmSOcM6G7Wg2Fj9bbUrXnEFVgjgnyFfZ2BsnELG15nWFQdEbyUMq/IDyEhSyBqMfZGOJy/81N9AGVQtiYOrxxg1fLG/f82A9awTWoFpBXCtrahG8kPYRxPUI1BnkN4jrERiDGgniegTCIKvyJcI7ZV3PFMT1CIRBUDLHVxDX4zk2SF+peKSunLe9'+
	'9sObA/uXmqkSmLuYSv2/sPzyHBskf1ccwVsmZ6aj8+n3mqnyHBtUjvxebLysVn+JzKam+m5d2dSMlQNhkBF7QowcAu4Wuz578eGjy5FMaqzhtRtdoFPIxuJnbdiOIpwDUNiFIRmZSx9B1ff3DIxBADcH9i8txOJvC3IEyAFhVL+OzKf/2LH4Z7+fNQNlEAAiNjsU/wbLPoHrACgH/AZ48AwqsjCcuPR444bXge+LXb4CPLAGASxv3/NgYSjxeSMBHmiDPBoJ8K4wCPwHeNcYBPgK8O4yqEitALcqU2vHdqVBUDPAnyqC6FqDPNYG+FoMFCpIvY489LVrc41Qvs/y/fuhSoDnVEwWigaFsTPeYKNmdyNi7cIoo167fP++KQa4Ed0lRl7NxuJzUPZILjqbSinEUZZ6La91cpXZ8Exq84rhL4R+hdTiUGJfq7RKGWTRYw'+
	'AI/SshTg7PpDa3SrQRSkWcQvG3ix5vpV7FY8roXOrHyjJgPWOF6U6oOiuUATOqKh955ohwKjuYaGkZcMVD+613eg7f3vIEVcYLp69MioKvf9yajADqNVgtJM+2QfcpBmaTB0GOCiRarP/MKKRAj/8vryKsxb3M4nA4HA6Hw+FwOBwORwfyL1F96N/hwTYgAAAAAElFTkSuQmCC');
		texture.colorSpace = player.getVRTextureColorSpace();
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'ht_video_url_icon_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.materialNormal = material;
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 36;
		el.userData.height = 36;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_video_url_icon';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.020);
		el.renderOrder = 2;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_video_url_icon.material) me._ht_video_url_icon.material.opacity = v;
			me._ht_video_url_icon.visible = (v>0 && me._ht_video_url_icon.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._ht_video_url_icon.visible
			let parentEl = me._ht_video_url_icon.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_url_icon.userData.opacity = v;
			v = v * me._ht_video_url_icon.userData.parentOpacity;
			me._ht_video_url_icon.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_url_icon.children.length; i++) {
				let child = me._ht_video_url_icon.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_url_icon.userData.parentOpacity = v;
			v = v * me._ht_video_url_icon.userData.opacity
			me._ht_video_url_icon.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_url_icon.children.length; i++) {
				let child = me._ht_video_url_icon.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_url_icon = el;
		el.userData.ggId="ht_video_url_icon";
		me._ht_video_url_icon.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_video_url_bg.add(me._ht_video_url_icon);
		geometry = new THREE.PlaneGeometry(1, 0.2, 5, 5 );
		geometry.name = 'ht_video_url_title_geometry';
		material = new THREE.MeshBasicMaterial( {side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'ht_video_url_title_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 1;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._ht_video_url_title.material.opacity = v;
			if (me._ht_video_url_title.userData.hasScrollbar) {
				me._ht_video_url_title.userData.scrollbar.material.opacity = v;
				me._ht_video_url_title.userData.scrollbarBg.material.opacity = v;
			}
			if (me._ht_video_url_title.userData.ggSubElement) {
				me._ht_video_url_title.userData.ggSubElement.material.opacity = v
				me._ht_video_url_title.userData.ggSubElement.visible = (v>0 && me._ht_video_url_title.userData.visible);
			}
			me._ht_video_url_title.visible = (v>0 && me._ht_video_url_title.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._ht_video_url_title.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_video_url_title.userData.backgroundColorAlpha = v;
			me._ht_video_url_title.userData.setOpacity(me._ht_video_url_title.userData.opacity);
		}
		el.translateX(0);
		el.translateY(-0.325);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 100;
		el.userData.height = 20;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_video_url_title';
		el.userData.x = 0;
		el.userData.y = -0.325;
		el.userData.hanchor = 1;
		el.userData.vanchor = 2;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_video_url_title.visible
			let parentEl = me._ht_video_url_title.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_url_title.userData.opacity = v;
			v = v * me._ht_video_url_title.userData.parentOpacity;
			me._ht_video_url_title.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_url_title.children.length; i++) {
				let child = me._ht_video_url_title.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_url_title.userData.parentOpacity = v;
			v = v * me._ht_video_url_title.userData.opacity
			me._ht_video_url_title.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_url_title.children.length; i++) {
				let child = me._ht_video_url_title.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 0.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_url_title = el;
		el.userData.textLines = [];
		el.userData.backgroundColor = new THREE.Color(1, 1, 1).convertSRGBToLinear();
		el.userData.textColor = new THREE.Color(0.117647, 0.870588, 0.784314).convertSRGBToLinear();
		el.userData.textColorAlpha = 1;
		var canvas = document.createElement('canvas');
		canvas.width = 200;
		canvas.height = 40;
		el.userData.textCanvas = canvas;
		el.userData.textCanvasContext = canvas.getContext('2d');
		el.userData.ggStripTags = function(text) {
			let doc = new DOMParser().parseFromString(text, 'text/html');
			return doc.body.textContent || '';
		}
		el.userData.ggWrapText = function(scrollbar) {
			me._ht_video_url_title.userData.totalHeightCanv = 2 * (3);
			me._ht_video_url_title.userData.textLines = [];
			var ctx = me._ht_video_url_title.userData.textCanvasContext;
			var words = [];
			let tmpText = String(me._ht_video_url_title.userData.ggText);
			let whiteSpaceIndex = -1;
			do {
				whiteSpaceIndex = tmpText.search(/[\s]/);
				if (whiteSpaceIndex != -1) {
					words.push(tmpText.substr(0, whiteSpaceIndex));
					tmpText = tmpText.substr(whiteSpaceIndex);
					if (tmpText.charAt(0) == '\n') {
						words.push('\n');
					}
					tmpText = tmpText.substr(1);
				} else {
					words.push(tmpText);
				}
			} while (whiteSpaceIndex != -1);
			var line = '';
			for (var i = 0; i < words.length; i++) {
				if (words[i] == '\n') {
					me._ht_video_url_title.userData.textLines.push(line);
					line = '';
					me._ht_video_url_title.userData.totalHeightCanv += me._ht_video_url_title.userData.lineHeightCanv;
					continue;
				}
				var testLine;
				if (line == '') {
					testLine = words[i]
				} else {
					testLine = line + ' ' + words[i];
				}
				var metrics = ctx.measureText(testLine);
				var testWidth = metrics.width;
				if (testWidth > (2 * (me._ht_video_url_title.userData.width - 0 - (scrollbar ? 25 : 0))) && i > 0) {
					me._ht_video_url_title.userData.textLines.push(line);
					line = words[i];
					me._ht_video_url_title.userData.totalHeightCanv += me._ht_video_url_title.userData.lineHeightCanv;
				} else {
					line = testLine;
				}
			}
			me._ht_video_url_title.userData.textLines.push(line);
			me._ht_video_url_title.userData.totalHeightCanv += me._ht_video_url_title.userData.lineHeightCanv;
		}
		el.userData.ggPaintCanvasText = function() {
			var canv = me._ht_video_url_title.userData.textCanvas;
			var ctx = me._ht_video_url_title.userData.textCanvasContext;
			ctx.clearRect(0, 0, canv.width, canv.height);
			ctx.fillStyle = 'rgba(' + me._ht_video_url_title.userData.textColor.r * 255 + ', ' + me._ht_video_url_title.userData.textColor.g * 255 + ', ' + me._ht_video_url_title.userData.textColor.b * 255 + ', ' + me._ht_video_url_title.userData.textColorAlpha + ')';
			ctx.textBaseline = 'top';
			var x = (me._ht_video_url_title.userData.boxWidthCanv - (me._ht_video_url_title.userData.hasScrollbar ? 50 : 0)) / 2;
			ctx.textAlign = 'center';
			var y = 2 * 3;
			for (var i = 0; i < me._ht_video_url_title.userData.textLines.length; i++) {
				ctx.fillText(me._ht_video_url_title.userData.textLines[i], x, y);
				y += me._ht_video_url_title.userData.lineHeightCanv;
			}
			geometry = new THREE.PlaneGeometry(me._ht_video_url_title.userData.boxWidthCanv / 200.0, me._ht_video_url_title.userData.boxHeightCanv / 200.0, 5, 5 );
			geometry.name = 'ht_video_url_title_geometry';
			me._ht_video_url_title.geometry.dispose();
			me._ht_video_url_title.geometry = geometry;
			var diffY = (me._ht_video_url_title.userData.boxHeightCanv / 2) - me._ht_video_url_title.userData.height;
			me._ht_video_url_title.position.y = me._ht_video_url_title.userData.y - ((diffY / 2.0) / 100.0);
			var textTexture = new THREE.CanvasTexture(canv);
			textTexture.name = 'ht_video_url_title_texture';
			textTexture.minFilter = THREE.LinearFilter;
			textTexture.colorSpace = THREE.LinearSRGBColorSpace;
			textTexture.wrapS = THREE.ClampToEdgeWrapping;
			textTexture.wrapT = THREE.ClampToEdgeWrapping;
			if (me._ht_video_url_title.material.map) {
				me._ht_video_url_title.material.map.dispose();
			}
			me._ht_video_url_title.material.map = textTexture;
		}
		el.userData.ggRenderText = function() {
			for (let i = 0; i < me._ht_video_url_title.children.length; i++) {
				let child = me._ht_video_url_title.children[i];
				if (child.name.includes('scrollbar')) me._ht_video_url_title.remove(child);
			}
			var canv = me._ht_video_url_title.userData.textCanvas;
			var ctx = me._ht_video_url_title.userData.textCanvasContext;
			ctx.font = '36px Verdana';
			me._ht_video_url_title.userData.lineHeightCanv = 36 * 1.2;
			me._ht_video_url_title.userData.textLines = [];
			me._ht_video_url_title.userData.textLines.push(me._ht_video_url_title.userData.ggText);
			me._ht_video_url_title.userData.totalHeightCanv = 2 * (3);
			me._ht_video_url_title.userData.totalHeightCanv += me._ht_video_url_title.userData.lineHeightCanv;
			me._ht_video_url_title.userData.boxWidthCanv = ctx.measureText(me._ht_video_url_title.userData.ggText).width + (2 * 0);
			me._ht_video_url_title.userData.boxHeightCanv = me._ht_video_url_title.userData.totalHeightCanv;
			canv.width = me._ht_video_url_title.userData.boxWidthCanv;
			canv.height = me._ht_video_url_title.userData.boxHeightCanv;
			ctx.font = '36px Verdana';
			me._ht_video_url_title.userData.ggPaintCanvasText();
		}
		me._ht_video_url_title.userData.ggUpdateText=function(force) {
			var params = [];
			params.push(player._(String(player._(me.hotspot.title))));
			var hs = player._("%1", params);
			if (hs!=this.ggText || force) {
				this.ggText=me._ht_video_url_title.userData.ggStripTags(hs);
				this.ggRenderText();
			}
		}
		me._ht_video_url_title.userData.ggUpdateText();
		el.userData.setBackgroundColor = function(v) {
			me._ht_video_url_title.userData.backgroundColor = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_video_url_title.userData.backgroundColorAlpha = v;
		}
		el.userData.setTextColor = function(v) {
			me._ht_video_url_title.userData.textColor = v;
		}
		el.userData.setTextColorAlpha = function(v) {
			me._ht_video_url_title.userData.textColorAlpha = v;
		}
		el.userData.ggId="ht_video_url_title";
		me._ht_video_url_title.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['ht_video_url_bg'] == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._ht_video_url_title.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._ht_video_url_title.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				if (me._ht_video_url_title.ggCurrentLogicStateAlpha == 0) {
					me._ht_video_url_title.userData.transitionValue_alpha = 1;
					for (var i = 0; i < me._ht_video_url_title.userData.transitions.length; i++) {
						if (me._ht_video_url_title.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_video_url_title.userData.transitions[i].interval);
							me._ht_video_url_title.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_video_url_title.material ? me._ht_video_url_title.material.opacity : me._ht_video_url_title.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_url_title.userData.setOpacity(transition_alpha.startAlpha + (me._ht_video_url_title.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_video_url_title.userData.transitions.splice(me._ht_video_url_title.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_video_url_title.userData.transitions.push(transition_alpha);
				}
				else {
					me._ht_video_url_title.userData.transitionValue_alpha = 0;
					for (var i = 0; i < me._ht_video_url_title.userData.transitions.length; i++) {
						if (me._ht_video_url_title.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_video_url_title.userData.transitions[i].interval);
							me._ht_video_url_title.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_video_url_title.material ? me._ht_video_url_title.material.opacity : me._ht_video_url_title.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_url_title.userData.setOpacity(transition_alpha.startAlpha + (me._ht_video_url_title.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_video_url_title.userData.transitions.splice(me._ht_video_url_title.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_video_url_title.userData.transitions.push(transition_alpha);
				}
			}
		}
		me._ht_video_url_title.logicBlock_alpha();
		me._ht_video_url_title.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_video_url_bg.add(me._ht_video_url_title);
		me._ht_video_url.add(me._ht_video_url_bg);
		width = 6.6;
		height = 4.8;
		roundedRectShape = new THREE.Shape();
		roundedRectShape.moveTo((-width / 2.0) + 0.3, (height / 2.0));
		roundedRectShape.lineTo((width / 2.0) - 0.3, (height / 2.0));
		roundedRectShape.arc(0, -0.3, 0.3, Math.PI / 2.0, 2.0 * Math.PI, true);
		roundedRectShape.lineTo((width / 2.0), (-height / 2.0) + 0.3);
		roundedRectShape.arc(-0.3, 0, 0.3, 2.0 * Math.PI, 3.0 * Math.PI / 2.0, true);
		roundedRectShape.lineTo((-width / 2.0) + 0.3, (-height / 2.0));
		roundedRectShape.arc(0, 0.3, 0.3, 3.0 * Math.PI / 2.0, Math.PI, true);
		roundedRectShape.lineTo((-width / 2.0), (height / 2.0) - 0.3);
		roundedRectShape.arc(0.3, 0, 0.3, Math.PI, Math.PI / 2.0, true);
		geometry = new THREE.ShapeGeometry(roundedRectShape);
		geometry.name = 'ht_video_url_popup_bg_geometry';
		geometry.computeBoundingBox();
		var min = geometry.boundingBox.min;
		var max = geometry.boundingBox.max;
		var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
		var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
		var vertexPositions = geometry.getAttribute('position');
		var vertexUVs = geometry.getAttribute('uv');
		for (var i = 0; i < vertexPositions.count; i++) {
			var v1 = vertexPositions.getX(i);
			var	v2 = vertexPositions.getY(i);
			vertexUVs.setX(i, (v1 + offset.x) / range.x);
			vertexUVs.setY(i, (v2 + offset.y) / range.y);
		}
		geometry.uvsNeedUpdate = true;
		material = new THREE.MeshBasicMaterial( { color: new THREE.Color(0.290196, 0.290196, 0.290196).convertSRGBToLinear(), side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'ht_video_url_popup_bg_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 0.666667;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._ht_video_url_popup_bg.material.opacity = v * me._ht_video_url_popup_bg.userData.backgroundColorAlpha;
			if (me._ht_video_url_popup_bg.userData.ggSubElement) {
				me._ht_video_url_popup_bg.userData.ggSubElement.material.opacity = v
				me._ht_video_url_popup_bg.userData.ggSubElement.visible = (v>0 && me._ht_video_url_popup_bg.userData.visible);
			}
			me._ht_video_url_popup_bg.visible = (v>0 && me._ht_video_url_popup_bg.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._ht_video_url_popup_bg.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_video_url_popup_bg.userData.backgroundColorAlpha = v;
			me._ht_video_url_popup_bg.userData.setOpacity(me._ht_video_url_popup_bg.userData.opacity);
		}
		el.translateX(0);
		el.translateY(0);
		el.scale.set(0.10, 0.10, 1.0);
		el.userData.width = 660;
		el.userData.height = 480;
		el.userData.scale = {x: 0.10, y: 0.10, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_video_url_popup_bg';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.020);
		el.renderOrder = 2;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_video_url_popup_bg.visible
			let parentEl = me._ht_video_url_popup_bg.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_url_popup_bg.userData.opacity = v;
			v = v * me._ht_video_url_popup_bg.userData.parentOpacity;
			me._ht_video_url_popup_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_url_popup_bg.children.length; i++) {
				let child = me._ht_video_url_popup_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_url_popup_bg.userData.parentOpacity = v;
			v = v * me._ht_video_url_popup_bg.userData.opacity
			me._ht_video_url_popup_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_url_popup_bg.children.length; i++) {
				let child = me._ht_video_url_popup_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 0.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_url_popup_bg = el;
		el.userData.ggId="ht_video_url_popup_bg";
		me._ht_video_url_popup_bg.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				(((player.getVariableValue('open_video_hs') !== null) && (player.getVariableValue('open_video_hs')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._ht_video_url_popup_bg.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._ht_video_url_popup_bg.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._ht_video_url_popup_bg.ggCurrentLogicStateScaling == 0) {
					me._ht_video_url_popup_bg.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._ht_video_url_popup_bg.userData.transitions.length; i++) {
						if (me._ht_video_url_popup_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_video_url_popup_bg.userData.transitions[i].interval);
							me._ht_video_url_popup_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._ht_video_url_popup_bg.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_url_popup_bg.scale.set(transition_scale.startScale.x + (me._ht_video_url_popup_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_video_url_popup_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_video_url_popup_bg.position.x = (me._ht_video_url_popup_bg.position.x - me._ht_video_url_popup_bg.userData.curScaleOffX) + scaleOffX;
						me._ht_video_url_popup_bg.userData.curScaleOffX = scaleOffX;
						me._ht_video_url_popup_bg.position.y = (me._ht_video_url_popup_bg.position.y - me._ht_video_url_popup_bg.userData.curScaleOffY) + scaleOffY;
						me._ht_video_url_popup_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_video_url_popup_bg.userData.transitions.splice(me._ht_video_url_popup_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_video_url_popup_bg.userData.transitions.push(transition_scale);
				}
				else {
					me._ht_video_url_popup_bg.userData.transitionValue_scale = {x: 0.1, y: 0.1, z: 1.0};
					for (var i = 0; i < me._ht_video_url_popup_bg.userData.transitions.length; i++) {
						if (me._ht_video_url_popup_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_video_url_popup_bg.userData.transitions[i].interval);
							me._ht_video_url_popup_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._ht_video_url_popup_bg.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_url_popup_bg.scale.set(transition_scale.startScale.x + (me._ht_video_url_popup_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_video_url_popup_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_video_url_popup_bg.position.x = (me._ht_video_url_popup_bg.position.x - me._ht_video_url_popup_bg.userData.curScaleOffX) + scaleOffX;
						me._ht_video_url_popup_bg.userData.curScaleOffX = scaleOffX;
						me._ht_video_url_popup_bg.position.y = (me._ht_video_url_popup_bg.position.y - me._ht_video_url_popup_bg.userData.curScaleOffY) + scaleOffY;
						me._ht_video_url_popup_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_video_url_popup_bg.userData.transitions.splice(me._ht_video_url_popup_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_video_url_popup_bg.userData.transitions.push(transition_scale);
				}
			}
		}
		me._ht_video_url_popup_bg.logicBlock_scaling();
		me._ht_video_url_popup_bg.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				(((player.getVariableValue('open_video_hs') !== null) && (player.getVariableValue('open_video_hs')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._ht_video_url_popup_bg.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._ht_video_url_popup_bg.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				if (me._ht_video_url_popup_bg.ggCurrentLogicStateAlpha == 0) {
					me._ht_video_url_popup_bg.userData.transitionValue_alpha = 1;
					for (var i = 0; i < me._ht_video_url_popup_bg.userData.transitions.length; i++) {
						if (me._ht_video_url_popup_bg.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_video_url_popup_bg.userData.transitions[i].interval);
							me._ht_video_url_popup_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_video_url_popup_bg.material ? me._ht_video_url_popup_bg.material.opacity : me._ht_video_url_popup_bg.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_url_popup_bg.userData.setOpacity(transition_alpha.startAlpha + (me._ht_video_url_popup_bg.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_video_url_popup_bg.userData.transitions.splice(me._ht_video_url_popup_bg.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_video_url_popup_bg.userData.transitions.push(transition_alpha);
				}
				else {
					me._ht_video_url_popup_bg.userData.transitionValue_alpha = 0;
					for (var i = 0; i < me._ht_video_url_popup_bg.userData.transitions.length; i++) {
						if (me._ht_video_url_popup_bg.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_video_url_popup_bg.userData.transitions[i].interval);
							me._ht_video_url_popup_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_video_url_popup_bg.material ? me._ht_video_url_popup_bg.material.opacity : me._ht_video_url_popup_bg.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_url_popup_bg.userData.setOpacity(transition_alpha.startAlpha + (me._ht_video_url_popup_bg.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_video_url_popup_bg.userData.transitions.splice(me._ht_video_url_popup_bg.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_video_url_popup_bg.userData.transitions.push(transition_alpha);
				}
			}
		}
		me._ht_video_url_popup_bg.logicBlock_alpha();
		me._ht_video_url_popup_bg.userData.ggUpdatePosition=function (useTransition) {
		}
		geometry = new THREE.PlaneGeometry(6, 3.8, 5, 5 );
		geometry.name = 'ht_video_url_popup_geometry';
		material = new THREE.MeshBasicMaterial( {color: 0x000000, side: THREE.DoubleSide, transparent: true} );
		material.name = 'ht_video_url_popup_material';
		el = new THREE.Mesh( geometry, material );
		el.translateX(0);
		el.translateY(-0.1);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 600;
		el.userData.height = 380;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_video_url_popup';
		el.userData.x = 0;
		el.userData.y = -0.1;
		el.userData.hanchor = 1;
		el.userData.vanchor = 2;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_video_url_popup.material) me._ht_video_url_popup.material.opacity = v;
			me._ht_video_url_popup.visible = (v>0 && me._ht_video_url_popup.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._ht_video_url_popup.visible
			let parentEl = me._ht_video_url_popup.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_url_popup.userData.opacity = v;
			v = v * me._ht_video_url_popup.userData.parentOpacity;
			me._ht_video_url_popup.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_url_popup.children.length; i++) {
				let child = me._ht_video_url_popup.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_url_popup.userData.parentOpacity = v;
			v = v * me._ht_video_url_popup.userData.opacity
			me._ht_video_url_popup.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_url_popup.children.length; i++) {
				let child = me._ht_video_url_popup.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = false;
		el.userData.visible = false;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_url_popup = el;
		me._ht_video_url_popup.userData.seekbars = [];
		me._ht_video_url_popup.userData.ggInitMedia = function(media) {
			if (me._ht_video_url_popup__vid) me._ht_video_url_popup__vid.pause();
			me._ht_video_url_popup__vid = document.createElement('video');
			player.registerVideoElement('ht_video_url_popup', me._ht_video_url_popup__vid);
			me._ht_video_url_popup__vid.setAttribute('autoplay', '');
			me._ht_video_url_popup__vid.setAttribute('crossOrigin', 'anonymous');
			me._ht_video_url_popup__source = document.createElement('source');
			me._ht_video_url_popup__source.setAttribute('src', media);
			me._ht_video_url_popup__vid.addEventListener('loadedmetadata', function() {
				let videoAR = me._ht_video_url_popup__vid.videoWidth / me._ht_video_url_popup__vid.videoHeight;
				let elAR = me._ht_video_url_popup.userData.width / me._ht_video_url_popup.userData.height;
				if (videoAR > elAR) {
					me._ht_video_url_popup.scale.set(1, (me._ht_video_url_popup.userData.width / videoAR) / me._ht_video_url_popup.userData.height, 1);
				} else {
					me._ht_video_url_popup.scale.set((me._ht_video_url_popup.userData.height * videoAR) / me._ht_video_url_popup.userData.width, 1, 1);
				}
			}, false);
			me._ht_video_url_popup__vid.appendChild(me._ht_video_url_popup__source);
			videoTexture = new THREE.VideoTexture( me._ht_video_url_popup__vid );
			videoTexture.name = 'ht_video_url_popup_videoTexture';
			videoTexture.minFilter = THREE.LinearFilter;
			videoTexture.magFilter = THREE.LinearFilter;
			videoTexture.format = THREE.RGBAFormat;
			videoMaterial = new THREE.MeshBasicMaterial( {map: videoTexture, side: THREE.DoubleSide, transparent: true} );
			videoMaterial.name = 'ht_video_url_popup_videoMaterial';
			videoMaterial.alphaTest = 0.5;
			me._ht_video_url_popup.material = videoMaterial;
		}
		el.userData.ggId="ht_video_url_popup";
		me._ht_video_url_popup.userData.ggIsActive=function() {
			if (me._ht_video_url_popup__vid != null) {
				return (me._ht_video_url_popup__vid.paused == false && me._ht_video_url_popup__vid.ended == false);
			} else {
				return false;
			}
		}
		me._ht_video_url_popup.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				(((player.getVariableValue('open_video_hs') !== null) && (player.getVariableValue('open_video_hs')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_video_url_popup.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_video_url_popup.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._ht_video_url_popup.ggCurrentLogicStateVisible == 0) {
			me._ht_video_url_popup.visible=((!me._ht_video_url_popup.material && Number(me._ht_video_url_popup.userData.opacity>0)) || Number(me._ht_video_url_popup.material.opacity)>0)?true:false;
			me._ht_video_url_popup.userData.visible=true;
					if (me._ht_video_url_popup.userData.ggVideoNotLoaded) {
						me._ht_video_url_popup.userData.ggInitMedia(me._ht_video_url_popup.ggVideoSource);
					}
				}
				else {
			me._ht_video_url_popup.visible=false;
			me._ht_video_url_popup.userData.visible=false;
					me._ht_video_url_popup.userData.ggInitMedia('');
				}
			}
		}
		me._ht_video_url_popup.logicBlock_visible();
		me._ht_video_url_popup.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_video_url_popup_bg.add(me._ht_video_url_popup);
		geometry = new THREE.PlaneGeometry(0.4, 0.4, 5, 5 );
		geometry.name = 'ht_video_url_popup_close_geometry';
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAABJElEQVR4nO3bSw6DMBAEUSs341icfrLJSJGFAeNfY9c7QU9JiJVDAAAAAAAAAADgdcxsM7Nt9I4U6X2/cW4fvSdmZvvfPr2IUUCpiFE8zYAhHA4dHlFx0ymlwUpbsigMV9hQZOQBr4/nRhwyTTzX86Dp4rkeh00bz7U8cPp4rsWhy8RzNQ9eLp6rcfiy8VxJgOXjuSchiBfJCUK8hDthiHfhLBDxbjoKRbxMB8GIlysRUTLeZ/QAVMYnXICfSIGzUES8cCcQERNywhAx8iQIEX9KQiwfsUaAZSPWPHy5iC0OXiZiy0Onj9jjwGkj9jxsuogjDpom4shDXh9R4QCFDY8oDVfacoviYMVNh4xnDmWMhzblTPkpVdDfBwAAAAAAAABA2hcaGfeSY++bsA'+
	'AAAABJRU5ErkJggg==');
		texture.colorSpace = player.getVRTextureColorSpace();
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'ht_video_url_popup_close_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.materialNormal = material;
		el.translateX(2.85);
		el.translateY(2.05);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 40;
		el.userData.height = 40;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_video_url_popup_close';
		el.userData.x = 2.85;
		el.userData.y = 2.05;
		el.userData.hanchor = 2;
		el.userData.vanchor = 0;
		el.translateZ(0.040);
		el.renderOrder = 4;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_video_url_popup_close.material) me._ht_video_url_popup_close.material.opacity = v;
			me._ht_video_url_popup_close.visible = (v>0 && me._ht_video_url_popup_close.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._ht_video_url_popup_close.visible
			let parentEl = me._ht_video_url_popup_close.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_url_popup_close.userData.opacity = v;
			v = v * me._ht_video_url_popup_close.userData.parentOpacity;
			me._ht_video_url_popup_close.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_url_popup_close.children.length; i++) {
				let child = me._ht_video_url_popup_close.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_url_popup_close.userData.parentOpacity = v;
			v = v * me._ht_video_url_popup_close.userData.opacity
			me._ht_video_url_popup_close.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_url_popup_close.children.length; i++) {
				let child = me._ht_video_url_popup_close.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_url_popup_close = el;
		textureOver = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAABoUlEQVR4nO3by23CQBRA0UsKASSaYEu6ggKgK7J1E0iEQiArI5GE/N58XsQ9Sxb2zE3A4BmDJEmSJEmSJEn/zuw4rGbHYdV7HPfUGN9TqQPNjsPqcmZ/ObOfHoZ1qeOWMj0M63F8JSMWC3hjwjZTxOlhWDNhW+PYxQK+zpcvXNhcX0gS8UO8C5vX+fKl1PEnpQ40+mzAp8VyV/o8WcZSPCDkiNhqDFUCQt+ILc9dLSD0idj6nFUDQtsJ9fiDVQ8IbSbW6yOjSUCoO8Gen7fNAkKdifa+4jcNCGUn3DsedAgIZSaeIR50CgixAFniQceA8LcQmeJB54DwuyDZ4kGCgPCzMBnjQZKA8HWgrPEgUUD4PBRA1niQLCB8c/c4WTxIGBDuREwYD2qtiTyQdP'+
	'+BvoUDvIgE+DUmwC/SAf6UC/BmQoC3swK8oRrgLf0AF5UCXNYMcGE9wK0dAW4uCnB7W0DvK2PLMbjFN6howEzxRrXHVCzg+JzI9YUE8UbvI06eeC61U7/OmkiieACnxXJ38whGVo/4qJckSZIkSZIkSW28AdO331t58jXnAAAAAElFTkSuQmCC');
		textureOver.colorSpace = player.getVRTextureColorSpace();
		el.userData.materialOver = new THREE.MeshBasicMaterial( {map: textureOver, side: THREE.DoubleSide, transparent: true} );
		el.userData.materialOver.name = 'ht_video_url_popup_close_materialOver';
		el.userData.ggId="ht_video_url_popup_close";
		me._ht_video_url_popup_close.userData.onclick=function (e) {
			player.setVariableValue('open_video_hs', player.getVariableValue('open_video_hs').replace("<"+me.hotspot.id+">", ''));
		}
		me._ht_video_url_popup_close.userData.onmouseenter=function (e) {
			me._ht_video_url_popup_close.material = me._ht_video_url_popup_close.userData.materialOver;
			me.elementMouseOver['ht_video_url_popup_close']=true;
		}
		me._ht_video_url_popup_close.userData.onmouseleave=function (e) {
			me._ht_video_url_popup_close.material = me._ht_video_url_popup_close.userData.materialNormal;
			me.elementMouseOver['ht_video_url_popup_close']=false;
		}
		me._ht_video_url_popup_close.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_video_url_popup_bg.add(me._ht_video_url_popup_close);
		me._ht_video_url.add(me._ht_video_url_popup_bg);
		el = new THREE.Group();
		el.userData.backgroundColorAlpha = 1;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_video_url_customimage.userData.ggSubElement) {
				me._ht_video_url_customimage.userData.ggSubElement.material.opacity = v
				me._ht_video_url_customimage.userData.ggSubElement.visible = (v>0 && me._ht_video_url_customimage.userData.visible);
			}
			me._ht_video_url_customimage.visible = (v>0 && me._ht_video_url_customimage.userData.visible);
		}
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 50;
		el.userData.height = 50;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_video_url_CustomImage';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_video_url_customimage.visible
			let parentEl = me._ht_video_url_customimage.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_url_customimage.userData.opacity = v;
			v = v * me._ht_video_url_customimage.userData.parentOpacity;
			me._ht_video_url_customimage.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_url_customimage.children.length; i++) {
				let child = me._ht_video_url_customimage.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_url_customimage.userData.parentOpacity = v;
			v = v * me._ht_video_url_customimage.userData.opacity
			me._ht_video_url_customimage.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_url_customimage.children.length; i++) {
				let child = me._ht_video_url_customimage.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_url_customimage = el;
		currentWidth = 50;
		currentHeight = 50;
		var img = {};
		img.geometry = new THREE.PlaneGeometry(currentWidth / 100.0, currentHeight / 100.0, 5, 5 );
		img.geometry.name = 'ht_video_url_CustomImage_imgGeometry';
		loader = new THREE.TextureLoader();
		el.userData.ggSetUrl = function(extUrl) {
			loader.load(extUrl,
				function (texture) {
				texture.colorSpace = player.getVRTextureColorSpace();
				var loadedMaterial = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
				loadedMaterial.name = 'ht_video_url_CustomImage_subElementMaterial';
				me._ht_video_url_customimage.userData.ggSubElement.material = loadedMaterial;
				me._ht_video_url_customimage.userData.ggUpdatePosition();
				me._ht_video_url_customimage.userData.ggText = extUrl;
				me._ht_video_url_customimage.userData.setOpacity(me._ht_video_url_customimage.userData.opacity);
			});
		};
		if ((hotspot) && (hotspot.customimage)) {
			var extUrl=hotspot.customimage;
		}
		el.userData.ggSetUrl(extUrl);
		material = new THREE.MeshBasicMaterial( {color: 0xffffff, side: THREE.DoubleSide, transparent: true } );
		material.name = 'ht_video_url_CustomImage_subElementMaterial';
		el.userData.ggSubElement = new THREE.Mesh( img.geometry, material );
		el.userData.ggSubElement.name = 'ht_video_url_CustomImage_subElement';
		el.userData.ggSubElement.position.z = el.position.z + 0.005;
		el.add(el.userData.ggSubElement);
		el.userData.clientWidth = 50;
		el.userData.clientHeight = 50;
		el.userData.ggId="ht_video_url_CustomImage";
		me._ht_video_url_customimage.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage == "")) || 
				(((player.getVariableValue('open_video_hs') !== null) && (player.getVariableValue('open_video_hs')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_video_url_customimage.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_video_url_customimage.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._ht_video_url_customimage.ggCurrentLogicStateVisible == 0) {
			me._ht_video_url_customimage.visible=false;
			me._ht_video_url_customimage.userData.visible=false;
				}
				else {
			me._ht_video_url_customimage.visible=((!me._ht_video_url_customimage.material && Number(me._ht_video_url_customimage.userData.opacity>0)) || Number(me._ht_video_url_customimage.material.opacity)>0)?true:false;
			me._ht_video_url_customimage.userData.visible=true;
				}
			}
		}
		me._ht_video_url_customimage.logicBlock_visible();
		me._ht_video_url_customimage.userData.onclick=function (e) {
			player.setVariableValue('open_video_hs', player.getVariableValue('open_video_hs') + "<"+me.hotspot.id+">");
			me._ht_video_url_popup.userData.ggInitMedia(player._(me.hotspot.url));
		}
		me._ht_video_url_customimage.userData.ggUpdatePosition=function (useTransition) {
			var parentWidth = me._ht_video_url_customimage.userData.clientWidth;
			var parentHeight = me._ht_video_url_customimage.userData.clientHeight;
			var img = me._ht_video_url_customimage.userData.ggSubElement;
			var imgWidth = img.material.map.image.naturalWidth;
			var imgHeight = img.material.map.image.naturalHeight;
			var aspectRatioDiv = parentWidth / parentHeight;
			var aspectRatioImg = imgWidth / imgHeight;
			if (imgWidth < parentWidth) parentWidth = imgWidth;
			if (imgHeight < parentHeight) parentHeight = imgHeight;
			var currentWidth, currentHeight;
			img.geometry.dispose();
			if ((hotspot) && (hotspot.customimage)) {
				currentWidth  = hotspot.customimagewidth;
				currentHeight = hotspot.customimageheight;
			img.geometry = new THREE.PlaneGeometry(currentWidth / 100.0, currentHeight / 100.0, 5, 5 );
			img.geometry.name = 'ht_video_url_CustomImage_imgGeometry';
			}
		}
		me._ht_video_url.add(me._ht_video_url_customimage);
		me._ht_video_url.userData.setOpacity(1.00);
		me.elementMouseOver['ht_video_url']=false;
		me._ht_video_url_bg.logicBlock_scaling();
		me._ht_video_url_bg.logicBlock_visible();
		me._ht_video_url_bg.logicBlock_alpha();
		me._ht_video_url_bg.userData.setOpacity(1.00);
		me.elementMouseOver['ht_video_url_bg']=false;
		me._ht_video_url_icon.userData.setOpacity(1.00);
		me._ht_video_url_title.logicBlock_alpha();
		me._ht_video_url_title.userData.setOpacity(0.00);
		me._ht_video_url_popup_bg.logicBlock_scaling();
		me._ht_video_url_popup_bg.logicBlock_alpha();
		me._ht_video_url_popup_bg.userData.setOpacity(0.00);
		me._ht_video_url_popup.logicBlock_visible();
		me._ht_video_url_popup.userData.setOpacity(1.00);
		me._ht_video_url_popup.userData.ggVideoSource = '';
		me._ht_video_url_popup.userData.ggVideoNotLoaded = true;
		me._ht_video_url_popup_close.userData.setOpacity(1.00);
		me.elementMouseOver['ht_video_url_popup_close']=false;
		me._ht_video_url_customimage.logicBlock_visible();
		me._ht_video_url_customimage.userData.setOpacity(1.00);
			me.ggEvent_activehotspotchanged=function() {
				me._ht_video_url_bg.logicBlock_visible();
				me._ht_video_url_customimage.logicBlock_visible();
			};
			me.ggEvent_changenode=function() {
				me._ht_video_url_bg.logicBlock_visible();
				me._ht_video_url_bg.logicBlock_alpha();
					me._ht_video_url_title.userData.ggUpdateText();
				me._ht_video_url_popup_bg.logicBlock_scaling();
				me._ht_video_url_popup_bg.logicBlock_alpha();
				me._ht_video_url_popup.logicBlock_visible();
				me._ht_video_url_customimage.logicBlock_visible();
			};
			me.ggEvent_configloaded=function() {
				me._ht_video_url_bg.logicBlock_visible();
				me._ht_video_url_bg.logicBlock_alpha();
				me._ht_video_url_popup_bg.logicBlock_scaling();
				me._ht_video_url_popup_bg.logicBlock_alpha();
				me._ht_video_url_popup.logicBlock_visible();
				me._ht_video_url_customimage.logicBlock_visible();
			};
			me.ggEvent_varchanged_open_video_hs=function() {
				me._ht_video_url_bg.logicBlock_alpha();
				me._ht_video_url_popup_bg.logicBlock_scaling();
				me._ht_video_url_popup_bg.logicBlock_alpha();
				me._ht_video_url_popup.logicBlock_visible();
				me._ht_video_url_customimage.logicBlock_visible();
			};
			me.__obj = me._ht_video_url;
			me.__obj.userData.hotspot = hotspot;
			me.__obj.userData.fromSkin = true;
	};
	function SkinHotspotClass_ht_video_file(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.ggUserdata.nodeId=nodeId;
		me.elementMouseDown={};
		me.elementMouseOver={};
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el = new THREE.Group();
		el.userData.setOpacityInternal = function(v) {};
		el.name = 'ht_video_file';
		el.userData.x = 2.72;
		el.userData.y = 2.08;
		el.userData.hanchor = 0;
		el.userData.vanchor = 0;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_video_file.visible
			let parentEl = me._ht_video_file.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_file.userData.opacity = v;
			v = v * me._ht_video_file.userData.parentOpacity;
			me._ht_video_file.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file.children.length; i++) {
				let child = me._ht_video_file.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_file.userData.parentOpacity = v;
			v = v * me._ht_video_file.userData.opacity
			me._ht_video_file.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file.children.length; i++) {
				let child = me._ht_video_file.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_file = el;
		el.userData.ggId="ht_video_file";
		el.userData.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.userData.ggElementNodeId)) {
					return this.parentNode.userData.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_video_file.userData.onclick=function (e) {
			player.triggerEvent('hsproxyclick', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_video_file.userData.ondblclick=function (e) {
			player.triggerEvent('hsproxydblclick', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_video_file.userData.onmouseenter=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_video_file']=true;
			player.triggerEvent('hsproxyover', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_video_file.userData.onmouseleave=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_video_file']=false;
			player.triggerEvent('hsproxyout', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_video_file.userData.ggUpdatePosition=function (useTransition) {
		}
		width = 0.45;
		height = 0.45;
		roundedRectShape = new THREE.Shape();
		roundedRectShape.moveTo((-width / 2.0) + 0.12, (height / 2.0));
		roundedRectShape.lineTo((width / 2.0) - 0.12, (height / 2.0));
		roundedRectShape.arc(0, -0.12, 0.12, Math.PI / 2.0, 2.0 * Math.PI, true);
		roundedRectShape.lineTo((width / 2.0), (-height / 2.0) + 0.12);
		roundedRectShape.arc(-0.12, 0, 0.12, 2.0 * Math.PI, 3.0 * Math.PI / 2.0, true);
		roundedRectShape.lineTo((-width / 2.0) + 0.12, (-height / 2.0));
		roundedRectShape.arc(0, 0.12, 0.12, 3.0 * Math.PI / 2.0, Math.PI, true);
		roundedRectShape.lineTo((-width / 2.0), (height / 2.0) - 0.12);
		roundedRectShape.arc(0.12, 0, 0.12, Math.PI, Math.PI / 2.0, true);
		geometry = new THREE.ShapeGeometry(roundedRectShape);
		geometry.name = 'ht_video_file_bg_geometry';
		geometry.computeBoundingBox();
		var min = geometry.boundingBox.min;
		var max = geometry.boundingBox.max;
		var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
		var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
		var vertexPositions = geometry.getAttribute('position');
		var vertexUVs = geometry.getAttribute('uv');
		for (var i = 0; i < vertexPositions.count; i++) {
			var v1 = vertexPositions.getX(i);
			var	v2 = vertexPositions.getY(i);
			vertexUVs.setX(i, (v1 + offset.x) / range.x);
			vertexUVs.setY(i, (v2 + offset.y) / range.y);
		}
		geometry.uvsNeedUpdate = true;
		material = new THREE.MeshBasicMaterial( { color: new THREE.Color(0.290196, 0.290196, 0.290196).convertSRGBToLinear(), side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'ht_video_file_bg_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 0.588235;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._ht_video_file_bg.material.opacity = v * me._ht_video_file_bg.userData.backgroundColorAlpha;
			if (me._ht_video_file_bg.userData.ggSubElement) {
				me._ht_video_file_bg.userData.ggSubElement.material.opacity = v
				me._ht_video_file_bg.userData.ggSubElement.visible = (v>0 && me._ht_video_file_bg.userData.visible);
			}
			me._ht_video_file_bg.visible = (v>0 && me._ht_video_file_bg.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._ht_video_file_bg.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_video_file_bg.userData.backgroundColorAlpha = v;
			me._ht_video_file_bg.userData.setOpacity(me._ht_video_file_bg.userData.opacity);
		}
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 45;
		el.userData.height = 45;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_video_file_bg';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.010);
		el.renderOrder = 1;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_video_file_bg.visible
			let parentEl = me._ht_video_file_bg.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_file_bg.userData.opacity = v;
			v = v * me._ht_video_file_bg.userData.parentOpacity;
			me._ht_video_file_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file_bg.children.length; i++) {
				let child = me._ht_video_file_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_file_bg.userData.parentOpacity = v;
			v = v * me._ht_video_file_bg.userData.opacity
			me._ht_video_file_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file_bg.children.length; i++) {
				let child = me._ht_video_file_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = false;
		el.userData.visible = false;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_file_bg = el;
		el.userData.ggId="ht_video_file_bg";
		me._ht_video_file_bg.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((me.elementMouseOver['ht_video_file_bg'] == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._ht_video_file_bg.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._ht_video_file_bg.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._ht_video_file_bg.ggCurrentLogicStateScaling == 0) {
					me._ht_video_file_bg.userData.transitionValue_scale = {x: 1.2, y: 1.2, z: 1.0};
					for (var i = 0; i < me._ht_video_file_bg.userData.transitions.length; i++) {
						if (me._ht_video_file_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_video_file_bg.userData.transitions[i].interval);
							me._ht_video_file_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._ht_video_file_bg.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_file_bg.scale.set(transition_scale.startScale.x + (me._ht_video_file_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_video_file_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_video_file_bg.position.x = (me._ht_video_file_bg.position.x - me._ht_video_file_bg.userData.curScaleOffX) + scaleOffX;
						me._ht_video_file_bg.userData.curScaleOffX = scaleOffX;
						me._ht_video_file_bg.position.y = (me._ht_video_file_bg.position.y - me._ht_video_file_bg.userData.curScaleOffY) + scaleOffY;
						me._ht_video_file_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_video_file_bg.userData.transitions.splice(me._ht_video_file_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_video_file_bg.userData.transitions.push(transition_scale);
				}
				else {
					me._ht_video_file_bg.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._ht_video_file_bg.userData.transitions.length; i++) {
						if (me._ht_video_file_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_video_file_bg.userData.transitions[i].interval);
							me._ht_video_file_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._ht_video_file_bg.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_file_bg.scale.set(transition_scale.startScale.x + (me._ht_video_file_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_video_file_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_video_file_bg.position.x = (me._ht_video_file_bg.position.x - me._ht_video_file_bg.userData.curScaleOffX) + scaleOffX;
						me._ht_video_file_bg.userData.curScaleOffX = scaleOffX;
						me._ht_video_file_bg.position.y = (me._ht_video_file_bg.position.y - me._ht_video_file_bg.userData.curScaleOffY) + scaleOffY;
						me._ht_video_file_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_video_file_bg.userData.transitions.splice(me._ht_video_file_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_video_file_bg.userData.transitions.push(transition_scale);
				}
			}
		}
		me._ht_video_file_bg.logicBlock_scaling();
		me._ht_video_file_bg.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage == ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_video_file_bg.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_video_file_bg.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._ht_video_file_bg.ggCurrentLogicStateVisible == 0) {
			me._ht_video_file_bg.visible=((!me._ht_video_file_bg.material && Number(me._ht_video_file_bg.userData.opacity>0)) || Number(me._ht_video_file_bg.material.opacity)>0)?true:false;
			me._ht_video_file_bg.userData.visible=true;
				}
				else {
			me._ht_video_file_bg.visible=false;
			me._ht_video_file_bg.userData.visible=false;
				}
			}
		}
		me._ht_video_file_bg.logicBlock_visible();
		me._ht_video_file_bg.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				(((player.getVariableValue('open_video_hs') !== null) && (player.getVariableValue('open_video_hs')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._ht_video_file_bg.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._ht_video_file_bg.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				if (me._ht_video_file_bg.ggCurrentLogicStateAlpha == 0) {
					me._ht_video_file_bg.userData.transitionValue_alpha = 0;
					for (var i = 0; i < me._ht_video_file_bg.userData.transitions.length; i++) {
						if (me._ht_video_file_bg.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_video_file_bg.userData.transitions[i].interval);
							me._ht_video_file_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_video_file_bg.material ? me._ht_video_file_bg.material.opacity : me._ht_video_file_bg.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_file_bg.userData.setOpacity(transition_alpha.startAlpha + (me._ht_video_file_bg.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_video_file_bg.userData.transitions.splice(me._ht_video_file_bg.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_video_file_bg.userData.transitions.push(transition_alpha);
				}
				else {
					me._ht_video_file_bg.userData.transitionValue_alpha = 1;
					for (var i = 0; i < me._ht_video_file_bg.userData.transitions.length; i++) {
						if (me._ht_video_file_bg.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_video_file_bg.userData.transitions[i].interval);
							me._ht_video_file_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_video_file_bg.material ? me._ht_video_file_bg.material.opacity : me._ht_video_file_bg.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_file_bg.userData.setOpacity(transition_alpha.startAlpha + (me._ht_video_file_bg.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_video_file_bg.userData.transitions.splice(me._ht_video_file_bg.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_video_file_bg.userData.transitions.push(transition_alpha);
				}
			}
		}
		me._ht_video_file_bg.logicBlock_alpha();
		me._ht_video_file_bg.userData.onclick=function (e) {
			player.setVariableValue('open_video_hs', player.getVariableValue('open_video_hs') + "<"+me.hotspot.id+">");
			me._ht_video_file_popup.userData.ggInitMedia(player._(me.hotspot.url));
		}
		me._ht_video_file_bg.userData.onmouseenter=function (e) {
			me.elementMouseOver['ht_video_file_bg']=true;
			me._ht_video_file_title.logicBlock_alpha();
			me._ht_video_file_bg.logicBlock_scaling();
		}
		me._ht_video_file_bg.userData.ontouchend=function (e) {
			me._ht_video_file_bg.logicBlock_scaling();
		}
		me._ht_video_file_bg.userData.onmouseleave=function (e) {
			me.elementMouseOver['ht_video_file_bg']=false;
			me._ht_video_file_title.logicBlock_alpha();
			me._ht_video_file_bg.logicBlock_scaling();
		}
		me._ht_video_file_bg.userData.ggUpdatePosition=function (useTransition) {
		}
		geometry = new THREE.PlaneGeometry(0.36, 0.36, 5, 5 );
		geometry.name = 'ht_video_file_icon_geometry';
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAEVklEQVR4nO2bX2hTVxzHP7+TppsKwqZYR22S1tbBwAqrLNG9DGFPA8dkL3sYW7duvo8h2L0rYwh7XTenvuxlMNnY20CfXBJQwQoDbWyb1jI7/AOCf2jM+e0huWlSk6ze/Fm8OZ+nc0/OOd+TL/d+b7j5XXA4HA6Hw+FwOBwOh6PDkHof7sxc2JbDjJgQ4XZtqBY2Ty6Mnbkx/OY/7dStatDAbPKgQSYV4u3czHoQSFv02OLQvt/apLfK2MWL4dtbnnynyng7xBtBhFNb7/QcvrR3b66VOj3lBxXmKEsictqKvRqC5VZuYj3koc+o2a2qHyP0qzJ+e8sTgE9aqVs6gwZmkwcF+bVwpD/35mUiM5K430pxPwzPpDavhDgJvA+g6LutvNzMakMmKSguda'+
	'o5AJmRxP3ePJ+iLBV65Ggr9QwU7lZeIIvI6U41xyMzkrgvomcABBI7Mxe2NWvt6Hx6MDqfHvSODUAOM+J1WLFXmyXWSqww7bXL9+8bVROZSx9Rq9fU6jXPpB4AEyJstTCuEwJ5PYRg2Rbbjf5O659J7QjNp8+gHCh15u1+YM7UntYdRG8kD4VCTFeYA4gpZFxP9WnBp+/WlU0vPHz8raITXp/AdYVd5eO60qBIJjUmDx/9VGbGXTEyIWrvqcr58rHddYkVgxhDsmSOcM6G7Wg2Fj9bbUrXnEFVgjgnyFfZ2BsnELG15nWFQdEbyUMq/IDyEhSyBqMfZGOJy/81N9AGVQtiYOrxxg1fLG/f82A9awTWoFpBXCtrahG8kPYRxPUI1BnkN4jrERiDGgniegTCIKvyJcI7ZV3PFMT1CIRBUDLHVxDX4zk2SF+peKSunLe9'+
	'9sObA/uXmqkSmLuYSv2/sPzyHBskf1ccwVsmZ6aj8+n3mqnyHBtUjvxebLysVn+JzKam+m5d2dSMlQNhkBF7QowcAu4Wuz578eGjy5FMaqzhtRtdoFPIxuJnbdiOIpwDUNiFIRmZSx9B1ff3DIxBADcH9i8txOJvC3IEyAFhVL+OzKf/2LH4Z7+fNQNlEAAiNjsU/wbLPoHrACgH/AZ48AwqsjCcuPR444bXge+LXb4CPLAGASxv3/NgYSjxeSMBHmiDPBoJ8K4wCPwHeNcYBPgK8O4yqEitALcqU2vHdqVBUDPAnyqC6FqDPNYG+FoMFCpIvY489LVrc41Qvs/y/fuhSoDnVEwWigaFsTPeYKNmdyNi7cIoo167fP++KQa4Ed0lRl7NxuJzUPZILjqbSinEUZZ6La91cpXZ8Exq84rhL4R+hdTiUGJfq7RKGWTRYw'+
	'AI/SshTg7PpDa3SrQRSkWcQvG3ix5vpV7FY8roXOrHyjJgPWOF6U6oOiuUATOqKh955ohwKjuYaGkZcMVD+613eg7f3vIEVcYLp69MioKvf9yajADqNVgtJM+2QfcpBmaTB0GOCiRarP/MKKRAj/8vryKsxb3M4nA4HA6Hw+FwOBwORwfyL1F96N/hwTYgAAAAAElFTkSuQmCC');
		texture.colorSpace = player.getVRTextureColorSpace();
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'ht_video_file_icon_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.materialNormal = material;
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 36;
		el.userData.height = 36;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_video_file_icon';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.020);
		el.renderOrder = 2;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_video_file_icon.material) me._ht_video_file_icon.material.opacity = v;
			me._ht_video_file_icon.visible = (v>0 && me._ht_video_file_icon.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._ht_video_file_icon.visible
			let parentEl = me._ht_video_file_icon.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_file_icon.userData.opacity = v;
			v = v * me._ht_video_file_icon.userData.parentOpacity;
			me._ht_video_file_icon.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file_icon.children.length; i++) {
				let child = me._ht_video_file_icon.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_file_icon.userData.parentOpacity = v;
			v = v * me._ht_video_file_icon.userData.opacity
			me._ht_video_file_icon.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file_icon.children.length; i++) {
				let child = me._ht_video_file_icon.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_file_icon = el;
		el.userData.ggId="ht_video_file_icon";
		me._ht_video_file_icon.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_video_file_bg.add(me._ht_video_file_icon);
		geometry = new THREE.PlaneGeometry(1, 0.2, 5, 5 );
		geometry.name = 'ht_video_file_title_geometry';
		material = new THREE.MeshBasicMaterial( {side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'ht_video_file_title_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 1;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._ht_video_file_title.material.opacity = v;
			if (me._ht_video_file_title.userData.hasScrollbar) {
				me._ht_video_file_title.userData.scrollbar.material.opacity = v;
				me._ht_video_file_title.userData.scrollbarBg.material.opacity = v;
			}
			if (me._ht_video_file_title.userData.ggSubElement) {
				me._ht_video_file_title.userData.ggSubElement.material.opacity = v
				me._ht_video_file_title.userData.ggSubElement.visible = (v>0 && me._ht_video_file_title.userData.visible);
			}
			me._ht_video_file_title.visible = (v>0 && me._ht_video_file_title.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._ht_video_file_title.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_video_file_title.userData.backgroundColorAlpha = v;
			me._ht_video_file_title.userData.setOpacity(me._ht_video_file_title.userData.opacity);
		}
		el.translateX(0);
		el.translateY(-0.325);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 100;
		el.userData.height = 20;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_video_file_title';
		el.userData.x = 0;
		el.userData.y = -0.325;
		el.userData.hanchor = 1;
		el.userData.vanchor = 2;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_video_file_title.visible
			let parentEl = me._ht_video_file_title.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_file_title.userData.opacity = v;
			v = v * me._ht_video_file_title.userData.parentOpacity;
			me._ht_video_file_title.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file_title.children.length; i++) {
				let child = me._ht_video_file_title.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_file_title.userData.parentOpacity = v;
			v = v * me._ht_video_file_title.userData.opacity
			me._ht_video_file_title.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file_title.children.length; i++) {
				let child = me._ht_video_file_title.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 0.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_file_title = el;
		el.userData.textLines = [];
		el.userData.backgroundColor = new THREE.Color(1, 1, 1).convertSRGBToLinear();
		el.userData.textColor = new THREE.Color(0.117647, 0.870588, 0.784314).convertSRGBToLinear();
		el.userData.textColorAlpha = 1;
		var canvas = document.createElement('canvas');
		canvas.width = 200;
		canvas.height = 40;
		el.userData.textCanvas = canvas;
		el.userData.textCanvasContext = canvas.getContext('2d');
		el.userData.ggStripTags = function(text) {
			let doc = new DOMParser().parseFromString(text, 'text/html');
			return doc.body.textContent || '';
		}
		el.userData.ggWrapText = function(scrollbar) {
			me._ht_video_file_title.userData.totalHeightCanv = 2 * (3);
			me._ht_video_file_title.userData.textLines = [];
			var ctx = me._ht_video_file_title.userData.textCanvasContext;
			var words = [];
			let tmpText = String(me._ht_video_file_title.userData.ggText);
			let whiteSpaceIndex = -1;
			do {
				whiteSpaceIndex = tmpText.search(/[\s]/);
				if (whiteSpaceIndex != -1) {
					words.push(tmpText.substr(0, whiteSpaceIndex));
					tmpText = tmpText.substr(whiteSpaceIndex);
					if (tmpText.charAt(0) == '\n') {
						words.push('\n');
					}
					tmpText = tmpText.substr(1);
				} else {
					words.push(tmpText);
				}
			} while (whiteSpaceIndex != -1);
			var line = '';
			for (var i = 0; i < words.length; i++) {
				if (words[i] == '\n') {
					me._ht_video_file_title.userData.textLines.push(line);
					line = '';
					me._ht_video_file_title.userData.totalHeightCanv += me._ht_video_file_title.userData.lineHeightCanv;
					continue;
				}
				var testLine;
				if (line == '') {
					testLine = words[i]
				} else {
					testLine = line + ' ' + words[i];
				}
				var metrics = ctx.measureText(testLine);
				var testWidth = metrics.width;
				if (testWidth > (2 * (me._ht_video_file_title.userData.width - 0 - (scrollbar ? 25 : 0))) && i > 0) {
					me._ht_video_file_title.userData.textLines.push(line);
					line = words[i];
					me._ht_video_file_title.userData.totalHeightCanv += me._ht_video_file_title.userData.lineHeightCanv;
				} else {
					line = testLine;
				}
			}
			me._ht_video_file_title.userData.textLines.push(line);
			me._ht_video_file_title.userData.totalHeightCanv += me._ht_video_file_title.userData.lineHeightCanv;
		}
		el.userData.ggPaintCanvasText = function() {
			var canv = me._ht_video_file_title.userData.textCanvas;
			var ctx = me._ht_video_file_title.userData.textCanvasContext;
			ctx.clearRect(0, 0, canv.width, canv.height);
			ctx.fillStyle = 'rgba(' + me._ht_video_file_title.userData.textColor.r * 255 + ', ' + me._ht_video_file_title.userData.textColor.g * 255 + ', ' + me._ht_video_file_title.userData.textColor.b * 255 + ', ' + me._ht_video_file_title.userData.textColorAlpha + ')';
			ctx.textBaseline = 'top';
			var x = (me._ht_video_file_title.userData.boxWidthCanv - (me._ht_video_file_title.userData.hasScrollbar ? 50 : 0)) / 2;
			ctx.textAlign = 'center';
			var y = 2 * 3;
			for (var i = 0; i < me._ht_video_file_title.userData.textLines.length; i++) {
				ctx.fillText(me._ht_video_file_title.userData.textLines[i], x, y);
				y += me._ht_video_file_title.userData.lineHeightCanv;
			}
			geometry = new THREE.PlaneGeometry(me._ht_video_file_title.userData.boxWidthCanv / 200.0, me._ht_video_file_title.userData.boxHeightCanv / 200.0, 5, 5 );
			geometry.name = 'ht_video_file_title_geometry';
			me._ht_video_file_title.geometry.dispose();
			me._ht_video_file_title.geometry = geometry;
			var diffY = (me._ht_video_file_title.userData.boxHeightCanv / 2) - me._ht_video_file_title.userData.height;
			me._ht_video_file_title.position.y = me._ht_video_file_title.userData.y - ((diffY / 2.0) / 100.0);
			var textTexture = new THREE.CanvasTexture(canv);
			textTexture.name = 'ht_video_file_title_texture';
			textTexture.minFilter = THREE.LinearFilter;
			textTexture.colorSpace = THREE.LinearSRGBColorSpace;
			textTexture.wrapS = THREE.ClampToEdgeWrapping;
			textTexture.wrapT = THREE.ClampToEdgeWrapping;
			if (me._ht_video_file_title.material.map) {
				me._ht_video_file_title.material.map.dispose();
			}
			me._ht_video_file_title.material.map = textTexture;
		}
		el.userData.ggRenderText = function() {
			for (let i = 0; i < me._ht_video_file_title.children.length; i++) {
				let child = me._ht_video_file_title.children[i];
				if (child.name.includes('scrollbar')) me._ht_video_file_title.remove(child);
			}
			var canv = me._ht_video_file_title.userData.textCanvas;
			var ctx = me._ht_video_file_title.userData.textCanvasContext;
			ctx.font = '36px Verdana';
			me._ht_video_file_title.userData.lineHeightCanv = 36 * 1.2;
			me._ht_video_file_title.userData.textLines = [];
			me._ht_video_file_title.userData.textLines.push(me._ht_video_file_title.userData.ggText);
			me._ht_video_file_title.userData.totalHeightCanv = 2 * (3);
			me._ht_video_file_title.userData.totalHeightCanv += me._ht_video_file_title.userData.lineHeightCanv;
			me._ht_video_file_title.userData.boxWidthCanv = ctx.measureText(me._ht_video_file_title.userData.ggText).width + (2 * 0);
			me._ht_video_file_title.userData.boxHeightCanv = me._ht_video_file_title.userData.totalHeightCanv;
			canv.width = me._ht_video_file_title.userData.boxWidthCanv;
			canv.height = me._ht_video_file_title.userData.boxHeightCanv;
			ctx.font = '36px Verdana';
			me._ht_video_file_title.userData.ggPaintCanvasText();
		}
		me._ht_video_file_title.userData.ggUpdateText=function(force) {
			var params = [];
			params.push(player._(String(player._(me.hotspot.title))));
			var hs = player._("%1", params);
			if (hs!=this.ggText || force) {
				this.ggText=me._ht_video_file_title.userData.ggStripTags(hs);
				this.ggRenderText();
			}
		}
		me._ht_video_file_title.userData.ggUpdateText();
		el.userData.setBackgroundColor = function(v) {
			me._ht_video_file_title.userData.backgroundColor = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_video_file_title.userData.backgroundColorAlpha = v;
		}
		el.userData.setTextColor = function(v) {
			me._ht_video_file_title.userData.textColor = v;
		}
		el.userData.setTextColorAlpha = function(v) {
			me._ht_video_file_title.userData.textColorAlpha = v;
		}
		el.userData.ggId="ht_video_file_title";
		me._ht_video_file_title.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['ht_video_file_bg'] == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._ht_video_file_title.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._ht_video_file_title.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				if (me._ht_video_file_title.ggCurrentLogicStateAlpha == 0) {
					me._ht_video_file_title.userData.transitionValue_alpha = 1;
					for (var i = 0; i < me._ht_video_file_title.userData.transitions.length; i++) {
						if (me._ht_video_file_title.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_video_file_title.userData.transitions[i].interval);
							me._ht_video_file_title.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_video_file_title.material ? me._ht_video_file_title.material.opacity : me._ht_video_file_title.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_file_title.userData.setOpacity(transition_alpha.startAlpha + (me._ht_video_file_title.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_video_file_title.userData.transitions.splice(me._ht_video_file_title.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_video_file_title.userData.transitions.push(transition_alpha);
				}
				else {
					me._ht_video_file_title.userData.transitionValue_alpha = 0;
					for (var i = 0; i < me._ht_video_file_title.userData.transitions.length; i++) {
						if (me._ht_video_file_title.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_video_file_title.userData.transitions[i].interval);
							me._ht_video_file_title.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_video_file_title.material ? me._ht_video_file_title.material.opacity : me._ht_video_file_title.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_file_title.userData.setOpacity(transition_alpha.startAlpha + (me._ht_video_file_title.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_video_file_title.userData.transitions.splice(me._ht_video_file_title.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_video_file_title.userData.transitions.push(transition_alpha);
				}
			}
		}
		me._ht_video_file_title.logicBlock_alpha();
		me._ht_video_file_title.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_video_file_bg.add(me._ht_video_file_title);
		me._ht_video_file.add(me._ht_video_file_bg);
		width = 6.6;
		height = 4.8;
		roundedRectShape = new THREE.Shape();
		roundedRectShape.moveTo((-width / 2.0) + 0.3, (height / 2.0));
		roundedRectShape.lineTo((width / 2.0) - 0.3, (height / 2.0));
		roundedRectShape.arc(0, -0.3, 0.3, Math.PI / 2.0, 2.0 * Math.PI, true);
		roundedRectShape.lineTo((width / 2.0), (-height / 2.0) + 0.3);
		roundedRectShape.arc(-0.3, 0, 0.3, 2.0 * Math.PI, 3.0 * Math.PI / 2.0, true);
		roundedRectShape.lineTo((-width / 2.0) + 0.3, (-height / 2.0));
		roundedRectShape.arc(0, 0.3, 0.3, 3.0 * Math.PI / 2.0, Math.PI, true);
		roundedRectShape.lineTo((-width / 2.0), (height / 2.0) - 0.3);
		roundedRectShape.arc(0.3, 0, 0.3, Math.PI, Math.PI / 2.0, true);
		geometry = new THREE.ShapeGeometry(roundedRectShape);
		geometry.name = 'ht_video_file_popup_bg_geometry';
		geometry.computeBoundingBox();
		var min = geometry.boundingBox.min;
		var max = geometry.boundingBox.max;
		var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
		var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
		var vertexPositions = geometry.getAttribute('position');
		var vertexUVs = geometry.getAttribute('uv');
		for (var i = 0; i < vertexPositions.count; i++) {
			var v1 = vertexPositions.getX(i);
			var	v2 = vertexPositions.getY(i);
			vertexUVs.setX(i, (v1 + offset.x) / range.x);
			vertexUVs.setY(i, (v2 + offset.y) / range.y);
		}
		geometry.uvsNeedUpdate = true;
		material = new THREE.MeshBasicMaterial( { color: new THREE.Color(0.290196, 0.290196, 0.290196).convertSRGBToLinear(), side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'ht_video_file_popup_bg_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 0.666667;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._ht_video_file_popup_bg.material.opacity = v * me._ht_video_file_popup_bg.userData.backgroundColorAlpha;
			if (me._ht_video_file_popup_bg.userData.ggSubElement) {
				me._ht_video_file_popup_bg.userData.ggSubElement.material.opacity = v
				me._ht_video_file_popup_bg.userData.ggSubElement.visible = (v>0 && me._ht_video_file_popup_bg.userData.visible);
			}
			me._ht_video_file_popup_bg.visible = (v>0 && me._ht_video_file_popup_bg.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._ht_video_file_popup_bg.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_video_file_popup_bg.userData.backgroundColorAlpha = v;
			me._ht_video_file_popup_bg.userData.setOpacity(me._ht_video_file_popup_bg.userData.opacity);
		}
		el.translateX(0);
		el.translateY(0);
		el.scale.set(0.10, 0.10, 1.0);
		el.userData.width = 660;
		el.userData.height = 480;
		el.userData.scale = {x: 0.10, y: 0.10, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_video_file_popup_bg';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.020);
		el.renderOrder = 2;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_video_file_popup_bg.visible
			let parentEl = me._ht_video_file_popup_bg.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_file_popup_bg.userData.opacity = v;
			v = v * me._ht_video_file_popup_bg.userData.parentOpacity;
			me._ht_video_file_popup_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file_popup_bg.children.length; i++) {
				let child = me._ht_video_file_popup_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_file_popup_bg.userData.parentOpacity = v;
			v = v * me._ht_video_file_popup_bg.userData.opacity
			me._ht_video_file_popup_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file_popup_bg.children.length; i++) {
				let child = me._ht_video_file_popup_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 0.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_file_popup_bg = el;
		el.userData.ggId="ht_video_file_popup_bg";
		me._ht_video_file_popup_bg.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				(((player.getVariableValue('open_video_hs') !== null) && (player.getVariableValue('open_video_hs')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._ht_video_file_popup_bg.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._ht_video_file_popup_bg.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._ht_video_file_popup_bg.ggCurrentLogicStateScaling == 0) {
					me._ht_video_file_popup_bg.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._ht_video_file_popup_bg.userData.transitions.length; i++) {
						if (me._ht_video_file_popup_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_video_file_popup_bg.userData.transitions[i].interval);
							me._ht_video_file_popup_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._ht_video_file_popup_bg.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_file_popup_bg.scale.set(transition_scale.startScale.x + (me._ht_video_file_popup_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_video_file_popup_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_video_file_popup_bg.position.x = (me._ht_video_file_popup_bg.position.x - me._ht_video_file_popup_bg.userData.curScaleOffX) + scaleOffX;
						me._ht_video_file_popup_bg.userData.curScaleOffX = scaleOffX;
						me._ht_video_file_popup_bg.position.y = (me._ht_video_file_popup_bg.position.y - me._ht_video_file_popup_bg.userData.curScaleOffY) + scaleOffY;
						me._ht_video_file_popup_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_video_file_popup_bg.userData.transitions.splice(me._ht_video_file_popup_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_video_file_popup_bg.userData.transitions.push(transition_scale);
				}
				else {
					me._ht_video_file_popup_bg.userData.transitionValue_scale = {x: 0.1, y: 0.1, z: 1.0};
					for (var i = 0; i < me._ht_video_file_popup_bg.userData.transitions.length; i++) {
						if (me._ht_video_file_popup_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_video_file_popup_bg.userData.transitions[i].interval);
							me._ht_video_file_popup_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._ht_video_file_popup_bg.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_file_popup_bg.scale.set(transition_scale.startScale.x + (me._ht_video_file_popup_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_video_file_popup_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_video_file_popup_bg.position.x = (me._ht_video_file_popup_bg.position.x - me._ht_video_file_popup_bg.userData.curScaleOffX) + scaleOffX;
						me._ht_video_file_popup_bg.userData.curScaleOffX = scaleOffX;
						me._ht_video_file_popup_bg.position.y = (me._ht_video_file_popup_bg.position.y - me._ht_video_file_popup_bg.userData.curScaleOffY) + scaleOffY;
						me._ht_video_file_popup_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_video_file_popup_bg.userData.transitions.splice(me._ht_video_file_popup_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_video_file_popup_bg.userData.transitions.push(transition_scale);
				}
			}
		}
		me._ht_video_file_popup_bg.logicBlock_scaling();
		me._ht_video_file_popup_bg.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				(((player.getVariableValue('open_video_hs') !== null) && (player.getVariableValue('open_video_hs')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._ht_video_file_popup_bg.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._ht_video_file_popup_bg.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				if (me._ht_video_file_popup_bg.ggCurrentLogicStateAlpha == 0) {
					me._ht_video_file_popup_bg.userData.transitionValue_alpha = 1;
					for (var i = 0; i < me._ht_video_file_popup_bg.userData.transitions.length; i++) {
						if (me._ht_video_file_popup_bg.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_video_file_popup_bg.userData.transitions[i].interval);
							me._ht_video_file_popup_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_video_file_popup_bg.material ? me._ht_video_file_popup_bg.material.opacity : me._ht_video_file_popup_bg.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_file_popup_bg.userData.setOpacity(transition_alpha.startAlpha + (me._ht_video_file_popup_bg.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_video_file_popup_bg.userData.transitions.splice(me._ht_video_file_popup_bg.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_video_file_popup_bg.userData.transitions.push(transition_alpha);
				}
				else {
					me._ht_video_file_popup_bg.userData.transitionValue_alpha = 0;
					for (var i = 0; i < me._ht_video_file_popup_bg.userData.transitions.length; i++) {
						if (me._ht_video_file_popup_bg.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_video_file_popup_bg.userData.transitions[i].interval);
							me._ht_video_file_popup_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_video_file_popup_bg.material ? me._ht_video_file_popup_bg.material.opacity : me._ht_video_file_popup_bg.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_file_popup_bg.userData.setOpacity(transition_alpha.startAlpha + (me._ht_video_file_popup_bg.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_video_file_popup_bg.userData.transitions.splice(me._ht_video_file_popup_bg.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_video_file_popup_bg.userData.transitions.push(transition_alpha);
				}
			}
		}
		me._ht_video_file_popup_bg.logicBlock_alpha();
		me._ht_video_file_popup_bg.userData.ggUpdatePosition=function (useTransition) {
		}
		geometry = new THREE.PlaneGeometry(6, 3.8, 5, 5 );
		geometry.name = 'ht_video_file_popup_geometry';
		material = new THREE.MeshBasicMaterial( {color: 0x000000, side: THREE.DoubleSide, transparent: true} );
		material.name = 'ht_video_file_popup_material';
		el = new THREE.Mesh( geometry, material );
		el.translateX(0);
		el.translateY(-0.1);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 600;
		el.userData.height = 380;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_video_file_popup';
		el.userData.x = 0;
		el.userData.y = -0.1;
		el.userData.hanchor = 1;
		el.userData.vanchor = 2;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_video_file_popup.material) me._ht_video_file_popup.material.opacity = v;
			me._ht_video_file_popup.visible = (v>0 && me._ht_video_file_popup.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._ht_video_file_popup.visible
			let parentEl = me._ht_video_file_popup.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_file_popup.userData.opacity = v;
			v = v * me._ht_video_file_popup.userData.parentOpacity;
			me._ht_video_file_popup.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file_popup.children.length; i++) {
				let child = me._ht_video_file_popup.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_file_popup.userData.parentOpacity = v;
			v = v * me._ht_video_file_popup.userData.opacity
			me._ht_video_file_popup.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file_popup.children.length; i++) {
				let child = me._ht_video_file_popup.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = false;
		el.userData.visible = false;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_file_popup = el;
		me._ht_video_file_popup.userData.seekbars = [];
		me._ht_video_file_popup.userData.ggInitMedia = function(media) {
			if (me._ht_video_file_popup__vid) me._ht_video_file_popup__vid.pause();
			me._ht_video_file_popup__vid = document.createElement('video');
			player.registerVideoElement('ht_video_file_popup', me._ht_video_file_popup__vid);
			me._ht_video_file_popup__vid.setAttribute('autoplay', '');
			me._ht_video_file_popup__vid.setAttribute('crossOrigin', 'anonymous');
			me._ht_video_file_popup__source = document.createElement('source');
			me._ht_video_file_popup__source.setAttribute('src', media);
			me._ht_video_file_popup__vid.addEventListener('loadedmetadata', function() {
				let videoAR = me._ht_video_file_popup__vid.videoWidth / me._ht_video_file_popup__vid.videoHeight;
				let elAR = me._ht_video_file_popup.userData.width / me._ht_video_file_popup.userData.height;
				if (videoAR > elAR) {
					me._ht_video_file_popup.scale.set(1, (me._ht_video_file_popup.userData.width / videoAR) / me._ht_video_file_popup.userData.height, 1);
				} else {
					me._ht_video_file_popup.scale.set((me._ht_video_file_popup.userData.height * videoAR) / me._ht_video_file_popup.userData.width, 1, 1);
				}
			}, false);
			me._ht_video_file_popup__vid.appendChild(me._ht_video_file_popup__source);
			videoTexture = new THREE.VideoTexture( me._ht_video_file_popup__vid );
			videoTexture.name = 'ht_video_file_popup_videoTexture';
			videoTexture.minFilter = THREE.LinearFilter;
			videoTexture.magFilter = THREE.LinearFilter;
			videoTexture.format = THREE.RGBAFormat;
			videoMaterial = new THREE.MeshBasicMaterial( {map: videoTexture, side: THREE.DoubleSide, transparent: true} );
			videoMaterial.name = 'ht_video_file_popup_videoMaterial';
			videoMaterial.alphaTest = 0.5;
			me._ht_video_file_popup.material = videoMaterial;
		}
		el.userData.ggId="ht_video_file_popup";
		me._ht_video_file_popup.userData.ggIsActive=function() {
			if (me._ht_video_file_popup__vid != null) {
				return (me._ht_video_file_popup__vid.paused == false && me._ht_video_file_popup__vid.ended == false);
			} else {
				return false;
			}
		}
		me._ht_video_file_popup.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				(((player.getVariableValue('open_video_hs') !== null) && (player.getVariableValue('open_video_hs')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_video_file_popup.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_video_file_popup.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._ht_video_file_popup.ggCurrentLogicStateVisible == 0) {
			me._ht_video_file_popup.visible=((!me._ht_video_file_popup.material && Number(me._ht_video_file_popup.userData.opacity>0)) || Number(me._ht_video_file_popup.material.opacity)>0)?true:false;
			me._ht_video_file_popup.userData.visible=true;
					if (me._ht_video_file_popup.userData.ggVideoNotLoaded) {
						me._ht_video_file_popup.userData.ggInitMedia(me._ht_video_file_popup.ggVideoSource);
					}
				}
				else {
			me._ht_video_file_popup.visible=false;
			me._ht_video_file_popup.userData.visible=false;
					me._ht_video_file_popup.userData.ggInitMedia('');
				}
			}
		}
		me._ht_video_file_popup.logicBlock_visible();
		me._ht_video_file_popup.userData.onclick=function (e) {
			player.playPauseSound("ht_video_file_popup","1");
		}
		me._ht_video_file_popup.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_video_file_popup_bg.add(me._ht_video_file_popup);
		geometry = new THREE.PlaneGeometry(0.4, 0.4, 5, 5 );
		geometry.name = 'ht_video_file_popup_close_geometry';
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAABJElEQVR4nO3bSw6DMBAEUSs341icfrLJSJGFAeNfY9c7QU9JiJVDAAAAAAAAAADgdcxsM7Nt9I4U6X2/cW4fvSdmZvvfPr2IUUCpiFE8zYAhHA4dHlFx0ymlwUpbsigMV9hQZOQBr4/nRhwyTTzX86Dp4rkeh00bz7U8cPp4rsWhy8RzNQ9eLp6rcfiy8VxJgOXjuSchiBfJCUK8hDthiHfhLBDxbjoKRbxMB8GIlysRUTLeZ/QAVMYnXICfSIGzUES8cCcQERNywhAx8iQIEX9KQiwfsUaAZSPWPHy5iC0OXiZiy0Onj9jjwGkj9jxsuogjDpom4shDXh9R4QCFDY8oDVfacoviYMVNh4xnDmWMhzblTPkpVdDfBwAAAAAAAABA2hcaGfeSY++bsA'+
	'AAAABJRU5ErkJggg==');
		texture.colorSpace = player.getVRTextureColorSpace();
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'ht_video_file_popup_close_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.materialNormal = material;
		el.translateX(2.85);
		el.translateY(2.05);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 40;
		el.userData.height = 40;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_video_file_popup_close';
		el.userData.x = 2.85;
		el.userData.y = 2.05;
		el.userData.hanchor = 2;
		el.userData.vanchor = 0;
		el.translateZ(0.040);
		el.renderOrder = 4;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_video_file_popup_close.material) me._ht_video_file_popup_close.material.opacity = v;
			me._ht_video_file_popup_close.visible = (v>0 && me._ht_video_file_popup_close.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._ht_video_file_popup_close.visible
			let parentEl = me._ht_video_file_popup_close.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_file_popup_close.userData.opacity = v;
			v = v * me._ht_video_file_popup_close.userData.parentOpacity;
			me._ht_video_file_popup_close.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file_popup_close.children.length; i++) {
				let child = me._ht_video_file_popup_close.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_file_popup_close.userData.parentOpacity = v;
			v = v * me._ht_video_file_popup_close.userData.opacity
			me._ht_video_file_popup_close.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file_popup_close.children.length; i++) {
				let child = me._ht_video_file_popup_close.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_file_popup_close = el;
		textureOver = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAABoUlEQVR4nO3by23CQBRA0UsKASSaYEu6ggKgK7J1E0iEQiArI5GE/N58XsQ9Sxb2zE3A4BmDJEmSJEmSJEn/zuw4rGbHYdV7HPfUGN9TqQPNjsPqcmZ/ObOfHoZ1qeOWMj0M63F8JSMWC3hjwjZTxOlhWDNhW+PYxQK+zpcvXNhcX0gS8UO8C5vX+fKl1PEnpQ40+mzAp8VyV/o8WcZSPCDkiNhqDFUCQt+ILc9dLSD0idj6nFUDQtsJ9fiDVQ8IbSbW6yOjSUCoO8Gen7fNAkKdifa+4jcNCGUn3DsedAgIZSaeIR50CgixAFniQceA8LcQmeJB54DwuyDZ4kGCgPCzMBnjQZKA8HWgrPEgUUD4PBRA1niQLCB8c/c4WTxIGBDuREwYD2qtiTyQdP'+
	'+BvoUDvIgE+DUmwC/SAf6UC/BmQoC3swK8oRrgLf0AF5UCXNYMcGE9wK0dAW4uCnB7W0DvK2PLMbjFN6howEzxRrXHVCzg+JzI9YUE8UbvI06eeC61U7/OmkiieACnxXJ38whGVo/4qJckSZIkSZIkSW28AdO331t58jXnAAAAAElFTkSuQmCC');
		textureOver.colorSpace = player.getVRTextureColorSpace();
		el.userData.materialOver = new THREE.MeshBasicMaterial( {map: textureOver, side: THREE.DoubleSide, transparent: true} );
		el.userData.materialOver.name = 'ht_video_file_popup_close_materialOver';
		el.userData.ggId="ht_video_file_popup_close";
		me._ht_video_file_popup_close.userData.onclick=function (e) {
			player.setVariableValue('open_video_hs', player.getVariableValue('open_video_hs').replace("<"+me.hotspot.id+">", ''));
		}
		me._ht_video_file_popup_close.userData.onmouseenter=function (e) {
			me._ht_video_file_popup_close.material = me._ht_video_file_popup_close.userData.materialOver;
			me.elementMouseOver['ht_video_file_popup_close']=true;
		}
		me._ht_video_file_popup_close.userData.onmouseleave=function (e) {
			me._ht_video_file_popup_close.material = me._ht_video_file_popup_close.userData.materialNormal;
			me.elementMouseOver['ht_video_file_popup_close']=false;
		}
		me._ht_video_file_popup_close.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_video_file_popup_bg.add(me._ht_video_file_popup_close);
		me._ht_video_file.add(me._ht_video_file_popup_bg);
		el = new THREE.Group();
		el.userData.backgroundColorAlpha = 1;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_video_file_customimage.userData.ggSubElement) {
				me._ht_video_file_customimage.userData.ggSubElement.material.opacity = v
				me._ht_video_file_customimage.userData.ggSubElement.visible = (v>0 && me._ht_video_file_customimage.userData.visible);
			}
			me._ht_video_file_customimage.visible = (v>0 && me._ht_video_file_customimage.userData.visible);
		}
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 50;
		el.userData.height = 50;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_video_file_CustomImage';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_video_file_customimage.visible
			let parentEl = me._ht_video_file_customimage.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_file_customimage.userData.opacity = v;
			v = v * me._ht_video_file_customimage.userData.parentOpacity;
			me._ht_video_file_customimage.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file_customimage.children.length; i++) {
				let child = me._ht_video_file_customimage.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_file_customimage.userData.parentOpacity = v;
			v = v * me._ht_video_file_customimage.userData.opacity
			me._ht_video_file_customimage.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file_customimage.children.length; i++) {
				let child = me._ht_video_file_customimage.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_file_customimage = el;
		currentWidth = 50;
		currentHeight = 50;
		var img = {};
		img.geometry = new THREE.PlaneGeometry(currentWidth / 100.0, currentHeight / 100.0, 5, 5 );
		img.geometry.name = 'ht_video_file_CustomImage_imgGeometry';
		loader = new THREE.TextureLoader();
		el.userData.ggSetUrl = function(extUrl) {
			loader.load(extUrl,
				function (texture) {
				texture.colorSpace = player.getVRTextureColorSpace();
				var loadedMaterial = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
				loadedMaterial.name = 'ht_video_file_CustomImage_subElementMaterial';
				me._ht_video_file_customimage.userData.ggSubElement.material = loadedMaterial;
				me._ht_video_file_customimage.userData.ggUpdatePosition();
				me._ht_video_file_customimage.userData.ggText = extUrl;
				me._ht_video_file_customimage.userData.setOpacity(me._ht_video_file_customimage.userData.opacity);
			});
		};
		if ((hotspot) && (hotspot.customimage)) {
			var extUrl=hotspot.customimage;
		}
		el.userData.ggSetUrl(extUrl);
		material = new THREE.MeshBasicMaterial( {color: 0xffffff, side: THREE.DoubleSide, transparent: true } );
		material.name = 'ht_video_file_CustomImage_subElementMaterial';
		el.userData.ggSubElement = new THREE.Mesh( img.geometry, material );
		el.userData.ggSubElement.name = 'ht_video_file_CustomImage_subElement';
		el.userData.ggSubElement.position.z = el.position.z + 0.005;
		el.add(el.userData.ggSubElement);
		el.userData.clientWidth = 50;
		el.userData.clientHeight = 50;
		el.userData.ggId="ht_video_file_CustomImage";
		me._ht_video_file_customimage.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage == "")) || 
				(((player.getVariableValue('open_video_hs') !== null) && (player.getVariableValue('open_video_hs')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_video_file_customimage.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_video_file_customimage.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._ht_video_file_customimage.ggCurrentLogicStateVisible == 0) {
			me._ht_video_file_customimage.visible=false;
			me._ht_video_file_customimage.userData.visible=false;
				}
				else {
			me._ht_video_file_customimage.visible=((!me._ht_video_file_customimage.material && Number(me._ht_video_file_customimage.userData.opacity>0)) || Number(me._ht_video_file_customimage.material.opacity)>0)?true:false;
			me._ht_video_file_customimage.userData.visible=true;
				}
			}
		}
		me._ht_video_file_customimage.logicBlock_visible();
		me._ht_video_file_customimage.userData.onclick=function (e) {
			player.setVariableValue('open_video_hs', player.getVariableValue('open_video_hs') + "<"+me.hotspot.id+">");
			me._ht_video_file_popup.userData.ggInitMedia(player._(me.hotspot.url));
		}
		me._ht_video_file_customimage.userData.ggUpdatePosition=function (useTransition) {
			var parentWidth = me._ht_video_file_customimage.userData.clientWidth;
			var parentHeight = me._ht_video_file_customimage.userData.clientHeight;
			var img = me._ht_video_file_customimage.userData.ggSubElement;
			var imgWidth = img.material.map.image.naturalWidth;
			var imgHeight = img.material.map.image.naturalHeight;
			var aspectRatioDiv = parentWidth / parentHeight;
			var aspectRatioImg = imgWidth / imgHeight;
			if (imgWidth < parentWidth) parentWidth = imgWidth;
			if (imgHeight < parentHeight) parentHeight = imgHeight;
			var currentWidth, currentHeight;
			img.geometry.dispose();
			if ((hotspot) && (hotspot.customimage)) {
				currentWidth  = hotspot.customimagewidth;
				currentHeight = hotspot.customimageheight;
			img.geometry = new THREE.PlaneGeometry(currentWidth / 100.0, currentHeight / 100.0, 5, 5 );
			img.geometry.name = 'ht_video_file_CustomImage_imgGeometry';
			}
		}
		me._ht_video_file.add(me._ht_video_file_customimage);
		me._ht_video_file.userData.setOpacity(1.00);
		me.elementMouseOver['ht_video_file']=false;
		me._ht_video_file_bg.logicBlock_scaling();
		me._ht_video_file_bg.logicBlock_visible();
		me._ht_video_file_bg.logicBlock_alpha();
		me._ht_video_file_bg.userData.setOpacity(1.00);
		me.elementMouseOver['ht_video_file_bg']=false;
		me._ht_video_file_icon.userData.setOpacity(1.00);
		me._ht_video_file_title.logicBlock_alpha();
		me._ht_video_file_title.userData.setOpacity(0.00);
		me._ht_video_file_popup_bg.logicBlock_scaling();
		me._ht_video_file_popup_bg.logicBlock_alpha();
		me._ht_video_file_popup_bg.userData.setOpacity(0.00);
		me._ht_video_file_popup.logicBlock_visible();
		me._ht_video_file_popup.userData.setOpacity(1.00);
		me._ht_video_file_popup.userData.ggVideoSource = 'media_vr/';
		me._ht_video_file_popup.userData.ggVideoNotLoaded = true;
		me._ht_video_file_popup_close.userData.setOpacity(1.00);
		me.elementMouseOver['ht_video_file_popup_close']=false;
		me._ht_video_file_customimage.logicBlock_visible();
		me._ht_video_file_customimage.userData.setOpacity(1.00);
			me.ggEvent_activehotspotchanged=function() {
				me._ht_video_file_bg.logicBlock_visible();
				me._ht_video_file_customimage.logicBlock_visible();
			};
			me.ggEvent_changenode=function() {
				me._ht_video_file_bg.logicBlock_visible();
				me._ht_video_file_bg.logicBlock_alpha();
					me._ht_video_file_title.userData.ggUpdateText();
				me._ht_video_file_popup_bg.logicBlock_scaling();
				me._ht_video_file_popup_bg.logicBlock_alpha();
				me._ht_video_file_popup.logicBlock_visible();
				me._ht_video_file_customimage.logicBlock_visible();
			};
			me.ggEvent_configloaded=function() {
				me._ht_video_file_bg.logicBlock_visible();
				me._ht_video_file_bg.logicBlock_alpha();
				me._ht_video_file_popup_bg.logicBlock_scaling();
				me._ht_video_file_popup_bg.logicBlock_alpha();
				me._ht_video_file_popup.logicBlock_visible();
				me._ht_video_file_customimage.logicBlock_visible();
			};
			me.ggEvent_varchanged_open_video_hs=function() {
				me._ht_video_file_bg.logicBlock_alpha();
				me._ht_video_file_popup_bg.logicBlock_scaling();
				me._ht_video_file_popup_bg.logicBlock_alpha();
				me._ht_video_file_popup.logicBlock_visible();
				me._ht_video_file_customimage.logicBlock_visible();
			};
			me.__obj = me._ht_video_file;
			me.__obj.userData.hotspot = hotspot;
			me.__obj.userData.fromSkin = true;
	};
	function SkinHotspotClass_ht_info(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.ggUserdata.nodeId=nodeId;
		me.elementMouseDown={};
		me.elementMouseOver={};
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el = new THREE.Group();
		el.userData.setOpacityInternal = function(v) {};
		el.name = 'ht_info';
		el.userData.x = 0.65;
		el.userData.y = 2.08;
		el.userData.hanchor = 0;
		el.userData.vanchor = 0;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_info.visible
			let parentEl = me._ht_info.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_info.userData.opacity = v;
			v = v * me._ht_info.userData.parentOpacity;
			me._ht_info.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info.children.length; i++) {
				let child = me._ht_info.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_info.userData.parentOpacity = v;
			v = v * me._ht_info.userData.opacity
			me._ht_info.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info.children.length; i++) {
				let child = me._ht_info.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_info = el;
		el.userData.ggId="ht_info";
		el.userData.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.userData.ggElementNodeId)) {
					return this.parentNode.userData.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_info.userData.onclick=function (e) {
			player.triggerEvent('hsproxyclick', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_info.userData.ondblclick=function (e) {
			player.triggerEvent('hsproxydblclick', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_info.userData.onmouseenter=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_info']=true;
			player.triggerEvent('hsproxyover', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_info.userData.onmouseleave=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_info']=false;
			player.triggerEvent('hsproxyout', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_info.userData.ggUpdatePosition=function (useTransition) {
		}
		width = 0.45;
		height = 0.45;
		roundedRectShape = new THREE.Shape();
		roundedRectShape.moveTo((-width / 2.0) + 0.12, (height / 2.0));
		roundedRectShape.lineTo((width / 2.0) - 0.12, (height / 2.0));
		roundedRectShape.arc(0, -0.12, 0.12, Math.PI / 2.0, 2.0 * Math.PI, true);
		roundedRectShape.lineTo((width / 2.0), (-height / 2.0) + 0.12);
		roundedRectShape.arc(-0.12, 0, 0.12, 2.0 * Math.PI, 3.0 * Math.PI / 2.0, true);
		roundedRectShape.lineTo((-width / 2.0) + 0.12, (-height / 2.0));
		roundedRectShape.arc(0, 0.12, 0.12, 3.0 * Math.PI / 2.0, Math.PI, true);
		roundedRectShape.lineTo((-width / 2.0), (height / 2.0) - 0.12);
		roundedRectShape.arc(0.12, 0, 0.12, Math.PI, Math.PI / 2.0, true);
		geometry = new THREE.ShapeGeometry(roundedRectShape);
		geometry.name = 'ht_info_bg_geometry';
		geometry.computeBoundingBox();
		var min = geometry.boundingBox.min;
		var max = geometry.boundingBox.max;
		var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
		var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
		var vertexPositions = geometry.getAttribute('position');
		var vertexUVs = geometry.getAttribute('uv');
		for (var i = 0; i < vertexPositions.count; i++) {
			var v1 = vertexPositions.getX(i);
			var	v2 = vertexPositions.getY(i);
			vertexUVs.setX(i, (v1 + offset.x) / range.x);
			vertexUVs.setY(i, (v2 + offset.y) / range.y);
		}
		geometry.uvsNeedUpdate = true;
		material = new THREE.MeshBasicMaterial( { color: new THREE.Color(0.290196, 0.290196, 0.290196).convertSRGBToLinear(), side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'ht_info_bg_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 0.588235;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._ht_info_bg.material.opacity = v * me._ht_info_bg.userData.backgroundColorAlpha;
			if (me._ht_info_bg.userData.ggSubElement) {
				me._ht_info_bg.userData.ggSubElement.material.opacity = v
				me._ht_info_bg.userData.ggSubElement.visible = (v>0 && me._ht_info_bg.userData.visible);
			}
			me._ht_info_bg.visible = (v>0 && me._ht_info_bg.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._ht_info_bg.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_info_bg.userData.backgroundColorAlpha = v;
			me._ht_info_bg.userData.setOpacity(me._ht_info_bg.userData.opacity);
		}
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 45;
		el.userData.height = 45;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_info_bg';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.010);
		el.renderOrder = 1;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_info_bg.visible
			let parentEl = me._ht_info_bg.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_info_bg.userData.opacity = v;
			v = v * me._ht_info_bg.userData.parentOpacity;
			me._ht_info_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info_bg.children.length; i++) {
				let child = me._ht_info_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_info_bg.userData.parentOpacity = v;
			v = v * me._ht_info_bg.userData.opacity
			me._ht_info_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info_bg.children.length; i++) {
				let child = me._ht_info_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = false;
		el.userData.visible = false;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_info_bg = el;
		el.userData.ggId="ht_info_bg";
		me._ht_info_bg.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((me.elementMouseOver['ht_info_bg'] == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._ht_info_bg.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._ht_info_bg.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._ht_info_bg.ggCurrentLogicStateScaling == 0) {
					me._ht_info_bg.userData.transitionValue_scale = {x: 1.2, y: 1.2, z: 1.0};
					for (var i = 0; i < me._ht_info_bg.userData.transitions.length; i++) {
						if (me._ht_info_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_info_bg.userData.transitions[i].interval);
							me._ht_info_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._ht_info_bg.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_info_bg.scale.set(transition_scale.startScale.x + (me._ht_info_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_info_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_info_bg.position.x = (me._ht_info_bg.position.x - me._ht_info_bg.userData.curScaleOffX) + scaleOffX;
						me._ht_info_bg.userData.curScaleOffX = scaleOffX;
						me._ht_info_bg.position.y = (me._ht_info_bg.position.y - me._ht_info_bg.userData.curScaleOffY) + scaleOffY;
						me._ht_info_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_info_bg.userData.transitions.splice(me._ht_info_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_info_bg.userData.transitions.push(transition_scale);
				}
				else {
					me._ht_info_bg.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._ht_info_bg.userData.transitions.length; i++) {
						if (me._ht_info_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_info_bg.userData.transitions[i].interval);
							me._ht_info_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._ht_info_bg.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_info_bg.scale.set(transition_scale.startScale.x + (me._ht_info_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_info_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_info_bg.position.x = (me._ht_info_bg.position.x - me._ht_info_bg.userData.curScaleOffX) + scaleOffX;
						me._ht_info_bg.userData.curScaleOffX = scaleOffX;
						me._ht_info_bg.position.y = (me._ht_info_bg.position.y - me._ht_info_bg.userData.curScaleOffY) + scaleOffY;
						me._ht_info_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_info_bg.userData.transitions.splice(me._ht_info_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_info_bg.userData.transitions.push(transition_scale);
				}
			}
		}
		me._ht_info_bg.logicBlock_scaling();
		me._ht_info_bg.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage == ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_info_bg.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_info_bg.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._ht_info_bg.ggCurrentLogicStateVisible == 0) {
			me._ht_info_bg.visible=((!me._ht_info_bg.material && Number(me._ht_info_bg.userData.opacity>0)) || Number(me._ht_info_bg.material.opacity)>0)?true:false;
			me._ht_info_bg.userData.visible=true;
				}
				else {
			me._ht_info_bg.visible=false;
			me._ht_info_bg.userData.visible=false;
				}
			}
		}
		me._ht_info_bg.logicBlock_visible();
		me._ht_info_bg.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				(((player.getVariableValue('open_image_hs') !== null) && (player.getVariableValue('open_image_hs')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._ht_info_bg.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._ht_info_bg.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				if (me._ht_info_bg.ggCurrentLogicStateAlpha == 0) {
					me._ht_info_bg.userData.transitionValue_alpha = 0;
					for (var i = 0; i < me._ht_info_bg.userData.transitions.length; i++) {
						if (me._ht_info_bg.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_info_bg.userData.transitions[i].interval);
							me._ht_info_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_info_bg.material ? me._ht_info_bg.material.opacity : me._ht_info_bg.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_info_bg.userData.setOpacity(transition_alpha.startAlpha + (me._ht_info_bg.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_info_bg.userData.transitions.splice(me._ht_info_bg.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_info_bg.userData.transitions.push(transition_alpha);
				}
				else {
					me._ht_info_bg.userData.transitionValue_alpha = 1;
					for (var i = 0; i < me._ht_info_bg.userData.transitions.length; i++) {
						if (me._ht_info_bg.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_info_bg.userData.transitions[i].interval);
							me._ht_info_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_info_bg.material ? me._ht_info_bg.material.opacity : me._ht_info_bg.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_info_bg.userData.setOpacity(transition_alpha.startAlpha + (me._ht_info_bg.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_info_bg.userData.transitions.splice(me._ht_info_bg.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_info_bg.userData.transitions.push(transition_alpha);
				}
			}
		}
		me._ht_info_bg.logicBlock_alpha();
		me._ht_info_bg.userData.onclick=function (e) {
			player.setVariableValue('open_info_hs', player.getVariableValue('open_info_hs') + "<"+me.hotspot.id+">");
		}
		me._ht_info_bg.userData.onmouseenter=function (e) {
			me.elementMouseOver['ht_info_bg']=true;
			me._ht_info_title.logicBlock_alpha();
			me._ht_info_bg.logicBlock_scaling();
		}
		me._ht_info_bg.userData.ontouchend=function (e) {
			me._ht_info_bg.logicBlock_scaling();
		}
		me._ht_info_bg.userData.onmouseleave=function (e) {
			me.elementMouseOver['ht_info_bg']=false;
			me._ht_info_title.logicBlock_alpha();
			me._ht_info_bg.logicBlock_scaling();
		}
		me._ht_info_bg.userData.ggUpdatePosition=function (useTransition) {
		}
		geometry = new THREE.PlaneGeometry(0.36, 0.36, 5, 5 );
		geometry.name = 'ht_info_icon_geometry';
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,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');
		texture.colorSpace = player.getVRTextureColorSpace();
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'ht_info_icon_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.materialNormal = material;
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 36;
		el.userData.height = 36;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_info_icon';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.020);
		el.renderOrder = 2;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_info_icon.material) me._ht_info_icon.material.opacity = v;
			me._ht_info_icon.visible = (v>0 && me._ht_info_icon.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._ht_info_icon.visible
			let parentEl = me._ht_info_icon.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_info_icon.userData.opacity = v;
			v = v * me._ht_info_icon.userData.parentOpacity;
			me._ht_info_icon.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info_icon.children.length; i++) {
				let child = me._ht_info_icon.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_info_icon.userData.parentOpacity = v;
			v = v * me._ht_info_icon.userData.opacity
			me._ht_info_icon.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info_icon.children.length; i++) {
				let child = me._ht_info_icon.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_info_icon = el;
		el.userData.ggId="ht_info_icon";
		me._ht_info_icon.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_info_bg.add(me._ht_info_icon);
		geometry = new THREE.PlaneGeometry(1, 0.2, 5, 5 );
		geometry.name = 'ht_info_title_geometry';
		material = new THREE.MeshBasicMaterial( {side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'ht_info_title_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 1;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._ht_info_title.material.opacity = v;
			if (me._ht_info_title.userData.hasScrollbar) {
				me._ht_info_title.userData.scrollbar.material.opacity = v;
				me._ht_info_title.userData.scrollbarBg.material.opacity = v;
			}
			if (me._ht_info_title.userData.ggSubElement) {
				me._ht_info_title.userData.ggSubElement.material.opacity = v
				me._ht_info_title.userData.ggSubElement.visible = (v>0 && me._ht_info_title.userData.visible);
			}
			me._ht_info_title.visible = (v>0 && me._ht_info_title.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._ht_info_title.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_info_title.userData.backgroundColorAlpha = v;
			me._ht_info_title.userData.setOpacity(me._ht_info_title.userData.opacity);
		}
		el.translateX(0);
		el.translateY(-0.325);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 100;
		el.userData.height = 20;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_info_title';
		el.userData.x = 0;
		el.userData.y = -0.325;
		el.userData.hanchor = 1;
		el.userData.vanchor = 2;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_info_title.visible
			let parentEl = me._ht_info_title.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_info_title.userData.opacity = v;
			v = v * me._ht_info_title.userData.parentOpacity;
			me._ht_info_title.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info_title.children.length; i++) {
				let child = me._ht_info_title.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_info_title.userData.parentOpacity = v;
			v = v * me._ht_info_title.userData.opacity
			me._ht_info_title.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info_title.children.length; i++) {
				let child = me._ht_info_title.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 0.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_info_title = el;
		el.userData.textLines = [];
		el.userData.backgroundColor = new THREE.Color(1, 1, 1).convertSRGBToLinear();
		el.userData.textColor = new THREE.Color(0.117647, 0.870588, 0.784314).convertSRGBToLinear();
		el.userData.textColorAlpha = 1;
		var canvas = document.createElement('canvas');
		canvas.width = 200;
		canvas.height = 40;
		el.userData.textCanvas = canvas;
		el.userData.textCanvasContext = canvas.getContext('2d');
		el.userData.ggStripTags = function(text) {
			let doc = new DOMParser().parseFromString(text, 'text/html');
			return doc.body.textContent || '';
		}
		el.userData.ggWrapText = function(scrollbar) {
			me._ht_info_title.userData.totalHeightCanv = 2 * (3);
			me._ht_info_title.userData.textLines = [];
			var ctx = me._ht_info_title.userData.textCanvasContext;
			var words = [];
			let tmpText = String(me._ht_info_title.userData.ggText);
			let whiteSpaceIndex = -1;
			do {
				whiteSpaceIndex = tmpText.search(/[\s]/);
				if (whiteSpaceIndex != -1) {
					words.push(tmpText.substr(0, whiteSpaceIndex));
					tmpText = tmpText.substr(whiteSpaceIndex);
					if (tmpText.charAt(0) == '\n') {
						words.push('\n');
					}
					tmpText = tmpText.substr(1);
				} else {
					words.push(tmpText);
				}
			} while (whiteSpaceIndex != -1);
			var line = '';
			for (var i = 0; i < words.length; i++) {
				if (words[i] == '\n') {
					me._ht_info_title.userData.textLines.push(line);
					line = '';
					me._ht_info_title.userData.totalHeightCanv += me._ht_info_title.userData.lineHeightCanv;
					continue;
				}
				var testLine;
				if (line == '') {
					testLine = words[i]
				} else {
					testLine = line + ' ' + words[i];
				}
				var metrics = ctx.measureText(testLine);
				var testWidth = metrics.width;
				if (testWidth > (2 * (me._ht_info_title.userData.width - 0 - (scrollbar ? 25 : 0))) && i > 0) {
					me._ht_info_title.userData.textLines.push(line);
					line = words[i];
					me._ht_info_title.userData.totalHeightCanv += me._ht_info_title.userData.lineHeightCanv;
				} else {
					line = testLine;
				}
			}
			me._ht_info_title.userData.textLines.push(line);
			me._ht_info_title.userData.totalHeightCanv += me._ht_info_title.userData.lineHeightCanv;
		}
		el.userData.ggPaintCanvasText = function() {
			var canv = me._ht_info_title.userData.textCanvas;
			var ctx = me._ht_info_title.userData.textCanvasContext;
			ctx.clearRect(0, 0, canv.width, canv.height);
			ctx.fillStyle = 'rgba(' + me._ht_info_title.userData.textColor.r * 255 + ', ' + me._ht_info_title.userData.textColor.g * 255 + ', ' + me._ht_info_title.userData.textColor.b * 255 + ', ' + me._ht_info_title.userData.textColorAlpha + ')';
			ctx.textBaseline = 'top';
			var x = (me._ht_info_title.userData.boxWidthCanv - (me._ht_info_title.userData.hasScrollbar ? 50 : 0)) / 2;
			ctx.textAlign = 'center';
			var y = 2 * 3;
			for (var i = 0; i < me._ht_info_title.userData.textLines.length; i++) {
				ctx.fillText(me._ht_info_title.userData.textLines[i], x, y);
				y += me._ht_info_title.userData.lineHeightCanv;
			}
			geometry = new THREE.PlaneGeometry(me._ht_info_title.userData.boxWidthCanv / 200.0, me._ht_info_title.userData.boxHeightCanv / 200.0, 5, 5 );
			geometry.name = 'ht_info_title_geometry';
			me._ht_info_title.geometry.dispose();
			me._ht_info_title.geometry = geometry;
			var diffY = (me._ht_info_title.userData.boxHeightCanv / 2) - me._ht_info_title.userData.height;
			me._ht_info_title.position.y = me._ht_info_title.userData.y - ((diffY / 2.0) / 100.0);
			var textTexture = new THREE.CanvasTexture(canv);
			textTexture.name = 'ht_info_title_texture';
			textTexture.minFilter = THREE.LinearFilter;
			textTexture.colorSpace = THREE.LinearSRGBColorSpace;
			textTexture.wrapS = THREE.ClampToEdgeWrapping;
			textTexture.wrapT = THREE.ClampToEdgeWrapping;
			if (me._ht_info_title.material.map) {
				me._ht_info_title.material.map.dispose();
			}
			me._ht_info_title.material.map = textTexture;
		}
		el.userData.ggRenderText = function() {
			for (let i = 0; i < me._ht_info_title.children.length; i++) {
				let child = me._ht_info_title.children[i];
				if (child.name.includes('scrollbar')) me._ht_info_title.remove(child);
			}
			var canv = me._ht_info_title.userData.textCanvas;
			var ctx = me._ht_info_title.userData.textCanvasContext;
			ctx.font = '36px Verdana';
			me._ht_info_title.userData.lineHeightCanv = 36 * 1.2;
			me._ht_info_title.userData.textLines = [];
			me._ht_info_title.userData.textLines.push(me._ht_info_title.userData.ggText);
			me._ht_info_title.userData.totalHeightCanv = 2 * (3);
			me._ht_info_title.userData.totalHeightCanv += me._ht_info_title.userData.lineHeightCanv;
			me._ht_info_title.userData.boxWidthCanv = ctx.measureText(me._ht_info_title.userData.ggText).width + (2 * 0);
			me._ht_info_title.userData.boxHeightCanv = me._ht_info_title.userData.totalHeightCanv;
			canv.width = me._ht_info_title.userData.boxWidthCanv;
			canv.height = me._ht_info_title.userData.boxHeightCanv;
			ctx.font = '36px Verdana';
			me._ht_info_title.userData.ggPaintCanvasText();
		}
		me._ht_info_title.userData.ggUpdateText=function(force) {
			var params = [];
			params.push(player._(String(player._(me.hotspot.title))));
			var hs = player._("%1", params);
			if (hs!=this.ggText || force) {
				this.ggText=me._ht_info_title.userData.ggStripTags(hs);
				this.ggRenderText();
			}
		}
		me._ht_info_title.userData.ggUpdateText();
		el.userData.setBackgroundColor = function(v) {
			me._ht_info_title.userData.backgroundColor = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_info_title.userData.backgroundColorAlpha = v;
		}
		el.userData.setTextColor = function(v) {
			me._ht_info_title.userData.textColor = v;
		}
		el.userData.setTextColorAlpha = function(v) {
			me._ht_info_title.userData.textColorAlpha = v;
		}
		el.userData.ggId="ht_info_title";
		me._ht_info_title.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['ht_info_bg'] == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._ht_info_title.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._ht_info_title.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				if (me._ht_info_title.ggCurrentLogicStateAlpha == 0) {
					me._ht_info_title.userData.transitionValue_alpha = 1;
					for (var i = 0; i < me._ht_info_title.userData.transitions.length; i++) {
						if (me._ht_info_title.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_info_title.userData.transitions[i].interval);
							me._ht_info_title.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_info_title.material ? me._ht_info_title.material.opacity : me._ht_info_title.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_info_title.userData.setOpacity(transition_alpha.startAlpha + (me._ht_info_title.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_info_title.userData.transitions.splice(me._ht_info_title.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_info_title.userData.transitions.push(transition_alpha);
				}
				else {
					me._ht_info_title.userData.transitionValue_alpha = 0;
					for (var i = 0; i < me._ht_info_title.userData.transitions.length; i++) {
						if (me._ht_info_title.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_info_title.userData.transitions[i].interval);
							me._ht_info_title.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_info_title.material ? me._ht_info_title.material.opacity : me._ht_info_title.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_info_title.userData.setOpacity(transition_alpha.startAlpha + (me._ht_info_title.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_info_title.userData.transitions.splice(me._ht_info_title.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_info_title.userData.transitions.push(transition_alpha);
				}
			}
		}
		me._ht_info_title.logicBlock_alpha();
		me._ht_info_title.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_info_bg.add(me._ht_info_title);
		me._ht_info.add(me._ht_info_bg);
		width = 6.6;
		height = 4.8;
		roundedRectShape = new THREE.Shape();
		roundedRectShape.moveTo((-width / 2.0) + 0.3, (height / 2.0));
		roundedRectShape.lineTo((width / 2.0) - 0.3, (height / 2.0));
		roundedRectShape.arc(0, -0.3, 0.3, Math.PI / 2.0, 2.0 * Math.PI, true);
		roundedRectShape.lineTo((width / 2.0), (-height / 2.0) + 0.3);
		roundedRectShape.arc(-0.3, 0, 0.3, 2.0 * Math.PI, 3.0 * Math.PI / 2.0, true);
		roundedRectShape.lineTo((-width / 2.0) + 0.3, (-height / 2.0));
		roundedRectShape.arc(0, 0.3, 0.3, 3.0 * Math.PI / 2.0, Math.PI, true);
		roundedRectShape.lineTo((-width / 2.0), (height / 2.0) - 0.3);
		roundedRectShape.arc(0.3, 0, 0.3, Math.PI, Math.PI / 2.0, true);
		geometry = new THREE.ShapeGeometry(roundedRectShape);
		geometry.name = 'ht_info_popup_bg_geometry';
		geometry.computeBoundingBox();
		var min = geometry.boundingBox.min;
		var max = geometry.boundingBox.max;
		var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
		var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
		var vertexPositions = geometry.getAttribute('position');
		var vertexUVs = geometry.getAttribute('uv');
		for (var i = 0; i < vertexPositions.count; i++) {
			var v1 = vertexPositions.getX(i);
			var	v2 = vertexPositions.getY(i);
			vertexUVs.setX(i, (v1 + offset.x) / range.x);
			vertexUVs.setY(i, (v2 + offset.y) / range.y);
		}
		geometry.uvsNeedUpdate = true;
		material = new THREE.MeshBasicMaterial( { color: new THREE.Color(0.290196, 0.290196, 0.290196).convertSRGBToLinear(), side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'ht_info_popup_bg_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 0.666667;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._ht_info_popup_bg.material.opacity = v * me._ht_info_popup_bg.userData.backgroundColorAlpha;
			if (me._ht_info_popup_bg.userData.ggSubElement) {
				me._ht_info_popup_bg.userData.ggSubElement.material.opacity = v
				me._ht_info_popup_bg.userData.ggSubElement.visible = (v>0 && me._ht_info_popup_bg.userData.visible);
			}
			me._ht_info_popup_bg.visible = (v>0 && me._ht_info_popup_bg.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._ht_info_popup_bg.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_info_popup_bg.userData.backgroundColorAlpha = v;
			me._ht_info_popup_bg.userData.setOpacity(me._ht_info_popup_bg.userData.opacity);
		}
		el.translateX(0);
		el.translateY(0);
		el.scale.set(0.10, 0.10, 1.0);
		el.userData.width = 660;
		el.userData.height = 480;
		el.userData.scale = {x: 0.10, y: 0.10, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_info_popup_bg';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.020);
		el.renderOrder = 2;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_info_popup_bg.visible
			let parentEl = me._ht_info_popup_bg.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_info_popup_bg.userData.opacity = v;
			v = v * me._ht_info_popup_bg.userData.parentOpacity;
			me._ht_info_popup_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info_popup_bg.children.length; i++) {
				let child = me._ht_info_popup_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_info_popup_bg.userData.parentOpacity = v;
			v = v * me._ht_info_popup_bg.userData.opacity
			me._ht_info_popup_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info_popup_bg.children.length; i++) {
				let child = me._ht_info_popup_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 0.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_info_popup_bg = el;
		el.userData.ggId="ht_info_popup_bg";
		me._ht_info_popup_bg.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				(((player.getVariableValue('open_info_hs') !== null) && (player.getVariableValue('open_info_hs')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._ht_info_popup_bg.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._ht_info_popup_bg.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._ht_info_popup_bg.ggCurrentLogicStateScaling == 0) {
					me._ht_info_popup_bg.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._ht_info_popup_bg.userData.transitions.length; i++) {
						if (me._ht_info_popup_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_info_popup_bg.userData.transitions[i].interval);
							me._ht_info_popup_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._ht_info_popup_bg.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_info_popup_bg.scale.set(transition_scale.startScale.x + (me._ht_info_popup_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_info_popup_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_info_popup_bg.position.x = (me._ht_info_popup_bg.position.x - me._ht_info_popup_bg.userData.curScaleOffX) + scaleOffX;
						me._ht_info_popup_bg.userData.curScaleOffX = scaleOffX;
						me._ht_info_popup_bg.position.y = (me._ht_info_popup_bg.position.y - me._ht_info_popup_bg.userData.curScaleOffY) + scaleOffY;
						me._ht_info_popup_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_info_popup_bg.userData.transitions.splice(me._ht_info_popup_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_info_popup_bg.userData.transitions.push(transition_scale);
				}
				else {
					me._ht_info_popup_bg.userData.transitionValue_scale = {x: 0.1, y: 0.1, z: 1.0};
					for (var i = 0; i < me._ht_info_popup_bg.userData.transitions.length; i++) {
						if (me._ht_info_popup_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_info_popup_bg.userData.transitions[i].interval);
							me._ht_info_popup_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._ht_info_popup_bg.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_info_popup_bg.scale.set(transition_scale.startScale.x + (me._ht_info_popup_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_info_popup_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_info_popup_bg.position.x = (me._ht_info_popup_bg.position.x - me._ht_info_popup_bg.userData.curScaleOffX) + scaleOffX;
						me._ht_info_popup_bg.userData.curScaleOffX = scaleOffX;
						me._ht_info_popup_bg.position.y = (me._ht_info_popup_bg.position.y - me._ht_info_popup_bg.userData.curScaleOffY) + scaleOffY;
						me._ht_info_popup_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_info_popup_bg.userData.transitions.splice(me._ht_info_popup_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_info_popup_bg.userData.transitions.push(transition_scale);
				}
			}
		}
		me._ht_info_popup_bg.logicBlock_scaling();
		me._ht_info_popup_bg.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				(((player.getVariableValue('open_info_hs') !== null) && (player.getVariableValue('open_info_hs')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._ht_info_popup_bg.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._ht_info_popup_bg.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				if (me._ht_info_popup_bg.ggCurrentLogicStateAlpha == 0) {
					me._ht_info_popup_bg.userData.transitionValue_alpha = 1;
					for (var i = 0; i < me._ht_info_popup_bg.userData.transitions.length; i++) {
						if (me._ht_info_popup_bg.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_info_popup_bg.userData.transitions[i].interval);
							me._ht_info_popup_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_info_popup_bg.material ? me._ht_info_popup_bg.material.opacity : me._ht_info_popup_bg.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_info_popup_bg.userData.setOpacity(transition_alpha.startAlpha + (me._ht_info_popup_bg.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_info_popup_bg.userData.transitions.splice(me._ht_info_popup_bg.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_info_popup_bg.userData.transitions.push(transition_alpha);
				}
				else {
					me._ht_info_popup_bg.userData.transitionValue_alpha = 0;
					for (var i = 0; i < me._ht_info_popup_bg.userData.transitions.length; i++) {
						if (me._ht_info_popup_bg.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_info_popup_bg.userData.transitions[i].interval);
							me._ht_info_popup_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_info_popup_bg.material ? me._ht_info_popup_bg.material.opacity : me._ht_info_popup_bg.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_info_popup_bg.userData.setOpacity(transition_alpha.startAlpha + (me._ht_info_popup_bg.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_info_popup_bg.userData.transitions.splice(me._ht_info_popup_bg.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_info_popup_bg.userData.transitions.push(transition_alpha);
				}
			}
		}
		me._ht_info_popup_bg.logicBlock_alpha();
		me._ht_info_popup_bg.userData.ggUpdatePosition=function (useTransition) {
		}
		geometry = new THREE.PlaneGeometry(6, 4, 5, 5 );
		geometry.name = 'ht_info_popup_geometry';
		material = new THREE.MeshBasicMaterial( {side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'ht_info_popup_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 1;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._ht_info_popup.material.opacity = v;
			if (me._ht_info_popup.userData.hasScrollbar) {
				me._ht_info_popup.userData.scrollbar.material.opacity = v;
				me._ht_info_popup.userData.scrollbarBg.material.opacity = v;
			}
			if (me._ht_info_popup.userData.ggSubElement) {
				me._ht_info_popup.userData.ggSubElement.material.opacity = v
				me._ht_info_popup.userData.ggSubElement.visible = (v>0 && me._ht_info_popup.userData.visible);
			}
			me._ht_info_popup.visible = (v>0 && me._ht_info_popup.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._ht_info_popup.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_info_popup.userData.backgroundColorAlpha = v;
			me._ht_info_popup.userData.setOpacity(me._ht_info_popup.userData.opacity);
		}
		el.translateX(0);
		el.translateY(-0.2);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 600;
		el.userData.height = 400;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_info_popup';
		el.userData.x = 0;
		el.userData.y = -0.2;
		el.userData.hanchor = 1;
		el.userData.vanchor = 2;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_info_popup.visible
			let parentEl = me._ht_info_popup.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_info_popup.userData.opacity = v;
			v = v * me._ht_info_popup.userData.parentOpacity;
			me._ht_info_popup.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info_popup.children.length; i++) {
				let child = me._ht_info_popup.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_info_popup.userData.parentOpacity = v;
			v = v * me._ht_info_popup.userData.opacity
			me._ht_info_popup.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info_popup.children.length; i++) {
				let child = me._ht_info_popup.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_info_popup = el;
		el.userData.textLines = [];
		el.userData.backgroundColor = new THREE.Color(1, 1, 1).convertSRGBToLinear();
		el.userData.textColor = new THREE.Color(0, 0, 0).convertSRGBToLinear();
		el.userData.textColorAlpha = 1;
		var canvas = document.createElement('canvas');
		canvas.width = 1200;
		canvas.height = 800;
		el.userData.textCanvas = canvas;
		el.userData.textCanvasContext = canvas.getContext('2d');
		el.userData.ggStripTags = function(text) {
			let doc = new DOMParser().parseFromString(text, 'text/html');
			return doc.body.textContent || '';
		}
		el.userData.ggWrapText = function(scrollbar) {
			me._ht_info_popup.userData.totalHeightCanv = 2 * (33);
			me._ht_info_popup.userData.textLines = [];
			var ctx = me._ht_info_popup.userData.textCanvasContext;
			var words = [];
			let tmpText = String(me._ht_info_popup.userData.ggText);
			let whiteSpaceIndex = -1;
			do {
				whiteSpaceIndex = tmpText.search(/[\s]/);
				if (whiteSpaceIndex != -1) {
					words.push(tmpText.substr(0, whiteSpaceIndex));
					tmpText = tmpText.substr(whiteSpaceIndex);
					if (tmpText.charAt(0) == '\n') {
						words.push('\n');
					}
					tmpText = tmpText.substr(1);
				} else {
					words.push(tmpText);
				}
			} while (whiteSpaceIndex != -1);
			var line = '';
			for (var i = 0; i < words.length; i++) {
				if (words[i] == '\n') {
					me._ht_info_popup.userData.textLines.push(line);
					line = '';
					me._ht_info_popup.userData.totalHeightCanv += me._ht_info_popup.userData.lineHeightCanv;
					continue;
				}
				var testLine;
				if (line == '') {
					testLine = words[i]
				} else {
					testLine = line + ' ' + words[i];
				}
				var metrics = ctx.measureText(testLine);
				var testWidth = metrics.width;
				if (testWidth > (2 * (me._ht_info_popup.userData.width - 30 - (scrollbar ? 25 : 0))) && i > 0) {
					me._ht_info_popup.userData.textLines.push(line);
					line = words[i];
					me._ht_info_popup.userData.totalHeightCanv += me._ht_info_popup.userData.lineHeightCanv;
				} else {
					line = testLine;
				}
			}
			me._ht_info_popup.userData.textLines.push(line);
			me._ht_info_popup.userData.totalHeightCanv += me._ht_info_popup.userData.lineHeightCanv;
		}
		el.userData.ggPaintCanvasText = function() {
			var canv = me._ht_info_popup.userData.textCanvas;
			var ctx = me._ht_info_popup.userData.textCanvasContext;
			ctx.clearRect(0, 0, canv.width, canv.height);
			ctx.fillStyle = 'rgba(' + me._ht_info_popup.userData.backgroundColor.r * 255 + ', ' + me._ht_info_popup.userData.backgroundColor.g * 255 + ', ' + me._ht_info_popup.userData.backgroundColor.b * 255 + ', ' + me._ht_info_popup.userData.backgroundColorAlpha + ')';
			ctx.fillRect(0, 0, canv.width, canv.height);
			ctx.fillStyle = 'rgba(' + me._ht_info_popup.userData.textColor.r * 255 + ', ' + me._ht_info_popup.userData.textColor.g * 255 + ', ' + me._ht_info_popup.userData.textColor.b * 255 + ', ' + me._ht_info_popup.userData.textColorAlpha + ')';
			ctx.textBaseline = 'top';
			var x = 2 * 15;
			ctx.textAlign = 'left';
			var y = 2 * 18;
			y -= me._ht_info_popup.userData.scrollPosPercent * me._ht_info_popup.userData.totalHeightCanv;
			for (var i = 0; i < me._ht_info_popup.userData.textLines.length; i++) {
				ctx.fillText(me._ht_info_popup.userData.textLines[i], x, y);
				y += me._ht_info_popup.userData.lineHeightCanv;
			}
			var textTexture = new THREE.CanvasTexture(canv);
			textTexture.name = 'ht_info_popup_texture';
			textTexture.minFilter = THREE.LinearFilter;
			textTexture.colorSpace = THREE.LinearSRGBColorSpace;
			textTexture.wrapS = THREE.ClampToEdgeWrapping;
			textTexture.wrapT = THREE.ClampToEdgeWrapping;
			if (me._ht_info_popup.material.map) {
				me._ht_info_popup.material.map.dispose();
			}
			me._ht_info_popup.material.map = textTexture;
		}
		el.userData.ggRenderText = function() {
			for (let i = 0; i < me._ht_info_popup.children.length; i++) {
				let child = me._ht_info_popup.children[i];
				if (child.name.includes('scrollbar')) me._ht_info_popup.remove(child);
			}
			var canv = me._ht_info_popup.userData.textCanvas;
			var ctx = me._ht_info_popup.userData.textCanvasContext;
			ctx.font = '44px Verdana';
			me._ht_info_popup.userData.lineHeightCanv = 44 * 1.2;
			me._ht_info_popup.userData.ggWrapText(false);
			me._ht_info_popup.userData.boxWidthCanv = 2 * me._ht_info_popup.userData.width;
			me._ht_info_popup.userData.boxHeightCanv = 2 * me._ht_info_popup.userData.height;
			me._ht_info_popup.userData.scrollPosPercent = 0.0
			if (me._ht_info_popup.userData.totalHeightCanv > (2 * (me._ht_info_popup.userData.height))) {
				me._ht_info_popup.userData.ggWrapText(true);
				me._ht_info_popup.userData.pagePercent = (2 * (me._ht_info_popup.userData.height) - me._ht_info_popup.userData.lineHeightCanv) / me._ht_info_popup.userData.totalHeightCanv;
				me._ht_info_popup.userData.maxScrollPercent = (me._ht_info_popup.userData.totalHeightCanv - (2 * (me._ht_info_popup.userData.height))) / me._ht_info_popup.userData.totalHeightCanv;
				geometry = new THREE.PlaneGeometry(25 / 100.0, me._ht_info_popup.userData.height / 100.0, 5, 5 );
				geometry.name = 'ht_info_popup_scrollbarBgGeometry';
				material = new THREE.MeshBasicMaterial( {color: 0x7f7f7f, side: THREE.DoubleSide, transparent: true } );
				material.name = 'ht_info_popup_scrollbarBgMaterial';
				me._ht_info_popup.userData.scrollbarBg = new THREE.Mesh( geometry, material );
				me._ht_info_popup.userData.scrollbarBg.name = 'ht_info_popup_scrollbarBg';
				me._ht_info_popup.add(me._ht_info_popup.userData.scrollbarBg);
				me._ht_info_popup.userData.scrollbarXPos = (me._ht_info_popup.userData.width - 25) / 200.0;
				me._ht_info_popup.userData.scrollbarBg.position.x = me._ht_info_popup.userData.scrollbarXPos;
				me._ht_info_popup.userData.scrollbarBg.position.z = me._ht_info_popup.position.z + 0.01;
				me._ht_info_popup.userData.scrollbarBg.userData.stopPropagation = true;
				me._ht_info_popup.userData.scrollbarHeight = ((2 * me._ht_info_popup.userData.height) / me._ht_info_popup.userData.totalHeightCanv) * me._ht_info_popup.userData.height;
				geometry = new THREE.PlaneGeometry(25 / 100.0, me._ht_info_popup.userData.scrollbarHeight / 100.0, 5, 5 );
				geometry.name = 'ht_info_popup_scrollbarGeometry';
				material = new THREE.MeshBasicMaterial( {color: 0xbfbfbf, side: THREE.DoubleSide, transparent: true } );
				material.name = 'ht_info_popup_scrollbarMaterial';
				me._ht_info_popup.userData.scrollbar = new THREE.Mesh( geometry, material );
				me._ht_info_popup.userData.scrollbar.name = 'ht_info_popup_scrollbar';
				me._ht_info_popup.add(me._ht_info_popup.userData.scrollbar);
				me._ht_info_popup.userData.scrollbar.position.x = me._ht_info_popup.userData.scrollbarXPos;
				me._ht_info_popup.userData.scrollbar.position.z = me._ht_info_popup.position.z + 0.02;
				me._ht_info_popup.userData.scrollbarYPosMin = (me._ht_info_popup.userData.height - me._ht_info_popup.userData.scrollbarHeight) / 200.0;
				me._ht_info_popup.userData.scrollbarYPosMax = me._ht_info_popup.userData.scrollbarYPosMin - (me._ht_info_popup.userData.height - me._ht_info_popup.userData.scrollbarHeight) / 100.0;
				me._ht_info_popup.userData.scrollbar.position.y = me._ht_info_popup.userData.scrollbarYPosMin;
				geometry = new THREE.PlaneGeometry(25 / 100.0, me._ht_info_popup.userData.height / 200.0, 5, 5 );
				geometry.name = 'ht_info_popup_scrollbarPageDownGeometry';
				material = new THREE.MeshBasicMaterial( {color: 0x000000, side: THREE.DoubleSide, transparent: true } );
				material.name = 'ht_info_popup_scrollbarPageDownMaterial';
				me._ht_info_popup.userData.scrollbarPageDown = new THREE.Mesh( geometry, material );
				me._ht_info_popup.userData.scrollbarPageDown.name = 'ht_info_popup_scrollbarPageDown';
				me._ht_info_popup.userData.scrollbarPageDown.userData.onclick = function() {
					me._ht_info_popup.userData.scrollPosPercent -= me._ht_info_popup.userData.pagePercent;
					me._ht_info_popup.userData.scrollPosPercent = Math.max(me._ht_info_popup.userData.scrollPosPercent, 0);
					me._ht_info_popup.userData.ggPaintCanvasText();
					me._ht_info_popup.userData.scrollbar.position.y += (me._ht_info_popup.userData.height * me._ht_info_popup.userData.pagePercent) / 100.0;
					me._ht_info_popup.userData.scrollbar.position.y = Math.min(me._ht_info_popup.userData.scrollbar.position.y, me._ht_info_popup.userData.scrollbarYPosMin);
				}
				me._ht_info_popup.userData.scrollbarPageDown.position.x = me._ht_info_popup.userData.scrollbarXPos;
				me._ht_info_popup.userData.scrollbarPageDown.position.y = me._ht_info_popup.userData.height / 400.0;
				me._ht_info_popup.userData.scrollbarPageDown.position.z = me._ht_info_popup.position.z + 0.05;
				me._ht_info_popup.userData.scrollbarPageDown.userData.stopPropagation = true;
				me._ht_info_popup.userData.scrollbarPageDown.userData.clickInvisible = true;
				me._ht_info_popup.userData.scrollbarPageDown.visible = false;
				me._ht_info_popup.add(me._ht_info_popup.userData.scrollbarPageDown);
				geometry = new THREE.PlaneGeometry(25 / 100.0, me._ht_info_popup.userData.height / 200.0, 5, 5 );
				geometry.name = 'ht_info_popup_scrollbarPageUpGeometry';
				material = new THREE.MeshBasicMaterial( {color: 0x000000, side: THREE.DoubleSide, transparent: true } );
				material.name = 'ht_info_popup_scrollbarPageUpMaterial';
				me._ht_info_popup.userData.scrollbarPageUp = new THREE.Mesh( geometry, material );
				me._ht_info_popup.userData.scrollbarPageUp.name = 'ht_info_popup_scrollbarPageUp';
				me._ht_info_popup.userData.scrollbarPageUp.userData.onclick = function() {
					me._ht_info_popup.userData.scrollPosPercent += me._ht_info_popup.userData.pagePercent;
					me._ht_info_popup.userData.scrollPosPercent = Math.min(me._ht_info_popup.userData.scrollPosPercent, me._ht_info_popup.userData.maxScrollPercent);
					me._ht_info_popup.userData.ggPaintCanvasText();
					me._ht_info_popup.userData.scrollbar.position.y -= (me._ht_info_popup.userData.height * me._ht_info_popup.userData.pagePercent) / 100.0;
					me._ht_info_popup.userData.scrollbar.position.y = Math.max(me._ht_info_popup.userData.scrollbar.position.y, me._ht_info_popup.userData.scrollbarYPosMax);
				}
				me._ht_info_popup.userData.scrollbarPageUp.position.x = me._ht_info_popup.userData.scrollbarXPos;
				me._ht_info_popup.userData.scrollbarPageUp.position.y = -me._ht_info_popup.userData.height / 400.0;
				me._ht_info_popup.userData.scrollbarPageUp.position.z = me._ht_info_popup.position.z + 0.05;
				me._ht_info_popup.userData.scrollbarPageUp.userData.stopPropagation = true;
				me._ht_info_popup.userData.scrollbarPageUp.userData.clickInvisible = true;
				me._ht_info_popup.userData.scrollbarPageUp.visible = false;
				me._ht_info_popup.add(me._ht_info_popup.userData.scrollbarPageUp);
				me._ht_info_popup.userData.hasScrollbar = true;
			} else {
				me._ht_info_popup.userData.hasScrollbar = false;
			}
			canv.width = me._ht_info_popup.userData.boxWidthCanv;
			canv.height = me._ht_info_popup.userData.boxHeightCanv;
			ctx.font = '44px Verdana';
			me._ht_info_popup.userData.ggPaintCanvasText();
		}
		me._ht_info_popup.userData.ggUpdateText=function(force) {
			var params = [];
			params.push(player._(String(player._(me.hotspot.description))));
			var hs = player._("%1", params);
			if (hs!=this.ggText || force) {
				this.ggText=me._ht_info_popup.userData.ggStripTags(hs);
				this.ggRenderText();
			}
		}
		me._ht_info_popup.userData.ggUpdateText();
		el.userData.setBackgroundColor = function(v) {
			me._ht_info_popup.userData.backgroundColor = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_info_popup.userData.backgroundColorAlpha = v;
		}
		el.userData.setTextColor = function(v) {
			me._ht_info_popup.userData.textColor = v;
		}
		el.userData.setTextColorAlpha = function(v) {
			me._ht_info_popup.userData.textColorAlpha = v;
		}
		el.userData.ggId="ht_info_popup";
		me._ht_info_popup.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_info_popup_bg.add(me._ht_info_popup);
		geometry = new THREE.PlaneGeometry(0.4, 0.4, 5, 5 );
		geometry.name = 'ht_info_popup_close_geometry';
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAABJElEQVR4nO3bSw6DMBAEUSs341icfrLJSJGFAeNfY9c7QU9JiJVDAAAAAAAAAADgdcxsM7Nt9I4U6X2/cW4fvSdmZvvfPr2IUUCpiFE8zYAhHA4dHlFx0ymlwUpbsigMV9hQZOQBr4/nRhwyTTzX86Dp4rkeh00bz7U8cPp4rsWhy8RzNQ9eLp6rcfiy8VxJgOXjuSchiBfJCUK8hDthiHfhLBDxbjoKRbxMB8GIlysRUTLeZ/QAVMYnXICfSIGzUES8cCcQERNywhAx8iQIEX9KQiwfsUaAZSPWPHy5iC0OXiZiy0Onj9jjwGkj9jxsuogjDpom4shDXh9R4QCFDY8oDVfacoviYMVNh4xnDmWMhzblTPkpVdDfBwAAAAAAAABA2hcaGfeSY++bsA'+
	'AAAABJRU5ErkJggg==');
		texture.colorSpace = player.getVRTextureColorSpace();
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'ht_info_popup_close_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.materialNormal = material;
		el.translateX(2.85);
		el.translateY(2.05);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 40;
		el.userData.height = 40;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_info_popup_close';
		el.userData.x = 2.85;
		el.userData.y = 2.05;
		el.userData.hanchor = 2;
		el.userData.vanchor = 0;
		el.translateZ(0.040);
		el.renderOrder = 4;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_info_popup_close.material) me._ht_info_popup_close.material.opacity = v;
			me._ht_info_popup_close.visible = (v>0 && me._ht_info_popup_close.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._ht_info_popup_close.visible
			let parentEl = me._ht_info_popup_close.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_info_popup_close.userData.opacity = v;
			v = v * me._ht_info_popup_close.userData.parentOpacity;
			me._ht_info_popup_close.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info_popup_close.children.length; i++) {
				let child = me._ht_info_popup_close.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_info_popup_close.userData.parentOpacity = v;
			v = v * me._ht_info_popup_close.userData.opacity
			me._ht_info_popup_close.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info_popup_close.children.length; i++) {
				let child = me._ht_info_popup_close.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_info_popup_close = el;
		textureOver = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAABoUlEQVR4nO3by23CQBRA0UsKASSaYEu6ggKgK7J1E0iEQiArI5GE/N58XsQ9Sxb2zE3A4BmDJEmSJEmSJEn/zuw4rGbHYdV7HPfUGN9TqQPNjsPqcmZ/ObOfHoZ1qeOWMj0M63F8JSMWC3hjwjZTxOlhWDNhW+PYxQK+zpcvXNhcX0gS8UO8C5vX+fKl1PEnpQ40+mzAp8VyV/o8WcZSPCDkiNhqDFUCQt+ILc9dLSD0idj6nFUDQtsJ9fiDVQ8IbSbW6yOjSUCoO8Gen7fNAkKdifa+4jcNCGUn3DsedAgIZSaeIR50CgixAFniQceA8LcQmeJB54DwuyDZ4kGCgPCzMBnjQZKA8HWgrPEgUUD4PBRA1niQLCB8c/c4WTxIGBDuREwYD2qtiTyQdP'+
	'+BvoUDvIgE+DUmwC/SAf6UC/BmQoC3swK8oRrgLf0AF5UCXNYMcGE9wK0dAW4uCnB7W0DvK2PLMbjFN6howEzxRrXHVCzg+JzI9YUE8UbvI06eeC61U7/OmkiieACnxXJ38whGVo/4qJckSZIkSZIkSW28AdO331t58jXnAAAAAElFTkSuQmCC');
		textureOver.colorSpace = player.getVRTextureColorSpace();
		el.userData.materialOver = new THREE.MeshBasicMaterial( {map: textureOver, side: THREE.DoubleSide, transparent: true} );
		el.userData.materialOver.name = 'ht_info_popup_close_materialOver';
		el.userData.ggId="ht_info_popup_close";
		me._ht_info_popup_close.userData.onclick=function (e) {
			player.setVariableValue('open_info_hs', player.getVariableValue('open_info_hs').replace("<"+me.hotspot.id+">", ''));
		}
		me._ht_info_popup_close.userData.onmouseenter=function (e) {
			me._ht_info_popup_close.material = me._ht_info_popup_close.userData.materialOver;
			me.elementMouseOver['ht_info_popup_close']=true;
		}
		me._ht_info_popup_close.userData.onmouseleave=function (e) {
			me._ht_info_popup_close.material = me._ht_info_popup_close.userData.materialNormal;
			me.elementMouseOver['ht_info_popup_close']=false;
		}
		me._ht_info_popup_close.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_info_popup_bg.add(me._ht_info_popup_close);
		me._ht_info.add(me._ht_info_popup_bg);
		el = new THREE.Group();
		el.userData.backgroundColorAlpha = 1;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_info_customimage.userData.ggSubElement) {
				me._ht_info_customimage.userData.ggSubElement.material.opacity = v
				me._ht_info_customimage.userData.ggSubElement.visible = (v>0 && me._ht_info_customimage.userData.visible);
			}
			me._ht_info_customimage.visible = (v>0 && me._ht_info_customimage.userData.visible);
		}
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 50;
		el.userData.height = 50;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_info_CustomImage';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_info_customimage.visible
			let parentEl = me._ht_info_customimage.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_info_customimage.userData.opacity = v;
			v = v * me._ht_info_customimage.userData.parentOpacity;
			me._ht_info_customimage.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info_customimage.children.length; i++) {
				let child = me._ht_info_customimage.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_info_customimage.userData.parentOpacity = v;
			v = v * me._ht_info_customimage.userData.opacity
			me._ht_info_customimage.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info_customimage.children.length; i++) {
				let child = me._ht_info_customimage.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_info_customimage = el;
		currentWidth = 50;
		currentHeight = 50;
		var img = {};
		img.geometry = new THREE.PlaneGeometry(currentWidth / 100.0, currentHeight / 100.0, 5, 5 );
		img.geometry.name = 'ht_info_CustomImage_imgGeometry';
		loader = new THREE.TextureLoader();
		el.userData.ggSetUrl = function(extUrl) {
			loader.load(extUrl,
				function (texture) {
				texture.colorSpace = player.getVRTextureColorSpace();
				var loadedMaterial = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
				loadedMaterial.name = 'ht_info_CustomImage_subElementMaterial';
				me._ht_info_customimage.userData.ggSubElement.material = loadedMaterial;
				me._ht_info_customimage.userData.ggUpdatePosition();
				me._ht_info_customimage.userData.ggText = extUrl;
				me._ht_info_customimage.userData.setOpacity(me._ht_info_customimage.userData.opacity);
			});
		};
		if ((hotspot) && (hotspot.customimage)) {
			var extUrl=hotspot.customimage;
		}
		el.userData.ggSetUrl(extUrl);
		material = new THREE.MeshBasicMaterial( {color: 0xffffff, side: THREE.DoubleSide, transparent: true } );
		material.name = 'ht_info_CustomImage_subElementMaterial';
		el.userData.ggSubElement = new THREE.Mesh( img.geometry, material );
		el.userData.ggSubElement.name = 'ht_info_CustomImage_subElement';
		el.userData.ggSubElement.position.z = el.position.z + 0.005;
		el.add(el.userData.ggSubElement);
		el.userData.clientWidth = 50;
		el.userData.clientHeight = 50;
		el.userData.ggId="ht_info_CustomImage";
		me._ht_info_customimage.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage == "")) || 
				(((player.getVariableValue('open_info_hs') !== null) && (player.getVariableValue('open_info_hs')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_info_customimage.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_info_customimage.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._ht_info_customimage.ggCurrentLogicStateVisible == 0) {
			me._ht_info_customimage.visible=false;
			me._ht_info_customimage.userData.visible=false;
				}
				else {
			me._ht_info_customimage.visible=((!me._ht_info_customimage.material && Number(me._ht_info_customimage.userData.opacity>0)) || Number(me._ht_info_customimage.material.opacity)>0)?true:false;
			me._ht_info_customimage.userData.visible=true;
				}
			}
		}
		me._ht_info_customimage.logicBlock_visible();
		me._ht_info_customimage.userData.onclick=function (e) {
			player.setVariableValue('open_info_hs', player.getVariableValue('open_info_hs') + "<"+me.hotspot.id+">");
		}
		me._ht_info_customimage.userData.ggUpdatePosition=function (useTransition) {
			var parentWidth = me._ht_info_customimage.userData.clientWidth;
			var parentHeight = me._ht_info_customimage.userData.clientHeight;
			var img = me._ht_info_customimage.userData.ggSubElement;
			var imgWidth = img.material.map.image.naturalWidth;
			var imgHeight = img.material.map.image.naturalHeight;
			var aspectRatioDiv = parentWidth / parentHeight;
			var aspectRatioImg = imgWidth / imgHeight;
			if (imgWidth < parentWidth) parentWidth = imgWidth;
			if (imgHeight < parentHeight) parentHeight = imgHeight;
			var currentWidth, currentHeight;
			img.geometry.dispose();
			if ((hotspot) && (hotspot.customimage)) {
				currentWidth  = hotspot.customimagewidth;
				currentHeight = hotspot.customimageheight;
			img.geometry = new THREE.PlaneGeometry(currentWidth / 100.0, currentHeight / 100.0, 5, 5 );
			img.geometry.name = 'ht_info_CustomImage_imgGeometry';
			}
		}
		me._ht_info.add(me._ht_info_customimage);
		me._ht_info.userData.setOpacity(1.00);
		me.elementMouseOver['ht_info']=false;
		me._ht_info_bg.logicBlock_scaling();
		me._ht_info_bg.logicBlock_visible();
		me._ht_info_bg.logicBlock_alpha();
		me._ht_info_bg.userData.setOpacity(1.00);
		me.elementMouseOver['ht_info_bg']=false;
		me._ht_info_icon.userData.setOpacity(1.00);
		me._ht_info_title.logicBlock_alpha();
		me._ht_info_title.userData.setOpacity(0.00);
		me._ht_info_popup_bg.logicBlock_scaling();
		me._ht_info_popup_bg.logicBlock_alpha();
		me._ht_info_popup_bg.userData.setOpacity(0.00);
		me._ht_info_popup.userData.setOpacity(1.00);
		me._ht_info_popup_close.userData.setOpacity(1.00);
		me.elementMouseOver['ht_info_popup_close']=false;
		me._ht_info_customimage.logicBlock_visible();
		me._ht_info_customimage.userData.setOpacity(1.00);
			me.ggEvent_activehotspotchanged=function() {
				me._ht_info_bg.logicBlock_visible();
				me._ht_info_customimage.logicBlock_visible();
			};
			me.ggEvent_changenode=function() {
				me._ht_info_bg.logicBlock_visible();
				me._ht_info_bg.logicBlock_alpha();
					me._ht_info_title.userData.ggUpdateText();
				me._ht_info_popup_bg.logicBlock_scaling();
				me._ht_info_popup_bg.logicBlock_alpha();
					me._ht_info_popup.userData.ggUpdateText();
				me._ht_info_customimage.logicBlock_visible();
			};
			me.ggEvent_configloaded=function() {
				me._ht_info_bg.logicBlock_visible();
				me._ht_info_bg.logicBlock_alpha();
				me._ht_info_popup_bg.logicBlock_scaling();
				me._ht_info_popup_bg.logicBlock_alpha();
				me._ht_info_customimage.logicBlock_visible();
			};
			me.ggEvent_varchanged_open_image_hs=function() {
				me._ht_info_bg.logicBlock_alpha();
			};
			me.ggEvent_varchanged_open_info_hs=function() {
				me._ht_info_popup_bg.logicBlock_scaling();
				me._ht_info_popup_bg.logicBlock_alpha();
				me._ht_info_customimage.logicBlock_visible();
			};
			me.__obj = me._ht_info;
			me.__obj.userData.hotspot = hotspot;
			me.__obj.userData.fromSkin = true;
	};
	function SkinHotspotClass_ht_image(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.ggUserdata.nodeId=nodeId;
		me.elementMouseDown={};
		me.elementMouseOver={};
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el = new THREE.Group();
		el.userData.setOpacityInternal = function(v) {};
		el.name = 'ht_image';
		el.userData.x = -1.17;
		el.userData.y = 2.1;
		el.userData.hanchor = 0;
		el.userData.vanchor = 0;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_image.visible
			let parentEl = me._ht_image.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_image.userData.opacity = v;
			v = v * me._ht_image.userData.parentOpacity;
			me._ht_image.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_image.children.length; i++) {
				let child = me._ht_image.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_image.userData.parentOpacity = v;
			v = v * me._ht_image.userData.opacity
			me._ht_image.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_image.children.length; i++) {
				let child = me._ht_image.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_image = el;
		el.userData.ggId="ht_image";
		el.userData.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.userData.ggElementNodeId)) {
					return this.parentNode.userData.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_image.userData.onclick=function (e) {
			player.triggerEvent('hsproxyclick', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_image.userData.ondblclick=function (e) {
			player.triggerEvent('hsproxydblclick', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_image.userData.onmouseenter=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_image']=true;
			player.triggerEvent('hsproxyover', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_image.userData.onmouseleave=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_image']=false;
			player.triggerEvent('hsproxyout', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_image.userData.ggUpdatePosition=function (useTransition) {
		}
		width = 0.45;
		height = 0.45;
		roundedRectShape = new THREE.Shape();
		roundedRectShape.moveTo((-width / 2.0) + 0.12, (height / 2.0));
		roundedRectShape.lineTo((width / 2.0) - 0.12, (height / 2.0));
		roundedRectShape.arc(0, -0.12, 0.12, Math.PI / 2.0, 2.0 * Math.PI, true);
		roundedRectShape.lineTo((width / 2.0), (-height / 2.0) + 0.12);
		roundedRectShape.arc(-0.12, 0, 0.12, 2.0 * Math.PI, 3.0 * Math.PI / 2.0, true);
		roundedRectShape.lineTo((-width / 2.0) + 0.12, (-height / 2.0));
		roundedRectShape.arc(0, 0.12, 0.12, 3.0 * Math.PI / 2.0, Math.PI, true);
		roundedRectShape.lineTo((-width / 2.0), (height / 2.0) - 0.12);
		roundedRectShape.arc(0.12, 0, 0.12, Math.PI, Math.PI / 2.0, true);
		geometry = new THREE.ShapeGeometry(roundedRectShape);
		geometry.name = 'ht_image_bg_geometry';
		geometry.computeBoundingBox();
		var min = geometry.boundingBox.min;
		var max = geometry.boundingBox.max;
		var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
		var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
		var vertexPositions = geometry.getAttribute('position');
		var vertexUVs = geometry.getAttribute('uv');
		for (var i = 0; i < vertexPositions.count; i++) {
			var v1 = vertexPositions.getX(i);
			var	v2 = vertexPositions.getY(i);
			vertexUVs.setX(i, (v1 + offset.x) / range.x);
			vertexUVs.setY(i, (v2 + offset.y) / range.y);
		}
		geometry.uvsNeedUpdate = true;
		material = new THREE.MeshBasicMaterial( { color: new THREE.Color(0.290196, 0.290196, 0.290196).convertSRGBToLinear(), side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'ht_image_bg_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 0.588235;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._ht_image_bg.material.opacity = v * me._ht_image_bg.userData.backgroundColorAlpha;
			if (me._ht_image_bg.userData.ggSubElement) {
				me._ht_image_bg.userData.ggSubElement.material.opacity = v
				me._ht_image_bg.userData.ggSubElement.visible = (v>0 && me._ht_image_bg.userData.visible);
			}
			me._ht_image_bg.visible = (v>0 && me._ht_image_bg.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._ht_image_bg.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_image_bg.userData.backgroundColorAlpha = v;
			me._ht_image_bg.userData.setOpacity(me._ht_image_bg.userData.opacity);
		}
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 45;
		el.userData.height = 45;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_image_bg';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.010);
		el.renderOrder = 1;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_image_bg.visible
			let parentEl = me._ht_image_bg.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_image_bg.userData.opacity = v;
			v = v * me._ht_image_bg.userData.parentOpacity;
			me._ht_image_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_image_bg.children.length; i++) {
				let child = me._ht_image_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_image_bg.userData.parentOpacity = v;
			v = v * me._ht_image_bg.userData.opacity
			me._ht_image_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_image_bg.children.length; i++) {
				let child = me._ht_image_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = false;
		el.userData.visible = false;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_image_bg = el;
		el.userData.ggId="ht_image_bg";
		me._ht_image_bg.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((me.elementMouseOver['ht_image_bg'] == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._ht_image_bg.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._ht_image_bg.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._ht_image_bg.ggCurrentLogicStateScaling == 0) {
					me._ht_image_bg.userData.transitionValue_scale = {x: 1.2, y: 1.2, z: 1.0};
					for (var i = 0; i < me._ht_image_bg.userData.transitions.length; i++) {
						if (me._ht_image_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_image_bg.userData.transitions[i].interval);
							me._ht_image_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._ht_image_bg.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_image_bg.scale.set(transition_scale.startScale.x + (me._ht_image_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_image_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_image_bg.position.x = (me._ht_image_bg.position.x - me._ht_image_bg.userData.curScaleOffX) + scaleOffX;
						me._ht_image_bg.userData.curScaleOffX = scaleOffX;
						me._ht_image_bg.position.y = (me._ht_image_bg.position.y - me._ht_image_bg.userData.curScaleOffY) + scaleOffY;
						me._ht_image_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_image_bg.userData.transitions.splice(me._ht_image_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_image_bg.userData.transitions.push(transition_scale);
				}
				else {
					me._ht_image_bg.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._ht_image_bg.userData.transitions.length; i++) {
						if (me._ht_image_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_image_bg.userData.transitions[i].interval);
							me._ht_image_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._ht_image_bg.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_image_bg.scale.set(transition_scale.startScale.x + (me._ht_image_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_image_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_image_bg.position.x = (me._ht_image_bg.position.x - me._ht_image_bg.userData.curScaleOffX) + scaleOffX;
						me._ht_image_bg.userData.curScaleOffX = scaleOffX;
						me._ht_image_bg.position.y = (me._ht_image_bg.position.y - me._ht_image_bg.userData.curScaleOffY) + scaleOffY;
						me._ht_image_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_image_bg.userData.transitions.splice(me._ht_image_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_image_bg.userData.transitions.push(transition_scale);
				}
			}
		}
		me._ht_image_bg.logicBlock_scaling();
		me._ht_image_bg.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage == ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_image_bg.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_image_bg.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._ht_image_bg.ggCurrentLogicStateVisible == 0) {
			me._ht_image_bg.visible=((!me._ht_image_bg.material && Number(me._ht_image_bg.userData.opacity>0)) || Number(me._ht_image_bg.material.opacity)>0)?true:false;
			me._ht_image_bg.userData.visible=true;
				}
				else {
			me._ht_image_bg.visible=false;
			me._ht_image_bg.userData.visible=false;
				}
			}
		}
		me._ht_image_bg.logicBlock_visible();
		me._ht_image_bg.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				(((player.getVariableValue('open_image_hs') !== null) && (player.getVariableValue('open_image_hs')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._ht_image_bg.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._ht_image_bg.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				if (me._ht_image_bg.ggCurrentLogicStateAlpha == 0) {
					me._ht_image_bg.userData.transitionValue_alpha = 0;
					for (var i = 0; i < me._ht_image_bg.userData.transitions.length; i++) {
						if (me._ht_image_bg.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_image_bg.userData.transitions[i].interval);
							me._ht_image_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_image_bg.material ? me._ht_image_bg.material.opacity : me._ht_image_bg.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_image_bg.userData.setOpacity(transition_alpha.startAlpha + (me._ht_image_bg.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_image_bg.userData.transitions.splice(me._ht_image_bg.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_image_bg.userData.transitions.push(transition_alpha);
				}
				else {
					me._ht_image_bg.userData.transitionValue_alpha = 1;
					for (var i = 0; i < me._ht_image_bg.userData.transitions.length; i++) {
						if (me._ht_image_bg.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_image_bg.userData.transitions[i].interval);
							me._ht_image_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_image_bg.material ? me._ht_image_bg.material.opacity : me._ht_image_bg.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_image_bg.userData.setOpacity(transition_alpha.startAlpha + (me._ht_image_bg.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_image_bg.userData.transitions.splice(me._ht_image_bg.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_image_bg.userData.transitions.push(transition_alpha);
				}
			}
		}
		me._ht_image_bg.logicBlock_alpha();
		me._ht_image_bg.userData.onclick=function (e) {
			player.setVariableValue('open_image_hs', player.getVariableValue('open_image_hs') + "<"+me.hotspot.id+">");
		}
		me._ht_image_bg.userData.onmouseenter=function (e) {
			me.elementMouseOver['ht_image_bg']=true;
			me._ht_image_title.logicBlock_alpha();
			me._ht_image_bg.logicBlock_scaling();
		}
		me._ht_image_bg.userData.ontouchend=function (e) {
			me._ht_image_bg.logicBlock_scaling();
		}
		me._ht_image_bg.userData.onmouseleave=function (e) {
			me.elementMouseOver['ht_image_bg']=false;
			me._ht_image_title.logicBlock_alpha();
			me._ht_image_bg.logicBlock_scaling();
		}
		me._ht_image_bg.userData.ggUpdatePosition=function (useTransition) {
		}
		geometry = new THREE.PlaneGeometry(0.36, 0.36, 5, 5 );
		geometry.name = 'ht_image_icon_geometry';
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,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');
		texture.colorSpace = player.getVRTextureColorSpace();
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'ht_image_icon_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.materialNormal = material;
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 36;
		el.userData.height = 36;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_image_icon';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.020);
		el.renderOrder = 2;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_image_icon.material) me._ht_image_icon.material.opacity = v;
			me._ht_image_icon.visible = (v>0 && me._ht_image_icon.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._ht_image_icon.visible
			let parentEl = me._ht_image_icon.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_image_icon.userData.opacity = v;
			v = v * me._ht_image_icon.userData.parentOpacity;
			me._ht_image_icon.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_image_icon.children.length; i++) {
				let child = me._ht_image_icon.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_image_icon.userData.parentOpacity = v;
			v = v * me._ht_image_icon.userData.opacity
			me._ht_image_icon.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_image_icon.children.length; i++) {
				let child = me._ht_image_icon.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_image_icon = el;
		el.userData.ggId="ht_image_icon";
		me._ht_image_icon.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_image_bg.add(me._ht_image_icon);
		geometry = new THREE.PlaneGeometry(1, 0.2, 5, 5 );
		geometry.name = 'ht_image_title_geometry';
		material = new THREE.MeshBasicMaterial( {side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'ht_image_title_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 1;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._ht_image_title.material.opacity = v;
			if (me._ht_image_title.userData.hasScrollbar) {
				me._ht_image_title.userData.scrollbar.material.opacity = v;
				me._ht_image_title.userData.scrollbarBg.material.opacity = v;
			}
			if (me._ht_image_title.userData.ggSubElement) {
				me._ht_image_title.userData.ggSubElement.material.opacity = v
				me._ht_image_title.userData.ggSubElement.visible = (v>0 && me._ht_image_title.userData.visible);
			}
			me._ht_image_title.visible = (v>0 && me._ht_image_title.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._ht_image_title.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_image_title.userData.backgroundColorAlpha = v;
			me._ht_image_title.userData.setOpacity(me._ht_image_title.userData.opacity);
		}
		el.translateX(0);
		el.translateY(-0.325);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 100;
		el.userData.height = 20;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_image_title';
		el.userData.x = 0;
		el.userData.y = -0.325;
		el.userData.hanchor = 1;
		el.userData.vanchor = 2;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_image_title.visible
			let parentEl = me._ht_image_title.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_image_title.userData.opacity = v;
			v = v * me._ht_image_title.userData.parentOpacity;
			me._ht_image_title.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_image_title.children.length; i++) {
				let child = me._ht_image_title.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_image_title.userData.parentOpacity = v;
			v = v * me._ht_image_title.userData.opacity
			me._ht_image_title.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_image_title.children.length; i++) {
				let child = me._ht_image_title.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 0.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_image_title = el;
		el.userData.textLines = [];
		el.userData.backgroundColor = new THREE.Color(1, 1, 1).convertSRGBToLinear();
		el.userData.textColor = new THREE.Color(0.117647, 0.870588, 0.784314).convertSRGBToLinear();
		el.userData.textColorAlpha = 1;
		var canvas = document.createElement('canvas');
		canvas.width = 200;
		canvas.height = 40;
		el.userData.textCanvas = canvas;
		el.userData.textCanvasContext = canvas.getContext('2d');
		el.userData.ggStripTags = function(text) {
			let doc = new DOMParser().parseFromString(text, 'text/html');
			return doc.body.textContent || '';
		}
		el.userData.ggWrapText = function(scrollbar) {
			me._ht_image_title.userData.totalHeightCanv = 2 * (3);
			me._ht_image_title.userData.textLines = [];
			var ctx = me._ht_image_title.userData.textCanvasContext;
			var words = [];
			let tmpText = String(me._ht_image_title.userData.ggText);
			let whiteSpaceIndex = -1;
			do {
				whiteSpaceIndex = tmpText.search(/[\s]/);
				if (whiteSpaceIndex != -1) {
					words.push(tmpText.substr(0, whiteSpaceIndex));
					tmpText = tmpText.substr(whiteSpaceIndex);
					if (tmpText.charAt(0) == '\n') {
						words.push('\n');
					}
					tmpText = tmpText.substr(1);
				} else {
					words.push(tmpText);
				}
			} while (whiteSpaceIndex != -1);
			var line = '';
			for (var i = 0; i < words.length; i++) {
				if (words[i] == '\n') {
					me._ht_image_title.userData.textLines.push(line);
					line = '';
					me._ht_image_title.userData.totalHeightCanv += me._ht_image_title.userData.lineHeightCanv;
					continue;
				}
				var testLine;
				if (line == '') {
					testLine = words[i]
				} else {
					testLine = line + ' ' + words[i];
				}
				var metrics = ctx.measureText(testLine);
				var testWidth = metrics.width;
				if (testWidth > (2 * (me._ht_image_title.userData.width - 0 - (scrollbar ? 25 : 0))) && i > 0) {
					me._ht_image_title.userData.textLines.push(line);
					line = words[i];
					me._ht_image_title.userData.totalHeightCanv += me._ht_image_title.userData.lineHeightCanv;
				} else {
					line = testLine;
				}
			}
			me._ht_image_title.userData.textLines.push(line);
			me._ht_image_title.userData.totalHeightCanv += me._ht_image_title.userData.lineHeightCanv;
		}
		el.userData.ggPaintCanvasText = function() {
			var canv = me._ht_image_title.userData.textCanvas;
			var ctx = me._ht_image_title.userData.textCanvasContext;
			ctx.clearRect(0, 0, canv.width, canv.height);
			ctx.fillStyle = 'rgba(' + me._ht_image_title.userData.textColor.r * 255 + ', ' + me._ht_image_title.userData.textColor.g * 255 + ', ' + me._ht_image_title.userData.textColor.b * 255 + ', ' + me._ht_image_title.userData.textColorAlpha + ')';
			ctx.textBaseline = 'top';
			var x = (me._ht_image_title.userData.boxWidthCanv - (me._ht_image_title.userData.hasScrollbar ? 50 : 0)) / 2;
			ctx.textAlign = 'center';
			var y = 2 * 3;
			for (var i = 0; i < me._ht_image_title.userData.textLines.length; i++) {
				ctx.fillText(me._ht_image_title.userData.textLines[i], x, y);
				y += me._ht_image_title.userData.lineHeightCanv;
			}
			geometry = new THREE.PlaneGeometry(me._ht_image_title.userData.boxWidthCanv / 200.0, me._ht_image_title.userData.boxHeightCanv / 200.0, 5, 5 );
			geometry.name = 'ht_image_title_geometry';
			me._ht_image_title.geometry.dispose();
			me._ht_image_title.geometry = geometry;
			var diffY = (me._ht_image_title.userData.boxHeightCanv / 2) - me._ht_image_title.userData.height;
			me._ht_image_title.position.y = me._ht_image_title.userData.y - ((diffY / 2.0) / 100.0);
			var textTexture = new THREE.CanvasTexture(canv);
			textTexture.name = 'ht_image_title_texture';
			textTexture.minFilter = THREE.LinearFilter;
			textTexture.colorSpace = THREE.LinearSRGBColorSpace;
			textTexture.wrapS = THREE.ClampToEdgeWrapping;
			textTexture.wrapT = THREE.ClampToEdgeWrapping;
			if (me._ht_image_title.material.map) {
				me._ht_image_title.material.map.dispose();
			}
			me._ht_image_title.material.map = textTexture;
		}
		el.userData.ggRenderText = function() {
			for (let i = 0; i < me._ht_image_title.children.length; i++) {
				let child = me._ht_image_title.children[i];
				if (child.name.includes('scrollbar')) me._ht_image_title.remove(child);
			}
			var canv = me._ht_image_title.userData.textCanvas;
			var ctx = me._ht_image_title.userData.textCanvasContext;
			ctx.font = '36px Verdana';
			me._ht_image_title.userData.lineHeightCanv = 36 * 1.2;
			me._ht_image_title.userData.textLines = [];
			me._ht_image_title.userData.textLines.push(me._ht_image_title.userData.ggText);
			me._ht_image_title.userData.totalHeightCanv = 2 * (3);
			me._ht_image_title.userData.totalHeightCanv += me._ht_image_title.userData.lineHeightCanv;
			me._ht_image_title.userData.boxWidthCanv = ctx.measureText(me._ht_image_title.userData.ggText).width + (2 * 0);
			me._ht_image_title.userData.boxHeightCanv = me._ht_image_title.userData.totalHeightCanv;
			canv.width = me._ht_image_title.userData.boxWidthCanv;
			canv.height = me._ht_image_title.userData.boxHeightCanv;
			ctx.font = '36px Verdana';
			me._ht_image_title.userData.ggPaintCanvasText();
		}
		me._ht_image_title.userData.ggUpdateText=function(force) {
			var params = [];
			params.push(player._(String(player._(me.hotspot.title))));
			var hs = player._("%1", params);
			if (hs!=this.ggText || force) {
				this.ggText=me._ht_image_title.userData.ggStripTags(hs);
				this.ggRenderText();
			}
		}
		me._ht_image_title.userData.ggUpdateText();
		el.userData.setBackgroundColor = function(v) {
			me._ht_image_title.userData.backgroundColor = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_image_title.userData.backgroundColorAlpha = v;
		}
		el.userData.setTextColor = function(v) {
			me._ht_image_title.userData.textColor = v;
		}
		el.userData.setTextColorAlpha = function(v) {
			me._ht_image_title.userData.textColorAlpha = v;
		}
		el.userData.ggId="ht_image_title";
		me._ht_image_title.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['ht_image_bg'] == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._ht_image_title.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._ht_image_title.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				if (me._ht_image_title.ggCurrentLogicStateAlpha == 0) {
					me._ht_image_title.userData.transitionValue_alpha = 1;
					for (var i = 0; i < me._ht_image_title.userData.transitions.length; i++) {
						if (me._ht_image_title.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_image_title.userData.transitions[i].interval);
							me._ht_image_title.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_image_title.material ? me._ht_image_title.material.opacity : me._ht_image_title.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_image_title.userData.setOpacity(transition_alpha.startAlpha + (me._ht_image_title.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_image_title.userData.transitions.splice(me._ht_image_title.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_image_title.userData.transitions.push(transition_alpha);
				}
				else {
					me._ht_image_title.userData.transitionValue_alpha = 0;
					for (var i = 0; i < me._ht_image_title.userData.transitions.length; i++) {
						if (me._ht_image_title.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_image_title.userData.transitions[i].interval);
							me._ht_image_title.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_image_title.material ? me._ht_image_title.material.opacity : me._ht_image_title.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_image_title.userData.setOpacity(transition_alpha.startAlpha + (me._ht_image_title.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_image_title.userData.transitions.splice(me._ht_image_title.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_image_title.userData.transitions.push(transition_alpha);
				}
			}
		}
		me._ht_image_title.logicBlock_alpha();
		me._ht_image_title.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_image_bg.add(me._ht_image_title);
		me._ht_image.add(me._ht_image_bg);
		width = 6.6;
		height = 4.8;
		roundedRectShape = new THREE.Shape();
		roundedRectShape.moveTo((-width / 2.0) + 0.3, (height / 2.0));
		roundedRectShape.lineTo((width / 2.0) - 0.3, (height / 2.0));
		roundedRectShape.arc(0, -0.3, 0.3, Math.PI / 2.0, 2.0 * Math.PI, true);
		roundedRectShape.lineTo((width / 2.0), (-height / 2.0) + 0.3);
		roundedRectShape.arc(-0.3, 0, 0.3, 2.0 * Math.PI, 3.0 * Math.PI / 2.0, true);
		roundedRectShape.lineTo((-width / 2.0) + 0.3, (-height / 2.0));
		roundedRectShape.arc(0, 0.3, 0.3, 3.0 * Math.PI / 2.0, Math.PI, true);
		roundedRectShape.lineTo((-width / 2.0), (height / 2.0) - 0.3);
		roundedRectShape.arc(0.3, 0, 0.3, Math.PI, Math.PI / 2.0, true);
		geometry = new THREE.ShapeGeometry(roundedRectShape);
		geometry.name = 'ht_image_popup_bg_geometry';
		geometry.computeBoundingBox();
		var min = geometry.boundingBox.min;
		var max = geometry.boundingBox.max;
		var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
		var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
		var vertexPositions = geometry.getAttribute('position');
		var vertexUVs = geometry.getAttribute('uv');
		for (var i = 0; i < vertexPositions.count; i++) {
			var v1 = vertexPositions.getX(i);
			var	v2 = vertexPositions.getY(i);
			vertexUVs.setX(i, (v1 + offset.x) / range.x);
			vertexUVs.setY(i, (v2 + offset.y) / range.y);
		}
		geometry.uvsNeedUpdate = true;
		material = new THREE.MeshBasicMaterial( { color: new THREE.Color(0.290196, 0.290196, 0.290196).convertSRGBToLinear(), side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'ht_image_popup_bg_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 0.666667;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._ht_image_popup_bg.material.opacity = v * me._ht_image_popup_bg.userData.backgroundColorAlpha;
			if (me._ht_image_popup_bg.userData.ggSubElement) {
				me._ht_image_popup_bg.userData.ggSubElement.material.opacity = v
				me._ht_image_popup_bg.userData.ggSubElement.visible = (v>0 && me._ht_image_popup_bg.userData.visible);
			}
			me._ht_image_popup_bg.visible = (v>0 && me._ht_image_popup_bg.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._ht_image_popup_bg.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_image_popup_bg.userData.backgroundColorAlpha = v;
			me._ht_image_popup_bg.userData.setOpacity(me._ht_image_popup_bg.userData.opacity);
		}
		el.translateX(0);
		el.translateY(0);
		el.scale.set(0.10, 0.10, 1.0);
		el.userData.width = 660;
		el.userData.height = 480;
		el.userData.scale = {x: 0.10, y: 0.10, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_image_popup_bg';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.020);
		el.renderOrder = 2;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_image_popup_bg.visible
			let parentEl = me._ht_image_popup_bg.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_image_popup_bg.userData.opacity = v;
			v = v * me._ht_image_popup_bg.userData.parentOpacity;
			me._ht_image_popup_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_image_popup_bg.children.length; i++) {
				let child = me._ht_image_popup_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_image_popup_bg.userData.parentOpacity = v;
			v = v * me._ht_image_popup_bg.userData.opacity
			me._ht_image_popup_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_image_popup_bg.children.length; i++) {
				let child = me._ht_image_popup_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 0.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_image_popup_bg = el;
		el.userData.ggId="ht_image_popup_bg";
		me._ht_image_popup_bg.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				(((player.getVariableValue('open_image_hs') !== null) && (player.getVariableValue('open_image_hs')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._ht_image_popup_bg.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._ht_image_popup_bg.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._ht_image_popup_bg.ggCurrentLogicStateScaling == 0) {
					me._ht_image_popup_bg.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._ht_image_popup_bg.userData.transitions.length; i++) {
						if (me._ht_image_popup_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_image_popup_bg.userData.transitions[i].interval);
							me._ht_image_popup_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._ht_image_popup_bg.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_image_popup_bg.scale.set(transition_scale.startScale.x + (me._ht_image_popup_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_image_popup_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_image_popup_bg.position.x = (me._ht_image_popup_bg.position.x - me._ht_image_popup_bg.userData.curScaleOffX) + scaleOffX;
						me._ht_image_popup_bg.userData.curScaleOffX = scaleOffX;
						me._ht_image_popup_bg.position.y = (me._ht_image_popup_bg.position.y - me._ht_image_popup_bg.userData.curScaleOffY) + scaleOffY;
						me._ht_image_popup_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_image_popup_bg.userData.transitions.splice(me._ht_image_popup_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_image_popup_bg.userData.transitions.push(transition_scale);
				}
				else {
					me._ht_image_popup_bg.userData.transitionValue_scale = {x: 0.1, y: 0.1, z: 1.0};
					for (var i = 0; i < me._ht_image_popup_bg.userData.transitions.length; i++) {
						if (me._ht_image_popup_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_image_popup_bg.userData.transitions[i].interval);
							me._ht_image_popup_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._ht_image_popup_bg.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_image_popup_bg.scale.set(transition_scale.startScale.x + (me._ht_image_popup_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_image_popup_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_image_popup_bg.position.x = (me._ht_image_popup_bg.position.x - me._ht_image_popup_bg.userData.curScaleOffX) + scaleOffX;
						me._ht_image_popup_bg.userData.curScaleOffX = scaleOffX;
						me._ht_image_popup_bg.position.y = (me._ht_image_popup_bg.position.y - me._ht_image_popup_bg.userData.curScaleOffY) + scaleOffY;
						me._ht_image_popup_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_image_popup_bg.userData.transitions.splice(me._ht_image_popup_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_image_popup_bg.userData.transitions.push(transition_scale);
				}
			}
		}
		me._ht_image_popup_bg.logicBlock_scaling();
		me._ht_image_popup_bg.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				(((player.getVariableValue('open_image_hs') !== null) && (player.getVariableValue('open_image_hs')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._ht_image_popup_bg.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._ht_image_popup_bg.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				if (me._ht_image_popup_bg.ggCurrentLogicStateAlpha == 0) {
					me._ht_image_popup_bg.userData.transitionValue_alpha = 1;
					for (var i = 0; i < me._ht_image_popup_bg.userData.transitions.length; i++) {
						if (me._ht_image_popup_bg.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_image_popup_bg.userData.transitions[i].interval);
							me._ht_image_popup_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_image_popup_bg.material ? me._ht_image_popup_bg.material.opacity : me._ht_image_popup_bg.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_image_popup_bg.userData.setOpacity(transition_alpha.startAlpha + (me._ht_image_popup_bg.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_image_popup_bg.userData.transitions.splice(me._ht_image_popup_bg.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_image_popup_bg.userData.transitions.push(transition_alpha);
				}
				else {
					me._ht_image_popup_bg.userData.transitionValue_alpha = 0;
					for (var i = 0; i < me._ht_image_popup_bg.userData.transitions.length; i++) {
						if (me._ht_image_popup_bg.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_image_popup_bg.userData.transitions[i].interval);
							me._ht_image_popup_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_image_popup_bg.material ? me._ht_image_popup_bg.material.opacity : me._ht_image_popup_bg.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_image_popup_bg.userData.setOpacity(transition_alpha.startAlpha + (me._ht_image_popup_bg.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_image_popup_bg.userData.transitions.splice(me._ht_image_popup_bg.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_image_popup_bg.userData.transitions.push(transition_alpha);
				}
			}
		}
		me._ht_image_popup_bg.logicBlock_alpha();
		me._ht_image_popup_bg.userData.ggUpdatePosition=function (useTransition) {
		}
		el = new THREE.Group();
		el.userData.backgroundColorAlpha = 1;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_image_popup.userData.ggSubElement) {
				me._ht_image_popup.userData.ggSubElement.material.opacity = v
				me._ht_image_popup.userData.ggSubElement.visible = (v>0 && me._ht_image_popup.userData.visible);
			}
			me._ht_image_popup.visible = (v>0 && me._ht_image_popup.userData.visible);
		}
		el.translateX(0);
		el.translateY(-0.2);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 600;
		el.userData.height = 400;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_image_popup';
		el.userData.x = 0;
		el.userData.y = -0.2;
		el.userData.hanchor = 1;
		el.userData.vanchor = 2;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_image_popup.visible
			let parentEl = me._ht_image_popup.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_image_popup.userData.opacity = v;
			v = v * me._ht_image_popup.userData.parentOpacity;
			me._ht_image_popup.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_image_popup.children.length; i++) {
				let child = me._ht_image_popup.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_image_popup.userData.parentOpacity = v;
			v = v * me._ht_image_popup.userData.opacity
			me._ht_image_popup.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_image_popup.children.length; i++) {
				let child = me._ht_image_popup.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_image_popup = el;
		currentWidth = 600;
		currentHeight = 400;
		var img = {};
		width = currentWidth / 100.0;
		height = currentHeight / 100.0;
		roundedRectShape = new THREE.Shape();
		roundedRectShape.moveTo((-width / 2.0) + 0.2, (height / 2.0));
		roundedRectShape.lineTo((width / 2.0) - 0.2, (height / 2.0));
		roundedRectShape.arc(0, -0.2, 0.2, Math.PI / 2.0, 2.0 * Math.PI, true);
		roundedRectShape.lineTo((width / 2.0), (-height / 2.0) + 0.2);
		roundedRectShape.arc(-0.2, 0, 0.2, 2.0 * Math.PI, 3.0 * Math.PI / 2.0, true);
		roundedRectShape.lineTo((-width / 2.0) + 0.2, (-height / 2.0));
		roundedRectShape.arc(0, 0.2, 0.2, 3.0 * Math.PI / 2.0, Math.PI, true);
		roundedRectShape.lineTo((-width / 2.0), (height / 2.0) - 0.2);
		roundedRectShape.arc(0.2, 0, 0.2, Math.PI, Math.PI / 2.0, true);
		geometry = new THREE.ShapeGeometry(roundedRectShape);
		geometry.name = 'ht_image_popup_geometry';
		geometry.computeBoundingBox();
		var min = geometry.boundingBox.min;
		var max = geometry.boundingBox.max;
		var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
		var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
		var vertexPositions = geometry.getAttribute('position');
		var vertexUVs = geometry.getAttribute('uv');
		for (var i = 0; i < vertexPositions.count; i++) {
			var v1 = vertexPositions.getX(i);
			var	v2 = vertexPositions.getY(i);
			vertexUVs.setX(i, (v1 + offset.x) / range.x);
			vertexUVs.setY(i, (v2 + offset.y) / range.y);
		}
		geometry.uvsNeedUpdate = true;
		img.geometry = geometry;
		loader = new THREE.TextureLoader();
		el.userData.ggSetUrl = function(extUrl) {
			loader.load(extUrl,
				function (texture) {
				texture.colorSpace = player.getVRTextureColorSpace();
				var loadedMaterial = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
				loadedMaterial.name = 'ht_image_popup_subElementMaterial';
				me._ht_image_popup.userData.ggSubElement.material = loadedMaterial;
				me._ht_image_popup.userData.ggUpdatePosition();
				me._ht_image_popup.userData.ggText = extUrl;
				me._ht_image_popup.userData.setOpacity(me._ht_image_popup.userData.opacity);
			});
		};
		player.addListener('changenode', function() {
		});
		var extUrl=basePath + ""+player._(me.hotspot.url)+"";
		el.userData.ggSetUrl(extUrl);
		material = new THREE.MeshBasicMaterial( {color: 0xffffff, side: THREE.DoubleSide, transparent: true } );
		material.name = 'ht_image_popup_subElementMaterial';
		el.userData.ggSubElement = new THREE.Mesh( img.geometry, material );
		el.userData.ggSubElement.name = 'ht_image_popup_subElement';
		el.userData.ggSubElement.position.z = el.position.z + 0.005;
		el.add(el.userData.ggSubElement);
		el.userData.clientWidth = 600;
		el.userData.clientHeight = 400;
		el.userData.ggId="ht_image_popup";
		me._ht_image_popup.userData.ggUpdatePosition=function (useTransition) {
			var parentWidth = me._ht_image_popup.userData.clientWidth;
			var parentHeight = me._ht_image_popup.userData.clientHeight;
			var img = me._ht_image_popup.userData.ggSubElement;
			var imgWidth = img.material.map.image.naturalWidth;
			var imgHeight = img.material.map.image.naturalHeight;
			var aspectRatioDiv = parentWidth / parentHeight;
			var aspectRatioImg = imgWidth / imgHeight;
			var currentWidth, currentHeight;
			img.geometry.dispose();
			if (aspectRatioDiv > aspectRatioImg) {
				currentHeight = parentHeight;
				currentWidth = parentHeight * aspectRatioImg;
			width = currentWidth / 100.0;
			height = currentHeight / 100.0;
			roundedRectShape = new THREE.Shape();
			roundedRectShape.moveTo((-width / 2.0) + 0.2, (height / 2.0));
			roundedRectShape.lineTo((width / 2.0) - 0.2, (height / 2.0));
			roundedRectShape.arc(0, -0.2, 0.2, Math.PI / 2.0, 2.0 * Math.PI, true);
			roundedRectShape.lineTo((width / 2.0), (-height / 2.0) + 0.2);
			roundedRectShape.arc(-0.2, 0, 0.2, 2.0 * Math.PI, 3.0 * Math.PI / 2.0, true);
			roundedRectShape.lineTo((-width / 2.0) + 0.2, (-height / 2.0));
			roundedRectShape.arc(0, 0.2, 0.2, 3.0 * Math.PI / 2.0, Math.PI, true);
			roundedRectShape.lineTo((-width / 2.0), (height / 2.0) - 0.2);
			roundedRectShape.arc(0.2, 0, 0.2, Math.PI, Math.PI / 2.0, true);
			geometry = new THREE.ShapeGeometry(roundedRectShape);
			geometry.name = 'ht_image_popup_geometry';
			geometry.computeBoundingBox();
			var min = geometry.boundingBox.min;
			var max = geometry.boundingBox.max;
			var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
			var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
			var vertexPositions = geometry.getAttribute('position');
			var vertexUVs = geometry.getAttribute('uv');
			for (var i = 0; i < vertexPositions.count; i++) {
				var v1 = vertexPositions.getX(i);
				var	v2 = vertexPositions.getY(i);
				vertexUVs.setX(i, (v1 + offset.x) / range.x);
				vertexUVs.setY(i, (v2 + offset.y) / range.y);
			}
			geometry.uvsNeedUpdate = true;
			img.geometry = geometry;
			} else {
				currentWidth = parentWidth;
				currentHeight = parentWidth / aspectRatioImg;
			width = currentWidth / 100.0;
			height = currentHeight / 100.0;
			roundedRectShape = new THREE.Shape();
			roundedRectShape.moveTo((-width / 2.0) + 0.2, (height / 2.0));
			roundedRectShape.lineTo((width / 2.0) - 0.2, (height / 2.0));
			roundedRectShape.arc(0, -0.2, 0.2, Math.PI / 2.0, 2.0 * Math.PI, true);
			roundedRectShape.lineTo((width / 2.0), (-height / 2.0) + 0.2);
			roundedRectShape.arc(-0.2, 0, 0.2, 2.0 * Math.PI, 3.0 * Math.PI / 2.0, true);
			roundedRectShape.lineTo((-width / 2.0) + 0.2, (-height / 2.0));
			roundedRectShape.arc(0, 0.2, 0.2, 3.0 * Math.PI / 2.0, Math.PI, true);
			roundedRectShape.lineTo((-width / 2.0), (height / 2.0) - 0.2);
			roundedRectShape.arc(0.2, 0, 0.2, Math.PI, Math.PI / 2.0, true);
			geometry = new THREE.ShapeGeometry(roundedRectShape);
			geometry.name = 'ht_image_popup_geometry';
			geometry.computeBoundingBox();
			var min = geometry.boundingBox.min;
			var max = geometry.boundingBox.max;
			var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
			var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
			var vertexPositions = geometry.getAttribute('position');
			var vertexUVs = geometry.getAttribute('uv');
			for (var i = 0; i < vertexPositions.count; i++) {
				var v1 = vertexPositions.getX(i);
				var	v2 = vertexPositions.getY(i);
				vertexUVs.setX(i, (v1 + offset.x) / range.x);
				vertexUVs.setY(i, (v2 + offset.y) / range.y);
			}
			geometry.uvsNeedUpdate = true;
			img.geometry = geometry;
			};
		}
		me._ht_image_popup_bg.add(me._ht_image_popup);
		geometry = new THREE.PlaneGeometry(0.4, 0.4, 5, 5 );
		geometry.name = 'ht_image_popup_close_geometry';
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAABJElEQVR4nO3bSw6DMBAEUSs341icfrLJSJGFAeNfY9c7QU9JiJVDAAAAAAAAAADgdcxsM7Nt9I4U6X2/cW4fvSdmZvvfPr2IUUCpiFE8zYAhHA4dHlFx0ymlwUpbsigMV9hQZOQBr4/nRhwyTTzX86Dp4rkeh00bz7U8cPp4rsWhy8RzNQ9eLp6rcfiy8VxJgOXjuSchiBfJCUK8hDthiHfhLBDxbjoKRbxMB8GIlysRUTLeZ/QAVMYnXICfSIGzUES8cCcQERNywhAx8iQIEX9KQiwfsUaAZSPWPHy5iC0OXiZiy0Onj9jjwGkj9jxsuogjDpom4shDXh9R4QCFDY8oDVfacoviYMVNh4xnDmWMhzblTPkpVdDfBwAAAAAAAABA2hcaGfeSY++bsA'+
	'AAAABJRU5ErkJggg==');
		texture.colorSpace = player.getVRTextureColorSpace();
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'ht_image_popup_close_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.materialNormal = material;
		el.translateX(2.85);
		el.translateY(2.05);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 40;
		el.userData.height = 40;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_image_popup_close';
		el.userData.x = 2.85;
		el.userData.y = 2.05;
		el.userData.hanchor = 2;
		el.userData.vanchor = 0;
		el.translateZ(0.040);
		el.renderOrder = 4;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_image_popup_close.material) me._ht_image_popup_close.material.opacity = v;
			me._ht_image_popup_close.visible = (v>0 && me._ht_image_popup_close.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._ht_image_popup_close.visible
			let parentEl = me._ht_image_popup_close.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_image_popup_close.userData.opacity = v;
			v = v * me._ht_image_popup_close.userData.parentOpacity;
			me._ht_image_popup_close.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_image_popup_close.children.length; i++) {
				let child = me._ht_image_popup_close.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_image_popup_close.userData.parentOpacity = v;
			v = v * me._ht_image_popup_close.userData.opacity
			me._ht_image_popup_close.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_image_popup_close.children.length; i++) {
				let child = me._ht_image_popup_close.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_image_popup_close = el;
		textureOver = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAABoUlEQVR4nO3by23CQBRA0UsKASSaYEu6ggKgK7J1E0iEQiArI5GE/N58XsQ9Sxb2zE3A4BmDJEmSJEmSJEn/zuw4rGbHYdV7HPfUGN9TqQPNjsPqcmZ/ObOfHoZ1qeOWMj0M63F8JSMWC3hjwjZTxOlhWDNhW+PYxQK+zpcvXNhcX0gS8UO8C5vX+fKl1PEnpQ40+mzAp8VyV/o8WcZSPCDkiNhqDFUCQt+ILc9dLSD0idj6nFUDQtsJ9fiDVQ8IbSbW6yOjSUCoO8Gen7fNAkKdifa+4jcNCGUn3DsedAgIZSaeIR50CgixAFniQceA8LcQmeJB54DwuyDZ4kGCgPCzMBnjQZKA8HWgrPEgUUD4PBRA1niQLCB8c/c4WTxIGBDuREwYD2qtiTyQdP'+
	'+BvoUDvIgE+DUmwC/SAf6UC/BmQoC3swK8oRrgLf0AF5UCXNYMcGE9wK0dAW4uCnB7W0DvK2PLMbjFN6howEzxRrXHVCzg+JzI9YUE8UbvI06eeC61U7/OmkiieACnxXJ38whGVo/4qJckSZIkSZIkSW28AdO331t58jXnAAAAAElFTkSuQmCC');
		textureOver.colorSpace = player.getVRTextureColorSpace();
		el.userData.materialOver = new THREE.MeshBasicMaterial( {map: textureOver, side: THREE.DoubleSide, transparent: true} );
		el.userData.materialOver.name = 'ht_image_popup_close_materialOver';
		el.userData.ggId="ht_image_popup_close";
		me._ht_image_popup_close.userData.onclick=function (e) {
			player.setVariableValue('open_image_hs', player.getVariableValue('open_image_hs').replace("<"+me.hotspot.id+">", ''));
		}
		me._ht_image_popup_close.userData.onmouseenter=function (e) {
			me._ht_image_popup_close.material = me._ht_image_popup_close.userData.materialOver;
			me.elementMouseOver['ht_image_popup_close']=true;
		}
		me._ht_image_popup_close.userData.onmouseleave=function (e) {
			me._ht_image_popup_close.material = me._ht_image_popup_close.userData.materialNormal;
			me.elementMouseOver['ht_image_popup_close']=false;
		}
		me._ht_image_popup_close.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_image_popup_bg.add(me._ht_image_popup_close);
		me._ht_image.add(me._ht_image_popup_bg);
		el = new THREE.Group();
		el.userData.backgroundColorAlpha = 1;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_image_customimage.userData.ggSubElement) {
				me._ht_image_customimage.userData.ggSubElement.material.opacity = v
				me._ht_image_customimage.userData.ggSubElement.visible = (v>0 && me._ht_image_customimage.userData.visible);
			}
			me._ht_image_customimage.visible = (v>0 && me._ht_image_customimage.userData.visible);
		}
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 50;
		el.userData.height = 50;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_image_CustomImage';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_image_customimage.visible
			let parentEl = me._ht_image_customimage.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_image_customimage.userData.opacity = v;
			v = v * me._ht_image_customimage.userData.parentOpacity;
			me._ht_image_customimage.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_image_customimage.children.length; i++) {
				let child = me._ht_image_customimage.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_image_customimage.userData.parentOpacity = v;
			v = v * me._ht_image_customimage.userData.opacity
			me._ht_image_customimage.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_image_customimage.children.length; i++) {
				let child = me._ht_image_customimage.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_image_customimage = el;
		currentWidth = 50;
		currentHeight = 50;
		var img = {};
		img.geometry = new THREE.PlaneGeometry(currentWidth / 100.0, currentHeight / 100.0, 5, 5 );
		img.geometry.name = 'ht_image_CustomImage_imgGeometry';
		loader = new THREE.TextureLoader();
		el.userData.ggSetUrl = function(extUrl) {
			loader.load(extUrl,
				function (texture) {
				texture.colorSpace = player.getVRTextureColorSpace();
				var loadedMaterial = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
				loadedMaterial.name = 'ht_image_CustomImage_subElementMaterial';
				me._ht_image_customimage.userData.ggSubElement.material = loadedMaterial;
				me._ht_image_customimage.userData.ggUpdatePosition();
				me._ht_image_customimage.userData.ggText = extUrl;
				me._ht_image_customimage.userData.setOpacity(me._ht_image_customimage.userData.opacity);
			});
		};
		if ((hotspot) && (hotspot.customimage)) {
			var extUrl=hotspot.customimage;
		}
		el.userData.ggSetUrl(extUrl);
		material = new THREE.MeshBasicMaterial( {color: 0xffffff, side: THREE.DoubleSide, transparent: true } );
		material.name = 'ht_image_CustomImage_subElementMaterial';
		el.userData.ggSubElement = new THREE.Mesh( img.geometry, material );
		el.userData.ggSubElement.name = 'ht_image_CustomImage_subElement';
		el.userData.ggSubElement.position.z = el.position.z + 0.005;
		el.add(el.userData.ggSubElement);
		el.userData.clientWidth = 50;
		el.userData.clientHeight = 50;
		el.userData.ggId="ht_image_CustomImage";
		me._ht_image_customimage.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage == "")) || 
				(((player.getVariableValue('open_image_hs') !== null) && (player.getVariableValue('open_image_hs')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_image_customimage.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_image_customimage.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._ht_image_customimage.ggCurrentLogicStateVisible == 0) {
			me._ht_image_customimage.visible=false;
			me._ht_image_customimage.userData.visible=false;
				}
				else {
			me._ht_image_customimage.visible=((!me._ht_image_customimage.material && Number(me._ht_image_customimage.userData.opacity>0)) || Number(me._ht_image_customimage.material.opacity)>0)?true:false;
			me._ht_image_customimage.userData.visible=true;
				}
			}
		}
		me._ht_image_customimage.logicBlock_visible();
		me._ht_image_customimage.userData.onclick=function (e) {
			player.setVariableValue('open_image_hs', player.getVariableValue('open_image_hs') + "<"+me.hotspot.id+">");
		}
		me._ht_image_customimage.userData.ggUpdatePosition=function (useTransition) {
			var parentWidth = me._ht_image_customimage.userData.clientWidth;
			var parentHeight = me._ht_image_customimage.userData.clientHeight;
			var img = me._ht_image_customimage.userData.ggSubElement;
			var imgWidth = img.material.map.image.naturalWidth;
			var imgHeight = img.material.map.image.naturalHeight;
			var aspectRatioDiv = parentWidth / parentHeight;
			var aspectRatioImg = imgWidth / imgHeight;
			if (imgWidth < parentWidth) parentWidth = imgWidth;
			if (imgHeight < parentHeight) parentHeight = imgHeight;
			var currentWidth, currentHeight;
			img.geometry.dispose();
			if ((hotspot) && (hotspot.customimage)) {
				currentWidth  = hotspot.customimagewidth;
				currentHeight = hotspot.customimageheight;
			img.geometry = new THREE.PlaneGeometry(currentWidth / 100.0, currentHeight / 100.0, 5, 5 );
			img.geometry.name = 'ht_image_CustomImage_imgGeometry';
			}
		}
		me._ht_image.add(me._ht_image_customimage);
		me._ht_image.userData.setOpacity(1.00);
		me.elementMouseOver['ht_image']=false;
		me._ht_image_bg.logicBlock_scaling();
		me._ht_image_bg.logicBlock_visible();
		me._ht_image_bg.logicBlock_alpha();
		me._ht_image_bg.userData.setOpacity(1.00);
		me.elementMouseOver['ht_image_bg']=false;
		me._ht_image_icon.userData.setOpacity(1.00);
		me._ht_image_title.logicBlock_alpha();
		me._ht_image_title.userData.setOpacity(0.00);
		me._ht_image_popup_bg.logicBlock_scaling();
		me._ht_image_popup_bg.logicBlock_alpha();
		me._ht_image_popup_bg.userData.setOpacity(0.00);
		me._ht_image_popup.userData.setOpacity(1.00);
		me._ht_image_popup_close.userData.setOpacity(1.00);
		me.elementMouseOver['ht_image_popup_close']=false;
		me._ht_image_customimage.logicBlock_visible();
		me._ht_image_customimage.userData.setOpacity(1.00);
			me.ggEvent_activehotspotchanged=function() {
				me._ht_image_bg.logicBlock_visible();
				me._ht_image_customimage.logicBlock_visible();
			};
			me.ggEvent_changenode=function() {
				me._ht_image_bg.logicBlock_visible();
				me._ht_image_bg.logicBlock_alpha();
					me._ht_image_title.userData.ggUpdateText();
				me._ht_image_popup_bg.logicBlock_scaling();
				me._ht_image_popup_bg.logicBlock_alpha();
				me._ht_image_customimage.logicBlock_visible();
			};
			me.ggEvent_configloaded=function() {
				me._ht_image_bg.logicBlock_visible();
				me._ht_image_bg.logicBlock_alpha();
				me._ht_image_popup_bg.logicBlock_scaling();
				me._ht_image_popup_bg.logicBlock_alpha();
				me._ht_image_customimage.logicBlock_visible();
			};
			me.ggEvent_varchanged_open_image_hs=function() {
				me._ht_image_bg.logicBlock_alpha();
				me._ht_image_popup_bg.logicBlock_scaling();
				me._ht_image_popup_bg.logicBlock_alpha();
				me._ht_image_customimage.logicBlock_visible();
			};
			me.__obj = me._ht_image;
			me.__obj.userData.hotspot = hotspot;
			me.__obj.userData.fromSkin = true;
	};
	function SkinHotspotClass_ht_node(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.ggUserdata.nodeId=nodeId;
		me.elementMouseDown={};
		me.elementMouseOver={};
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el = new THREE.Group();
		el.userData.setOpacityInternal = function(v) {};
		el.name = 'ht_node';
		el.userData.x = -3.06;
		el.userData.y = 2.11;
		el.userData.hanchor = 0;
		el.userData.vanchor = 0;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_node.visible
			let parentEl = me._ht_node.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_node.userData.opacity = v;
			v = v * me._ht_node.userData.parentOpacity;
			me._ht_node.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_node.children.length; i++) {
				let child = me._ht_node.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_node.userData.parentOpacity = v;
			v = v * me._ht_node.userData.opacity
			me._ht_node.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_node.children.length; i++) {
				let child = me._ht_node.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_node = el;
		el.userData.ggId="ht_node";
		el.userData.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.userData.ggElementNodeId)) {
					return this.parentNode.userData.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_node.userData.onclick=function (e) {
			player.openNext(player._(me.hotspot.url),player._(me.hotspot.target));
			player.triggerEvent('hsproxyclick', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_node.userData.ondblclick=function (e) {
			player.triggerEvent('hsproxydblclick', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_node.userData.onmouseenter=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_node']=true;
			player.triggerEvent('hsproxyover', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_node.userData.onmouseleave=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_node']=false;
			player.triggerEvent('hsproxyout', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_node.userData.ggUpdatePosition=function (useTransition) {
		}
		width = 0.45;
		height = 0.45;
		roundedRectShape = new THREE.Shape();
		roundedRectShape.moveTo((-width / 2.0) + 0.12, (height / 2.0));
		roundedRectShape.lineTo((width / 2.0) - 0.12, (height / 2.0));
		roundedRectShape.arc(0, -0.12, 0.12, Math.PI / 2.0, 2.0 * Math.PI, true);
		roundedRectShape.lineTo((width / 2.0), (-height / 2.0) + 0.12);
		roundedRectShape.arc(-0.12, 0, 0.12, 2.0 * Math.PI, 3.0 * Math.PI / 2.0, true);
		roundedRectShape.lineTo((-width / 2.0) + 0.12, (-height / 2.0));
		roundedRectShape.arc(0, 0.12, 0.12, 3.0 * Math.PI / 2.0, Math.PI, true);
		roundedRectShape.lineTo((-width / 2.0), (height / 2.0) - 0.12);
		roundedRectShape.arc(0.12, 0, 0.12, Math.PI, Math.PI / 2.0, true);
		geometry = new THREE.ShapeGeometry(roundedRectShape);
		geometry.name = 'ht_node_bg_geometry';
		geometry.computeBoundingBox();
		var min = geometry.boundingBox.min;
		var max = geometry.boundingBox.max;
		var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
		var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
		var vertexPositions = geometry.getAttribute('position');
		var vertexUVs = geometry.getAttribute('uv');
		for (var i = 0; i < vertexPositions.count; i++) {
			var v1 = vertexPositions.getX(i);
			var	v2 = vertexPositions.getY(i);
			vertexUVs.setX(i, (v1 + offset.x) / range.x);
			vertexUVs.setY(i, (v2 + offset.y) / range.y);
		}
		geometry.uvsNeedUpdate = true;
		material = new THREE.MeshBasicMaterial( { color: new THREE.Color(0.290196, 0.290196, 0.290196).convertSRGBToLinear(), side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'ht_node_bg_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 0.588235;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._ht_node_bg.material.opacity = v * me._ht_node_bg.userData.backgroundColorAlpha;
			if (me._ht_node_bg.userData.ggSubElement) {
				me._ht_node_bg.userData.ggSubElement.material.opacity = v
				me._ht_node_bg.userData.ggSubElement.visible = (v>0 && me._ht_node_bg.userData.visible);
			}
			me._ht_node_bg.visible = (v>0 && me._ht_node_bg.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._ht_node_bg.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_node_bg.userData.backgroundColorAlpha = v;
			me._ht_node_bg.userData.setOpacity(me._ht_node_bg.userData.opacity);
		}
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 45;
		el.userData.height = 45;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_node_bg';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.010);
		el.renderOrder = 1;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_node_bg.visible
			let parentEl = me._ht_node_bg.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_node_bg.userData.opacity = v;
			v = v * me._ht_node_bg.userData.parentOpacity;
			me._ht_node_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_node_bg.children.length; i++) {
				let child = me._ht_node_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_node_bg.userData.parentOpacity = v;
			v = v * me._ht_node_bg.userData.opacity
			me._ht_node_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_node_bg.children.length; i++) {
				let child = me._ht_node_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = false;
		el.userData.visible = false;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_node_bg = el;
		el.userData.ggId="ht_node_bg";
		me._ht_node_bg.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage == ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_node_bg.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_node_bg.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._ht_node_bg.ggCurrentLogicStateVisible == 0) {
			me._ht_node_bg.visible=((!me._ht_node_bg.material && Number(me._ht_node_bg.userData.opacity>0)) || Number(me._ht_node_bg.material.opacity)>0)?true:false;
			me._ht_node_bg.userData.visible=true;
				}
				else {
			me._ht_node_bg.visible=false;
			me._ht_node_bg.userData.visible=false;
				}
			}
		}
		me._ht_node_bg.logicBlock_visible();
		me._ht_node_bg.userData.onmouseenter=function (e) {
			me.elementMouseOver['ht_node_bg']=true;
			me._ht_node_image.logicBlock_alpha();
			me._ht_node_image.logicBlock_scaling();
		}
		me._ht_node_bg.userData.onmouseleave=function (e) {
			me.elementMouseOver['ht_node_bg']=false;
			me._ht_node_image.logicBlock_alpha();
			me._ht_node_image.logicBlock_scaling();
		}
		me._ht_node_bg.userData.ggUpdatePosition=function (useTransition) {
		}
		geometry = new THREE.PlaneGeometry(0.36, 0.36, 5, 5 );
		geometry.name = 'ht_node_icon_geometry';
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,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');
		texture.colorSpace = player.getVRTextureColorSpace();
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'ht_node_icon_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.materialNormal = material;
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 36;
		el.userData.height = 36;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_node_icon';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.020);
		el.renderOrder = 2;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_node_icon.material) me._ht_node_icon.material.opacity = v;
			me._ht_node_icon.visible = (v>0 && me._ht_node_icon.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._ht_node_icon.visible
			let parentEl = me._ht_node_icon.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_node_icon.userData.opacity = v;
			v = v * me._ht_node_icon.userData.parentOpacity;
			me._ht_node_icon.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_node_icon.children.length; i++) {
				let child = me._ht_node_icon.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_node_icon.userData.parentOpacity = v;
			v = v * me._ht_node_icon.userData.opacity
			me._ht_node_icon.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_node_icon.children.length; i++) {
				let child = me._ht_node_icon.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_node_icon = el;
		el.userData.ggId="ht_node_icon";
		me._ht_node_icon.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_node_bg.add(me._ht_node_icon);
		width = 1.5;
		height = 1.5;
		roundedRectShape = new THREE.Shape();
		roundedRectShape.moveTo((-width / 2.0) + 0.2, (height / 2.0));
		roundedRectShape.lineTo((width / 2.0) - 0.2, (height / 2.0));
		roundedRectShape.arc(0, -0.2, 0.2, Math.PI / 2.0, 2.0 * Math.PI, true);
		roundedRectShape.lineTo((width / 2.0), (-height / 2.0) + 0.2);
		roundedRectShape.arc(-0.2, 0, 0.2, 2.0 * Math.PI, 3.0 * Math.PI / 2.0, true);
		roundedRectShape.lineTo((-width / 2.0) + 0.2, (-height / 2.0));
		roundedRectShape.arc(0, 0.2, 0.2, 3.0 * Math.PI / 2.0, Math.PI, true);
		roundedRectShape.lineTo((-width / 2.0), (height / 2.0) - 0.2);
		roundedRectShape.arc(0.2, 0, 0.2, Math.PI, Math.PI / 2.0, true);
		geometry = new THREE.ShapeGeometry(roundedRectShape);
		geometry.name = 'ht_node_image_geometry';
		geometry.computeBoundingBox();
		var min = geometry.boundingBox.min;
		var max = geometry.boundingBox.max;
		var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
		var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
		var vertexPositions = geometry.getAttribute('position');
		var vertexUVs = geometry.getAttribute('uv');
		for (var i = 0; i < vertexPositions.count; i++) {
			var v1 = vertexPositions.getX(i);
			var	v2 = vertexPositions.getY(i);
			vertexUVs.setX(i, (v1 + offset.x) / range.x);
			vertexUVs.setY(i, (v2 + offset.y) / range.y);
		}
		geometry.uvsNeedUpdate = true;
		loader = new THREE.TextureLoader();
		el.userData.ggNodeId=nodeId;
		texture = loader.load(basePath + 'images_vr/ht_node_image_' + nodeId + '.webp');
		texture.colorSpace = player.getVRTextureColorSpace();
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'ht_node_image_material';
		el = new THREE.Mesh( geometry, material );
		el.translateX(0);
		el.translateY(0);
		el.scale.set(0.30, 0.30, 1.0);
		el.userData.width = 150;
		el.userData.height = 150;
		el.userData.scale = {x: 0.30, y: 0.30, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_node_image';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_node_image.material) me._ht_node_image.material.opacity = v;
			me._ht_node_image.visible = (v>0 && me._ht_node_image.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._ht_node_image.visible
			let parentEl = me._ht_node_image.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_node_image.userData.opacity = v;
			v = v * me._ht_node_image.userData.parentOpacity;
			me._ht_node_image.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_node_image.children.length; i++) {
				let child = me._ht_node_image.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_node_image.userData.parentOpacity = v;
			v = v * me._ht_node_image.userData.opacity
			me._ht_node_image.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_node_image.children.length; i++) {
				let child = me._ht_node_image.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 0.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_node_image = el;
		el.userData.ggId="ht_node_image";
		me._ht_node_image.userData.ggIsActive=function() {
			return player.getCurrentNode()==this.userData.ggElementNodeId();
		}
		el.userData.ggElementNodeId=function() {
			return this.userData.ggNodeId;
		}
		me._ht_node_image.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((me.elementMouseOver['ht_node_bg'] == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._ht_node_image.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._ht_node_image.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._ht_node_image.ggCurrentLogicStateScaling == 0) {
					me._ht_node_image.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._ht_node_image.userData.transitions.length; i++) {
						if (me._ht_node_image.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_node_image.userData.transitions[i].interval);
							me._ht_node_image.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._ht_node_image.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_node_image.scale.set(transition_scale.startScale.x + (me._ht_node_image.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_node_image.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_node_image.position.x = (me._ht_node_image.position.x - me._ht_node_image.userData.curScaleOffX) + scaleOffX;
						me._ht_node_image.userData.curScaleOffX = scaleOffX;
						me._ht_node_image.position.y = (me._ht_node_image.position.y - me._ht_node_image.userData.curScaleOffY) + scaleOffY;
						me._ht_node_image.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_node_image.userData.transitions.splice(me._ht_node_image.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_node_image.userData.transitions.push(transition_scale);
				}
				else {
					me._ht_node_image.userData.transitionValue_scale = {x: 0.3, y: 0.3, z: 1.0};
					for (var i = 0; i < me._ht_node_image.userData.transitions.length; i++) {
						if (me._ht_node_image.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_node_image.userData.transitions[i].interval);
							me._ht_node_image.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._ht_node_image.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_node_image.scale.set(transition_scale.startScale.x + (me._ht_node_image.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_node_image.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_node_image.position.x = (me._ht_node_image.position.x - me._ht_node_image.userData.curScaleOffX) + scaleOffX;
						me._ht_node_image.userData.curScaleOffX = scaleOffX;
						me._ht_node_image.position.y = (me._ht_node_image.position.y - me._ht_node_image.userData.curScaleOffY) + scaleOffY;
						me._ht_node_image.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_node_image.userData.transitions.splice(me._ht_node_image.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_node_image.userData.transitions.push(transition_scale);
				}
			}
		}
		me._ht_node_image.logicBlock_scaling();
		me._ht_node_image.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['ht_node_bg'] == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._ht_node_image.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._ht_node_image.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				if (me._ht_node_image.ggCurrentLogicStateAlpha == 0) {
					me._ht_node_image.userData.transitionValue_alpha = 1;
					for (var i = 0; i < me._ht_node_image.userData.transitions.length; i++) {
						if (me._ht_node_image.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_node_image.userData.transitions[i].interval);
							me._ht_node_image.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_node_image.material ? me._ht_node_image.material.opacity : me._ht_node_image.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_node_image.userData.setOpacity(transition_alpha.startAlpha + (me._ht_node_image.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_node_image.userData.transitions.splice(me._ht_node_image.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_node_image.userData.transitions.push(transition_alpha);
				}
				else {
					me._ht_node_image.userData.transitionValue_alpha = 0;
					for (var i = 0; i < me._ht_node_image.userData.transitions.length; i++) {
						if (me._ht_node_image.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_node_image.userData.transitions[i].interval);
							me._ht_node_image.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_node_image.material ? me._ht_node_image.material.opacity : me._ht_node_image.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_node_image.userData.setOpacity(transition_alpha.startAlpha + (me._ht_node_image.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_node_image.userData.transitions.splice(me._ht_node_image.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_node_image.userData.transitions.push(transition_alpha);
				}
			}
		}
		me._ht_node_image.logicBlock_alpha();
		me._ht_node_image.userData.onclick=function (e) {
			player.openNext(player._(me.hotspot.url),player._(me.hotspot.target));
		}
		me._ht_node_image.userData.ggUpdatePosition=function (useTransition) {
		}
		width = 1.5;
		height = 0.51;
		roundedRectShape = new THREE.Shape();
		roundedRectShape.moveTo((-width / 2.0) + 0, (height / 2.0));
		roundedRectShape.lineTo((width / 2.0) - 0, (height / 2.0));
		roundedRectShape.lineTo((width / 2.0), (-height / 2.0) + 0.2);
		roundedRectShape.arc(-0.2, 0, 0.2, 2.0 * Math.PI, 3.0 * Math.PI / 2.0, true);
		roundedRectShape.lineTo((-width / 2.0) + 0.2, (-height / 2.0));
		roundedRectShape.arc(0, 0.2, 0.2, 3.0 * Math.PI / 2.0, Math.PI, true);
		roundedRectShape.lineTo((-width / 2.0), (height / 2.0) - 0);
		geometry = new THREE.ShapeGeometry(roundedRectShape);
		geometry.name = 'ht_node_title_geometry';
		geometry.computeBoundingBox();
		var min = geometry.boundingBox.min;
		var max = geometry.boundingBox.max;
		var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
		var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
		var vertexPositions = geometry.getAttribute('position');
		var vertexUVs = geometry.getAttribute('uv');
		for (var i = 0; i < vertexPositions.count; i++) {
			var v1 = vertexPositions.getX(i);
			var	v2 = vertexPositions.getY(i);
			vertexUVs.setX(i, (v1 + offset.x) / range.x);
			vertexUVs.setY(i, (v2 + offset.y) / range.y);
		}
		geometry.uvsNeedUpdate = true;
		material = new THREE.MeshBasicMaterial( {side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'ht_node_title_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 0.666667;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._ht_node_title.material.opacity = v;
			if (me._ht_node_title.userData.hasScrollbar) {
				me._ht_node_title.userData.scrollbar.material.opacity = v;
				me._ht_node_title.userData.scrollbarBg.material.opacity = v;
			}
			if (me._ht_node_title.userData.ggSubElement) {
				me._ht_node_title.userData.ggSubElement.material.opacity = v
				me._ht_node_title.userData.ggSubElement.visible = (v>0 && me._ht_node_title.userData.visible);
			}
			me._ht_node_title.visible = (v>0 && me._ht_node_title.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._ht_node_title.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_node_title.userData.backgroundColorAlpha = v;
			me._ht_node_title.userData.setOpacity(me._ht_node_title.userData.opacity);
		}
		el.translateX(0);
		el.translateY(-0.495);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 150;
		el.userData.height = 51;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_node_title';
		el.userData.x = 0;
		el.userData.y = -0.495;
		el.userData.hanchor = 1;
		el.userData.vanchor = 2;
		el.translateZ(0.040);
		el.renderOrder = 4;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_node_title.visible
			let parentEl = me._ht_node_title.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_node_title.userData.opacity = v;
			v = v * me._ht_node_title.userData.parentOpacity;
			me._ht_node_title.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_node_title.children.length; i++) {
				let child = me._ht_node_title.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_node_title.userData.parentOpacity = v;
			v = v * me._ht_node_title.userData.opacity
			me._ht_node_title.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_node_title.children.length; i++) {
				let child = me._ht_node_title.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_node_title = el;
		el.userData.textLines = [];
		el.userData.backgroundColor = new THREE.Color(0, 0, 0).convertSRGBToLinear();
		el.userData.textColor = new THREE.Color(0.117647, 0.870588, 0.784314).convertSRGBToLinear();
		el.userData.textColorAlpha = 1;
		var canvas = document.createElement('canvas');
		canvas.width = 300;
		canvas.height = 102;
		el.userData.textCanvas = canvas;
		el.userData.textCanvasContext = canvas.getContext('2d');
		el.userData.ggStripTags = function(text) {
			let doc = new DOMParser().parseFromString(text, 'text/html');
			return doc.body.textContent || '';
		}
		el.userData.ggWrapText = function(scrollbar) {
			me._ht_node_title.userData.totalHeightCanv = 2 * (18);
			me._ht_node_title.userData.textLines = [];
			var ctx = me._ht_node_title.userData.textCanvasContext;
			var words = [];
			let tmpText = String(me._ht_node_title.userData.ggText);
			let whiteSpaceIndex = -1;
			do {
				whiteSpaceIndex = tmpText.search(/[\s]/);
				if (whiteSpaceIndex != -1) {
					words.push(tmpText.substr(0, whiteSpaceIndex));
					tmpText = tmpText.substr(whiteSpaceIndex);
					if (tmpText.charAt(0) == '\n') {
						words.push('\n');
					}
					tmpText = tmpText.substr(1);
				} else {
					words.push(tmpText);
				}
			} while (whiteSpaceIndex != -1);
			var line = '';
			for (var i = 0; i < words.length; i++) {
				if (words[i] == '\n') {
					me._ht_node_title.userData.textLines.push(line);
					line = '';
					me._ht_node_title.userData.totalHeightCanv += me._ht_node_title.userData.lineHeightCanv;
					continue;
				}
				var testLine;
				if (line == '') {
					testLine = words[i]
				} else {
					testLine = line + ' ' + words[i];
				}
				var metrics = ctx.measureText(testLine);
				var testWidth = metrics.width;
				if (testWidth > (2 * (me._ht_node_title.userData.width - 10 - (scrollbar ? 25 : 0))) && i > 0) {
					me._ht_node_title.userData.textLines.push(line);
					line = words[i];
					me._ht_node_title.userData.totalHeightCanv += me._ht_node_title.userData.lineHeightCanv;
				} else {
					line = testLine;
				}
			}
			me._ht_node_title.userData.textLines.push(line);
			me._ht_node_title.userData.totalHeightCanv += me._ht_node_title.userData.lineHeightCanv;
		}
		el.userData.ggPaintCanvasText = function() {
			var canv = me._ht_node_title.userData.textCanvas;
			var ctx = me._ht_node_title.userData.textCanvasContext;
			ctx.clearRect(0, 0, canv.width, canv.height);
			ctx.fillStyle = 'rgba(' + me._ht_node_title.userData.backgroundColor.r * 255 + ', ' + me._ht_node_title.userData.backgroundColor.g * 255 + ', ' + me._ht_node_title.userData.backgroundColor.b * 255 + ', ' + me._ht_node_title.userData.backgroundColorAlpha + ')';
			ctx.fillRect(0, 0, canv.width, canv.height);
			ctx.fillStyle = 'rgba(' + me._ht_node_title.userData.textColor.r * 255 + ', ' + me._ht_node_title.userData.textColor.g * 255 + ', ' + me._ht_node_title.userData.textColor.b * 255 + ', ' + me._ht_node_title.userData.textColorAlpha + ')';
			ctx.textBaseline = 'top';
			var x = (me._ht_node_title.userData.boxWidthCanv - (me._ht_node_title.userData.hasScrollbar ? 50 : 0)) / 2;
			ctx.textAlign = 'center';
			var y = 2 * 13;
			y += (canv.height - me._ht_node_title.userData.totalHeightCanv - (2 * 5)) / 2;
			for (var i = 0; i < me._ht_node_title.userData.textLines.length; i++) {
				ctx.fillText(me._ht_node_title.userData.textLines[i], x, y);
				y += me._ht_node_title.userData.lineHeightCanv;
			}
			var textTexture = new THREE.CanvasTexture(canv);
			textTexture.name = 'ht_node_title_texture';
			textTexture.minFilter = THREE.LinearFilter;
			textTexture.colorSpace = THREE.LinearSRGBColorSpace;
			textTexture.wrapS = THREE.ClampToEdgeWrapping;
			textTexture.wrapT = THREE.ClampToEdgeWrapping;
			if (me._ht_node_title.material.map) {
				me._ht_node_title.material.map.dispose();
			}
			me._ht_node_title.material.map = textTexture;
		}
		el.userData.ggRenderText = function() {
			for (let i = 0; i < me._ht_node_title.children.length; i++) {
				let child = me._ht_node_title.children[i];
				if (child.name.includes('scrollbar')) me._ht_node_title.remove(child);
			}
			var canv = me._ht_node_title.userData.textCanvas;
			var ctx = me._ht_node_title.userData.textCanvasContext;
			ctx.font = '40px Verdana';
			me._ht_node_title.userData.lineHeightCanv = 40 * 1.2;
			me._ht_node_title.userData.ggWrapText(false);
			me._ht_node_title.userData.boxWidthCanv = 2 * me._ht_node_title.userData.width;
			me._ht_node_title.userData.boxHeightCanv = 2 * me._ht_node_title.userData.height;
			me._ht_node_title.userData.hasScrollbar = false;
			canv.width = me._ht_node_title.userData.boxWidthCanv;
			canv.height = me._ht_node_title.userData.boxHeightCanv;
			ctx.font = '40px Verdana';
			me._ht_node_title.userData.ggPaintCanvasText();
		}
		me._ht_node_title.userData.ggUpdateText=function(force) {
			var params = [];
			params.push(player._(String(player._(me.hotspot.title))));
			var hs = player._("%1", params);
			if (hs!=this.ggText || force) {
				this.ggText=me._ht_node_title.userData.ggStripTags(hs);
				this.ggRenderText();
			}
		}
		me._ht_node_title.userData.ggUpdateText();
		el.userData.setBackgroundColor = function(v) {
			me._ht_node_title.userData.backgroundColor = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_node_title.userData.backgroundColorAlpha = v;
		}
		el.userData.setTextColor = function(v) {
			me._ht_node_title.userData.textColor = v;
		}
		el.userData.setTextColorAlpha = function(v) {
			me._ht_node_title.userData.textColorAlpha = v;
		}
		el.userData.ggId="ht_node_title";
		me._ht_node_title.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player._(me.hotspot.title) == ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_node_title.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_node_title.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._ht_node_title.ggCurrentLogicStateVisible == 0) {
			me._ht_node_title.visible=false;
			me._ht_node_title.userData.visible=false;
				}
				else {
			me._ht_node_title.visible=((!me._ht_node_title.material && Number(me._ht_node_title.userData.opacity>0)) || Number(me._ht_node_title.material.opacity)>0)?true:false;
			me._ht_node_title.userData.visible=true;
				}
			}
		}
		me._ht_node_title.logicBlock_visible();
		me._ht_node_title.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_node_image.add(me._ht_node_title);
		me._ht_node_bg.add(me._ht_node_image);
		me._ht_node.add(me._ht_node_bg);
		el = new THREE.Group();
		el.userData.backgroundColorAlpha = 1;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_node_customimage.userData.ggSubElement) {
				me._ht_node_customimage.userData.ggSubElement.material.opacity = v
				me._ht_node_customimage.userData.ggSubElement.visible = (v>0 && me._ht_node_customimage.userData.visible);
			}
			me._ht_node_customimage.visible = (v>0 && me._ht_node_customimage.userData.visible);
		}
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 50;
		el.userData.height = 50;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_node_CustomImage';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.020);
		el.renderOrder = 2;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_node_customimage.visible
			let parentEl = me._ht_node_customimage.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_node_customimage.userData.opacity = v;
			v = v * me._ht_node_customimage.userData.parentOpacity;
			me._ht_node_customimage.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_node_customimage.children.length; i++) {
				let child = me._ht_node_customimage.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_node_customimage.userData.parentOpacity = v;
			v = v * me._ht_node_customimage.userData.opacity
			me._ht_node_customimage.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_node_customimage.children.length; i++) {
				let child = me._ht_node_customimage.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_node_customimage = el;
		currentWidth = 50;
		currentHeight = 50;
		var img = {};
		img.geometry = new THREE.PlaneGeometry(currentWidth / 100.0, currentHeight / 100.0, 5, 5 );
		img.geometry.name = 'ht_node_CustomImage_imgGeometry';
		loader = new THREE.TextureLoader();
		el.userData.ggSetUrl = function(extUrl) {
			loader.load(extUrl,
				function (texture) {
				texture.colorSpace = player.getVRTextureColorSpace();
				var loadedMaterial = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
				loadedMaterial.name = 'ht_node_CustomImage_subElementMaterial';
				me._ht_node_customimage.userData.ggSubElement.material = loadedMaterial;
				me._ht_node_customimage.userData.ggUpdatePosition();
				me._ht_node_customimage.userData.ggText = extUrl;
				me._ht_node_customimage.userData.setOpacity(me._ht_node_customimage.userData.opacity);
			});
		};
		if ((hotspot) && (hotspot.customimage)) {
			var extUrl=hotspot.customimage;
		}
		el.userData.ggSetUrl(extUrl);
		material = new THREE.MeshBasicMaterial( {color: 0xffffff, side: THREE.DoubleSide, transparent: true } );
		material.name = 'ht_node_CustomImage_subElementMaterial';
		el.userData.ggSubElement = new THREE.Mesh( img.geometry, material );
		el.userData.ggSubElement.name = 'ht_node_CustomImage_subElement';
		el.userData.ggSubElement.position.z = el.position.z + 0.005;
		el.add(el.userData.ggSubElement);
		el.userData.clientWidth = 50;
		el.userData.clientHeight = 50;
		el.userData.ggId="ht_node_CustomImage";
		me._ht_node_customimage.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage == ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_node_customimage.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_node_customimage.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._ht_node_customimage.ggCurrentLogicStateVisible == 0) {
			me._ht_node_customimage.visible=false;
			me._ht_node_customimage.userData.visible=false;
				}
				else {
			me._ht_node_customimage.visible=((!me._ht_node_customimage.material && Number(me._ht_node_customimage.userData.opacity>0)) || Number(me._ht_node_customimage.material.opacity)>0)?true:false;
			me._ht_node_customimage.userData.visible=true;
				}
			}
		}
		me._ht_node_customimage.logicBlock_visible();
		me._ht_node_customimage.userData.ggUpdatePosition=function (useTransition) {
			var parentWidth = me._ht_node_customimage.userData.clientWidth;
			var parentHeight = me._ht_node_customimage.userData.clientHeight;
			var img = me._ht_node_customimage.userData.ggSubElement;
			var imgWidth = img.material.map.image.naturalWidth;
			var imgHeight = img.material.map.image.naturalHeight;
			var aspectRatioDiv = parentWidth / parentHeight;
			var aspectRatioImg = imgWidth / imgHeight;
			if (imgWidth < parentWidth) parentWidth = imgWidth;
			if (imgHeight < parentHeight) parentHeight = imgHeight;
			var currentWidth, currentHeight;
			img.geometry.dispose();
			if ((hotspot) && (hotspot.customimage)) {
				currentWidth  = hotspot.customimagewidth;
				currentHeight = hotspot.customimageheight;
			img.geometry = new THREE.PlaneGeometry(currentWidth / 100.0, currentHeight / 100.0, 5, 5 );
			img.geometry.name = 'ht_node_CustomImage_imgGeometry';
			}
		}
		me._ht_node.add(me._ht_node_customimage);
		me._ht_node.userData.setOpacity(1.00);
		me.elementMouseOver['ht_node']=false;
		me._ht_node_bg.logicBlock_visible();
		me._ht_node_bg.userData.setOpacity(1.00);
		me.elementMouseOver['ht_node_bg']=false;
		me._ht_node_icon.userData.setOpacity(1.00);
		me._ht_node_image.logicBlock_scaling();
		me._ht_node_image.logicBlock_alpha();
		me._ht_node_image.userData.setOpacity(0.00);
		me._ht_node_title.logicBlock_visible();
		me._ht_node_title.userData.setOpacity(1.00);
		me._ht_node_customimage.logicBlock_visible();
		me._ht_node_customimage.userData.setOpacity(1.00);
			me.ggEvent_activehotspotchanged=function() {
				me._ht_node_bg.logicBlock_visible();
				me._ht_node_title.logicBlock_visible();
				me._ht_node_customimage.logicBlock_visible();
			};
			me.ggEvent_changenode=function() {
				me._ht_node_bg.logicBlock_visible();
					me._ht_node_title.userData.ggUpdateText();
				me._ht_node_title.logicBlock_visible();
				me._ht_node_customimage.logicBlock_visible();
			};
			me.ggEvent_configloaded=function() {
				me._ht_node_bg.logicBlock_visible();
				me._ht_node_title.logicBlock_visible();
				me._ht_node_customimage.logicBlock_visible();
			};
			me.__obj = me._ht_node;
			me.__obj.userData.hotspot = hotspot;
			me.__obj.userData.fromSkin = true;
	};
	me.addSkinHotspot=function(hotspot) {
		var hsinst = null;
		if (hotspot.skinid=='ht_node') {
			hotspot.skinid = 'ht_node';
			hsinst = new SkinHotspotClass_ht_node(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
		} else
		if (hotspot.skinid=='ht_image') {
			hotspot.skinid = 'ht_image';
			hsinst = new SkinHotspotClass_ht_image(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
		} else
		if (hotspot.skinid=='ht_info') {
			hotspot.skinid = 'ht_info';
			hsinst = new SkinHotspotClass_ht_info(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
		} else
		if (hotspot.skinid=='ht_video_file') {
			hotspot.skinid = 'ht_video_file';
			hsinst = new SkinHotspotClass_ht_video_file(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
		} else
		if (hotspot.skinid=='ht_video_url') {
			hotspot.skinid = 'ht_video_url';
			hsinst = new SkinHotspotClass_ht_video_url(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
		}
		return (hsinst ? hsinst.__obj : null);
	}
	me.removeSkinHotspots=function() {
		hotspotTemplates = [];
	}
	me.skinTimerEvent=function() {
		if (!player.isInVR()) return;
		me.ggCurrentTime=new Date().getTime();
	};
	player.addListener('timer', me.skinTimerEvent);
	player.addListener('vrconfigloaded', function() { me.addSkin();if (me.eventconfigloadedCallback) me.eventconfigloadedCallback();if (me.eventchangenodeCallback) me.eventchangenodeCallback();});
	player.addListener('exitvr', function() { me.removeSkin(); });
	me.skinTimerEvent();
};