Node.js
   ↓
Express
   ↓
Server
   ↓
Routes
   ↓
GET API
   ↓
POST API
   ↓
JSON response
   ↓
Postman


POST Request
     ↓
req.body
     ↓
Validation
     ↓
Create user
     ↓
Save user
     ↓
Send response

// new flow
Postman
   ↓
server.js
   ↓
Middleware /   app.use("/api/users", userRoutes)
   ↓
userRoutes.js
   ↓
userController.js
   ↓
Response