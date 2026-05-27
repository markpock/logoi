if (!window.__tagPopoverBound) {
  window.__tagPopoverBound = true;
  document.addEventListener("click", (event) => {
    const tagHover = event.target.closest(".tag-hover");
    document.querySelectorAll(".tag-hover.is-open").forEach((openTag) => {
      if (openTag !== tagHover) openTag.classList.remove("is-open");
    });

    if (!tagHover) return;
    if (event.target.closest(".tag-tooltip")) return;
    tagHover.classList.toggle("is-open");
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    document
      .querySelectorAll(".tag-hover.is-open")
      .forEach((openTag) => openTag.classList.remove("is-open"));
  });
}
