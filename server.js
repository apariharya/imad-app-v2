var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var config = {
  user: 'apariharya',
  database: 'apariharya',
  host: 'db.imad.hasura-app.io',
  port: '5432',
  password: process.env.DB_PASSWORD
  //password: 'bar',
  //database: 'my_db',
};

var app = express();
app.use(morgan('combined'));
var articles = {
 'article-one' : { 
    title: 'Article one|Shubham Agnihotri',
    heading:'Artcle One',
    date:'Sep 25, 2016',
    content :  `<p>This is Shubham Agnihotri this side.This is Shubham Agnihotri this side.
            </p>
            <p>
                This is Shubham Agnihotri this side.This is Shubham Agnihotri this side.This is Shubham Agnihotri this side.
            </p>
            <p>
                This is Shubham Agnihotri this side.This is Shubham Agnihotri this side.This is Shubham Agnihotri this side.This is Shubham Agnihotri this side.This is Shubham Agnihotri this side.
            </p>`
},
'article-two' :{ 
    title: 'Article Two|Shubham Agnihotri',
    heading:'Artcle Two',
    
    date:'Sep 15, 2016',
    content :  `<p>This is Shubham Agnihotri this side.This is Shubham Agnihotri this side.
            </p>
            <p>
                This is Shubham Agnihotri this side.This is Shubham Agnihotri this side.This is Shubham Agnihotri this side.
            </p>
            <p>
                This is Shubham Agnihotri this side.This is Shubham Agnihotri this side.This is Shubham Agnihotri this side.This is Shubham Agnihotri this side.This is Shubham Agnihotri this side.
            </p>`},
'article-three' : { 
    title: 'Article Three|Shubham Agnihotri',
    heading:'Artcle Three',
    date:'Sep 7, 2016',
    content :  `<p>This is Shubham Agnihotri this side.This is Shubham Agnihotri this side.
            </p>
            <p>
                This is Shubham Agnihotri this side.This is Shubham Agnihotri this side.This is Shubham Agnihotri this side.
            </p>
            <p>
                This is Shubham Agnihotri this side.This is Shubham Agnihotri this side.This is Shubham Agnihotri this side.This is Shubham Agnihotri this side.This is Shubham Agnihotri this side.
            </p>`}

}
    function createTemplate(data){
        var title = data.title;
        var date = data.date;
        var heading = data.heading;
        var content = data.content;
    
    var htmlTemplate = `
    <html>
     <head>
        <title>
            ${title}
        </title>
        <meta name="viewport" content="width=device-width,intial-scale=1"/>
       <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body>
    <div class ="container">
        <div>
            <a href='/'>Home</a>
        </div>
        <hr/>
        <h3>${heading}</h3>
        <div>
            ${date}
        </div>
        <div>
            ${content}
        </div>
    </div>
    </body>
</html>
`;
return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
  
});
 
app.get('articles/:articleName',function(req, res){
    pool.query("SELECT * FROM article WHERE title = '" + req.params.articleName + "'",function(err,result)
    {
        if(err){
            res.status(500).send(err.toString());
        }else
        {
            if(result.rows.length===0)
            {
                res.status(404).send('Article NOT FOUND');
            }else{
                var articleData =result.rows[0];
                res.send(createTemplate(articleData));
            }
        }
    });
   
});
var pool = new Pool(config)
app.get('/test-db',function(req,res){
    pool.query('SELECT * FROM test',function(err, result){
        if(err){
            res.status(500).send(err.toString());
        }
        else{
        res.send(JSON.stringify(result.rows));
        }
    });
    
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
