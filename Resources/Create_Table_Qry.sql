-- Drop if table exists
DROP TABLE IF EXISTS Chicago_crime;

-- Create the table
CREATE TABLE Chicago_crime (
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

SELECT * FROM "Chicago_crime";
SELECT COUNT("Description") AS "Frequency"
from "Chicago_crime"

select "Month", "Primary Type", count("Primary Type")
from "Chicago_crime"
group by "Month", "Primary Type"
order by count desc