-- Drop if table exists
DROP TABLE IF EXISTS Chicago_crime;

-- Create the table
CREATE TABLE Chicago_crime (
    "ID" serial PRIMARY KEY,
    "Date" VARCHAR,
	"IUCR" VARCHAR,
	"Primary Type" VARCHAR,
	"Description" VARCHAR,
	"Location Description" VARCHAR,
	"Arrest" BOOLEAN,
	"Domestic" BOOLEAN,
	"Year" INT,
	"Latitude" FLOAT,
	"Longitude" FLOAT,
	"Month" INT
)
;

SELECT * FROM Chicago_crime;
