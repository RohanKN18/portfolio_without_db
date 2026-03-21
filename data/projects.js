
let projects = [
  {
    projectName: "Portfolio Website",
    projectSlug: "portfolio-website",
    githubLink: "https://github.com/yourname/portfolio",
    liveLink: "https://yourportfolio.com",
    image: "images/portfolio.png",   // 👈 add image here
    description: "Personal portfolio website to showcase projects, skills, and contact information.",

    techStack: {
      languages: ["HTML", "CSS", "JavaScript"],
      frameworks: [],
      databases: [],
      tools: ["VS Code", "Git", "GitHub"]
    },

    features: [
      "Responsive design",
      "Dynamic project filtering",
      "Contact form integration"
    ],

    role: "Full Stack Developer",
    startDate: "2025-01",
    endDate: "2025-02",
    status: "Completed",

    highlights: [
      "Optimized loading speed",
      "Clean UI/UX design",
      "Reusable components"
    ]
  },

  {
    projectName: "Machine Learning Price Predictor",
    projectSlug: "machine-learning-price-predictor",
    githubLink: "https://github.com/yourname/ml-project",
    liveLink: null,
    image: "images/ml.png",
    description: "A regression model that predicts prices based on input features.",

    techStack: {
      languages: ["Python"],
      frameworks: ["Scikit-learn"],
      databases: [],
      tools: ["Jupyter Notebook", "Git"]
    },

    features: [
      "Data preprocessing pipeline",
      "Model comparison",
      "Evaluation metrics dashboard"
    ],

    role: "ML Developer",
    startDate: "2024-11",
    endDate: "2024-12",
    status: "Completed",

    highlights: [
      "Achieved high prediction accuracy",
      "Implemented feature engineering",
      "Visualized model performance"
    ]
  },

  {
    projectName: "Task Manager API",
    projectSlug: "task-manager-api",
    githubLink: "https://github.com/yourname/task-api",
    liveLink: null,
    image: "images/taskapi.png",
    description: "RESTful API for managing tasks with authentication and CRUD operations.",

    techStack: {
      languages: ["JavaScript"],
      frameworks: ["Node.js", "Express.js"],
      databases: ["MongoDB"],
      tools: ["Postman", "Git"]
    },

    features: [
      "JWT Authentication",
      "Secure routes",
      "REST API architecture"
    ],

    role: "Backend Developer",
    startDate: "2025-03",
    endDate: "2025-04",
    status: "Completed",

    highlights: [
      "Secure authentication system",
      "Scalable backend architecture"
    ]
  }
];


export default projects;