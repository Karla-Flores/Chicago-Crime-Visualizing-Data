-- Drop if table exists
DROP TABLE IF EXISTS chicago_crime;

-- Create the table
CREATE TABLE chicago_crime (
    "id" serial PRIMARY KEY,
    "date" VARCHAR,
	"iucr" VARCHAR,
	"primary_type" VARCHAR,
	"description" VARCHAR,
	"location_description" VARCHAR,
	"arrest" BOOLEAN,
	"domestic" BOOLEAN,
	"year" INT,
	"latitude" FLOAT,
	"longitude" FLOAT,
	"month" INT
)
;

SELECT * FROM chicago_crime;

SELECT "year", "month", "primary_type", COUNT("primary_type")
FROM chicago_crime
GROUP BY "year", "month", "primary_type"
ORDER BY "year" DESC;

SELECT "year", "month", "primary_type", "description","arrest", COUNT("Arrest")
FROM chicago_crime
GROUP BY "year", "month", "primary_type", "description","arrest"
ORDER BY "year" DESC;

SELECT "year", "month", "primary_type", "description", COUNT("primary_type")
FROM chicago_crime
GROUP BY "year", "month", "primary_type", "description"
ORDER BY "year" DESC;

SELECT "year", "month", "primary_type", "description", "location_description", COUNT("description")
FROM chicago_crime
GROUP BY "year", "month", "primary_type", "description", "location_description"
ORDER BY "year" DESC;
