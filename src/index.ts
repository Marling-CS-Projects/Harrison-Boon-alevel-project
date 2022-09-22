import { decoration } from "decoration";
import "./style.css";
import { startGame } from "./startGame";

document.getElementById("start")?.addEventListener("click", () => {
  document.getElementById("start")!.innerHTML = "Loading...";
  document.getElementById("start")!.classList.add("small");
  setTimeout(() => startGame(), 1);
});

document.getElementById("settings")?.addEventListener("click", () => {
  document.getElementById("settings-menu")?.classList.remove("hide");
});
document.addEventListener("keydown", (e) => {
  if (e.key == "Escape") {
    document.getElementById("settings-menu")?.classList.add("hide");
  }
});
