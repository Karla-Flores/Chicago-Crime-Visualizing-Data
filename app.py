import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, jsonify, render_template


#################################################
# Database Setup
#################################################
rds_connection_string = "postgres:123@localhost:5432/Project_03"
engine = create_engine(f'postgresql://{rds_connection_string}')
Base = automap_base()
Base.prepare(engine, reflect=True)
db = Base.classes.chicago_crime

print(engine.table_names())

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


# #################################################
# Flask Routes
# #################################################

@app.route("/")
def home():
    session = Session(engine)

#     """Return a list of all passenger names"""
#     # Query all passengers
    results_y = session.query(db.Year).group_by(db.Year)
    results_d = session.query(db.Primary_Type).group_by(db.Primary_Type)
    results_x = session.query(db.Description).group_by(db.Description)
    session.close()

    return render_template('index.html', Year = [result[0] for result in results_y], Primary_Type = [result[0] for result in results_x],Description = [result[0] for result in results_d])


@app.route('/docs')
def docs():
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
    results = session.query(db.Year).distinct()

    session.close()

#     # Convert list of tuples into normal list
    # all_years = list(np.ravel(results))

    return jsonify(results)

@app.route('/api/v1.0/<Year>/<Desciption>')
def end(Year, Desciption):
    # Create session from Python to DB
    session = Session(engine)
    # Selection
    results = session.query(db.Month).count(db.Description)

    return jsonify()


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
