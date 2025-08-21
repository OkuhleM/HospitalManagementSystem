const roleCheck = (requiredRole) =>  {

    return (req, res, next) => {

        console.log("Decoded Role: ", req.user?.role)

        try {

            console.log('req.user', req.user)
            
          

            const userRole = req.user?.role; 
            console.log("userRole", userRole)


              if (!userRole) {
        return res.status(401).json({ message: 'Not authenticated' });
      }  

      const rawUserRole= String(userRole).trim().toLowerCase();

       let allowedRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
      allowedRoles = allowedRoles
        .flatMap(r => String(r).split(','))   // split CSV if needed
        .map(r => r.trim().toLowerCase())     // trim + lowercase
        .filter(Boolean); 


if(!allowedRoles.includes(rawUserRole)){
    console.log('requiredRole,userRole', requiredRole,userRole)
    return res.status(403).json({ message: 'Access denied: Unauthorized role', requiredRole:allowedRoles, rawUserRole });

}


next()

        } catch (error) {
            console.log("Error: ", error)
            res.status(500).json({error: error, message: 'Server error in Role Check' });
        }
    };
};

module.exports = {roleCheck}