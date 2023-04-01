const catUrl = "https://cataas.com/cat";

function replaceImages(images) {
  for (let image of images) {
    if (!image.src.startsWith(catUrl)) {
      image.src = `${catUrl}?${image.src}`;
    }
  }
}

replaceImages(document.querySelectorAll("img,figure"));

const observer = new MutationObserver((mutationsList, _observer) => {
  for (let mutation of mutationsList) {
    if (mutation.type === "childList") {
      for (let addedNode of mutation.addedNodes) {
        if (addedNode.nodeType != Node.ELEMENT_NODE) {
          return;
        }

        if (addedNode.nodeName === "img" || addedNode.nodeName === "figure") {
          let docFragment = document.createDocumentFragment();
          docFragment.appendChild(addedNode);
          return replaceImages(docFragment.children);
        }

        let elements = addedNode.querySelectorAll("img,figure");
        replaceImages(elements);
      }
    } else if (mutation.type === "attributes" && mutation.target.tagName.toLowerCase() === "img") {
      if (!mutation.target.src.startsWith(catUrl)) {
        mutation.target.src = `${catUrl}?${mutation.target.src}`;
      }
    }
  }
});

observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["src"] });
