// DSA in JavaScript
// Problem 3: Detect Duplicate Applications (Medium)
// Write a function that checks if there are duplicate applications based on a combination of company + role, ignoring case sensitivity.

const applications = [
    {
      "title": "SWE I",
      "company": "Google",
      "link": "https://lucide.dev/icons/",
      "status": "Applied",
      "doa": "2025-04-12",
      "useremail": "rupesh.p21@iiits.in",
      "userid": "67f8ddd76a4ecb312b9ffeb2"
    },
    {
      "title": "SWE I",
      "company": "Google",
      "link": "https://lucide.dev/icons/",
      "status": "Interview",
      "doa": "2025-04-12",
      "useremail": "rupesh.p21@iiits.in",
      "userid": "67f8ddd76a4ecb312b9ffeb2"
    },
    {
      "title": "Backend Intern",
      "company": "Meta",
      "link": "https://meta.com/careers/",
      "status": "Rejected",
      "doa": "2025-03-28",
      "useremail": "rupesh.p21@iiits.in",
      "userid": "67f8ddd76a4ecb312b9ffeb2"
    },
    {
      "title": "Frontend Developer",
      "company": "Netflix",
      "link": "https://jobs.netflix.com/",
      "status": "In Progress",
      "doa": "2025-04-01",
      "useremail": "neha.tech21@iiits.in",
      "userid": "82f7cde56b5fda412c3ffdc4"
    },
    {
      "title": "SWE I",
      "company": "Google",
      "link": "https://careers.google.com/jobs/",
      "status": "Applied",
      "doa": "2025-04-12",
      "useremail": "neha.tech21@iiits.in",
      "userid": "82f7cde56b5fda412c3ffdc4"
    },
    {
      "title": "ML Engineer",
      "company": "OpenAI",
      "link": "https://openai.com/careers/",
      "status": "Applied",
      "doa": "2025-03-30",
      "useremail": "arjun.codes@iiits.in",
      "userid": "90bcde874a6fcb9421acebc1"
    },
    {
      "title": "SWE Intern",
      "company": "Google",
      "link": "https://google.com/internships/",
      "status": "In Progress",
      "doa": "2025-04-05",
      "useremail": "rupesh.p21@iiits.in",
      "userid": "67f8ddd76a4ecb312b9ffeb2"
    },
    {
      "title": "SWE I",
      "company": "Google",
      "link": "https://google.com/careers/",
      "status": "Rejected",
      "doa": "2025-04-12",
      "useremail": "rupesh.p21@iiits.in",
      "userid": "67f8ddd76a4ecb312b9ffeb2"
    },
    {
      "title": "Cloud Intern",
      "company": "Amazon",
      "link": "https://amazon.jobs/",
      "status": "Applied",
      "doa": "2025-04-10",
      "useremail": "arjun.codes@iiits.in",
      "userid": "90bcde874a6fcb9421acebc1"
    },
    {
      "title": "SWE I",
      "company": "Google",
      "link": "https://google.com/careers/",
      "status": "Offer",
      "doa": "2025-04-12",
      "useremail": "neha.tech21@iiits.in",
      "userid": "82f7cde56b5fda412c3ffdc4"
    }
  ]

  function findDuplicateApplications(applications) {
    // Use a Map for efficient lookups
    const seen = new Map();
    const duplicates = [];
    
    for (const app of applications) {
      const key = `${app.useremail.toLowerCase()}-${app.company.toLowerCase()}-${app.title.toLowerCase()}`;
      
      if (seen.has(key)) {
        duplicates.push(app);
      } else {
        seen.set(key, true);
      }
    }
    
    return duplicates;
  }
  
  const duplicateApps = findDuplicateApplications(applications);
  console.log(duplicateApps);
  



