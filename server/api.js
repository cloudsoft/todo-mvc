module.exports = {
    configure: function (app) {
        app.get('/api', function (req, res) {
            app.mySqlConnection(function (err) {
                if(!err) {
                    res.status(200).send('ok');
                }
                else{
                    sendError(res);
                }
            });
        });

        // create
        app.post('/api/todos/', function (req, res) {
            var todo = req.body;
            app.mySqlConnection(function (err, con) {
                if(!err) {
                    con.query('insert into todo_list set ?', todo, function (err, result) {
                        con.release();
                        res.status(201).send({id: result.insertId});
                    });
                }
                else{
                    sendError(res);
                }
            });
        });

        // retrieve
        app.get('/api/todos/', function (req, res) {
            app.mySqlConnection(function (err, con) {
                if(!err) {
                    con.query('select * from todo_list', function (err, result) {
                        con.release();
                        res.status(200).send(result);
                    });
                }
                else{
                    sendError(res);
                }
            });
        });

        // update
        app.put('/api/todos/:id', function (req, res) {
            var todo = req.body;
            app.mySqlConnection(function (err, con) {
                if(!err) {
                    con.query('update todo_list set ? where id = ?', [todo, todo.id], function (err, result) {
                        con.release();
                        res.status(200).send({id: result});
                    });
                }
                else{
                    sendError(res);
                }
            });
        });

        // delete
        app.delete('/api/todos/:id/', function (req, res) {
            var id = req.params.id;
            app.mySqlConnection(function (err, con) {
                if(!err) {
                    con.query('delete from todo_list where id = ?', [id], function (err, result) {
                        con.release();
                        res.status(200).send({id: result});
                    });
                }
                else{
                    sendError(res);
                }
            });
        });
    }
};

function sendError(res) {
    res.status(500).send('Failed to connect to Database');
}