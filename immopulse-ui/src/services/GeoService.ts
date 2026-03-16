const departementCache: Record<string, string> = {};

export const getdepartmentName = async (code: string): Promise<string> => {
    if (!code || code.toLowerCase() === 'all') {
        return "Tous les départements";
    }

    if (departementCache[code]) {
        return departementCache[code];
    }

    try {
        const response = await fetch(`https://geo.api.gouv.fr/departements/${code}?fields=nom`);

        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const data = await response.json();

        departementCache[code] = data.nom;
        return data.nom;

    } catch (error) {
        console.error(`Impossible de récupérer le nom du département ${code}:`, error);
        return `Département ${code}`;
    }
};
