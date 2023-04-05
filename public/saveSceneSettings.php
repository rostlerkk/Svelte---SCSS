<?php
    header('Content-Type: application/json; charset=utf-8');
    $data_from_svelte = file_get_contents('php://input');

    $add_floor_hotspots = true;

    $pano_format = 'cube'; // Ak je hodnota cube, nastaví sa CUBE format. ak je hodnota iná ako cube, nastaví sa SPHERE format

    // načítanie dát zo sveltu
    $json = json_decode($data_from_svelte, true);
   
    $return_data;

    //načítanie "nastavení"
    $file = '../json/settings.json';
    $setting = file_get_contents($file);
    $settings = json_decode($setting, true);
    
    $settings['scenes'] = $json;
    $verify = true;

    if ($verify == true) {
        // $users[$json['user_name']]->user_name = $json['user_name'];
        // $users[$json['user_name']]->user_password =  md5($json['user_password']);
        // $users[$json['user_name']]->first_name = $json['first_name'];
        // $users[$json['user_name']]->last_name = $json['last_name'];
        // $users[$json['user_name']]->user_role = $json['user_role'];
        file_put_contents($file, json_encode($settings));
        $return_data->status = true;

        $skin_settings = '<skin_settings 
                            maps="false"
                            maps_type="google"
                            maps_bing_api_key=""
                            maps_google_api_key=""
                            maps_zoombuttons="false"
                            maps_loadonfirstuse="true"
                            gyro="true"
                            gyro_keeplookingdirection="false"
                            webvr="true"
                            webvr_keeplookingdirection="true"
                            webvr_prev_next_hotspots="true"
                            littleplanetintro="false"
                            followmousecontrol="false"
                            title="true"
                            thumbs="true"
                            thumbs_width="120" thumbs_height="80" thumbs_padding="10" thumbs_crop="0|40|240|160"
                            thumbs_opened="false"
                            thumbs_text="false"
                            thumbs_dragging="true"
                            thumbs_onhoverscrolling="false"
                            thumbs_scrollbuttons="false"
                            thumbs_scrollindicator="false"
                            thumbs_loop="false"
                            tooltips_buttons="false"
                            tooltips_thumbs="false"
                            tooltips_hotspots="false"
                            tooltips_mapspots="false"
                            deeplinking="false"
                            loadscene_flags="MERGE|KEEPVIEW"
                            loadscene_blend="OPENBLEND(0.5, 0.0, 0.75, 0.05, linear)"
                            loadscene_blend_prev="SLIDEBLEND(0.5, 180, 0.75, linear)"
                            loadscene_blend_next="SLIDEBLEND(0.5,   0, 0.75, linear)"
                            loadingtext="loading..."
                            layout_width="100%"
                            layout_maxwidth="814"
                            controlbar_width="-24"
                            controlbar_height="40"
                            controlbar_offset="20"
                            controlbar_offset_closed="-40"
                            controlbar_overlap.no-fractionalscaling="10"
                            controlbar_overlap.fractionalscaling="0"
                            design_skin_images="vtourskin.png"
                            design_bgcolor="0x2D3E50"
                            design_bgalpha="0.8"
                            design_bgborder="0"
                            design_bgroundedge="1"
                            design_bgshadow="0 4 10 0x000000 0.3"
                            design_thumbborder_bgborder="3 0xFFFFFF 1.0"
                            design_thumbborder_padding="2"
                            design_thumbborder_bgroundedge="0"
                            design_text_css="color:#FFFFFF; font-family:Arial;"
                            design_text_shadow="1"
                        />';

    // Start with a "blank" XML document.

    $char = chr(39);

    $main_color = '0x7b13e7';

 
    $xml = new SimpleXMLElement(
        '<krpano version="1.20.11" title="Virtual Tour" showlog="false" debugmode="false" showerrors="false" versioninfo="false" >                            
            <include url="skin/vtourskin.xml"/>
            <include url="plugins/webvr.xml" />
            <include url="arrows.xml" />

            <!-- Plugins -->
            <plugin name="soundinterface"
                url="plugins/soundinterface.js"
                preload="true"
                rootpath=""
                volume="1.0"
                mute="false"
                panningmodel="simple"
                worldscale="1.0"
                autopause="true"
                autounlock="true"
            />
            <plugin name="WebVR" mobilevr_fake_support="true" /> 

            <plugin name="gyro" devices="html5" keep="true"
                url="plugins/gyro2.js" 
                enabled="false"
                camroll="true"
                friction="0.0"
                touch_mode="full"
                sensor="1"
                sensor_mode="1"
                softstart="0.5"
                autocalibration="false"
                desktopsupport="false"
                onavailable=""
                onunavailable=""
                onenable=""
                ondisable=""
                ondenied=""
            />

            <hotspot name="video"
                url.html5="plugins/videoplayer.js"
                posterurl="videoposter.jpg"
                ath="0.0" atv="0.0"
                width="prop"
                height="380px"
                distorted="true"
                scale="1.0" 
                rx="0.0" 
                ry="0.0" 
                rz="0.0" 
                loop="true"
                volume="1.0"
                directionalsound="true"
                pausedonstart="true"
                range="90.0"
                rangefalloff="1.0"
                outofrangevolume="0.0"
                onvideoready=""
                onvideoplay=""
                onvideopaused=""
                onvideocomplete=""
                onerror=""
                onclick="togglepause();"
                visible="false"
                keep="true"
                zorder="5"
                oy="10"
            />

            <!-- styles -->
            <style name="cubeface" distorted="true" width="1000" height="1000" enabled="false" alpha="1" keep="false" zorder="0" torigin="image" depth="off"/>

            <style name="floorspot" type="image" distorted="true" alpha="1" url="icons/hts-ring-active.svg" />
         
            <style name="basic-image" type="image" distorted="true" alpha="1" />

            <style name="custom-arrow" fillcolor="0xd7d7d7" fillalpha="1.0" bordercolor="0x333366" borderalpha="1.0" borderwidth="2.0" onover="set(fillcolor,0xffffff);set(bordercolor,0x5555dd);set(borderwidth,3.0);" onout="set(fillcolor,0xd7d7d7);set(bordercolor,0x333366);set(borderwidth,2.0);" zorder="50" keep="false" />

            <style name="myline" fillcolor="0x00d700" fillalpha="0.7" bordercolor="0x00d700" borderalpha="0" zorder="0" keep="false" handcursor="false" shadow="false" />

            <!-- actions -->
            <action name="skin_hotspotstyle_click" scope="local">
                if(caller.linkedscene,
                    copy(hs_linkedscene, caller.linkedscene);
                    if(caller.linkedscene_lookat, txtsplit(caller.linkedscene_lookat, '.$char.','.$char.', hs_lookat_h, hs_lookat_v, hs_lookat_fov); );
                    set(caller.enabled, false);
                    skin_hidetooltips();
                    spheretospace(caller.ath,caller.atv,caller.depth, tx,ty,tz);
                    set(s, -0.3);
                    set(image, ox=calc(s*tx), oy=calc(s*ty), oz=calc(s*tz));
                    set(view, tx=calc(s*tx), ty=calc(s*ty), tz=calc(s*tz));
                    tween(view.tx|view.ty|view.tz, 0|0|0, 0.9);
                    tween(caller.alpha, 0.0, 0.2, default,
                        skin_loadscene(get(hs_linkedscene), get(skin_settings.loadscene_blend));
                        if(hs_lookat_h !== null, skin_lookat(get(hs_lookat_h), 0, get(hs_lookat_fov)); );
                        skin_updatescroll();
                    );
                );
            </action>

            <action name="draghotspot">
                js(console.log("dragging"););
                spheretoscreen(ath, atv, hotspotcenterx, hotspotcentery, calc(mouse.stagex LT stagewidth/2 ? '.$char.'l'.$char.' : '.$char.'r'.$char.'));
                sub(drag_adjustx, mouse.stagex, hotspotcenterx);
                sub(drag_adjusty, mouse.stagey, hotspotcentery);
                asyncloop(pressed,
                    sub(dx, mouse.stagex, drag_adjustx);
                    sub(dy, mouse.stagey, drag_adjusty);
                    screentosphere(dx, dy, ath, atv);
                    print_hotspot_pos();
                );
            </action>

            <action name="show_hotspots">
                for(set(i,0), i LT hotspot.count, inc(i),
                    set(hotspot[get(i)].visible,true);
                );
            </action>

            <action name="hide_hotspots"> 
                js(console.log("lsfsd"););
                for(set(i,0), i LT hotspot.count, inc(i), set(hotspot[get(i)].visible,false);  );
            </action>

            <action name="change">
                set(%1,get(xml.scene));                
            </action>

            <action name="change_node"> loadscene(%1, null, MERGE, ZOOMBLEND(2.0, 2.0, easeInOutSine)); </action>

            <action name="change_color" scope="local" args="node">
                trace("var1=",get(node));
                set(hotspot[get(node)].url, assets/krpano/icons/hts-ring-active.svg);
            </action>

            <action name="revert_color" scope="local" args="node">
                trace("var1=",get(node));
                set(hotspot[get(node)].url, assets/krpano/icons/hts-ring-w.svg);
            </action>

            <action name="show_title" scope="local" args="title">
                trace("var1=",get(title));
                set(hotspot[get(title)].visible, true);
                tween(hotspot[get(title)].alpha, 1.0);
            </action>

            <action name="hide_title" scope="local" args="title">
                trace("var1=",get(title));
                tween(hotspot[get(title)].alpha, 0.6);
                set(hotspot[get(title)].visible, false);
            </action>


            <action name="add_floorspot_animation_2" scope="local" args="ath,atv,node,title">
                trace("var1=",get(ath));
                trace("var2=",get(atv));
                trace("var3=",get(node));
                trace("var4=",get(title));

                <!-- zmena obrázka -->
                set(hotspot[get(node)].url, assets/krpano/icons/hts-ring-active.svg);
                tween(hotspot[get(node)].alpha, 1.0);
                
            </action>




            <action name="add_floorspot_animation" scope="local" args="ath,atv,node,title">
                trace("var1=",get(ath));
                trace("var2=",get(atv));
                trace("var3=",get(node));
                trace("var4=",get(title));

                <!-- zmena obrázka -->
                set(hotspot[get(node)].url, assets/krpano/icons/hts-ring-active.svg);
                tween(hotspot[get(node)].alpha, 1.0);
            
                <!-- čiara -->
                addhotspot(floor-line);
                set(hotspot[floor-line].ath, get(ath));
                set(hotspot[floor-line].atv, get(atv));
                set(hotspot[floor-line].type, text);
                set(hotspot[floor-line].alpha, 0.0);
                set(hotspot[floor-line].visible, true);
                set(hotspot[floor-line].zorder, 5);
                set(hotspot[floor-line].width, 1px);
                set(hotspot[floor-line].height, 0px);
                set(hotspot[floor-line].edge, bottom);
                set(hotspot[floor-line].bgcolor,'.$main_color.');
                set(hotspot[floor-line].distorted, true);
                tween(hotspot[floor-line].alpha, 1.0);
                tween(hotspot[floor-line].height, 160);   

                <!-- bodka -->
                addhotspot(floor-dot);
                set(hotspot[floor-dot].ath, get(ath));
                set(hotspot[floor-dot].atv, get(atv));
                set(hotspot[floor-dot].type, text);
                set(hotspot[floor-dot].alpha, 0.0);
                set(hotspot[floor-dot].visible, true);
                set(hotspot[floor-dot].zorder, 5);
                set(hotspot[floor-dot].width, 5px);
                set(hotspot[floor-dot].height, 5px);
                set(hotspot[floor-dot].bgcolor, '.$main_color.');
                set(hotspot[floor-dot].bgroundedge, 2);
                set(hotspot[floor-dot].distorted, true);
                tween(hotspot[floor-dot].alpha, 1.0);

                <!-- text -->
                addhotspot(floor-text);
                set(hotspot[floor-text].css, "padding:10px; color:'.$main_color.';");
                set(hotspot[floor-text].ath, get(ath));
                set(hotspot[floor-text].atv, get(atv));
                set(hotspot[floor-text].type, text);
                set(hotspot[floor-text].html, "get(title)");
                set(hotspot[floor-text].oy, -0);
                set(hotspot[floor-text].alpha, 1.0);
                set(hotspot[floor-text].visible, true);
                set(hotspot[floor-text].zorder, 5);
                set(hotspot[floor-text].bgcolor, 0xfafafa);
                set(hotspot[floor-text].bgroundedge, 5);
                set(hotspot[floor-text].distorted, true);
                set(hotspot[floor-text].bgborder, "1.0 '.$main_color.' 1");
                tween(hotspot[floor-text].oy, -180.0);
                tween(hotspot[floor-text].alpha, 1.0);                
            </action>

            <action name="remove_floorspot_animation" scope="local" args="ath,atv,node">
                trace("var1=",get(ath));
                trace("var2=",get(atv));
                trace("var3=",get(node));

                set(hotspot[get(node)].url, assets/krpano/icons/hts-ring-w.svg);
                tween(hotspot[get(node)].alpha, 0.4);
                
                tween(hotspot[floor-line].height, 0);
                tween(hotspot[floor-line].alpha, 0.0);
                removehotspot(floor-line);
                
                tween(hotspot[floor-dot].alpha, 0.0);
                removehotspot(floor-dot);
                
                tween(hotspot[floor-text].alpha, 0.0);
                tween(hotspot[floor-text].oy, 0.0);
                removehotspot(floor-text);
                
                tween(hotspot[floor-icon].alpha, 0.0);
                tween(hotspot[floor-icon].oy, 0.0);
                removehotspot(floor-icon);
            </action>

            <action name="prevscene" scope="local" args="time, zoom,  effect">
                trace("var1=",get(time));
                trace("var2=",get(zoom));
                trace("var3=",get(effect));
                
                if(%1 != findnext, sub(i,scene.count,1));
                txtadd(scenexml,'.$char.'<krpano>'.$char.',get(scene[%i].content),'.$char.'</krpano>'.$char.');
                if(scenexml == xml.content,
                dec(i);
                if(i LT 0, sub(i,scene.count,1));
                loadscene(get(scene[%i].name), null,KEEPVIEW, ZOOMBLEND([get(time)], [get(zoom)], [get(effect)]));
                ,
                dec(i);
                if(i GE 0, prevscene(findnext));
                );
            </action>

            <action name="nextscene" scope="local" args="time, zoom,  effect">
                trace("var1=",get(time));
                trace("var2=",get(zoom));
                trace("var3=",get(effect));
                if(%1 != findnext, set(i,0));
                txtadd(scenexml,'.$char.'<krpano>'.$char.',get(scene[%i].content),'.$char.'</krpano>'.$char.');
                if(scenexml == xml.content,
                inc(i);
                if(i == scene.count, set(i,0));
                loadscene(get(scene[%i].name), null,KEEPVIEW, ZOOMBLEND([get(time)], [get(zoom)], [get(effect)]));
                ,
                inc(i);
                if(i LT scene.count, nextscene(findnext));
                );
            </action>
                                  
            <action name="draglayer">
                if(%1 != dragging,
                    copy(drag_currentx, x);
                    copy(drag_currenty, y);
                    copy(drag_stagex, mouse.stagex);
                    copy(drag_stagey, mouse.stagey);
                    set(drag_sx, +1);
                    set(drag_sy, +1);
                    if(align == righttop,    set(drag_sx,-1); );
                    if(align == right,       set(drag_sx,-1); );
                    if(align == rightbottom, set(drag_sx,-1); set(drag_sy,-1); );
                    if(align == bottom,      set(drag_sy,-1); );
                    if(align == leftbottom,  set(drag_sy,-1); );
                    draglayer(dragging);
                ,
                    if(pressed,
                        sub(dx, mouse.stagex, drag_stagex);
                        sub(dy, mouse.stagey, drag_stagey);
                        mul(dx, drag_sx);
                        mul(dy, drag_sy);
                        add(x, drag_currentx, dx);
                        add(y, drag_currenty, dy);
                        delayedcall(0, draglayer(dragging) );
                    );
                );
            </action>

            <action name="show_my_name">
                trace(name);
            </action>

            <!-- Layers -->
            <layer name="custom-arrow-shape" keep="true">
                <arrow>
                    <point name="p0" x="0" y="60" />
                    <point name="p1" x="-10" y="47" />
                    <point name="p2" x="-5" y="47" />
                    <point name="p3" x="-5" y="40" />
                    <point name="p4" x="5" y="40" />
                    <point name="p5" x="5" y="47" />
                    <point name="p6" x="10" y="47" />
                    <center dist="180" shadowdrop="0.35">
                        <functionv>
                            <point name="p0" vlookat="-90" posv="-90" />
                            <point name="p1" vlookat="0" posv="16" />
                            <point name="p2" vlookat="90" posv="90" />
                        </functionv>
                    </center>
                </arrow>
            </layer>

            <layer name="line-shape" keep="true">
                <arrow>
                    <point name="p0" x="0" y="60000" />
                    <point name="p1" x="-5" y="0" />
                    <point name="p2" x="5" y="0" />
                    <center dist="180" />
                </arrow>
            </layer>

            <events onviewchange="js( move_menu_icon(menu) );"/>
            

	        <style name="title_global"
			width="500px"
			height="40px"
			type="text"
			distorted="true"
			bgalpha="0"
			alpha="1"
			vcenter="true"
			cursor="default"
			css="color:#3F3F46; text-align:center;font-size:20px;color:#3f3f46;font-weight:900;"/>

            <!-- IMAGE GLOBAL  -->
	<style	name="basic-image"
			type="image"
			distorted="true"
			alpha="1"
	/>


    <!-- FLOORSPOT  -->
	<style	name="basic-image"
			type="image"
			distorted="true"
			alpha="1"
			url="img/hts-ring-active.svg"
			
	/>

	<!-- IMAGE - DISABLED  -->
	<style	name="basic-image-disabled"
			type="image"
			distorted="true"
			alpha="0.2"
	/>

	<!-- HLAVNY PANEL -->
	<!-- POZADIE PRE HLAVNY PANEL -->
	<style	name="main_screen"
			width="900px"
			height="560px"
			distorted="true"
			type="text"
			alpha="0.8"
			bgcolor="0xfafafa"
			bgroundedge="12"
			cursor="default"
	/>

    <!-- TEXT PRE EXIT VR -->
	<style	name="exitvr_text"
			width="70px"
			type="text"
			distorted="true"
			css="color:#FAFAFA; text-align:left;font-size:16px;"
			alpha="1"
			bgalpha="0"
			edge="top"
	/>

	<!-- TEXT PRE JEDNOTLIVE KATEGORIE -->
	<style	name="main_text"
			width="158px"
			type="text"
			distorted="true"
			css="color:#3F3F46; text-align:center;font-size:20px;"
			alpha="1"
			bgalpha="0"
			edge="top"
	/>

	<!-- TEXT PRE JEDNOTLIVE KATEGORIE - DISABLED -->
	<style	name="main_text_disabled"
			width="158px"
			type="text"
			distorted="true"
			css="color:#3F3F46; text-align:center;font-size:20px;"
			alpha="0.2"
			bgalpha="0"
			edge="top"
	/>

	<!-- POZADIE PRE JEDNOTLIVE KATEGORIE -->
	<style	name="section_bg"
			width="160px"
			height="180px"
			type="text"
			distorted="true"
			bgcolor="0xfafafa"
			alpha="1"
			bgroundedge="12"
			bgborder="2.0 0x3F3F46 0.2"
	/>

	<!-- KATEGORIE PRIEHLADNA VRSTVA -->
	<style	name="section_bg_empty"
			width="160px"
			height="180px"
			type="text"
			distorted="true"
			alpha="0"
			bgroundedge="12"
	/>

	<!-- POZADIE AJ TEXT PRE LANGUAGE - main panel --> 
	<style	name="language_bg"
			width="40px"
			height="40px"
			type="text"
			distorted="true"
			bgcolor="0xfafafa"
			alpha="1"
			bgroundedge="6"
			vcenter="true"
			css="color:#3F3F46; text-align:center;font-size:14px;"
	/>

	<!-- LANGUAGE -->
	<!-- LANGUAGE pozadie -->
	<style	name="language_main"
			width="170px"
			height="293px"
			type="text"
			distorted="true"
			bgcolor="0xfafafa"
			alpha="0.8"
			bgroundedge="12"
			cursor="default"
			bgshadow="0 0 20 0x000000 0.4"
	/>

	<!-- LANGUAGE arrows -->
	<style	name="language_arrows"
			width="154px"
			height="28px"
			type="text"
			distorted="true"
			bgcolor="0x3f3f46"
			alpha="0.05"
			bgroundedge="6"
	/>

	<!-- LANGUAGE prazdna vrstva šípky -->
	<style	name="language_arrows_empty"
			width="154px"
			height="28px"
			type="text"
			distorted="true"
			alpha="0"
			bgroundedge="6"
	/>

	<!-- LANGUAGE text s pozadim -->
	<style	name="language_text"
			width="154px"
			height="45px"
			type="text"
			distorted="true"
			alpha="1"
			bgalpha="0"
			vcenter="true"
			css="color:#3F3F46; text-align:left;font-size:14px;margin-left:8px; color:#3f3f46;"
	/>

	<!-- LANGUAGE text s pozadim EMPTY -->
	<style	name="language_text_empty"
			width="154px"
			height="45px"
			type="text"
			distorted="true"
			alpha="0"
			bgroundedge="6"
	/>

	<!-- LANGUAGE text s pozadim - ACTIVE -->
	<style	name="language_text_active"
			width="154px"
			height="45px"
			type="text"
			distorted="true"
			bgcolor="0x4f46e5"
			alpha="1"
			bgalpha="0.05"
			bgroundedge="6"
			bgborder="2.0 0xd0cef4 0.2"
			vcenter="true"
			css="color:#3F3F46; text-align:left;font-size:14px;margin-left:8px; color:#4f46e5;"
			/>

	<!-- SETTINGS -->
    <!-- SETTINGS text s pozadim -->
    <style	name="settings_full_text"
			width="500px"
			height="64px"
			type="text"
			distorted="true"
			bgcolor="0xfafafa"
			bgroundedge="12"
			vcenter="true"
			css="color:#3F3F46; text-align:left;font-size:14px;margin-left:16px; color:#3f3f46;"
    />

	<!-- SETTINGS text EMPTY -->
    <style	name="settings_full_text_empty"
			width="500px"
			height="64px"
			type="text"
			distorted="true"
			bgroundedge="12"
    />

	<!-- ALERT - EXIT VR  -->
	<!-- EXIT VR BG  -->
	<style	name="alert_exit_bg"
			width="300px"
			height="113px"
			type="text"
			distorted="true"
			bgcolor="0xfafafa"
			alpha="1"
			bgroundedge="12"
			cursor="default"
			bgshadow="0 0 20 0x000000 0.4"
	/>

		<!-- EXIT VR BUTTONS EXIT  -->
	<style	name="alert_exit_button1"
			width="120px"
			height="40px"
			type="text"
			distorted="true"
			bgcolor="0x3F3F46"
			alpha="1"
			bgroundedge="6"
			vcenter="true"
			css="color:#FAFAFA; text-align:center; font-size:14px; font-weight:900;"
	/>

	<style	name="alert_exit_button2"
		width="120px"
		height="40px"
		type="text"
		distorted="true"
		bgcolor="0x4F46E5"
		alpha="1"
		bgroundedge="6"
		vcenter="true"
		css="color:#FAFAFA; text-align:center; font-size:14px; font-weight:900;"
	/>

	<!-- Question text  -->
	<style	name="alert_exit_question"
		width="268px"
		height="21px"
		type="text"
		distorted="true"
		bgalpha="0"
		alpha="1"
		vcenter="true"
		css="color:#3F3F46; text-align:center; font-size:14px;"
	/>

	<!-- NAVIGATION  -->
	<!-- NAVIGATION BG  -->
	<style	name="navigation_bg"
			width="600px"
			height="400px"
			type="text"
			distorted="true"
			bgcolor="0xfafafa"
			alpha="1"
			bgroundedge="12"
			cursor="default"
	/>
		<!-- continue button  -->
	<style	name="navigation_continue"
			width="200px"
			height="40px"
			type="text"
			distorted="true"
			bgcolor="0x3F3F46"
			alpha="1"
			bgroundedge="6"
			vcenter="true"
			css="color:#FAFAFA; text-align:center; font-size:14px;"
	/>

	<!-- Navigation text -->
    <style  name="navigation_text"
            width="200px"
            height="82px"
            type="text"
            distorted="true"
            bgalpha="0"
            alpha="1"
            cursor="default"
            edge="top"
            css="color:#3F3F46; text-align:center;font-size:16px;color:#3f3f46;font-weight:500;"
    />

	<!-- Tour-Info -->
	<!-- Tour-info-content -->
	<style	name="content_bg"
			width="868px"
			height="488px"
			distorted="true"
			type="text"
			alpha="1"
			bgcolor="0x3f3f46"
			bgalpha="0.05"
			bgroundedge="12"
			cursor="default"
			bgborder="1.0 0x3F3F46 0.6"
	/>
	<!-- Tour-info-subtitle -->
	<style	name="info_subtitle"
		width="740px"
		height="100px"
		type="text"
		distorted="true"
		bgalpha="0"
		alpha="1"
		vcenter="true"
		cursor="default"
		css="color:#3F3F46; text-align:center;font-size:16px;color:#3f3f46;font-weight:900;"
/>
	<!-- Tour-info-line -->
	<style	name="info_line"
		width="740px"
		height="1px"
		distorted="true"
		type="text"
		alpha="1"
		bgcolor="0x3f3f46"
		cursor="default"
		bgalpha="0.2"
	/>

	<!-- Tour-info-content-text -->
	<style	name="info_content_text"
		width="354px"
		height="256px"
		type="text"
		distorted="true"
		bgalpha="0"
		alpha="1"
		edge="top"
		cursor="default"
		css="color:#3F3F46; text-align:left;font-size:16px;color:#3f3f46;font-weight:500;"
	/>

	<!-- SHORTCUTS -->
	<!-- SHORTCUTS Controls background -->
	<style	name="sc_controls_bg"
			width="900px"
			height="48px"
			type="text"
			distorted="true"
			bgcolor="0x3f3f46"
			bgalpha="0.1"
			alpha="1"
			bgroundedge="0 0 12 12"
			cursor="default"
	/>
		<!-- SHORTCUTS Controls Automatic tour text -->
	<style	name="automatic_tour"
			width="150px"
			height="48px"
			type="text"
			distorted="true"
			bgcolor="0x3f3f46"
			bgalpha="0"
			alpha="1"
			cursor="default"
			edge="left"
			vcenter="true"
			css="color:#3F3F46; text-align:left;font-size:16px;font-weight:500;"
	/>

			<!-- SHORTCUTS Controls pagination -->
	<style	name="at_pagination"
			width="150px"
			height="48px"
			type="text"
			distorted="true"
			bgcolor="0x3f3f46"
			bgalpha="0"
			alpha="1"
			cursor="default"
			edge="right"
			vcenter="true"
			css="color:#3F3F46; text-align:right;font-size:16px;font-weight:500;"
	/>

			<!-- SHORTCUTS images empty/active -->
	<style	name="sc_image_empty"
			width="288px"
			height="440px"
			type="text"
			distorted="true"
			bgalpha="0"
			bgborder="2.0 0x3F3F46 1"
			alpha="1"
	/>
			<!-- SHORTCUTS image thumbnail -->
	<style	name="sc_image"
			width="288px"
			height="440px"
			type="image"
			distorted="true"
			alpha="1"
	/>

			<!-- SHORTCUTS thumbnail title -->
	<style	name="thumbnail_title"
			width="288px"
			height="48px"
			type="text"
			distorted="true"
			bgcolor="0x3f3f46"
			bgalpha="0.7"
			alpha="1"
			cursor="default"
			vcenter="true"
			css="color:#fafafa; text-align:center;font-size:16px;font-weight:500;"
	/>

            <!-- skin events -->
	        <events name="skin_events" keep="true"
	        onxmlcomplete="set(events[skin_events].onxmlcomplete, skin_showloading(true); ); skin_showloading(true); skin_startup();"
	        />

            <autorotate enabled="false" waittime="1.5" speed="10.0" horizon="0" tofov="120" />

            <!-- Skin settings -->                                   
            ' . $skin_settings. ' 

            <!-- Scenes -->  
        </krpano>');
    
    foreach($settings['scenes'] as $key => $val){
        if ($val['enabled'] == true) {
            $scenes = $xml->addChild("scene");
            $event = $scenes->addChild("event");
            $event->addAttribute("name", "change_scene");
            $scenes->addAttribute("name", $val['id']);    
            $control = $scenes->addChild("control");    
            

            switch ($pano_format) {
                case 'cube' : 
                    // ak potrebujeme cube
                    $control->addAttribute("bouncinglimits", "calc:image.cube ? true : false");          
                break;

                default : 
                    // ak potrebujeme equirect
                    $control->addAttribute("bouncinglimits", "calc:image.sphere ? true : false");  
                break;
            }      
            
            $control->addAttribute("usercontrol", "all");  
            $view = $scenes->addChild("view");    
            $view->addAttribute("hlookat",$val['hlookat']);
            $view->addAttribute("vlookat",$val['vlookat']);
            $view->addAttribute("fovtype","MFOV");
            $view->addAttribute("fov",$val['fov']);
            $view->addAttribute("maxpixelzoom","1.0");
            $view->addAttribute("fovmin","70");
            $view->addAttribute("fovmax","140");
            $view->addAttribute("limitview","auto");

            $preview = $scenes->addChild("preview");
            // $preview->addAttribute("url","scenes/".$val['id']."/thumb.png");    
            $image = $scenes->addChild("image");   

            $dollar = '$';
            switch ($pano_format) {
                
                case 'cube' : 
                    // ak potrebujeme cube
                    $cube = $image->addChild("cube");
                    // $cube->addAttribute("url","scenes/".$val['id']."/cube_%s.jpg");
                    $zero = '';
                    $dollar = '$';
                   
                    if ( 
                        $val['floor_enabled'] == true
                        
                    ){
                        
                        //$cube->addAttribute("url","scenes/".$val['custom_field_10']."_".$val['name']."_%".$dollar."floor%f_%s.jpg");
                        $cube->addAttribute("url","scenes/".$val['id']."_%".$dollar."floor%_%s.jpg");
                    }

                    else {
                        //$cube->addAttribute("url","scenes/".$val['custom_field_10']."_".$val['name']."_%s.jpg");
                        $cube->addAttribute("url","scenes/synagoga_".$val['name']."_"."%s.jpg");
                    }
                    
                break;

                default :
                // ak potrebujeme equirect
                    $cube = $image->addChild("sphere");

                    if ( 
                        $val['floor_enabled'] == true
                        
                    ){
                        $cube->addAttribute("url","scenes/".$val['id']."_%".$dollar."floor%.jpg");
                    }

                    else {
                        $cube->addAttribute("url","scenes/".$val['id'].".jpg");
                    }
                    
                    
                    
                    
                break;
            }      
            
            foreach($val['hotspots'] as $key => $value ){
                if (
                    $value['enabled'] && 
                    $value['type'] != 'next-node'
                ) {
                    $hotspot = $scenes->addChild("hotspot");
                    $hotspot->addAttribute("name",$value['name']);
                    $hotspot->addAttribute("id",$value['id']);
                    $hotspot->addAttribute("title",$value['title']);
                    $hotspot->addAttribute("type",$value['type']);
                    $hotspot->addAttribute("hstype",$value['type']);
                    $hotspot->addAttribute("ath",$value['ath']);
                    $hotspot->addAttribute("atv",$value['atv']);
                    $hotspot->addAttribute("zorder", "5");
                    $hotspot->addAttribute("torigin", "image");
                    $hotspot->addAttribute("skin-id", $value['skin-id']);
                    
                    // $hotspot->addAttribute("ondown","set(dragging,true); draghotspot(".$value['id'].");");
                    // $hotspot->addAttribute("onup","set(dragging,false);");


                    // genrovanie ikon
    
                    switch ($value["type"]) {
                        case "next-node" : 
                            // $hotspot->addAttribute("type","img");
                            // $hotspot->addAttribute("url","icons/hts_next-node.svg");
                            // $hotspot->addAttribute("onclick","change_node(".$value['target'].")");
                            
                        break;
    
                        case "infopanel-v1" : 
                            $hotspot->addAttribute("url","icons/hts_infopanel.svg");
                        break;

                        case "infopanel-v2" : 
                            $hotspot->addAttribute("url","icons/hts_infopanel.svg");
                        break;

                        case "infopanel-v3" : 
                            $hotspot->addAttribute("url","icons/hts_infopanel.svg");
                        break;

                        case "videopanel-v1" : 
                            $hotspot->addAttribute("url","icons/hts_videopanel.svg");
                        break;

                        case "videopanel-v2" : 
                            $hotspot->addAttribute("url","icons/hts_videopanel.svg");
                        break;
                    }
                }

                elseif (
                    $value['enabled'] == true && 
                    $value['type'] == 'next-node'
                ) {
                    

                    switch ($value["skin-id"]) {
                        case "arrow" : 
                            $hotspot_new = $scenes->addChild("hotspot");
                            $hotspot_new->addAttribute("name", $value['name']."_shadow");
                            $hotspot_new->addAttribute("ath",$value['ath']);
                            $hotspot_new->addAttribute("atv", "30.4");
                            $hotspot_new->addAttribute("width", "80px");
                            $hotspot_new->addAttribute("height", "prop");
                            $hotspot_new->addAttribute("url", "../krpano/icons/arrow-floor-dark.png");  
                            $hotspot_new->addAttribute("torigin","image"); 
                            $hotspot_new->addAttribute("distorted", "true");
                            $hotspot_new->addAttribute("alpha", "0.4");
                            $hotspot_new->addAttribute("depth", "1000"); 
                            $hotspot_new->addAttribute("rx", "60");
                            $hotspot_new->addAttribute("zorder", "1");

                            // $hotspot->addAttribute("type",$value['type']);        
                            // $hotspot->addAttribute("style", "skin_hotspotstyle");
                            // $hotspot->addAttribute("ondown","draghotspot();");
                            $hotspot = $scenes->addChild("hotspot");
                            $hotspot->addAttribute("name", $value['name']);
                            $hotspot->addAttribute("id",$value['name']);
                            
                            $hotspot->addAttribute("ath",$value['ath']);
                            $hotspot->addAttribute("atv", "30");
                            $hotspot->addAttribute("width", "80px");
                            $hotspot->addAttribute("height", "prop");
                            $hotspot->addAttribute("url", "../krpano/icons/arrow-floor.png");  
                            $hotspot->addAttribute("torigin","image"); 
                            $hotspot->addAttribute("distorted", "true");
                            $hotspot->addAttribute("alpha", "0.9");
                            $hotspot->addAttribute("depth", "1000"); 
                            $hotspot->addAttribute("rx", "60"); 
                            $hotspot->addAttribute("zorder", "2");
                            // $hotspot->addAttribute("style", "skin_hotspotstyle");
                            // $hotspot->addAttribute("linkedscene", $value['target']);
                            $hotspot->addAttribute("onclick","change_node(".$value['target'].")");
                            

                            if (
                                $value['title'] != null &&
                                $value['title'] != '' &&
                                $value['title'] != 'undefined'
                            ) {
                                $hotspot_title = $scenes->addChild("hotspot");
                                $hotspot_title->addAttribute("name", $value['name']."_title");
                                $hotspot_title->addAttribute("ath",$value['ath']);
                                $hotspot_title->addAttribute("atv", "25.0");
                                $hotspot_title->addAttribute("torigin","image"); 
                                $hotspot_title->addAttribute("distorted", "true");
                                $hotspot_title->addAttribute("alpha", "0.0");
                                $hotspot_title->addAttribute("visible", "false");
                                $hotspot_title->addAttribute("depth", "1000"); 
                                $hotspot_title->addAttribute("html",  $value['title']); 
                                $hotspot_title->addAttribute("bgcolor", "0x000000"); 
                                $hotspot_title->addAttribute("bgroundedge", "6"); 
                                $hotspot_title->addAttribute("bgalpha", "0.6"); 
                                $hotspot_title->addAttribute("type", "text"); 
                                $hotspot_title->addAttribute("css", "padding: 2px 6px; color: #ffffff;"); 

                                $hotspot->addAttribute("onover","show_title(".$value['name']."_title)");
                                $hotspot->addAttribute("onout","hide_title(".$value['name']."_title)");
                            }
                            

                            

                            // $layer = $scenes->addChild("layer"); 
                            // $layer->addAttribute("name","connections");
                            
                            // // $layer->addAttribute("ondown","draglayer();");
                            // $connection = $layer->addChild("connection"); 
                            // $connection->addAttribute("name",$value['target']);
                            // $connection->addAttribute("hdir",$value['ath']);
                            // $connection->addAttribute("onclick","change_node(scene_".$value['target'].")");
                            
                        break;
                        case "circle" :                             
                            $hotspot->addAttribute("title",$value['title']);
                        break;
                        case "floorspot" :
                            $hotspot = $scenes->addChild("hotspot"); 
                            $hotspot->addAttribute("name", $value['name']);
                            $hotspot->addAttribute("id",$value['name']);
                            
                            $hotspot->addAttribute("ath",$value['ath']);
                            $hotspot->addAttribute("atv",$value['atv']);
                            // $hotspot->addAttribute("style", "floorspot");
                            $hotspot->addAttribute("style", "skin_hotspotstyle");
                            $hotspot->addAttribute("url", "../krpano/icons/hts-ring-w.svg");  
                            $hotspot->addAttribute("torigin","image"); 
                            $hotspot->addAttribute("depth",$value['depth_value']);                      
                            $hotspot->addAttribute("rx",$value['rx']);                      
                            $hotspot->addAttribute("ry",$value['ry']);  
                            $hotspot->addAttribute("alpha", "0.4");


                            
                            
                            // $hotspot->addAttribute("onclick","change_node(".$value['target'].")");   
                            $hotspot_empty = $scenes->addChild("hotspot");
                            $hotspot_empty->addAttribute("name", $value['name'].'_empty');
                            $hotspot_empty->addAttribute("ath",$value['ath']);
                            $hotspot_empty->addAttribute("atv",$value['atv']);
                            $hotspot_empty->addAttribute("style", "skin_hotspotstyle");
                            $hotspot_empty->addAttribute("url", "../krpano/icons/hts-ring-w.svg");  
                            $hotspot_empty->addAttribute("torigin","image"); 
                            $hotspot_empty->addAttribute("depth",$value['depth_value']);                      
                            $hotspot_empty->addAttribute("rx",$value['rx']);                      
                            $hotspot_empty->addAttribute("ry",$value['ry']);
                            $hotspot_empty->addAttribute("alpha", "0.0");
                            $hotspot_empty->addAttribute("zorder", "8");
                            $hotspot_empty->addAttribute("distorted", "true");
                            
                            // $hotspot_empty->addAttribute("onclick", "js(move_to(" . $value['new_target'] . "))");
                            $hotspot_empty->addAttribute("linkedscene", $value['target']);
                            $hotspot_empty->addAttribute("onout", "remove_floorspot_animation(0,0,".$value['name'].")"); 
                            
                            if (
                                $value['title'] != ''
                            ) {
                                
                                $hotspot_empty->addAttribute("onover", "add_floorspot_animation(".$value['ath'].",".$value['atv'].",".$value['name'].",".$value['title'].")");  
                                
                            }

                            else {
                                $hotspot_empty->addAttribute("onover", "add_floorspot_animation_2(".$value['ath'].",".$value['atv'].",".$value['name'].", title)");  
                                // $hotspot->addAttribute("onover", "change_color(".$value['name'].")");  
                                // $hotspot->addAttribute("onout", "revert_color(".$value['name'].")");  
                                // $hotspot->addAttribute("onover", "add_floorspot_animation_2(".$value['ath'].",".$value['atv'].",".$value['name'].",".$value['title'].")");  
                                // $hotspot->addAttribute("onout", "remove_floorspot_animation(0,0,".$value['name'].")"); 
                            }

                        break;
                    }
                }
            }
        }   
    }

    $result = $xml->asXML('../krpano/tour.xml');
    }

    else {
        $return_data->status = false;
    }

    die(json_encode($return_data));

    
?>