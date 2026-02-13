CREATE TABLE IF NOT EXISTS land_transaction (
    id UUID DEFAULT generateUUIDv4(),
    mutation_date Date,
    mutation_type LowCardinality(String),
    property_value Float64,
    street_number String,
    street_name String,
    postal_code String,
    city LowCardinality(String),
    department_code LowCardinality(String),
    section String,
    plot_number String,
    built_area Float32,
    property_type LowCardinality(String),
    land_area Float32
) ENGINE = MergeTree()
ORDER BY (department_code, city, mutation_date);

INSERT INTO land_transaction (
    mutation_date,
    mutation_type,
    property_value,
    street_number,
    street_name,
    postal_code,
    city,
    department_code,
    section,
    plot_number,
    built_area,
    property_type,
    land_area
)
SELECT
    -- Conversion de la date (c9)
    toDate(parseDateTimeBestEffortOrNull(c9)) AS mutation_date,
    -- Nature mutation (c10)
    c10 AS mutation_type,
    -- Valeur foncière (c11) avec gestion de la virgule
    toFloat64OrZero(replaceAll(c11, ',', '.')) AS property_value,
    -- Adresse : Numéro (c12)
    c12 AS street_number,
    -- Nom de la voie (c14 + c16 pour avoir le type et le nom)
    trim(concat(c14, ' ', c16)) AS street_name,
    -- Code postal (c17)
    c17 AS postal_code,
    -- Commune (c18)
    c18 AS city,
    -- Code département (c19)
    c19 AS department_code,
    -- Section (c22)
    c22 AS section,
    -- N° de plan (c23) -> plot_number
    c23 AS plot_number,
    -- Surface réelle bâti (c39)
    toFloat32OrZero(replaceAll(c39, ',', '.')) AS built_area,
    -- Type local (c37)
    c37 AS property_type,
    -- Surface terrain (c43)
    toFloat32OrZero(replaceAll(c43, ',', '.')) AS land_area
FROM file(
    '/var/lib/clickhouse/user_files/ValeursFoncieres-2025-S1.csv.gz', 
    'CSV', 
    'c1 String, c2 String, c3 String, c4 String, c5 String, c6 String, c7 String, c8 String, c9 String, c10 String, c11 String, c12 String, c13 String, c14 String, c15 String, c16 String, c17 String, c18 String, c19 String, c20 String, c21 String, c22 String, c23 String, c24 String, c25 String, c26 String, c27 String, c28 String, c29 String, c30 String, c31 String, c32 String, c33 String, c34 String, c35 String, c36 String, c37 String, c38 String, c39 String, c40 String, c41 String, c42 String, c43 String'
)
WHERE c9 != 'Date mutation' AND c9 != '' -- On évite les entêtes et les lignes vides
SETTINGS format_csv_delimiter = ';';
