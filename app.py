from sqlalchemy.sql.expression import distinct
import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, jsonify, render_template


#################################################
# Database Setup
#################################################
rds_connection_string = "postgres:postgres@localhost:5432/Project_03"
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
#     # Create our session (link) from Python to the DB
    session = Session(engine)

    results_y = session.query(db.year).group_by(db.year)
    results_d = session.query(db.primary_type).group_by(db.primary_type)
    results_x = session.query(db.description).group_by(db.description)

    session.close()

    return render_template('index.html', Year = [result[0] for result in results_y], Primary_Type = [result[0] for result in results_d],Description = [result[0] for result in results_x])

@app.route("/api")

def api_list():

    """List all available api routes."""

    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/year<br/>"
        f"/api/v1.0/year/primary_type"
    )


@app.route('/api/v1.0/<year>')
def filter_year(year):
    session = Session(engine)
    result = session.query(db.primary_type, func.count(db.description)).group_by(db.year, db.primary_type).filter(db.year == year).order_by(func.count(db.description).desc()).all()
    session.close()
    return jsonify(result)


@app.route('/api/v1.0/<year>/<primary_type>')
def filter_yr_type(year, primary_type):
    session = Session(engine)
    result = session.query(db.description, func.count(db.description)).group_by(db.year, db.primary_type, db.description).filter(db.year == year).filter(db.primary_type == primary_type).order_by(func.count(db.description).desc()).all()
    session.close()
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
