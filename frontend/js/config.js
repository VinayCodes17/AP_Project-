export const API_URL = 'http://localhost:5000/api';

export const ELIG_DATA = {
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
