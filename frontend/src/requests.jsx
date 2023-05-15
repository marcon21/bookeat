const backendUrl = 'http://localhost:3000'

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
            name: "Antipasti",
            items: [
                {
                    name: "Tagliere di salumi misti",
                    price: 10,
                    description: "Lorem Ipsum",
                    submenu: "Terra"
                },
                {
                    name: "Pepata di cozze",
                    price: 10,
                    description: "Lorem Ipsum",
                    submenu: "Mare"
                },
            ]
        },
        {
            name: "Primi",
            items: [
                {
                    name: "Spaghetti MeatBalls",
                    price: 10,
                    description: "Lorem Ipsum",
                    submenu: "Terra"
                },
                {
                    name: "Spaghetti Bolognese",
                    price: 10,
                    description: "Lorem Ipsum",
                    submenu: "Mare"
                },
            ]
        },
        {
            name: "Secondi",
            items: [
                {
                    name: "Tagliata",
                    price: 10,
                    description: "Lorem Ipsum",
                    submenu: "Terra"
                },
                {
                    name: "Frittura mista di pesce",
                    price: 10,
                    description: "Lorem Ipsum",
                    submenu: "Mare"
                },
            ]
        },
        {
            name: "Pizza",
            items: [
                {
                    name: "Salamino Piccante",
                    price: 10,
                    description: "Lorem Ipsum",
                    submenu: "Terra"
                },
                {
                    name: "Gamberetti e Zucchine",
                    price: 10,
                    description: "Lorem Ipsum",
                    submenu: "Mare"
                },
            ]
        },
        {
            name: "Dolci",
            items: [
                {
                    name: "Tiramisu",
                    price: 10,
                    description: "Lorem Ipsum"
                },
                {
                    name: "Millefoglie",
                    price: 10,
                    description: "Lorem Ipsum"
                },
            ]
        },
        {
            name: "Bevande",
            items: [
                {
                    name: "Acqua",
                    price: 10,
                    description: "Lorem Ipsum",
                    submenu: "Analcolici"
                },
                {
                    name: "Birra",
                    price: 10,
                    description: "Lorem Ipsum",
                    submenu: "Alcolici"
                },
            ]
        },
    ]
}

export async function getMenu() {
    return r
}