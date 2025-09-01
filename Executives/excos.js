document.addEventListener("DOMContentLoaded", () => {
  const excosContainer = document.querySelector(".excos-show");
  const searchInput = document.getElementById("search-input");
  const searchBtn = document.getElementById("search-btn");

  // Safe lower-case helper (avoids "toLowerCase is not a function")
  const lc = (v) => (v ?? "").toString().toLowerCase().trim();

  // Will hold normalized records
  let excosData = [];

  // 1) Fetch and normalize keys so we always use: name, post, level, contact, image, serial_number
  async function fetchexcos() {
    try {
      const res = await fetch("excos.json");
      const raw = await res.json();

      excosData = raw.map((r) => ({
        serial_number: r.serial_number ?? r.serialNumber ?? r["S/N"] ?? "",
        name: r.name ?? r.Name ?? "",
        post: r.Post ?? r.post ?? "",
        level: r.Level ?? r.level ?? "",
        contact: r.Contact ?? r.contact ?? "",
        image: r.image ?? r.img ?? "images/placeholder.png",
      }));

      displayexcos(excosData); // show all on load
    } catch (err) {
      console.error(err);
      excosContainer.innerHTML = "<p>❌ Failed to load excos data.</p>";
    }
  }

  // 2) Render cards
  function displayexcos(data) {
    excosContainer.innerHTML = "";

    if (!data || data.length === 0) {
      excosContainer.innerHTML = "<p>⚠️ No excos found.</p>";
      return;
    }

    data.forEach((excos) => {
      const card = document.createElement("div");
      card.className = "excos-card";
      card.innerHTML = `
        <img src="${excos.image}" alt="${excos.name}" class="excos-img"
             onerror="this.onerror=null;this.src='images/placeholder.png';" />
        <h3 class="excos-name">${excos.name}</h3>
        <p><strong>Post:</strong> ${excos.post || "N/A"}</p>
        <p><strong>Level:</strong> ${excos.level || "N/A"}</p>
        <p><strong>Contact:</strong> ${excos.contact || "N/A"}</p>
      `;
      excosContainer.appendChild(card);
    });
  }

  // 3) Search across normalized fields
  function searchexcos() {
    const q = lc(searchInput.value);
    if (!q) {
      displayexcos(excosData);
      return;
    }

    const filtered = excosData.filter((x) =>
      [x.name, x.post, x.level, x.contact, x.serial_number].some((f) => lc(f).includes(q))
    );

    displayexcos(filtered);
  }

  // 4) Events
  searchBtn.addEventListener("click", searchexcos);
  searchInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") searchexcos();
  });

  // 5) Init
  fetchexcos();
});