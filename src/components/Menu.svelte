<script>

    async function fetchData($url, $lang, $type, $variable) {
        
        $variable = false;
        if (_vivaData[$lang] == undefined) {
            const res = await fetch($url);
            const json = await res.json();

            if (res.ok) {

                if (_vivaData[$lang] == undefined) {
                    _vivaData[$lang] = {
                        houses : null,
                        subtitles : null,
                        products : null
                    };
                }
                _vivaData[$lang][$type] = json; 
                vivaData.update(n => _vivaData);       

                if ($type == "houses") {
                    console.log(_vivaData);
                }

            } else {
                throw new Error(json);
            }            
        }    
        $variable = true;
        
    }

    const url = "https://int.baumit.com/api/buildings?api_token=AP7R6yAeBytyvc0OASz3RhLrAH2CsCGnNDWTeLBAbyW72sMPRCiw4JAKDTz0";
    console.log(url);
</script>