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
  const quantidade = document.entrada.quantidade.valueAsNumber;
  const fruta = document.entrada.fruta.value;
  const origem = document.entrada.origem.value;
  const destino = document.entrada.destino.value;

  console.log(`${origem} donates ${quantidade} ${fruta} to ${destino}`);

  transactionInInventory(origem, destino, fruta, quantidade);
  updateScreen();
}

function fillList(list, personInventory) {
  list.textContent = "";

  for (let i = 0; i < personInventory.length; i++) {
    const pile = personInventory[i];
    const li = document.createElement("li");
    li.textContent = `${pile.type}: ${pile.quantidade}`;
    list.appendChild(li);
  }
}

function updateScreen() {
  const inventory = getInventory();
  olJoao.innerHTML = "";
  olMaria.innerHTML = "";
  document.entrada.quantidade.value = 1;
  document.entrada.fruta.value = "maca";

  console.log(inventory);
  if (inventory.joao && inventory.joao.length > 0) {
    fillList(olJoao, inventory.joao);
  }

  if (inventory.maria && inventory.maria.length > 0) {
    fillList(olMaria, inventory.maria);
  }
}
