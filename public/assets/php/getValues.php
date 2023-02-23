<?php
    header('Content-Type: application/json; charset=utf-8');
    $data_from_svelte = file_get_contents('php://input');

    // načítanie dát zo sveltu
    $urls = json_decode($data_from_svelte, true);

    $lang = $urls["lang"];

    // Preklady BUILDINGS
    $int_buildings_link = $urls["int_buildings_link"];
    $int_buildings_data = file_get_contents($int_buildings_link);
    $int_buildings_json = json_decode($int_buildings_data, true);
    if ($lang != null) {
        $sk_buildings_link = $urls["lang_buildings_link"];
        $sk_buildings_data = file_get_contents($sk_buildings_link);
        $sk_buildings_json = json_decode($sk_buildings_data, true);
    }
    
    // $link = "https://int.baumit.com/api/buildings?api_token=AP7R6yAeBytyvc0OASz3RhLrAH2CsCGnNDWTeLBAbyW72sMPRCiw4JAKDTz0";
    // $sk_buildings_link = "https://baumit.sk/api/buildings?api_token=uuPus1j6IOdtp9p5EKzpusgd2TlXMuDK7C33qC8yof4IvMNCyzIPQEV9dfSI";
    
    

    foreach ($int_buildings_json['additional_content'] as $key => $value) {
        foreach ($int_buildings_json['additional_content'][$key] as $dat => $item) {
            $int_buildings_json['additional_content'][$key][$dat."_t"]["int"] = $item;

            if ($lang != null) {
                foreach ($sk_buildings_json['additional_content'] as $kluc => $polozka) {
                    foreach ($sk_buildings_json['additional_content'][$kluc] as $datik => $itemik) {
                        if ($sk_buildings_json['additional_content'][$kluc]["name"] == $int_buildings_json['additional_content'][$key]["name"]) {
                            $int_buildings_json['additional_content'][$key][$dat."_t"][$lang] = $sk_buildings_json['additional_content'][$kluc][$dat];
                        }
                    }
                }
            }
        }
    }

    foreach ($int_buildings_json['buildings'] as $key => $value) {
        foreach ($int_buildings_json['buildings'][$key] as $dat => $item) {
            $int_buildings_json['buildings'][$key][$dat."_t"]["int"] = $item;

            if ($lang != null) {
                foreach ($sk_buildings_json['buildings'] as $kluc => $polozka) {
                    foreach ($sk_buildings_json['buildings'][$kluc] as $datik => $itemik) {
                        if ($sk_buildings_json['buildings'][$kluc]["house_nr"] == $int_buildings_json['buildings'][$key]["house_nr"]) {
                            $int_buildings_json['buildings'][$key][$dat."_t"][$lang] = $sk_buildings_json['buildings'][$kluc][$dat];
                        }
                    }
                }
            }
            
        }
    }

    // preklady HOUSES
    
    $int_subtitles_link = $urls["int_subtitles_link"];
    $int_subtitles_data = file_get_contents($int_subtitles_link);
    $int_subtitles_json = json_decode($int_subtitles_data, true);
    if ($lang != null) {
        $sk_subtitles_link = $urls["lang_subtitles_link"];
        $sk_subtitles_data = file_get_contents($sk_subtitles_link);
        $sk_subtitles_json = json_decode($sk_subtitles_data, true);
    }
    
    // $int_houses = "https://int.baumit.com/api/building-tour-translations?api_token=AP7R6yAeBytyvc0OASz3RhLrAH2CsCGnNDWTeLBAbyW72sMPRCiw4JAKDTz0";
    // $sk_houses = "https://baumit.sk/api/building-tour-translations?api_token=uuPus1j6IOdtp9p5EKzpusgd2TlXMuDK7C33qC8yof4IvMNCyzIPQEV9dfSI";
    
    
    
    

    foreach ($int_subtitles_json as $key => $value) {
        $int_subtitles_json[$key."_t"]["int"] = $value;

        if ($lang != null ) {
            foreach ($sk_subtitles_json as $kluc => $polozka) {
                if($key == $kluc) {
                    $int_subtitles_json[$key."_t"][$lang] = $polozka;
                }
            }
        }
        
    }

    // produkty 
    $products_link = $urls["products"];
    $products_data = file_get_contents($products_link);
    $products_json = json_decode($products_data, true);

    $output["houses"] = $int_buildings_json;
    $output["subtitles"] = $int_subtitles_json;
    $output["products"] = $products_json;
    

    die(json_encode($output));


?>