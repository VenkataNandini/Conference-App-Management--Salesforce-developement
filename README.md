# 🎤 Conference App Management System

A custom Salesforce application built using the **SFDX framework** to streamline the management of conferences, speakers, and session scheduling. This project demonstrates advanced use of LWC, Apex, and Salesforce Data Modeling.

---

## 🛠 Project Features

### 1. Session & Speaker Management
- Designed a data model to handle **Many-to-Many relationships** between Speakers and Sessions.
- Automated conflict detection to ensure a speaker isn't booked for two sessions at the same time.

### 2. Lightning Web Components (LWC)
- Developed modern UI components to display session details and speaker bios dynamically.
- Implemented **LWC Event Handling** and **Wire Service** to fetch real-time data from Salesforce.

### 3. Apex Backend Logic
- Created **Apex Triggers** and **Classes** to handle complex business logic, such as validation rules that cannot be achieved declaratively.
- Optimized SOQL queries to ensure the application stays within Salesforce governor limits.

### 4. SFDX Integration
- Followed standard **Source-Driven Development** using SFDX.
- Managed metadata deployments using `manifest/package.xml`.

---

## 📂 Repository Structure
- **force-app/main/default:** Contains the core metadata (LWC, Apex Classes, Triggers, and Objects).
- **manifest:** Includes the `package.xml` for deployment.
- **scripts:** Contains Apex scripts used for data setup or testing.

---

## 🚀 Technical Stack
- **Frontend:** Lightning Web Components (LWC), HTML, CSS.
- **Backend:** Apex (Triggers, Controllers).
- **Automation:** Flow Builder, Validation Rules.
- **Tools:** VS Code, Salesforce CLI (SFDX).

---

## 🎓 Learning Outcomes
- Mastered the **Salesforce Order of Execution** and Trigger frameworks.
- Gained hands-on experience in building reactive components with **LWC**.
- Implementing best practices for source-driven development and metadata management.
