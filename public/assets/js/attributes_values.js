var activeAttrName = '';
var activeAttrPrice = 0;
var activeAttrDesc = '';
var activeAttrImg = '';

// Exteriér - Limec
var attributeA = {
    title : [
        'Biely obklad bez terasy',
        'Čierny obklad bez terasy',
        'Sivý obklad bez terasy',
        'Biely obklad s terasou',
        'Čierny obklad s terasou',
        'Sivý obklad s terasou',
    ],

    price : [
        100,200,300,400,500,600
    ],

    desc : [
        'A1 - Luxurious and fascinating, Royal Mahogany is a rare gem and offers an ideal solution to bring your home to a whole new level of sophistication and elegance.',
        'A2 - Luxurious and fascinating, Royal Mahogany is a rare gem and offers an ideal solution to bring your home to a whole new level of sophistication and elegance.',
        'A3 - Luxurious and fascinating, Royal Mahogany is a rare gem and offers an ideal solution to bring your home to a whole new level of sophistication and elegance.',
        'A4 - Luxurious and fascinating, Royal Mahogany is a rare gem and offers an ideal solution to bring your home to a whole new level of sophistication and elegance.',
        'A5 - Luxurious and fascinating, Royal Mahogany is a rare gem and offers an ideal solution to bring your home to a whole new level of sophistication and elegance.',
        'A6 - Luxurious and fascinating, Royal Mahogany is a rare gem and offers an ideal solution to bring your home to a whole new level of sophistication and elegance.',
    ], 

    img : [
        'white',
        'black',
        'grey',
        'white',
        'black',
        'grey'
    ]
};

// Exteriér - Výplň
var attributeB = {
    title : [
        'Zrkadlo',
        'Heraklit',
        'Rastre'
    ],
    price : [
        10,20,30
    ],
    desc : [
        'B1 - Luxurious and fascinating, Royal Mahogany is a rare gem and offers an ideal solution to bring your home to a whole new level of sophistication and elegance.',
        'B2 - Luxurious and fascinating, Royal Mahogany is a rare gem and offers an ideal solution to bring your home to a whole new level of sophistication and elegance.',
        'B3 - Luxurious and fascinating, Royal Mahogany is a rare gem and offers an ideal solution to bring your home to a whole new level of sophistication and elegance.',
    ],
    img : [
        'mirror',
        'heraklit',
        'rasters'
    ]
};

// Interiér - Obklad
var attributeC = {
    title : [
        'Plywood',
        'Gladstone',
        'Modrin'
    ],
    price : [
        1000,2000,3000
    ],
    desc : [
        'C1 - Luxurious and fascinating, Royal Mahogany is a rare gem and offers an ideal solution to bring your home to a whole new level of sophistication and elegance.',
        'C2 - Luxurious and fascinating, Royal Mahogany is a rare gem and offers an ideal solution to bring your home to a whole new level of sophistication and elegance.',
        'C3 - Luxurious and fascinating, Royal Mahogany is a rare gem and offers an ideal solution to bring your home to a whole new level of sophistication and elegance.',
    ],
    img : [
        'plywood',
        'gladstone',
        'modrin'
    ]
};

// Interiér - Podlaha
var attributeD = {
    title : [
        'Biela podlaha',
        'Čierna podlaha',
        'Sivá podlaha'
    ],
    price : [
        111,222,333
    ],
    desc : [
        'D1 - Luxurious and fascinating, Royal Mahogany is a rare gem and offers an ideal solution to bring your home to a whole new level of sophistication and elegance.',
        'D2 - Luxurious and fascinating, Royal Mahogany is a rare gem and offers an ideal solution to bring your home to a whole new level of sophistication and elegance.',
        'D3 - Luxurious and fascinating, Royal Mahogany is a rare gem and offers an ideal solution to bring your home to a whole new level of sophistication and elegance.',
    ],
    img : [
        'white',
        'black',
        'grey'
    ]
};

// Interiér - Kuchyňa
var attributeE = {
    title : [
        'Bez kuchyne',
        'Kuchyňa biela',
        'Kuchyňa čierna',
        'Kuchyňa sivá'
    ],
    price : [
        0,1111,2222,3332
    ],
    desc : [
        'E1 - bez kuchyne',
        'E2 - Luxurious and fascinating, Royal Mahogany is a rare gem and offers an ideal solution to bring your home to a whole new level of sophistication and elegance.',
        'E3 - Luxurious and fascinating, Royal Mahogany is a rare gem and offers an ideal solution to bring your home to a whole new level of sophistication and elegance.',
        'E4 - Luxurious and fascinating, Royal Mahogany is a rare gem and offers an ideal solution to bring your home to a whole new level of sophistication and elegance.',
    ],
    img : [
        'none',
        'white',
        'black',
        'grey'
    ]
};

// Interiér - Svetlá
var attributeF = {
    title : [
        'Bez svetiel',
        'Luster',
        'Prisadené svetlá'
    ],
    price : [
        0,101,202
    ],
    desc : [
        'F1 - bez svetiel',
        'F2 - Luxurious and fascinating, Royal Mahogany is a rare gem and offers an ideal solution to bring your home to a whole new level of sophistication and elegance.',
        'F3 - Luxurious and fascinating, Royal Mahogany is a rare gem and offers an ideal solution to bring your home to a whole new level of sophistication and elegance.',
    ],
    img : [
        'none',
        'white',
        'black'
    ]
};

// Kúpeľňa - Obklad
var attributeG = {
    title : [
        'Plywood',
        'Gladstone',
        'Modrin'
    ],
    price : [
        5001,5002,5003
    ],
    desc : [
        'G1 - Luxurious and fascinating, Royal Mahogany is a rare gem and offers an ideal solution to bring your home to a whole new level of sophistication and elegance.',
        'G2 - Luxurious and fascinating, Royal Mahogany is a rare gem and offers an ideal solution to bring your home to a whole new level of sophistication and elegance.',
        'G3 - Luxurious and fascinating, Royal Mahogany is a rare gem and offers an ideal solution to bring your home to a whole new level of sophistication and elegance.',
    ],
    img : [
        'plywood',
        'gladstone',
        'modrin'
    ]
};

// Kúpeľňa - Podlaha
var attributeH = {
    title : [
        'Biela dlažba',
        'Čierna dlažba',
        'Sivá dlažba'
    ],
    price : [
        1234,2345,3456
    ],
    desc : [
        'H1 - Luxurious and fascinating, Royal Mahogany is a rare gem and offers an ideal solution to bring your home to a whole new level of sophistication and elegance.',
        'H2 - Luxurious and fascinating, Royal Mahogany is a rare gem and offers an ideal solution to bring your home to a whole new level of sophistication and elegance.',
        'H3 - Luxurious and fascinating, Royal Mahogany is a rare gem and offers an ideal solution to bring your home to a whole new level of sophistication and elegance.',
    ],
    img : [
        'white',
        'black',
        'grey'
    ]
};

// Kúpeľňa - Skrinka
var attributeI = {
    title : [
        'Biela skrinka',
        'Čierna skrinka',
        'Sivá skrinka'
    ],
    price : [
        51,52,53
    ],
    desc : [
        'I1 - Luxurious and fascinating, Royal Mahogany is a rare gem and offers an ideal solution to bring your home to a whole new level of sophistication and elegance.',
        'I2 - Luxurious and fascinating, Royal Mahogany is a rare gem and offers an ideal solution to bring your home to a whole new level of sophistication and elegance.',
        'I3 - Luxurious and fascinating, Royal Mahogany is a rare gem and offers an ideal solution to bring your home to a whole new level of sophistication and elegance.',
    ],
    img : [
        'white',
        'black',
        'grey'
    ]
};



var Flat = {
    '0307' : {
        id : 1,
        Rooms : {
            global : {
                Groups : {
                    dvere : {
                        default : 1,
                        heading : ['Okno (Glob. premenná)'],
                        premium: ['no'],
                        title : ['VELUX'],
                        subtitle : ['drevené EURO'],
                        price : [555],
                        desc : ['Všetky okná'],
                        img : ['plywood']
                    }
                }
            },
            room1 : {
                Groups : {
                    attribute_A : { //Limec - Attribute_A
                        default : 1,
                        premium: ['no','no','no','yes','yes','yes'],
                        heading :'Limec',
                        title : [
                            'Biely obklad bez terasy',
                            'Čierny obklad bez terasy',
                            'Sivý obklad bez terasy',
                            'Biely obklad s terasou',
                            'Čierny obklad s terasou',
                            'Sivý obklad s terasou',
                        ],
                        subtitle : 'obklad',
                        price : [
                            100,200,300,400,500,600
                        ],
                        desc : [
                            'A1 - Luxurious and fascinating, Royal Mahogany is a rare gem and offers an ideal solution to bring your home to a whole new level of sophistication and elegance.',
                            'A2 - Luxurious and fascinating, Royal Mahogany is a rare gem and offers an ideal solution to bring your home to a whole new level of sophistication and elegance.',
                            'A3 - Luxurious and fascinating, Royal Mahogany is a rare gem and offers an ideal solution to bring your home to a whole new level of sophistication and elegance.',
                            'A4 - Luxurious and fascinating, Royal Mahogany is a rare gem and offers an ideal solution to bring your home to a whole new level of sophistication and elegance.',
                            'A5 - Luxurious and fascinating, Royal Mahogany is a rare gem and offers an ideal solution to bring your home to a whole new level of sophistication and elegance.',
                            'A6 - Luxurious and fascinating, Royal Mahogany is a rare gem and offers an ideal solution to bring your home to a whole new level of sophistication and elegance.',
                        ], 
                        img : [
                            'white',
                            'black',
                            'grey',
                            'white',
                            'black',
                            'grey'
                        ],  
                    },
                    attribute_B : { //Výplň - Attribute_B
                        default : 1,
                        heading :'Výplň',
                        premium: ['no','yes','no'],
                        title : [
                            'Zrkadlo',
                            'Heraklit',
                            'Rastre'
                        ],
                        subtitle : 'Vyplnenie',
                        price : [
                            10,20,30
                        ],
                        desc : [
                            'B1 - Luxurious and fascinating, Royal Mahogany is a rare gem and offers an ideal solution to bring your home to a whole new level of sophistication and elegance.',
                            'B2 - Luxurious and fascinating, Royal Mahogany is a rare gem and offers an ideal solution to bring your home to a whole new level of sophistication and elegance.',
                            'B3 - Luxurious and fascinating, Royal Mahogany is a rare gem and offers an ideal solution to bring your home to a whole new level of sophistication and elegance.'
                        ], 
                        img : [
                            'mirror',
                            'heraklit',
                            'rasters'
                        ]
                    }
                }
            }
        }
    },
    '0306' : {
        id : 2,
        Rooms : {
            global : {
                Groups : {
                    dvere : {
                        default : 1,
                        heading : ['Dvere (Glob. premenná)'],
                        premium: ['no'],
                        title : ['Kanadský javor'],
                        subtitle : ['pre celý byt'],
                        price : [999],
                        desc : ['Všetky dvere'],
                        img : ['plywood']
                    }
                }
            },
            room2 : {
                Groups : {
                    attribute_C : { // Interiér obklad
                        default : 1,
                        heading : 'Interiér obklad',
                        premium: ['no','yes','no'],
                        title : [
                            'Plywood',
                            'Gladstone',
                            'Modrin'
                        ],
                        subtitle : 'obklad',
                        price : [
                            1000,2000,3000
                        ],
                        desc : [
                            'C1 - Luxurious and fascinating, Royal Mahogany is a rare gem and offers an ideal solution to bring your home to a whole new level of sophistication and elegance.',
                            'C2 - Luxurious and fascinating, Royal Mahogany is a rare gem and offers an ideal solution to bring your home to a whole new level of sophistication and elegance.',
                            'C3 - Luxurious and fascinating, Royal Mahogany is a rare gem and offers an ideal solution to bring your home to a whole new level of sophistication and elegance.',
                        ], 
                        img : [
                            'plywood',
                            'gladstone',
                            'modrin'
                        ],  
                    },
                    attribute_D : { // Interiér podlaha
                        default : 1,
                        heading : 'Interiér podlaha',
                        premium: ['no','yes','no'],
                        title : [
                            'Biela podlaha',
                            'Čierna podlaha',
                            'Sivá podlaha'
                        ],
                        subtitle : 'Plávajúca podlaha',
                        price : [
                            111,222,333
                        ],
                        desc : [
                            'D1 - Luxurious and fascinating, Royal Mahogany is a rare gem and offers an ideal solution to bring your home to a whole new level of sophistication and elegance.',
                            'D2 - Luxurious and fascinating, Royal Mahogany is a rare gem and offers an ideal solution to bring your home to a whole new level of sophistication and elegance.',
                            'D3 - Luxurious and fascinating, Royal Mahogany is a rare gem and offers an ideal solution to bring your home to a whole new level of sophistication and elegance.'
                        ], 
                        img : [
                            'white',
                            'black',
                            'grey'
                        ]
                    },
                    attribute_E : { // Interiér kuchyňa
                        default : 1,
                        heading : 'Interiér kuchyňa',
                        premium: ['no','yes','no','yes'],
                        title : [
                            'Žiadna',
                            'Biela',
                            'Čierna',
                            'Sivá'
                        ],
                        subtitle : 'prevedenie kuchyne',
                        price : [
                            0, 1111,2222,3333
                        ],
                        desc : [
                            'E1 - Luxurious and fascinating, Royal Mahogany is a rare gem and offers an ideal solution to bring your home to a whole new level of sophistication and elegance.',
                            'E2 - Luxurious and fascinating, Royal Mahogany is a rare gem and offers an ideal solution to bring your home to a whole new level of sophistication and elegance.',
                            'E3 - Luxurious and fascinating, Royal Mahogany is a rare gem and offers an ideal solution to bring your home to a whole new level of sophistication and elegance.',
                            'E4 - Luxurious and fascinating, Royal Mahogany is a rare gem and offers an ideal solution to bring your home to a whole new level of sophistication and elegance.'
                        ], 
                        img : [
                            'none',
                            'white',
                            'black',
                            'grey'
                        ]
                    },
                    attribute_F : { // Interiér svetlá
                        default : 1,
                        heading : 'Interiér svetlá',
                        premium: ['no','yes','no'],
                        title : [
                            'Žiadne',
                            'Luster',
                            'Prisadené'
                        ],
                        subtitle : 'osvetlenie',
                        price : [
                            0, 101,202,303
                        ],
                        desc : [
                            'F1 - Luxurious and fascinating, Royal Mahogany is a rare gem and offers an ideal solution to bring your home to a whole new level of sophistication and elegance.',
                            'F2 - Luxurious and fascinating, Royal Mahogany is a rare gem and offers an ideal solution to bring your home to a whole new level of sophistication and elegance.',
                            'F3 - Luxurious and fascinating, Royal Mahogany is a rare gem and offers an ideal solution to bring your home to a whole new level of sophistication and elegance.'
                        ], 
                        img : [
                            'none',
                            'white',
                            'black'
                        ]
                    }
                }
            }
        }
    },
    '0305' : {
        id : 3,
        Rooms : {
            global : {
                Groups : {
                    dvere : {
                        default : 1,
                        heading : ['Batérie (Glob. premenná)'],
                        premium: ['no'],
                        title : ['Hansgrohe FOCUS'],
                        subtitle : ['s povrchvou úpravou'],
                        price : [1200],
                        desc : ['Všetky batérie'],
                        img : ['plywood']
                    }
                }
            },
            room3 : {
                Groups : {
                    attribute_G : { // Kúpeľňa obklad
                        default : 1,
                        heading :'Kúpeľňa obklad',
                        premium: ['no','yes','no'],
                        title : [
                            'Plywood',
                            'Gladstone',
                            'Modrin'
                        ],
                        subtitle : 'obklad',
                        price : [
                            5001,5002,5003
                        ],
                        desc : [
                            'G1 - Luxurious and fascinating, Royal Mahogany is a rare gem and offers an ideal solution to bring your home to a whole new level of sophistication and elegance.',
                            'G2 - Luxurious and fascinating, Royal Mahogany is a rare gem and offers an ideal solution to bring your home to a whole new level of sophistication and elegance.',
                            'G3 - Luxurious and fascinating, Royal Mahogany is a rare gem and offers an ideal solution to bring your home to a whole new level of sophistication and elegance.',
                        ], 
                        img : [
                            'plywood',
                            'gladstone',
                            'modrin'
                        ],  
                    },
                    attribute_H : { // Kúpeľňa podlaha
                        default : 1,
                        heading : 'Kúpeľňa podlaha',
                        premium: ['no','yes','no'],
                        title : [
                            'Biela podlaha',
                            'Čierna podlaha',
                            'Sivá podlaha'
                        ],
                        subtitle : 'dlažba',
                        price : [
                            1234,2345,3456
                        ],
                        desc : [
                            'H1 - Luxurious and fascinating, Royal Mahogany is a rare gem and offers an ideal solution to bring your home to a whole new level of sophistication and elegance.',
                            'H2 - Luxurious and fascinating, Royal Mahogany is a rare gem and offers an ideal solution to bring your home to a whole new level of sophistication and elegance.',
                            'H3 - Luxurious and fascinating, Royal Mahogany is a rare gem and offers an ideal solution to bring your home to a whole new level of sophistication and elegance.'
                        ], 
                        img : [
                            'white',
                            'black',
                            'grey'
                        ]
                    },
                    attribute_I : { // Kúpeľňa skrinka
                        default : 1,
                        heading : 'Kúpeľňa skrinka',
                        premium: ['no','yes','no'],
                        title : [
                            'Biela',
                            'Čierna',
                            'Sivá'
                        ],
                        subtitle : 'skrinka pod umývadlo',
                        price : [
                            51,52,3332
                        ],
                        desc : [
                            'I1 - Luxurious and fascinating, Royal Mahogany is a rare gem and offers an ideal solution to bring your home to a whole new level of sophistication and elegance.',
                            'I2 - Luxurious and fascinating, Royal Mahogany is a rare gem and offers an ideal solution to bring your home to a whole new level of sophistication and elegance.',
                            'I3 - Luxurious and fascinating, Royal Mahogany is a rare gem and offers an ideal solution to bring your home to a whole new level of sophistication and elegance.'
                        ], 
                        img : [
                            'white',
                            'black',
                            'grey'
                        ]
                    }
                }
            }
        }
    },
};


