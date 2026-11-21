// ============================================================================
// DEDICATED TECHNICAL INTERVIEW PREPARATION PLATFORM
// Dual-Answer Architecture: Quick Summary + Senior Engineer Depth,
// Practical Scenarios, Technical Reasoning, Follow-Up Questions & Interactive Quiz.
// ============================================================================

window.INTERVIEW_DATA = {
  questions: [
    {
      id: "iq-01",
      category: "Azure Infrastructure",
      level: "Intermediate",
      question: "What is the operational difference between Stopping a VM from the guest OS versus Stopping a VM from the Azure Portal?",
      simpleAnswer: "Stopping from the OS shuts down Windows/Linux but leaves the VM in a 'Stopped (Allocated)' state, meaning Azure continues to bill for compute CPU and memory. Stopping from the Azure Portal puts the VM into 'Stopped (Deallocated)', which releases the compute hardware and stops all compute charges.",
      seniorAnswer: "When an engineer initiates a shutdown inside the guest OS, the hypervisor detects the power-off signal but retains the hardware reservation on the physical host cluster; the VM status shows 'Stopped' and compute billing continues. In contrast, stopping the VM via the Azure Portal, Azure CLI (az vm stop/deallocate), or PowerShell (Stop-AzVM) triggers a complete deallocation: compute resources are released back to the Azure fabric pool, compute charges immediately drop to zero, and any dynamic public/private IP addresses are released unless explicitly configured as Static. Only managed disk storage and attached IP reservation charges continue during deallocation.",
      technicalReasoning: "Understanding compute allocation states is essential for both cloud cost management and high-availability operations. In production, automated runbooks should always execute deallocation for non-production environments to avoid unexpected monthly compute invoices.",
      scenario: "During an off-hours cost reduction initiative, non-production VMs were shut down by developers using Windows Start Menu > Shut Down, but the monthly bill remained unchanged. As Azure Admin, explain what happened and how you fixed it.",
      followUps: [
        "What happens to the dynamic private IP address when a VM is deallocated?",
        "How can you ensure a VM keeps its IP address even after deallocation?",
        "How do you schedule automatic start/deallocate using Azure Automation Runbooks?"
      ]
    },
    {
      id: "iq-02",
      category: "Identity & Access Management",
      level: "Senior",
      question: "How do Azure RBAC roles differ from Microsoft Entra ID roles, and can a Global Administrator automatically manage Azure Virtual Machines?",
      simpleAnswer: "Microsoft Entra ID roles govern directory-level objects (users, groups, domains, licenses), while Azure RBAC roles govern Azure subscription resources (VMs, storage, virtual networks). A Global Administrator does NOT automatically have access to Azure VMs or subscription resources unless they explicitly elevate their access in the Entra ID portal.",
      seniorAnswer: "Entra ID roles (such as Global Administrator, User Administrator, and Privileged Role Administrator) operate at the tenant scope to control identity and SaaS services. Azure RBAC roles (Owner, Contributor, Reader, and custom roles) operate across Management Groups, Subscriptions, Resource Groups, and individual resources. By default, Azure enforces a strict separation of concerns between directory administration and resource management. A Global Administrator cannot read or edit Azure resources until they turn on 'Access management for Azure resources' in Microsoft Entra ID properties. Doing so temporarily assigns the user the 'User Access Administrator' role at the root management group (/), enabling them to assign themselves or others RBAC roles on subscriptions.",
      technicalReasoning: "This separation of control prevents a compromised directory administrator account from automatically obtaining carte-blanche control over mission-critical production cloud infrastructure and data stores.",
      scenario: "A Global Administrator joins an urgent Sev 1 incident bridge to reboot a payroll VM but receives an 'Access Denied' error in the Azure Portal. Explain why and how they should properly obtain access.",
      followUps: [
        "What role is granted at root management group when a Global Admin elevates access?",
        "How does Privileged Identity Management (PIM) govern both Entra roles and Azure RBAC?",
        "Why is assigning Owner at the subscription level considered a security risk?"
      ]
    },
    {
      id: "iq-03",
      category: "Azure Networking",
      level: "Intermediate",
      question: "How does Azure evaluate Network Security Group (NSG) rules when an NSG is associated with both a Subnet and a Network Interface (NIC)?",
      simpleAnswer: "For inbound traffic, Azure evaluates the Subnet NSG first, and if allowed, it then evaluates the NIC NSG. For outbound traffic, the reverse occurs: NIC NSG is evaluated first, followed by the Subnet NSG. Traffic must be allowed at BOTH levels to pass.",
      seniorAnswer: "NSG rule evaluation follows a deterministic two-tier hierarchy. For INBOUND traffic entering a VM: 1) Packets arrive at the subnet boundary and are filtered by the Subnet NSG according to rule priority (lowest number 100 evaluated first). If a match denies traffic, it is dropped immediately and never reaches the NIC. 2) If allowed by the Subnet NSG, packets reach the VM NIC and are filtered by the NIC NSG. Only if allowed by BOTH NSGs does traffic enter the OS. For OUTBOUND traffic leaving a VM, the order reverses: NIC NSG filters first, followed by Subnet NSG. In both directions, a Deny rule at either level terminates processing immediately.",
      technicalReasoning: "Understanding two-tier NSG evaluation is fundamental for diagnosing false-positive network blocks. A common production mistake is adding an Allow rule on the NIC while the Subnet NSG still blocks the traffic with default rules.",
      scenario: "You configure an Inbound rule on a VM NIC allowing TCP port 1433 for SQL Database traffic, but external applications still cannot connect. What is the most likely cause?",
      followUps: [
        "What tool in Azure Network Watcher allows you to verify which NSG rule is dropping a packet?",
        "What are the default NSG rules and can they be deleted?",
        "What is the priority range for custom NSG rules in Azure?"
      ]
    },
    {
      id: "iq-04",
      category: "Identity & Access Management",
      level: "Senior",
      question: "How do you systematically troubleshoot a user who is being blocked by a Conditional Access policy with Error Code 53003?",
      simpleAnswer: "I open the Microsoft Entra admin center, go to Identity > Monitoring & health > Sign-in logs, find the failed sign-in event, and open the 'Conditional Access' tab. This shows every policy evaluated and highlights the failing policy along with the specific control (e.g., compliant device or trusted location) that blocked the user.",
      seniorAnswer: "Error 53003 represents a deliberate block by the Conditional Access policy engine. My systematic triage steps are: 1) Access Entra ID Sign-in logs and filter by the user's User Principal Name (UPN) and date/time of failure. 2) Open the failed record and review the 'Basic info' tab to inspect client app, IP address, operating system, and browser. 3) Switch to the 'Conditional Access' tab, which categorizes policies into 'Success', 'Failure', and 'Not Applied'. 4) Click on the failing policy to review its conditions (User, Cloud App, Location, Device Platform) and Grant Controls. 5) Determine whether the block was due to an unmanaged personal device, untrusted public IP, or missing MFA requirement. 6) Use the 'What If' diagnostic tool in Entra ID to simulate the user login with corrected parameters before advising the user or modifying policy exclusions.",
      technicalReasoning: "Never disable a Conditional Access policy to troubleshoot an individual user. Always isolate the specific failing grant control and address the compliance gap or add a temporary, time-bound group exclusion with manager approval.",
      scenario: "An executive traveling internationally is blocked from checking email on their corporate iPhone while at an airport hotel. How do you identify the cause without compromising company security?",
      followUps: [
        "What is 'Report-Only' mode in Conditional Access and when should it be used?",
        "Why is it critical to exclude Break-Glass accounts from Conditional Access?",
        "How does Conditional Access integrate with Microsoft Intune compliance states?"
      ]
    },
    {
      id: "iq-05",
      category: "ITSM & Production Operations",
      level: "Senior",
      question: "Describe your end-to-end response process when a Sev 1 incident occurs on a business-critical cloud application like Payroll.",
      simpleAnswer: "My priority is rapid service restoration over root cause analysis. I acknowledge the incident in the ITSM tool to meet SLA, spin up a Major Incident bridge on Teams, notify stakeholders, check Azure platform health and recent change logs, coordinate triage with L3 specialists, implement service restoration (such as rollback or scaling), validate with users, and lead the post-incident RCA.",
      seniorAnswer: "During a Sev 1 production event, I follow a rigorous ITIL Major Incident framework: 1) Response & SLA: Acknowledge the ticket in Microsoft Dynamics 365 / ServiceNow immediately to halt the Response SLA clock. 2) Incident Commander & Bridge: Initiate the emergency Major Incident bridge on Teams and establish technical leadership; assign roles (infra, app, database, comms). 3) Stakeholder Communication: Send an Initial Incident Notification within 15 minutes detailing business impact, affected services, and bridge details. 4) Triage & Telemetry: Check Azure Service Health / Resource Health to eliminate regional platform outages. Check Azure Activity Logs for changes implemented during the last 4 hours. Query Log Analytics and Application Insights for exception spikes. 5) Mitigation: Prioritize restoration (e.g., scale out App Service, failover replica, recycle hung WebJob, rollback last change). 6) Validation: Confirm business functionality with application owners. 7) Closure & RCA: Send Resolution Notice, document timelines, and organize a blameless Post-Incident Review within 48 hours to publish a comprehensive RCA.",
      technicalReasoning: "In Sev 1 outages, downtime equals direct financial loss. Production operations engineers must maintain calm command, maintain regular 30-minute communication cadences, and avoid speculative debugging on live production systems.",
      scenario: "At 8:00 AM on month-end payroll processing day, the automated calculation batch fails due to an out-of-memory exception in Azure WebJobs. Walk through your actions.",
      followUps: [
        "What is the difference between Response SLA and Resolution SLA?",
        "How do you handle conflicting opinions between database and application teams on a bridge call?",
        "What key sections must be included in an enterprise Root Cause Analysis (RCA) document?"
      ]
    },
    {
      id: "iq-06",
      category: "Microsoft 365 & Messaging",
      level: "Intermediate",
      question: "What is the difference between Full Access, Send As, and Send on Behalf permissions in Exchange Online?",
      simpleAnswer: "Full Access lets you open and view the mailbox contents but does not let you send emails. Send As lets you send emails that appear directly from the mailbox address. Send on Behalf lets you send emails where the recipient sees 'User sent on behalf of Mailbox'.",
      seniorAnswer: "In Exchange Online: 1) Full Access is a mailbox folder-level permission that allows a delegate to add the mailbox to their Outlook profile via Automapping, read emails, create folders, and manage calendar appointments. However, Full Access does not grant permission to send emails from that mailbox. 2) Send As allows the delegate to send messages where the 'From' header displays ONLY the mailbox address; the recipient has no visual indication that a delegate sent the email. 3) Send on Behalf allows the delegate to send messages where the recipient's email client displays 'Delegate on behalf of Mailbox'. Full Access and Send As are commonly paired for Shared Mailboxes (e.g., payrollsupport@company.com), while Send on Behalf is typical for executive administrative assistants.",
      technicalReasoning: "Understanding delegate permissions is critical for both compliance and security auditing. Send As permissions must be restricted and regularly audited to prevent impersonation risks.",
      scenario: "A user is granted Full Access to a Shared Mailbox via PowerShell but complains they cannot send outbound emails from it. What command did the administrator forget to run?",
      followUps: [
        "What PowerShell cmdlet assigns Send As permissions in Exchange Online?",
        "Do Shared Mailboxes require a paid Microsoft 365 license?",
        "What is Automapping and how can you disable it when granting Full Access?"
      ]
    },
    {
      id: "iq-07",
      category: "Automation & Scripting",
      level: "Intermediate",
      question: "Why has Microsoft deprecated the MSOnline and AzureAD PowerShell modules, and what advantages does Microsoft Graph PowerShell provide?",
      simpleAnswer: "Microsoft deprecated MSOnline and AzureAD because they relied on older, legacy Azure AD Graph APIs. Microsoft Graph PowerShell connects to modern Microsoft Graph REST APIs, supports OAuth 2.0 modern authentication, least-privilege permission scopes, cross-platform PowerShell 7, and receives all new cloud feature updates.",
      seniorAnswer: "The retirement of Azure AD Graph API drove the migration to Microsoft Graph PowerShell. Key technical advantages include: 1) Unified API: A single endpoint (graph.microsoft.com) covers Entra ID, Intune, SharePoint, Teams, and Exchange rather than disparate legacy endpoints. 2) Modern Security: Supports certificate-based authentication, Managed Identities, and OAuth 2.0 without legacy basic authentication risks. 3) Granular Scopes: When running Connect-MgGraph, administrators declare exact least-privilege scopes (e.g., -Scopes 'User.Read.All') rather than granting blanket administrative access. 4) Cross-Platform: Fully compatible with PowerShell 7 on Windows, Linux, and macOS. 5) Performance: Supports advanced OData query parameters ($filter, $select, $expand) and automated client-side pagination.",
      technicalReasoning: "Enterprise administrators must modernize automation runbooks to ensure scripts do not break upon legacy endpoint decommissioning and to maintain alignment with Microsoft security baselines.",
      scenario: "You are tasked with auditing all users in a 5,000-seat tenant who do not have MFA registered. Write the logic or describe the cmdlets you would use with Microsoft Graph.",
      followUps: [
        "What cmdlet replaces Get-AzureADUser in Microsoft Graph?",
        "How do you authenticate Microsoft Graph inside an Azure Automation Runbook without credentials?",
        "What is the function of the -ConsistencyLevel eventual parameter in Graph queries?"
      ]
    }
  ],

  // Interactive 10-Question Knowledge Assessment Quiz
  quiz: [
    {
      id: "qz-01",
      question: "Which Azure Virtual Machine power state indicates that compute charges have completely stopped?",
      options: [
        "Stopped",
        "Stopped (Deallocated)",
        "Paused",
        "Hibernated"
      ],
      correctIndex: 1,
      explanation: "Only 'Stopped (Deallocated)' releases the compute hardware back to the Azure fabric pool, which stops compute billing. The 'Stopped' state means the OS was shut down internally but the physical hypervisor allocation remains billed."
    },
    {
      id: "qz-02",
      question: "When an NSG is attached to both a Subnet and a VM Network Interface (NIC), how is INBOUND traffic evaluated?",
      options: [
        "NIC NSG is evaluated first, then Subnet NSG",
        "Subnet NSG is evaluated first, then NIC NSG",
        "Only the NSG with the lowest rule priority number is evaluated",
        "Azure randomly balances rule evaluation between Subnet and NIC"
      ],
      correctIndex: 1,
      explanation: "For inbound traffic, packets hit the Subnet NSG first. If allowed, they proceed to the NIC NSG. Both must permit the traffic for the packet to enter the VM."
    },
    {
      id: "qz-03",
      question: "What role must be assigned in Microsoft Entra ID to temporarily elevate an administrator's access to Azure Subscriptions?",
      options: [
        "Global Administrator",
        "User Access Administrator at root management group (/)",
        "Owner on the tenant root",
        "Privileged Authentication Administrator"
      ],
      correctIndex: 1,
      explanation: "When a Global Admin enables 'Access management for Azure resources', Azure assigns them the 'User Access Administrator' role at the root management group (/), allowing them to grant RBAC roles across subscriptions."
    },
    {
      id: "qz-04",
      question: "What Entra ID Sign-in Error Code indicates that the user was blocked by a Conditional Access policy?",
      options: [
        "50126",
        "50074",
        "53003",
        "50053"
      ],
      correctIndex: 2,
      explanation: "Error Code 53003 signifies that access has been blocked by organization security policies configured in Conditional Access."
    },
    {
      id: "qz-05",
      question: "Under standard Microsoft 365 licensing rules, does a Shared Mailbox require a paid license?",
      options: [
        "Yes, all mailboxes require an Exchange Online Plan 1 or Plan 2 license",
        "No, as long as its mailbox size remains under 50 GB and does not require an archive",
        "Yes, but only if more than 5 users access it",
        "No, shared mailboxes have unlimited free storage"
      ],
      correctIndex: 1,
      explanation: "Shared Mailboxes can store up to 50 GB of data without any assigned license. If the mailbox exceeds 50 GB or requires Litigation Hold or In-Place Archiving, an Exchange Online Plan 2 license is required."
    },
    {
      id: "qz-06",
      question: "Which Azure service allows you to test whether an NSG rule is dropping a specific packet between a source and destination IP/port?",
      options: [
        "Azure Monitor Alerts",
        "Network Watcher IP Flow Verify",
        "Traffic Manager",
        "Application Gateway"
      ],
      correctIndex: 1,
      explanation: "Network Watcher IP Flow Verify checks whether a packet is allowed or denied based on 5-tuple packet information, reporting the exact NSG rule responsible for the action."
    },
    {
      id: "qz-07",
      question: "What is the primary objective of ITIL Incident Management during a Sev 1 production outage?",
      options: [
        "Find the permanent root cause and rewrite application code",
        "Restore normal service operation as quickly as possible within SLA",
        "Discipline the engineer who deployed the faulty change",
        "Refuse all external communication until the system is fixed"
      ],
      correctIndex: 1,
      explanation: "The core principle of Incident Management is rapid service restoration. Root cause analysis is the responsibility of Problem Management after normal operations are resumed."
    },
    {
      id: "qz-08",
      question: "Which Azure Storage redundancy option replicates data synchronously across three Azure availability zones in the primary region?",
      options: [
        "Locally Redundant Storage (LRS)",
        "Zone-Redundant Storage (ZRS)",
        "Geo-Redundant Storage (GRS)",
        "Read-Access Geo-Redundant Storage (RA-GRS)"
      ],
      correctIndex: 1,
      explanation: "Zone-Redundant Storage (ZRS) replicates data synchronously across three separate availability zones within the primary region, safeguarding against datacenter-level failures."
    },
    {
      id: "qz-09",
      question: "In Microsoft Graph PowerShell, which cmdlet is used to terminate all active user web sessions and refresh tokens?",
      options: [
        "Reset-MgUserPassword",
        "Disconnect-MgUserSession",
        "Revoke-MgUserSignInSession",
        "Stop-MgUserLogin"
      ],
      correctIndex: 2,
      explanation: "Revoke-MgUserSignInSession immediately invalidates all issued refresh tokens, forcing the user to re-authenticate across all browser sessions and connected apps."
    },
    {
      id: "qz-010",
      question: "What is the primary benefit of deploying Conditional Access policies in 'Report-Only' mode first?",
      options: [
        "It automatically approves all MFA challenges",
        "It evaluates policy results in sign-in logs without impacting or blocking active users",
        "It eliminates the need for emergency break-glass accounts",
        "It disables Microsoft Entra ID Protection"
      ],
      correctIndex: 1,
      explanation: "'Report-Only' mode allows administrators to inspect how policies would affect users by reviewing entries in Entra ID sign-in logs, preventing accidental production lockouts before enforcing live policies."
    }
  ]
};
