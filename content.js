const catUrl = "https://cataas.com/cat";

function replaceImages(images) {
  for (let i = 0; i < images.length; i++) {
    if (!images[i].src.startsWith(catUrl)) {
      images[i].src = `${catUrl}?${images[i].src}`;
    }
  }
}

replaceImages(document.querySelectorAll("img,figure"));

const observer = new MutationObserver((mutationsList, _observer) => {
  for (let mutation of mutationsList) {
    if (mutation.type === "childList") {
      mutation.addedNodes.forEach((addedNode) => {
        if (addedNode.nodeName === "img" || addedNode.nodeName === "figure") {
          let docFragment = document.createDocumentFragment();
          docFragment.appendChild(addedNode);
          return replaceImages(docFragment.children);
        }

        let elements = addedNode.querySelectorAll("img,figure");
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
