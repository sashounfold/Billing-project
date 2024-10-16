const jwt = require('jsonwebtoken');

function generateAccessToken(user) {
    return jwt.sign(user, secretKey, { expiresIn: '1h' });
}
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = { id: 1, username };
    const token = generateAccessToken(user);
    res.json({ token });
});
