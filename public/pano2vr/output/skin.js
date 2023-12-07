// Garden Gnome Software - Skin
// Pano2VR 6.1.15/18116
// Filename: cs4web.ggsk
// Generated 2023-12-07T08:24:50

function pano2vrSkin(player,base) {
	player.addVariable('our_location', 0, "");
	player.addVariable('map_iframe', 0, "<iframe src=\"https:\/\/www.google.com\/maps\/embed?pb=!1m18!1m12!1m3!1d2740.555856096772!2d13.8427039763457!3d46.61577967111619!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477081db308a695d%3A0xd50a77356e5507e8!2sCS4Web%20OG!5e0!3m2!1sen!2ssk!4v1694545568025!5m2!1sen!2ssk\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"><\/iframe>");
	player.addVariable('settings_hotspots', 2, true);
	player.addVariable('settings_autorotate', 2, false);
	player.addVariable('settings_gyroscope', 2, false);
	player.addVariable('settings_sounds', 2, true);
	player.addVariable('opt_thumbnail_menu_tooltip', 2, true);
	player.addVariable('vis_thumbnail_menu', 2, false);
	player.addVariable('all_hotspots', 2, true);
	player.addVariable('hts_luftansicht', 2, true);
	player.addVariable('hts_bar', 2, true);
	player.addVariable('hts_streetview', 2, true);
	player.addVariable('hts_einkaufen', 2, true);
	player.addVariable('hts_optiker', 2, true);
	player.addVariable('hts_immobilien', 2, true);
	player.addVariable('hts_strandbad', 2, true);
	player.addVariable('hts_restaurant', 2, true);
	player.addVariable('hts_cafe', 2, true);
	player.addVariable('hts_hotel', 2, true);
	player.addVariable('hts_mode', 2, true);
	player.addVariable('hts_floristik', 2, true);
	player.addVariable('hts_businness', 2, true);
	player.addVariable('hts_freizeit', 2, true);
	player.addVariable('gallery', 0, "");
	player.addVariable('video', 0, "");
	player.addVariable('iframe', 0, "");
	var me=this;
	var skin=this;
	var flag=false;
	var hotspotTemplates={};
	var skinKeyPressed = 0;
	this.player=player;
	this.player.skinObj=this;
	this.divSkin=player.divSkin;
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
	this.elementMouseDown=[];
	this.elementMouseOver=[];
	var cssPrefix='';
	var domTransition='transition';
	var domTransform='transform';
	var prefixes='Webkit,Moz,O,ms,Ms'.split(',');
	var i;
	var hs,el,els,elo,ela,elHorScrollFg,elHorScrollBg,elVertScrollFg,elVertScrollBg,elCornerBg;
	if (typeof document.body.style['transform'] == 'undefined') {
		for(var i=0;i<prefixes.length;i++) {
			if (typeof document.body.style[prefixes[i] + 'Transform'] !== 'undefined') {
				cssPrefix='-' + prefixes[i].toLowerCase() + '-';
				domTransition=prefixes[i] + 'Transition';
				domTransform=prefixes[i] + 'Transform';
			}
		}
	}
	
	player.setMargins(0,0,0,0);
	
	this.updateSize=function(startElement) {
		var stack=[];
		stack.push(startElement);
		while(stack.length>0) {
			var e=stack.pop();
			if (e.ggUpdatePosition) {
				e.ggUpdatePosition();
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
	}
	
	this.callNodeChange=function(startElement) {
		var stack=[];
		stack.push(startElement);
		while(stack.length>0) {
			var e=stack.pop();
			if (e.ggNodeChange) {
				e.ggNodeChange();
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
	}
	player.addListener('changenode', function() { me.ggUserdata=player.userdata; me.callNodeChange(me.divSkin); });
	
	var parameterToTransform=function(p) {
		var hs='translate(' + p.rx + 'px,' + p.ry + 'px) rotate(' + p.a + 'deg) scale(' + p.sx + ',' + p.sy + ')';
		return hs;
	}
	
	this.findElements=function(id,regex) {
		var r=[];
		var stack=[];
		var pat=new RegExp(id,'');
		stack.push(me.divSkin);
		while(stack.length>0) {
			var e=stack.pop();
			if (regex) {
				if (pat.test(e.ggId)) r.push(e);
			} else {
				if (e.ggId==id) r.push(e);
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
		return r;
	}
	
	this.addSkin=function() {
		var hs='';
		this.ggCurrentTime=new Date().getTime();
		el=me._thumbnail_show_button_show=document.createElement('div');
		els=me._thumbnail_show_button_show__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIGhlaWdodD0iMzJweCIgd2lkdGg9IjMycHgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm'+
			'9yZy8yMDAwL3N2ZyIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMzIgMzIiIHhtbDpzcGFjZT0icHJlc2VydmUiIHk9IjBweCIgdmlld0JveD0iMCAwIDMyIDMyIiB2ZXJzaW9uPSIxLjEiPgogPGcgaWQ9IkxheWVyXzEiPgogIDxnIGlkPSJMYXllcl8xXzFfIi8+CiA8L2c+CiA8ZyBpZD0iRWJlbmVfMV8xXyI+CiAgPGc+CiAgIDxnIG9wYWNpdHk9IjAuNCI+CiAgICA8cGF0aCBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjEuNSIgZD0iTTE2LDMuNTAxQzkuMTA3LDMuNTAxLDMuNSw5LjEwOCwzLjUsMTZTOS4xMDcsMjguNDk5LDE2LDI4LjQ5OSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsm'+
			'I3g5O2M2Ljg5MywwLDEyLjQ5OS01LjYwNywxMi40OTktMTIuNDk5UzIyLjg5MywzLjUwMSwxNiwzLjUwMXogTTE2LDI2LjA3OWMtNS41NTgsMC0xMC4wOC00LjUyMS0xMC4wOC0xMC4wNzlTMTAuNDQyLDUuOTIsMTYsNS45MiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2M1LjU1NywwLDEwLjA4MSw0LjUyMiwxMC4wODEsMTAuMDhTMjEuNTU3LDI2LjA3OSwxNiwyNi4wNzl6IiBzdHJva2U9IiMzQzNDM0MiLz4KICAgIDxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZS13aWR0aD0iMS41IiBkPSJNMTEuMjcxLDEzLjUyMUg4Ljg3NWMtMC43MDcsMC0xLjI4LDAuNTczLTEuMjgsMS4yOHYyLjM5Ni'+
			'YjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MwLDAuNzA3LDAuNTczLDEuMjgsMS4yOCwxLjI4aDIuMzk2YzAuNzA3LDAsMS4yOC0wLjU3MywxLjI4LTEuMjh2LTIuMzk2QzEyLjU1MSwxNC4wOTUsMTEuOTc4LDEzLjUyMSwxMS4yNzEsMTMuNTIxeiIgc3Ryb2tlPSIjM0MzQzNDIi8+CiAgICA8cGF0aCBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjEuNSIgZD0iTTE3LjE1MiwxMy41MjFoLTIuMzk2Yy0wLjcwNywwLTEuMjgsMC41NzMtMS4yOCwxLjI4djIuMzk2JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7YzAsMC43MDcsMC41NzMsMS4yNzksMS4yOCwxLjI3OWgyLjM5NmMwLjcw'+
			'NywwLDEuMjc5LTAuNTcyLDEuMjc5LTEuMjc5di0yLjM5NkMxOC40MzIsMTQuMDk1LDE3Ljg1OSwxMy41MjEsMTcuMTUyLDEzLjUyMXoiIHN0cm9rZT0iIzNDM0MzQyIvPgogICAgPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxLjUiIGQ9Ik0yMy4wMzUsMTMuNTIxaC0yLjM5NmMtMC43MDcsMC0xLjI4MSwwLjU3My0xLjI4MSwxLjI4djIuMzk2JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7YzAsMC43MDcsMC41NzQsMS4yNzksMS4yODEsMS4yNzloMi4zOTZjMC43MDcsMCwxLjI4MS0wLjU3MiwxLjI4MS0xLjI3OXYtMi4zOTZDMjQuMzE2LDE0LjA5NSwyMy43NDIsMTMuNTIxLD'+
			'IzLjAzNSwxMy41MjF6IiBzdHJva2U9IiMzQzNDM0MiLz4KICAgPC9nPgogICA8Zz4KICAgIDxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0xNiwzLjUwMUM5LjEwNywzLjUwMSwzLjUsOS4xMDgsMy41LDE2UzkuMTA3LDI4LjQ5OSwxNiwyOC40OTljNi44OTMsMCwxMi40OTktNS42MDcsMTIuNDk5LTEyLjQ5OSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O1MyMi44OTMsMy41MDEsMTYsMy41MDF6IE0xNiwyNi4wNzljLTUuNTU4LDAtMTAuMDgtNC41MjEtMTAuMDgtMTAuMDc5UzEwLjQ0Miw1LjkyLDE2LDUuOTJjNS41NTcsMCwxMC4wODEsNC41MjIsMTAuMDgxLDEwLjA4JiN4ZDsmI3hhOyYj'+
			'eDk7JiN4OTsmI3g5OyYjeDk7UzIxLjU1NywyNi4wNzksMTYsMjYuMDc5eiIvPgogICAgPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTTExLjI3MSwxMy41MjFIOC44NzVjLTAuNzA3LDAtMS4yOCwwLjU3My0xLjI4LDEuMjh2Mi4zOTZjMCwwLjcwNywwLjU3MywxLjI4LDEuMjgsMS4yOGgyLjM5NiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MwLjcwNywwLDEuMjgtMC41NzMsMS4yOC0xLjI4di0yLjM5NkMxMi41NTEsMTQuMDk1LDExLjk3OCwxMy41MjEsMTEuMjcxLDEzLjUyMXoiLz4KICAgIDxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0xNy4xNTIsMTMuNTIxaC0yLjM5NmMtMC43MDcsMC'+
			'0xLjI4LDAuNTczLTEuMjgsMS4yOHYyLjM5NmMwLDAuNzA3LDAuNTczLDEuMjc5LDEuMjgsMS4yNzloMi4zOTYmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjMC43MDcsMCwxLjI3OS0wLjU3MiwxLjI3OS0xLjI3OXYtMi4zOTZDMTguNDMyLDE0LjA5NSwxNy44NTksMTMuNTIxLDE3LjE1MiwxMy41MjF6Ii8+CiAgICA8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNMjMuMDM1LDEzLjUyMWgtMi4zOTZjLTAuNzA3LDAtMS4yODEsMC41NzMtMS4yODEsMS4yOHYyLjM5NmMwLDAuNzA3LDAuNTc0LDEuMjc5LDEuMjgxLDEuMjc5aDIuMzk2JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7YzAu'+
			'NzA3LDAsMS4yODEtMC41NzIsMS4yODEtMS4yNzl2LTIuMzk2QzI0LjMxNiwxNC4wOTUsMjMuNzQyLDEzLjUyMSwyMy4wMzUsMTMuNTIxeiIvPgogICA8L2c+CiAgIDxnPgogICAgPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIwLjIiIGQ9Ik0xNiwzLjUwMUM5LjEwNywzLjUwMSwzLjUsOS4xMDgsMy41LDE2UzkuMTA3LDI4LjQ5OSwxNiwyOC40OTkmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjNi44OTMsMCwxMi40OTktNS42MDcsMTIuNDk5LTEyLjQ5OVMyMi44OTMsMy41MDEsMTYsMy41MDF6IE0xNiwyNi4wNzljLTUuNTU4LDAtMTAuMDgtNC41MjEtMTAuMDgtMTAuMDc5Uz'+
			'EwLjQ0Miw1LjkyLDE2LDUuOTImI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjNS41NTcsMCwxMC4wODEsNC41MjIsMTAuMDgxLDEwLjA4UzIxLjU1NywyNi4wNzksMTYsMjYuMDc5eiIgc3Ryb2tlPSIjMDAwMDAwIi8+CiAgICA8cGF0aCBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjAuMiIgZD0iTTExLjI3MSwxMy41MjFIOC44NzVjLTAuNzA3LDAtMS4yOCwwLjU3My0xLjI4LDEuMjh2Mi4zOTYmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjMCwwLjcwNywwLjU3MywxLjI4LDEuMjgsMS4yOGgyLjM5NmMwLjcwNywwLDEuMjgtMC41NzMsMS4yOC0xLjI4di0yLjM5NkMxMi41NTEs'+
			'MTQuMDk1LDExLjk3OCwxMy41MjEsMTEuMjcxLDEzLjUyMXoiIHN0cm9rZT0iIzAwMDAwMCIvPgogICAgPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIwLjIiIGQ9Ik0xNy4xNTIsMTMuNTIxaC0yLjM5NmMtMC43MDcsMC0xLjI4LDAuNTczLTEuMjgsMS4yOHYyLjM5NiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MwLDAuNzA3LDAuNTczLDEuMjc5LDEuMjgsMS4yNzloMi4zOTZjMC43MDcsMCwxLjI3OS0wLjU3MiwxLjI3OS0xLjI3OXYtMi4zOTZDMTguNDMyLDE0LjA5NSwxNy44NTksMTMuNTIxLDE3LjE1MiwxMy41MjF6IiBzdHJva2U9IiMwMDAwMDAiLz4KICAgIDxwYXRoIG'+
			'ZpbGw9Im5vbmUiIHN0cm9rZS13aWR0aD0iMC4yIiBkPSJNMjMuMDM1LDEzLjUyMWgtMi4zOTZjLTAuNzA3LDAtMS4yODEsMC41NzMtMS4yODEsMS4yOHYyLjM5NiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MwLDAuNzA3LDAuNTc0LDEuMjc5LDEuMjgxLDEuMjc5aDIuMzk2YzAuNzA3LDAsMS4yODEtMC41NzIsMS4yODEtMS4yNzl2LTIuMzk2QzI0LjMxNiwxNC4wOTUsMjMuNzQyLDEzLjUyMSwyMy4wMzUsMTMuNTIxeiIgc3Ryb2tlPSIjMDAwMDAwIi8+CiAgIDwvZz4KICA8L2c+CiA8L2c+Cjwvc3ZnPgo=';
		me._thumbnail_show_button_show__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._thumbnail_show_button_show__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIGhlaWdodD0iMzJweCIgd2lkdGg9IjMycHgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm'+
			'9yZy8yMDAwL3N2ZyIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMzIgMzIiIHhtbDpzcGFjZT0icHJlc2VydmUiIHk9IjBweCIgdmlld0JveD0iMCAwIDMyIDMyIiB2ZXJzaW9uPSIxLjEiPgogPGcgaWQ9IkxheWVyXzEiPgogIDxnIGlkPSJMYXllcl8xXzFfIi8+CiA8L2c+CiA8ZyBpZD0iRWJlbmVfMV8xXyI+CiAgPGc+CiAgIDxnIG9wYWNpdHk9IjAuNCI+CiAgICA8cGF0aCBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjEuNSIgZD0iTTE1Ljk5OSwyLjI1MUM4LjQxNywyLjI1MSwyLjI1LDguNDE5LDIuMjUsMTYmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtzNi4xNjcsMTMuNzQ5'+
			'LDEzLjc0OSwxMy43NDljNy41ODMsMCwxMy43NDktNi4xNjgsMTMuNzQ5LTEzLjc0OVMyMy41ODIsMi4yNTEsMTUuOTk5LDIuMjUxeiBNMTUuOTk5LDI3LjA4NyYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O0M5Ljg4NiwyNy4wODcsNC45MTEsMjIuMTEzLDQuOTExLDE2UzkuODg2LDQuOTEyLDE1Ljk5OSw0LjkxMlMyNy4wODgsOS44ODcsMjcuMDg4LDE2UzIyLjExMiwyNy4wODcsMTUuOTk5LDI3LjA4N3oiIHN0cm9rZT0iIzNDM0MzQyIvPgogICAgPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxLjUiIGQ9Ik0xMC43OTgsMTMuMjczSDguMTYyYy0wLjc3OCwwLTEuNDA4LDAuNj'+
			'MxLTEuNDA4LDEuNDA4djIuNjM3JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7YzAsMC43NzcsMC42MywxLjQwOCwxLjQwOCwxLjQwOGgyLjYzNmMwLjc3NywwLDEuNDA4LTAuNjMxLDEuNDA4LTEuNDA4di0yLjYzN0MxMi4yMDYsMTMuOTA0LDExLjU3NSwxMy4yNzMsMTAuNzk4LDEzLjI3M3oiIHN0cm9rZT0iIzNDM0MzQyIvPgogICAgPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxLjUiIGQ9Ik0xNy4yNjgsMTMuMjczaC0yLjYzNmMtMC43NzcsMC0xLjQwOCwwLjYzMS0xLjQwOCwxLjQwOHYyLjYzNyYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MwLDAuNzc3LDAuNjMx'+
			'LDEuNDA3LDEuNDA4LDEuNDA3aDIuNjM2YzAuNzc3LDAsMS40MDctMC42MywxLjQwNy0xLjQwN3YtMi42MzdDMTguNjc1LDEzLjkwNCwxOC4wNDUsMTMuMjczLDE3LjI2OCwxMy4yNzN6IiBzdHJva2U9IiMzQzNDM0MiLz4KICAgIDxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZS13aWR0aD0iMS41IiBkPSJNMjMuNzM4LDEzLjI3M2gtMi42MzZjLTAuNzc4LDAtMS40MDksMC42MzEtMS40MDksMS40MDh2Mi42MzcmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjMCwwLjc3NywwLjYzMSwxLjQwNywxLjQwOSwxLjQwN2gyLjYzNmMwLjc3OCwwLDEuNDA5LTAuNjMsMS40MDktMS40MDd2LTIuNjM3Qz'+
			'I1LjE0NywxMy45MDQsMjQuNTE3LDEzLjI3MywyMy43MzgsMTMuMjczeiIgc3Ryb2tlPSIjM0MzQzNDIi8+CiAgIDwvZz4KICAgPGc+CiAgICA8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNMTUuOTk5LDIuMjUxQzguNDE3LDIuMjUxLDIuMjUsOC40MTksMi4yNSwxNnM2LjE2NywxMy43NDksMTMuNzQ5LDEzLjc0OSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2M3LjU4MywwLDEzLjc0OS02LjE2OCwxMy43NDktMTMuNzQ5UzIzLjU4MiwyLjI1MSwxNS45OTksMi4yNTF6IE0xNS45OTksMjcuMDg3QzkuODg2LDI3LjA4Nyw0LjkxMSwyMi4xMTMsNC45MTEsMTYmI3hkOyYjeGE7JiN4OTsmI3g5'+
			'OyYjeDk7JiN4OTtTOS44ODYsNC45MTIsMTUuOTk5LDQuOTEyUzI3LjA4OCw5Ljg4NywyNy4wODgsMTZTMjIuMTEyLDI3LjA4NywxNS45OTksMjcuMDg3eiIvPgogICAgPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTTEwLjc5OCwxMy4yNzNIOC4xNjJjLTAuNzc4LDAtMS40MDgsMC42MzEtMS40MDgsMS40MDh2Mi42MzdjMCwwLjc3NywwLjYzLDEuNDA4LDEuNDA4LDEuNDA4aDIuNjM2JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7YzAuNzc3LDAsMS40MDgtMC42MzEsMS40MDgtMS40MDh2LTIuNjM3QzEyLjIwNiwxMy45MDQsMTEuNTc1LDEzLjI3MywxMC43OTgsMTMuMjczeiIvPgogICAgPH'+
			'BhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTTE3LjI2OCwxMy4yNzNoLTIuNjM2Yy0wLjc3NywwLTEuNDA4LDAuNjMxLTEuNDA4LDEuNDA4djIuNjM3YzAsMC43NzcsMC42MzEsMS40MDcsMS40MDgsMS40MDdoMi42MzYmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjMC43NzcsMCwxLjQwNy0wLjYzLDEuNDA3LTEuNDA3di0yLjYzN0MxOC42NzUsMTMuOTA0LDE4LjA0NSwxMy4yNzMsMTcuMjY4LDEzLjI3M3oiLz4KICAgIDxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0yMy43MzgsMTMuMjczaC0yLjYzNmMtMC43NzgsMC0xLjQwOSwwLjYzMS0xLjQwOSwxLjQwOHYyLjYzN2MwLDAuNzc3LDAuNjMx'+
			'LDEuNDA3LDEuNDA5LDEuNDA3aDIuNjM2JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7YzAuNzc4LDAsMS40MDktMC42MywxLjQwOS0xLjQwN3YtMi42MzdDMjUuMTQ3LDEzLjkwNCwyNC41MTcsMTMuMjczLDIzLjczOCwxMy4yNzN6Ii8+CiAgIDwvZz4KICAgPGc+CiAgICA8cGF0aCBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjAuMiIgZD0iTTE1Ljk5OSwyLjI1MUM4LjQxNywyLjI1MSwyLjI1LDguNDE5LDIuMjUsMTYmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtzNi4xNjcsMTMuNzQ5LDEzLjc0OSwxMy43NDljNy41ODMsMCwxMy43NDktNi4xNjgsMTMuNzQ5LTEzLjc0OVMyMy'+
			'41ODIsMi4yNTEsMTUuOTk5LDIuMjUxeiBNMTUuOTk5LDI3LjA4NyYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O0M5Ljg4NiwyNy4wODcsNC45MTEsMjIuMTEzLDQuOTExLDE2UzkuODg2LDQuOTEyLDE1Ljk5OSw0LjkxMlMyNy4wODgsOS44ODcsMjcuMDg4LDE2UzIyLjExMiwyNy4wODcsMTUuOTk5LDI3LjA4N3oiIHN0cm9rZT0iIzAwMDAwMCIvPgogICAgPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIwLjIiIGQ9Ik0xMC43OTgsMTMuMjczSDguMTYyYy0wLjc3OCwwLTEuNDA4LDAuNjMxLTEuNDA4LDEuNDA4djIuNjM3JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7YzAs'+
			'MC43NzcsMC42MywxLjQwOCwxLjQwOCwxLjQwOGgyLjYzNmMwLjc3NywwLDEuNDA4LTAuNjMxLDEuNDA4LTEuNDA4di0yLjYzN0MxMi4yMDYsMTMuOTA0LDExLjU3NSwxMy4yNzMsMTAuNzk4LDEzLjI3M3oiIHN0cm9rZT0iIzAwMDAwMCIvPgogICAgPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIwLjIiIGQ9Ik0xNy4yNjgsMTMuMjczaC0yLjYzNmMtMC43NzcsMC0xLjQwOCwwLjYzMS0xLjQwOCwxLjQwOHYyLjYzNyYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MwLDAuNzc3LDAuNjMxLDEuNDA3LDEuNDA4LDEuNDA3aDIuNjM2YzAuNzc3LDAsMS40MDctMC42MywxLjQwNy0xLj'+
			'QwN3YtMi42MzdDMTguNjc1LDEzLjkwNCwxOC4wNDUsMTMuMjczLDE3LjI2OCwxMy4yNzN6IiBzdHJva2U9IiMwMDAwMDAiLz4KICAgIDxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZS13aWR0aD0iMC4yIiBkPSJNMjMuNzM4LDEzLjI3M2gtMi42MzZjLTAuNzc4LDAtMS40MDksMC42MzEtMS40MDksMS40MDh2Mi42MzcmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjMCwwLjc3NywwLjYzMSwxLjQwNywxLjQwOSwxLjQwN2gyLjYzNmMwLjc3OCwwLDEuNDA5LTAuNjMsMS40MDktMS40MDd2LTIuNjM3QzI1LjE0NywxMy45MDQsMjQuNTE3LDEzLjI3MywyMy43MzgsMTMuMjczeiIgc3Ryb2tlPSIj'+
			'MDAwMDAwIi8+CiAgIDwvZz4KICA8L2c+CiA8L2c+Cjwvc3ZnPgo=';
		me._thumbnail_show_button_show__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="thumbnail_show_button_show";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='bottom : 23px;';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : -10000px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='visibility : hidden;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._thumbnail_show_button_show.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._thumbnail_show_button_show.onclick=function (e) {
			player.setVariableValue('vis_thumbnail_menu', !player.getVariableValue('vis_thumbnail_menu'));
		}
		me._thumbnail_show_button_show.onmouseover=function (e) {
			me._thumbnail_show_button_show__img.style.visibility='hidden';
			me._thumbnail_show_button_show__imgo.style.visibility='inherit';
			me.elementMouseOver['thumbnail_show_button_show']=true;
			me._tt_thumbnail_open.logicBlock_visible();
		}
		me._thumbnail_show_button_show.onmouseout=function (e) {
			me._thumbnail_show_button_show__img.style.visibility='inherit';
			me._thumbnail_show_button_show__imgo.style.visibility='hidden';
			me.elementMouseOver['thumbnail_show_button_show']=false;
			me._tt_thumbnail_open.logicBlock_visible();
		}
		me._thumbnail_show_button_show.ontouchend=function (e) {
			me.elementMouseOver['thumbnail_show_button_show']=false;
			me._tt_thumbnail_open.logicBlock_visible();
		}
		me._thumbnail_show_button_show.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		el=me._tt_thumbnail_open=document.createElement('div');
		els=me._tt_thumbnail_open__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_thumbnail_open";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='z-index: 100;';
		hs+='height : 20px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : 32px;';
		hs+='visibility : hidden;';
		hs+='width : 100px;';
		hs+='pointer-events:auto;';
		hs+='text-shadow: 1px 1px 4px #000000;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="";
		el.appendChild(els);
		me._tt_thumbnail_open.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._tt_thumbnail_open.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getHasTouch() == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._tt_thumbnail_open.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._tt_thumbnail_open.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._tt_thumbnail_open.style[domTransition]='left 0s, top 0s';
				if (me._tt_thumbnail_open.ggCurrentLogicStatePosition == 0) {
					this.ggDx = 0;
					me._tt_thumbnail_open.style.top='-25px';
					me._tt_thumbnail_open.ggUpdatePosition(true);
				}
				else {
					me._tt_thumbnail_open.ggDx=0;
					me._tt_thumbnail_open.style.top='32px';
					me._tt_thumbnail_open.ggUpdatePosition(true);
				}
			}
		}
		me._tt_thumbnail_open.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['thumbnail_show_button_show'] == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._tt_thumbnail_open.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._tt_thumbnail_open.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._tt_thumbnail_open.style[domTransition]='left 0s, top 0s';
				if (me._tt_thumbnail_open.ggCurrentLogicStateVisible == 0) {
					me._tt_thumbnail_open.style.visibility=(Number(me._tt_thumbnail_open.style.opacity)>0||!me._tt_thumbnail_open.style.opacity)?'inherit':'hidden';
					me._tt_thumbnail_open.ggVisible=true;
				}
				else {
					me._tt_thumbnail_open.style.visibility="hidden";
					me._tt_thumbnail_open.ggVisible=false;
				}
			}
		}
		me._tt_thumbnail_open.logicBlock_text = function() {
			var newLogicStateText;
			if (
				((player.getVariableValue('vis_thumbnail_menu') == false))
			)
			{
				newLogicStateText = 0;
			}
			else if (
				((player.getVariableValue('vis_thumbnail_menu') == true))
			)
			{
				newLogicStateText = 1;
			}
			else {
				newLogicStateText = -1;
			}
			if (me._tt_thumbnail_open.ggCurrentLogicStateText != newLogicStateText) {
				me._tt_thumbnail_open.ggCurrentLogicStateText = newLogicStateText;
				me._tt_thumbnail_open.style[domTransition]='left 0s, top 0s';
				if (me._tt_thumbnail_open.ggCurrentLogicStateText == 0) {
					me._tt_thumbnail_open.ggText="Show Thumbnail Menu";
					me._tt_thumbnail_open__text.innerHTML=me._tt_thumbnail_open.ggText;
					if (me._tt_thumbnail_open.ggUpdateText) {
					me._tt_thumbnail_open.ggUpdateText=function() {
						var hs="Show Thumbnail Menu";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
					} else {
						if (me._tt_thumbnail_open.ggUpdatePosition) me._tt_thumbnail_open.ggUpdatePosition();
					}
				}
				else if (me._tt_thumbnail_open.ggCurrentLogicStateText == 1) {
					me._tt_thumbnail_open.ggText="Hide Thumbnail Menu";
					me._tt_thumbnail_open__text.innerHTML=me._tt_thumbnail_open.ggText;
					if (me._tt_thumbnail_open.ggUpdateText) {
					me._tt_thumbnail_open.ggUpdateText=function() {
						var hs="Hide Thumbnail Menu";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
					} else {
						if (me._tt_thumbnail_open.ggUpdatePosition) me._tt_thumbnail_open.ggUpdatePosition();
					}
				}
				else {
					me._tt_thumbnail_open.ggText="";
					me._tt_thumbnail_open__text.innerHTML=me._tt_thumbnail_open.ggText;
					if (me._tt_thumbnail_open.ggUpdateText) {
					me._tt_thumbnail_open.ggUpdateText=function() {
						var hs="";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
					} else {
						if (me._tt_thumbnail_open.ggUpdatePosition) me._tt_thumbnail_open.ggUpdatePosition();
					}
				}
			}
		}
		me._tt_thumbnail_open.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((98-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._thumbnail_show_button_show.appendChild(me._tt_thumbnail_open);
		me.divSkin.appendChild(me._thumbnail_show_button_show);
		el=me._thumbnail_menu=document.createElement('div');
		els=me._thumbnail_menu__content=document.createElement('div');
		els.className='ggskin ggskin_subelement ggskin_scrollarea';
		el.ggContent=els;
		el.appendChild(els);
		el.ggHorScrollVisible = false;
		el.ggVertScrollVisible = false;
		el.ggContentLeftOffset = 0;
		el.ggContentTopOffset = 0;
		el.ggDragInertiaX = 0;
		el.ggDragInertiaY = 0;
		el.ggVPercentVisible = 1.0;
		el.ggHPercentVisible = 1.0;
		hs ='';
		hs+='height : 73px;';
		hs+='left : 50%;';
		hs+='margin-left : -57.5px;';
		hs+='margin-top : -36.5px;';
		hs+='overflow : visible;';
		hs+='position : absolute;';
		hs+='top : 50%;';
		hs+='width : 115px;';
		hs+="";
		els.setAttribute('style',hs);
		me._thumbnail_menu.ggScrollByX = function(diffX) {
			if(!me._thumbnail_menu.ggHorScrollVisible || diffX == 0 || me._thumbnail_menu.ggHPercentVisible >= 1.0) return;
			me._thumbnail_menu.ggScrollPosX = (me._thumbnail_menu__horScrollFg.offsetLeft + diffX);
			me._thumbnail_menu.ggScrollPosX = Math.max(me._thumbnail_menu.ggScrollPosX, 0);
			me._thumbnail_menu.ggScrollPosX = Math.min(me._thumbnail_menu.ggScrollPosX, me._thumbnail_menu__horScrollBg.offsetWidth - me._thumbnail_menu__horScrollFg.offsetWidth);
			me._thumbnail_menu__horScrollFg.style.left = me._thumbnail_menu.ggScrollPosX + 'px';
			let percentScrolled = me._thumbnail_menu.ggScrollPosX / (me._thumbnail_menu__horScrollBg.offsetWidth - me._thumbnail_menu__horScrollFg.offsetWidth);
			me._thumbnail_menu__content.style.left = -(Math.round((me._thumbnail_menu.ggContentWidth * (1.0 - me._thumbnail_menu.ggHPercentVisible)) * percentScrolled)) + me._thumbnail_menu.ggContentLeftOffset + 'px';
			me._thumbnail_menu.ggScrollPosXPercent = (me._thumbnail_menu__horScrollFg.offsetLeft / me._thumbnail_menu__horScrollBg.offsetWidth);
		}
		me._thumbnail_menu.ggScrollByXSmooth = function(diffX) {
			if(!me._thumbnail_menu.ggHorScrollVisible || diffX == 0 || me._thumbnail_menu.ggHPercentVisible >= 1.0) return;
			var scrollPerInterval = diffX / 25;
			var scrollCurrX = 0;
			var id = setInterval(function() {
				scrollCurrX += scrollPerInterval;
				me._thumbnail_menu.ggScrollPosX += scrollPerInterval;
				if (diffX > 0 && (scrollCurrX >= diffX || me._thumbnail_menu.ggScrollPosX >= me._thumbnail_menu__horScrollBg.offsetWidth - me._thumbnail_menu__horScrollFg.offsetWidth)) {
					me._thumbnail_menu.ggScrollPosX = Math.min(me._thumbnail_menu.ggScrollPosX, me._thumbnail_menu__horScrollBg.offsetWidth - me._thumbnail_menu__horScrollFg.offsetWidth);
					clearInterval(id);
				}
				if (diffX < 0 && (scrollCurrX <= diffX || me._thumbnail_menu.ggScrollPosX <= 0)) {
					me._thumbnail_menu.ggScrollPosX = Math.max(me._thumbnail_menu.ggScrollPosX, 0);
					clearInterval(id);
				}
			me._thumbnail_menu__horScrollFg.style.left = me._thumbnail_menu.ggScrollPosX + 'px';
			let percentScrolled = me._thumbnail_menu.ggScrollPosX / (me._thumbnail_menu__horScrollBg.offsetWidth - me._thumbnail_menu__horScrollFg.offsetWidth);
			me._thumbnail_menu__content.style.left = -(Math.round((me._thumbnail_menu.ggContentWidth * (1.0 - me._thumbnail_menu.ggHPercentVisible)) * percentScrolled)) + me._thumbnail_menu.ggContentLeftOffset + 'px';
			me._thumbnail_menu.ggScrollPosXPercent = (me._thumbnail_menu__horScrollFg.offsetLeft / me._thumbnail_menu__horScrollBg.offsetWidth);
			}, 10);
		}
		me._thumbnail_menu.ggScrollByY = function(diffY) {
			if(!me._thumbnail_menu.ggVertScrollVisible || diffY == 0 || me._thumbnail_menu.ggVPercentVisible >= 1.0) return;
			me._thumbnail_menu.ggScrollPosY = (me._thumbnail_menu__vertScrollFg.offsetTop + diffY);
			me._thumbnail_menu.ggScrollPosY = Math.max(me._thumbnail_menu.ggScrollPosY, 0);
			me._thumbnail_menu.ggScrollPosY = Math.min(me._thumbnail_menu.ggScrollPosY, me._thumbnail_menu__vertScrollBg.offsetHeight - me._thumbnail_menu__vertScrollFg.offsetHeight);
			me._thumbnail_menu__vertScrollFg.style.top = me._thumbnail_menu.ggScrollPosY + 'px';
			let percentScrolled = me._thumbnail_menu.ggScrollPosY / (me._thumbnail_menu__vertScrollBg.offsetHeight - me._thumbnail_menu__vertScrollFg.offsetHeight);
			me._thumbnail_menu__content.style.top = -(Math.round((me._thumbnail_menu.ggContentHeight * (1.0 - me._thumbnail_menu.ggVPercentVisible)) * percentScrolled)) + me._thumbnail_menu.ggContentTopOffset + 'px';
			me._thumbnail_menu.ggScrollPosYPercent = (me._thumbnail_menu__vertScrollFg.offsetTop / me._thumbnail_menu__vertScrollBg.offsetHeight);
		}
		me._thumbnail_menu.ggScrollByYSmooth = function(diffY) {
			if(!me._thumbnail_menu.ggVertScrollVisible || diffY == 0 || me._thumbnail_menu.ggVPercentVisible >= 1.0) return;
			var scrollPerInterval = diffY / 25;
			var scrollCurrY = 0;
			var id = setInterval(function() {
				scrollCurrY += scrollPerInterval;
				me._thumbnail_menu.ggScrollPosY += scrollPerInterval;
				if (diffY > 0 && (scrollCurrY >= diffY || me._thumbnail_menu.ggScrollPosY >= me._thumbnail_menu__vertScrollBg.offsetHeight - me._thumbnail_menu__vertScrollFg.offsetHeight)) {
					me._thumbnail_menu.ggScrollPosY = Math.min(me._thumbnail_menu.ggScrollPosY, me._thumbnail_menu__vertScrollBg.offsetHeight - me._thumbnail_menu__vertScrollFg.offsetHeight);
					clearInterval(id);
				}
				if (diffY < 0 && (scrollCurrY <= diffY || me._thumbnail_menu.ggScrollPosY <= 0)) {
					me._thumbnail_menu.ggScrollPosY = Math.max(me._thumbnail_menu.ggScrollPosY, 0);
					clearInterval(id);
				}
			me._thumbnail_menu__vertScrollFg.style.top = me._thumbnail_menu.ggScrollPosY + 'px';
			let percentScrolled = me._thumbnail_menu.ggScrollPosY / (me._thumbnail_menu__vertScrollBg.offsetHeight - me._thumbnail_menu__vertScrollFg.offsetHeight);
			me._thumbnail_menu__content.style.top = -(Math.round((me._thumbnail_menu.ggContentHeight * (1.0 - me._thumbnail_menu.ggVPercentVisible)) * percentScrolled)) + me._thumbnail_menu.ggContentTopOffset + 'px';
			me._thumbnail_menu.ggScrollPosYPercent = (me._thumbnail_menu__vertScrollFg.offsetTop / me._thumbnail_menu__vertScrollBg.offsetHeight);
			}, 10);
		}
		me._thumbnail_menu.ggScrollIntoView = function(posX, posY, width, height) {
			if (me._thumbnail_menu.ggHorScrollVisible) {
				if (posX < 0) {
					var diffX = Math.floor(posX * me._thumbnail_menu.ggHPercentVisible);
					me._thumbnail_menu.ggScrollByXSmooth(diffX);
				} else if (posX + width > me._thumbnail_menu.clientWidth - (me._thumbnail_menu.ggVertScrollVisible ? 15 : 0)) {
					var diffX = Math.ceil(((posX + width) - (me._thumbnail_menu.clientWidth - (me._thumbnail_menu.ggVertScrollVisible ? 15 : 0))) * me._thumbnail_menu.ggHPercentVisible);
					me._thumbnail_menu.ggScrollByXSmooth(diffX);
				}
			}
			if (me._thumbnail_menu.ggVertScrollVisible) {
				if (posY < 0) {
					var diffY = Math.floor(posY * me._thumbnail_menu.ggVPercentVisible);
					me._thumbnail_menu.ggScrollByYSmooth(diffY);
				} else if (posY + height > me._thumbnail_menu.clientHeight - (me._thumbnail_menu.ggHorScrollVisible ? 15 : 0)) {
					var diffY = Math.ceil(((posY + height) - (me._thumbnail_menu.clientHeight - (me._thumbnail_menu.ggHorScrollVisible ? 15 : 0))) * me._thumbnail_menu.ggVPercentVisible);
					me._thumbnail_menu.ggScrollByYSmooth(diffY);
				}
			}
		}
		els.ontouchstart = function(e) {
			e = e || window.event;
			var t = e.touches;
			me._thumbnail_menu.ggDragLastX = t ? t[0].clientX : e.clientX;
			me._thumbnail_menu.ggDragLastY = t ? t[0].clientY : e.clientY;
			me._thumbnail_menu__content.ontouchend = function() {
				let inertiaInterval = setInterval(function() {
					me._thumbnail_menu.ggDragInertiaX *= 0.65;
					me._thumbnail_menu.ggDragInertiaY *= 0.65;
					me._thumbnail_menu.ggScrollByX(me._thumbnail_menu.ggDragInertiaX);
					me._thumbnail_menu.ggScrollByY(me._thumbnail_menu.ggDragInertiaY);
					if (Math.abs(me._thumbnail_menu.ggDragInertiaX) < 1.0 && Math.abs(me._thumbnail_menu.ggDragInertiaY) < 1.0) {
						clearInterval(inertiaInterval);
					}
					}, 50);
				me._thumbnail_menu__content.ontouchend = null;
				me._thumbnail_menu__content.ontouchmove = null;
				me._thumbnail_menu__content.onpointerup = null;
				me._thumbnail_menu__content.onpointermove = null;
			}
		if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
			me._thumbnail_menu__content.onpointerup = me._thumbnail_menu__content.ontouchend;
		}
			me._thumbnail_menu__content.ontouchmove = function(e) {
				e = e || window.event;
				e.preventDefault();
				var t = e.touches;
				var diffX = ((t ? t[0].clientX : e.clientX) - me._thumbnail_menu.ggDragLastX) * me._thumbnail_menu.ggHPercentVisible;
				var diffY = ((t ? t[0].clientY : e.clientY) - me._thumbnail_menu.ggDragLastY) * me._thumbnail_menu.ggVPercentVisible;
				me._thumbnail_menu.ggDragInertiaX = -diffX;
				me._thumbnail_menu.ggDragInertiaY = -diffY;
				me._thumbnail_menu.ggDragLastX = t ? t[0].clientX : e.clientX;
				me._thumbnail_menu.ggDragLastY = t ? t[0].clientY : e.clientY;
				me._thumbnail_menu.ggScrollByX(-diffX);
				me._thumbnail_menu.ggScrollByY(-diffY);
			}
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
				me._thumbnail_menu__content.onpointermove = me._thumbnail_menu__content.ontouchmove;
			}
		}
		if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
			els.onpointerdown = els.ontouchstart;
		}
		elHorScrollBg = me._thumbnail_menu__horScrollBg = document.createElement('div');
		el.appendChild(elHorScrollBg);
		elHorScrollBg.setAttribute('style', 'position: absolute; left: 0px; bottom: 0px; visibility: hidden; width: 512px; height: 15px; background-color: rgba(128,128,128,1); pointer-events: auto;');
		elHorScrollBg.className='ggskin ggskin_scrollarea_hscrollbg';
		elHorScrollFg = me._thumbnail_menu__horScrollFg = document.createElement('div');
		elHorScrollBg.appendChild(elHorScrollFg);
		elHorScrollFg.className='ggskin ggskin_scrollarea_hscrollfg';
		elHorScrollFg.setAttribute('style', 'position: absolute; left: 0px; top: 0px; visibility: hidden; width: 512px; height: 15px; background-color: rgba(192,192,192,1); pointer-events: auto;');
		me._thumbnail_menu.ggScrollPosX = 0;
		me._thumbnail_menu.ggScrollPosXPercent = 0.0;
		elHorScrollFg.onmousedown = function(e) {
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) return;
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			me._thumbnail_menu.ggDragLastX = e.clientX;
			document.onmouseup = function() {
				let inertiaInterval = setInterval(function() {
					me._thumbnail_menu.ggDragInertiaX *= 0.65;
					me._thumbnail_menu.ggScrollByX(me._thumbnail_menu.ggDragInertiaX);
					if (Math.abs(me._thumbnail_menu.ggDragInertiaX) < 1.0) {
						clearInterval(inertiaInterval);
					}
					}, 50);
				document.onmouseup = null;
				document.onmousemove = null;
			}
			document.onmousemove = function(e) {
				e = e || window.event;
				e.preventDefault();
				var diffX = e.clientX - me._thumbnail_menu.ggDragLastX;
				me._thumbnail_menu.ggDragInertiaX = diffX;
				me._thumbnail_menu.ggDragLastX = e.clientX;
				me._thumbnail_menu.ggScrollByX(diffX);
			}
		}
		elHorScrollFg.ontouchstart = function(e) {
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			var t = e.touches;
			me._thumbnail_menu.ggDragLastX = t ? t[0].clientX : e.clientX;
			document.ontouchend = function() {
				let inertiaInterval = setInterval(function() {
					me._thumbnail_menu.ggDragInertiaX *= 0.65;
					me._thumbnail_menu.ggScrollByX(me._thumbnail_menu.ggDragInertiaX);
					if (Math.abs(me._thumbnail_menu.ggDragInertiaX) < 1.0) {
						clearInterval(inertiaInterval);
					}
					}, 50);
				document.ontouchend = null;
				document.ontouchmove = null;
				document.onpointerup = null;
				document.onpointermove = null;
			}
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
				document.onpointerup = document.ontouchend;
			}
			document.ontouchmove = function(e) {
				e = e || window.event;
				e.preventDefault();
				var t = e.touches;
				var diffX = (t ? t[0].clientX : e.clientX) - me._thumbnail_menu.ggDragLastX;
				me._thumbnail_menu.ggDragInertiaX = diffX;
				me._thumbnail_menu.ggDragLastX = t ? t[0].clientX : e.clientX;
				me._thumbnail_menu.ggScrollByX(diffX);
			}
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
				document.onpointermove = document.ontouchmove;
			}
		}
		if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
			elHorScrollFg.onpointerdown = elHorScrollFg.ontouchstart;
		}
		elHorScrollBg.onmousedown = function(e) {
			e = e || window.event;
			e.preventDefault();
			var diffX = me._thumbnail_menu.ggScrollWidth;
			if (e.offsetX < me._thumbnail_menu.ggScrollPosX) {
				diffX = diffX * -1;
			}
			me._thumbnail_menu.ggScrollByXSmooth(diffX);
		}
		elHorScrollBg.ontouchstart = function(e) {
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			var t = e.touches;
			var rect = me._thumbnail_menu__horScrollBg.getBoundingClientRect();
			var diffX = me._thumbnail_menu.ggScrollWidth;
			if ((t[0].clientX - rect.left) < me._thumbnail_menu.ggScrollPosX) {
				diffX = diffX * -1;
			}
			me._thumbnail_menu.ggScrollByXSmooth(diffX);
		}
		el.addEventListener('wheel', function(e) {
			e.preventDefault();
			var wheelDelta = Math.sign(e.deltaX);
			me._thumbnail_menu.ggScrollByXSmooth(30 * me._thumbnail_menu.ggHPercentVisible * wheelDelta);
		});
		elCornerBg = me._thumbnail_menu__cornerBg = document.createElement('div');
		el.appendChild(elCornerBg);
		elCornerBg.setAttribute('style', 'position: absolute; right: 0px; bottom: 0px; visibility: hidden; width: 15px; height: 15px; background-color: rgba(255,255,255,1);');
		elCornerBg.className='ggskin ggskin_scrollarea_scrollcorner';
		el.ggId="thumbnail_menu";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_scrollarea ";
		el.ggType='scrollarea';
		hs ='';
		hs+='border : 0px solid #000000;';
		hs+='bottom : 65px;';
		hs+='height : 84px;';
		hs+='left : -10000px;';
		hs+='opacity : 0;';
		hs+='overflow : hidden;';
		hs+='position : absolute;';
		hs+='visibility : hidden;';
		hs+='width : 80%;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._thumbnail_menu.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._thumbnail_menu.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getHasTouch() == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._thumbnail_menu.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._thumbnail_menu.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._thumbnail_menu.style[domTransition]='left 0s, bottom 0s';
				if (me._thumbnail_menu.ggCurrentLogicStatePosition == 0) {
					this.ggDx = 0;
					me._thumbnail_menu.style.bottom='80px';
					me._thumbnail_menu.ggUpdatePosition(true);
				}
				else {
					me._thumbnail_menu.ggDx=0;
					me._thumbnail_menu.style.bottom='65px';
					me._thumbnail_menu.ggUpdatePosition(true);
				}
			}
		}
		me._thumbnail_menu.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=((this.ggDx * pw)/100.0 + pw/2 - w/2) + 'px';
			}
			{
				var horScrollWasVisible = this.ggHorScrollVisible;
				var vertScrollWasVisible = this.ggVertScrollVisible;
				this.ggContent.style.left = '0px';
				this.ggContent.style.top = '0px';
				this.ggContentLeftOffset = 0;
				this.ggContentTopOffset = 0;
				this.ggContentWidth = 0;
				this.ggContentHeight = 0;
				var offsetWidthWithScale = this.getBoundingClientRect().width;
				var offsetHeightWithScale = this.getBoundingClientRect().height;
				var domRectContent = this.ggContent.getBoundingClientRect();
				var minX = 0;
				var minY = 0;
				var maxX = 0;
				var maxY = 0;
				var stack=[];
				stack.push(this.ggContent);
				while(stack.length>0) {
					var e=stack.pop();
					if (e!=this.ggContent && e.getBoundingClientRect && e.style['display']!='none' && (e.offsetWidth != 0 || e.offsetHeight != 0)) {
						var domRectChild = e.getBoundingClientRect();
						var diffX = domRectChild.left - domRectContent.left;
						minX = Math.min(minX, diffX);
						maxX = Math.max(maxX, diffX + domRectChild.width);
						var diffY = domRectChild.top - domRectContent.top;
						minY = Math.min(minY, diffY);
						maxY = Math.max(maxY, diffY + domRectChild.height);
					}
					if (e.hasChildNodes() && e.style['display']!='none' && e.style['overflow']!='hidden') {
						for(var i=0;i<e.childNodes.length;i++) {
							stack.push(e.childNodes[i]);
						}
					}
				}
				if (minX < 0) this.ggContentLeftOffset = -minX;
				if (minY < 0) this.ggContentTopOffset = -minY;
				var contentWidth = maxX - minX;
				var contentHeight = maxY - minY;
			var scaleX = this.getBoundingClientRect().width / this.offsetWidth;
				this.ggContentWidth = contentWidth / scaleX;
			var scaleY = this.getBoundingClientRect().height / this.offsetHeight;
				this.ggContentHeight = contentHeight / scaleY;
				this.ggContent.style.left = this.ggContentLeftOffset + 'px';
				this.ggContent.style.top = this.ggContentTopOffset + 'px';
				this.ggContent.style.width = contentWidth + 'px';
				this.ggContent.style.height = contentHeight + 'px';
				var containerWidth = offsetWidthWithScale;
				if (this.ggVertScrollVisible) containerWidth -= 15;
				if (contentWidth < containerWidth) {
					this.ggContent.style.left = '50%';
					this.ggContent.style.marginLeft = ((contentWidth/-2) - (this.ggVertScrollVisible ? (15/2) : 0)) + 'px';
				}
				else {
					this.ggContent.style.left = this.ggContentLeftOffset + 'px';
					this.ggContent.style.marginLeft = '0px';
				}
				var containerHeight = this.clientHeight;
				if (this.ggHorScrollVisible) containerHeight -= 15;
				if (contentHeight < containerHeight) {
					this.ggContent.style.top = '50%';
					this.ggContent.style.marginTop = ((contentHeight/-2) - (this.ggHorScrollVisible ? (15/2) : 0))  + 'px';
				}
				else {
					this.ggContent.style.top = this.ggContentTopOffset + 'px';
					this.ggContent.style.marginTop = '0px';
				}
				if (contentWidth > Math.ceil(offsetWidthWithScale)) {
					me._thumbnail_menu__horScrollBg.style.visibility = 'inherit';
					me._thumbnail_menu__horScrollFg.style.visibility = 'inherit';
					me._thumbnail_menu.ggHorScrollVisible = true;
				} else {
					me._thumbnail_menu__horScrollBg.style.visibility = 'hidden';
					me._thumbnail_menu__horScrollFg.style.visibility = 'hidden';
					me._thumbnail_menu.ggHorScrollVisible = false;
				}
				if(me._thumbnail_menu.ggHorScrollVisible) {
					me._thumbnail_menu.ggAvailableHeight = me._thumbnail_menu.clientHeight - 15;
					if (me._thumbnail_menu.ggVertScrollVisible) {
						me._thumbnail_menu.ggAvailableWidth = me._thumbnail_menu.clientWidth - 15;
						me._thumbnail_menu.ggAvailableWidthWithScale = me._thumbnail_menu.getBoundingClientRect().width - me._thumbnail_menu__horScrollBg.getBoundingClientRect().height;
					} else {
						me._thumbnail_menu.ggAvailableWidth = me._thumbnail_menu.clientWidth;
						me._thumbnail_menu.ggAvailableWidthWithScale = me._thumbnail_menu.getBoundingClientRect().width;
					}
					me._thumbnail_menu__horScrollBg.style.width = me._thumbnail_menu.ggAvailableWidth + 'px';
					me._thumbnail_menu.ggHPercentVisible = contentWidth != 0 ? me._thumbnail_menu.ggAvailableWidthWithScale / contentWidth : 0.0;
					if (me._thumbnail_menu.ggHPercentVisible > 1.0) me._thumbnail_menu.ggHPercentVisible = 1.0;
					me._thumbnail_menu.ggScrollWidth = Math.round(me._thumbnail_menu__horScrollBg.offsetWidth * me._thumbnail_menu.ggHPercentVisible);
					me._thumbnail_menu__horScrollFg.style.width = me._thumbnail_menu.ggScrollWidth + 'px';
					me._thumbnail_menu.ggScrollPosX = me._thumbnail_menu.ggScrollPosXPercent * me._thumbnail_menu.ggAvailableWidth;
					me._thumbnail_menu.ggScrollPosX = Math.min(me._thumbnail_menu.ggScrollPosX, me._thumbnail_menu__horScrollBg.offsetWidth - me._thumbnail_menu__horScrollFg.offsetWidth);
					me._thumbnail_menu__horScrollFg.style.left = me._thumbnail_menu.ggScrollPosX + 'px';
					if (me._thumbnail_menu.ggHPercentVisible < 1.0) {
						let percentScrolled = me._thumbnail_menu.ggScrollPosX / (me._thumbnail_menu__horScrollBg.offsetWidth - me._thumbnail_menu__horScrollFg.offsetWidth);
						me._thumbnail_menu__content.style.left = -(Math.round((me._thumbnail_menu.ggContentWidth * (1.0 - me._thumbnail_menu.ggHPercentVisible)) * percentScrolled)) + this.ggContentLeftOffset + 'px';
					}
				} else {
					me._thumbnail_menu.ggAvailableHeight = me._thumbnail_menu.clientHeight;
					me._thumbnail_menu.ggScrollPosX = 0;
					me._thumbnail_menu.ggScrollPosXPercent = 0.0;
				}
				if(horScrollWasVisible != me._thumbnail_menu.ggHorScrollVisible || vertScrollWasVisible != me._thumbnail_menu.ggVertScrollVisible) {
					me.updateSize(me._thumbnail_menu);
					me._thumbnail_menu.ggUpdatePosition();
				}
			}
		}
		el=me._thumbnail_cloner=document.createElement('div');
		el.ggNumRepeat = 1;
		el.ggNumRows = 0;
		el.ggNumCols = 0;
		el.ggWidth = 96;
		el.ggHeight = 62;
		el.ggUpdating = false;
		el.ggFilter = [];
		el.ggInstances = [];
		me._thumbnail_cloner.callChildLogicBlocks_changenode = function(){
			if(me._thumbnail_cloner.ggInstances) {
				var i;
				for(i = 0; i < me._thumbnail_cloner.ggInstances.length; i++) {
					if (me._thumbnail_cloner.ggInstances[i]._thumbnail_title && me._thumbnail_cloner.ggInstances[i]._thumbnail_title.logicBlock_alpha) {
						me._thumbnail_cloner.ggInstances[i]._thumbnail_title.logicBlock_alpha();
					}
					if (me._thumbnail_cloner.ggInstances[i]._checkmark_tick && me._thumbnail_cloner.ggInstances[i]._checkmark_tick.logicBlock_alpha) {
						me._thumbnail_cloner.ggInstances[i]._checkmark_tick.logicBlock_alpha();
					}
				}
			}
		}
		me._thumbnail_cloner.callChildLogicBlocks_mouseover = function(){
			if(me._thumbnail_cloner.ggInstances) {
				var i;
				for(i = 0; i < me._thumbnail_cloner.ggInstances.length; i++) {
					if (me._thumbnail_cloner.ggInstances[i]._thumbnail_active && me._thumbnail_cloner.ggInstances[i]._thumbnail_active.logicBlock_bordercolor) {
						me._thumbnail_cloner.ggInstances[i]._thumbnail_active.logicBlock_bordercolor();
					}
				}
			}
		}
		me._thumbnail_cloner.callChildLogicBlocks_mouseover = function(){
			if(me._thumbnail_cloner.ggInstances) {
				var i;
				for(i = 0; i < me._thumbnail_cloner.ggInstances.length; i++) {
					if (me._thumbnail_cloner.ggInstances[i]._thumbnail_title && me._thumbnail_cloner.ggInstances[i]._thumbnail_title.logicBlock_alpha) {
						me._thumbnail_cloner.ggInstances[i]._thumbnail_title.logicBlock_alpha();
					}
					if (me._thumbnail_cloner.ggInstances[i]._checkmark_tick && me._thumbnail_cloner.ggInstances[i]._checkmark_tick.logicBlock_alpha) {
						me._thumbnail_cloner.ggInstances[i]._checkmark_tick.logicBlock_alpha();
					}
				}
			}
		}
		me._thumbnail_cloner.callChildLogicBlocks_active = function(){
			if(me._thumbnail_cloner.ggInstances) {
				var i;
				for(i = 0; i < me._thumbnail_cloner.ggInstances.length; i++) {
					if (me._thumbnail_cloner.ggInstances[i]._thumbnail_active && me._thumbnail_cloner.ggInstances[i]._thumbnail_active.logicBlock_bordercolor) {
						me._thumbnail_cloner.ggInstances[i]._thumbnail_active.logicBlock_bordercolor();
					}
					if (me._thumbnail_cloner.ggInstances[i]._checkmark_tick && me._thumbnail_cloner.ggInstances[i]._checkmark_tick.logicBlock_visible) {
						me._thumbnail_cloner.ggInstances[i]._checkmark_tick.logicBlock_visible();
					}
				}
			}
		}
		me._thumbnail_cloner.callChildLogicBlocks_changevisitednodes = function(){
			if(me._thumbnail_cloner.ggInstances) {
				var i;
				for(i = 0; i < me._thumbnail_cloner.ggInstances.length; i++) {
					if (me._thumbnail_cloner.ggInstances[i]._checkmark_tick && me._thumbnail_cloner.ggInstances[i]._checkmark_tick.logicBlock_visible) {
						me._thumbnail_cloner.ggInstances[i]._checkmark_tick.logicBlock_visible();
					}
				}
			}
		}
		me._thumbnail_cloner.callChildLogicBlocks_activehotspotchanged = function(){
			if(me._thumbnail_cloner.ggInstances) {
				var i;
				for(i = 0; i < me._thumbnail_cloner.ggInstances.length; i++) {
					if (me._thumbnail_cloner.ggInstances[i]._thumbnail_title && me._thumbnail_cloner.ggInstances[i]._thumbnail_title.logicBlock_alpha) {
						me._thumbnail_cloner.ggInstances[i]._thumbnail_title.logicBlock_alpha();
					}
					if (me._thumbnail_cloner.ggInstances[i]._checkmark_tick && me._thumbnail_cloner.ggInstances[i]._checkmark_tick.logicBlock_alpha) {
						me._thumbnail_cloner.ggInstances[i]._checkmark_tick.logicBlock_alpha();
					}
				}
			}
		}
		me._thumbnail_cloner.callChildLogicBlocks_varchanged_opt_thumbnail_menu_tooltip = function(){
			if(me._thumbnail_cloner.ggInstances) {
				var i;
				for(i = 0; i < me._thumbnail_cloner.ggInstances.length; i++) {
					if (me._thumbnail_cloner.ggInstances[i]._thumbnail_title && me._thumbnail_cloner.ggInstances[i]._thumbnail_title.logicBlock_alpha) {
						me._thumbnail_cloner.ggInstances[i]._thumbnail_title.logicBlock_alpha();
					}
				}
			}
		}
		el.ggUpdate = function(filter) {
			if(me._thumbnail_cloner.ggUpdating == true) return;
			me._thumbnail_cloner.ggUpdating = true;
			var el=me._thumbnail_cloner;
			var curNumRows = 0;
			curNumRows = el.ggNumRepeat;
			if (curNumRows < 1) curNumRows = 1;
			if (typeof filter=='object') {
				el.ggFilter = filter;
			} else {
				filter = el.ggFilter;
			};
			if (me.ggTag) filter.push(me.ggTag);
			filter=filter.sort();
			if ((el.ggNumRows == curNumRows) && (el.ggInstances.length > 0) && (filter.length === el.ggCurrentFilter.length) && (filter.every(function(value, index) { return value === el.ggCurrentFilter[index] }) )) {
				me._thumbnail_cloner.ggUpdating = false;
				return;
			} else {
				el.ggNumCols = 1;
				el.ggNumRows = curNumRows;
			}
			el.ggCurrentFilter = filter;
			el.ggInstances = [];
			if (el.hasChildNodes() == true) {
				while (el.firstChild) {
					el.removeChild(el.firstChild);
				}
			}
			var tourNodes = player.getNodeIds();
			var row = 0;
			var column = 0;
			var currentIndex = 0;
			for (var i=0; i < tourNodes.length; i++) {
				var nodeId = tourNodes[i];
				var passed = true;
				var nodeData = player.getNodeUserdata(nodeId);
				if (filter.length > 0) {
					for (var j=0; j < filter.length; j++) {
						if (nodeData['tags'].indexOf(filter[j]) == -1) passed = false;
					}
				}
				if (passed) {
				var parameter={};
				parameter.top=(row * me._thumbnail_cloner.ggHeight) + 'px';
				parameter.left=(column * me._thumbnail_cloner.ggWidth) + 'px';
				parameter.width=me._thumbnail_cloner.ggWidth + 'px';
				parameter.height=me._thumbnail_cloner.ggHeight + 'px';
				parameter.index=currentIndex;
				parameter.title=nodeData['title'];
				var inst = new SkinCloner_thumbnail_cloner_Class(nodeId, me, el, parameter);
				currentIndex++;
				el.ggInstances.push(inst);
				el.appendChild(inst.__div);
				inst.__div.ggObj=inst;
				skin.updateSize(inst.__div);
				row++;
				if (row >= el.ggNumRows) {
					row = 0;
					column++;
					el.ggNumCols++;
				}
				}
			}
			me._thumbnail_cloner.callChildLogicBlocks_changenode();
			me._thumbnail_cloner.callChildLogicBlocks_mouseover();
			me._thumbnail_cloner.callChildLogicBlocks_mouseover();
			me._thumbnail_cloner.callChildLogicBlocks_active();
			me._thumbnail_cloner.callChildLogicBlocks_changevisitednodes();
			me._thumbnail_cloner.callChildLogicBlocks_activehotspotchanged();
			me._thumbnail_cloner.callChildLogicBlocks_varchanged_opt_thumbnail_menu_tooltip();
			me._thumbnail_cloner.ggUpdating = false;
			player.triggerEvent('clonerchanged');
			if (me._thumbnail_cloner.parentNode.classList.contains('ggskin_subelement') && me._thumbnail_cloner.parentNode.parentNode.classList.contains('ggskin_scrollarea')) me._thumbnail_cloner.parentNode.parentNode.ggUpdatePosition();
		}
		el.ggFilter = [];
		el.ggId="thumbnail_cloner";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_cloner ";
		el.ggType='cloner';
		hs ='';
		hs+='height : 62px;';
		hs+='left : 0px;';
		hs+='overflow : visible;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 96px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._thumbnail_cloner.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._thumbnail_cloner.ggUpdateConditionNodeChange=function () {
			var cnode=player.getCurrentNode();
			for(var i=0; i<me._thumbnail_cloner.childNodes.length; i++) {
				var child=me._thumbnail_cloner.childNodes[i];
				if (child.ggObj && child.ggObj.ggNodeId==cnode) {
			        var childOffX = child.offsetLeft;
			        var childOffY = child.offsetTop;
					var p = child.parentElement;
			        while (p != null && p!==this.divSkin) {
						if (p.ggType && p.ggType == 'scrollarea') {
							p.ggScrollIntoView(childOffX, childOffY, child.clientWidth, child.clientHeight);
						}
						childOffX += p.offsetLeft;
						childOffY += p.offsetTop;
						p = p.parentElement;
					}
				}
			}
		}
		me._thumbnail_cloner.ggUpdatePosition=function (useTransition) {
				me._thumbnail_cloner.ggUpdate();
		}
		me._thumbnail_cloner.ggNodeChange=function () {
			me._thumbnail_cloner.ggUpdateConditionNodeChange();
		}
		me._thumbnail_menu__content.appendChild(me._thumbnail_cloner);
		me.divSkin.appendChild(me._thumbnail_menu);
		el=me._hotspots=document.createElement('div');
		el.ggId="Hotspots";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 20px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 100px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._hotspots.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._hotspots.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me.divSkin.appendChild(me._hotspots);
		player.addListener('sizechanged', function() {
			me.updateSize(me.divSkin);
		});
		player.addListener('configloaded', function() {
			me._thumbnail_cloner.ggUpdate();
		});
		player.addListener('imagesready', function() {
			me._thumbnail_menu.ggUpdatePosition();
		});
	};
	this.hotspotProxyClick=function(id, url) {
	}
	this.hotspotProxyDoubleClick=function(id, url) {
	}
	me.hotspotProxyOver=function(id, url) {
	}
	me.hotspotProxyOut=function(id, url) {
	}
	me.callChildLogicBlocksHotspot_luftansicht_changenode = function(){
		if(hotspotTemplates['LuftAnsicht']) {
			var i;
			for(i = 0; i < hotspotTemplates['LuftAnsicht'].length; i++) {
				if (hotspotTemplates['LuftAnsicht'][i]._luftansicht.logicBlock_visible) {
					hotspotTemplates['LuftAnsicht'][i]._luftansicht.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_luftansicht_varchanged_all_hotspots = function(){
		if(hotspotTemplates['LuftAnsicht']) {
			var i;
			for(i = 0; i < hotspotTemplates['LuftAnsicht'].length; i++) {
				if (hotspotTemplates['LuftAnsicht'][i]._luftansicht.logicBlock_visible) {
					hotspotTemplates['LuftAnsicht'][i]._luftansicht.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_luftansicht_varchanged_hts_luftansicht = function(){
		if(hotspotTemplates['LuftAnsicht']) {
			var i;
			for(i = 0; i < hotspotTemplates['LuftAnsicht'].length; i++) {
				if (hotspotTemplates['LuftAnsicht'][i]._luftansicht.logicBlock_visible) {
					hotspotTemplates['LuftAnsicht'][i]._luftansicht.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_bar_changenode = function(){
		if(hotspotTemplates['Bar']) {
			var i;
			for(i = 0; i < hotspotTemplates['Bar'].length; i++) {
				if (hotspotTemplates['Bar'][i]._bar.logicBlock_visible) {
					hotspotTemplates['Bar'][i]._bar.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_bar_varchanged_all_hotspots = function(){
		if(hotspotTemplates['Bar']) {
			var i;
			for(i = 0; i < hotspotTemplates['Bar'].length; i++) {
				if (hotspotTemplates['Bar'][i]._bar.logicBlock_visible) {
					hotspotTemplates['Bar'][i]._bar.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_bar_varchanged_hts_bar = function(){
		if(hotspotTemplates['Bar']) {
			var i;
			for(i = 0; i < hotspotTemplates['Bar'].length; i++) {
				if (hotspotTemplates['Bar'][i]._bar.logicBlock_visible) {
					hotspotTemplates['Bar'][i]._bar.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_streetview_changenode = function(){
		if(hotspotTemplates['StreetView']) {
			var i;
			for(i = 0; i < hotspotTemplates['StreetView'].length; i++) {
				if (hotspotTemplates['StreetView'][i]._streetview.logicBlock_visible) {
					hotspotTemplates['StreetView'][i]._streetview.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_streetview_varchanged_all_hotspots = function(){
		if(hotspotTemplates['StreetView']) {
			var i;
			for(i = 0; i < hotspotTemplates['StreetView'].length; i++) {
				if (hotspotTemplates['StreetView'][i]._streetview.logicBlock_visible) {
					hotspotTemplates['StreetView'][i]._streetview.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_streetview_varchanged_hts_streetview = function(){
		if(hotspotTemplates['StreetView']) {
			var i;
			for(i = 0; i < hotspotTemplates['StreetView'].length; i++) {
				if (hotspotTemplates['StreetView'][i]._streetview.logicBlock_visible) {
					hotspotTemplates['StreetView'][i]._streetview.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_einkaufen_changenode = function(){
		if(hotspotTemplates['Einkaufen']) {
			var i;
			for(i = 0; i < hotspotTemplates['Einkaufen'].length; i++) {
				if (hotspotTemplates['Einkaufen'][i]._einkaufen.logicBlock_visible) {
					hotspotTemplates['Einkaufen'][i]._einkaufen.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_einkaufen_varchanged_all_hotspots = function(){
		if(hotspotTemplates['Einkaufen']) {
			var i;
			for(i = 0; i < hotspotTemplates['Einkaufen'].length; i++) {
				if (hotspotTemplates['Einkaufen'][i]._einkaufen.logicBlock_visible) {
					hotspotTemplates['Einkaufen'][i]._einkaufen.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_einkaufen_varchanged_hts_einkaufen = function(){
		if(hotspotTemplates['Einkaufen']) {
			var i;
			for(i = 0; i < hotspotTemplates['Einkaufen'].length; i++) {
				if (hotspotTemplates['Einkaufen'][i]._einkaufen.logicBlock_visible) {
					hotspotTemplates['Einkaufen'][i]._einkaufen.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_optiker_changenode = function(){
		if(hotspotTemplates['Optiker']) {
			var i;
			for(i = 0; i < hotspotTemplates['Optiker'].length; i++) {
				if (hotspotTemplates['Optiker'][i]._optiker.logicBlock_visible) {
					hotspotTemplates['Optiker'][i]._optiker.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_optiker_varchanged_all_hotspots = function(){
		if(hotspotTemplates['Optiker']) {
			var i;
			for(i = 0; i < hotspotTemplates['Optiker'].length; i++) {
				if (hotspotTemplates['Optiker'][i]._optiker.logicBlock_visible) {
					hotspotTemplates['Optiker'][i]._optiker.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_optiker_varchanged_hts_optiker = function(){
		if(hotspotTemplates['Optiker']) {
			var i;
			for(i = 0; i < hotspotTemplates['Optiker'].length; i++) {
				if (hotspotTemplates['Optiker'][i]._optiker.logicBlock_visible) {
					hotspotTemplates['Optiker'][i]._optiker.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_immobilien_changenode = function(){
		if(hotspotTemplates['Immobilien']) {
			var i;
			for(i = 0; i < hotspotTemplates['Immobilien'].length; i++) {
				if (hotspotTemplates['Immobilien'][i]._immobilien.logicBlock_visible) {
					hotspotTemplates['Immobilien'][i]._immobilien.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_immobilien_varchanged_all_hotspots = function(){
		if(hotspotTemplates['Immobilien']) {
			var i;
			for(i = 0; i < hotspotTemplates['Immobilien'].length; i++) {
				if (hotspotTemplates['Immobilien'][i]._immobilien.logicBlock_visible) {
					hotspotTemplates['Immobilien'][i]._immobilien.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_immobilien_varchanged_hts_immobilien = function(){
		if(hotspotTemplates['Immobilien']) {
			var i;
			for(i = 0; i < hotspotTemplates['Immobilien'].length; i++) {
				if (hotspotTemplates['Immobilien'][i]._immobilien.logicBlock_visible) {
					hotspotTemplates['Immobilien'][i]._immobilien.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_strandbad_changenode = function(){
		if(hotspotTemplates['Strandbad']) {
			var i;
			for(i = 0; i < hotspotTemplates['Strandbad'].length; i++) {
				if (hotspotTemplates['Strandbad'][i]._strandbad.logicBlock_visible) {
					hotspotTemplates['Strandbad'][i]._strandbad.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_strandbad_varchanged_all_hotspots = function(){
		if(hotspotTemplates['Strandbad']) {
			var i;
			for(i = 0; i < hotspotTemplates['Strandbad'].length; i++) {
				if (hotspotTemplates['Strandbad'][i]._strandbad.logicBlock_visible) {
					hotspotTemplates['Strandbad'][i]._strandbad.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_strandbad_varchanged_hts_strandbad = function(){
		if(hotspotTemplates['Strandbad']) {
			var i;
			for(i = 0; i < hotspotTemplates['Strandbad'].length; i++) {
				if (hotspotTemplates['Strandbad'][i]._strandbad.logicBlock_visible) {
					hotspotTemplates['Strandbad'][i]._strandbad.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_restaurant_changenode = function(){
		if(hotspotTemplates['Restaurant']) {
			var i;
			for(i = 0; i < hotspotTemplates['Restaurant'].length; i++) {
				if (hotspotTemplates['Restaurant'][i]._restaurant.logicBlock_visible) {
					hotspotTemplates['Restaurant'][i]._restaurant.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_restaurant_varchanged_all_hotspots = function(){
		if(hotspotTemplates['Restaurant']) {
			var i;
			for(i = 0; i < hotspotTemplates['Restaurant'].length; i++) {
				if (hotspotTemplates['Restaurant'][i]._restaurant.logicBlock_visible) {
					hotspotTemplates['Restaurant'][i]._restaurant.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_restaurant_varchanged_hts_restaurant = function(){
		if(hotspotTemplates['Restaurant']) {
			var i;
			for(i = 0; i < hotspotTemplates['Restaurant'].length; i++) {
				if (hotspotTemplates['Restaurant'][i]._restaurant.logicBlock_visible) {
					hotspotTemplates['Restaurant'][i]._restaurant.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_cafe_changenode = function(){
		if(hotspotTemplates['Cafe']) {
			var i;
			for(i = 0; i < hotspotTemplates['Cafe'].length; i++) {
				if (hotspotTemplates['Cafe'][i]._cafe.logicBlock_visible) {
					hotspotTemplates['Cafe'][i]._cafe.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_cafe_varchanged_all_hotspots = function(){
		if(hotspotTemplates['Cafe']) {
			var i;
			for(i = 0; i < hotspotTemplates['Cafe'].length; i++) {
				if (hotspotTemplates['Cafe'][i]._cafe.logicBlock_visible) {
					hotspotTemplates['Cafe'][i]._cafe.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_cafe_varchanged_hts_cafe = function(){
		if(hotspotTemplates['Cafe']) {
			var i;
			for(i = 0; i < hotspotTemplates['Cafe'].length; i++) {
				if (hotspotTemplates['Cafe'][i]._cafe.logicBlock_visible) {
					hotspotTemplates['Cafe'][i]._cafe.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_hotel_changenode = function(){
		if(hotspotTemplates['Hotel']) {
			var i;
			for(i = 0; i < hotspotTemplates['Hotel'].length; i++) {
				if (hotspotTemplates['Hotel'][i]._hotel.logicBlock_visible) {
					hotspotTemplates['Hotel'][i]._hotel.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_hotel_varchanged_all_hotspots = function(){
		if(hotspotTemplates['Hotel']) {
			var i;
			for(i = 0; i < hotspotTemplates['Hotel'].length; i++) {
				if (hotspotTemplates['Hotel'][i]._hotel.logicBlock_visible) {
					hotspotTemplates['Hotel'][i]._hotel.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_hotel_varchanged_hts_hotel = function(){
		if(hotspotTemplates['Hotel']) {
			var i;
			for(i = 0; i < hotspotTemplates['Hotel'].length; i++) {
				if (hotspotTemplates['Hotel'][i]._hotel.logicBlock_visible) {
					hotspotTemplates['Hotel'][i]._hotel.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_mode_changenode = function(){
		if(hotspotTemplates['Mode']) {
			var i;
			for(i = 0; i < hotspotTemplates['Mode'].length; i++) {
				if (hotspotTemplates['Mode'][i]._mode.logicBlock_visible) {
					hotspotTemplates['Mode'][i]._mode.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_mode_varchanged_all_hotspots = function(){
		if(hotspotTemplates['Mode']) {
			var i;
			for(i = 0; i < hotspotTemplates['Mode'].length; i++) {
				if (hotspotTemplates['Mode'][i]._mode.logicBlock_visible) {
					hotspotTemplates['Mode'][i]._mode.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_mode_varchanged_hts_mode = function(){
		if(hotspotTemplates['Mode']) {
			var i;
			for(i = 0; i < hotspotTemplates['Mode'].length; i++) {
				if (hotspotTemplates['Mode'][i]._mode.logicBlock_visible) {
					hotspotTemplates['Mode'][i]._mode.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_floristik_changenode = function(){
		if(hotspotTemplates['Floristik']) {
			var i;
			for(i = 0; i < hotspotTemplates['Floristik'].length; i++) {
				if (hotspotTemplates['Floristik'][i]._floristik.logicBlock_visible) {
					hotspotTemplates['Floristik'][i]._floristik.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_floristik_varchanged_all_hotspots = function(){
		if(hotspotTemplates['Floristik']) {
			var i;
			for(i = 0; i < hotspotTemplates['Floristik'].length; i++) {
				if (hotspotTemplates['Floristik'][i]._floristik.logicBlock_visible) {
					hotspotTemplates['Floristik'][i]._floristik.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_floristik_varchanged_hts_floristik = function(){
		if(hotspotTemplates['Floristik']) {
			var i;
			for(i = 0; i < hotspotTemplates['Floristik'].length; i++) {
				if (hotspotTemplates['Floristik'][i]._floristik.logicBlock_visible) {
					hotspotTemplates['Floristik'][i]._floristik.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_businness_changenode = function(){
		if(hotspotTemplates['Businness']) {
			var i;
			for(i = 0; i < hotspotTemplates['Businness'].length; i++) {
				if (hotspotTemplates['Businness'][i]._businness.logicBlock_visible) {
					hotspotTemplates['Businness'][i]._businness.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_businness_varchanged_all_hotspots = function(){
		if(hotspotTemplates['Businness']) {
			var i;
			for(i = 0; i < hotspotTemplates['Businness'].length; i++) {
				if (hotspotTemplates['Businness'][i]._businness.logicBlock_visible) {
					hotspotTemplates['Businness'][i]._businness.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_businness_varchanged_hts_businness = function(){
		if(hotspotTemplates['Businness']) {
			var i;
			for(i = 0; i < hotspotTemplates['Businness'].length; i++) {
				if (hotspotTemplates['Businness'][i]._businness.logicBlock_visible) {
					hotspotTemplates['Businness'][i]._businness.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_freizeit_changenode = function(){
		if(hotspotTemplates['Freizeit']) {
			var i;
			for(i = 0; i < hotspotTemplates['Freizeit'].length; i++) {
				if (hotspotTemplates['Freizeit'][i]._freizeit.logicBlock_visible) {
					hotspotTemplates['Freizeit'][i]._freizeit.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_freizeit_varchanged_all_hotspots = function(){
		if(hotspotTemplates['Freizeit']) {
			var i;
			for(i = 0; i < hotspotTemplates['Freizeit'].length; i++) {
				if (hotspotTemplates['Freizeit'][i]._freizeit.logicBlock_visible) {
					hotspotTemplates['Freizeit'][i]._freizeit.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_freizeit_varchanged_hts_freizeit = function(){
		if(hotspotTemplates['Freizeit']) {
			var i;
			for(i = 0; i < hotspotTemplates['Freizeit'].length; i++) {
				if (hotspotTemplates['Freizeit'][i]._freizeit.logicBlock_visible) {
					hotspotTemplates['Freizeit'][i]._freizeit.logicBlock_visible();
				}
			}
		}
	}
	player.addListener('changenode', function() {
		me.ggUserdata=player.userdata;
	});
	me.skinTimerEvent=function() {
		me.ggCurrentTime=new Date().getTime();
	};
	player.addListener('timer', me.skinTimerEvent);
	function SkinHotspotClass_luftansicht(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._luftansicht=document.createElement('div');
		el.ggId="LuftAnsicht";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_hotspot hts-point";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._luftansicht.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._luftansicht.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('all_hotspots') == true)) && 
				((player.getVariableValue('hts_luftansicht') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._luftansicht.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._luftansicht.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._luftansicht.style[domTransition]='';
				if (me._luftansicht.ggCurrentLogicStateVisible == 0) {
					me._luftansicht.style.visibility=(Number(me._luftansicht.style.opacity)>0||!me._luftansicht.style.opacity)?'inherit':'hidden';
					me._luftansicht.ggVisible=true;
				}
				else {
					me._luftansicht.style.visibility="hidden";
					me._luftansicht.ggVisible=false;
				}
			}
		}
		me._luftansicht.onclick=function (e) {
			player.openNext(me.hotspot.url,"");
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._luftansicht.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._luftansicht.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._luftansicht.onmouseout=function (e) {
			player.setActiveHotspot(null);
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._luftansicht.ggUpdatePosition=function (useTransition) {
		}
		el=me._design12=document.createElement('div');
		els=me._design12__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="design";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text hts-point";
		el.ggType='text';
		hs ='';
		hs+='height : 70px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 60px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 60px;';
		hs+='height: 70px;';
		hs+='border: 0px solid #000000;';
		hs+='color: #000000;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="<div class=\'pin luftansicht\'><i class=\"fa-solid fa-helicopter\"><\/i><\/div><br\/><div class=\'pulse\'><\/div>";
		el.appendChild(els);
		me._design12.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._design12.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._luftansicht.appendChild(me._design12);
		me.__div = me._luftansicht;
	};
	function SkinHotspotClass_bar(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._bar=document.createElement('div');
		el.ggId="Bar";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_hotspot hts-point";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._bar.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._bar.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('all_hotspots') == true)) && 
				((player.getVariableValue('hts_bar') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._bar.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._bar.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._bar.style[domTransition]='';
				if (me._bar.ggCurrentLogicStateVisible == 0) {
					me._bar.style.visibility=(Number(me._bar.style.opacity)>0||!me._bar.style.opacity)?'inherit':'hidden';
					me._bar.ggVisible=true;
				}
				else {
					me._bar.style.visibility="hidden";
					me._bar.ggVisible=false;
				}
			}
		}
		me._bar.onclick=function (e) {
			player.setVariableValue('gallery', "");
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._bar.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._bar.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._bar.onmouseout=function (e) {
			player.setActiveHotspot(null);
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._bar.ggUpdatePosition=function (useTransition) {
		}
		el=me._design11=document.createElement('div');
		els=me._design11__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="design";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text hts-point";
		el.ggType='text';
		hs ='';
		hs+='height : 70px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 60px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 60px;';
		hs+='height: 70px;';
		hs+='border: 0px solid #000000;';
		hs+='color: #000000;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="<div class=\'pin bar\'><i class=\"fa-solid fa-martini-glass-citrus\"><\/i><\/div><br\/><div class=\'pulse\'><\/div>";
		el.appendChild(els);
		me._design11.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._design11.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._bar.appendChild(me._design11);
		me.__div = me._bar;
	};
	function SkinHotspotClass_streetview(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._streetview=document.createElement('div');
		el.ggId="StreetView";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_hotspot hts-point";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._streetview.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._streetview.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('all_hotspots') == true)) && 
				((player.getVariableValue('hts_streetview') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._streetview.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._streetview.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._streetview.style[domTransition]='';
				if (me._streetview.ggCurrentLogicStateVisible == 0) {
					me._streetview.style.visibility=(Number(me._streetview.style.opacity)>0||!me._streetview.style.opacity)?'inherit':'hidden';
					me._streetview.ggVisible=true;
				}
				else {
					me._streetview.style.visibility="hidden";
					me._streetview.ggVisible=false;
				}
			}
		}
		me._streetview.onclick=function (e) {
			player.setVariableValue('iframe', "");
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._streetview.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._streetview.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._streetview.onmouseout=function (e) {
			player.setActiveHotspot(null);
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._streetview.ggUpdatePosition=function (useTransition) {
		}
		el=me._design10=document.createElement('div');
		els=me._design10__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="design";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text hts-point";
		el.ggType='text';
		hs ='';
		hs+='height : 70px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 60px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 60px;';
		hs+='height: 70px;';
		hs+='border: 0px solid #000000;';
		hs+='color: #000000;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="<div class=\'pin streetview\'><i class=\"fa-solid fa-street-view\"><\/i><\/div><br\/><div class=\'pulse\'><\/div>";
		el.appendChild(els);
		me._design10.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._design10.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._streetview.appendChild(me._design10);
		me.__div = me._streetview;
	};
	function SkinHotspotClass_einkaufen(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._einkaufen=document.createElement('div');
		el.ggId="Einkaufen";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_hotspot hts-point";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._einkaufen.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._einkaufen.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('all_hotspots') == true)) && 
				((player.getVariableValue('hts_einkaufen') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._einkaufen.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._einkaufen.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._einkaufen.style[domTransition]='';
				if (me._einkaufen.ggCurrentLogicStateVisible == 0) {
					me._einkaufen.style.visibility=(Number(me._einkaufen.style.opacity)>0||!me._einkaufen.style.opacity)?'inherit':'hidden';
					me._einkaufen.ggVisible=true;
				}
				else {
					me._einkaufen.style.visibility="hidden";
					me._einkaufen.ggVisible=false;
				}
			}
		}
		me._einkaufen.onclick=function (e) {
			player.setVariableValue('video', "");
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._einkaufen.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._einkaufen.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._einkaufen.onmouseout=function (e) {
			player.setActiveHotspot(null);
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._einkaufen.ggUpdatePosition=function (useTransition) {
		}
		el=me._design9=document.createElement('div');
		els=me._design9__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="design";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text hts-point";
		el.ggType='text';
		hs ='';
		hs+='height : 70px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 60px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 60px;';
		hs+='height: 70px;';
		hs+='border: 0px solid #000000;';
		hs+='color: #000000;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="<div class=\'pin einkaufen\'><i class=\"fa-solid fa-cart-shopping\"><\/i><\/div><br\/><div class=\'pulse\'><\/div>";
		el.appendChild(els);
		me._design9.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._design9.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._einkaufen.appendChild(me._design9);
		me.__div = me._einkaufen;
	};
	function SkinHotspotClass_optiker(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._optiker=document.createElement('div');
		el.ggId="Optiker";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_hotspot hts-point";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._optiker.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._optiker.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('all_hotspots') == true)) && 
				((player.getVariableValue('hts_optiker') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._optiker.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._optiker.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._optiker.style[domTransition]='';
				if (me._optiker.ggCurrentLogicStateVisible == 0) {
					me._optiker.style.visibility=(Number(me._optiker.style.opacity)>0||!me._optiker.style.opacity)?'inherit':'hidden';
					me._optiker.ggVisible=true;
				}
				else {
					me._optiker.style.visibility="hidden";
					me._optiker.ggVisible=false;
				}
			}
		}
		me._optiker.onclick=function (e) {
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._optiker.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._optiker.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._optiker.onmouseout=function (e) {
			player.setActiveHotspot(null);
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._optiker.ggUpdatePosition=function (useTransition) {
		}
		el=me._design8=document.createElement('div');
		els=me._design8__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="design";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text hts-point";
		el.ggType='text';
		hs ='';
		hs+='height : 70px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 60px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 60px;';
		hs+='height: 70px;';
		hs+='border: 0px solid #000000;';
		hs+='color: #000000;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="<div class=\'pin optiker\'><i class=\"fa-solid fa-glasses\"><\/i><\/div><br\/><div class=\'pulse\'><\/div>";
		el.appendChild(els);
		me._design8.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._design8.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._optiker.appendChild(me._design8);
		me.__div = me._optiker;
	};
	function SkinHotspotClass_immobilien(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._immobilien=document.createElement('div');
		el.ggId="Immobilien";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_hotspot hts-point";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._immobilien.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._immobilien.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('all_hotspots') == true)) && 
				((player.getVariableValue('hts_immobilien') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._immobilien.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._immobilien.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._immobilien.style[domTransition]='';
				if (me._immobilien.ggCurrentLogicStateVisible == 0) {
					me._immobilien.style.visibility=(Number(me._immobilien.style.opacity)>0||!me._immobilien.style.opacity)?'inherit':'hidden';
					me._immobilien.ggVisible=true;
				}
				else {
					me._immobilien.style.visibility="hidden";
					me._immobilien.ggVisible=false;
				}
			}
		}
		me._immobilien.onclick=function (e) {
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._immobilien.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._immobilien.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._immobilien.onmouseout=function (e) {
			player.setActiveHotspot(null);
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._immobilien.ggUpdatePosition=function (useTransition) {
		}
		el=me._design7=document.createElement('div');
		els=me._design7__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="design";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text hts-point";
		el.ggType='text';
		hs ='';
		hs+='height : 70px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 60px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 60px;';
		hs+='height: 70px;';
		hs+='border: 0px solid #000000;';
		hs+='color: #000000;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="<div class=\'pin immobilien\'><i class=\"fa-solid fa-chart-line\"><\/i><\/div><br\/><div class=\'pulse\'><\/div>";
		el.appendChild(els);
		me._design7.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._design7.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._immobilien.appendChild(me._design7);
		me.__div = me._immobilien;
	};
	function SkinHotspotClass_strandbad(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._strandbad=document.createElement('div');
		el.ggId="Strandbad";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_hotspot hts-point";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._strandbad.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._strandbad.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('all_hotspots') == true)) && 
				((player.getVariableValue('hts_strandbad') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._strandbad.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._strandbad.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._strandbad.style[domTransition]='';
				if (me._strandbad.ggCurrentLogicStateVisible == 0) {
					me._strandbad.style.visibility=(Number(me._strandbad.style.opacity)>0||!me._strandbad.style.opacity)?'inherit':'hidden';
					me._strandbad.ggVisible=true;
				}
				else {
					me._strandbad.style.visibility="hidden";
					me._strandbad.ggVisible=false;
				}
			}
		}
		me._strandbad.onclick=function (e) {
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._strandbad.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._strandbad.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._strandbad.onmouseout=function (e) {
			player.setActiveHotspot(null);
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._strandbad.ggUpdatePosition=function (useTransition) {
		}
		el=me._design6=document.createElement('div');
		els=me._design6__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="design";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text hts-point";
		el.ggType='text';
		hs ='';
		hs+='height : 70px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 60px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 60px;';
		hs+='height: 70px;';
		hs+='border: 0px solid #000000;';
		hs+='color: #000000;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="<div class=\'pin strandbad\'><i class=\"fa-solid fa-person-swimming\"><\/i><\/div><br\/><div class=\'pulse\'><\/div>";
		el.appendChild(els);
		me._design6.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._design6.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._strandbad.appendChild(me._design6);
		me.__div = me._strandbad;
	};
	function SkinHotspotClass_restaurant(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._restaurant=document.createElement('div');
		el.ggId="Restaurant";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_hotspot hts-point";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._restaurant.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._restaurant.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('all_hotspots') == true)) && 
				((player.getVariableValue('hts_restaurant') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._restaurant.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._restaurant.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._restaurant.style[domTransition]='';
				if (me._restaurant.ggCurrentLogicStateVisible == 0) {
					me._restaurant.style.visibility=(Number(me._restaurant.style.opacity)>0||!me._restaurant.style.opacity)?'inherit':'hidden';
					me._restaurant.ggVisible=true;
				}
				else {
					me._restaurant.style.visibility="hidden";
					me._restaurant.ggVisible=false;
				}
			}
		}
		me._restaurant.onclick=function (e) {
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._restaurant.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._restaurant.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._restaurant.onmouseout=function (e) {
			player.setActiveHotspot(null);
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._restaurant.ggUpdatePosition=function (useTransition) {
		}
		el=me._design5=document.createElement('div');
		els=me._design5__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="design";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text hts-point";
		el.ggType='text';
		hs ='';
		hs+='height : 70px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 60px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 60px;';
		hs+='height: 70px;';
		hs+='border: 0px solid #000000;';
		hs+='color: #000000;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="<div class=\'pin restaurant\'><i class=\"fa-solid fa-utensils\"><\/i><\/div><br\/><div class=\'pulse\'><\/div>";
		el.appendChild(els);
		me._design5.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._design5.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._restaurant.appendChild(me._design5);
		me.__div = me._restaurant;
	};
	function SkinHotspotClass_cafe(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._cafe=document.createElement('div');
		el.ggId="Cafe";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_hotspot hts-point";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._cafe.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._cafe.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('all_hotspots') == true)) && 
				((player.getVariableValue('hts_cafe') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._cafe.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._cafe.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._cafe.style[domTransition]='';
				if (me._cafe.ggCurrentLogicStateVisible == 0) {
					me._cafe.style.visibility=(Number(me._cafe.style.opacity)>0||!me._cafe.style.opacity)?'inherit':'hidden';
					me._cafe.ggVisible=true;
				}
				else {
					me._cafe.style.visibility="hidden";
					me._cafe.ggVisible=false;
				}
			}
		}
		me._cafe.onclick=function (e) {
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._cafe.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._cafe.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._cafe.onmouseout=function (e) {
			player.setActiveHotspot(null);
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._cafe.ggUpdatePosition=function (useTransition) {
		}
		el=me._design4=document.createElement('div');
		els=me._design4__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="design";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text hts-point";
		el.ggType='text';
		hs ='';
		hs+='height : 70px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 60px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 60px;';
		hs+='height: 70px;';
		hs+='border: 0px solid #000000;';
		hs+='color: #000000;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="<div class=\'pin cafe\'><i class=\"fa-solid fa-mug-saucer\"><\/i><\/div><br\/><div class=\'pulse\'><\/div>";
		el.appendChild(els);
		me._design4.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._design4.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._cafe.appendChild(me._design4);
		me.__div = me._cafe;
	};
	function SkinHotspotClass_hotel(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._hotel=document.createElement('div');
		el.ggId="Hotel";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_hotspot hts-point";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._hotel.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._hotel.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('all_hotspots') == true)) && 
				((player.getVariableValue('hts_hotel') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._hotel.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._hotel.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._hotel.style[domTransition]='';
				if (me._hotel.ggCurrentLogicStateVisible == 0) {
					me._hotel.style.visibility=(Number(me._hotel.style.opacity)>0||!me._hotel.style.opacity)?'inherit':'hidden';
					me._hotel.ggVisible=true;
				}
				else {
					me._hotel.style.visibility="hidden";
					me._hotel.ggVisible=false;
				}
			}
		}
		me._hotel.onclick=function (e) {
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._hotel.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._hotel.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._hotel.onmouseout=function (e) {
			player.setActiveHotspot(null);
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._hotel.ggUpdatePosition=function (useTransition) {
		}
		el=me._design3=document.createElement('div');
		els=me._design3__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="design";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text hts-point";
		el.ggType='text';
		hs ='';
		hs+='height : 70px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 60px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 60px;';
		hs+='height: 70px;';
		hs+='border: 0px solid #000000;';
		hs+='color: #000000;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="<div class=\'pin hotel\'><i class=\"fa-solid fa-hotel\"><\/i><\/div><br\/><div class=\'pulse\'><\/div>";
		el.appendChild(els);
		me._design3.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._design3.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._hotel.appendChild(me._design3);
		me.__div = me._hotel;
	};
	function SkinHotspotClass_mode(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._mode=document.createElement('div');
		el.ggId="Mode";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_hotspot hts-point";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._mode.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._mode.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('all_hotspots') == true)) && 
				((player.getVariableValue('hts_mode') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._mode.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._mode.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._mode.style[domTransition]='';
				if (me._mode.ggCurrentLogicStateVisible == 0) {
					me._mode.style.visibility=(Number(me._mode.style.opacity)>0||!me._mode.style.opacity)?'inherit':'hidden';
					me._mode.ggVisible=true;
				}
				else {
					me._mode.style.visibility="hidden";
					me._mode.ggVisible=false;
				}
			}
		}
		me._mode.onclick=function (e) {
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._mode.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._mode.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._mode.onmouseout=function (e) {
			player.setActiveHotspot(null);
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._mode.ggUpdatePosition=function (useTransition) {
		}
		el=me._design2=document.createElement('div');
		els=me._design2__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="design";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text hts-point";
		el.ggType='text';
		hs ='';
		hs+='height : 70px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 60px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 60px;';
		hs+='height: 70px;';
		hs+='border: 0px solid #000000;';
		hs+='color: #000000;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="<div class=\'pin mode\'><i class=\"fa-solid fa-shirt\"><\/i><\/div><br\/><div class=\'pulse\'><\/div>";
		el.appendChild(els);
		me._design2.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._design2.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._mode.appendChild(me._design2);
		me.__div = me._mode;
	};
	function SkinHotspotClass_floristik(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._floristik=document.createElement('div');
		el.ggId="Floristik";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_hotspot hts-point";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._floristik.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._floristik.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('all_hotspots') == true)) && 
				((player.getVariableValue('hts_floristik') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._floristik.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._floristik.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._floristik.style[domTransition]='';
				if (me._floristik.ggCurrentLogicStateVisible == 0) {
					me._floristik.style.visibility=(Number(me._floristik.style.opacity)>0||!me._floristik.style.opacity)?'inherit':'hidden';
					me._floristik.ggVisible=true;
				}
				else {
					me._floristik.style.visibility="hidden";
					me._floristik.ggVisible=false;
				}
			}
		}
		me._floristik.onclick=function (e) {
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._floristik.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._floristik.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._floristik.onmouseout=function (e) {
			player.setActiveHotspot(null);
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._floristik.ggUpdatePosition=function (useTransition) {
		}
		el=me._design1=document.createElement('div');
		els=me._design1__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="design";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text hts-point";
		el.ggType='text';
		hs ='';
		hs+='height : 70px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 60px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 60px;';
		hs+='height: 70px;';
		hs+='border: 0px solid #000000;';
		hs+='color: #000000;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="<div class=\'pin floristik\'><i class=\"fa-solid fa-seedling\"><\/i><\/div><br\/><div class=\'pulse\'><\/div>";
		el.appendChild(els);
		me._design1.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._design1.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._floristik.appendChild(me._design1);
		me.__div = me._floristik;
	};
	function SkinHotspotClass_businness(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._businness=document.createElement('div');
		el.ggId="Businness";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_hotspot hts-point";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._businness.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._businness.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('all_hotspots') == true)) && 
				((player.getVariableValue('hts_businness') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._businness.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._businness.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._businness.style[domTransition]='';
				if (me._businness.ggCurrentLogicStateVisible == 0) {
					me._businness.style.visibility=(Number(me._businness.style.opacity)>0||!me._businness.style.opacity)?'inherit':'hidden';
					me._businness.ggVisible=true;
				}
				else {
					me._businness.style.visibility="hidden";
					me._businness.ggVisible=false;
				}
			}
		}
		me._businness.onclick=function (e) {
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._businness.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._businness.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._businness.onmouseout=function (e) {
			player.setActiveHotspot(null);
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._businness.ggUpdatePosition=function (useTransition) {
		}
		el=me._design0=document.createElement('div');
		els=me._design0__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="design";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text hts-point";
		el.ggType='text';
		hs ='';
		hs+='height : 70px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 60px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 60px;';
		hs+='height: 70px;';
		hs+='border: 0px solid #000000;';
		hs+='color: #000000;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="<div class=\'pin businness\'><i class=\"fa-solid fa-store\"><\/i><\/div><br\/><div class=\'pulse\'><\/div>";
		el.appendChild(els);
		me._design0.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._design0.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._businness.appendChild(me._design0);
		me.__div = me._businness;
	};
	function SkinHotspotClass_freizeit(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._freizeit=document.createElement('div');
		el.ggId="Freizeit";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._freizeit.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._freizeit.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('all_hotspots') == true)) && 
				((player.getVariableValue('hts_freizeit') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._freizeit.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._freizeit.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._freizeit.style[domTransition]='';
				if (me._freizeit.ggCurrentLogicStateVisible == 0) {
					me._freizeit.style.visibility=(Number(me._freizeit.style.opacity)>0||!me._freizeit.style.opacity)?'inherit':'hidden';
					me._freizeit.ggVisible=true;
				}
				else {
					me._freizeit.style.visibility="hidden";
					me._freizeit.ggVisible=false;
				}
			}
		}
		me._freizeit.onclick=function (e) {
			player.setVariableValue('gallery', me.hotspot.description);
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._freizeit.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._freizeit.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._freizeit.onmouseout=function (e) {
			player.setActiveHotspot(null);
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._freizeit.ggUpdatePosition=function (useTransition) {
		}
		el=me._design=document.createElement('div');
		els=me._design__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="design";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text hts-point";
		el.ggType='text';
		hs ='';
		hs+='height : 70px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 60px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 60px;';
		hs+='height: 70px;';
		hs+='border: 0px solid #000000;';
		hs+='color: #000000;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="<div class=\'pin freizeit\'><i class=\"fa-solid fa-camera\"><\/i><\/div><br\/><div class=\'pulse\'><\/div>";
		el.appendChild(els);
		me._design.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._design.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._freizeit.appendChild(me._design);
		me.__div = me._freizeit;
	};
	me.addSkinHotspot=function(hotspot) {
		var hsinst = null;
		if (hotspot.skinid=='LuftAnsicht') {
			hotspot.skinid = 'LuftAnsicht';
			hsinst = new SkinHotspotClass_luftansicht(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_luftansicht_changenode();;
			me.callChildLogicBlocksHotspot_luftansicht_varchanged_all_hotspots();;
			me.callChildLogicBlocksHotspot_luftansicht_varchanged_hts_luftansicht();;
		} else
		if (hotspot.skinid=='Bar') {
			hotspot.skinid = 'Bar';
			hsinst = new SkinHotspotClass_bar(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_bar_changenode();;
			me.callChildLogicBlocksHotspot_bar_varchanged_all_hotspots();;
			me.callChildLogicBlocksHotspot_bar_varchanged_hts_bar();;
		} else
		if (hotspot.skinid=='StreetView') {
			hotspot.skinid = 'StreetView';
			hsinst = new SkinHotspotClass_streetview(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_streetview_changenode();;
			me.callChildLogicBlocksHotspot_streetview_varchanged_all_hotspots();;
			me.callChildLogicBlocksHotspot_streetview_varchanged_hts_streetview();;
		} else
		if (hotspot.skinid=='Einkaufen') {
			hotspot.skinid = 'Einkaufen';
			hsinst = new SkinHotspotClass_einkaufen(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_einkaufen_changenode();;
			me.callChildLogicBlocksHotspot_einkaufen_varchanged_all_hotspots();;
			me.callChildLogicBlocksHotspot_einkaufen_varchanged_hts_einkaufen();;
		} else
		if (hotspot.skinid=='Optiker') {
			hotspot.skinid = 'Optiker';
			hsinst = new SkinHotspotClass_optiker(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_optiker_changenode();;
			me.callChildLogicBlocksHotspot_optiker_varchanged_all_hotspots();;
			me.callChildLogicBlocksHotspot_optiker_varchanged_hts_optiker();;
		} else
		if (hotspot.skinid=='Immobilien') {
			hotspot.skinid = 'Immobilien';
			hsinst = new SkinHotspotClass_immobilien(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_immobilien_changenode();;
			me.callChildLogicBlocksHotspot_immobilien_varchanged_all_hotspots();;
			me.callChildLogicBlocksHotspot_immobilien_varchanged_hts_immobilien();;
		} else
		if (hotspot.skinid=='Strandbad') {
			hotspot.skinid = 'Strandbad';
			hsinst = new SkinHotspotClass_strandbad(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_strandbad_changenode();;
			me.callChildLogicBlocksHotspot_strandbad_varchanged_all_hotspots();;
			me.callChildLogicBlocksHotspot_strandbad_varchanged_hts_strandbad();;
		} else
		if (hotspot.skinid=='Restaurant') {
			hotspot.skinid = 'Restaurant';
			hsinst = new SkinHotspotClass_restaurant(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_restaurant_changenode();;
			me.callChildLogicBlocksHotspot_restaurant_varchanged_all_hotspots();;
			me.callChildLogicBlocksHotspot_restaurant_varchanged_hts_restaurant();;
		} else
		if (hotspot.skinid=='Cafe') {
			hotspot.skinid = 'Cafe';
			hsinst = new SkinHotspotClass_cafe(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_cafe_changenode();;
			me.callChildLogicBlocksHotspot_cafe_varchanged_all_hotspots();;
			me.callChildLogicBlocksHotspot_cafe_varchanged_hts_cafe();;
		} else
		if (hotspot.skinid=='Hotel') {
			hotspot.skinid = 'Hotel';
			hsinst = new SkinHotspotClass_hotel(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_hotel_changenode();;
			me.callChildLogicBlocksHotspot_hotel_varchanged_all_hotspots();;
			me.callChildLogicBlocksHotspot_hotel_varchanged_hts_hotel();;
		} else
		if (hotspot.skinid=='Mode') {
			hotspot.skinid = 'Mode';
			hsinst = new SkinHotspotClass_mode(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_mode_changenode();;
			me.callChildLogicBlocksHotspot_mode_varchanged_all_hotspots();;
			me.callChildLogicBlocksHotspot_mode_varchanged_hts_mode();;
		} else
		if (hotspot.skinid=='Floristik') {
			hotspot.skinid = 'Floristik';
			hsinst = new SkinHotspotClass_floristik(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_floristik_changenode();;
			me.callChildLogicBlocksHotspot_floristik_varchanged_all_hotspots();;
			me.callChildLogicBlocksHotspot_floristik_varchanged_hts_floristik();;
		} else
		if (hotspot.skinid=='Businness') {
			hotspot.skinid = 'Businness';
			hsinst = new SkinHotspotClass_businness(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_businness_changenode();;
			me.callChildLogicBlocksHotspot_businness_varchanged_all_hotspots();;
			me.callChildLogicBlocksHotspot_businness_varchanged_hts_businness();;
		} else
		{
			hotspot.skinid = 'Freizeit';
			hsinst = new SkinHotspotClass_freizeit(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_freizeit_changenode();;
			me.callChildLogicBlocksHotspot_freizeit_varchanged_all_hotspots();;
			me.callChildLogicBlocksHotspot_freizeit_varchanged_hts_freizeit();;
		}
		return hsinst;
	}
	me.removeSkinHotspots=function() {
		if(hotspotTemplates['LuftAnsicht']) {
			var i;
			for(i = 0; i < hotspotTemplates['LuftAnsicht'].length; i++) {
				hotspotTemplates['LuftAnsicht'][i] = null;
			}
		}
		if(hotspotTemplates['Bar']) {
			var i;
			for(i = 0; i < hotspotTemplates['Bar'].length; i++) {
				hotspotTemplates['Bar'][i] = null;
			}
		}
		if(hotspotTemplates['StreetView']) {
			var i;
			for(i = 0; i < hotspotTemplates['StreetView'].length; i++) {
				hotspotTemplates['StreetView'][i] = null;
			}
		}
		if(hotspotTemplates['Einkaufen']) {
			var i;
			for(i = 0; i < hotspotTemplates['Einkaufen'].length; i++) {
				hotspotTemplates['Einkaufen'][i] = null;
			}
		}
		if(hotspotTemplates['Optiker']) {
			var i;
			for(i = 0; i < hotspotTemplates['Optiker'].length; i++) {
				hotspotTemplates['Optiker'][i] = null;
			}
		}
		if(hotspotTemplates['Immobilien']) {
			var i;
			for(i = 0; i < hotspotTemplates['Immobilien'].length; i++) {
				hotspotTemplates['Immobilien'][i] = null;
			}
		}
		if(hotspotTemplates['Strandbad']) {
			var i;
			for(i = 0; i < hotspotTemplates['Strandbad'].length; i++) {
				hotspotTemplates['Strandbad'][i] = null;
			}
		}
		if(hotspotTemplates['Restaurant']) {
			var i;
			for(i = 0; i < hotspotTemplates['Restaurant'].length; i++) {
				hotspotTemplates['Restaurant'][i] = null;
			}
		}
		if(hotspotTemplates['Cafe']) {
			var i;
			for(i = 0; i < hotspotTemplates['Cafe'].length; i++) {
				hotspotTemplates['Cafe'][i] = null;
			}
		}
		if(hotspotTemplates['Hotel']) {
			var i;
			for(i = 0; i < hotspotTemplates['Hotel'].length; i++) {
				hotspotTemplates['Hotel'][i] = null;
			}
		}
		if(hotspotTemplates['Mode']) {
			var i;
			for(i = 0; i < hotspotTemplates['Mode'].length; i++) {
				hotspotTemplates['Mode'][i] = null;
			}
		}
		if(hotspotTemplates['Floristik']) {
			var i;
			for(i = 0; i < hotspotTemplates['Floristik'].length; i++) {
				hotspotTemplates['Floristik'][i] = null;
			}
		}
		if(hotspotTemplates['Businness']) {
			var i;
			for(i = 0; i < hotspotTemplates['Businness'].length; i++) {
				hotspotTemplates['Businness'][i] = null;
			}
		}
		if(hotspotTemplates['Freizeit']) {
			var i;
			for(i = 0; i < hotspotTemplates['Freizeit'].length; i++) {
				hotspotTemplates['Freizeit'][i] = null;
			}
		}
		hotspotTemplates = [];
	}
	function SkinCloner_thumbnail_cloner_Class(nodeId, parentScope,ggParent,parameter) {
		var me=this;
		var hs='';
		me.parentScope=parentScope;
		me.ggParent=ggParent;
		me.findElements=skin.findElements;
		me.ggIndex=parameter.index;
		me.ggNodeId=nodeId;
		me.ggTitle=parameter.title;
		me.ggUserdata=skin.player.getNodeUserdata(me.ggNodeId);
		me.elementMouseDown={};
		me.elementMouseOver={};
		me.__div=document.createElement('div');
		me.__div.setAttribute('style','position: absolute;width: 96px; height: 62px; visibility: inherit; overflow: visible;');
		me.__div.style.left=parameter.left;
		me.__div.style.top=parameter.top;
		me.__div.style.width=parameter.width;
		me.__div.style.height=parameter.height;
		me.__div.ggIsActive = function() {
			return player.getCurrentNode()==me.ggNodeId;
		}
		me.__div.ggElementNodeId=function() {
			return me.ggNodeId;
		}
		el=me._thumbnail_nodeimage=document.createElement('div');
		els=me._thumbnail_nodeimage__img=document.createElement('img');
		els.className='ggskin ggskin_nodeimage';
		els.setAttribute('src',basePath + "images/thumbnail_nodeimage_" + nodeId + ".jpg");
		el.ggNodeId=nodeId;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_nodeimage';
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="thumbnail_nodeImage";
		el.ggParameter={ rx:0,ry:0,a:0,sx:0.62,sy:0.58 };
		el.ggVisible=true;
		el.className="ggskin ggskin_nodeimage ";
		el.ggType='nodeimage';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 90px;';
		hs+='left : -24px;';
		hs+='position : absolute;';
		hs+='top : -16px;';
		hs+='visibility : inherit;';
		hs+='width : 140px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		el.style[domTransform]=parameterToTransform(el.ggParameter);
		me._thumbnail_nodeimage.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			return this.ggNodeId;
		}
		me._thumbnail_nodeimage.ggUpdatePosition=function (useTransition) {
		}
		me.__div.appendChild(me._thumbnail_nodeimage);
		el=me._thumbnail_active=document.createElement('div');
		el.ggId="thumbnail_active";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='border : 3px solid #d1d1d1;';
		hs+='cursor : pointer;';
		hs+='height : 51px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 85px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._thumbnail_active.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._thumbnail_active.logicBlock_bordercolor = function() {
			var newLogicStateBorderColor;
			if (
				((me._thumbnail_active.ggIsActive() == true))
			)
			{
				newLogicStateBorderColor = 0;
			}
			else if (
				((me.elementMouseOver['thumbnail_active'] == true))
			)
			{
				newLogicStateBorderColor = 1;
			}
			else {
				newLogicStateBorderColor = -1;
			}
			if (me._thumbnail_active.ggCurrentLogicStateBorderColor != newLogicStateBorderColor) {
				me._thumbnail_active.ggCurrentLogicStateBorderColor = newLogicStateBorderColor;
				me._thumbnail_active.style[domTransition]='border-color 0s';
				if (me._thumbnail_active.ggCurrentLogicStateBorderColor == 0) {
					me._thumbnail_active.style.borderColor="rgba(255,255,255,1)";
				}
				else if (me._thumbnail_active.ggCurrentLogicStateBorderColor == 1) {
					me._thumbnail_active.style.borderColor="rgba(255,255,255,1)";
				}
				else {
					me._thumbnail_active.style.borderColor="rgba(209,209,209,1)";
				}
			}
		}
		me._thumbnail_active.onclick=function (e) {
			if (
				(
					((me._thumbnail_active.ggIsActive() == false))
				)
			) {
				player.openNext("{"+me.ggNodeId+"}","");
			}
		}
		me._thumbnail_active.onmouseover=function (e) {
			me.elementMouseOver['thumbnail_active']=true;
			me._thumbnail_title.logicBlock_alpha();
			me._checkmark_tick.logicBlock_alpha();
			me._thumbnail_active.logicBlock_bordercolor();
		}
		me._thumbnail_active.onmouseout=function (e) {
			me.elementMouseOver['thumbnail_active']=false;
			me._thumbnail_title.logicBlock_alpha();
			me._checkmark_tick.logicBlock_alpha();
			me._thumbnail_active.logicBlock_bordercolor();
		}
		me._thumbnail_active.ontouchend=function (e) {
			me.elementMouseOver['thumbnail_active']=false;
			me._thumbnail_title.logicBlock_alpha();
			me._checkmark_tick.logicBlock_alpha();
			me._thumbnail_active.logicBlock_bordercolor();
		}
		me._thumbnail_active.ggUpdatePosition=function (useTransition) {
		}
		el=me._thumbnail_title=document.createElement('div');
		els=me._thumbnail_title__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="thumbnail_title";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 51px;';
		hs+='left : -10000px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 85px;';
		hs+='pointer-events:auto;';
		hs+='text-shadow: 1px 1px 2px #000000;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 85px;';
		hs+='height: 51px;';
		hs+='background: #000000;';
		hs+='background: rgba(0,0,0,0.392157);';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=me.ggUserdata.title;
		el.appendChild(els);
		me._thumbnail_title.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._thumbnail_title.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['thumbnail_active'] == true)) && 
				((me.ggUserdata.title != "")) && 
				((player.getVariableValue('opt_thumbnail_menu_tooltip') == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._thumbnail_title.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._thumbnail_title.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._thumbnail_title.style[domTransition]='opacity 500ms ease 0ms';
				if (me._thumbnail_title.ggCurrentLogicStateAlpha == 0) {
					me._thumbnail_title.style.visibility=me._thumbnail_title.ggVisible?'inherit':'hidden';
					me._thumbnail_title.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._thumbnail_title.style.opacity == 0.0) { me._thumbnail_title.style.visibility="hidden"; } }, 505);
					me._thumbnail_title.style.opacity=0;
				}
			}
		}
		me._thumbnail_title.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._thumbnail_active.appendChild(me._thumbnail_title);
		el=me._checkmark_tick=document.createElement('div');
		els=me._checkmark_tick__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zOmk9Imh0dHA6Ly9ucy5hZG9iZS5jb20vQWRvYmVJbGx1c3RyYXRvci8xMC4wLyIgeG1sbnM6Z3JhcGg9Imh0dHA6Ly9ucy5hZG9iZS5jb20vR3JhcGhzLzEuMC8iIG'+
			'hlaWdodD0iMzJweCIgd2lkdGg9IjMycHgiIHhtbG5zOmE9Imh0dHA6Ly9ucy5hZG9iZS5jb20vQWRvYmVTVkdWaWV3ZXJFeHRlbnNpb25zLzMuMC8iIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eD0iaHR0cDovL25zLmFkb2JlLmNvbS9FeHRlbnNpYmlsaXR5LzEuMC8iIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgLTM3MjIgLTI2MDYgMzIgMzIiIHhtbDpzcGFjZT0icHJlc2VydmUiIHk9IjBweCIgdmlld0JveD0iLTM3MjIgLTI2MDYgMzIgMzIiIHZlcnNpb249IjEuMSI+CiA8'+
			'ZyBpZD0iTGF5ZXJfMSIvPgogPGcgaWQ9IkViZW5lXzEiLz4KIDxnIGlkPSJMYXllcl8yIj4KICA8Zz4KICAgPGc+CiAgICA8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNLTM2OTUuNDczLTI1OTguMTQ2Yy0wLjUxOS0wLjUxOS0xLjM2MS0wLjUxOS0xLjg3OSwwbC04Ljc4Nyw4Ljc4N2wtMi4yOTEtMi4yNDMmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjLTAuNTI1LTAuNTEzLTEuMzY2LTAuNTA0LTEuODgsMC4wMmMtMC41MTMsMC41MjUtMC41MDQsMS4zNjcsMC4wMjEsMS44OGwzLjIzLDMuMTYzYzAuMjU5LDAuMjUzLDAuNTk0LDAuMzc5LDAuOTMsMC4zNzkmI3hkOyYjeGE7JiN4OTsmI3'+
			'g5OyYjeDk7JiN4OTtjMC4zNCwwLDAuNjgtMC4xMywwLjk0LTAuMzlsOS43MTctOS43MTdDLTM2OTQuOTU0LTI1OTYuNzg1LTM2OTQuOTU0LTI1OTcuNjI2LTM2OTUuNDczLTI1OTguMTQ2eiIvPgogICAgPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTS0zNjk5Ljk2LTI1ODMuODM3aC0xMi4zMjV2LTEyLjMyNmgxMS44MjFsMi4yNTItMi4yNTJjLTAuMTY2LTAuMDg2LTAuMzUyLTAuMTQxLTAuNTUyLTAuMTQxaC0xNC43MTgmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjLTAuNjYxLDAtMS4xOTYsMC41MzYtMS4xOTYsMS4xOTZ2MTQuNzE5YzAsMC42NiwwLjUzNSwxLjE5NiwxLjE5NiwxLjE5'+
			'NmgxNC43MThjMC42NjEsMCwxLjE5Ny0wLjUzNiwxLjE5Ny0xLjE5NnYtMTAuNDAzJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7bC0yLjM5MywyLjM5M1YtMjU4My44Mzd6Ii8+CiAgIDwvZz4KICAgPGcgb3BhY2l0eT0iMC40IiBhOmFkb2JlLWJsZW5kaW5nLW1vZGU9Im11bHRpcGx5Ij4KICAgIDxwYXRoIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGE6YWRvYmUtYmxlbmRpbmctbW9kZT0ibm9ybWFsIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjEuNSIgZD0iJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7TS0zNjk1LjQ3My0yNTk4LjE0NmMtMC41MTktMC41MTktMS4zNjEtMC'+
			'41MTktMS44NzksMGwtOC43ODcsOC43ODdsLTIuMjkxLTIuMjQzYy0wLjUyNS0wLjUxMy0xLjM2Ni0wLjUwNC0xLjg4LDAuMDImI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjLTAuNTEzLDAuNTI1LTAuNTA0LDEuMzY3LDAuMDIxLDEuODhsMy4yMywzLjE2M2MwLjI1OSwwLjI1MywwLjU5NCwwLjM3OSwwLjkzLDAuMzc5YzAuMzQsMCwwLjY4LTAuMTMsMC45NC0wLjM5bDkuNzE3LTkuNzE3JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7Qy0zNjk0Ljk1NC0yNTk2Ljc4NS0zNjk0Ljk1NC0yNTk3LjYyNi0zNjk1LjQ3My0yNTk4LjE0NnoiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ry'+
			'b2tlPSIjMUExNzFCIi8+CiAgICA8cGF0aCBzdHJva2UtbGluZWpvaW49InJvdW5kIiBhOmFkb2JlLWJsZW5kaW5nLW1vZGU9Im5vcm1hbCIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxLjUiIGQ9IiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O00tMzY5OS45Ni0yNTgzLjgzN2gtMTIuMzI1di0xMi4zMjZoMTEuODIxbDIuMjUyLTIuMjUyYy0wLjE2Ni0wLjA4Ni0wLjM1Mi0wLjE0MS0wLjU1Mi0wLjE0MWgtMTQuNzE4JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7Yy0wLjY2MSwwLTEuMTk2LDAuNTM2LTEuMTk2LDEuMTk2djE0LjcxOWMwLDAuNjYsMC41MzUsMS4xOTYsMS4xOT'+
			'YsMS4xOTZoMTQuNzE4YzAuNjYxLDAsMS4xOTctMC41MzYsMS4xOTctMS4xOTZ2LTEwLjQwMyYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2wtMi4zOTMsMi4zOTNWLTI1ODMuODM3eiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2U9IiMxQTE3MUIiLz4KICAgPC9nPgogICA8Zz4KICAgIDxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0tMzY5NS40NzMtMjU5OC4xNDZjLTAuNTE5LTAuNTE5LTEuMzYxLTAuNTE5LTEuODc5LDBsLTguNzg3LDguNzg3bC0yLjI5MS0yLjI0MyYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MtMC41MjUtMC41MTMtMS4zNjYtMC41MDQtMS44OCwwLjAy'+
			'Yy0wLjUxMywwLjUyNS0wLjUwNCwxLjM2NywwLjAyMSwxLjg4bDMuMjMsMy4xNjNjMC4yNTksMC4yNTMsMC41OTQsMC4zNzksMC45MywwLjM3OSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MwLjM0LDAsMC42OC0wLjEzLDAuOTQtMC4zOWw5LjcxNy05LjcxN0MtMzY5NC45NTQtMjU5Ni43ODUtMzY5NC45NTQtMjU5Ny42MjYtMzY5NS40NzMtMjU5OC4xNDZ6Ii8+CiAgICA8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNLTM2OTkuOTYtMjU4My44MzdoLTEyLjMyNXYtMTIuMzI2aDExLjgyMWwyLjI1Mi0yLjI1MmMtMC4xNjYtMC4wODYtMC4zNTItMC4xNDEtMC41NTItMC4xNDFoLTE0LjcxOC'+
			'YjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MtMC42NjEsMC0xLjE5NiwwLjUzNi0xLjE5NiwxLjE5NnYxNC43MTljMCwwLjY2LDAuNTM1LDEuMTk2LDEuMTk2LDEuMTk2aDE0LjcxOGMwLjY2MSwwLDEuMTk3LTAuNTM2LDEuMTk3LTEuMTk2di0xMC40MDMmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtsLTIuMzkzLDIuMzkzVi0yNTgzLjgzN3oiLz4KICAgPC9nPgogICA8Zz4KICAgIDxwYXRoIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGZpbGw9Im5vbmUiIHN0cm9rZS13aWR0aD0iMC4yIiBkPSJNLTM2OTUuNDczLTI1OTguMTQ2JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7'+
			'Yy0wLjUxOS0wLjUxOS0xLjM2MS0wLjUxOS0xLjg3OSwwbC04Ljc4Nyw4Ljc4N2wtMi4yOTEtMi4yNDNjLTAuNTI1LTAuNTEzLTEuMzY2LTAuNTA0LTEuODgsMC4wMiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MtMC41MTMsMC41MjUtMC41MDQsMS4zNjcsMC4wMjEsMS44OGwzLjIzLDMuMTYzYzAuMjU5LDAuMjUzLDAuNTk0LDAuMzc5LDAuOTMsMC4zNzljMC4zNCwwLDAuNjgtMC4xMywwLjk0LTAuMzlsOS43MTctOS43MTcmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtDLTM2OTQuOTU0LTI1OTYuNzg1LTM2OTQuOTU0LTI1OTcuNjI2LTM2OTUuNDczLTI1OTguMTQ2eiIgc3Ryb2'+
			'tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2U9IiMxQTE3MUIiLz4KICAgIDxwYXRoIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGZpbGw9Im5vbmUiIHN0cm9rZS13aWR0aD0iMC4yIiBkPSJNLTM2OTkuOTYtMjU4My44MzcmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtoLTEyLjMyNXYtMTIuMzI2aDExLjgyMWwyLjI1Mi0yLjI1MmMtMC4xNjYtMC4wODYtMC4zNTItMC4xNDEtMC41NTItMC4xNDFoLTE0LjcxOGMtMC42NjEsMC0xLjE5NiwwLjUzNi0xLjE5NiwxLjE5NnYxNC43MTkmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjMCwwLjY2LDAuNTM1LDEuMTk2LDEuMTk2LDEuMTk2aDE0'+
			'LjcxOGMwLjY2MSwwLDEuMTk3LTAuNTM2LDEuMTk3LTEuMTk2di0xMC40MDNsLTIuMzkzLDIuMzkzVi0yNTgzLjgzN3oiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlPSIjMUExNzFCIi8+CiAgIDwvZz4KICA8L2c+CiA8L2c+Cjwvc3ZnPgo=';
		me._checkmark_tick__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="checkmark_tick";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 24px;';
		hs+='position : absolute;';
		hs+='right : -1px;';
		hs+='top : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 24px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._checkmark_tick.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._checkmark_tick.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.nodeVisited(me._checkmark_tick.ggElementNodeId()) == true)) || 
				((me._checkmark_tick.ggIsActive() == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._checkmark_tick.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._checkmark_tick.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._checkmark_tick.style[domTransition]='opacity 500ms ease 0ms';
				if (me._checkmark_tick.ggCurrentLogicStateVisible == 0) {
					me._checkmark_tick.style.visibility=(Number(me._checkmark_tick.style.opacity)>0||!me._checkmark_tick.style.opacity)?'inherit':'hidden';
					me._checkmark_tick.ggVisible=true;
				}
				else {
					me._checkmark_tick.style.visibility="hidden";
					me._checkmark_tick.ggVisible=false;
				}
			}
		}
		me._checkmark_tick.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['thumbnail_active'] == true)) && 
				((me.ggUserdata.title != ""))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._checkmark_tick.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._checkmark_tick.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._checkmark_tick.style[domTransition]='opacity 500ms ease 0ms';
				if (me._checkmark_tick.ggCurrentLogicStateAlpha == 0) {
					setTimeout(function() { if (me._checkmark_tick.style.opacity == 0.0) { me._checkmark_tick.style.visibility="hidden"; } }, 505);
					me._checkmark_tick.style.opacity=0;
				}
				else {
					me._checkmark_tick.style.visibility=me._checkmark_tick.ggVisible?'inherit':'hidden';
					me._checkmark_tick.style.opacity=1;
				}
			}
		}
		me._checkmark_tick.ggUpdatePosition=function (useTransition) {
		}
		me._thumbnail_active.appendChild(me._checkmark_tick);
		me.__div.appendChild(me._thumbnail_active);
	};
	me.addSkin();
	var style = document.createElement('style');
	style.type = 'text/css';
	style.appendChild(document.createTextNode('.hts-title,.pin i{position:absolute!important}.ggskin{font-family:Verdana,Arial,Helvetica,sans-serif;font-size:14px}.hts-point,.hts-point>div{width:80px!important;height:80px!important}.hts-title{top:50%!important;left:50%!important;transform:translate(-50%,-50%)!important;background:red!important;padding:2px 6px!important;border-radius:6px!important;color:#fff!important;margin-top:-32px!important}.pin{width:30px;height:30px;border-radius:50% 50% 50% 0;background:#89849b;position:absolute;transform:rotate(-45deg);left:50%;top:50%;margin:-20px 0 0 -20px;-webkit-animation-name:bounce;animation-name:bounce;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:1s;animation-duration:1s;cursor:pointer}.pin.luftansicht{background:#6c54a8}.pin.luftansicht i{color:#6c54a8}.pin.bar{background:#00855d}.pin.bar i{color:#00855d}.pin.streetview{background:orange}.pin.streetview i{color:orange}.pin.einkaufen{background:#d01a00}.pin.einkaufen i{color:#d01a00}.pin.optiker{background:#3c84aa}.pin.optiker i{color:#3c84aa}.pin.immobilien{background:#759643}.pin.immobilien i{color:#759643}.pin.strandbad{background:#4C8BF5}.pin.strandbad i{color:#4C8BF5}.pin.restaurant{background:#ef923f}.pin.restaurant i{color:#ef923f}.pin.cafe{background:#b856b6}.pin.cafe i{color:#b856b6}.pin.hotel{background:#aacc64}.pin.hotel i{color:#aacc64}.pin.mode{background:#6c54a8}.pin.mode i{color:#6c54a8}.pin.floristik{background:#f8b30d}.pin.floristik i{color:#f8b30d}.pin.businness{background:#4C8BF5}.pin.businness i{color:#4C8BF5}.pin.freizeit{background:#d01a00}.pin.freizeit i{color:#d01a00}.pin i{top:50%!important;left:50%!important;transform:translate(-50%,-50%) rotate(45deg)!important;z-index:2!important;margin-top:-2px!important;margin-left:2px!important}.pin span,.pulse{top:50%;position:absolute}.pin span{left:50%;transform:translateX(-50%) rotate(45deg);margin:-30px 0 0;width:auto}.pin:after{content:"";width:24px;height:24px;margin:-2px 0 0 2px;background:#fff;position:absolute;border-radius:50%;top:50%;left:50%;transform:translate(-50%,-50%)}.pulse{background:rgba(0,0,0,.2);border-radius:50%;height:14px;width:14px;left:50%;margin:9px 0 0 -12px;transform:rotateX(55deg);z-index:-2}.pulse:after{content:"";border-radius:50%;height:40px;width:40px;position:absolute;margin:-10px 0 0 -20px;-webkit-animation:pulsate 1s ease-out;animation:pulsate 1s ease-out;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite;opacity:0;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";filter:alpha(opacity=0);box-shadow:0 0 1px 2px #89849b;-webkit-animation-delay:1.1s;animation-delay:1.1s}@-webkit-keyframes pulsate{0%{transform:scale(.1,.1);opacity:0;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";filter:alpha(opacity=0)}50%{opacity:1;-ms-filter:none;-webkit-filter:none;filter:none}100%{transform:scale(1.2,1.2);opacity:0;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";filter:alpha(opacity=0)}}@keyframes pulsate{0%{transform:scale(.1,.1);opacity:0;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";filter:alpha(opacity=0)}50%{opacity:1;-ms-filter:none;-webkit-filter:none;filter:none}100%{transform:scale(1.2,1.2);opacity:0;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";filter:alpha(opacity=0)}}@-webkit-keyframes bounce{0%{opacity:0;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";filter:alpha(opacity=0);transform:translateY(-2000px) rotate(-45deg)}60%{opacity:1;-ms-filter:none;-webkit-filter:none;filter:none;transform:translateY(30px) rotate(-45deg)}80%{transform:tran'));
	document.head.appendChild(style);
	me._tt_thumbnail_open.logicBlock_text();
	me._tt_thumbnail_open.logicBlock_position();
	me._thumbnail_menu.logicBlock_position();
	player.addListener('changenode', function(args) { me._tt_thumbnail_open.logicBlock_text(); });
	player.addListener('configloaded', function(args) { me._tt_thumbnail_open.logicBlock_position();me._thumbnail_menu.logicBlock_position(); });
	player.addListener('hastouch', function(args) { me._tt_thumbnail_open.logicBlock_position();me._thumbnail_menu.logicBlock_position(); });
	player.addListener('varchanged_vis_thumbnail_menu', function(args) { me._tt_thumbnail_open.logicBlock_text(); });
	player.addListener('changenode', function(args) { me._thumbnail_cloner.callChildLogicBlocks_changenode(); });
	player.addListener('mouseover', function(args) { me._thumbnail_cloner.callChildLogicBlocks_mouseover(); });
	player.addListener('mouseover', function(args) { me._thumbnail_cloner.callChildLogicBlocks_mouseover(); });
	player.addListener('changenode', function(args) { me._thumbnail_cloner.callChildLogicBlocks_active(); });
	player.addListener('changevisitednodes', function(args) { me._thumbnail_cloner.callChildLogicBlocks_changevisitednodes(); });
	player.addListener('activehotspotchanged', function(args) { me._thumbnail_cloner.callChildLogicBlocks_activehotspotchanged(); });
	player.addListener('varchanged_opt_thumbnail_menu_tooltip', function(args) { me._thumbnail_cloner.callChildLogicBlocks_varchanged_opt_thumbnail_menu_tooltip(); });
	player.addListener('changenode', function(args) { me.callChildLogicBlocksHotspot_luftansicht_changenode();me.callChildLogicBlocksHotspot_bar_changenode();me.callChildLogicBlocksHotspot_streetview_changenode();me.callChildLogicBlocksHotspot_einkaufen_changenode();me.callChildLogicBlocksHotspot_optiker_changenode();me.callChildLogicBlocksHotspot_immobilien_changenode();me.callChildLogicBlocksHotspot_strandbad_changenode();me.callChildLogicBlocksHotspot_restaurant_changenode();me.callChildLogicBlocksHotspot_cafe_changenode();me.callChildLogicBlocksHotspot_hotel_changenode();me.callChildLogicBlocksHotspot_mode_changenode();me.callChildLogicBlocksHotspot_floristik_changenode();me.callChildLogicBlocksHotspot_businness_changenode();me.callChildLogicBlocksHotspot_freizeit_changenode(); });
	player.addListener('varchanged_all_hotspots', function(args) { me.callChildLogicBlocksHotspot_luftansicht_varchanged_all_hotspots();me.callChildLogicBlocksHotspot_bar_varchanged_all_hotspots();me.callChildLogicBlocksHotspot_streetview_varchanged_all_hotspots();me.callChildLogicBlocksHotspot_einkaufen_varchanged_all_hotspots();me.callChildLogicBlocksHotspot_optiker_varchanged_all_hotspots();me.callChildLogicBlocksHotspot_immobilien_varchanged_all_hotspots();me.callChildLogicBlocksHotspot_strandbad_varchanged_all_hotspots();me.callChildLogicBlocksHotspot_restaurant_varchanged_all_hotspots();me.callChildLogicBlocksHotspot_cafe_varchanged_all_hotspots();me.callChildLogicBlocksHotspot_hotel_varchanged_all_hotspots();me.callChildLogicBlocksHotspot_mode_varchanged_all_hotspots();me.callChildLogicBlocksHotspot_floristik_varchanged_all_hotspots();me.callChildLogicBlocksHotspot_businness_varchanged_all_hotspots();me.callChildLogicBlocksHotspot_freizeit_varchanged_all_hotspots(); });
	player.addListener('varchanged_hts_luftansicht', function(args) { me.callChildLogicBlocksHotspot_luftansicht_varchanged_hts_luftansicht(); });
	player.addListener('varchanged_hts_bar', function(args) { me.callChildLogicBlocksHotspot_bar_varchanged_hts_bar(); });
	player.addListener('varchanged_hts_streetview', function(args) { me.callChildLogicBlocksHotspot_streetview_varchanged_hts_streetview(); });
	player.addListener('varchanged_hts_einkaufen', function(args) { me.callChildLogicBlocksHotspot_einkaufen_varchanged_hts_einkaufen(); });
	player.addListener('varchanged_hts_optiker', function(args) { me.callChildLogicBlocksHotspot_optiker_varchanged_hts_optiker(); });
	player.addListener('varchanged_hts_immobilien', function(args) { me.callChildLogicBlocksHotspot_immobilien_varchanged_hts_immobilien(); });
	player.addListener('varchanged_hts_strandbad', function(args) { me.callChildLogicBlocksHotspot_strandbad_varchanged_hts_strandbad(); });
	player.addListener('varchanged_hts_restaurant', function(args) { me.callChildLogicBlocksHotspot_restaurant_varchanged_hts_restaurant(); });
	player.addListener('varchanged_hts_cafe', function(args) { me.callChildLogicBlocksHotspot_cafe_varchanged_hts_cafe(); });
	player.addListener('varchanged_hts_hotel', function(args) { me.callChildLogicBlocksHotspot_hotel_varchanged_hts_hotel(); });
	player.addListener('varchanged_hts_mode', function(args) { me.callChildLogicBlocksHotspot_mode_varchanged_hts_mode(); });
	player.addListener('varchanged_hts_floristik', function(args) { me.callChildLogicBlocksHotspot_floristik_varchanged_hts_floristik(); });
	player.addListener('varchanged_hts_businness', function(args) { me.callChildLogicBlocksHotspot_businness_varchanged_hts_businness(); });
	player.addListener('varchanged_hts_freizeit', function(args) { me.callChildLogicBlocksHotspot_freizeit_varchanged_hts_freizeit(); });
	player.addListener('hotspotsremoved', function(args) { me.removeSkinHotspots(); });
	me.skinTimerEvent();
};