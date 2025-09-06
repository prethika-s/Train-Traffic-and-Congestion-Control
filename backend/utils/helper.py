import datetime

def format_time(time_str: str) -> str:
    try:
        return datetime.datetime.strptime(time_str, "%H:%M").strftime("%I:%M %p")
    except Exception:
        return time_str
