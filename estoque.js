let inventory = {
  joao: [{ type: "maca", quantidade: 1 }],
  maria: [{ type: "maca", quantidade: 2 }],
};

export function getInventory() {
  return structuredClone(inventory);
}

export function transactionInInventory(from, to, type, quantidade) {
  console.log(from, to, type, quantidade);
  if (!inventory[from] && from !== "pomar") {
    inventory[from] = [];
  }
  if (!inventory[to] && to !== "pomar") {
    inventory[to] = [];
  }
  if (quantidade < 0 || from === to) return;

  if (to === "pomar") {
    let foundItem = inventory[from].find((item) => item.type === type);

    if (foundItem) {
      if (foundItem.quantidade >= quantidade) {
        foundItem.quantidade = foundItem.quantidade - quantidade;
      } else {
        foundItem.quantidade = 0;
      }
    } else {
      return;
    }
    return;
  }
  if (from === "pomar") {
    const foundItem = inventory[to].find((item) => item.type === type);
    if (foundItem) {
      foundItem.quantidade += quantidade;
    } else {
      inventory[to].push({ type, quantidade });
    }
    console.log("inventory");
    console.log(inventory);
    return;
  } else {
    let sourceItem = inventory[from].find((item) => item.type === type);
    let destinationItem = inventory[to].find((item) => item.type === type);

    if (!sourceItem) return;
    else if (sourceItem.quantidade < quantidade) {
      if (destinationItem) {
        destinationItem.quantidade += sourceItem.quantidade;
      } else {
        inventory[to].push({ type: type, quantidade: sourceItem.quantidade });
      }
      sourceItem.quantidade = 0;
    } else {
      if (destinationItem) {
        destinationItem.quantidade += quantidade;
      } else {
        inventory[to].push({ type, quantidade });
      }
      sourceItem.quantidade = sourceItem.quantidade - quantidade;
    }
  }
  return;
}

export function clearInventory() {
  inventory = {};
}
