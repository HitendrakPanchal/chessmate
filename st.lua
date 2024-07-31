ChessMate/
├── backend/
│   ├── controllers/
│   │   ├── authController.ts
│   │   ├── gameController.ts
│   │   └── chatController.ts
│   ├── models/
│   │   ├── User.ts
│   │   ├── Game.ts
│   │   |── Chat.ts
|   |   └── Move.ts
│   ├── routes/
│   │   ├── authRoutes.ts
│   │   ├── gameRoutes.ts
│   │   └── chatRoutes.ts
│   ├── services/
│   │   ├── authService.ts
│   │   ├── gameService.ts
│   │   └── chatService.ts
│   ├── utils/
│   │   ├── db.ts
│   │   ├── config.ts
|   │   ├── validate.ts
|   │   ├── errorHandler.ts
|   │   └── token.ts
│   ├── server.ts
│   └── socket.ts
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   │   ├── Login.tsx
│   │   │   │   └── Register.tsx
│   │   │   ├── Game/
│   │   │   │   ├── GameBoard.tsx
│   │   │   │   └── MoveList.tsx
│   │   │   ├── Chat/
│   │   │   │   └── Chat.tsx
│   │   │   ├── Profile/
│   │   │   │   └── Profile.tsx
│   │   │   └── Common/
│   │   │       ├── Header.tsx
│   │   │       └── Footer.tsx
│   │   ├── contexts/
│   │   │   ├── AuthContext.tsx
│   │   │   ├── GameContext.tsx
│   │   │   └── ChatContext.tsx
│   │   ├── hooks/
│   │   │   └── useAuth.ts
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── GamePage.tsx
│   │   │   └── ProfilePage.tsx
│   │   ├── App.tsx
│   │   ├── index.tsx
│   │   └── routes.tsx
│   ├── .env
│   ├── package.json
│   └── vite.config.ts
├── .gitignore
├── README.md
└── package.json



ChessMate/
│
├── controllers/
│   ├── authController.ts
│   ├── gameController.ts
│   ├── chatController.ts
│   └── moveController.ts
│
├── models/
│   ├── User.ts
│   ├── Game.ts
│   ├── Chat.ts
│   └── Move.ts
│
├── routes/
│   ├── authRoutes.ts
│   ├── gameRoutes.ts
│   ├── chatRoutes.ts
│   └── moveRoutes.ts
│
├── services/
│   ├── authService.ts
│   ├── userService.ts
│   ├── gameService.ts
│   ├── chatService.ts
│   └── moveService.ts
│
├── utils/
│   ├── validate.ts
│   ├── errorHandler.ts
│   └── token.ts
│
├── server.ts
├── socket.ts
└── package.json
