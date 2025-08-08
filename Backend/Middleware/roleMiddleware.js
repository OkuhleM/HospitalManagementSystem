
// const {authenticateToken} = require("./authMiddleware")


const roleCheck = (requiredRole) =>  {

    return (req, res, next) => {
        console.log("Decoded Role: ", req.user?.role)
        try {
            console.log('req.user', req.user)
            // if (!req.body || !req.user.role) {
            //     return res.status(401).json({ message: 'Unauthorized: No user info found' });
            //   }

            const userRole = req.user?.role; // Extracted from JWT payload
            console.log("userRole", userRole)

            const allowedRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];


if(!allowedRoles.includes(userRole)){
    console.log('requiredRole,userRole', requiredRole,userRole)
    return res.status(403).json({ message: 'Access denied: Unauthorized role' });

}
console.log('receptionist Role: ', userRole )
if (req.user.role !== 'receptionist') {
    return res.status(403).json({ message: 'Only receptionists can perform this action' });
  }

next()

        } catch (error) {
            console.log("Error: ", error)
            res.status(500).json({error: error, message: 'Server error in Role Check' });
        }
    };
};

module.exports = {roleCheck}