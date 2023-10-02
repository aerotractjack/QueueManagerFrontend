export const randomLightColor = () => {
  let hexTab = "5555556789ABCDEF";  //  light random colors
  let r = hexTab[ Math.floor( Math.random() * 16) ];
  let g = hexTab[ Math.floor( Math.random() * 16) ];
  let b = hexTab[ Math.floor( Math.random() * 16) ];
  return "#" + r + g + b;
}