from sqlalchemy.sql.expression import distinct
import pandas as pd
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
@app.route("/dashboard")
def dashboard():
    return render_template("dashboard.html")


@app.route("/api")
def api_list():
    """List all available api routes."""

    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/dropdown<br/>"
        f"/api/v1.0/year/&lt;year&gt;<br/>"
        f"/api/v1.0/&lt;year&gt;/&lt;primary_type&gt;"
    )


# @app.route('/')
# def get():

#     session = Session(engine)

#     results_y = session.query(db.year).group_by(db.year)
#     results_d = session.query(db.primary_type).group_by(db.primary_type)

#     result = {
#         'years': results_y,
#         'primary_type': results_d
#     }

#     session.close()
#     return render_template("index.html", Year = [result[0] for result in results_y], Primary_Type = [result[0] for result in results_d])


@app.route('/api/v1.0/dropdown')
def get():

    session = Session(engine)

    results_y = session.query(db.year).group_by(db.year)
    results_d = session.query(db.primary_type).group_by(db.primary_type)

    result = {
        'years': results_y,
        'primary_type': results_d
    }

    session.close()
    # return render_template("index.html", Year = [result[0] for result in results_y], Primary_Type = [result[0] for result in results_d])
    return jsonify(Year=[result[0] for result in results_y], Primary_Type=[result[0] for result in results_d])


@app.route('/api/v1.0/year/<year>')
def filter_year(year):
    session = Session(engine)

    description_count = session.query(db.primary_type, db.description, func.count(db.description)).group_by(
        db.primary_type, db.year, db.description).filter(db.year == year).order_by(func.count(db.description).desc()).all()
    location_bar = session.query(db.primary_type, db.location_description, func.count(db.location_description)).group_by(
        db.primary_type, db.year, db.location_description).filter(db.year == year).order_by(func.count(db.location_description).desc()).all()
    primarytype_month = session.query(db.primary_type, db.month, func.count(
        db.primary_type)).group_by(db.primary_type, db.year, db.month).filter(db.year == year).all()
    arrest_count = session.query(db.primary_type, db.arrest, func.count(db.arrest)).group_by(
        db.primary_type, db.year, db.arrest).filter(db.year == year).all()
    result = {
        "description_count": description_count,
        "primary_type_bymonth": primarytype_month,
        "arrest_count": arrest_count,
        "location ": location_bar
    }

    session.close()
    return jsonify(result)


@app.route('/api/v1.0/<year>/<primary_type>')
def filter_yr_type(year, primary_type):
    session = Session(engine)

    primary_type = primary_type.upper()
    lat_lon = session.query(db.primary_type, db.date, db.description, db.location_description, db.arrest,
                            db.latitude, db.longitude).filter(db.year == year).filter(db.primary_type == primary_type).all()

    result = {
        "lat_lon": lat_lon
    }

    session.close()
    return jsonify(result)

@app.route('/api/v1.0/monthly/<year>/<primary_type>')
def filter_month_type(year, primary_type):
    session = Session(engine)

    primary_type = primary_type.upper()
    arrest_count_month = session.query(db.month, db.arrest, func.count(db.arrest)).group_by(db.year, db.primary_type, db.month, db.arrest).filter(db.year == year).filter(db.primary_type == primary_type).all()
    # arrest_count_month_false = session.query(db.month, func.count(db.arrest)).group_by(db.year, db.primary_type, db.month, db.arrest).filter(db.year == year).filter(db.primary_type == primary_type).filter(db.arrest == 'true').all()
    arr_by_month =[{"Month": i, "True":None, "False":None} for i in range(1,13)]

    for item in arrest_count_month:
	    arr_by_month[int(item[0]-1)][str(item[1])] = item[2]
    # df = pd.DataFrame(arrest_count_month)
    # result = df.to_dict(orient="records")
    session.close()
    return {"results":arr_by_month}


if __name__ == '__main__':
    app.run(debug=True)
