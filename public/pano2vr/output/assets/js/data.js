var csvURL = 'assets/data/data_updated.csv';	

$.ajax({
    type: 'GET', 
    url: csvURL,
    dataType: 'text',  
    success: function(response) {  
       readCSVFile(response, AllFlats);
       console.log('Načítavam CSV súbor...');
    },
    error: function() {
        console.log('Chyba pri načítavaní CSV súboru !');
    }
});


var AllFlats = {};
AllFlats = {};

function readCSVFile(response, AllFlats) {
    var lines = response.split("\n");
    var counter = 1;
    var prefix = 'attribute_';
    var _flatID = '';
    var _groupName = [];
    var _attributesDescriptions = [];
    var _attributesThumbnails = [];
    var _attributesNames = [];
    var _attributeID = '';
    

    for (var i = 1; i < lines.length; i++) {
        _flatID = lines[i].split(";")[0]; 
        _attributeId = lines[i].split(";")[1];                  // ID atribútu
        _groupName = lines[i].split(";")[2];                    // Názov skupiny atribútu
        _attributesNames = lines[i].split(";")[3];              // Názvy atribútov
        _attributesDescriptions = lines[i].split(";")[4];       // Popisy atribútov
        _attributesPrices = lines[i].split(";")[5];             // Ceny atribútov
        _attributesThumbnails = lines[i].split(";")[6];         // Miniatúry atribútov
        _attributesGrouped = lines[i].split(";")[7];            // Zoskupený atribút ID
        _attributesActiveItem = lines[i].split(";")[9];         // Predvolený atribút
        _attributesPremium = lines[i].split(";")[10];           // Prémiový produkt
        _attributeID = _attributeId;

        function AddElements() {
            AllFlats[_flatID][_attributeID] = {
                'id': _attributeID,
                'name' : _groupName,
            };
            // // Názvy
            AllFlats[_flatID][_attributeID].Names = [];
            AllFlats[_flatID][_attributeID].Names.push(_attributesNames);
            AllFlats[_flatID][_attributeID].Names = AllFlats[_flatID][_attributeID].Names.toString().replace('\r','').split('|');
            //Popisy
            AllFlats[_flatID][_attributeID].Descriptions = [];
            AllFlats[_flatID][_attributeID].Descriptions.push(_attributesDescriptions);
            AllFlats[_flatID][_attributeID].Descriptions = AllFlats[_flatID][_attributeID].Descriptions.toString().replace('\r','').split('|');
            DescCount = AllFlats[_flatID][_attributeID].Descriptions.length;
            //Ceny
            AllFlats[_flatID][_attributeID].Prices = [];
            AllFlats[_flatID][_attributeID].Prices.push(_attributesPrices);
            AllFlats[_flatID][_attributeID].Prices = AllFlats[_flatID][_attributeID].Prices.toString().replace('\r','').split('|');
            PriceCount = AllFlats[_flatID][_attributeID].Prices.length;
            //Miniatúry
            AllFlats[_flatID][_attributeID].Thumbnails = [];
            AllFlats[_flatID][_attributeID].Thumbnails.push(_attributesThumbnails);
            AllFlats[_flatID][_attributeID].Thumbnails = AllFlats[_flatID][_attributeID].Thumbnails.toString().replace('\r','').split('|');
            ThumbCount = AllFlats[_flatID][_attributeID].Thumbnails.length;
            //Zoskupený atribút
            AllFlats[_flatID][_attributeID].Grouped = '';
            AllFlats[_flatID][_attributeID].Grouped = _attributesGrouped;
            //Prémiový atribút
            AllFlats[_flatID][_attributeID].Premium = [];
            AllFlats[_flatID][_attributeID].Premium.push(_attributesPremium);
            AllFlats[_flatID][_attributeID].Premium = AllFlats[_flatID][_attributeID].Premium.toString().replace('\r','').split('|');
            ThumbCount = AllFlats[_flatID][_attributeID].Premium.length;

            //Aktívna položka
            if (_attributesActiveItem == '' || _attributesActiveItem == '\r' ) {
                AllFlats[_flatID][_attributeID].ActiveItem = '1';
            }
            else {
                AllFlats[_flatID][_attributeID].ActiveItem = _attributesActiveItem;
            }
            counter++;
        }

        if (_flatID == '') {
            //console.log('Prázdny záznam');
        }

        else if (_flatID in AllFlats ) {
            //console.log('Byt už je načítaný');
            AddElements();   
        }
        else { 
            AllFlats[_flatID] = {};
            AddElements();
        }
    }
    console.log(AllFlats);
    console.log('CSV súbor načítaný korenktne');
};