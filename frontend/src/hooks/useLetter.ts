export default function (author_name: string) {
  const author = author_name.toUpperCase() || ' ';
  let L1 = " ", L2 = "";
  L1 = author && author[0];
  if (author.length >= 2) {
    L1 = author[0];
    if (author.includes(" ")) {
      L2 = author.split(" ")[1][0];
    } else {
      L2 = author[1];
    }
  }
  return L1+L2;
}
