const roleCheck = (allowedRoles = []) => {
    return (req, res, next) => {
        console.log('req.user', req.user)

      try {
        console.log('req.user', req.user)
        // Check if req.user is populated from the JWT middleware
        const userRole = req.user?.role;

        console.log('userRole', userRole
        )
  
        if (!userRole) {
          return res.status(401).json({ message: 'Unauthorized: No user info found' });
        }
  
        // Check if the user's role is one of the allowedRoles
        if (!allowedRoles.includes(userRole)) {
          return res.status(403).json({
            message: `Access denied: ${userRole} role is not permitted to perform this action`
          });
        }
  
        // All good, move on
        next();
      } catch (error) {
        console.error('Role check error:', error);
        return res.status(500).json({ message: 'Server error during role verification' });
      }
    };
  };
  
  module.exports = { roleCheck };
  