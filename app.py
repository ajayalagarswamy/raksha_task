from flask import Flask, render_template, request, redirect, url_for, session,jsonify
import sqlite3 as sql
import csv

app = Flask(__name__)
app.secret_key = 'ajay'


@app.route('/')
def home():
        conn=sql.connect("database.db")
        conn.row_factory=sql.Row
        cur=conn.cursor()
        cur.execute("select * from login")
        data=cur.fetchall()
        return render_template("login.html",datas=data)


@app.route('/dashboard', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form["email"]
        password = request.form["password"]
        conn = sql.connect('database.db')
        conn.row_factory = sql.Row
        cur = conn.cursor()
        cur.execute('select  *  from  login  where email=? and password=?',(email,password))
        data = cur.fetchone()
        if data:
            if str(data['email']) == str(email)  and   str(data['password']) == str(password):
                session['email'] =data['email']
                return render_template('dashboard.html',data=data)
        else:
            return  'user not exist'
    return render_template('login.html')


@app.route('/')
def index():
    return render_template('dashboard.html')

@app.route('/kpi_data')
def kpi_data():
    conn = sql.connect('database.db')
    cursor = conn.cursor()
    cursor.execute('SELECT category, actual, target, month FROM dash')
    kpis = cursor.fetchall()
    conn.close()

    kpi_dict = {
        'Revenue': [],
        'New Customers': [],
        'Avg. Revenue per Customer': [],
        'Customer Acquisition Cost': []
    }

    for kpi in kpis:
        kpi_dict[kpi[0]].append({
            'actual': kpi[1],
            'target': kpi[2],
            'month': kpi[3]
        })

    return jsonify(kpi_dict)








@app.route('/signup',methods= ['POST','GET'])
def signup():
    if request.method == 'POST':
        email = request.form["email"]
        password = request.form["password"]
        conn = sql.connect('database.db')
        conn.row_factory = sql.Row
        cur = conn.cursor()
        cur.execute('insert into login (email,password)  values(?,?)',(email,password))
        conn.commit()
        return redirect(url_for('login'))
    return render_template('signup.html')


# @app.route('/')
# def index():
#     return render_template('dashboard.html')

# @app.route('/kpi_data')
# def kpi_data():
#     conn = sql.connect('database.db')
#     cursor = conn.cursor()
#     cursor.execute('SELECT metric, value, month FROM kpi')
#     kpis = cursor.fetchall()
#     conn.close()

#     kpi_dict = {'Average Response Time': [], 'Customer Satisfaction Score': [], 'Customer Effort Score': [], 'Net Promoter Score': []}
#     for kpi in kpis:
#         kpi_dict[kpi[0]].append({'value': kpi[1], 'month': kpi[2]})
#     return jsonify(kpi_dict)


if __name__ == '__main__':
    app.run(debug=True)
    
