import express, { Request, Response } from 'express';
import path from 'path';


const app = express();
const port = process.env.PORT || 3000;

// Set the view engine to EJS

app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'src' directory
app.use(express.static(path.join(__dirname, '../src')));

// Server static files from the 'dist' directory
app.use(express.static(path.join(__dirname, '../dist')));

// Middleware to parse JSON bodies
app.use(express.json());


// Define a route
app.get('/', (req: Request, res: Response) => {
    res.render('index', { title: 'Hello World Scale Navigator' });
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})