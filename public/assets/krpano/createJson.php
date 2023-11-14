<!DOCTYPE html>
    <html>
    <body>

    <?php
       // API kľúče
        $apiToken = new stdClass();
        $apiToken->cz = 'ZsqPYpxsPHK3EpNwK6l7nOOyoTHIrw21Aw2pAh10BfV3mSl8he06rz1IsJNA';
        $apiToken->sk = 'uuPus1j6IOdtp9p5EKzpusgd2TlXMuDK7C33qC8yof4IvMNCyzIPQEV9dfSI';
        $apiToken->at = 'EJVpr39eQqgZ3CtFudtsOA3QurptILYv6aLjQvOh9DX8VoAvNrRthOJyBXAu';
        $apiToken->de = 'bF6JRVySe9U1xOMWi2Kc8I5pzzgZcjT9LG0F1PrmDkOPHI9nKUBv5It3bjlY';
        $apiToken->hr = 'KdZMZzWIYcj4AVjJ3VK6WvV2zCCQfx5jzDqgXk1A1Er013JaTbqlSuDLPcTZ';
        $apiToken->rs = 'FEVesKJGbx1bEm9hsXijIZwV9E332FtvbFA01YxtKjEi1Sw3AMdT6Gp1uFMk';
        $apiToken->si = 'izOhuLDDFGmEeOTxj3s3x31ZTjgI4Ck5zfqK3X5cAlpgPW5piIxtGwtdX2ZH';
        $apiToken->ba = 'Sjuab7GbAKhg6XNFGkQgLJEJXAxQ6Omwru89ErJ48AfX5uvncjpyjdx4K9xY';
        $apiToken->int = 'AP7R6yAeBytyvc0OASz3RhLrAH2CsCGnNDWTeLBAbyW72sMPRCiw4JAKDTz0';
        $apiToken->ua = 'COyMGTwBy8YgEyZanLTWyTuaoGbDpTOB13BNAHAqDNLgU7PzbGouJKYcfZIo';
        $apiToken->fr = 'e2AwJInW59w310Ve0DUEBRLL1Je8eqkf4BTTHwtCbz2YIwjXS20TaMpPHdum';
        $apiToken->es = 'k2Mb4GufP8ED3B5wRQelPHY9NimPax2VDd8utmZKLNYc3IwdGuCiZRwe7fvF';
        $apiToken->cn = 'Wf4qqUqX5qoPSvT0EzQezjt2ieaIIOUTNSmHT9VPwCDbJ1tqgmN5E32RuOSz';
        $apiToken->gr = 'DADpDgerXpQ2QchZMpjN6Rsrx4q1s7m9r1AW4hcpWi2bH9DBfP2j998gJgKl';
        $apiToken->hu = 'zG3XR4VrL5ZWh7rQlCydbGd0ysYmCziX0VOhyhEx7A3xmE9fysWf9uYhrRQR';
        $apiToken->tr = 'RxX7fNvn9y1iRmB3iGZtDYyyiMTA9nUmqXZg7dCoXP55XnOyvXJKEjr12iuhe';
        $apiToken->ro = 'mrsKaiGNc28HA49VDcZjEnof8uvjJBa4pd45M6McUq0wR8T6gYWCDgsAy3i9';
        $apiToken->uk = 'xF8BmqraDqPNxx4LfcepYpqGde0oPbu7kRtARznJxxFTiD1PukPbcdZl9cPg';
        $apiToken->it = 'UYgEsu0OxQv8zkgPnOiVLh0TTGD0aiYe2GVog2o7ithQ8fadPYRr40GNOxDY';
        $apiToken->pl = '4vtMautl3wPGnzZLogvUE6x7tZkweWzo7vQBXJCVjZbtjxigxue33NRCahrR';
        $apiToken->lv = 'UBP0CW3yVvzlw24fmTgFrXIya84dV4rEQIjaCJT4G35BdMRbiVvIYdVb4cSQ';
        $apiToken->ru = 'llN4GmBb0uWIQlr9lyfaF7qR7DmDs733Fp8wkiJs0sduzwoEG9NBvqYpSONe';
        $apiToken->by = 'xARlEVKEW4lpeuyGt8Hb8LnY63P9SjMopyEKlemGSOTzsGZ1MD6wIZvCGBs0';
        $apiToken->bg = 'cEyeSbL3VQDR9kLRUCWuHIqOT5ID59T05VVbNNbkm0bylEylgIfsDBvpAgqJ';
        $apiToken->lt = 'jgqtiedWmx17W0csUqPuaYNf1JqOCAytsdec8k739pljn83OEBft2vixQ9jn';
        $apiToken->ee = '7c0WUsKukTHuIw2rix2E7eRfn9wVSrd89hwNJLgtBz4JfHUh2UPclt4bQvZI';
        $apiToken->mk = 'JhFW6xr1bV0HjEhyCv4pIvK3X9ZMPsa25YaNkjlAPQL2izaZwvaWMNagpO00';
        $apiToken->beNl = 'cqElSqSIpHckBG14OZAxTIzUlA4i2lIHaFzMNVYgTW5zfOeyk6FiMIWU1FtP';
        $apiToken->ch = 'PoCX0p3qavOP4RL8Ke7ZiGUhidi6iT69zZ7QHNo8OOiatgjdES4iDXqeEz9p';
        $apiToken->md = 'M3Amm8ZznQ3BoROYdKeq2iEtwSjPoFc9Egf4wV8JerAMnkQvbzakElhNHCIS';
        $apiToken->beFr = 'M73nHM2cKlyK8WRkmNjGHhhEtgpq5xrvBcwgxrpXCZLoEFyiiLhxaeRTpdt2';

        // URL prefixy
        $urlPrefix = new stdClass();
        $urlPrefix->en = 'https://baumit.co.uk';
        $urlPrefix->sk = 'https://baumit.sk';
        $urlPrefix->cz = 'https://baumit.cz';
        $urlPrefix->at = 'https://baumit.at';
        $urlPrefix->de = 'https://baumit.de';
        $urlPrefix->hr = 'https://baumit.hr';
        $urlPrefix->rs = 'https://baumit.rs';
        $urlPrefix->si = 'https://baumit.si';
        $urlPrefix->ba = 'https://baumit.ba';
        $urlPrefix->ua = 'https://baumit.ua';
        $urlPrefix->fr = 'https://baumit.fr';
        $urlPrefix->es = 'https://baumit.es';
        $urlPrefix->cn = 'https://baumit.cn';
        $urlPrefix->gr = 'https://baumit.gr';
        $urlPrefix->hu = 'https://baumit.hu';
        $urlPrefix->tr = 'https://baumit.com.tr';
        $urlPrefix->ro = 'https://baumit.ro';
        $urlPrefix->uk = 'https://baumit.co.uk';
        $urlPrefix->it = 'https://baumit.it';
        $urlPrefix->pl = 'https://baumit.pl';
        $urlPrefix->lv = 'https://baumit.lv';
        $urlPrefix->ru = 'https://baumit.ru';
        $urlPrefix->by = 'https://baumit.by';
        $urlPrefix->bg = 'https://baumit.bg';
        $urlPrefix->lt = 'https://baumit.lt';
        $urlPrefix->ee = 'https://baumit.ee';
        $urlPrefix->mk = 'https://baumit.mk';
        $urlPrefix->nl = 'https://baumit.nl';
        $urlPrefix->ch = 'https://ch.baumit.com';
        $urlPrefix->md = 'https://baumit.md';
        $urlPrefix->beNl = 'https://baumit.be';
        $urlPrefix->beFr = 'https://fr.baumit.be';
        $urlPrefix->int = 'https://int.baumit.com';

        foreach ($apiToken as $key => $value) {
            echo("<br>key : ".$key." | value : ".$value);
            $lang = $key;

             // Preklady BUILDINGS
            $int_buildings_link = $urlPrefix->int.'/api/buildings?api_token='.$apiToken->int;
            $int_buildings_data = file_get_contents($int_buildings_link);
            echo("int url : ".$int_buildings_link);
            $int_buildings_json = json_decode($int_buildings_data, true);
            $sk_buildings_link = $urlPrefix->$lang.'/api/buildings?api_token='.$apiToken->$lang;
            echo(":: lang url : ".$sk_buildings_link."<br>");
            $sk_buildings_data = file_get_contents($sk_buildings_link);
            $sk_buildings_json = json_decode($sk_buildings_data, true);
            

            foreach ($int_buildings_json['additional_content'] as $key => $value) {
                foreach ($int_buildings_json['additional_content'][$key] as $dat => $item) {
                    $int_buildings_json['additional_content'][$key][$dat."_t"]["int"] = $item;
        
                    if ($lang != null) {
                        foreach ($sk_buildings_json['additional_content'] as $kluc => $polozka) {
                            foreach ($sk_buildings_json['additional_content'][$kluc] as $datik => $itemik) {
                                if ($sk_buildings_json['additional_content'][$kluc]["name"] == $int_buildings_json['additional_content'][$key]["name"]) {
                                    $int_buildings_json['additional_content'][$key][$dat."_t"][$lang] = $sk_buildings_json['additional_content'][$kluc][$dat];
                                    break;
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
                                if ($sk_buildings_json['buildings'][$kluc]["international_house_nr"] == $int_buildings_json['buildings'][$key]["international_house_nr"]) {
                                    $int_buildings_json['buildings'][$key][$dat."_t"][$lang] = $sk_buildings_json['buildings'][$kluc][$dat];
                                    break;
                                }
                            }
                        }
                    }
                    
                }
            }

            // Preklady 
            $int_subtitles_link = $urlPrefix->int.'/api/building-tour-translations?api_token='.$apiToken->int;
            $int_subtitles_data = file_get_contents($int_subtitles_link);
            $int_subtitles_json = json_decode($int_subtitles_data, true);

            $sk_subtitles_link = $urlPrefix->$lang.'/api/building-tour-translations?api_token='.$apiToken->$lang;
            echo ("<br>".$sk_subtitles_link."<br>");
            $sk_subtitles_data = file_get_contents($sk_subtitles_link);
            $sk_subtitles_json = json_decode($sk_subtitles_data, true);

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
            $products_link = $urlPrefix->$lang.'/api/products/products?api_token='.$apiToken->$lang;
            $products_data = file_get_contents($products_link);
            $products_json = json_decode($products_data, true);

            $output["houses"] = $int_buildings_json;
            $output["subtitles"] = $int_subtitles_json;
            $output["products"] = $products_json;
            $output["lang"] = $lang;

            $filename = $lang.".json";
            file_put_contents($filename, json_encode($output));
            echo('<a href="https://baumit.zone360.sk/assets/krpano/'.$lang.'.json"> ::::::::: '.$filename.'</a>');
        }

        
        
        // echo("<br>".$int_buildings_link);
        // echo("<br>".$lang_buildings_link);
        // echo("<br>".$int_subtitles_link);
        // echo("<br>".$lang_subtitles_link);
        // echo("<br>".$products);

       
    ?>
 
</body>
</html>
        