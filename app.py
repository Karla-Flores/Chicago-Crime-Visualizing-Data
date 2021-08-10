import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, jsonify


#################################################
# Database Setup
#################################################
rds_connection_string = "postgres:postgres@localhost:5432/Project_03"
engine = create_engine(f'postgresql://{rds_connection_string}')
Base = automap_base()
Base.prepare(engine, reflect=True)
db = Base.classes.Chicago_crime


print(engine.table_names())

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


# #################################################
# Flask Routes
# #################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/Year<br/>"
        f"/api/v1.0/Primary_Type"
    )


@app.route("/api/v1.0/Year")
def years():
#     # Create our session (link) from Python to the DB
    session = Session(engine)

#     """Return a list of all passenger names"""
#     # Query all passengers
    results = session.query(db.Year).distinct().all()

    session.close()

#     # Convert list of tuples into normal list
    # all_years = list(np.ravel(results))

    return jsonify(results.sort(reverse=True))


# @app.route("/api/v1.0/passengers")
# def passengers():
#     # Create our session (link) from Python to the DB
#     session = Session(engine)

#     """Return a list of passenger data including the name, age, and sex of each passenger"""
#     # Query all passengers
#     results = session.query(Passenger.name, Passenger.age, Passenger.sex).all()

#     session.close()

#     # Create a dictionary from the row data and append to a list of all_passengers
#     all_passengers = []
#     for name, age, sex in results:
#         passenger_dict = {}
#         passenger_dict["name"] = name
#         passenger_dict["age"] = age
#         passenger_dict["sex"] = sex
#         all_passengers.append(passenger_dict)

#     return jsonify(all_passengers)


if __name__ == '__main__':
    app.run(debug=True)
