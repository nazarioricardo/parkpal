from pydantic import BaseModel
from typing import Optional, List, Union
from datetime import date
from queries.pool import pool


class Error(BaseModel):
    message: str


class TripIn(BaseModel):
    national_park_name: str
    start_date: date
    end_date: date
    activities: str


class TripOut(TripIn):
    id: str


class TripsRespository:
    def create(self, trip: TripIn,) -> TripOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute (
                """
                    INSERT INTO trips
                    (national_park_name, start_date, end_date, activities)
                    VALUES
                    (%s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        trip.national_park_name,
                        trip.start_date,
                        trip.end_date,
                        trip.activities
                    ]
                )
                id = result.fetchone()[0]
                return TripOut(
                    id= id,
                    national_park_name = trip.national_park_name,
                    start_date = trip.start_date,
                    end_date = trip.end_date,
                    activities = trip.activities
                )


    def get_one(self, trips_id: int) -> TripOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute (
                    """
                    SELECT id, national_park_name, start_date, end_date, activities
                    FROM trips
                    WHERE id = %s;
                    """,
                    [
                        trips_id
                    ]
                )
                records = result.fetchone()
                return TripOut(
                    id= records[0],
                    national_park_name = records[1],
                    start_date = records[2],
                    end_date = records[3],
                    activities = records[4]
                )


    def get_all(self) -> List[TripOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT id, national_park_name, start_date, end_date, activities
                    FROM trips
                    ORDER BY start_date;
                    """
                )
                return [
                    TripOut(
                        id=record[0],
                        national_park_name=record[1],
                        start_date=record[2],
                        end_date=record[3],
                        activities=record[4]
                    )
                    for record in result

                ]
