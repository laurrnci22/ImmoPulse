CREATE TABLE IF NOT EXISTS dvf (
    id UUID DEFAULT generateUUIDv4(),
    date_mutation Date,
    nature_mutation LowCardinality(String),
    valeur_fonciere Float64,
    adresse_numero String,
    adresse_type LowCardinality(String),
    adresse_voie String,
    code_postal String,
    commune LowCardinality(String),
    code_departement LowCardinality(String),
    section String,
    no_plan String,
    surface_reelle_bati Float32,
    type_local LowCardinality(String),
    surface_terrain Float32
) ENGINE = MergeTree()
ORDER BY (code_departement, commune, date_mutation);


INSERT INTO dvf (
    date_mutation,
    nature_mutation,
    valeur_fonciere,
    adresse_numero,
    adresse_type,
    adresse_voie,
    code_postal,
    commune,
    code_departement,
    section,
    no_plan,
    surface_reelle_bati,
    type_local,
    surface_terrain
)
SELECT
    parseDateTimeBestEffortOrNull(c9) AS date_mutation,
    c10 AS nature_mutation,
    toFloat64OrZero(replaceAll(c11, ',', '.')) AS valeur_fonciere,
    c12 AS adresse_numero,
    c14 AS type_de_voie,
    c16 AS voie,
    c17 AS code_postal,
    c18 AS commune,
    c19 AS code_departement,
    c22 AS section,
    c23 AS no_plan,
    toFloat32OrNull(replaceAll(c39, ',', '.')) AS surface_reelle_bati, -- Correction index (39)
    c37 AS type_local, -- Correction index (37)
    toFloat32OrNull(replaceAll(c43, ',', '.')) AS surface_terrain -- Correction index (43)
FROM file(
    'ValeursFoncieres-2025-S1.csv', 
    'CSV', 
    'c1 String, c2 String, c3 String, c4 String, c5 String, c6 String, c7 String, c8 String, c9 String, c10 String, c11 String, c12 String, c13 String, c14 String, c15 String, c16 String, c17 String, c18 String, c19 String, c20 String, c21 String, c22 String, c23 String, c24 String, c25 String, c26 String, c27 String, c28 String, c29 String, c30 String, c31 String, c32 String, c33 String, c34 String, c35 String, c36 String, c37 String, c38 String, c39 String, c40 String, c41 String, c42 String, c43 String'
)
WHERE c9 != 'Date mutation'
SETTINGS format_csv_delimiter = ';';