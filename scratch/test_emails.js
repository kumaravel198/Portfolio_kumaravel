const fs = require('fs');
const path = require('path');

// Resolve the path to .env file in project root
const envPath = path.join(__dirname, '../.env');

if (!fs.existsSync(envPath)) {
  console.error("Error: .env file not found at " + envPath);
  console.error("Please make sure you have created the .env file in the project root.");
  process.exit(1);
}

// Simple manual parsing of .env file
const envContent = fs.readFileSync(envPath, 'utf8');
const match = envContent.match(/VITE_WEB3FORMS_ACCESS_KEY=(.+)/);

if (!match || match[1].trim() === "YOUR_ACCESS_KEY_HERE" || match[1].trim() === "") {
  console.error("\n❌ Error: Web3Forms Access Key is not configured!");
  console.error("Please open your .env file and set VITE_WEB3FORMS_ACCESS_KEY to your actual key.");
  console.error("If you don't have a key, get a free one at https://web3forms.com/\n");
  process.exit(1);
}

const accessKey = match[1].trim().replace(/['"]/g, '');

const sampleEmails = [
  {
    name: "Sarah Jenkins (Google HR)",
    email: "sarah.jenkins@google.com",
    subject: "Google Recruitment - Software Engineering Opportunities",
    message: "Hi Kumaravel,\n\nI came across your portfolio website and was highly impressed by your projects and your dynamic Tech Ecosystem layout! We currently have open roles for Front-End Developers and Software Engineers in our Bangalore office that seem like a great match for your skillset.\n\nAre you open for a quick 15-minute introductory call sometime this week?\n\nBest regards,\nSarah Jenkins\nSenior Technical Recruiter | Google"
  },
  {
    name: "Alex Rivera (Stripe Recruiter)",
    email: "alex.rivera@stripe.com",
    subject: "React Developer Role - Stripe India",
    message: "Hey Kumaravel!\n\nI was looking through Github and found your profile. Your experience with React, Tailwind, and interactive UI animations looks stellar. We're currently growing our engineering team at Stripe India and are looking for someone with a passion for frontend interfaces.\n\nLet me know if you are open to exploring roles. I'd love to chat!\n\nCheers,\nAlex Rivera\nEngineering Recruiting | Stripe"
  },
  {
    name: "Vikram Mehta (CTO, Nebula AI)",
    email: "vikram@nebula-ai.io",
    subject: "Freelance Opportunity: React & AI Dashboard Build",
    message: "Hello Kumaravel,\n\nWe are building a custom AI analytics dashboard at Nebula AI and need an experienced frontend developer to lead the React implementation on a contract basis (approx 3 months, full-time remote).\n\nIf you have freelance availability starting next month, please let me know your hourly rates and let's hop on a call to discuss the project scope.\n\nThanks,\nVikram Mehta\nCo-Founder & CTO | Nebula AI"
  }
];

async function sendTestEmails() {
  console.log("==========================================");
  console.log("🚀 Web3Forms HR Email Test Utility");
  console.log(`🔑 Key detected: ${accessKey.slice(0, 8)}...${accessKey.slice(-8)}`);
  console.log("==========================================");

  for (let i = 0; i < sampleEmails.length; i++) {
    const item = sampleEmails[i];
    console.log(`\n[${i + 1}/${sampleEmails.length}] Sending email from "${item.name}"...`);
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: item.name,
          email: item.email,
          subject: item.subject,
          message: item.message,
          from_name: "Portfolio HR Simulator"
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        console.log(`  ✅ Success! Email routed to Web3Forms.`);
      } else {
        console.error(`  ❌ Failed: ${data.message || 'Unknown response error'}`);
      }
    } catch (err) {
      console.error(`  ❌ Error sending request: ${err.message}`);
    }
    
    // Tiny delay between sends to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1500));
  }

  console.log("\n==========================================");
  console.log("🎉 Test execution finished!");
  console.log("Check your Gmail inbox (including spam folder) for the 3 HR test emails.");
  console.log("==========================================");
}

sendTestEmails();
