document.addEventListener("DOMContentLoaded", function() {
  // Apply Folder Name 
  const projectFolder = "";
  const pathSegments = window.location.pathname.split('/').filter(seg => seg !== "");
  const folderIndex = pathSegments.findIndex(seg => seg === projectFolder);
  let basePath = "";
  if (folderIndex !== -1) {
    basePath = "/" + pathSegments.slice(0, folderIndex + 1).join('/');
  }
  var footerContainer = document.getElementById("footer");
  if (footerContainer) {
    var footerHTML = `
      <!-- Paste your footer HTML here -->
    `;
    footerContainer.innerHTML = footerHTML;
  }
  var anchors = footerContainer.querySelectorAll("a");
  anchors.forEach(anchor => {
    const href = anchor.getAttribute("href");
    if (href && href.startsWith("./")) {
      anchor.setAttribute("href", basePath + "/" + href.slice(2));
    }
  });
});
