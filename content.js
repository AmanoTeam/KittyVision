const catUrl = "https://cataas.com/cat";

function replaceImages() {
  const images = document.getElementsByTagName("img");
  for (let i = 0; i < images.length; i++) {
    images[i].src = `${catUrl}?${i}`;
  }
}

replaceImages();
