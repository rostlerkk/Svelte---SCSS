<?php
usleep(mt_rand(100, 10000));
$start = microtime(true);
$patches = array();
$hotspots = array();

$file = 'pano_backup.xml';
$newfile = 'pano.xml';

if (!copy($file, $newfile)) {
    echo "failed to copy";
}

$row = 0;
if (($handle = fopen("assets/data/patches.csv", "r")) !== FALSE) {
    while (($data = fgetcsv($handle, 1000, ";")) !== FALSE) {
        $num = count($data);
       // echo "<p> $num fields in line $row: <br /></p>\n";
        $row++;

        for ($c=0; $c < $num; $c++) {
            $patches[$row][] = $data[$c];
            //array_push($patches[$row] = $data[$c]);  //[$data[$c]]
           // echo $data[$c] . "<br />\n";
        }
    }
    fclose($handle);
}

$row = 0;
if (($handle1 = fopen("assets/data/hotspots.csv", "r")) !== FALSE) {
    while (($data = fgetcsv($handle1, 1000, ";")) !== FALSE) {
        $num = count($data);
       // echo "<p> $num fields in line $row: <br /></p>\n";
        $row++;

        for ($c=0; $c < $num; $c++) {
            $hotspots[$row][] = $data[$c];
            //array_push($patches[$row] = $data[$c]);  //[$data[$c]]
           // echo $data[$c] . "<br />\n";
        }
    }
    fclose($handle);
}

function consoleLog($msg) {
    echo '<script type="text/javascript">' .
      'console.log(' . $msg . ');</script>';
}

//echo '<pre>'; print_r($patches); echo '</pre>';
//echo '<pre>'; print_r($patches[2]); echo '</pre>';
//echo '<pre>'; print_r($hotspots[2]); echo '</pre>';


$patchesSize = count($patches)- 1 ;
//echo $patchesSize; echo '<br />';

$hotspotsSize = count($hotspots)- 1 ;
//echo $hotspotsSize; echo '<br />';


// Kontrola či existuje súbor pano.xml
if (file_exists('pano.xml')) {
    // načítaj súbor
    $xml = simplexml_load_file('pano.xml');

    for ($i=0; $i < $hotspotsSize; $i++) {
        $searchedNode = $hotspots[$i+2][0];
        echo "Importujem hotspot : nodeID =  <strong>${searchedNode}</strong>"; 
        $result = $xml->xpath("/tour/panorama[@id='$searchedNode']");

        foreach ($result as $node) {
            $newHotspot = $node->hotspots->addChild("hotspot");
            $newHotspot->addAttribute('id', $hotspots[$i+2][1]);
            $newHotspot->addAttribute('skinid', $hotspots[$i+2][2]);
            $newHotspot->addAttribute('pan', $hotspots[$i+2][3]);
            $newHotspot->addAttribute('tilt', $hotspots[$i+2][4]);
            $newHotspot->addAttribute('title', $hotspots[$i+2][5]);
            $newHotspot->addAttribute('description', $hotspots[$i+2][7]);
            $newHotspot->addAttribute('url', '{' . $hotspots[$i+2][9] . '}');
            $newHotspot->addAttribute('notice', 'imported-hotspot');

            $tmp = $hotspots[$i+2][1];
            echo " > hotspotID = <strong>${tmp}</strong>"; echo '<br />';
    
            // $newPatch = $node->media->addChild("image");    
            // $newPatch->addAttribute('id',$patches[$i+2][1]);
            // $newPatch->addAttribute('width',$patches[$i+2][2]);
            // $newPatch->addAttribute('height',$patches[$i+2][3]);
            // $newPatch->addAttribute('pan',$patches[$i+2][5]);
            // $newPatch->addAttribute('tilt',$patches[$i+2][6]);
            // $newPatch->addAttribute('fov',$patches[$i+2][7]);
            // $newPatch->addAttribute('rotx',$patches[$i+2][8]);
            // $newPatch->addAttribute('roty',$patches[$i+2][9]);
            // $newPatch->addAttribute('rotz',$patches[$i+2][10]);
            // $newPatch->addAttribute('stretch',$patches[$i+2][11]);
            // $newPatch->addAttribute('clickmode','0');
            // $newPatch->addAttribute('handcursor','0');
            // $newHotspot->addAttribute('notice', 'imported-patch');
            // $newPatch->addChild("source")->addAttribute('url',$patches[$i+2][4]);
    
        }

    // Pre panorámy ktoré obsahujú ID $searchedNode
    }

    echo "----------------------------------- <br />"; 

    for ($i=0; $i < $patchesSize; $i++) {
        $searchedNode = $patches[$i+2][0];
        echo "Importujem patch : nodeID =  <strong>${searchedNode}</strong>"; 
        $result = $xml->xpath("/tour/panorama[@id='$searchedNode']");

        foreach ($result as $node) {
            // $newHotspot = $node->hotspots->addChild("hotspot");
            // $newHotspot->addAttribute('id', $hotspots[$i+2][1]);
            // $newHotspot->addAttribute('skinid', $hotspots[$i+2][2]);
            // $newHotspot->addAttribute('pan', $hotspots[$i+2][3]);
            // $newHotspot->addAttribute('tilt', $hotspots[$i+2][4]);
            // $newHotspot->addAttribute('title', $hotspots[$i+2][5]);
            // $newHotspot->addAttribute('description', $hotspots[$i+2][7]);
            // $newHotspot->addAttribute('url', '{' . $hotspots[$i+2][9] . '}');
            // $newHotspot->addAttribute('notice', 'imported-hotspot');
    
            $newPatch = $node->media->addChild("image");    
            $newPatch->addAttribute('id',$patches[$i+2][1]);
            $newPatch->addAttribute('width',$patches[$i+2][2]);
            $newPatch->addAttribute('height',$patches[$i+2][3]);
            $newPatch->addAttribute('pan',$patches[$i+2][5]);
            $newPatch->addAttribute('tilt',$patches[$i+2][6]);
            $newPatch->addAttribute('fov',$patches[$i+2][7]);
            $newPatch->addAttribute('rotx',$patches[$i+2][8]);
            $newPatch->addAttribute('roty',$patches[$i+2][9]);
            $newPatch->addAttribute('rotz',$patches[$i+2][10]);
            $newPatch->addAttribute('stretch',$patches[$i+2][11]);
            $newPatch->addAttribute('clickmode','0');
            $newPatch->addAttribute('handcursor','0');
            $newHotspot->addAttribute('notice', 'imported-patch');
            $newPatch->addChild("source")->addAttribute('url',$patches[$i+2][4]);

            $tmp = $patches[$i+2][1];
            echo " > patchesID = <strong>${tmp}</strong>"; echo '<br />';
    
        }

    // Pre panorámy ktoré obsahujú ID $searchedNode
    }

    echo "----------------------------------- <br />"; 

    echo "Naimportovaných <strong>${hotspotsSize}</strong> hotspotov a <strong>${patchesSize}</strong> patchov.<br /> ";

    while(list( , $node) = each($result)) {
        
        
        // Pridaj hotspots s nasledujúcimi koordináciami

        for ($y=0; $y < $hotspotsSize; $y++) {
            
        }
        //      $newHotspot = $node->hotspots->addChild("hotspot");
        //      $newHotspot->addAttribute('id', $hotspots[$y+2][1]);
        //     $newHotspot->addAttribute('skinid', $hotspots[$i+2][2]);
        //     $newHotspot->addAttribute('pan', $hotspots[$i+2][3]);
        //     $newHotspot->addAttribute('tilt', $hotspots[$i+2][4]);
        //     $newHotspot->addAttribute('title', $hotspots[$i+2][5]);
        //     $newHotspot->addAttribute('description', $hotspots[$i+2][7]);
        //     $newHotspot->addAttribute('url', '{' . $hotspots[$i+2][9] . '}');
        //     $newHotspot->addAttribute('notice', 'imported-hotspot');
        // }

        // for ($i=0; $i < $patchesSize; $i++) {

        //     // Pridaj patch s nasledujúcimi koordináciami
        //     $newPatch = $node->media->addChild("image");    
        //     $newPatch->addAttribute('id',$patches[$i+2][1]);
        //     $newPatch->addAttribute('width',$patches[$i+2][2]);
        //     $newPatch->addAttribute('height',$patches[$i+2][3]);
        //     $newPatch->addAttribute('pan',$patches[$i+2][5]);
        //     $newPatch->addAttribute('tilt',$patches[$i+2][6]);
        //     $newPatch->addAttribute('fov',$patches[$i+2][7]);
        //     $newPatch->addAttribute('rotx',$patches[$i+2][8]);
        //     $newPatch->addAttribute('roty',$patches[$i+2][9]);
        //     $newPatch->addAttribute('rotz',$patches[$i+2][10]);
        //     $newPatch->addAttribute('stretch',$patches[$i+2][11]);
        //     $newPatch->addAttribute('clickmode','0');
        //     $newPatch->addAttribute('handcursor','0');
        //     $newHotspot->addAttribute('notice', 'imported-patch');
        //     $newPatch->addChild("source")->addAttribute('url',$patches[$i+2][4]);
        // }
    }
    
    

    
    // vytvorenie nového XML súboru
    $xml->asXml('rss.xml');

    // prepísanie existujúceho XML
    $xml->asXml('pano.xml');
    $time = microtime(true) - $_SERVER["REQUEST_TIME_FLOAT"];
    $time = round($time, 3);

    echo "Čas importu : <strong>${time}</strong> sekúnd.";

} else {
    exit('chyba pri načítaní pano.xml.');
}

if(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on')   
$url = "https://";   
else  
$url = "http://";   
// Append the host(domain name, ip) to the URL.   
$url.= $_SERVER['HTTP_HOST'];   

// Append the requested resource location to the URL   
$url.= $_SERVER['REQUEST_URI'];    

$url =  str_replace("/import.php", "",$url);
echo "<br /><br />Prejsť na stránku : <a href='$url' target='_blank'>$url</a>";  


?>