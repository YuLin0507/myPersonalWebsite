// ---------- Mobile Menu ----------
function toggleMenu() {
  const sidebar = document.getElementById("sidebar1");
  if (!sidebar) return;

  const isOpen = sidebar.style.left === "0px";
  sidebar.style.left = isOpen ? "-260px" : "0px";
  sidebar.setAttribute("aria-hidden", isOpen ? "true" : "false");
}

// ---------- Experience Tabs + Projects ----------
document.addEventListener("DOMContentLoaded", () => {
  // Main tabs (School Projects / Work Experience)
  const mainTabButtons = document.querySelectorAll("[data-main-tab]");
  const mainTabContents = document.querySelectorAll(".main-tab-content");

  if (mainTabButtons.length) {
    mainTabButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetId = btn.getAttribute("data-main-tab");

        mainTabContents.forEach((tab) => tab.classList.add("hidden"));
        document.getElementById(targetId)?.classList.remove("hidden");

        mainTabButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
      });
    });
  }

  // Sub tabs (Projects)
  const projectButtons = document.querySelectorAll("[data-project]");
  const projects = document.querySelectorAll(".project-content");

  if (projectButtons.length) {
    projectButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetId = btn.getAttribute("data-project");

        projects.forEach((p) => p.classList.add("hidden"));
        document.getElementById(targetId)?.classList.remove("hidden");

        projectButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
      });
    });
  }

  // ---------- Sliders (one reusable slider for all projects) ----------
  document.querySelectorAll(".slider").forEach((slider) => {
    const imgEl = slider.querySelector(".slider-img");
    const prevBtn = slider.querySelector(".slider-btn.prev");
    const nextBtn = slider.querySelector(".slider-btn.next");
    const raw = slider.getAttribute("data-images") || "";
    const files = raw.split(",").map((s) => s.trim()).filter(Boolean);

    if (!imgEl || files.length === 0) return;

    // detect base path from current src (keeps it working in /pages/)
    // e.g. "../assets/img/ocbc1.png" -> "../assets/img/"
    const currentSrc = imgEl.getAttribute("src") || "";
    const basePath = currentSrc.includes("/")
      ? currentSrc.slice(0, currentSrc.lastIndexOf("/") + 1)
      : "";

    let index = 0;

    const render = () => {
      imgEl.src = basePath + files[index];
    };

    prevBtn?.addEventListener("click", () => {
      index = (index - 1 + files.length) % files.length;
      render();
    });

    nextBtn?.addEventListener("click", () => {
      index = (index + 1) % files.length;
      render();
    });
  });
});

