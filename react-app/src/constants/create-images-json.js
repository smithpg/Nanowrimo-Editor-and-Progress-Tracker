const fs = require("fs"),
  IMAGE_DIR = "../../public/gallery/",
  WRITE_DIR = "./images.json";

fs.readdir(IMAGE_DIR, (err, files) => {
  if (err) {
    console.error(err);
  }

  const json = JSON.stringify(
    files.map(file => {
      return { path: `/gallery/${file}` };
    })
  );

  fs.writeFileSync(WRITE_DIR, json);
});
