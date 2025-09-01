document.addEventListener("DOMContentLoaded", () => {
  const staffContainer = document.querySelector(".staffs-show");
  const searchInput = document.getElementById("search-input");
  const searchBtn = document.getElementById("search-btn");

  let staffData = [];

  // Fetch data from staffs.json
  async function fetchStaffs() {
    try {
      const response = await fetch("staffs.json");
      staffData = await response.json();
      displayStaffs(staffData); // show all staffs on page load
    } catch (error) {
      staffContainer.innerHTML = "<p>❌ Failed to load staff data.</p>";
      console.error(error);
    }
  }

  // Display staffs inside the container
  function displayStaffs(data) {
    staffContainer.innerHTML = ""; // clear before re-render

    if (data.length === 0) {
      staffContainer.innerHTML = "<p>⚠️ No staff found.</p>";
      return;
    }

    data.forEach(staff => {
      // Create staff card
      const staffCard = document.createElement("div");
      staffCard.classList.add("staff-card");

      staffCard.innerHTML = `
        <img src="${staff.image}" alt="${staff.name}" class="staff-img" />
        <h3 class="staff-name">${staff.name}</h3>
        <p><strong>Rank:</strong> ${staff.rank}</p>
        <p><strong>Qualification:</strong> ${staff.qualification || "N/A"}</p>
        <p><strong>Specialization:</strong> ${staff.specialization || "N/A"}</p>
      `;

      staffContainer.appendChild(staffCard);
    });
  }

  // Search function
  function searchStaffs() {
    const keyword = searchInput.value.toLowerCase();

    const filtered = staffData.filter(staff =>
      staff.name.toLowerCase().includes(keyword) ||
      staff.rank.toLowerCase().includes(keyword) ||
      staff.qualification.toLowerCase().includes(keyword) ||
      staff.specialization.toLowerCase().includes(keyword)
    );

    displayStaffs(filtered);
  }

  // Event listeners
  searchBtn.addEventListener("click", searchStaffs);
  searchInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      searchStaffs();
    }
  });

  // Fetch data on page load
  fetchStaffs();
});