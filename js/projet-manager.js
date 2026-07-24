// js/projet-manager.js

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. RÉCUPÉRATION DES DONNÉES DU PROJET ---
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('id');
    const currentFilter = params.get('filter') || 'all';

    const projectIndex = PROJECTS_DATA.findIndex(p => p.id === projectId);
    const currentProject = PROJECTS_DATA[projectIndex];

    if (!currentProject) return;

    document.title = `${currentProject.title} | Alice Auger`;

    // --- 2. MISE À JOUR DU CONTENU ---
    const nameEl = document.querySelector('.name-project');
    const catEl = document.querySelector('.projet-category');
    const descEl = document.querySelector('.description-text p');
    const detailsContainer = document.querySelector('.project-details');

    if (nameEl) {
        nameEl.innerHTML = (currentProject.displayTitle || currentProject.title).toUpperCase();
    }
    if (catEl) catEl.innerHTML = `${currentProject.displayCategory} <div class="divider-line3"></div>`;
    if (descEl) descEl.textContent = currentProject.description;

    if (detailsContainer) {
        detailsContainer.innerHTML = `
            <span class="meta-label">Year</span><span class="meta-value">${currentProject.year}</span>
            <span class="meta-label">Type</span><span class="meta-value">${currentProject.type}</span>
            <span class="meta-label">Discipline</span><span class="meta-value">${currentProject.discipline}</span>
        `;
    }

    // --- 3. GALERIE (Version Ordre Logique) ---
    const galleryGrid = document.querySelector('.project-grid');

    if (galleryGrid && currentProject.gallery) {
        galleryGrid.innerHTML = '';

        const isDesktop = window.innerWidth > 768;
        let images = currentProject.gallery;

        if (isDesktop) {
            const leftCol = [];
            const rightCol = [];
            images.forEach((img, index) => {
                if (index % 2 === 0) leftCol.push(img);
                else rightCol.push(img);
            });
            images = [...leftCol, ...rightCol];
        }

        images.forEach(imgData => {
            const item = document.createElement('div');
            item.className = `reveal-mask project-item ${imgData.layout || ''}`;

            const isVideo = imgData.src.toLowerCase().endsWith('.mp4');
            if (isVideo) {
                item.innerHTML = `
                <video 
                    src="${imgData.src}" 
                    class="video-gallery" 
                    autoplay 
                    muted 
                    loop 
                    playsinline 
                    webkit-playsinline 
                    preload="auto" 
                    style="cursor:pointer; background: black;">
                </video>`;
            } else {
                item.innerHTML = `<img src="${imgData.src}" loading="lazy" alt="${currentProject.title}">`;
            }
            galleryGrid.appendChild(item);
        });
    }

    // --- 4. NAVIGATION SUIVANT (VERSION AVEC HISTORIQUE FORCE) ---
    const nextLink = document.querySelector('.next-project-link');
    const nextTitle = document.querySelector('.next-title');
    const nextImg = document.querySelector('.next-preview-img');

    let filteredList = PROJECTS_DATA;
    if (currentFilter && currentFilter !== 'all') {
        filteredList = PROJECTS_DATA.filter(p => p.category === currentFilter);
    }

    let filteredIndex = filteredList.findIndex(p => p.id === projectId);

    if (filteredIndex === -1) {
        filteredList = PROJECTS_DATA;
        filteredIndex = filteredList.findIndex(p => p.id === projectId);
    }

    if (filteredIndex !== -1 && filteredList.length > 0) {
        const nextProject = filteredList[(filteredIndex + 1) % filteredList.length];
        const targetUrl = `projets.html?id=${nextProject.id}&filter=${currentFilter}`;

        if (nextLink) {
            nextLink.setAttribute('href', targetUrl);

            // ACTION CRUCIALE : On force le navigateur à ouvrir l'URL comme une NOUVELLE page 
            // pour l'obliger à créer une étape de retour dans son historique.
            nextLink.onclick = function (e) {
                e.preventDefault();
                window.location.href = targetUrl;
            };
        }

        if (nextTitle) {
            nextTitle.textContent = nextProject.title;
        }

        if (nextImg) {
            nextImg.src = nextProject.imageHero;
        }
    }

    // --- 6. INTERSECTION OBSERVER (Reveal + Play Vidéos) ---
    const observerOptions = { threshold: 0.1 };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');

                const video = entry.target.querySelector('video.video-gallery');

                if (video) {
                    video.muted = true;
                    const playPromise = video.play();
                    if (playPromise !== undefined) {
                        playPromise.catch(() => { console.log("Autoplay bloqué par le navigateur"); });
                    }

                    video.onclick = function () {
                        this.muted = !this.muted;
                        if (!this.muted) {
                            this.classList.add('sound-on');
                        } else {
                            this.classList.remove('sound-on');
                        }
                    };
                }
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observation des éléments de la galerie
    document.querySelectorAll('.project-grid .reveal-mask').forEach(el => revealObserver.observe(el));

    // Observation du footer de navigation
    const footerNav = document.querySelector('.project-footer-nav');
    if (footerNav) revealObserver.observe(footerNav);

    // MODIFICATION ICI : On demande à l'observer de surveiller aussi le bouton "Projet Suivant"
    if (nextLink) revealObserver.observe(nextLink);

    // --- 7. GESTION DU STYLE .ACTIVE DANS LE FOOTER ---
    const updateFooterActiveState = () => {
        const filterLinks = document.querySelectorAll('.index-links a');
        const activeCategory = currentFilter || 'all';

        filterLinks.forEach(link => {
            const linkUrl = new URL(link.href, window.location.origin);
            const linkFilterValue = linkUrl.searchParams.get('filter') || 'all';

            if (linkFilterValue === activeCategory) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };

    updateFooterActiveState();

    // --- 8. LE DÉBLOQUEUR MOBILE ---
    const forcePlayOnTouch = () => {
        document.querySelectorAll('video').forEach(v => {
            v.play();
        });
        window.removeEventListener('touchstart', forcePlayOnTouch);
    };
    window.addEventListener('touchstart', forcePlayOnTouch, { passive: true });

    // --- 9. BOUTON RETOUR ---
    const backButton = document.getElementById('back-button');

    if (backButton) {
        backButton.addEventListener('click', (e) => {
            e.preventDefault();

            // Si l'utilisateur a un historique sur votre site, on recule d'une seule page exacte
            if (document.referrer && document.referrer.includes(window.location.hostname)) {
                history.back();
            } else {
                // Sécurité : s'il arrive d'un lien direct externe, le retour l'envoie à l'index
                window.location.href = `index.html?filter=${currentFilter}#portfolio`;
            }
        });
    }
});