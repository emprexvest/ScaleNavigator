"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Set the view engine to EJS
app.set('view engine', 'ejs');
// Set the views directory
app.set('views', path_1.default.join(__dirname, 'views'));
// Serve static files from the 'src' directory
app.use(express_1.default.static(path_1.default.join(__dirname, '../src')));
// Server static files from the 'dist' directory
app.use(express_1.default.static(path_1.default.join(__dirname, '../dist')));
// Middleware to parse JSON bodies
app.use(express_1.default.json());
// Define a route
app.get('/', (req, res) => {
    res.render('index', { title: 'Hello World Scale Navigator' });
});
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
