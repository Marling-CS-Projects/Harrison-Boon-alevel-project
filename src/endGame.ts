export function endGame(endTime: number) {
  document.getElementById("finish-screen")?.classList.remove("hide");
  document.getElementById(
    "finish-screen"
  )!.innerHTML = `<p>A winner is you,\n you won in </p><h1>${endTime}ms</h1>`;
}
