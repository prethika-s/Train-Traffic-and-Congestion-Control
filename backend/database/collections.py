from .db import db

def trains_collection():
    return db["trains"]

def pnr_collection():
    return db["pnr"]

def alerts_collection():
    return db["alerts"]
