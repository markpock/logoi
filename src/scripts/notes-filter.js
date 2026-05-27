const initNotesFilter = () => {
  const form = document.querySelector(".notes-filter");
  if (!form) return;
  if (form.dataset.bound === "true") return;
  form.dataset.bound = "true";

  const input = form.querySelector('input[name="search"]');
  const tagSelect = form.querySelector('select[name="tag-select"]');
  const hiddenSelect = form.querySelector('select[name="tag"]');
  const activeTags = form.querySelector("[data-active-tags]");
  const list = form.closest(".notes-list");
  const notes = Array.from(list?.querySelectorAll("[data-note]") || []);
  const notesPerPage = Number(form.dataset.notesPerPage) || notes.length || 1;
  const pagination = list?.querySelector("[data-notes-pagination]");
  const params = new URLSearchParams(window.location.search);
  const selectedTags = new Set(params.getAll("tag").flatMap((tag) => tag.split(",")).filter(Boolean));
  let currentPage = Math.max(1, Number(params.get("page")) || 1);

  if (input) input.value = params.get("search") || params.get("q") || "";

  const renderTags = () => {
    if (!activeTags || !hiddenSelect) return;
    activeTags.replaceChildren(
      ...Array.from(selectedTags).map((tag) => {
        const button = document.createElement("button");
        button.type = "button";
        button.dataset.removeTag = tag;
        button.textContent = `${tag} ×`;
        return button;
      })
    );

    Array.from(hiddenSelect.options).forEach((option) => {
      option.selected = selectedTags.has(option.value);
    });
  };

  const updateUrl = (query, tagsToMatch) => {
    const nextParams = new URLSearchParams();
    if (query) nextParams.set("search", query);
    tagsToMatch.forEach((tag) => nextParams.append("tag", tag));
    if (currentPage > 1) nextParams.set("page", String(currentPage));
    const nextUrl = `${window.location.pathname}${nextParams.toString() ? `?${nextParams}` : ""}`;
    window.history.replaceState({}, "", nextUrl);
  };

  const renderPagination = (totalPages, totalMatches) => {
    if (!pagination) return;
    pagination.hidden = totalMatches <= notesPerPage;
    if (totalMatches <= notesPerPage) {
      pagination.replaceChildren();
      return;
    }

    const newer = currentPage > 1 ? document.createElement("button") : document.createElement("span");
    const older = currentPage < totalPages ? document.createElement("button") : document.createElement("span");

    if (currentPage > 1) {
      newer.type = "button";
      newer.dataset.pageDirection = "newer";
      newer.textContent = "← Newer";
    }

    if (currentPage < totalPages) {
      older.type = "button";
      older.dataset.pageDirection = "older";
      older.textContent = "Older ->";
    }

    pagination.replaceChildren(newer, older);
  };

  const applyFilter = () => {
    const query = (input?.value || "").trim().toLowerCase();
    const tagsToMatch = Array.from(selectedTags);
    const matchingNotes = notes.filter((note) => {
      const title = note.dataset.title || "";
      const tags = (note.dataset.tags || "").split(",").filter(Boolean);
      return (!query || title.includes(query)) && tagsToMatch.every((tag) => tags.includes(tag));
    });
    const totalPages = Math.max(1, Math.ceil(matchingNotes.length / notesPerPage));
    if (currentPage > totalPages) currentPage = totalPages;
    const pageStart = (currentPage - 1) * notesPerPage;
    const visibleMatches = new Set(matchingNotes.slice(pageStart, pageStart + notesPerPage));

    notes.forEach((note) => {
      const visible = visibleMatches.has(note);
      note.classList.toggle("is-filter-hidden", !visible);
      note.classList.remove("is-extra");
      note.classList.remove("is-first-visible");
    });
    matchingNotes[pageStart]?.classList.add("is-first-visible");

    renderPagination(totalPages, matchingNotes.length);
    updateUrl(query, tagsToMatch);
  };

  const addSelectedTag = () => {
    const tag = tagSelect?.value || "";
    if (!tag) return;
    selectedTags.add(tag);
    currentPage = 1;
    tagSelect.value = "";
    renderTags();
    applyFilter();
  };

  input?.addEventListener("input", () => {
    currentPage = 1;
    applyFilter();
  });
  tagSelect?.addEventListener("change", addSelectedTag);
  activeTags?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-remove-tag]");
    if (!button) return;
    selectedTags.delete(button.dataset.removeTag);
    currentPage = 1;
    renderTags();
    applyFilter();
  });
  pagination?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-page-direction]");
    if (!button) return;
    currentPage += button.dataset.pageDirection === "older" ? 1 : -1;
    applyFilter();
  });

  renderTags();
  applyFilter();
};

document.addEventListener("astro:page-load", initNotesFilter);
initNotesFilter();
