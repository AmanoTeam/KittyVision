const catUrl = "https://cataas.com/cat";

function replaceImages(images) {
  for (let i = 0; i < images.length; i++) {
    if (!images[i].src.startsWith(catUrl)) {
      images[i].src = `${catUrl}?${images[i].src}`;
    }
  }
}

replaceImages(document.getElementsByTagName("img"));

const observer = new MutationObserver((mutationsList, _observer) => {
  for (let mutation of mutationsList) {
    if (mutation.type === "childList") {
      mutation.addedNodes.forEach((addedNode) => {
        let elements = addedNode.getElementsByTagName("img");
        replaceImages(elements);
      })
    } else if (mutation.type === "attributes" && mutation.target.tagName.toLowerCase() === "img") {
      if (!mutation.target.src.startsWith(catUrl)) {
        mutation.target.src = `${catUrl}?${mutation.target.src}`;
      }
    }
  }
});

observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["src"] });
