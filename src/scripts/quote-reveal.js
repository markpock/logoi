const DURATION = 280;

const ensureButton = (callout) => {
  if (callout.querySelector(":scope > .callout-expand")) return;
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "callout-expand";
  btn.setAttribute("aria-label", "Show explanation");
  btn.setAttribute("aria-expanded", "false");
  callout.append(btn);
};

const syncCallout = (callout) => {
  const explanation = callout.querySelector(":scope > .quote-explanation");
  if (!explanation) return;
  const visible =
    callout.classList.contains("is-revealed") || callout.classList.contains("is-pinned");
  explanation.hidden = !visible;
  const btn = callout.querySelector(":scope > .callout-expand");
  if (btn) {
    btn.setAttribute("aria-expanded", String(visible));
    btn.setAttribute("aria-label", visible ? "Hide explanation" : "Show explanation");
  }
};

const finishAnimation = (callout, id, wasRevealing) => {
  if (callout.dataset.animId !== id) return;
  callout.style.transition = "none";
  callout.style.height = "";
  callout.style.overflow = "";
  callout.getBoundingClientRect();
  callout.style.transition = "";
  callout.classList.remove("is-animating");
  delete callout.dataset.animId;
  delete callout.dataset.animDir;

  if (wasRevealing && callout.dataset.hoverEnded && !callout.classList.contains("is-pinned")) {
    delete callout.dataset.hoverEnded;
    setRevealed(callout, false);
  }
};

const setRevealed = (callout, reveal) => {
  ensureButton(callout);

  // Animations always run to completion. Block hover-triggered reveals during a
  // hide (prevents the expanding-box-hits-mouse oscillation). Allow click-triggered
  // reveals (caller sets is-pinned before calling, so the guard passes).
  if (reveal && callout.dataset.animDir === "hiding" && !callout.classList.contains("is-pinned")) {
    return;
  }

  if (callout.classList.contains("is-revealed") === reveal) {
    syncCallout(callout);
    return;
  }

  const startHeight = callout.getBoundingClientRect().height;

  callout.style.transition = "none";
  callout.style.height = `${startHeight}px`;
  callout.style.overflow = "hidden";
  callout.getBoundingClientRect();

  callout.classList.toggle("is-revealed", reveal);
  syncCallout(callout);

  // Temporarily remove the explicit height to measure the true content height.
  // Without this, scrollHeight returns max(startHeight, contentHeight) which
  // equals startHeight when startHeight >= content — making the animation a no-op.
  callout.style.height = "";
  const targetHeight = callout.scrollHeight;
  callout.style.height = `${startHeight}px`;

  callout.getBoundingClientRect();
  callout.style.transition = "";

  callout.classList.add("is-animating");
  callout.dataset.animDir = reveal ? "revealing" : "hiding";
  const id = String(Date.now() + Math.random());
  callout.dataset.animId = id;

  requestAnimationFrame(() => {
    if (callout.dataset.animId !== id) return;
    callout.style.height = `${targetHeight}px`;
  });

  setTimeout(() => finishAnimation(callout, id, reveal), DURATION + 40);
};

const initCallouts = () => {
  document.querySelectorAll(".callout.callout--has-explanation").forEach((callout) => {
    ensureButton(callout);
    syncCallout(callout);
  });
};

if (!window.__quoteRevealBound) {
  window.__quoteRevealBound = true;

  document.addEventListener("click", (e) => {
    const btn = e.target.closest?.(".callout-expand");
    if (btn) {
      const callout = btn.closest(".callout.callout--has-explanation");
      if (!callout) return;
      e.preventDefault();
      const willPin = !callout.classList.contains("is-pinned");
      callout.classList.toggle("is-pinned", willPin);
      delete callout.dataset.hoverEnded;
      if (!willPin) callout.dataset.noHover = "1";
      else delete callout.dataset.noHover;
      setRevealed(callout, willPin);
      return;
    }

    const callout = e.target.closest?.(".callout.callout--has-explanation");
    if (!callout) {
      document.querySelectorAll(".callout.callout--has-explanation.is-pinned").forEach((c) => {
        c.classList.remove("is-pinned");
        delete c.dataset.hoverEnded;
        setRevealed(c, false);
      });
      return;
    }

    if (callout.classList.contains("is-pinned")) {
      callout.classList.remove("is-pinned");
      delete callout.dataset.hoverEnded;
      callout.dataset.noHover = "1";
      setRevealed(callout, false);
    } else {
      callout.classList.add("is-pinned");
      delete callout.dataset.noHover;
      delete callout.dataset.hoverEnded;
      setRevealed(callout, true);
    }
  });

  document.addEventListener("mouseover", (e) => {
    const callout = e.target.closest?.(".callout.callout--has-explanation");
    if (!callout || callout.dataset.noHover || callout.dataset.animDir) return;
    if (callout.classList.contains("is-revealed")) return;
    setRevealed(callout, true);
  });

  document.addEventListener("mouseout", (e) => {
    const callout = e.target.closest?.(".callout.callout--has-explanation");
    if (!callout || callout.contains(e.relatedTarget)) return;
    delete callout.dataset.noHover;
    if (callout.classList.contains("is-pinned")) return;
    if (callout.dataset.animDir === "revealing") {
      // Mouse left during reveal — let the animation finish, then hide.
      callout.dataset.hoverEnded = "1";
      return;
    }
    if (callout.dataset.animDir === "hiding") return;
    if (callout.classList.contains("is-revealed")) setRevealed(callout, false);
  });

  document.addEventListener("focusin", (e) => {
    const callout = e.target.closest?.(".callout.callout--has-explanation");
    if (!callout || callout.dataset.animDir) return;
    if (!callout.classList.contains("is-revealed")) setRevealed(callout, true);
  });

  document.addEventListener("focusout", (e) => {
    const callout = e.target.closest?.(".callout.callout--has-explanation");
    if (!callout || callout.contains(e.relatedTarget)) return;
    if (!callout.classList.contains("is-pinned") && !callout.dataset.animDir) {
      if (callout.classList.contains("is-revealed")) setRevealed(callout, false);
    }
  });
}

document.addEventListener("astro:page-load", initCallouts);
initCallouts();
