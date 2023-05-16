const backendUrl = 'http://localhost:3000'

// Fake /getMenu response - To be deleted afted linking with backend
const r = {
    placement: [
        {
            label: "Antipasti",
            icon: "bi bi-heptagon",
            childrens: [
                {
                    label: "Terra",
                },
                {
                    label: "Mare",
                }
            ]
        },
        {
            label: "Primi",
            icon: "bi bi-dice-1",
            childrens: [
                {
                    label: "Terra",
                },
                {
                    label: "Mare",
                }
            ]
        },
        {
            label: "Secondi",
            icon: "bi bi-dice-2",
            childrens: [
                {
                    label: "Terra",
                },
                {
                    label: "Mare",
                }
            ]
        },
        {
            label: "Pizza",
            icon: "bi bi-dice-3",
            childrens: [
                {
                    label: "Terra",
                },
                {
                    label: "Mare",
                }
            ]
        },
        {
            label: "Dolci",
            icon: "bi bi-tencent-qq",
            childrens: []
        },
        {
            label: "Bevande",
            icon: "bi bi-cup-straw",
            childrens: [
                {
                    label: "Analcolici",
                },
                {
                    label: "Alcolici",
                }
            ]
        },
    ],
    menu: [
        {
            name: "Tagliere di salumi misti",
            price: 10,
            description: "Lorem Ipsum",
            section: "Antipasti",
            subsection: "Terra"
        },
        {
            name: "Antipasto della casa",
            price: 10,
            description: "Lorem Ipsum",
            section: "Antipasti",
            subsection: "Terra"
        },
        {
            name: "Giardiniera",
            price: 10,
            description: "Lorem Ipsum",
            section: "Antipasti",
            subsection: "Terra"
        },
        {
            name: "Tagliere di formaggi",
            price: 10,
            description: "Lorem Ipsum",
            section: "Antipasti",
            subsection: "Terra"
        },
        {
            name: "Antipasto all'italiana",
            price: 10,
            description: "Lorem Ipsum",
            section: "Antipasti",
            subsection: "Terra"
        },
        {
            name: "Pepata di cozze",
            price: 10,
            description: "Lorem Ipsum",
            section: "Antipasti",
            subsection: "Mare"
        },
        {
            name: "Spaghetti MeatBalls",
            price: 10,
            description: "Lorem Ipsum",
            section: "Primi",
            subsection: "Terra"
        },
        {
            name: "Spaghetti Bolognese",
            price: 10,
            description: "Lorem Ipsum",
            section: "Primi",
            subsection: "Mare"
        },
        {
            name: "Tagliata",
            price: 10,
            description: "Lorem Ipsum",
            section: "Secondi",
            subsection: "Terra"
        },
        {
            name: "Frittura mista di pesce",
            price: 10,
            description: "Lorem Ipsum",
            section: "Secondi",
            subsection: "Mare"
        },
        {
            name: "Salamino Piccante",
            price: 10,
            description: "Lorem Ipsum",
            section: "Pizza",
            subsection: "Terra"
        },
        {
            name: "Gamberetti e Zucchine",
            price: 10,
            description: "Lorem Ipsum",
            section: "Pizza",
            subsection: "Mare"
        },
        {
            name: "Tiramisu",
            price: 10,
            description: "Lorem Ipsum",
            section: "Dolci",
        },
        {
            name: "Millefoglie",
            price: 10,
            description: "Lorem Ipsum",
            section: "Dolci",
        },
        {
            name: "Acqua",
            price: 10,
            description: "Lorem Ipsum",
            section: "Bevande",
            subsection: "Analcolici"
        },
        {
            name: "Birra",
            price: 10,
            description: "Lorem Ipsum",
            section: "Bevande",
            subsection: "Alcolici"
        },
    ]
}


// API /getMenu POST request
export async function getMenu() {
        return r
    }