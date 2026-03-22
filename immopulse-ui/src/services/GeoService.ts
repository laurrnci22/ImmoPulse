// On initialise le cache à null pour savoir s'il a déjà été chargé
let departementCache: Record<string, string> | null = null;

// On garde une trace de la promesse en cours pour éviter que le Promise.all 
// ne déclenche 100 téléchargements simultanés avant que le premier n'ait fini.
let fetchPromise: Promise<void> | null = null;

export const getdepartmentName = async (code: string): Promise<string> => {
    // Cas de base
    if (!code || code.toLowerCase() === 'all') {
        return "Tous les départements";
    }

    // 1. Si le cache n'a pas encore été chargé
    if (!departementCache) {
        // Si aucun téléchargement n'est en cours, on le lance
        if (!fetchPromise) {
            fetchPromise = fetch('https://geo.api.gouv.fr/departements')
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Erreur HTTP: ${response.status}`);
                    }
                    return response.json();
                })
                .then(departments => {
                    departementCache = {}; // Initialisation du dictionnaire
                    
                    // On transforme le tableau en dictionnaire { "01": "Ain", "75": "Paris", ... }
                    departments.forEach((dept: { code: string, nom: string }) => {
                        departementCache![dept.code] = dept.nom;
                    });
                })
                .catch(error => {
                    console.error("Impossible de charger l'annuaire des départements:", error);
                    departementCache = {}; // On initialise un objet vide en cas d'échec pour ne pas boucler
                });
        }
        
        // On attend que le téléchargement global (lancé par le 1er appel) soit terminé
        await fetchPromise;
    }

    // 2. On retourne le nom depuis notre dictionnaire (lecture instantanée en RAM)
    return departementCache![code] || `Département ${code}`;
};