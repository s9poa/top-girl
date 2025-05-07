document.addEventListener("DOMContentLoaded", function() {
  // Apply Folder Name 
  const projectFolder = ""; 
  const pathSegments = window.location.pathname.split('/').filter(seg => seg !== "");
  const folderIndex = pathSegments.findIndex(seg => seg === projectFolder);
  let basePath = "";
  if (folderIndex !== -1) {
    basePath = "/" + pathSegments.slice(0, folderIndex + 1).join('/');
  }
  var headerContainer = document.getElementById("header");
  if (headerContainer) {
    var headerHTML = `
      <!-- Paste your header HTML here -->
    `;
    headerContainer.innerHTML = headerHTML;
  }
  var anchors = headerContainer.querySelectorAll("a");
  anchors.forEach(anchor => {
    const href = anchor.getAttribute("href");
    if (href && href.startsWith("./")) {
      anchor.setAttribute("href", basePath + "/" + href.slice(2));
    }
  });
});
