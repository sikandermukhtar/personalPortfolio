export interface ProjectSection {
  title: string;
  items: string[];
  imageUrl?: string;
}

export interface Project {
  _id: string;
  title: string;
  slug: string;
  description: string;
  projectUrl?: string;
  githubUrl?: string;
  technologies: string[];
  imageUrl?: string;
  features?: string[];
  detailSections?: ProjectSection[];
  challenges?: string[];
  lessons?: string[];
}

export const projects: Project[] = [
  {
    _id: "1",
    title: "GradeWave",
    slug: "gradewave",
    description: "An AI-assisted grading and feedback platform built with FastAPI, React, Expo React Native, Celery, Redis, and RAG workflows.",
    githubUrl: "https://github.com/sikandermukhtar/gradewave-final",
    technologies: ["FastAPI", "React", "Expo React Native", "Celery", "Redis", "RAG"],
  },
  {
    _id: "2",
    title: "Real-time Chat Application",
    slug: "realtime-chat",
    description: "A scalable real-time messaging platform with WebSocket support, featuring private chats, group channels, and message persistence.",
    githubUrl: "https://github.com/example/realtime-chat",
    projectUrl: "https://chat-demo.example.com",
    technologies: ["Node.js", "Socket.io", "Redis", "PostgreSQL", "React"],
  },
  {
    _id: "3",
    title: "API Gateway Service",
    slug: "api-gateway",
    description: "A high-performance API gateway with rate limiting, request routing, authentication middleware, and comprehensive logging.",
    githubUrl: "https://github.com/example/api-gateway",
    technologies: ["Go", "gRPC", "Docker", "Prometheus", "Kubernetes"],
  },
  {
    _id: "4",
    title: "Task Management CLI",
    slug: "task-cli",
    description: "A powerful command-line task manager with project organization, priority levels, due dates, and sync capabilities.",
    githubUrl: "https://github.com/example/task-cli",
    technologies: ["Rust", "SQLite", "Clap"],
  },
  {
    _id: "5",
    title: "URL Shortener Service",
    slug: "url-shortener",
    description: "A distributed URL shortening service with analytics tracking, custom aliases, and expiration policies.",
    githubUrl: "https://github.com/example/url-shortener",
    projectUrl: "https://short.example.com",
    technologies: ["Python", "FastAPI", "MongoDB", "Redis", "AWS Lambda"],
  },
  {
    _id: "6",
    title: "File Storage Microservice",
    slug: "file-storage",
    description: "A secure file storage microservice with chunked uploads, virus scanning, and multi-cloud replication support.",
    githubUrl: "https://github.com/example/file-storage",
    technologies: ["Java", "Spring Boot", "MinIO", "RabbitMQ", "PostgreSQL"],
  },
  {
    _id: "7",
    title: "CI/CD Pipeline Tool",
    slug: "cicd-pipeline",
    description: "A lightweight CI/CD automation tool with YAML configuration, parallel job execution, and integration with popular git providers.",
    githubUrl: "https://github.com/example/cicd-pipeline",
    technologies: ["TypeScript", "Docker", "GitHub Actions", "Bash"],
  },
  {
    _id: "8",
    title: "Distributed Cache System",
    slug: "distributed-cache",
    description: "An in-memory distributed cache with consistent hashing, TTL support, and automatic failover mechanisms.",
    githubUrl: "https://github.com/example/distributed-cache",
    technologies: ["Go", "etcd", "Protocol Buffers", "Docker"],
  },
  {
    _id: "9",
    title: "E-commerce Backend API",
    slug: "ecommerce-api",
    description: "A comprehensive e-commerce backend with inventory management, payment processing, and order fulfillment workflows.",
    githubUrl: "https://github.com/example/ecommerce-api",
    projectUrl: "https://api-docs.example.com",
    technologies: ["Node.js", "Express", "MongoDB", "Stripe", "JWT"],
  },
  {
    _id: "10",
    title: "Log Aggregation System",
    slug: "log-aggregator",
    description: "A centralized logging solution with real-time log streaming, full-text search, and alerting capabilities.",
    githubUrl: "https://github.com/example/log-aggregator",
    technologies: ["Elasticsearch", "Logstash", "Kibana", "Filebeat", "Docker"],
  },
];
