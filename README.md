# A-Secure-Personal-Photo-Album-Application
Built a secure full-stack Photo Album app using React and Spring Boot. Implemented RESTful APIs, JWT authentication with Spring Security, and a layered architecture (Controller, Service, Repository). Features include user registration/login, protected routes, photo upload/management, and database persistence with JPA/Hibernate.

Secure Photo Album Application (React + Spring Boot + JWT)

Developed a full-stack secure photo album web application that allows authenticated users to upload, manage, and view personal photos within a protected environment. The application was built using a modern React frontend and a Spring Boot REST API backend, implementing JWT-based authentication for secure user sessions.

On the frontend, the application was built with React using a component-based architecture to create a responsive and interactive user interface. React features such as state management, hooks (useState, useEffect), form handling, and API integration using Axios/Fetch were implemented to enable seamless communication with the backend services. The UI includes features such as user registration, login, photo upload, album browsing, and secure logout functionality.

The backend was developed using Spring Boot, following RESTful API design principles to expose endpoints for authentication, photo management, and user operations. The backend architecture includes layered separation of concerns (Controller, Service, Repository) to ensure maintainability and scalability.

Security was implemented using Spring Security and JSON Web Tokens (JWT) to provide stateless authentication and authorization. Users authenticate through a login endpoint that generates a signed JWT token, which is then included in subsequent API requests to verify identity and protect restricted endpoints.

The application integrates with a relational database using Spring Data JPA and Hibernate for persistent storage of user data and photo metadata. File handling mechanisms were implemented to manage photo uploads and retrieval efficiently.

Key backend concepts implemented include:

Spring Boot REST API development

Spring Security configuration

JWT authentication and token validation

User authentication and authorization flows

Data persistence with Spring Data JPA and Hibernate

DTOs (Data Transfer Objects) for clean API communication

Exception handling and validation

Layered architecture (Controller, Service, Repository)

Frontend concepts implemented include:

React component-based architecture

React Hooks (useState, useEffect)

Form validation and controlled components

REST API integration using Axios/Fetch

Authentication state management

Protected routes for authorized users

Responsive UI design

Additional technical practices used in the project include:

Cross-Origin Resource Sharing (CORS) configuration

Secure password hashing

Environment configuration for API endpoints

Error handling and user feedback mechanisms
