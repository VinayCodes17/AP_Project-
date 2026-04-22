import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Company from '../models/company.model.js';
import Stat from '../models/stat.model.js';

dotenv.config();

const companies = [
  { name: "Microsoft",      logo: "MS",  color: "#0078d4", role: "Software Engineer",    sector: "Product",    type: "placement",  branches: ["CSE","IT"],                                        cgpa: 7.5, tenth: 75, twelfth: 70, backlogs: 0, year: "2023-24" },
  { name: "Google",         logo: "G",   color: "#34a853", role: "SWE L3",               sector: "Product",    type: "placement",  branches: ["CSE","IT"],                                        cgpa: 8.0, tenth: 80, twelfth: 75, backlogs: 0, year: "2023-24" },
  { name: "Amazon",         logo: "AMZ", color: "#ff9900", role: "SDE-1",                sector: "Product",    type: "placement",  branches: ["CSE","IT","ECE"],                                   cgpa: 7.0, tenth: 70, twelfth: 65, backlogs: 0, year: "2023-24" },
  { name: "Goldman Sachs",  logo: "GS",  color: "#00a3b4", role: "Analyst",              sector: "Finance",    type: "placement",  branches: ["CSE","IT"],                                        cgpa: 7.5, tenth: 75, twelfth: 70, backlogs: 0, year: "2023-24" },
  { name: "Flipkart",       logo: "FL",  color: "#2874f0", role: "SDE Intern",           sector: "Product",    type: "internship", branches: ["CSE","IT"],                                        cgpa: 7.5, tenth: 75, twelfth: 70, backlogs: 0, year: "2023-24" },
  { name: "Adobe",          logo: "AD",  color: "#ff0000", role: "MTS Intern",           sector: "Product",    type: "internship", branches: ["CSE","IT"],                                        cgpa: 7.5, tenth: 70, twelfth: 70, backlogs: 0, year: "2023-24" },
  { name: "Deloitte",       logo: "DE",  color: "#86bc25", role: "Business Analyst",     sector: "Consulting", type: "placement",  branches: ["CSE","IT","ECE"],                                  cgpa: 6.5, tenth: 65, twelfth: 60, backlogs: 0, year: "2023-24" },
  { name: "KPMG",           logo: "KP",  color: "#00338d", role: "Technology Consultant",sector: "Consulting", type: "placement",  branches: ["CSE","IT","ECE"],                                  cgpa: 6.0, tenth: 60, twelfth: 60, backlogs: 0, year: "2022-23" },
  { name: "TCS",            logo: "TCS", color: "#003087", role: "Associate SE",         sector: "IT",         type: "placement",  branches: ["CSE","IT","ECE","EEE","Mechanical","Civil"],        cgpa: 5.5, tenth: 60, twelfth: 55, backlogs: 0, year: "2023-24" },
  { name: "Infosys",        logo: "IN",  color: "#007cc3", role: "Systems Engineer",     sector: "IT",         type: "placement",  branches: ["CSE","IT","ECE","EEE"],                            cgpa: 6.0, tenth: 60, twelfth: 60, backlogs: 0, year: "2023-24" },
  { name: "Wipro",          logo: "WI",  color: "#341c6b", role: "Project Engineer",     sector: "IT",         type: "placement",  branches: ["CSE","IT","ECE","EEE"],                            cgpa: 5.5, tenth: 55, twelfth: 55, backlogs: 0, year: "2022-23" },
  { name: "L&T Technology", logo: "LT",  color: "#e87722", role: "Graduate Engineer",    sector: "Core",       type: "placement",  branches: ["Mechanical","Civil","EEE","ECE"],                  cgpa: 6.5, tenth: 65, twelfth: 60, backlogs: 0, year: "2023-24" },
  { name: "NTPC",           logo: "NT",  color: "#1a5276", role: "Executive Trainee",    sector: "Core",       type: "placement",  branches: ["EEE","Mechanical","Civil"],                        cgpa: 6.5, tenth: 65, twelfth: 60, backlogs: 0, year: "2022-23" },
  { name: "Samsung R&D",    logo: "SAM", color: "#1428a0", role: "Software Intern",      sector: "Product",    type: "internship", branches: ["CSE","IT","ECE"],                                  cgpa: 7.0, tenth: 65, twelfth: 65, backlogs: 0, year: "2023-24" },
  { name: "ICICI Bank",     logo: "IC",  color: "#b02a4c", role: "IT Intern",            sector: "Finance",    type: "internship", branches: ["CSE","IT","ECE"],                                  cgpa: 6.5, tenth: 65, twelfth: 60, backlogs: 0, year: "2023-24" },
  { name: "Accenture",      logo: "AC",  color: "#a100ff", role: "Associate",            sector: "IT",         type: "placement",  branches: ["CSE","IT","ECE","Mechanical"],                     cgpa: 5.5, tenth: 55, twelfth: 55, backlogs: 0, year: "2021-22" },
  { name: "Capgemini",      logo: "CAP", color: "#0070ad", role: "Analyst",              sector: "IT",         type: "placement",  branches: ["CSE","IT","ECE","EEE","Mechanical"],               cgpa: 5.5, tenth: 55, twelfth: 55, backlogs: 1, year: "2022-23" },
  { name: "Tata Steel",     logo: "TS",  color: "#004f9f", role: "Engineering Intern",   sector: "Core",       type: "internship", branches: ["Mechanical","Civil","EEE"],                        cgpa: 6.0, tenth: 60, twelfth: 60, backlogs: 1, year: "2023-24" },
];

const stats = {
  yearData: [{ y: '2019–20', n: 198 }, { y: '2020–21', n: 212 }, { y: '2021–22', n: 245 }, { y: '2022–23', n: 289 }, { y: '2023–24', n: 312 }],
  sectors: [{ s: 'IT / Software', n: 142, c: '#4db8ff' }, { s: 'Product', n: 62, c: '#00c9a7' }, { s: 'Core Engineering', n: 54, c: '#ff9966' }, { s: 'Finance', n: 28, c: '#ffd166' }, { s: 'Consulting', n: 26, c: '#c084fc' }],
  branches: [{ b: 'CSE', v: 14.2, c: '#f4a623' }, { b: 'IT', v: 12.1, c: '#f4a623' }, { b: 'ECE', v: 8.4, c: '#f4a623' }, { b: 'EEE', v: 6.5, c: '#f4a623' }, { b: 'Mech', v: 5.8, c: '#f4a623' }, { b: 'Civil', v: 4.9, c: '#f4a623' }]
};

const seed = async () => {
  try {
    await mongoose.connect(process.env.mongo_uri);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Company.deleteMany({});
    await Stat.deleteMany({});
    console.log('🗑️  Cleared existing collections');

    await Company.insertMany(companies);
    await Stat.create(stats);
    console.log(`🌱 Seeded data successfully`);

    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error.message);
    process.exit(1);
  }
};

seed();
