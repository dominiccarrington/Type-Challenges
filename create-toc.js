const fs = require("fs");

const folders = {
  "0-warm-up": "Warm Up",
  "1-easy": "Easy",
  "2-medium": "Medium",
  "3-hard": "Hard",
  "4-extreme": "Extreme",
};

let text = "";

for (const folder in folders) {
  const files = fs.readdirSync(folder).filter((f) => !f.startsWith("."));
  text += "\n\n### " + folders[folder];

  for (const file of files) {
    const [id, name] = file.split("-", 2);

    const intId = parseInt(id);

    const capitalized_name = name
      .split("-")
      .map((str) => str.charAt(0).toUpperCase() + str.slice(1));
    text += `\n- [${intId}) ${capitalized_name} => ${file}](/dominiccarrington/Type-Challenges/blob/main/${folder}/${file})`;
  }
}

const re =
  /\<\!\-\-TableOfContents\-\-\>((.|\n)+)\<\!\-\-\/TableOfContents\-\-\>/;

const newText = fs
  .readFileSync("README.md")
  .toString()
  .replace(re, `<!--TableOfContents-->${text}\n\n<!--/TableOfContents-->`);

fs.writeFileSync("README.md", newText);
