const canvas: HTMLCanvasElement | null = document.querySelector("canvas.webgl");
if (!canvas)
  throw Error(
    "Could not find canvas.webgl canvas in the document. Did you use the correct selector?"
  );

export { canvas };
