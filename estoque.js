let inventory = {
  joao: [{ type: "maca", quantity: 1 }],
  maria: [{ type: "maca", quantity: 2 }],
};

export function getInventory() {
  return structuredClone(inventory);
}

export function transactionInInventory(from, to, type, quantity) {
  console.log(from, to, type, quantity);
  if (!inventory[from] && from !== "pomar") {
    inventory[from] = [];
  }
  if (!inventory[to] && to !== "pomar") {
    inventory[to] = [];
  }
  if (quantity < 0 || from === to) return;

  if (to === "pomar") {
    let foundItem = inventory[from].find((item) => item.type === type);

    if (foundItem) {
      if (foundItem.quantity >= quantity) {
        foundItem.quantity = foundItem.quantity - quantity;
      } else {
        foundItem.quantity = 0;
      }
    } else {
      return;
    }
    return;
  }
  if (from === "pomar") {
    const foundItem = inventory[to].find((item) => item.type === type);
    if (foundItem) {
      foundItem.quantity += quantity;
    } else {
      inventory[to].push({ type, quantity });
    }
    console.log("inventory");
    console.log(inventory);
    return;
  } else {
    let sourceItem = inventory[from].find((item) => item.type === type);
    let destinationItem = inventory[to].find((item) => item.type === type);

    if (!sourceItem) return;
    else if (sourceItem.quantity < quantity) {
      if (destinationItem) {
        destinationItem.quantity += sourceItem.quantity;
      } else {
        inventory[to].push({ type: type, quantity: sourceItem.quantity });
      }
      sourceItem.quantity = 0;
    } else {
      if (destinationItem) {
        destinationItem.quantity += quantity;
      } else {
        inventory[to].push({ type, quantity });
      }
      sourceItem.quantity = sourceItem.quantity - quantity;
    }
  }
  return;
}

export function clearInventory() {
  inventory = {};
}
