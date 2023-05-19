const mongoose = require('mongoose');
const Piatto = require('../db/piatto').Piatto;

// Creazione di un oggetto di esempio per il popolamento del database
const data = [
    {
        "nome": "Pizza Margherita",
        "prezzo": 500,
        "categoria": {
            "primaria": "Pizza",
            "secondaria": "Classica"
        },
        "disponibile": 1,
        "descrizione": "Pizza con mozzarella e pomodoro",
        "allergeni": [
            "Glutine",
            "Lattosio"
        ],
        "ingredientiModificabili": [
            "Mozzarella",
            "Salamino",
            "Funghi"
        ]
    },
    {
        "nome": "Spaghetti alla Carbonara",
        "prezzo": 700,
        "categoria": {
            "primaria": "Pasta",
            "secondaria": "Italiana"
        },
        "disponibile": 1,
        "descrizione": "Spaghetti con pancetta, uova e formaggio",
        "allergeni": [
            "Glutine",
            "Lattosio",
            "Uova"
        ],
        "ingredientiModificabili": [
            "Pancetta",
            "Uova",
            "Formaggio"
        ]
    },
    {
        "nome": "Hamburger",
        "prezzo": 800,
        "categoria": {
            "primaria": "Panini",
            "secondaria": "Americana"
        },
        "disponibile": 1,
        "descrizione": "Hamburger con carne, insalata e pomodoro",
        "allergeni": [
            "Glutine"
        ],
        "ingredientiModificabili": [
            "Formaggio",
            "Cipolla",
            "Salsa"
        ]
    },
    {
        "nome": "Sushi Misto",
        "prezzo": 1200,
        "categoria": {
            "primaria": "Sushi",
            "secondaria": "Giapponese"
        },
        "disponibile": 1,
        "descrizione": "Assortimento di sushi e sashimi",
        "allergeni": [],
        "ingredientiModificabili": [
            "Tonno",
            "Salmone",
            "Gamberi"
        ]
    },
    {
        "nome": "Insalata Caesar",
        "prezzo": 600,
        "categoria": {
            "primaria": "Insalate",
            "secondaria": "Contemporanea"
        },
        "disponibile": 1,
        "descrizione": "Insalata con pollo, crostini e salsa Caesar",
        "allergeni": [
            "Glutine",
            "Lattosio"
        ],
        "ingredientiModificabili": [
            "Pollo",
            "Crostini",
            "Parmigiano"
        ]
    },
    {
        "nome": "Steakhouse Burger",
        "prezzo": 900,
        "categoria": {
            "primaria": "Panini",
            "secondaria": "Americana"
        },
        "disponibile": 1,
        "descrizione": "Hamburger con formaggio, bacon e salsa barbecue",
        "allergeni": [
            "Glutine",
            "Lattosio"
        ],
        "ingredientiModificabili": [
            "Formaggio",
            "Bacon",
            "Salsa barbecue"
        ]
    },
    {
        "nome": "Lasagna al Forno",
        "prezzo": 850,
        "categoria": {
            "primaria": "Pasta",
            "secondaria": "Italiana"
        },
        "disponibile": 1,
        "descrizione": "Lasagna con carne macinata, besciamella e formaggio",
        "allergeni": [
            "Glutine",
            "Lattosio"
        ],
        "ingredientiModificabili": [
            "Carne macinata",
            "Besciamella",
            "Formaggio"
        ]
    },
    {
        "nome": "Fish and Chips",
        "prezzo": 850,
        "categoria": {
            "primaria": "Piatti Principali",
            "secondaria": "Inglese"
        },
        "disponibile": 1,
        "descrizione": "Filetto di pesce impanato con patatine fritte",
        "allergeni": [
            "Glutine",
            "Pesce"
        ],
        "ingredientiModificabili": [
            "Filetto di pesce",
            "Patatine fritte"
        ]
    },
    {
        "nome": "Caprese Salad",
        "prezzo": 550,
        "categoria": {
            "primaria": "Insalate",
            "secondaria": "Mediterranea"
        },
        "disponibile": 1,
        "descrizione": "Insalata con mozzarella, pomodoro e basilico",
        "allergeni": [
            "Lattosio"
        ],
        "ingredientiModificabili": [
            "Mozzarella",
            "Pomodoro",
            "Basilico"
        ]
    },
    {
        "nome": "Ramen di Maiale",
        "prezzo": 900,
        "categoria": {
            "primaria": "Noodles",
            "secondaria": "Giapponese"
        },
        "disponibile": 1,
        "descrizione": "Zuppa di noodle con maiale, uova e verdure",
        "allergeni": [
            "Glutine",
            "Uova"
        ],
        "ingredientiModificabili": [
            "Maiale",
            "Uova",
            "Verdure"
        ]
    },
    {
        "nome": "Gnocchi al Pesto",
        "prezzo": 750,
        "categoria": {
            "primaria": "Pasta",
            "secondaria": "Italiana"
        },
        "disponibile": 1,
        "descrizione": "Gnocchi con salsa al pesto",
        "allergeni": [
            "Glutine",
            "Frutta a guscio"
        ],
        "ingredientiModificabili": [
            "Gnocchi",
            "Pesto"
        ]
    },
    {
        "nome": "Caesar Wrap",
        "prezzo": 700,
        "categoria": {
            "primaria": "Panini",
            "secondaria": "Contemporanea"
        },
        "disponibile": 1,
        "descrizione": "Wrap con pollo, insalata e salsa Caesar",
        "allergeni": [
            "Glutine",
            "Lattosio"
        ],
        "ingredientiModificabili": [
            "Pollo",
            "Insalata",
            "Salsa Caesar"
        ]
    },
    {
        "nome": "Risotto ai Funghi",
        "prezzo": 800,
        "categoria": {
            "primaria": "Risotti",
            "secondaria": "Italiana"
        },
        "disponibile": 1,
        "descrizione": "Risotto con funghi porcini e parmigiano",
        "allergeni": [
            "Glutine",
            "Lattosio"
        ],
        "ingredientiModificabili": [
            "Funghi porcini",
            "Parmigiano"
        ]
    },
    {
        "nome": "Chicken Teriyaki",
        "prezzo": 850,
        "categoria": {
            "primaria": "Piatti Principali",
            "secondaria": "Giapponese"
        },
        "disponibile": 1,
        "descrizione": "Pollo alla griglia glassato con salsa teriyaki",
        "allergeni": [],
        "ingredientiModificabili": [
            "Pollo",
            "Salsa teriyaki"
        ]
    },
    {
        "nome": "Insalata di Frutti di Mare",
        "prezzo": 950,
        "categoria": {
            "primaria": "Insalate",
            "secondaria": "Frutti di Mare"
        },
        "disponibile": 1,
        "descrizione": "Insalata con gamberi, calamari e cozze",
        "allergeni": [
            "Frutti di mare"
        ],
        "ingredientiModificabili": [
            "Gamberi",
            "Calamari",
            "Cozze"
        ]
    },
    {
        "nome": "Pasta alla Norma",
        "prezzo": 750,
        "categoria": {
            "primaria": "Pasta",
            "secondaria": "Italiana"
        },
        "disponibile": 1,
        "descrizione": "Pasta con melanzane, pomodoro e ricotta salata",
        "allergeni": [
            "Glutine",
            "Lattosio"
        ],
        "ingredientiModificabili": [
            "Melanzane",
            "Pomodoro",
            "Ricotta salata"
        ]
    },
    {
        "nome": "Chicken Satay",
        "prezzo": 800,
        "categoria": {
            "primaria": "Antipasti",
            "secondaria": "Asiatica"
        },
        "disponibile": 1,
        "descrizione": "Spiedini di pollo con salsa di arachidi",
        "allergeni": [
            "Arachidi"
        ],
        "ingredientiModificabili": [
            "Pollo",
            "Salsa di arachidi"
        ]
    },
    {
        "nome": "Penne all'Arrabbiata",
        "prezzo": 700,
        "categoria": {
            "primaria": "Pasta",
            "secondaria": "Italiana"
        },
        "disponibile": 1,
        "descrizione": "Penne con salsa piccante di pomodoro",
        "allergeni": [
            "Glutine"
        ],
        "ingredientiModificabili": [
            "Penne",
            "Salsa piccante"
        ]
    },
    {
        "nome": "Salmone alla Griglia",
        "prezzo": 1100,
        "categoria": {
            "primaria": "Piatti Principali",
            "secondaria": "Pesce"
        },
        "disponibile": 1,
        "descrizione": "Filetto di salmone alla griglia con contorno di verdure",
        "allergeni": [
            "Pesce"
        ],
        "ingredientiModificabili": [
            "Filetto di salmone",
            "Verdure"
        ]
    },
    {
        "nome": "Risotto ai Frutti di Mare",
        "prezzo": 950,
        "categoria": {
            "primaria": "Risotti",
            "secondaria": "Frutti di Mare"
        },
        "disponibile": 1,
        "descrizione": "Risotto con gamberi, calamari e cozze",
        "allergeni": [
            "Frutti di mare"
        ],
        "ingredientiModificabili": [
            "Gamberi",
            "Calamari",
            "Cozze"
        ]
    },
    {
        "nome": "Carpaccio di Manzo",
        "prezzo": 900,
        "categoria": {
            "primaria": "Antipasti",
            "secondaria": "Italiana"
        },
        "disponibile": 1,
        "descrizione": "Fettine di manzo crudo con rucola e parmigiano",
        "allergeni": [
            "Lattosio"
        ],
        "ingredientiModificabili": [
            "Manzo",
            "Rucola",
            "Parmigiano"
        ]
    },
    {
        "nome": "Pizza Prosciutto e Funghi",
        "prezzo": 600,
        "categoria": {
            "primaria": "Pizza",
            "secondaria": "Classica"
        },
        "disponibile": 1,
        "descrizione": "Pizza con prosciutto cotto e funghi",
        "allergeni": [
            "Glutine",
            "Lattosio"
        ],
        "ingredientiModificabili": [
            "Prosciutto cotto",
            "Funghi"
        ]
    },
    {
        "nome": "Gnocchi alla Sorrentina",
        "prezzo": 750,
        "categoria": {
            "primaria": "Pasta",
            "secondaria": "Italiana"
        },
        "disponibile": 1,
        "descrizione": "Gnocchi con salsa di pomodoro e mozzarella",
        "allergeni": [
            "Glutine",
            "Lattosio"
        ],
        "ingredientiModificabili": [
            "Gnocchi",
            "Salsa di pomodoro",
            "Mozzarella"
        ]
    },
    {
        "nome": "Sushi Vegetariano",
        "prezzo": 1000,
        "categoria": {
            "primaria": "Sushi",
            "secondaria": "Giapponese"
        },
        "disponibile": 1,
        "descrizione": "Assortimento di sushi vegetariani",
        "allergeni": [],
        "ingredientiModificabili": [
            "Avocado",
            "Cetriolo",
            "Asparagi"
        ]
    },
    {
        "nome": "Insalata Greca",
        "prezzo": 600,
        "categoria": {
            "primaria": "Insalate",
            "secondaria": "Mediterranea"
        },
        "disponibile": 1,
        "descrizione": "Insalata con pomodoro, cetriolo, olive e formaggio feta",
        "allergeni": [
            "Lattosio"
        ],
        "ingredientiModificabili": [
            "Pomodoro",
            "Cetriolo",
            "Olive",
            "Formaggio feta"
        ]
    },
    {
        "nome": "Pollo al Curry",
        "prezzo": 850,
        "categoria": {
            "primaria": "Piatti Principali",
            "secondaria": "Asiatica"
        },
        "disponibile": 1,
        "descrizione": "Pollo in salsa di curry con riso basmati",
        "allergeni": [],
        "ingredientiModificabili": [
            "Pollo",
            "Salsa di curry",
            "Riso basmati"
        ]
    },
    {
        "nome": "Tagliatelle al Ragù",
        "prezzo": 750,
        "categoria": {
            "primaria": "Pasta",
            "secondaria": "Italiana"
        },
        "disponibile": 1,
        "descrizione": "Tagliatelle con ragù di carne",
        "allergeni": [
            "Glutine"
        ],
        "ingredientiModificabili": [
            "Tagliatelle",
            "Ragù di carne"
        ]
    },
    {
        "nome": "Chicken Korma",
        "prezzo": 900,
        "categoria": {
            "primaria": "Piatti Principali",
            "secondaria": "Asiatica"
        },
        "disponibile": 1,
        "descrizione": "Pollo in salsa di korma con riso basmati",
        "allergeni": [],
        "ingredientiModificabili": [
            "Pollo",
            "Salsa di korma",
            "Riso basmati"
        ]
    },
    {
        "nome": "Insalata di Quinoa",
        "prezzo": 650,
        "categoria": {
            "primaria": "Insalate",
            "secondaria": "Salutista"
        },
        "disponibile": 1,
        "descrizione": "Insalata con quinoa, verdure e semi di sesamo",
        "allergeni": [],
        "ingredientiModificabili": [
            "Quinoa",
            "Verdure",
            "Semi di sesamo"
        ]
    },
    {
        "nome": "Cannelloni alla Fiorentina",
        "prezzo": 800,
        "categoria": {
            "primaria": "Pasta",
            "secondaria": "Italiana"
        },
        "disponibile": 1,
        "descrizione": "Cannelloni ripieni di ricotta e spinaci, al gratin",
        "allergeni": [
            "Glutine",
            "Lattosio"
        ],
        "ingredientiModificabili": [
            "Ricotta",
            "Spinaci"
        ]
    }
];

// Funzione per il popolamento del database
async function populateDatabase() {
    try {
        // await Piatto.deleteMany({}); // Rimuove tutti i documenti dal modello

        await Piatto.insertMany(data); // Inserisce i dati nel modello

        console.log('Popolamento del database completato.');
        mongoose.connection.close(); // Chiude la connessione al database dopo il completamento
    } catch (error) {
        console.error('Errore durante il popolamento del database:', error);
    }
}

// Esecuzione della funzione di popolamento
populateDatabase();
