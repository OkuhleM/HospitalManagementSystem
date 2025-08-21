const jwt = require('jsonwebtoken');

const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const SECRETKEY = process.env.SECRETKEY

const authenticateToken = (req,res,next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) return res.status(401).json({ message: 'No token provided' });
 
const token = authHeader.split(' ')[1];

if (!token) return res.status(401).json({ message: 'Token missing' });


    jwt.verify(token,SECRETKEY, (err, decodedUser)=>{
      console.log('decodedUser', decodedUser, token)
        console.log('err: ', err, SECRETKEY)

        if (err){ 
            console.log('error JWT', err)
            return res.status(403).json({ message: 'Invalid token provided' });

    }
    console.log('user', decodedUser)
        req.user = decodedUser;
        console.log('verified user:', decodedUser.role)
        next()
    })

}

module.exports={
    authenticateToken
}