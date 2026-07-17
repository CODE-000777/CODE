// ==========================================================================
// 1. HIGH-END CURATED DATASET (Cosmos / Nike Aesthetics)
// ==========================================================================
const galleryData = [
    {
        title: "Symmetric Void",
        category: "Architecture",
        author: "Tadao Ando Arch",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80"
    },
    {
        title: "Futuristic Kinetic Silhouette",
        category: "Design",
        author: "Koyoshi Studio",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80"
    },
    {
        title: "Cyberpunk Brutalism Study",
        category: "Digital Art",
        author: "V-XI Corp",
        image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=600&q=80"
    },
    {
        title: "Subtle Warm Refraction",
        category: "Creative Photography",
        author: "Elena Rostova",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"
    },
    {
        title: "Noir Fabric Sculpting",
        category: "Fashion Editorial",
        author: "Maison du Noir",
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80"
    },
    {
        title: "Isometric Grid Theory",
        category: "Typography",
        author: "Swiss Design Lab",
        image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=600&q=80"
    },
    {
        title: "Fluid Mercury Fluidity",
        category: "Abstract Render",
        author: "Nils Hanson",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80"
    },
    {
        title: "Apple Core Structure",
        category: "Industrial Design",
        author: "J. Ives Concepts",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80"
    }
];

// ==========================================================================
// 2. INITIALIZATION & ELEMENT SELECTORS
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("grid");
    const settingsBtn = document.getElementById("settingsBtn");
    const settingsPanel = document.getElementById("settingsPanel");
    const modal = document.getElementById("modal");
    const closeModal = document.getElementById("closeModal");
    
    const modalImg = document.getElementById("modalImg");
    const modalCategory = document.getElementById("modalCategory");
    const modalTitle = document.getElementById("modalTitle");
    const modalAuthor = document.getElementById("modalAuthor");

    // Initialize layout
    buildGrid(galleryData);

    // ==========================================================================
    // 3. RENDER MASONRY GALLERY DYNAMICALLY
    // ==========================================================================
    function buildGrid(items) {
        grid.innerHTML = "";
        items.forEach((item, index) => {
            const card = document.createElement("div");
            card.className = "card";
            card.setAttribute("data-index", index);
            
            card.innerHTML = `
                <div class="card-img-container">
                    <img src="${item.image}" alt="${item.title}" loading="lazy">
                </div>
                <div class="card-info">
                    <div class="card-meta">${item.category}</div>
                    <div class="card-title">${item.title}</div>
                </div>
            `;
            
            // Open Apple-style modal on card click
            card.addEventListener("click", () => {
                openCardModal(item);
            });

            grid.appendChild(card);
        });
    }

    // ==========================================================================
    // 4. SETTINGS PANEL & THEME HANDLING
    // ==========================================================================
    // Toggle settings panel open/close
    settingsBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        settingsPanel.classList.toggle("active");
    });

    // Close panel when clicking outside
    document.addEventListener("click", (e) => {
        if (!settingsPanel.contains(e.target) && e.target !== settingsBtn) {
            settingsPanel.classList.remove("active");
        }
    });

    // Switch theme options
    const themeButtons = document.querySelectorAll(".theme-opt");
    themeButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Remove active states from buttons
            themeButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            // Remove old theme classes from body
            document.body.className = "";
            
            // Add new theme class
            const selectedTheme = btn.getAttribute("data-theme");
            document.body.classList.add(selectedTheme);
            
            // Save settings locally
            localStorage.setItem("selected-theme", selectedTheme);
        });
    });

    // Load saved theme if exists
    const savedTheme = localStorage.getItem("selected-theme");
    if (savedTheme) {
        document.body.className = "";
        document.body.classList.add(savedTheme);
        
        // Highlight correct option in panel
        themeButtons.forEach(btn => {
            if (btn.getAttribute("data-theme") === savedTheme) {
                btn.classList.add("active");
            } else {
                btn.classList.remove("active");
            }
        });
    }

    // ==========================================================================
    // 5. DETAIL MODAL INTERACTIVES
    // ==========================================================================
    function openCardModal(data) {
        modalImg.src = data.image;
        modalCategory.innerText = data.category;
        modalTitle.innerText = data.title;
        modalAuthor.innerText = `Curation Credit: ${data.author}`;
        
        modal.classList.add("active");
        document.body.style.overflow = "hidden"; // Prevent scrolling behind modal
    }

    closeModal.addEventListener("click", () => {
        modal.classList.remove("active");
        document.body.style.overflow = "auto";
    });

    // Close modal on outside-click
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("active");
            document.body.style.overflow = "auto";
        }
    });
});