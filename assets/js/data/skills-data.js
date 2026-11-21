
// ============================================================================
// TECHNICAL SKILLS LIBRARY & LEARNING HUB DATA
// Comprehensive reference across Azure Infrastructure, Monitoring, IAM,
// Microsoft 365, Automation, Networking, and ITSM.
// ============================================================================

window.SKILLS_DATA = {
  categories: [
    {
      id: "azure-infra",
      name: "Azure Infrastructure",
      code: "A",
      icon: "server",
      description: "Core compute, storage, networking, database, and governance resources powering enterprise IaaS and PaaS environments.",
      skills: [
        { id: "azure-fundamentals", name: "Azure Fundamentals", level: "Beginner", icon: "cloud" },
        { id: "azure-portal", name: "Azure Portal", level: "Beginner", icon: "layout" },
        { id: "azure-vms", name: "Azure Virtual Machines", level: "Intermediate", icon: "cpu", featured: true },
        { id: "azure-storage", name: "Azure Storage Accounts", level: "Intermediate", icon: "database", featured: true },
        { id: "azure-vnets", name: "Azure Virtual Networks", level: "Intermediate", icon: "network", featured: true },
        { id: "azure-subnets", name: "Subnets", level: "Intermediate", icon: "git-commit" },
        { id: "azure-nsgs", name: "Network Security Groups (NSGs)", level: "Intermediate", icon: "shield", featured: true },
        { id: "azure-vpn-gateway", name: "Azure VPN Gateway", level: "Advanced", icon: "lock" },
        { id: "azure-sql", name: "Azure SQL Database", level: "Intermediate", icon: "hard-drive" },
        { id: "azure-webapps", name: "Azure Web Apps & WebJobs", level: "Intermediate", icon: "globe" },
        { id: "azure-backup", name: "Azure Backup", level: "Intermediate", icon: "archive", featured: true },
        { id: "azure-rsv", name: "Recovery Services Vault", level: "Intermediate", icon: "shield-alert" },
        { id: "azure-update-mgr", name: "Azure Update Manager", level: "Intermediate", icon: "refresh-cw" },
        { id: "azure-resource-groups", name: "Azure Resource Groups", level: "Beginner", icon: "folder" },
        { id: "azure-arm-bicep", name: "ARM & Bicep Templates", level: "Advanced", icon: "code" }
      ]
    },
    {
      id: "azure-monitoring",
      name: "Azure Monitoring & Logging",
      code: "B",
      icon: "activity",
      description: "Full-stack observability, metrics, log analytics, KQL querying, and automated alerts for cloud health and SLA enforcement.",
      skills: [
        { id: "azure-monitor", name: "Azure Monitor", level: "Intermediate", icon: "activity", featured: true },
        { id: "log-analytics", name: "Log Analytics Workspace", level: "Intermediate", icon: "file-text", featured: true },
        { id: "app-insights", name: "Application Insights", level: "Intermediate", icon: "bar-chart-2" },
        { id: "diagnostic-settings", name: "Diagnostic Settings", level: "Intermediate", icon: "settings" },
        { id: "azure-metrics", name: "Platform Metrics", level: "Beginner", icon: "trending-up" },
        { id: "azure-alerts", name: "Alerts & Alert Rules", level: "Intermediate", icon: "bell", featured: true },
        { id: "action-groups", name: "Action Groups", level: "Beginner", icon: "send" },
        { id: "activity-logs", name: "Activity Logs", level: "Beginner", icon: "clock" },
        { id: "service-health", name: "Service Health", level: "Beginner", icon: "heart" },
        { id: "resource-health", name: "Resource Health", level: "Beginner", icon: "check-circle" },
        { id: "kql-fundamentals", name: "KQL Fundamentals", level: "Intermediate", icon: "terminal", featured: true }
      ]
    },
    {
      id: "iam",
      name: "Identity & Access Management (IAM)",
      code: "C",
      icon: "user-check",
      description: "Zero Trust identity governance, Microsoft Entra ID, role-based access control, MFA, Conditional Access, and threat investigation.",
      skills: [
        { id: "entra-id", name: "Microsoft Entra ID", level: "Intermediate", icon: "key", featured: true },
        { id: "active-directory", name: "Active Directory (Hybrid)", level: "Intermediate", icon: "users" },
        { id: "users-groups", name: "Users and Groups Management", level: "Beginner", icon: "user-plus" },
        { id: "rbac", name: "Azure RBAC", level: "Intermediate", icon: "shield-check", featured: true },
        { id: "mfa", name: "Multi-Factor Authentication (MFA)", level: "Intermediate", icon: "smartphone", featured: true },
        { id: "conditional-access", name: "Conditional Access Policies", level: "Advanced", icon: "sliders", featured: true },
        { id: "access-reviews", name: "Access Reviews", level: "Intermediate", icon: "eye" },
        { id: "identity-governance", name: "Identity Governance & PIM", level: "Advanced", icon: "award", featured: true },
        { id: "enterprise-apps", name: "Enterprise Applications", level: "Intermediate", icon: "grid" },
        { id: "app-registrations", name: "App Registrations & SPNs", level: "Intermediate", icon: "box" },
        { id: "sso", name: "Single Sign-On (SSO - SAML/OIDC)", level: "Intermediate", icon: "log-in" },
        { id: "signin-logs", name: "Sign-in Logs & Diagnostics", level: "Intermediate", icon: "list", featured: true },
        { id: "risky-users", name: "Risky Users & Protection", level: "Advanced", icon: "alert-triangle" },
        { id: "auth-methods", name: "Authentication Methods", level: "Intermediate", icon: "lock" }
      ]
    },
    {
      id: "m365",
      name: "Microsoft 365 & Messaging",
      code: "D",
      icon: "mail",
      description: "Administration of Exchange Online, mailboxes, mail routing, message tracing, Teams, SharePoint, and Intune mobile management.",
      skills: [
        { id: "m365-admin", name: "Microsoft 365 Admin Center", level: "Beginner", icon: "monitor" },
        { id: "exchange-online", name: "Exchange Online", level: "Intermediate", icon: "mail", featured: true },
        { id: "mailbox-admin", name: "Mailbox Administration", level: "Beginner", icon: "inbox" },
        { id: "distribution-groups", name: "Distribution Groups & Lists", level: "Beginner", icon: "users" },
        { id: "shared-mailboxes", name: "Shared Mailboxes & Permissions", level: "Intermediate", icon: "share-2" },
        { id: "mail-flow", name: "Mail Flow Rules & Message Trace", level: "Intermediate", icon: "send", featured: true },
        { id: "intune-mdm", name: "Microsoft Intune", level: "Intermediate", icon: "tablet" },
        { id: "device-management", name: "Device Management & Enrollment", level: "Intermediate", icon: "smartphone" },
        { id: "config-profiles", name: "Configuration Profiles", level: "Intermediate", icon: "file-text" },
        { id: "compliance-policies", name: "Compliance Policies", level: "Intermediate", icon: "check-square" }
      ]
    },
    {
      id: "automation",
      name: "Automation & Scripting",
      code: "E",
      icon: "terminal",
      description: "PowerShell, Microsoft Graph, and Azure CLI automation for daily operational health checks, bulk identity lifecycle, and auditing.",
      skills: [
        { id: "powershell-fundamentals", name: "PowerShell Fundamentals", level: "Beginner", icon: "terminal" },
        { id: "azure-powershell", name: "Azure PowerShell (Az Module)", level: "Intermediate", icon: "command", featured: true },
        { id: "msgraph-powershell", name: "Microsoft Graph PowerShell", level: "Intermediate", icon: "code", featured: true },
        { id: "azure-cli", name: "Azure CLI (az)", level: "Intermediate", icon: "cpu", featured: true },
        { id: "automation-scripts", name: "Automation Runbooks", level: "Intermediate", icon: "play" },
        { id: "daily-health-checks", name: "Daily Health Check Scripts", level: "Intermediate", icon: "heart", featured: true },
        { id: "user-admin-scripts", name: "User Administration Scripts", level: "Intermediate", icon: "user-check" },
        { id: "resource-monitor-scripts", name: "Resource Monitoring Scripts", level: "Intermediate", icon: "activity" }
      ]
    },
    {
      id: "networking",
      name: "Cloud Networking",
      code: "F",
      icon: "share-2",
      description: "Secure network boundaries, IP design, routing, Network Watcher diagnostics, Private Endpoints, and hybrid VPN tunnels.",
      skills: [
        { id: "ip-addressing", name: "IP Addressing & CIDR", level: "Beginner", icon: "hash" },
        { id: "dns-dhcp", name: "DNS & DHCP Fundamentals", level: "Beginner", icon: "globe" },
        { id: "tcp-ip", name: "TCP/IP & Port Protocols", level: "Beginner", icon: "zap" },
        { id: "nsg-rules", name: "NSG Security Rules & Priorities", level: "Intermediate", icon: "shield" },
        { id: "vpn-hybrid", name: "Site-to-Site & Point-to-Site VPN", level: "Advanced", icon: "lock" },
        { id: "routing-udr", name: "Azure Routing & Route Tables (UDR)", level: "Intermediate", icon: "navigation" },
        { id: "network-connectivity", name: "Network Watcher Diagnostics", level: "Intermediate", icon: "compass", featured: true },
        { id: "firewall-fundamentals", name: "Azure Firewall Fundamentals", level: "Intermediate", icon: "shield-alert" },
        { id: "vnet-peering", name: "VNet Peering (Local & Global)", level: "Intermediate", icon: "repeat", featured: true },
        { id: "private-endpoints", name: "Private Endpoints & Private DNS", level: "Advanced", icon: "shield-check", featured: true }
      ]
    },
    {
      id: "itsm",
      name: "ITSM & ITIL Operations",
      code: "G",
      icon: "check-circle",
      description: "ITIL service operations, Sev 1 / Sev 2 incident response, change review boards, problem management RCA, and Service Tree mapping.",
      skills: [
        { id: "incident-management", name: "Incident Management & Triage", level: "Intermediate", icon: "alert-circle", featured: true },
        { id: "problem-management", name: "Problem Management & RCA", level: "Intermediate", icon: "help-circle", featured: true },
        { id: "change-management", name: "Change Management & CAB", level: "Intermediate", icon: "git-pull-request" },
        { id: "service-requests", name: "Service Request Management", level: "Beginner", icon: "check-square" },
        { id: "sla-management", name: "SLA Management & Monitoring", level: "Intermediate", icon: "clock" },
        { id: "rca-documentation", name: "Root Cause Analysis (RCA)", level: "Intermediate", icon: "file-text", featured: true },
        { id: "servicenow-dynamics", name: "Microsoft Dynamics 365 / ServiceNow", level: "Intermediate", icon: "tool" },
        { id: "service-tree", name: "Service Tree & Ownership Mapping", level: "Intermediate", icon: "layers", featured: true },
        { id: "service-dependencies", name: "Service Dependency Management", level: "Intermediate", icon: "link" },
        { id: "escalation-management", name: "Escalation & Bridge Coordination", level: "Advanced", icon: "phone-call" }
      ]
    }
  ],

  // Deep-dive comprehensive learning modules for skills
  modules: {
    "azure-vms": {
      id: "azure-vms",
      title: "Azure Virtual Machines (Compute Administration)",
      category: "Azure Infrastructure",
      level: "Intermediate",
      readTime: "18 min",
      summary: "End-to-end administration of Azure IaaS Virtual Machines: provisioning, lifecycle management, performance tuning, OS troubleshooting, and disaster readiness.",
      intro: {
        what: "Azure Virtual Machines (VMs) are on-demand, scalable IaaS computing resources that give users virtualization flexibility without needing to purchase and maintain physical hardware.",
        why: "Used to host enterprise production workloads, database engines, application backends (like the Microsoft Payroll platform), and legacy applications requiring full OS-level control.",
        where: "Deployed inside Azure Virtual Network subnets, attached to OS disks, network interfaces (NICs), and protected by Network Security Groups (NSGs).",
        problemSolved: "Eliminates on-premises server lead times; allows dynamic right-sizing, automatic patch tracking, and built-in disaster recovery replication.",
        realWorld: "At TCS supporting Microsoft, managed a cluster of multi-tier Windows and Linux Azure VMs hosting payroll calculation microservices and data processing workers in a 24x7 rotation."
      },
      basics: {
        concepts: [
          "VM Sizes & Series (General Purpose D-series, Compute-optimized F-series, Memory-optimized E-series).",
          "Storage Disks: OS Disk (SSD/Premium SSD), Temporary Disk (D: drive ephemeral), Data Disks (SCSI).",
          "Network Interface (NIC): Private IP assignment (Dynamic vs Static), NSG association, Accelerated Networking.",
          "Availability Options: Single VM (99.9% with Premium SSD), Availability Sets (Fault Domains & Update Domains), Availability Zones (99.99%)."
        ],
        architecture: "Client Traffic -> Azure Load Balancer -> NSG -> NIC (Private IP) -> Azure VM (OS Disk + Data Disks) -> Diagnostic Extension -> Log Analytics Workspace.",
        components: ["Compute Instance", "Managed Disks", "Virtual Network Interface", "Azure VM Agent (WaWorkerHost / Linux OSP)", "Diagnostics Extension"]
      },
      importantConcepts: [
        "Difference between 'Stop' in OS and 'Stop (Deallocated)' in Portal: Only deallocated VMs stop incurring compute billing.",
        "VM Agent & Extensions: Required for password reset, Custom Script Extensions, Run Command, and Azure Backup integration.",
        "Serial Console: Direct text-based out-of-band console access useful when network/RDP is down.",
        "Boot Diagnostics: Captures serial console logs and OS screen capture during boot to diagnose BSOD or kernel panic.",
        "Security Best Practices: Never assign public IPs directly to production VMs. Use Azure Bastion, VPN Gateway, or Private Endpoints."
      ],
      practicalImplementation: {
        steps: [
          "1. Provision via CLI: az vm create -g rg-payroll-prod -n vm-pay-app01 --image Win2022Datacenter --size Standard_D4s_v5 --vnet-name vnet-payroll --subnet snet-app --admin-username azureadmin",
          "2. Attach managed data disk: az vm disk attach --vm-name vm-pay-app01 -g rg-payroll-prod --name disk-pay-data01 --size-gb 256 --sku Premium_LRS --new",
          "3. Enable Boot Diagnostics & System-Assigned Managed Identity for secure Azure resource access without stored credentials.",
          "4. Verify VM Agent status: Get-AzVM -ResourceGroupName rg-payroll-prod -Name vm-pay-app01 -Status",
          "5. Enable Azure Backup in Recovery Services Vault and apply a 30-day retention daily snapshot policy."
        ],
        verification: "Check VM status is 'VM running', ensure Azure Monitor Agent is communicating with Log Analytics, verify metrics display CPU and Memory, and test RDP via Azure Bastion."
      },
      productionScenarios: [
        {
          scenario: "High CPU Spike (>95%) during Month-End Payroll Batch Processing",
          investigation: "Checked Azure Monitor metrics to confirm CPU spike timeframe. Queried Log Analytics Perf table for process-level utilization. Identified payroll calculation service runaway thread.",
          resolution: "Initiated emergency scale-up to Standard_D8s_v5 during change window, restarted WebJob process, and coordinated with development team for memory leak hotfix."
        },
        {
          scenario: "VM Unresponsive & RDP Port 3389 Failing",
          investigation: "Reviewed Boot Diagnostics screenshot: OS was hung at Windows Update applying stage. Serial Console showed unresponsive service.",
          resolution: "Redeployed VM to new Azure host using 'Redeploy' button; VM booted successfully onto healthy physical hypervisor."
        }
      ],
      interviewPrep: [
        {
          q: "What is the difference between restarting a VM, stopping a VM, and redeploying a VM?",
          a: "Restarting reboots the OS on the same physical host. Stopping from the OS leaves compute allocated and billed. Stopping from the Azure Portal deallocates the VM, releasing compute resources and stopping compute charges. Redeploying migrates the VM to a completely new physical Azure hypervisor host while retaining all disks, configuration, and IP addresses, which is crucial for hypervisor-level hardware issues."
        },
        {
          q: "How do you recover a VM if RDP is blocked and the VM Agent is not responding?",
          a: "I first review Boot Diagnostics screenshot to check for BSOD or hung updates. If the VM is accessible via Serial Console, I use CMD/PowerShell in Serial Console to restart the termservice and disable local Windows firewall. If the agent is down, I use the Azure Portal 'Run Command' feature (or Azure CLI 'az vm run-command invoke') to execute a repair script. If the host is unhealthy, I execute a Redeploy."
        }
      ],
      quickRevision: [
        "Deallocated = Compute billing stops, IP address may change unless Static.",
        "Redeploy = Moves to new physical hardware, keeps disks and private IP.",
        "Serial Console = Out-of-band management tool that works even without network connectivity.",
        "Boot Diagnostics = Captures boot logs and desktop screenshot for triage.",
        "PowerShell Check: Get-AzVM -Status | Select Name, PowerState"
      ]
    },

    "azure-storage": {
      id: "azure-storage",
      title: "Azure Storage Accounts & Blob Architecture",
      category: "Azure Infrastructure",
      level: "Intermediate",
      readTime: "15 min",
      summary: "Enterprise storage management covering Blob Storage, File Shares, Access Tiers, Security (SAS, Entra ID RBAC), Private Endpoints, and lifecycle management.",
      intro: {
        what: "Azure Storage Accounts provide a massively scalable, secure, and durable cloud object store for unstructured data, file shares, disks, and message queues.",
        why: "Powers application log storage, backup archives, application artifact distribution, and secure document sharing for payroll and enterprise records.",
        where: "Configured at the Resource Group level and accessed via HTTPS endpoints (blob.core.windows.net, file.core.windows.net).",
        problemSolved: "Replaces on-prem SAN/NAS arrays; provides 99.999999999% (11 nines) of durability with LRS and 16 nines with GRS.",
        realWorld: "Managed storage accounts hosting payroll monthly tax reports and ADF pipeline landing zones, enforcing Private Endpoints and Entra ID-based access controls."
      },
      basics: {
        concepts: [
          "Services: Blob (Block blobs, Append blobs, Page blobs), Azure Files (SMB/NFS), Table, Queue.",
          "Redundancy Options: LRS (Locally Redundant - 3 copies in single datacenter), ZRS (Zone Redundant - across 3 availability zones), GRS (Geo-Redundant - secondary region), GZRS.",
          "Access Tiers: Hot (active data), Cool (infrequent access >30 days), Cold (>90 days), Archive (rare access >180 days, requires rehydration).",
          "Access Controls: Shared Key (Access Keys 1 & 2), Shared Access Signatures (SAS), Microsoft Entra ID (Storage Blob Data Contributor)."
        ],
        architecture: "Application -> Private Endpoint (Private IP) -> Storage Account Firewall (Bypass trusted MS services) -> Container / Blob -> Immutability / Soft Delete.",
        components: ["Storage Account", "Containers", "Blob Objects", "Lifecycle Management Policies", "Encryption (SSE with PMK or CMK)"]
      },
      importantConcepts: [
        "Best Practice: Disable Shared Key access in production environments and enforce Entra ID authentication for Zero Trust compliance.",
        "Private Endpoint: Restricts storage account access exclusively to private VNet IPs, cutting off public internet endpoints.",
        "Soft Delete & Versioning: Protects against accidental deletion of containers and blobs with a configurable retention window (e.g., 14 days).",
        "Lifecycle Management: Automated JSON rules to transition blobs from Hot to Cool after 30 days and to Archive after 90 days to optimize cloud spend."
      ],
      practicalImplementation: {
        steps: [
          "1. Create storage account: az storage account create -g rg-payroll-prod -n stpayrollappdata01 --sku Standard_ZRS --kind StorageV2 --allow-blob-public-access false --min-tls-version TLS1_2",
          "2. Restrict network: az storage account update -g rg-payroll-prod -n stpayrollappdata01 --default-action Deny",
          "3. Create private endpoint linking storage account to snet-data subnet with Private DNS Zone privatelink.blob.core.windows.net.",
          "4. Assign RBAC: Assign 'Storage Blob Data Reader' role to application managed identity.",
          "5. Configure Lifecycle rule to move blobs older than 60 days to Cool tier."
        ],
        verification: "Attempt access from unauthorized IP (verify 403 Forbidden), access from internal VM via private IP (verify 200 OK), and check storage metrics in Azure Monitor."
      },
      productionScenarios: [
        {
          scenario: "Application Reporting 403 Forbidden Access to Payroll Blob Container",
          investigation: "Verified storage firewall was set to 'Enabled from selected virtual networks and IP addresses'. Found application server had been redeployed with a new private IP not whitelisted on subnet service endpoints.",
          resolution: "Replaced service endpoints with a permanent Private Endpoint attached to the subnet and mapped Private DNS zone, permanently preventing IP mismatch."
        }
      ],
      interviewPrep: [
        {
          q: "What is the difference between Shared Key authentication, SAS token, and Microsoft Entra ID authentication for Azure Storage?",
          a: "Shared Key provides full administrative access to the entire storage account and cannot be easily scoped or granularly audited. A Shared Access Signature (SAS) provides delegated, time-bound access with specific permissions (read/write) to specific resources (service, account, or user delegation). Microsoft Entra ID authentication uses role-based access control (RBAC), supports MFA, integrates with Conditional Access, provides user-level audit logging, and is the Microsoft-recommended security standard."
        }
      ],
      quickRevision: [
        "Default Action Deny = Blocks all public traffic unless IP or VNet is explicitly allowed.",
        "Hot vs Cool vs Archive = Tradeoff between storage cost and retrieval fees.",
        "Rehydration = Restoring an Archive blob back to Hot or Cool before it can be read.",
        "Soft Delete = Safety net preventing instant permanent data deletion."
      ]
    },

    "entra-id": {
      id: "entra-id",
      title: "Microsoft Entra ID (Identity & Access Management)",
      category: "Identity & Access Management",
      level: "Intermediate",
      readTime: "20 min",
      summary: "Cloud identity administration: user/group lifecycle, RBAC versus Entra ID roles, Multi-Factor Authentication (MFA), Conditional Access, and security investigation.",
      intro: {
        what: "Microsoft Entra ID (formerly Azure Active Directory) is Microsoft's multi-tenant, cloud-based identity and access management service that controls authentication and authorization across Azure, Microsoft 365, and SaaS applications.",
        why: "Acts as the central security perimeter in a modern Zero Trust architecture, ensuring the right people have the right access to the right resources under verified conditions.",
        where: "Sits at the tenant root, federating identities across Azure subscriptions, Exchange Online, Teams, SharePoint, and third-party enterprise apps.",
        problemSolved: "Eliminates fragmented credentials, enables Single Sign-On (SSO), protects accounts against credential stuffing with MFA, and automates JML (Joiner, Mover, Leaver) lifecycles.",
        realWorld: "At TCS on the MCAPS Trust Protection Systems engagement, administered Entra ID for a global Microsoft business group: provisioned users, governed RBAC, managed PIM activations, and investigated risky sign-ins."
      },
      basics: {
        concepts: [
          "Tenants & Directory: Dedicated instance of Entra ID representing an organization (e.g., contoso.onmicrosoft.com).",
          "Users: Cloud-only users, Synced users (via Entra Connect), Guest users (Azure AD B2B collaboration).",
          "Groups: Security Groups (assigned or dynamic membership), Microsoft 365 Groups (collaboration with mailbox, SharePoint, Teams).",
          "Entra Roles vs Azure RBAC: Entra Roles (Global Admin, User Admin, Exchange Admin) manage directory resources. Azure RBAC (Owner, Contributor, Reader) manages Azure subscriptions and resources."
        ],
        architecture: "User Authenticates -> Microsoft Entra ID -> Evaluates Conditional Access (Signals: User, Device, Location, App, Risk) -> Controls (MFA, Compliant Device, Block) -> Access Granted to Resource.",
        components: ["Identity Store", "Authentication Engine", "Conditional Access Engine", "Identity Protection", "Enterprise App Catalog"]
      },
      importantConcepts: [
        "Least Privilege: Never grant Global Admin unless strictly required. Use scoped administrative roles (e.g., User Administrator, Helpdesk Administrator).",
        "Privileged Identity Management (PIM): Just-in-Time (JIT) role activation with time limits, justification, ticket number, and optional approval workflows.",
        "Access Reviews: Periodic automated audits sent to resource owners to verify whether guest accounts and employees still require access.",
        "Dynamic Groups: Automated membership rules using user attributes (e.g., user.department -eq 'Finance') to prevent manual provisioning drift."
      ],
      practicalImplementation: {
        steps: [
          "1. Create user via Graph PowerShell: New-MgUser -DisplayName 'Rahul Sharma' -UserPrincipalName 'rsharma@tenant.onmicrosoft.com' -MailNickname 'rsharma' -AccountEnabled -PasswordProfile $PasswordProfile",
          "2. Assign license: Set-MgUserLicense -UserId $User.Id -AddLicenses @{SkuId = $E5SkuId} -RemoveLicenses @()",
          "3. Create dynamic security group: Rule syntax (user.department -eq 'CloudOps') and bind to Azure RBAC role.",
          "4. Configure PIM for privileged roles: Set maximum activation duration to 4 hours with mandatory MFA and ticket ID.",
          "5. Audit sign-in logs: Filter by failure code (e.g., 50126 invalid password, 50074 MFA required)."
        ],
        verification: "Review user profile in Entra ID admin center, test sign-in under audit logging, verify group membership population, and validate PIM activation."
      },
      productionScenarios: [
        {
          scenario: "User Flagged as 'High Risk' in Entra ID Protection Due to Atypical Travel",
          investigation: "Checked Entra ID Sign-in logs: User signed in from Mumbai at 10:00 AM, then from Amsterdam at 11:15 AM (impossible travel). Risk detection level set to High.",
          resolution: "Immediately executed 'Revoke sessions' in Entra ID admin center, enforced self-service password reset with MFA challenge, verified with user that legitimate VPN was used, and resolved risk."
        }
      ],
      interviewPrep: [
        {
          q: "What is the key difference between Azure RBAC roles and Microsoft Entra ID roles?",
          a: "Microsoft Entra ID roles (such as Global Administrator, User Administrator, and Intune Administrator) govern directory-level objects like users, groups, licenses, domains, and enterprise applications. Azure RBAC roles (such as Owner, Contributor, Reader, and Network Contributor) govern Azure cloud resources inside subscriptions, resource groups, and management groups (like VMs, VNets, and Storage Accounts). A Global Administrator does not automatically have access to Azure subscription resources unless they elevate their access in Entra properties."
        }
      ],
      quickRevision: [
        "Joiner, Mover, Leaver (JML) = Standard identity lifecycle process.",
        "Sign-in Log Error 50126 = Invalid username or password.",
        "Sign-in Log Error 50074 = Strong Authentication (MFA) required.",
        "PIM = Just-In-Time role activation with audit trail.",
        "Graph PowerShell = Preferred modern CLI for Entra administration."
      ]
    },

    "conditional-access": {
      id: "conditional-access",
      title: "Conditional Access & Zero Trust Architecture",
      category: "Identity & Access Management",
      level: "Advanced",
      readTime: "22 min",
      summary: "Advanced policy design: Signals, Decisions, Enforcement, MFA challenges, Device compliance, and Report-Only pilot testing.",
      intro: {
        what: "Conditional Access is Microsoft Entra ID's intelligent policy engine that evaluates real-time signals to allow, block, or challenge user access with security controls like MFA or compliant devices.",
        why: "Implements the core Zero Trust principle: 'Never Trust, Always Verify'. Secures corporate applications against compromised credentials, unsecured networks, and non-compliant devices.",
        where: "Operates globally across all authentications to cloud apps (Azure Portal, M365, Teams, Salesforce, AWS, custom apps).",
        problemSolved: "Stops relying on simple passwords; prevents unauthorized logins from foreign countries, suspicious IP addresses, or unmanaged personal devices.",
        realWorld: "At Microsoft, diagnosed policy blocks using the What If tool and Sign-in logs, and maintained policies enforcing MFA and Intune device compliance."
      },
      basics: {
        concepts: [
          "Signals (Assignments): Users & Groups, Cloud Apps, Network Locations (Named/Trusted Locations), Device Platforms, Client Apps, User/Sign-in Risk.",
          "Access Controls (Grant): Block Access, Grant Access (Require MFA, Require device to be marked compliant, Require Hybrid Entra joined device).",
          "Session Controls: Use Conditional Access App Control, Sign-in frequency, Persistent browser session.",
          "Policy States: On (Enforced), Off (Disabled), Report-only (Logs policy evaluation in sign-in logs without blocking)."
        ],
        architecture: "Signals (User, Location, Device, App, Risk) -> CA Policy Evaluation Engine -> Decision (Block / Grant with MFA or Compliant Device) -> Access to Cloud App.",
        components: ["Assignments", "Conditions", "Grant Controls", "Session Controls", "Named Locations"]
      },
      importantConcepts: [
        "Report-Only Mode: Always deploy new policies in Report-only mode first to evaluate impact across sign-in logs before enabling enforcement.",
        "Emergency Break-Glass Accounts: ALWAYS exclude at least two cloud-only break-glass administrative accounts from all Conditional Access policies to prevent catastrophic tenant lockout.",
        "The 'What If' Tool: Simulates sign-in conditions for a user without changing live policy, predicting exactly which policies will trigger.",
        "Named Locations: Configuring corporate office public IP CIDR blocks as 'Trusted Locations' to streamline MFA while requiring MFA outside."
      ],
      practicalImplementation: {
        steps: [
          "1. Define Named Location: Create 'Corporate-HQ' with public egress IP ranges.",
          "2. Create CA Policy: Name 'SEC01-RequireMFA-For-All-Admins'.",
          "3. Assignments: Target directory roles (Global Admin, Privileged Role Admin, User Admin). Exclude: BreakGlass01, BreakGlass02.",
          "4. Cloud Apps: Select 'All Cloud Apps' and 'Microsoft Azure Management'.",
          "5. Grant Control: Check 'Require multifactor authentication' and 'Require device to be marked as compliant'.",
          "6. Set State to 'Report-Only' for 7 days, review Entra Sign-in logs, then switch to 'On'."
        ],
        verification: "Run the What If tool with test admin credentials; simulate logon from external IP and verify policy triggers MFA challenge."
      },
      productionScenarios: [
        {
          scenario: "Executive Blocked from Accessing Exchange Online from Home",
          investigation: "Navigated to Entra ID Sign-in logs for the user. Located the failed sign-in event (Failure code 53003). Expanded 'Conditional Access' tab and found policy 'Block-Unmanaged-Devices' failed because device was unmanaged.",
          resolution: "Walked user through enrolling home laptop into Microsoft Intune Company Portal; once compliant, access was granted automatically."
        }
      ],
      interviewPrep: [
        {
          q: "How do you investigate when a user reports they are being blocked by a Conditional Access policy?",
          a: "I open the Microsoft Entra admin center and navigate to Identity > Monitoring & health > Sign-in logs. I locate the specific failed sign-in for the user and expand the 'Conditional Access' tab. This shows every policy evaluated during that sign-in attempt, indicating whether each policy Resulted in 'Success', 'Failure', or 'Not Applied'. Clicking on the failing policy reveals which specific grant control (e.g., Require Compliant Device or Require MFA) caused the block. I can also use the 'What If' tool to simulate the scenario."
        }
      ],
      quickRevision: [
        "Always exclude Break-Glass accounts to prevent lockout.",
        "Report-Only mode enables non-disruptive policy validation.",
        "Error 53003 = Blocked by Conditional Access.",
        "What If tool = Risk-free policy simulator in Entra ID."
      ]
    },

    "azure-monitor": {
      id: "azure-monitor",
      title: "Azure Monitor, Log Analytics (KQL) & Observability",
      category: "Azure Monitoring & Logging",
      level: "Intermediate",
      readTime: "18 min",
      summary: "Enterprise observability: metrics collection, diagnostic logs, Kusto Query Language (KQL), alert rule authoring, and Action Group routing.",
      intro: {
        what: "Azure Monitor is a unified observability engine that collects, analyzes, and acts on telemetry from cloud and on-premises environments across metrics and logs.",
        why: "Ensures mission-critical enterprise systems maintain high availability, provides proactive alerting before outages occur, and powers root cause analysis.",
        where: "Spans across all Azure services, guest OS virtual machines (via Azure Monitor Agent), application code (Application Insights), and network traffic.",
        problemSolved: "Consolidates siloed monitoring tools into one central repository; eliminates blind spots across infrastructure and application layers.",
        realWorld: "At TCS supporting Microsoft's payroll platform, used Azure Monitor and Log Analytics daily to query system health, monitor ADF pipeline runs, and investigate Sev 1 alerts."
      },
      basics: {
        concepts: [
          "Metrics: Numerical values describing some aspect of a system at a particular point in time (lightweight, real-time, 93-day retention).",
          "Logs: Structured records with different types of data organized into tables (Heartbeat, Perf, Syslog, Event, AzureActivity) in Log Analytics Workspace.",
          "Alert Rules: Monitor data and trigger when a condition is met (Metric alerts, Log search alerts, Activity log alerts).",
          "Action Groups: Collections of notification preferences (Email, SMS, Push, ITSM webhook) invoked when an alert fires."
        ],
        architecture: "Sources (VMs, DBs, Apps, Activity) -> Diagnostic Settings -> Log Analytics Workspace / Metrics Store -> KQL Queries / Alerts -> Action Groups (Email, Webhook to Dynamics 365).",
        components: ["Azure Monitor Agent (AMA)", "Log Analytics Workspace", "Application Insights", "Alert Rules & Action Groups", "Dashboards & Workbooks"]
      },
      importantConcepts: [
        "Azure Monitor Agent (AMA) vs Legacy MMA: AMA uses Data Collection Rules (DCR) to centrally define what telemetry to collect and send to workspaces.",
        "KQL (Kusto Query Language): Read-only request language to query massive volumes of telemetry in seconds (e.g., where, summarize, project, render).",
        "Alert Suppression & Maintenance Windows: Using alert processing rules to suppress alerts during scheduled maintenance or patch windows.",
        "Diagnostic Settings: Must be explicitly configured on Azure resources to forward resource logs and platform metrics to Log Analytics."
      ],
      practicalImplementation: {
        steps: [
          "1. Deploy Log Analytics Workspace: az monitor log-analytics workspace create -g rg-payroll-ops -n law-payroll-prod",
          "2. Configure Diagnostic Settings: Stream SQL DB and VM diagnostic logs to the workspace.",
          "3. Write KQL query for high CPU: Perf | where ObjectName == 'Processor' and CounterName == '% Processor Time' | summarize AvgCPU = avg(CounterValue) by Computer, bin(TimeGenerated, 5m) | where AvgCPU > 85",
          "4. Create Alert Rule: Target the KQL query with 5-minute evaluation frequency and 15-minute lookback window.",
          "5. Associate Action Group: Configure webhook to create an incident ticket in Microsoft Dynamics 365."
        ],
        verification: "Test the alert rule by running the KQL query manually in Log Analytics; verify sample alerts trigger notification to Action Group members."
      },
      productionScenarios: [
        {
          scenario: "Sev 1 Alert: Payroll Batch Processing Pipeline Failed with Timeout",
          investigation: "Received Action Group alert. Opened Log Analytics Workspace and queried AzureDiagnostics table filtering by Category == 'PipelineRuns' and Status == 'Failed'. Correlated error timestamp with Azure SQL Database metrics showing DTU exhaustion.",
          resolution: "Identified blocked database query, escalated to database administrator to kill blocking session, restarted pipeline in ADF, and closed incident within SLA."
        }
      ],
      interviewPrep: [
        {
          q: "What is the difference between Azure Monitor Metrics and Azure Monitor Logs?",
          a: "Azure Monitor Metrics are lightweight, numerical time-series values collected at regular intervals (often every 1 minute) representing a specific attribute (like CPU percentage or Disk Read Bytes). They are ideal for real-time alerting with near-zero latency. Azure Monitor Logs are complex, structured records containing diverse data types stored in tables (like Event logs, Syslog, and custom application traces) queryable using KQL. Logs have richer context and longer retention, but slightly higher ingestion latency."
        }
      ],
      quickRevision: [
        "KQL | where -> | summarize -> | project -> | render.",
        "Action Group = Defines WHO gets notified and HOW (email, SMS, webhook).",
        "Data Collection Rules (DCR) = Controls what AMA collects from VMs.",
        "Diagnostic Settings = Bridges resource logs to Log Analytics."
      ]
    },

    "exchange-online": {
      id: "exchange-online",
      title: "Exchange Online & Microsoft 365 Messaging",
      category: "Microsoft 365 & Messaging",
      level: "Intermediate",
      readTime: "17 min",
      summary: "Cloud messaging management: user/shared/resource mailboxes, mailbox permissions, mail flow transport rules, and Message Trace delivery diagnostics.",
      intro: {
        what: "Exchange Online is Microsoft's cloud-based email, calendar, and contacts messaging platform hosted as part of the Microsoft 365 suite.",
        why: "Serves as the mission-critical communication backbone for enterprises, managing secure corporate email and scheduling.",
        where: "Managed via the Exchange Admin Center (EAC) and Exchange Online PowerShell module.",
        problemSolved: "Eliminates on-prem Exchange server patching, database corruption, and DAG maintenance while providing 99.9% uptime SLA.",
        realWorld: "At TCS on the MCAPS engagement, administered mailboxes, handled permission assignments (Full Access, Send As), resolved mail flow delivery issues, and ran Message Traces."
      },
      basics: {
        concepts: [
          "Mailbox Types: User Mailbox (requires M365 license), Shared Mailbox (license-free up to 50 GB), Resource/Room Mailbox, Equipment Mailbox.",
          "Mailbox Permissions: Full Access (open and read contents), Send As (recipient sees sender as the mailbox), Send on Behalf (recipient sees 'sent on behalf of').",
          "Distribution Groups vs Microsoft 365 Groups: Distribution groups broadcast emails to members. M365 Groups include email + shared workspace + SharePoint document library.",
          "Exchange Online Protection (EOP): Built-in anti-malware and anti-spam filtering engine with quarantine capability."
        ],
        architecture: "Sender -> EOP Filtering (Connection, Anti-Malware, Anti-Spam) -> Mail Flow Rules -> Recipient Mailbox -> Client (Outlook / Web / Mobile).",
        components: ["Exchange Admin Center", "Mailboxes", "Mail Flow Rules", "Message Trace", "Anti-Spam / Anti-Phishing Policies"]
      },
      importantConcepts: [
        "Message Trace: Indispensable administrative tool to track the exact lifecycle of an email message over the past 90 days, showing delivered, pending, expanded, or failed states.",
        "Shared Mailbox Licensing: Shared mailboxes do not require a paid license unless they exceed 50 GB in size or require an in-place archive.",
        "Automapping: When Full Access permission is granted via PowerShell or EAC, Outlook automatically adds the shared mailbox to the user's Outlook profile.",
        "Mail Flow Rules (Transport Rules): Inspect messages in transit to append disclaimers, block attachments, route through specific connectors, or encrypt."
      ],
      practicalImplementation: {
        steps: [
          "1. Connect to Exchange Online: Connect-ExchangeOnline -UserPrincipalName admin@tenant.com",
          "2. Create Shared Mailbox: New-Mailbox -Shared -Name 'Payroll Support' -DisplayName 'Payroll Support' -PrimarySmtpAddress 'payrollsupport@tenant.com'",
          "3. Assign Full Access: Add-MailboxPermission -Identity 'payrollsupport@tenant.com' -User 'rsharma@tenant.com' -AccessRights FullAccess -InheritanceType All",
          "4. Assign Send As: Add-RecipientPermission -Identity 'payrollsupport@tenant.com' -Trustee 'rsharma@tenant.com' -AccessRights SendAs",
          "5. Run Message Trace for missing email: Get-MessageTrace -SenderAddress 'external@vendor.com' -RecipientAddress 'payrollsupport@tenant.com' -StartDate (Get-Date).AddDays(-1) -EndDate (Get-Date)"
        ],
        verification: "Verify permissions using Get-MailboxPermission; inspect Message Trace status showing 'Delivered' or details of NDR reason."
      },
      productionScenarios: [
        {
          scenario: "User Reports External Vendor Invoices are Not Arriving",
          investigation: "Ran Get-MessageTrace for vendor domain. Found messages had status 'FilteredAsSpam'. Checked EOP Quarantine portal and verified messages were flagged by high-confidence phishing filter due to missing SPF/DKIM records on vendor domain.",
          resolution: "Released message from quarantine, notified vendor to correct their domain SPF records, and created temporary safe-sender mail flow rule with manager approval."
        }
      ],
      interviewPrep: [
        {
          q: "What is the difference between Full Access, Send As, and Send on Behalf permissions in Exchange Online?",
          a: "Full Access allows a delegate to log in, open, and view the mailbox contents and calendar, but does NOT grant permission to send email from it. Send As allows the delegate to send email that appears to come directly from the mailbox (the recipient only sees the mailbox address). Send on Behalf allows the delegate to send an email where the 'From' header clearly shows 'Delegate sent on behalf of Mailbox'. Full Access and Send As are frequently combined for shared mailboxes."
        }
      ],
      quickRevision: [
        "Shared Mailbox = Free up to 50 GB, no license required.",
        "NDR 550 5.1.1 = Recipient address does not exist.",
        "NDR 550 5.7.1 = Delivery not authorized (sender blocked or transport rule).",
        "Message Trace = Core tool to diagnose email delivery issues."
      ]
    },

    "azure-powershell": {
      id: "azure-powershell",
      title: "PowerShell & Automation for Cloud Operations",
      category: "Automation & Scripting",
      level: "Intermediate",
      readTime: "18 min",
      summary: "Operational scripting with Az, Microsoft.Graph, and ExchangeOnlineManagement modules: health checks, bulk administration, and CSV auditing.",
      intro: {
        what: "PowerShell is a cross-platform task automation and configuration management framework consisting of a command-line shell and scripting language.",
        why: "Enables cloud administrators to execute bulk operations, automate repetitive daily health checks, and eliminate manual human error in production.",
        where: "Run locally from administrative workstations, Cloud Shell, Azure Automation Runbooks, and CI/CD pipelines.",
        problemSolved: "Performing tasks on 500 VMs or 2,000 users in the portal takes days; a PowerShell script completes it in minutes with full CSV logging.",
        realWorld: "At TCS, authored daily operational health check scripts for Azure VMs, backup job status, replication health, and bulk Entra ID user onboarding."
      },
      basics: {
        concepts: [
          "Cmdlet Syntax: Verb-Noun naming convention (Get-AzVM, New-MgUser, Set-Mailbox).",
          "Object Pipeline: Output of one command passes as rich objects (not just text strings) to the next cmdlet via pipeline (|).",
          "Modules: Az (Azure resources), Microsoft.Graph (Entra ID & M365), ExchangeOnlineManagement (email), ActiveDirectory.",
          "Variables & Control Flow: $Variables, foreach ($item in $collection), if/else, try/catch error handling."
        ],
        architecture: "Script -> Connect-AzAccount / Connect-MgGraph -> Pipeline Processing -> REST API Calls -> Azure Resource Manager / Microsoft Graph -> Structured CSV / HTML Output.",
        components: ["Az.Accounts", "Az.Compute", "Az.Network", "Microsoft.Graph.Users", "Microsoft.Graph.Identity.Governance"]
      },
      importantConcepts: [
        "Error Handling: Always use try { } catch { } blocks and -ErrorAction Stop to handle transient cloud API errors gracefully.",
        "Credential Security: Never hardcode passwords or credentials in scripts. Use Managed Identities, Azure Key Vault, or Connect-AzAccount -Identity.",
        "WhatIf Parameter: Test commands safely before execution using -WhatIf (e.g., Remove-AzResourceGroup -Name rg-test -WhatIf).",
        "Graph Scopes: When connecting to Graph, only request required least-privilege scopes (e.g., Connect-MgGraph -Scopes 'User.ReadWrite.All')."
      ],
      practicalImplementation: {
        steps: [
          "1. Install modules: Install-Module -Name Az, Microsoft.Graph -Scope CurrentUser -Repository PSGallery",
          "2. Authenticate: Connect-AzAccount; Connect-MgGraph -Scopes 'User.Read.All'",
          "3. Query stopped VMs: Get-AzVM -Status | Where-Object { $_.PowerState -ne 'VM running' } | Select-Object Name, ResourceGroupName, PowerState",
          "4. Export backup status to CSV: Get-AzRecoveryServicesBackupJob -VaultId $vault.ID -From (Get-Date).AddDays(-1) | Select-Object WorkloadName, Status, Operation, StartTime | Export-Csv -Path './BackupHealthReport.csv' -NoTypeInformation",
          "5. Audit mailbox permissions: Get-Mailbox -ResultSize Unlimited | Get-MailboxPermission | Where-Object { $_.User -notlike 'NT AUTHORITY*' } | Export-Csv -Path './MailboxAudit.csv'"
        ],
        verification: "Open exported CSV files, verify column headers and clean data formatting, check error logs."
      },
      productionScenarios: [
        {
          scenario: "Automating 24x7 Morning Daily Health Check for 40+ Azure VMs and Backup Vaults",
          investigation: "Manual check of 40 VMs and 3 Recovery Services Vaults in the Azure Portal consumed 45 minutes of engineer time every shift.",
          resolution: "Authored an automated PowerShell script utilizing Get-AzVM -Status and Get-AzRecoveryServicesBackupJob. Script formats results into an HTML report highlighting failed jobs in red and emails it to the operations team in under 90 seconds."
        }
      ],
      interviewPrep: [
        {
          q: "Why is Microsoft Graph PowerShell preferred over the legacy AzureAD or MSOnline PowerShell modules?",
          a: "Microsoft has officially deprecated the MSOnline and AzureAD modules. Microsoft Graph PowerShell is the unified API endpoint for all Microsoft 365 and Entra ID services. It supports modern authentication (OAuth 2.0, certificate-based, Managed Identity), complies with least-privilege scoping, receives all new feature updates, and operates cross-platform on PowerShell 7 Core."
        }
      ],
      quickRevision: [
        "-WhatIf = Simulates action without making changes.",
        "-ErrorAction Stop = Forces terminating error caught by catch block.",
        "Export-Csv -NoTypeInformation = Clean CSV export.",
        "Connect-AzAccount -Identity = Passwordless auth inside Azure VMs."
      ]
    },

    "incident-management": {
      id: "incident-management",
      title: "ITIL Incident & Major Incident Management (Sev 1 / Sev 2)",
      category: "ITSM & ITIL Operations",
      level: "Intermediate",
      readTime: "16 min",
      summary: "Production support operations: incident lifecycle, severity categorization, bridge call driving, SLA management, and Root Cause Analysis (RCA).",
      intro: {
        what: "Incident Management is the ITIL practice of restoring normal service operations as quickly as possible following an unplanned interruption or reduction in quality.",
        why: "Minimizes business disruption, enforces contractually agreed SLAs, and protects corporate revenue in critical production environments.",
        where: "Managed using ITSM ticketing platforms (Microsoft Dynamics 365, ServiceNow) and enterprise communication bridges (Teams bridge calls).",
        problemSolved: "Prevents chaotic troubleshooting during outages; establishes clear roles, incident ownership, communication cadences, and escalation paths.",
        realWorld: "At TCS, managed Sev 1 and Sev 2 incidents for Microsoft's payroll platform, coordinating with L3 engineers, database administrators, and business stakeholders."
      },
      basics: {
        concepts: [
          "Incident vs Problem vs Change: Incident = Unplanned interruption (fix it fast). Problem = Underlying cause of one or more incidents (find root cause). Change = Addition, modification, or removal of authorized service components.",
          "Severity Matrix: Impact (number of users/services affected) x Urgency (speed required) = Priority/Severity (Sev 1 Critical, Sev 2 High, Sev 3 Medium, Sev 4 Low).",
          "Service Level Agreement (SLA): Response SLA (acknowledging ticket) and Resolution SLA (restoring service).",
          "Major Incident: High-impact event (Sev 1/2) that severely affects business operations, requiring an emergency bridge and dedicated incident commander."
        ],
        architecture: "Detection (Alert/User) -> Logging & Categorization -> Prioritization (Impact/Urgency) -> Initial Triage (L1/L2) -> Escalation (L3/Specialist) -> Resolution & Recovery -> Closure -> Post-Incident RCA.",
        components: ["ITSM Tool (Dynamics 365)", "Major Incident Bridge", "Service Tree", "Runbooks", "RCA Document"]
      },
      importantConcepts: [
        "Primary Goal: The goal of Incident Management is fast RESTORATION OF SERVICE, not necessarily finding the permanent root cause immediately (e.g., failing over to DR, restarting service, rolling back a change).",
        "Bridge Etiquette: Clear, disciplined communication: state observations, actions taken, and avoid talking over lead investigators.",
        "Service Tree: Microsoft's internal service hierarchy tool used to trace dependencies and identify exact component owners for routing.",
        "Blameless Post-Mortem (RCA): Root Cause Analysis focuses on process improvements and system resilience, not individual engineer blame."
      ],
      practicalImplementation: {
        steps: [
          "1. Receive Sev 1 alert from Azure Monitor regarding payroll service failure.",
          "2. Acknowledge ticket in Dynamics 365 to stop the Response SLA clock.",
          "3. Convene Major Incident Bridge on Microsoft Teams; notify business stakeholders with initial incident notification within 15 minutes.",
          "4. Review telemetry in Azure Monitor and Log Analytics; identify failing backend SQL database query.",
          "5. Engage L3 Database Administrator; apply mitigation (kill blocker or failover replica).",
          "6. Validate application recovery with payroll operations team; resolve ticket in Dynamics 365.",
          "7. Convene Problem Management review and publish RCA within 5 business days."
        ],
        verification: "Confirm service health metrics return to green, verify error rate drops to zero, and obtain formal sign-off from business owners."
      },
      productionScenarios: [
        {
          scenario: "Sev 1: Global Payroll Calculation Engine Outage 3 Hours Prior to Payroll Release",
          investigation: "ADF pipeline runs failing with HTTP 500 exceptions from backend Azure WebJobs. Application Insights revealed out-of-memory exception in worker container.",
          resolution: "Immediately scaled out WebJob App Service plan instances from 2 to 6, cleared worker queue backlog, verified successful processing of 45,000 employee payroll records, and drafted comprehensive RCA."
        }
      ],
      interviewPrep: [
        {
          q: "How do you handle a situation where a Sev 1 incident is approaching SLA breach and the root cause is still unknown?",
          a: "In a Sev 1 scenario, the priority is service restoration over root cause determination. If the SLA breach is imminent, I immediately escalate to the L3 technical leads and incident manager on the bridge, propose standard non-destructive recovery actions (such as restarting services, failing over to a secondary region via Azure Site Recovery, or rolling back recent changes), and ensure stakeholder communication is dispatched ahead of time with clear status updates and business impact statements."
        }
      ],
      quickRevision: [
        "Incident = Restore service ASAP.",
        "Problem = Find and fix root cause permanently.",
        "Change = Managed risk modification to production.",
        "Sev 1 = Critical business outage requiring emergency bridge."
      ]
    }
  }
};
