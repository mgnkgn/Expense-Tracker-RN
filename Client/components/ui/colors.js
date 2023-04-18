export const colors = [
  "#7149C6",
  "#5311E1",
  "#529B53",
  "#128B9E",
  "#FC2947",
  "#D856DF",
  "#FE6244",
  "#AF2509",
  "#FBFFB9",
  "#19E348",
];
let lastColor;

export function getRandomColor() {
  const myColor = colors[Math.floor(Math.random() * colors.length)];
  if (myColor === lastColor) {
    getRandomColor();
  }
  lastColor = myColor;
  return myColor;
}
