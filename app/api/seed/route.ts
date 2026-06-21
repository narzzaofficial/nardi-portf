import { NextResponse } from "next/server";
import { addItem, COLLECTIONS } from "../../../lib/firestore";

const projects = [
  // Featured Projects
  {
    number: "01", title: "QueryBot AI", accent: "#4f8ef7",
    description: "An AI-powered Text-to-SQL system integrated with Slack. Translates natural language questions into complex BigQuery SQL, automating data retrieval for non-technical team members.",
    tech: ["BigQuery", "FastAPI", "LLM", "Slack API", "LangChain"],
    impact: "Reduced data analyst ad-hoc query load by 40%.",
    featured: true, order: 0
  },
  {
    number: "02", title: "Pandai Data Hub Dashboard", accent: "#34d399",
    description: "A comprehensive data visualization platform tracking business metrics. Deeply integrated with Metabase to deliver real-time analytics for executive stakeholders.",
    tech: ["React", "Next.js", "Metabase", "Tailwind CSS"],
    impact: "Unified 5 different data sources into a single pane of glass.",
    featured: true, order: 1
  },
  {
    number: "03", title: "Automation Workflow System", accent: "#8b5cf6",
    description: "A centralized workflow automation system for the data engineering team. Features scheduling logic, pipeline orchestration, and automated data quality checks.",
    tech: ["Python", "Airflow", "PostgreSQL", "Docker"],
    impact: "Improved pipeline efficiency and reduced manual interventions by 60%.",
    featured: true, order: 2
  },
  // Other Projects
  { title: "AI Chat Analytics Tool", description: "NLP-powered dashboard extracting sentiment and key topics from chat logs.", tech: ["Python", "Streamlit", "HuggingFace"], featured: false, order: 3 },
  { title: "Student Performance Prediction", description: "ML model predicting student outcomes based on engagement and assignment scores.", tech: ["Scikit-Learn", "Pandas", "Jupyter"], featured: false, order: 4 },
  { title: "Personal Portfolio v1", description: "Previous personal website built with HTML, CSS, and Vanilla JavaScript.", tech: ["HTML", "CSS", "JS"], featured: false, order: 5 },
  { title: "Data Quality Monitor", description: "Cron-based anomaly detector with Slack alerts for daily data dumps.", tech: ["Python", "Slack API", "Cron"], featured: false, order: 6 },
];

const exps = [
  {
    company: "Pandai Education Sdn Bhd", role: "Data Engineer", period: "2023 - Present",
    focus: ["Dashboard development", "Data pipeline", "AI integration", "System migration"],
    description: "Led the migration of legacy data systems to modern cloud infrastructure. Developed interactive business dashboards using Metabase and integrated advanced LLM capabilities into internal tools.",
    order: 0
  },
  {
    company: "Tech Startup Inc.", role: "Web Developer", period: "2022 - 2023",
    focus: ["Frontend Development", "API Integration", "UI/UX"],
    description: "Built responsive and performant web applications using React and Tailwind CSS. Collaborated with designers to implement pixel-perfect UIs.",
    order: 1
  },
];

const certs = [
  { title: "Data Engineering Fundamentals", issuer: "Google Cloud", order: 0 },
  { title: "SQL & BigQuery Certification", issuer: "Coursera", order: 1 },
  { title: "AI / Machine Learning Basics", issuer: "DeepLearning.AI", order: 2 },
  { title: "Web Development Bootcamp", issuer: "Udemy", order: 3 },
  { title: "Advanced React Patterns", issuer: "Frontend Masters", order: 4 },
  { title: "Cloud Architecture", issuer: "AWS", order: 5 },
];

const testimonials = [
  { text: "Nardi has a unique ability to bridge complex data systems with beautiful frontend interfaces. His work on QueryBot AI revolutionized how our team accesses data.", author: "Jane Doe", role: "Lead Data Scientist", company: "Pandai Education", order: 0 },
  { text: "A truly dedicated engineer. Nardi consistently delivers high-quality code and always thinks about the end-user experience when building internal tools.", author: "John Smith", role: "CTO", company: "Tech Startup Inc.", order: 1 },
  { text: "The automation workflows built by Nardi saved us countless hours. Highly recommend his expertise in building robust data pipelines.", author: "Sarah Lee", role: "Product Manager", company: "Pandai Education", order: 2 },
];

const articles = [
  { title: "Building an AI-Powered Text-to-SQL System", excerpt: "How I used BigQuery, FastAPI, and LangChain to create a Slack bot that answers business questions instantly.", date: "Oct 12, 2023", readTime: "5 min", tag: "AI Engineering", order: 0 },
  { title: "Why Modern Data Teams Need Agentic Workflows", excerpt: "Exploring the shift from static ETL pipelines to dynamic, LLM-driven data orchestration.", date: "Nov 04, 2023", readTime: "7 min", tag: "Data Engineering", order: 1 },
  { title: "Designing Dashboards People Actually Use", excerpt: "UI/UX principles for data visualization - bridging the gap between raw numbers and human insight.", date: "Dec 18, 2023", readTime: "4 min", tag: "Design", order: 2 },
];

export async function GET() {
  try {
    console.log("Seeding Database...");

    // Add projects
    for (const p of projects) await addItem(COLLECTIONS.PROJECTS, p);
    // Add exps
    for (const e of exps) await addItem(COLLECTIONS.EXPERIENCE, e);
    // Add certs
    for (const c of certs) await addItem(COLLECTIONS.CERTIFICATIONS, c);
    // Add testimonials
    for (const t of testimonials) await addItem(COLLECTIONS.TESTIMONIALS, t);
    // Add articles
    for (const a of articles) await addItem(COLLECTIONS.ARTICLES, a);

    return NextResponse.json({ success: true, message: "Database seeded successfully!" });
  } catch (err: any) {
    console.error("Seeding Error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
