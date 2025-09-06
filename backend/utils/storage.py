import os

def save_file(path: str, content: str):
    with open(path, "w") as f:
        f.write(content)

def read_file(path: str):
    if os.path.exists(path):
        with open(path, "r") as f:
            return f.read()
    return None
