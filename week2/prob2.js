const fs = require("fs");
const textbookData = [
  {
    title: "Calculus with Applications",
    edition: 2,
    authors: ["Peter D. Lax", "Maria Shea Terrell"],
    publisher: "Springer",
    requiredCourses: ["MATH101"],
    isbn: "978-1-4614-7946-8",
  },
  {
    title: "University Physics with Modern Physics",
    edition: 15,
    authors: ["Hugh D. Young", "Roger A. Freedman"],
    publisher: "Pearson",
    requiredCourses: ["PHYS101"],
    isbn: "978-1-292-31481-5",
  },
  {
    title: "Principles of Modern Chemistry",
    edition: 7,
    authors: ["David W. Oxtoby", "H. P. Gillis", "Alan Campion"],
    publisher: "Cengage Learning",
    requiredCourses: ["CHEM101"],
    isbn: "978-0-8400-4931-5",
  },
];
fs.writeFileSync("./textbook.json", JSON.stringify(textbookData));
