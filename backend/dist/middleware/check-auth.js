const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization
            .split(" ")[1];
        jwt.verify(token, 'pia_2023_kljuc_za_hesiranje');
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Auth failed" });
    }
};
//# sourceMappingURL=check-auth.js.map