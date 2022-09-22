import { decoration } from "decoration";
import "./style.css";
import { startGame } from "./startGame";

document.getElementById("start")?.addEventListener("click", () => {
  document.getElementById("start")!.innerHTML = "Loading...";
  document.getElementById("start")!.classList.add("small");
  setTimeout(() => startGame(), 1);
});

document.getElementById("controls")?.addEventListener("click", () => {
  document.getElementById("controls-menu")?.classList.remove("hide");
});
document.addEventListener("keydown", (e) => {
  if (e.key == "Escape") {
    document.getElementById("controls-menu")?.classList.add("hide");
  }
});
