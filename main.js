import {
  getInventory,
  transactionInInventory,
  clearInventory,
} from "./estoque.js";

const olJoao = document.querySelector("#joao");
const olMaria = document.querySelector("#maria");

document.entrada.addEventListener("submit", readForm);
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("buttonClearList").addEventListener("click", () => {
    clearInventory();
    updateScreen();
  });
});

updateScreen();

function readForm(event) {
  event.preventDefault(event);
  const quantity = document.entrada.quantity.valueAsNumber;
  const fruit = document.entrada.fruit.value;
  const source = document.entrada.source.value;
  const destination = document.entrada.destination.value;

  console.log(`${source} donates ${quantity} ${fruit} to ${destination}`);

  transactionInInventory(source, destination, fruit, quantity);
  updateScreen();
}

function fillList(list, personInventory) {
  list.textContent = "";

  for (let i = 0; i < personInventory.length; i++) {
    const pile = personInventory[i];
    const li = document.createElement("li");
    li.textContent = `${pile.type}: ${pile.quantity}`;
    list.appendChild(li);
  }
}

function updateScreen() {
  const inventory = getInventory();
  olJoao.innerHTML = "";
  olMaria.innerHTML = "";
  document.entrada.quantity.value = 1;
  document.entrada.fruit.value = "maca";

  console.log(inventory);
  if (inventory.joao && inventory.joao.length > 0) {
    fillList(olJoao, inventory.joao);
  }

  if (inventory.maria && inventory.maria.length > 0) {
    fillList(olMaria, inventory.maria);
  }
}
