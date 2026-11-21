// ============================================================================
// ISSAC SODARI - PROFESSIONAL PROFILE DATA
// Verified details from Resume and Master Profile Specification
// ============================================================================

window.PROFILE_DATA = {
  personal: {
    name: "Issac Sodari",
    headline: "Azure Cloud Administrator | Cloud Operations Engineer | Microsoft Entra ID & IAM Specialist",
    email: "issacsodari8@gmail.com",
    phone: "+91-9440123070",
    location: "Hyderabad, Telangana, India",
    linkedin: "https://www.linkedin.com/in/issacsodari",
    github: "https://github.com/issacsodari",
    portfolioRepo: "https://github.com/issacsodari/portfolio",
    totalExperience: "4 Years and 8 Months",
    experiencePeriod: "Nov 2021 – Jul 2026",
    employmentStatus: "Available for Immediate Joining",
    noticePeriod: "0 Days (Zero Notice Period)",
    lastWorkingDay: "15 July 2026",
    currentCTC: "INR 4,37,000",
    expectedCTC: "As per Company Standards / Negotiable",
    careerObjective: "To develop further as an Azure Cloud Administrator, Cloud Operations Engineer, and Identity & Access Management (IAM) Specialist, leveraging deep hands-on expertise in Microsoft cloud infrastructure, Entra ID, Microsoft 365, and ITIL-driven production support to safeguard high-availability enterprise services."
  },

  summary: `Microsoft Certified Azure Administrator (AZ-104) with 4 years and 8 months of hands-on experience at Tata Consultancy Services (TCS), supporting Microsoft's enterprise cloud and a business-critical payroll application in a 24x7, SLA-driven production environment. Delivers end-to-end Azure IaaS/PaaS infrastructure operations, continuous monitoring, and L2 production support, alongside administration of Microsoft Entra ID (IAM), Microsoft 365, and Exchange Online. Proficient in ITIL service management (Incident, Problem, and Change Management) using Microsoft Dynamics 365, with proven capability in automating routine administrative operations using PowerShell, Microsoft Graph, and Azure CLI.`,

  keyHighlights: [
    { title: "Business-Critical Support", desc: "Safeguarded the 99.9% availability of Microsoft's enterprise payroll platform as an L2 engineer in round-the-clock 24x7 production operations." },
    { title: "End-to-End Cloud & Identity Scope", desc: "Spanned Azure IaaS/PaaS, Microsoft Entra ID, Microsoft 365, and Exchange Online, bridging cloud infrastructure and identity governance." },
    { title: "Incident Ownership & SLA Delivery", desc: "Drove Sev 1 and Sev 2 incidents to resolution within strict SLAs, coordinating across L3, application, database, and security teams." },
    { title: "Disaster Recovery & Resilience", desc: "Strengthened recovery readiness through scheduled backup restore tests and Azure Site Recovery (ASR) DR drills to validate RTO and RPO targets." },
    { title: "Cloud Automation & Scripting", desc: "Eliminated repetitive manual effort by scripting daily health checks and bulk identity management with PowerShell, Microsoft Graph, and Azure CLI." }
  ],

  certifications: [
    {
      id: "az-104",
      name: "Microsoft Certified: Azure Administrator Associate",
      code: "AZ-104",
      issuer: "Microsoft",
      status: "Verified / Certified",
      badgeIcon: "shield-check",
      skills: ["Azure Identities & Governance", "Storage Implementation & Management", "Azure Compute Resources (VMs)", "Virtual Networking & Peering", "Monitoring & Backup"],
      description: "Validates subject matter expertise in implementing, managing, and monitoring an organization's Microsoft Azure environment."
    },
    {
      id: "az-900",
      name: "Microsoft Certified: Azure Fundamentals",
      code: "AZ-900",
      issuer: "Microsoft",
      status: "Verified / Certified",
      badgeIcon: "cloud",
      skills: ["Cloud Concepts", "Azure Architecture & Services", "Azure Management & Governance"],
      description: "Demonstrates foundational knowledge of cloud services and how those services are provided with Microsoft Azure."
    },
    {
      id: "ai-900",
      name: "Microsoft Certified: Azure AI Fundamentals",
      code: "AI-900",
      issuer: "Microsoft",
      status: "Verified / Certified",
      badgeIcon: "cpu",
      skills: ["AI Workloads & Considerations", "Machine Learning on Azure", "Computer Vision & NLP"],
      description: "Validates foundational knowledge of machine learning (ML) and artificial intelligence (AI) concepts and related Microsoft Azure services."
    }
  ],

  education: {
    degree: "Bachelor of Technology (B.Tech)",
    field: "Electronics and Telecommunication Engineering",
    institution: "JNTUH College of Engineering Jagtial",
    affiliation: "Jawaharlal Nehru Technological University Hyderabad",
    location: "Telangana, India"
  },

  employment: [
    {
      company: "Tata Consultancy Services (TCS)",
      client: "Microsoft",
      role: "IT Analyst – Microsoft Cloud Administrator",
      period: "Nov 2021 – Jul 2026",
      duration: "4 Years and 8 Months",
      location: "Hyderabad, Telangana, India",
      model: "24x7 Rotational On-Call Enterprise Production Support",
      summary: "Supported Microsoft's enterprise cloud across two major production engagements, ensuring seamless infrastructure operations, identity governance, and high-availability application support.",
      projects: [
        {
          id: "project-1",
          name: "Microsoft Payroll Application & Azure Infrastructure Operations",
          role: "Cloud Operations & Automation Specialist",
          client: "Microsoft",
          period: "Nov 2021 – Oct 2024",
          technologies: ["Azure VMs", "Storage Accounts", "Blob Storage", "VNets", "Subnets", "NSGs", "VNet Peering", "VPN Gateway", "Azure DNS", "Private Endpoints", "Azure SQL Database", "Azure Data Factory (ADF)", "WebJobs", "Azure Monitor", "Log Analytics (KQL)", "Application Insights", "Azure Backup", "Azure Site Recovery (ASR)", "Azure Update Manager", "Dynamics 365", "PowerShell", "Azure CLI", "Bicep"],
          responsibilities: [
            "Administered Azure Virtual Machines, including proactive health checks, start/stop/restart operations, OS performance troubleshooting, and connectivity triage.",
            "Maintained Storage Accounts, Blob containers, and secure storage access controls across dev, staging, and production tiers.",
            "Configured and managed Azure Virtual Networks, subnets, Network Security Group (NSG) inbound/outbound rules, VNet peering, VPN Gateway, and Azure DNS.",
            "Configured Private Endpoints and Private DNS zones to secure communication with Azure SQL Database and payroll backend microservices.",
            "Provisioned infrastructure from Bicep templates using Azure CLI and PowerShell; managed VM OS update compliance via Azure Update Manager.",
            "Monitored Azure Backup jobs and Recovery Services Vaults, regularly tested single-file and full-VM restores, and executed Azure Site Recovery DR drills to enforce RTO and RPO targets.",
            "Investigated production alerts generated by Azure Monitor, VM Insights, Service Health, Resource Health, and Action Groups; queried Log Analytics with KQL.",
            "Troubleshot Sev 1 and Sev 2 payroll batch processing incidents by inspecting Azure Data Factory (ADF) pipeline run failures, WebJobs errors, S360 alerts, and Application Insights exceptions.",
            "Logged and managed incidents, service requests, and problem tickets end to end in Microsoft Dynamics 365 according to ITIL processes, maintaining >99.8% SLA adherence.",
            "Scripted automated daily health checks for VMs, backup jobs, and replication health using PowerShell (Get-AzVM -Status, Get-AzRecoveryServicesBackupJob, Get-AzMetric) and Azure CLI."
          ]
        },
        {
          id: "project-2",
          name: "Azure Cloud Administration, IAM & Microsoft 365 Administration",
          role: "Global Azure Cloud Administrator – L2",
          client: "Microsoft (MCAPS Trust Protection Systems)",
          period: "Nov 2024 – Jul 2026",
          technologies: ["Microsoft Entra ID", "Active Directory", "Azure RBAC", "PIM (Privileged Identity Management)", "Conditional Access", "MFA", "Access Reviews", "Entra ID Protection", "Enterprise Applications", "App Registrations", "SSO (SAML/OIDC)", "Microsoft Defender", "Microsoft 365 Admin Center", "Exchange Online", "Mail Flow Rules", "Message Trace", "Teams", "SharePoint Online", "OneDrive", "Microsoft Intune", "Service Tree", "Dynamics 365", "Microsoft Graph PowerShell"],
          responsibilities: [
            "Managed the complete identity lifecycle: provisioned and deprovisioned Entra ID user accounts, security groups, and B2B guest collaborator accounts through Joiner, Mover, and Leaver (JML) processes.",
            "Enforced least-privilege access using Azure RBAC and Entra ID built-in and custom roles; governed privileged role activations via Privileged Identity Management (PIM) and executed quarterly Access Reviews.",
            "Diagnosed and resolved authentication issues, MFA reset requests, and Conditional Access blocks using Entra ID Sign-in logs, Audit logs, and the What If diagnostic tool.",
            "Investigated risky users and risky sign-ins flagged by Microsoft Entra ID Protection and Defender for Cloud; remediated compromised credentials by revoking user sessions and enforcing password resets.",
            "Administered Microsoft 365 licenses, Exchange Online mailboxes (User, Shared, Room/Resource), and distribution groups; managed Full Access, Send As, and Send on Behalf permissions.",
            "Configured mail flow rules (transport rules), investigated delivery failures via Message Trace, and managed quarantined emails in Exchange Online Protection (EOP).",
            "Leveraged Microsoft Service Tree to map cloud services to their business owners, downstream dependencies, and infrastructure tiers to accurately route escalations and changes.",
            "Logged problem records in Microsoft Dynamics 365 for recurring authentication and mail flow incidents, authoring Root Cause Analysis (RCA) documents and runbooks.",
            "Automated bulk user offboarding, license reporting, and mailbox permission audits with Microsoft Graph PowerShell (Get-MgUser, Get-MgUserLicenseDetail, Get-MailboxPermission, Get-MessageTrace)."
          ]
        }
      ]
    }
  ]
};
