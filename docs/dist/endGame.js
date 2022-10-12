export function endGame(endTime) {
  document.getElementById("finish-screen")?.classList.remove("hide");
  document.getElementById("finish-screen").innerHTML = `<p>A winner is you,
 you won in </p><h1>${endTime}ms</h1>`;
}
