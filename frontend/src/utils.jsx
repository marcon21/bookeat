// Utilities functions to be used in the app

// Function to create a random string of a given length
export function makeString(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

// Function to create a random unique key identifier string that includes an index given
export function makeKey(index) {
  return "".concat(index).concat("-").concat(makeString(10))
}

// Function to format the category list from backend in a way that can be used in the frontend
export function formatCategoryList(list) {
  let icons = {
    "Antipasti": "bi bi-heptagon",
    "Insalate": "bi bi-dice-1",
    "Noodles": "bi bi-dice-2",
    "Panini": "bi bi-dice-3",
    "Pasta": "bi bi-dice-4",
    "Piatti Principali": "bi bi-dice-5",
    "Pizza": "bi bi-dice-6",
    "Risotti": "bi bi-dice-1",
    "Sushi": "bi bi-dice-2"
  }
  let result = []
  let secondarie = []
  list.forEach((item) => {
    if (item["primaria"]) {
      if (!result.some((r) => r["label"] === item["primaria"])) {
        // if item["primaria"] is not a key in icons, set it to a default icon
        if (!Object.keys(icons).includes(item["primaria"])) {
          icons[item["primaria"]] = "bi bi-app"
        }
        result.push({
          label: item["primaria"],
          icon: icons[item["primaria"]],
          childrens: []
        })
      }
      if (item["secondaria"] && !secondarie.includes(item["secondaria"])) {
        secondarie.push(item["secondaria"])
        result.forEach((r) => {
          if (r["label"] === item["primaria"]) {
            r["childrens"].push(item["secondaria"])
          }
        })
      }
    }
  }
  )
  return result
}