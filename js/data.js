// js/data.js
const PROJECTS_DATA = [


    {
        id: "volatiles",
        title: "L'empreinte d'un geste",
        displayTitle: "L'empreinte <br>d'un geste",
        category: "artisanat", // Doit correspondre exactement au data-filter de l'accueil
        displayCategory: "ÉVÉNEMENT & GRAVURE",
        year: "2025-2026",
        type: "ARTISANAT & ÉVÉNEMENT",
        discipline: "DESIGN & ARTISANAT",
        description: `RENCONTRE ENTRE L'UNIVERS DU VIN ET LA PERSONNALISATION ARTISANALE.\n\nEn collaboration avec la cave à vin Volatiles, j'ai imaginé et réalisé une série d'animations de gravure personnalisée sur différents supports : verres, bouteilles, carafes et sous-verres. De la recherche graphique à la création de motifs sur mesure, en passant par la communication de l'événement, j'ai pris en charge l'ensemble du projet.\n\nChaque objet a nécessité une phase d'expérimentation afin d'adapter le geste de gravure à ses contraintes et spécificités d’usage. Cette collaboration a été l'occasion d'explorer la place de l'artisanat et de la personnalisation dans l'univers du vin, tout en créant un moment d'échange privilégié avec le public.`,
        imageHero: "image/home/vol-2.webp",
        gallery: [
            { src: "image/store.webp", layout: "" },
            { src: "image/noel.webp", layout: "square" },
            { src: "image/croquis-2.webp", layout: "landscape" },
            { src: "image/grav.mp4", layout: "portrait" }, // Votre vidéo verticale
            { src: "image/2025-giro-mains-cave-large.png", layout: "landscape" },
            { src: "image/volatiles0.webp", layout: "portrait" },
            { src: "image/raisin.webp", layout: "square" }
        ]
    },

        {
        id: "lvmh",
        title: "Partout à Paris",
        category: "artisanat",
        displayCategory: "ANIMATION GRAVURE",
        year: "depuis 2019",
        type: "Animation gravure",
        discipline: "Gravure artisanale",
        description: "Prestations de gravure événementielle en direct au cœur de Paris...",
        imageHero: "image/home/anim-calli(1).webp",
        gallery: [
            { src: "image/anim-baton(1).webp", layout: "landscape" }
        ]
    },

       {
        id: "lucie-allard",
        title: "Lucie Allard Design",
        category: "graphisme",
        displayCategory: "IDENTITÉ VISUELLE",
        year: "2024",
        type: "Graphisme",
        discipline: "Identité visuelle",
        description: "Description de l'identité visuelle créée pour Lucie Allard Design...",
        imageHero: "image/home/logo.webp",
        gallery: [
            { src: "image/projets/lucie/gif.gif", layout: "portrait" },
            { src: "image/projets/lucie/lucie-3.webp", layout: "square" },
             { src: "image/projets/lucie/lucie-1.jpg", layout: "portrait" },
              { src: "image/projets/lucie/lucie-3.webp", layout: "square" }
        ]
    },

    {
        id: "signature",
        title: "Gravure Signature",
        category: "artisanat",
        displayCategory: "DESIGN & GRAVURE",
        year: "2025",
        type: "Artisanat",
        discipline: "Design & Artisanat",
        description: "Description de la gravure de la carafe Riedel...",
        imageHero: "image/home/thuizat.webp",
        gallery: [
            { src: "image/client-logo(2).webp", layout: "square" }
        ]
    },

 

    {
        id: "particulier",
        title: "Conception particulière",
        category: "artisanat",
        displayCategory: "RECHERCHE & CREATION",
        year: "depuis 2024",
        type: "Artisanat",
        discipline: "Design artisanal",
        description: "Recherche graphique, création personnelle et expérimentations autour du geste...",
        imageHero: "image/home/client-illu(3).webp",
        gallery: [
            { src: "image/client-illu(4).webp", layout: "portrait" }
        ]
    },

        {
        id: "hibou",
        title: "Posters Illustrés",
        category: "graphisme",
        displayCategory: "Conception graphique",
        year: "2025",
        type: "Graphisme & Illustration",
        discipline: "Design graphique",
        description: "Recherche graphique, création personnelle et expérimentations autour du geste...",
        imageHero: "image/projets/archi/archi-1.webp",
        gallery: [
            { src: "image/client-illu(4).webp", layout: "portrait" }
        ]
    }
    

];