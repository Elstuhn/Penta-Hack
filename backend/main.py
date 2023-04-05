from flask import Flask, render_template, request, session
# from backend.src.transformer import *
app = Flask(__name__)
from supabase import create_client, Client
supabase: Client = create_client('https://cwoqhbnsiqcvlwypmeaq.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3b3FoYm5zaXFjdmx3eXBtZWFxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4MDU4Njk4NywiZXhwIjoxOTk2MTYyOTg3fQ.usQwUGoRsjZQG6W4L8oTpVs0XE9FS4G_rM-0DHVnmpI')

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

@app.route('/upload', methods=['POST'])
def upload():
    if request.method == "POST":
        body = request.get_json()
        if ('file_url' not in body or 'topic' not in body or 'school' not in body or 'subject' not in body):
            return ('invalid body', 400)
        file_url = request.json['file_url']
        topic = request.json['topic']
        school = request.json['school']
        subject = request.json['subject']
        data = supabase.table("post").select("*").execute()
        supabase.table('post').insert({
            "sch": school,
            "topic": topic,
            "sub": subject,
            "data": file_url
        }).execute()
        # file.save(file.filename)
        return data.json()
    else:
        pass

if __name__ == '__main__':
    app.run(debug = True)
