// ============================================================================
// HANDS-ON ENTERPRISE PRACTICAL LABS
// 15 Step-by-Step Practical Labs covering Azure Compute, Storage, Networking,
// Identity & Access Management, Monitoring, Messaging, and Automation.
// ============================================================================

window.LABS_DATA = [
  {
    id: "lab-01",
    title: "Lab 1: Deploy & Harden an Azure Virtual Machine (CLI & Bicep)",
    category: "Compute & Infrastructure",
    categoryIcon: "cpu",
    duration: "45 mins",
    level: "Intermediate",
    objective: "Provision an enterprise-grade Windows Server 2022 Azure VM with managed disks, boot diagnostics, system-assigned managed identity, and no public IP.",
    prerequisites: "Azure Subscription, Resource Group created, Virtual Network and Subnet configured.",
    architecture: "Client (Bastion/VPN) -> Subnet (10.0.1.0/24) -> NSG -> Azure NIC -> VM Standard_D4s_v5 (Managed Disk) -> Log Analytics Workspace.",
    steps: [
      "1. Define variables and create Resource Group: az group create -n rg-lab-compute -l centralindia",
      "2. Deploy VNet and Subnet: az network vnet create -g rg-lab-compute -n vnet-lab --address-prefix 10.0.0.0/16 --subnet-name snet-app --subnet-prefix 10.0.1.0/24",
      "3. Provision VM with no public IP and Boot Diagnostics: az vm create -g rg-lab-compute -n vm-lab-app01 --image Win2022Datacenter --size Standard_D4s_v5 --vnet-name vnet-lab --subnet snet-app --public-ip-address '' --admin-username azureadmin --boot-diagnostics-storage ''",
      "4. Enable System-Assigned Managed Identity: az vm identity assign -g rg-lab-compute -n vm-lab-app01",
      "5. Attach a 128 GB Managed Premium SSD Data Disk: az vm disk attach -g rg-lab-compute --vm-name vm-lab-app01 --name disk-lab-data01 --size-gb 128 --sku Premium_LRS --new"
    ],
    commands: "az vm create -g rg-lab-compute -n vm-lab-app01 --image Win2022Datacenter --size Standard_D4s_v5 --vnet-name vnet-lab --subnet snet-app --public-ip-address '' --admin-username azureadmin",
    expectedResult: "VM provisions with status 'Succeeded', has a private IP (e.g. 10.0.1.4), no public IP attached, and identity assigned.",
    verification: "Run 'az vm get-instance-view -g rg-lab-compute -n vm-lab-app01 --query instanceView.statuses' to verify powerState is 'VM running'. Connect via Azure Bastion to confirm OS boot.",
    troubleshooting: "If provisioning times out, check subscription vCPU quotas in the region. If disk attachment fails, confirm VM is in running or stopped state.",
    learningOutcomes: "Mastery of secure IaaS deployment, eliminating public IP attack surfaces, and configuring managed identities for passwordless cloud access."
  },

  {
    id: "lab-02",
    title: "Lab 2: Secure Azure Storage with Private Endpoints & Entra ID RBAC",
    category: "Storage & Security",
    categoryIcon: "database",
    duration: "40 mins",
    level: "Intermediate",
    objective: "Create an Azure Storage Account, disable shared access keys, enforce default deny network firewall, and connect via a Private Endpoint.",
    prerequisites: "Azure Subscription, Virtual Network with private endpoint network policies enabled.",
    architecture: "Application VM -> Private DNS (privatelink.blob.core.windows.net) -> Private Endpoint (10.0.2.10) -> Storage Account Firewall (Public Denied).",
    steps: [
      "1. Create storage account: az storage account create -g rg-lab-storage -n stlabsec01 --sku Standard_ZRS --allow-blob-public-access false --allow-shared-key-access false",
      "2. Deny public network access: az storage account update -g rg-lab-storage -n stlabsec01 --default-action Deny",
      "3. Create private endpoint in subnet: az network private-endpoint create -g rg-lab-storage -n pe-stlabsec01 --vnet-name vnet-lab --subnet snet-data --private-connection-resource-id $(az storage account show -g rg-lab-storage -n stlabsec01 --query id -o tsv) --group-id blob --connection-name conn-stlab",
      "4. Create Private DNS Zone 'privatelink.blob.core.windows.net' and link to VNet.",
      "5. Assign 'Storage Blob Data Contributor' to test user in Access Control (IAM)."
    ],
    commands: "az storage account update -g rg-lab-storage -n stlabsec01 --default-action Deny --allow-shared-key-access false",
    expectedResult: "Storage account rejects public internet access with 403 Forbidden, but resolves internally via private IP (10.0.2.10) with Entra ID tokens.",
    verification: "Run 'nslookup stlabsec01.blob.core.windows.net' from VM. Verify it resolves to 10.0.2.10. Test upload: 'az storage blob upload --account-name stlabsec01 -c test -f file.txt --auth-mode login'.",
    troubleshooting: "If DNS resolves to public IP, verify the VNet link on the Private DNS Zone is active and registration is enabled.",
    learningOutcomes: "Implementation of Zero Trust storage patterns, eliminating access key sprawl and securing unstructured cloud data."
  },

  {
    id: "lab-03",
    title: "Lab 3: Hub-and-Spoke Virtual Network Architecture with Peering",
    category: "Cloud Networking",
    categoryIcon: "network",
    duration: "50 mins",
    level: "Intermediate",
    objective: "Construct a central Hub VNet peered with two Spoke VNets (Spoke-App and Spoke-DB), establishing bidirectional network flow and validating isolation.",
    prerequisites: "Azure Subscription, planned non-overlapping CIDR blocks (Hub 10.0.0.0/16, Spoke1 10.1.0.0/16, Spoke2 10.2.0.0/16).",
    architecture: "Spoke-App (10.1.0.0/16) <--> Hub VNet (10.0.0.0/16) <--> Spoke-DB (10.2.0.0/16).",
    steps: [
      "1. Create Hub VNet: 10.0.0.0/16 with GatewaySubnet and ManagementSubnet.",
      "2. Create Spoke1 (10.1.0.0/16) and Spoke2 (10.2.0.0/16).",
      "3. Configure Peering Hub-to-Spoke1 and reciprocal Spoke1-to-Hub; ensure status changes to 'Connected'.",
      "4. Configure Peering Hub-to-Spoke2 and reciprocal Spoke2-to-Hub.",
      "5. Deploy test VMs in each spoke and verify ping/TCP connectivity between Hub and Spokes."
    ],
    commands: "az network vnet peering create -g rg-lab-net -n HubToSpoke1 --vnet-name vnet-hub --remote-vnet vnet-spoke1 --allow-vnet-access",
    expectedResult: "Both peerings show status 'Connected'. VMs in Spoke1 can reach Hub VMs, but cannot reach Spoke2 directly (demonstrating non-transitive peering).",
    verification: "Run 'az network watcher test-connectivity --source-resource vm-spoke1 --dest-resource vm-hub' to confirm latency and packet delivery.",
    troubleshooting: "If peering stays 'Initiated', verify the reciprocal peering link was created with the correct remote VNet resource ID.",
    learningOutcomes: "Real-world enterprise network topology design, isolation boundaries, and foundation for centralized firewall transit routing."
  },

  {
    id: "lab-04",
    title: "Lab 4: Configure Network Security Groups & Effective Rule Diagnostics",
    category: "Cloud Networking",
    categoryIcon: "shield",
    duration: "35 mins",
    level: "Intermediate",
    objective: "Configure a multi-tier NSG rule set with Application Security Groups (ASGs), test port restrictions, and diagnose drops using Network Watcher.",
    prerequisites: "Hub-Spoke network from Lab 3, test VMs.",
    architecture: "Internet -> NSG Inbound (Allow 443, Deny 3389) -> ASG-Web -> Subnet -> VM NIC.",
    steps: [
      "1. Create Application Security Group (ASG): az network asg create -g rg-lab-net -n asg-web-servers",
      "2. Associate VM NIC with ASG: az network nic ip-config update -g rg-lab-net --nic-name nic-vm-app --name ipconfig1 --application-security-groups asg-web-servers",
      "3. Create NSG rule targeting ASG destination on TCP port 443 with priority 200.",
      "4. Add higher priority deny rule for port 3389 from internet (priority 300).",
      "5. Test rule evaluation using Network Watcher IP Flow Verify."
    ],
    commands: "az network watcher test-ip-flow -g NetworkWatcherRG --direction Inbound --protocol TCP --local 10.1.1.4:443 --remote 203.0.113.5:52134 --vm vm-spoke1",
    expectedResult: "IP Flow Verify returns 'Action: Allow' for port 443 and 'Action: Deny' for port 3389 with rule name matched.",
    verification: "View Effective Security Rules on the VM network interface in the Azure Portal.",
    troubleshooting: "If traffic is unexpectedly denied, verify the Subnet NSG is not dropping the packet before it reaches the NIC.",
    learningOutcomes: "Deep understanding of NSG rule precedence, ASG workload abstraction, and packet inspection triage."
  },

  {
    id: "lab-05",
    title: "Lab 5: Azure Monitor, Log Analytics (KQL) & Automated Action Group Alerts",
    category: "Monitoring & Operations",
    categoryIcon: "activity",
    duration: "40 mins",
    level: "Intermediate",
    objective: "Create a Log Analytics Workspace, configure diagnostic settings, write KQL queries, and trigger an automated Action Group email alert on high CPU.",
    prerequisites: "Running Azure VM with Azure Monitor Agent (AMA) installed.",
    architecture: "VM (Azure Monitor Agent) -> Data Collection Rule (DCR) -> Log Analytics Workspace -> Alert Rule (KQL) -> Action Group (Email/Webhook).",
    steps: [
      "1. Deploy Log Analytics Workspace: az monitor log-analytics workspace create -g rg-lab-ops -n law-ops-lab",
      "2. Create Action Group with email receiver: az monitor action-group create -g rg-lab-ops -n ag-ops-alerts --short-name opsalerts --action email admin issacsodari8@gmail.com",
      "3. Write KQL query for high CPU: Perf | where ObjectName == 'Processor' and CounterName == '% Processor Time' | summarize AvgCPU = avg(CounterValue) by Computer, bin(TimeGenerated, 5m) | where AvgCPU > 85",
      "4. Create scheduled query alert rule targeting the workspace, evaluating every 5 minutes.",
      "5. Simulate CPU load on the VM using PowerShell script to trigger the alert."
    ],
    commands: "az monitor scheduled-query create -g rg-lab-ops -n alert-high-cpu --scopes $(az monitor log-analytics workspace show -g rg-lab-ops -n law-ops-lab --query id -o tsv) --condition 'count 'Perf | where CounterName == "% Processor Time" and CounterValue > 85' > 0' --action ag-ops-alerts",
    expectedResult: "Alert state changes to 'Fired' in Azure Monitor; email notification arrives at registered address within 5 minutes.",
    verification: "Check Azure Monitor -> Alerts -> Fired alerts. Verify incident details and alert suppression settings.",
    troubleshooting: "If logs do not populate, verify the Data Collection Rule is linked to the VM and the Azure Monitor Agent service is running.",
    learningOutcomes: "End-to-end cloud observability implementation, KQL querying proficiency, and automated incident alerting."
  },

  {
    id: "lab-06",
    title: "Lab 6: Microsoft Entra ID Dynamic Groups & Role-Based Access Control (RBAC)",
    category: "Identity & Governance",
    categoryIcon: "user-check",
    duration: "35 mins",
    level: "Intermediate",
    objective: "Implement automated identity lifecycle management using Entra ID Dynamic Groups and assign scoped Azure RBAC roles.",
    prerequisites: "Microsoft Entra ID P1/P2 license, test user accounts.",
    architecture: "User (Department: Finance) -> Dynamic Membership Rule -> Security Group -> Azure RBAC Role (Reader on rg-finance) -> Portal Access.",
    steps: [
      "1. Create test users with Department attribute 'CloudOps' and 'Finance'.",
      "2. Create Dynamic Security Group 'SG-CloudOps-Team' with rule: (user.department -eq 'CloudOps') and (user.accountEnabled -eq true).",
      "3. Verify dynamic membership evaluation job completes and populates the group.",
      "4. Assign 'Virtual Machine Contributor' RBAC role to 'SG-CloudOps-Team' scoped to rg-lab-compute.",
      "5. Log in as test user and verify they can start/stop VMs in rg-lab-compute, but cannot modify storage or networking."
    ],
    commands: "New-MgGroup -DisplayName 'SG-CloudOps-Team' -MailEnabled:$false -MailNickname 'sgcloudops' -SecurityEnabled:$true -GroupTypes @('DynamicMembership') -MembershipRule '(user.department -eq "CloudOps")' -MembershipRuleProcessingState 'On'",
    expectedResult: "Users are dynamically added to the group based on HR department attributes; RBAC permissions apply automatically without manual intervention.",
    verification: "Check group members in Entra admin center. Test role assignment via 'az role assignment list --assignee <groupId>'.",
    troubleshooting: "Dynamic group processing can take 5-15 minutes. Check processing status in the group Overview blade.",
    learningOutcomes: "Elimination of manual group administration, automated onboarding/offboarding, and enforcement of least-privilege RBAC."
  },

  {
    id: "lab-07",
    title: "Lab 7: Zero Trust Conditional Access Policy Deployment (Report-Only Mode)",
    category: "Identity & Governance",
    categoryIcon: "sliders",
    duration: "45 mins",
    level: "Advanced",
    objective: "Author a high-security Conditional Access policy requiring MFA for administrative roles, enforce Break-Glass account exclusions, and validate via What If and Sign-in logs.",
    prerequisites: "Microsoft Entra ID P1/P2, Global Admin or Conditional Access Admin role, two emergency break-glass accounts.",
    architecture: "Sign-in Signal -> Conditional Access Engine -> Target: Admin Roles -> Exclude: BreakGlass -> Grant: Require MFA -> State: Report-Only.",
    steps: [
      "1. Identify Break-Glass accounts: breakglass01@tenant.onmicrosoft.com, breakglass02@tenant.onmicrosoft.com.",
      "2. Create CA Policy: 'SEC-RequireMFA-For-Privileged-Roles'.",
      "3. Assignments: Include Directory Roles (Global Admin, User Admin, Billing Admin). Exclude Break-Glass accounts.",
      "4. Cloud Apps: All Cloud Apps.",
      "5. Grant: Require multifactor authentication.",
      "6. Set State to 'Report-Only'.",
      "7. Use the 'What If' tool to simulate sign-in scenarios and check Entra Sign-in logs for policy evaluation."
    ],
    commands: "# Verify Break-Glass accounts are excluded before moving policy state to 'On'",
    expectedResult: "Sign-in logs show policy evaluated as 'Report-Only: Success' when test admin logs in with MFA, proving policy works without risk of tenant lockout.",
    verification: "Review Sign-in logs -> Conditional Access tab. Verify the policy displays status 'Report-Only'.",
    troubleshooting: "If policy is not evaluating, confirm the user's role is specifically included and client app is supported.",
    learningOutcomes: "Safe policy authoring, Zero Trust access controls, and emergency break-glass operational governance."
  },

  {
    id: "lab-08",
    title: "Lab 8: Automated Patch Management with Azure Update Manager",
    category: "Compute & Infrastructure",
    categoryIcon: "refresh-cw",
    duration: "30 mins",
    level: "Intermediate",
    objective: "Configure Azure Update Manager to assess missing security patches on Windows VMs and create an automated maintenance configuration schedule.",
    prerequisites: "Running Windows Azure VM with Azure Update Manager enabled.",
    architecture: "VM (Azure Monitor Agent) -> Azure Update Manager -> Maintenance Configuration (Weekly Saturday 02:00 AM) -> Automated Reboot.",
    steps: [
      "1. Navigate to Azure Update Manager -> Machines -> Select VM -> Click 'Check for updates'.",
      "2. Review missing KB security and critical updates in the assessment overview.",
      "3. Create a Maintenance Configuration: Schedule weekly every Sunday at 02:00 AM UTC, 2-hour duration, reboot option 'Reboot if required'.",
      "4. Assign the maintenance configuration to the VM dynamic scope.",
      "5. Trigger a one-time 'One-time update' to validate patching execution and reboot handling."
    ],
    commands: "az maintenance configuration create -g rg-lab-ops -n maint-weekly-patch --maintenance-scope InGuestPatch --recur-every '1Week' --start-date-time '2026-11-22 02:00' --time-zone 'UTC'",
    expectedResult: "VM assesses patch compliance status, installs critical patches during window, reboots cleanly, and reports compliance status 'Healthy'.",
    verification: "Check Update Manager -> History tab to view installation log for each KB update.",
    troubleshooting: "If updates fail, verify Windows Update service (wuauserv) is running on VM and outbound port 443 to Microsoft Update endpoints is allowed.",
    learningOutcomes: "Enterprise patch compliance, automated vulnerability mitigation, and zero-touch server maintenance."
  },

  {
    id: "lab-09",
    title: "Lab 9: Bulk User Lifecycle Automation with Microsoft Graph PowerShell",
    category: "Automation & Scripting",
    categoryIcon: "code",
    duration: "40 mins",
    level: "Intermediate",
    objective: "Write a PowerShell script using Microsoft Graph to ingest a CSV roster, provision accounts, assign departments, and export a confirmation report.",
    prerequisites: "PowerShell 7, Microsoft.Graph module installed, User.ReadWrite.All permission.",
    architecture: "Users.csv -> PowerShell Script (Import-Csv) -> Connect-MgGraph -> New-MgUser -> Set-MgUserLicense -> Export-Csv Results.csv.",
    steps: [
      "1. Create CSV file 'new_hires.csv' with columns: DisplayName, UserPrincipalName, Department, JobTitle, TemporaryPassword.",
      "2. Author script looping through CSV with try/catch error handling.",
      "3. Execute New-MgUser creating cloud accounts with 'forceChangePasswordNextSignIn = $true'.",
      "4. Assign Microsoft 365 E5 license SKU automatically upon creation.",
      "5. Export completed status report with Object IDs to 'onboarding_report.csv'."
    ],
    commands: "Connect-MgGraph -Scopes 'User.ReadWrite.All'; Import-Csv './new_hires.csv' | ForEach-Object { New-MgUser -DisplayName $_.DisplayName -UserPrincipalName $_.UserPrincipalName -Department $_.Department -PasswordProfile @{Password=$_.TemporaryPassword; ForceChangePasswordNextSignIn=$true} -AccountEnabled }",
    expectedResult: "All users in CSV provisioned cleanly in Entra ID with mandatory password change on first logon.",
    verification: "Query newly created users: 'Get-MgUser -Filter "department eq 'CloudOps'" | Select-Object DisplayName, UserPrincipalName'.",
    troubleshooting: "If UPN collision occurs, catch error code 'Request_BadRequest' and append a random numeric suffix.",
    learningOutcomes: "Production identity lifecycle automation, eliminating human entry errors, and managing bulk cloud onboarding."
  },

  {
    id: "lab-10",
    title: "Lab 10: Exchange Online Shared Mailbox & Mail Flow Rule Provisioning",
    category: "Messaging & Collaboration",
    categoryIcon: "mail",
    duration: "30 mins",
    level: "Intermediate",
    objective: "Create a license-free Shared Mailbox, grant Full Access and Send As permissions to a delegate group, and configure a mail flow disclaimer rule.",
    prerequisites: "Exchange Online Administrator role, ExchangeOnlineManagement PowerShell module.",
    architecture: "Inbound Email -> Exchange Online Protection -> Mail Flow Transport Rule -> Shared Mailbox -> Delegates (Full Access / Send As).",
    steps: [
      "1. Connect to Exchange Online: Connect-ExchangeOnline.",
      "2. Provision shared mailbox: New-Mailbox -Shared -Name 'Payroll Helpdesk' -DisplayName 'Payroll Helpdesk' -PrimarySmtpAddress 'payrollhelpdesk@tenant.com'.",
      "3. Grant Full Access with Automapping: Add-MailboxPermission -Identity 'payrollhelpdesk@tenant.com' -User 'rsharma@tenant.com' -AccessRights FullAccess -InheritanceType All.",
      "4. Grant Send As permission: Add-RecipientPermission -Identity 'payrollhelpdesk@tenant.com' -Trustee 'rsharma@tenant.com' -AccessRights SendAs.",
      "5. Create Mail Flow Rule to append confidentiality disclaimer to all outbound messages."
    ],
    commands: "New-TransportRule -Name 'Payroll-Confidentiality-Disclaimer' -FromScope InOrganization -SentToScope NotInOrganization -ApplyHtmlDisclaimerText '<p>Confidential Payroll Information</p>'",
    expectedResult: "Shared mailbox appears automatically in delegate's Outlook; delegate can send email appearing as 'Payroll Helpdesk' with disclaimer attached.",
    verification: "Run 'Get-MailboxPermission -Identity payrollhelpdesk@tenant.com' and test sending an email through Outlook.",
    troubleshooting: "If Send As fails with 'You do not have permission', allow 15 minutes for Exchange Active Directory cache synchronization.",
    learningOutcomes: "Exchange messaging administration, license cost avoidance via shared mailboxes, and corporate email compliance rules."
  },

  {
    id: "lab-11",
    title: "Lab 11: Network Security Incident Triage with Network Watcher",
    category: "Cloud Networking",
    categoryIcon: "compass",
    duration: "40 mins",
    level: "Intermediate",
    objective: "Investigate a simulated network connectivity drop between application and database tiers using IP Flow Verify, Next Hop, and Packet Capture.",
    prerequisites: "Azure Subscription, running VMs across subnets with Network Watcher enabled.",
    architecture: "VM-App (10.1.1.4) ---> [Dropped Packet] ---> VM-DB (10.2.1.4). Network Watcher tests flow and isolates dropping rule.",
    steps: [
      "1. Introduce a deliberate deny rule blocking port 1433 on destination subnet.",
      "2. From VM-App, run Test-NetConnection to 10.2.1.4 on port 1433 (fails).",
      "3. Open Network Watcher -> IP Flow Verify: Input source IP 10.1.1.4, destination IP 10.2.1.4, TCP, port 1433.",
      "4. Inspect output: Action 'Deny', Rule Name 'Deny-SQL-Subnet'.",
      "5. Adjust rule priority to restore connectivity and verify with Next Hop."
    ],
    commands: "az network watcher test-ip-flow -g NetworkWatcherRG --vm vm-app --direction Outbound --protocol TCP --local 10.1.1.4:51234 --remote 10.2.1.4:1433",
    expectedResult: "Network Watcher pinpoints the exact NSG and rule name causing the drop without needing to log in to either VM.",
    verification: "After correcting rule, IP Flow Verify returns 'Action: Allow' and Test-NetConnection returns 'TcpTestSucceeded: True'.",
    troubleshooting: "If packet capture shows drops on the guest OS, check Windows Defender Firewall profiles.",
    learningOutcomes: "Rapid network incident isolation, eliminating guesswork during Sev 1 network outages."
  },

  {
    id: "lab-12",
    title: "Lab 12: Production Sev 1 Payroll Outage Simulation & RCA Resolution",
    category: "ITSM Operations",
    categoryIcon: "alert-circle",
    duration: "60 mins",
    level: "Senior",
    objective: "Execute an end-to-end simulated Sev 1 major incident: acknowledge ticket, open bridge, triage telemetry, execute service recovery, and author RCA.",
    prerequisites: "Simulated application workload running on Azure VM and Azure SQL Database.",
    architecture: "Web App -> Azure SQL DB (Exhausted DTUs / Deadlock) -> 504 Timeout -> Azure Monitor Sev 1 Alert -> Major Incident Bridge -> Mitigation.",
    steps: [
      "1. Receive automated Sev 1 alert: Payroll Web App throwing HTTP 500/504 errors.",
      "2. Acknowledge incident in Dynamics 365 to stop SLA clock (Target: <15 min response).",
      "3. Convene Teams bridge call and post initial incident stakeholder notification.",
      "4. Query Log Analytics: AppExceptions | summarize count() by ProblemId. Discover SQL connection timeout.",
      "5. Check SQL Database metrics: DTU consumption at 100% due to un-indexed payroll query.",
      "6. Execute temporary mitigation: Scale Azure SQL DB from S2 to S6 during bridge window.",
      "7. Verify error rate returns to zero and obtain business sign-off.",
      "8. Draft formal Root Cause Analysis (RCA) document with permanent action items (index optimization)."
    ],
    commands: "az sql db update -g rg-payroll-prod -s srv-payroll -n db-payroll --service-objective S6",
    expectedResult: "Service fully restored within 25 minutes (beating 60-minute resolution SLA); detailed RCA published to leadership.",
    verification: "Application Insights Live Metrics show 0% server errors; payroll batch finishes calculation successfully.",
    troubleshooting: "If scaling is blocked by active long-running queries, terminate blocker session using KILL <spid>.",
    learningOutcomes: "Executive incident management proficiency, SLA compliance, cross-team bridge leadership, and blameless post-mortem writing."
  },

  {
    id: "lab-13",
    title: "Lab 13: Privileged Identity Management (PIM) Just-in-Time Activation",
    category: "Identity & Governance",
    categoryIcon: "award",
    duration: "35 mins",
    level: "Advanced",
    objective: "Configure PIM for the 'User Administrator' Entra role with maximum 4-hour activation, mandatory justification, ticket number, and MFA verification.",
    prerequisites: "Microsoft Entra ID P2 license, test admin account.",
    architecture: "Admin User (Eligible Assignment) -> PIM Request (Reason + Ticket #) -> MFA Verification -> Active Assignment (4 hours) -> Auto-Revocation.",
    steps: [
      "1. Open Microsoft Entra admin center -> Identity Governance -> Privileged Identity Management.",
      "2. Navigate to Entra roles -> Roles -> User Administrator -> Settings.",
      "3. Edit settings: Set max activation duration to 4 hours; require MFA on activation; require business justification and incident ticket number.",
      "4. Assign test admin account as 'Eligible' (not Active).",
      "5. Log in as test admin, open PIM, and activate role with justification 'INC1049283 - Offboard leaver account'.",
      "6. Verify elevated privileges become active and automatically expire after 4 hours."
    ],
    commands: "# PIM activation is managed via Entra ID Portal or Graph API governance endpoints",
    expectedResult: "User holds standard privileges by default and only gains privileged rights upon verified request, eliminating permanent standing admin risk.",
    verification: "Check PIM audit history. Verify role activates, displays time remaining, and revokes automatically.",
    troubleshooting: "If user cannot activate, ensure their assignment type is set to 'Eligible' and not 'Direct'.",
    learningOutcomes: "Zero Standing Privileges (ZSP) enforcement, compliance audit readiness, and identity attack surface reduction."
  },

  {
    id: "lab-14",
    title: "Lab 14: Enterprise App Registration & Single Sign-On (SAML / OIDC)",
    category: "Identity & Governance",
    categoryIcon: "log-in",
    duration: "40 mins",
    level: "Intermediate",
    objective: "Register a multi-tier enterprise web application in Microsoft Entra ID, configure API permissions, generate client secrets, and test OAuth 2.0 token flow.",
    prerequisites: "Microsoft Entra ID admin access, Application Administrator role.",
    architecture: "Browser -> Microsoft Entra ID (Authorize Endpoint) -> Issues JWT Token -> Enterprise Web App (Validates Claims & Signature).",
    steps: [
      "1. Navigate to Entra ID -> App registrations -> Click 'New registration'.",
      "2. Enter Name 'App-Payroll-SelfService', redirect URI 'https://payroll.company.com/signin-oidc'.",
      "3. Configure API permissions: Add Microsoft Graph 'User.Read' delegated permission and grant admin consent.",
      "4. Generate a 6-month Client Secret and securely record the secret Value.",
      "5. Enable 'ID tokens' and 'Access tokens' under Authentication blade.",
      "6. Assign 'SG-CloudOps-Team' under Enterprise Applications -> Users and groups to restrict access."
    ],
    commands: "az ad app create --display-name 'App-Payroll-SelfService' --web-redirect-uris 'https://payroll.company.com/signin-oidc' --required-resource-accesses '[{"resourceAppId":"00000003-0000-0000-c000-000000000000","resourceAccess":[{"id":"e1fe6dd8-ba31-4d61-89e7-88639da4683d","type":"Scope"}]}]'",
    expectedResult: "Application registered with Client ID and Tenant ID; test user can authenticate via Microsoft SSO and view application dashboard.",
    verification: "Inspect returned JWT token at jwt.ms to verify claims (UPN, roles, email, groups).",
    troubleshooting: "If users receive AADSTS50105, ensure 'Assignment required?' is either set to False or user/group is explicitly assigned.",
    learningOutcomes: "Enterprise modern authentication integration, OAuth 2.0 / OpenID Connect token mechanics, and centralized SSO governance."
  },

  {
    id: "lab-15",
    title: "Lab 15: Automated Daily Health Check Script with HTML & CSV Reporting",
    category: "Automation & Scripting",
    categoryIcon: "heart",
    duration: "45 mins",
    level: "Intermediate",
    objective: "Author an end-to-end production PowerShell script that audits VM power states, Backup job status, ASR replication health, and disk capacities, generating a styled HTML dashboard.",
    prerequisites: "PowerShell 7, Az.Compute and Az.RecoveryServices modules installed.",
    architecture: "PowerShell Runbook -> Queries AzVM, AzRecoveryServices, AzMetric -> Parses Statuses -> Compiles CSS-Styled HTML Report -> Dispatches Email.",
    steps: [
      "1. Script connects to Azure via Managed Identity: Connect-AzAccount -Identity.",
      "2. Query all VMs: Flag any VM not in 'VM running' state.",
      "3. Query Recovery Services Vaults: Flag any backup job with status 'Failed' in the last 24 hours.",
      "4. Query Azure Site Recovery: Check replication health and lag time.",
      "5. Generate responsive HTML email report with color-coded status badges (Green = Healthy, Red = Attention Required).",
      "6. Save CSV archive for historical audit compliance."
    ],
    commands: "$vms = Get-AzVM -Status; $backups = Get-AzRecoveryServicesBackupJob -From (Get-Date).AddDays(-1); $report = foreach ($vm in $vms) { [PSCustomObject]@{Name=$vm.Name; Status=$vm.PowerState} }; $report | ConvertTo-Html -Title 'Daily Health Check'",
    expectedResult: "Executive health check report generated in under 90 seconds, highlighting zero unhandled failures across production infrastructure.",
    verification: "Open generated HTML file in browser; verify table styling, accurate VM counts, and failed job alerts.",
    troubleshooting: "Ensure the Automation Account Managed Identity has at least 'Reader' role across all target subscriptions.",
    learningOutcomes: "High-value operational automation, eliminating repetitive manual morning check-ins, and delivering professional operational reporting."
  }
];
