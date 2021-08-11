-- Drop if table exists
DROP TABLE IF EXISTS chicago_crime;

-- Create the table
CREATE TABLE chicago_crime (
    "ID" serial PRIMARY KEY,
    "Date" VARCHAR,
	"IUCR" VARCHAR,
	"Primary_Type" VARCHAR,
	"Description" VARCHAR,
	"Location_Description" VARCHAR,
	"Arrest" BOOLEAN,
	"Domestic" BOOLEAN,
	"Year" INT,
	"Latitude" FLOAT,
	"Longitude" FLOAT,
	"Month" INT
)
;

SELECT * FROM chicago_crime;

SELECT "Year", "Month", "Primary_Type", COUNT("Primary_Type")
FROM chicago_crime
GROUP BY "Year", "Month", "Primary_Type"
ORDER BY "Year" DESC;

SELECT "Year", "Month", "Primary_Type", "Description","Arrest", COUNT("Arrest")
FROM chicago_crime
GROUP BY "Year", "Month", "Primary_Type", "Description","Arrest"
ORDER BY "Year" DESC;

SELECT "Year", "Month", "Primary_Type", "Description" , COUNT("Primary_Type")
FROM chicago_crime
GROUP BY "Year", "Month", "Primary_Type", "Description"
ORDER BY "Year" DESC;

SELECT "Year", "Month", "Primary_Type","Description","Location_Description", COUNT("Description")
FROM chicago_crime
GROUP BY "Year", "Month", "Primary_Type", "Location_Description", "Description"
ORDER BY "Year" DESC;
