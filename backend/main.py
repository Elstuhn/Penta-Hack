from flask import Flask, render_template, request, session
from backend.src.transformer import *
app = Flask(__name__)

@app.route('/call', methods=["POST"])
def answer():
    if request.method == "POST":
        data = request.data 
        data = data.decode("utf-8")
        data = eval(data)
        try:
            f, fprime, points = grad_desc(*[data[i] for i in data])
        except Exception as e:
            return {"status" : 0, "error": f"{type(e)} {e}"}
        fprime = str(fprime)
        return {"f": f, "fprime": fprime, "points": points, "status": 1}
    else:
        pass

if __name__ == '__main__':
    app.run(debug = True)
