export const companies = [
  { name: "Microsoft", logo: "MS", color: "#0078d4", role: "Software Engineer", sector: "Product", type: "placement", branches: ["CSE", "IT"], cgpa: 7.5, tenth: 75, twelfth: 70, backlogs: 0, package: "42 LPA", year: "2023-24" },
  { name: "Google", logo: "G", color: "#34a853", role: "SWE L3", sector: "Product", type: "placement", branches: ["CSE", "IT"], cgpa: 8.0, tenth: 80, twelfth: 75, backlogs: 0, package: "38 LPA", year: "2023-24" },
  { name: "Amazon", logo: "AMZ", color: "#ff9900", role: "SDE-1", sector: "Product", type: "placement", branches: ["CSE", "IT", "ECE"], cgpa: 7.0, tenth: 70, twelfth: 65, backlogs: 0, package: "32 LPA", year: "2023-24" },
  { name: "Goldman Sachs", logo: "GS", color: "#00a3b4", role: "Analyst", sector: "Finance", type: "placement", branches: ["CSE", "IT"], cgpa: 7.5, tenth: 75, twelfth: 70, backlogs: 0, package: "18 LPA", year: "2023-24" },
  { name: "Flipkart", logo: "FL", color: "#2874f0", role: "SDE Intern", sector: "Product", type: "internship", branches: ["CSE", "IT"], cgpa: 7.5, tenth: 75, twelfth: 70, backlogs: 0, package: "₹70k/mo", year: "2023-24" },
  { name: "Adobe", logo: "AD", color: "#ff0000", role: "MTS Intern", sector: "Product", type: "internship", branches: ["CSE", "IT"], cgpa: 7.5, tenth: 70, twelfth: 70, backlogs: 0, package: "₹60k/mo", year: "2023-24" },
  { name: "Deloitte", logo: "DE", color: "#86bc25", role: "Business Analyst", sector: "Consulting", type: "placement", branches: ["CSE", "IT", "ECE"], cgpa: 6.5, tenth: 65, twelfth: 60, backlogs: 0, package: "7.5 LPA", year: "2023-24" },
  { name: "KPMG", logo: "KP", color: "#00338d", role: "Technology Consultant", sector: "Consulting", type: "placement", branches: ["CSE", "IT", "ECE"], cgpa: 6.0, tenth: 60, twelfth: 60, backlogs: 0, package: "8 LPA", year: "2022-23" },
  { name: "TCS", logo: "TCS", color: "#003087", role: "Associate SE", sector: "IT", type: "placement", branches: ["CSE", "IT", "ECE", "EEE", "Mechanical", "Civil"], cgpa: 5.5, tenth: 60, twelfth: 55, backlogs: 0, package: "3.6 LPA", year: "2023-24" },
  { name: "Infosys", logo: "IN", color: "#007cc3", role: "Systems Engineer", sector: "IT", type: "placement", branches: ["CSE", "IT", "ECE", "EEE"], cgpa: 6.0, tenth: 60, twelfth: 60, backlogs: 0, package: "4.5 LPA", year: "2023-24" },
  { name: "Wipro", logo: "WI", color: "#341c6b", role: "Project Engineer", sector: "IT", type: "placement", branches: ["CSE", "IT", "ECE", "EEE"], cgpa: 5.5, tenth: 55, twelfth: 55, backlogs: 0, package: "3.5 LPA", year: "2022-23" },
  { name: "L&T Technology", logo: "LT", color: "#e87722", role: "Graduate Engineer", sector: "Core", type: "placement", branches: ["Mechanical", "Civil", "EEE", "ECE"], cgpa: 6.5, tenth: 65, twelfth: 60, backlogs: 0, package: "5.5 LPA", year: "2023-24" },
  { name: "NTPC", logo: "NT", color: "#1a5276", role: "Executive Trainee", sector: "Core", type: "placement", branches: ["EEE", "Mechanical", "Civil"], cgpa: 6.5, tenth: 65, twelfth: 60, backlogs: 0, package: "6.5 LPA", year: "2022-23" },
  { name: "Samsung R&D", logo: "SAM", color: "#1428a0", role: "Software Intern", sector: "Product", type: "internship", branches: ["CSE", "IT", "ECE"], cgpa: 7.0, tenth: 65, twelfth: 65, backlogs: 0, package: "₹40k/mo", year: "2023-24" },
  { name: "ICICI Bank", logo: "IC", color: "#b02a4c", role: "IT Intern", sector: "Finance", type: "internship", branches: ["CSE", "IT", "ECE"], cgpa: 6.5, tenth: 65, twelfth: 60, backlogs: 0, package: "₹25k/mo", year: "2023-24" },
  { name: "Accenture", logo: "AC", color: "#a100ff", role: "Associate", sector: "IT", type: "placement", branches: ["CSE", "IT", "ECE", "Mechanical"], cgpa: 5.5, tenth: 55, twelfth: 55, backlogs: 0, package: "4.5 LPA", year: "2021-22" },
  { name: "Capgemini", logo: "CAP", color: "#0070ad", role: "Analyst", sector: "IT", type: "placement", branches: ["CSE", "IT", "ECE", "EEE", "Mechanical"], cgpa: 5.5, tenth: 55, twelfth: 55, backlogs: 1, package: "3.8 LPA", year: "2022-23" },
  { name: "Tata Steel", logo: "TS", color: "#004f9f", role: "Engineering Intern", sector: "Core", type: "internship", branches: ["Mechanical", "Civil", "EEE"], cgpa: 6.0, tenth: 60, twelfth: 60, backlogs: 1, package: "₹18k/mo", year: "2023-24" },
];

export const eligData = {
  engineering: {
    branches: ["Computer Science (CSE)", "Information Technology (IT)", "Electronics & Communication (ECE)", "Mechanical Engineering", "Civil Engineering", "Electrical Engineering (EEE)"],
    keys: { "Computer Science (CSE)": "CSE", "Information Technology (IT)": "IT", "Electronics & Communication (ECE)": "ECE", "Mechanical Engineering": "Mechanical", "Civil Engineering": "Civil", "Electrical Engineering (EEE)": "EEE" },
  },
  mba: {
    branches: ["Finance", "Marketing", "Human Resources", "Operations", "Business Analytics", "Information Systems"],
    keys: { "Finance": "Finance", "Marketing": "Marketing", "Human Resources": "HR", "Operations": "Operations", "Business Analytics": "Analytics", "Information Systems": "IT" },
  },
  degree: {
    branches: ["BCA (Computer Applications)", "BBA (Business Admin)", "B.Sc Computer Science", "B.Sc Mathematics", "B.Com", "B.Sc Statistics"],
    keys: { "BCA (Computer Applications)": "BCA", "BBA (Business Admin)": "BBA", "B.Sc Computer Science": "BSc CS", "B.Sc Mathematics": "BSc Math", "B.Com": "BCom", "B.Sc Statistics": "BSc Stats" },
  },
  diploma: {
    branches: ["Diploma – Computer Engineering", "Diploma – Electronics", "Diploma – Mechanical", "Diploma – Civil", "Diploma – Electrical", "Diploma – IT"],
    keys: { "Diploma – Computer Engineering": "Comp", "Diploma – Electronics": "Electronics", "Diploma – Mechanical": "Mechanical", "Diploma – Civil": "Civil", "Diploma – Electrical": "Electrical", "Diploma – IT": "IT" },
  }
};
