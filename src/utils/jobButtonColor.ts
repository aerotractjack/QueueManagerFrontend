import { randomLightColor } from "./randomLightColor";

export const jobButtonColor = (nTitles: number, titles: string[], colors: Record<string, string>) => {
  let middleTitle = "";
  if (nTitles === 0) {
    middleTitle = "";
  } else if (nTitles === 2) {
    middleTitle = titles[0];
  } else {
    middleTitle = titles[Math.floor(nTitles/2)];
  }

  let buttonColor = "#ffffff";
  if (typeof colors[middleTitle] !== "undefined") {
    buttonColor = colors[middleTitle];
  } else {
    buttonColor = randomLightColor();
  }
  return buttonColor;
};
