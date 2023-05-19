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

export function formatCategoryList(list) {
  let icons = {
    "Antipasti": "bi bi-heptagon",
    "Primi": "bi bi-dice-1",
    "Secondi": "bi bi-dice-2",
    "Dessert": "bi bi-dice-3",
    "Bevande": "bi bi-cup-straw",
  }
  let result = []
  let secondarie = []
  list.forEach((item) => {
    if (item["primaria"]) {
      if (!result.includes(item["primaria"])) {
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