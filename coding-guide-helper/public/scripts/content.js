console.info(
  "Extensions can run scripts that read and modify the content of a page. These are called content scripts. They live in an isolated world, meaning they can make changes to their JavaScript environment without conflicting with their host page or other extensions' content scripts.",
  document.location.href
);

// const element = document.querySelector("body");
// element.style.color = "red";
