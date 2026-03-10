export const projects = [
    {
        id: 1,
        name: "Image Prompt Generator",
        description: "A responsive web application that helps users create well-structured prompts for AI image generation tools.",
        tech: ["Next JS", "Tailwind CSS", "Hugging Face API"],
        github: "https://github.com/AjinND/image-prompt-generator",
        URL: "https://image-prompt-generator.vercel.app/",
        status: "Completed",
        highlights: ["Prompt Generation", "Hugging Face", "AI Image Generation"]
    },
    {
        id: 2,
        name: "DreamSync",
        description: "A collaborative bucket list and journey tracking application. It empowers users to document their dreams, turn them into actionable journeys, and collaborate with friends.A powerful Bucket List Application for android",
        tech: ["React Native", "Tailwind CSS", "Firebase"],
        github: "https://github.com/AjinND/DreamSync",
        URL: "https://expo.dev/accounts/some_1/projects/dreamsync/builds/9cc134be-2a3e-40f7-9cc4-a6d59a69f9e8",
        status: "Preview completed",
        highlights: ["Community", "Journeys", "Chat", "Notifications", "Dark Mode"]
    },
    {
        id: 3,
        name: "Artist Portfolio & E-commerce Website",
        description: "A modern, visually stunning artist portfolio and e-commerce websitefor Artists to showcase and sell their artwork online.",
        tech: ["Tailwind CSS", "Next JS", "React Context API"],
        github: "https://github.com/AjinND/moon-doggy",
        URL: "https://moon-doggy-pjz5lf53s-ajins-projects-6acee4cb.vercel.app/",
        status: "In Progress (Development Paused, Preview available)",
        highlights: ["Portfolio Showcase", "E-commerce Integration", "Responsive Design"]
    },
    {
        id: 4,
        name: "Personal Expense Tracker",
        description: "A simple web application to track personal expenses with real-time updates and data visualization.",
        tech: ["React JS", "Next JS", "Node.js", "MongoDB", "Tailwind CSS", "Cloudinary"],
        github: "https://github.com/AjinND/personal-expense-tracker",
        URL: "https://personal-expense-tracker-ii4k0y1t0-ajins-projects-6acee4cb.vercel.app/",
        status: "In Progress (Development paused, Preview available)",
        highlights: ["User authentication", "Expense management", "Data visualization"]
    },
    {
        id: 5,
        name: "Website Builder",
        description: "A powerful drag-and-drop website builder that helps you design and generate code for web applications across multiple frameworks.",
        tech: ["Next JS", "Tailwind CSS", "React DnD", "Redux Persist", "OpenAI API"],
        github: "https://github.com/AjinND/website-builder",
        URL: "No Deployments Available",
        status: "In Progress (Development paused)",
        highlights: ["Drag-and-Drop Interface", "Multi-Framework Support", "AI-Powered Code Generation"]
    },
    {
        id: 6,
        name: "Fake Review Detection",
        description: "Machine learning model for detecting fraudulent reviews in e-commerce platforms",
        tech: ["Python", "ML", "Data Analysis", "Scikit-learn"],
        github: "https://github.com/AjinND/Fake-Review-Detection",
        URL: "No Deployments Available",
        status: "Completed",
        highlights: ["NLP processing", "Classification model", "80% + accuracy"]
    }
];

export const skills = {
    languages: ["Java", "Node.js", "Python", "JavaScript", "TypeScript"],
    frontend: ["React", "Next.js", "Angular", "Tailwind CSS"],
    backend: ["Spring Boot", "Spring Security", "Express", "REST APIs"],
    tools: ["AWS (EC2, Lambda, S3)", "Docker", "PCF", "GitHub Actions", "Oracle RDS", "SQL"]
};

export const about = {
    name: "Ajin N D",
    role: "Full Stack Developer",
    location: "India",
    status: "Available for freelance & full-time",
    bio: "Results-driven Full Stack Developer with 4+ years of experience in delivering cloud-native applications. Specializing in Java, React, and AWS with a proven track record of reducing infrastructure costs and automating critical workflows."
};

export const contact = {
    email: "ajindavis007@gmail.com",
    github: "github.com/AjinND",
    linkedin: "linkedin.com/in/ajin-n-d-37b684193"
};

export const experiences = [
    {
        title: "Custom Software Engineering Analyst",
        company: "Accenture Solutions Private Ltd.",
        period: "2024 – Present",
        description: [
            "Architected and executed cloud migration strategy for enterprise application, leading cross-functional team to transition from on-premise infrastructure to AWS Cloud and PCF, achieving 50% reduction in infrastructure costs while improving system scalability and reliability.",
            "Designed serverless automation workflow using AWS Step Functions, EventBridge, and Lambda, eliminating manual processes and reducing operational overhead by automating critical business tasks.",
            "Engineered containerized deployment pipeline using Docker and AWS ECR/Fargate, establishing CI/CD best practices that improved deployment frequency and application availability.",
            "Developed responsive frontend solutions using React and Angular, selecting optimal technology stack based on project requirements to enhance user experience and satisfaction.",
            "Led proof-of-concept initiatives to evaluate AWS services and other areas as required, providing technical recommendations that informed strategic platform decisions and adoption roadmaps.",
            "Evaluated and integrated AI-powered development tools into team workflows, measuring productivity gains and establishing best practices that improved code quality and reduced development time."
        ]
    },
    {
        title: "Application Development Associate",
        company: "Accenture Solutions Private Ltd.",
        period: "2021 – 2024",
        description: [
            "Built and deployed production-grade microservices using Java Spring Boot ecosystem (Maven, Spring Security, REST APIs), implementing best practices for scalable and maintainable application architecture.",
            "Integrated applications with AWS services (CloudWatch, S3, DynamoDB, IAM, EC2) to optimize performance, reduce costs, and enhance monitoring capabilities across distributed systems.",
            "Collaborated in Agile/Scrum teams to deliver iterative product releases, participating in sprint planning, daily standups, and retrospectives to ensure timely delivery of high-quality software."
        ]
    }
];
