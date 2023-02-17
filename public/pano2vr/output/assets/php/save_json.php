<?php
    $myFile = "settings.json";
    $fp = fopen($myFile, 'w') or die("can't open file");
    $stringData = $_GET["data"];
    fwrite($fp, $stringData);
    fclose($fp)
?>