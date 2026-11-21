// ============================================================================
// COMPLETE PRODUCTION TROUBLESHOOTING KNOWLEDGE BASE
// Practical, field-tested enterprise runbooks across Azure Compute, Networking,
// Storage, Observability, Entra ID (IAM), Microsoft 365, and ITSM.
// ============================================================================

window.TROUBLESHOOTING_DATA = [
  // --------------------------------------------------------------------------
  // AZURE VM TROUBLESHOOTING
  // --------------------------------------------------------------------------
  {
    id: "tb-vm-rdp-failure",
    category: "Azure VM",
    categoryIcon: "cpu",
    title: "RDP Connection Failure to Windows Azure VM (Port 3389)",
    severity: "High",
    problem: "Administrator cannot establish an RDP session to an Azure Windows Virtual Machine. Connection times out with 'Remote Desktop can't connect to the remote computer for one of these reasons: 1) Remote access to the server is not enabled, 2) The remote computer is turned off, 3) The remote computer is not available on the network.'",
    possibleCauses: [
      "Network Security Group (NSG) rule missing or priority overridden for port 3389.",
      "Windows Guest OS Firewall is blocking TCP 3389 on Domain/Private/Public profiles.",
      "Remote Desktop Services (TermService) stopped or hung inside the guest OS.",
      "VM is deallocated, stopped, or stuck in a Boot/Windows Update loop.",
      "NIC is detached or misconfigured with invalid IP assignment.",
      "Network routing issue or VPN tunnel down between client workstation and VNet."
    ],
    symptoms: [
      "RDP client error code: 0x204 or 0x104.",
      "Test-NetConnection to VM Private IP on port 3389 returns 'TcpTestSucceeded : False'.",
      "VM status in portal shows 'Running' but RDP fails immediately."
    ],
    initialInvestigation: "Check VM Overview in Azure Portal: Confirm Provisioning state is 'Succeeded' and Power state is 'VM running'. Review Boot Diagnostics screenshot to ensure Windows login screen is displayed and no BSOD or hung updates are visible.",
    portalNavigation: "Azure Portal -> Virtual Machines -> [Select VM] -> Help -> Serial Console OR Support + troubleshooting -> Reset password / Run command.",
    cliCommands: [
      "# 1. Test port connectivity from administrative jumpbox or Cloud Shell\nTest-NetConnection -ComputerName 10.0.1.4 -Port 3389",
      "# 2. Re-enable Remote Desktop and reset Windows Firewall via Run Command\naz vm run-command invoke -g rg-payroll-prod -n vm-pay-app01 --command-id EnableRemotePS",
      "# 3. Run custom script to force-start TermService and allow port 3389\nSet-Service -Name TermService -StartupType Automatic; Start-Service TermService\nnetsh advfirewall firewall add rule name='Allow RDP' dir=in action=allow protocol=TCP localport=3389",
      "# 4. Check effective NSG security rules on the VM NIC\naz network nic show-effective-nsg -g rg-payroll-prod -n nic-vm-pay-app01 -o table"
    ],
    logsToCheck: [
      "Boot Diagnostics: Serial Log (check for driver corruption or disk errors).",
      "Guest OS Event Viewer: Microsoft-Windows-TerminalServices-LocalSessionManager/Operational.",
      "Azure Network Watcher: IP Flow Verify & Connection Troubleshoot logs."
    ],
    resolutionSteps: [
      "1. Open VM -> Networking in Portal. Verify an Inbound NSG rule allows TCP port 3389 from authorized source IPs with higher priority than DenyAllInBound.",
      "2. Go to VM -> Support + troubleshooting -> Reset password -> Select 'Reset configuration only' (this resets RDP configuration and enables Remote Desktop).",
      "3. If still failing, open 'Run command' -> Run 'EnableRemotePS' or execute script to start TermService and open firewall port 3389.",
      "4. If guest OS is unresponsive, access 'Serial Console' to inspect command line or click 'Redeploy' under Help section to migrate VM to a fresh Azure host."
    ],
    verification: "Run 'Test-NetConnection -ComputerName <VM-IP> -Port 3389' from jumpbox. Result must show 'TcpTestSucceeded : True'. Launch MSTSC and verify successful login prompt.",
    prevention: [
      "Never expose port 3389 directly to the public internet; use Azure Bastion or Site-to-Site VPN.",
      "Deploy Just-In-Time (JIT) VM access through Microsoft Defender for Cloud.",
      "Enforce Group Policy (GPO) to prevent local Windows Firewall from disabling RDP rules."
    ],
    escalation: "Escalate to L3 if the VM disk image is corrupted, Boot Diagnostics shows Stop 0x0000007B (INACCESSIBLE_BOOT_DEVICE), or host hypervisor platform errors persist.",
    interviewScenario: "Interview Q: How do you systematically troubleshoot a Windows Azure VM that cannot be reached via RDP? Answer: I begin with outer layers: 1) Verify VM PowerState and Boot Diagnostics screenshot. 2) Check Effective NSG rules on the NIC using Azure CLI. 3) Test TCP 3389 connectivity using Network Watcher Connection Troubleshoot. 4) Use Azure Run Command or Reset Configuration to repair TermService and Windows Firewall. 5) If underlying host is suspected, initiate a VM Redeploy."
  },

  {
    id: "tb-vm-high-cpu",
    category: "Azure VM",
    categoryIcon: "cpu",
    title: "High CPU Utilization (>95%) Spikes & Performance Degradation",
    severity: "High",
    problem: "Azure VM CPU utilization consistently exceeds 95%, causing application timeouts, slow batch jobs, dropped database connections, and Sev 2 alerts.",
    possibleCauses: [
      "Runaway background worker process or calculation thread (e.g., payroll batch process).",
      "Software bug leading to infinite loop or memory leak forcing garbage collection spikes.",
      "Antivirus or security agent (e.g., Defender / Tanium / CrowdStrike) scanning active database files.",
      "Under-provisioned VM size for current enterprise workload volume."
    ],
    symptoms: [
      "Azure Monitor alert: 'CPU Percentage > 90% for 15 minutes'.",
      "Application requests returning HTTP 504 Gateway Timeout.",
      "Extremely sluggish RDP / PowerShell responsiveness."
    ],
    initialInvestigation: "Open Azure Monitor Metrics: inspect '% Processor Time' over the last 6 hours to identify whether the spike was gradual or instant. Correlate with application batch schedules.",
    portalNavigation: "Azure Portal -> Virtual Machines -> [VM] -> Monitoring -> Insights / Performance -> Log Analytics.",
    cliCommands: [
      "# Query Log Analytics for top CPU consuming processes\nPerf\n| where TimeGenerated > ago(1h)\n| where ObjectName == 'Process' and CounterName == '% Processor Time'\n| summarize AvgCPU = avg(CounterValue) by InstanceName\n| top 10 by AvgCPU desc",
      "# PowerShell via Run Command to identify rogue processes live\nGet-Process | Sort-Object CPU -Descending | Select-Object -First 10 Id, ProcessName, CPU, WorkingSet",
      "# Scale up VM size dynamically via Azure CLI during approved change window\naz vm update -g rg-payroll-prod -n vm-pay-app01 --size Standard_D8s_v5"
    ],
    logsToCheck: [
      "Azure Monitor Guest OS Perf tables in Log Analytics.",
      "Windows Event Viewer: System Log & Application Log for crash dumps.",
      "Application Insights dependency and exception traces."
    ],
    resolutionSteps: [
      "1. Identify the rogue process via Log Analytics or Run Command (Get-Process).",
      "2. If a non-critical worker process is looping, restart the specific service via Run Command without rebooting the VM.",
      "3. If the legitimate workload has outgrown capacity (e.g., month-end payroll calculation), initiate emergency scale-up to a higher compute SKU.",
      "4. Exclude high-IO database directories from live antivirus real-time inspection.",
      "5. Coordinate with development team to inspect thread dumps."
    ],
    verification: "Monitor Azure Portal Metrics: verify CPU usage drops below 60%. Validate application response times and ensure batch jobs complete within SLA.",
    prevention: [
      "Configure Autoscale rules for Virtual Machine Scale Sets (VMSS) if applicable.",
      "Schedule heavy batch jobs during off-peak windows.",
      "Implement proactive metric alerts at 80% CPU threshold before Sev 1 breach."
    ],
    escalation: "Escalate to Application / Development L3 team if code profiling reveals infinite loop, deadlock, or memory leak requiring software patch.",
    interviewScenario: "Interview Q: A production Azure VM has 98% CPU utilization and users are complaining. How do you respond? Answer: First, check Azure Monitor to identify whether this is an expected batch job or an anomaly. Use Log Analytics KQL or Run Command (Get-Process) to isolate the exact process name and PID. If it's a hung thread, safely recycle the service. If the workload legitimately requires more compute, initiate an emergency resize to a larger VM series under change management."
  },

  {
    id: "tb-vm-disk-full",
    category: "Azure VM",
    categoryIcon: "cpu",
    title: "Operating System (C:) or Data Disk Full Exhaustion",
    severity: "Critical",
    problem: "The OS disk (C: drive) or attached managed data disk reaches 100% capacity, causing services to crash, databases to halt, and VM to freeze.",
    possibleCauses: [
      "Unmanaged application logs, IIS logs (C:\inetpub\logs), or dump files accumulating without rotation.",
      "Windows Update software distribution cache (C:\Windows\SoftwareDistribution) bloat.",
      "Database transaction log files (.ldf) growing unchecked due to recovery model.",
      "Temporary staging files created by ETL or data factory pipelines."
    ],
    symptoms: [
      "Windows Event Log ID 2013: 'The disk is at or near capacity'.",
      "Applications fail with 'There is not enough space on the disk' (0x80070070).",
      "Azure VM backup fails because VSS snapshot creation requires free disk space."
    ],
    initialInvestigation: "Open VM Run Command or Serial Console to run 'Get-Volume' or 'Get-PSDrive C' to check available bytes.",
    portalNavigation: "Azure Portal -> Virtual Machines -> [VM] -> Disks -> [Select OS / Data Disk] -> Size + performance.",
    cliCommands: [
      "# Check free disk space via PowerShell\nGet-CimInstance -ClassName Win32_LogicalDisk | Select-Object DeviceId, @{n='SizeGB';e={[math]::round($_.Size/1GB,2)}}, @{n='FreeGB';e={[math]::round($_.FreeSpace/1GB,2)}}",
      "# Find top 10 largest log folders\nGet-ChildItem -Path C:\inetpub\logs, C:\Windows\Temp -Recurse -File -ErrorAction SilentlyContinue | Sort-Object Length -Descending | Select-Object -First 10 FullName, @{n='SizeMB';e={[math]::round($_.Length/1MB,2)}}",
      "# Expand Azure Managed Disk via Azure CLI (requires VM deallocation for OS disk or live resize if enabled)\naz disk update -g rg-payroll-prod -n disk-pay-os --size-gb 256"
    ],
    logsToCheck: [
      "Windows System Event Log (Event ID 2013).",
      "IIS Log directories (C:\inetpub\logs\LogFiles).",
      "Azure Backup error logs in Recovery Services Vault."
    ],
    resolutionSteps: [
      "1. Quick Recovery: Clear temporary directories (C:\Windows\Temp, user temp) and compress or archive old IIS log files.",
      "2. Purge SoftwareDistribution Download folder: Stop-Service wuauserv; Remove-Item C:\Windows\SoftwareDistribution\Download\* -Recurse; Start-Service wuauserv.",
      "3. Permanent Expansion: If the disk needs more headroom, go to Azure Portal -> Disks -> Size + performance -> Increase disk size (e.g., from 128 GB to 256 GB).",
      "4. In Windows OS: Open Disk Management (diskmgmt.msc) or run PowerShell 'Resize-Partition -DriveLetter C -Size (Get-PartitionSupportedSizes -DriveLetter C).SizeMax' to extend partition into newly allocated space."
    ],
    verification: "Execute 'Get-PSDrive C' and verify at least 25% free disk space. Ensure crashed services restart and Azure Backup snapshot succeeds.",
    prevention: [
      "Deploy log rotation scripts via Task Scheduler or Azure Automation to archive logs to Azure Blob Storage.",
      "Place application data and logs on dedicated Data Disks (e.g., E: or F:), never on the OS C: drive.",
      "Configure Azure Monitor alert for 'Free Space Percentage < 15%'."
    ],
    escalation: "Escalate to Database Admin team if transaction logs are rapidly consuming disk due to uncommitted transactions.",
    interviewScenario: "Interview Q: How do you safely expand an Azure OS disk? Answer: In Azure, OS disks can be expanded in the Disks blade under Size + performance. Note that expanding an OS disk typically requires stopping/deallocating the VM first (unless live resize is supported). Once expanded in Azure, power on the VM, and within the Windows OS, use Disk Management or PowerShell's Resize-Partition to extend the volume into the newly added unallocated space."
  },

  // --------------------------------------------------------------------------
  // AZURE NETWORKING TROUBLESHOOTING
  // --------------------------------------------------------------------------
  {
    id: "tb-net-nsg-blocking",
    category: "Azure Networking",
    categoryIcon: "network",
    title: "Network Security Group (NSG) Blocking Legitimate Application Traffic",
    severity: "High",
    problem: "An application hosted on an Azure VM subnet cannot communicate with a backend database or web API. Packet captures indicate connection resets or drops.",
    possibleCauses: [
      "Default DenyAllInBound rule (priority 65500) dropping traffic due to missing allow rule.",
      "Conflicting NSG rules at the Subnet level vs NIC level (traffic must pass BOTH).",
      "Rule priority order incorrect (a broader Deny rule with lower priority number evaluated first).",
      "Incorrect protocol (TCP vs UDP) or port number specified.",
      "Source IP or Destination IP misconfigured (e.g., missing public NAT IP or internal subnet CIDR)."
    ],
    symptoms: [
      "Connection timeout or 'No route to host' error.",
      "Network Watcher IP Flow Verify returns 'Action: Deny'.",
      "Traffic dropped intermittently between peered VNets."
    ],
    initialInvestigation: "Identify the exact source IP, destination IP, destination port, and protocol. Check whether NSGs are attached to both the Subnet and the Network Interface (NIC).",
    portalNavigation: "Azure Portal -> Virtual Machines -> [VM] -> Networking -> Review 'Inbound port rules' and 'Effective security rules'.",
    cliCommands: [
      "# Check Effective NSG rules on the NIC using Azure CLI\naz network nic show-effective-nsg -g rg-payroll-prod -n nic-vm-pay-app01 -o table",
      "# Use Network Watcher IP Flow Verify to test if traffic is dropped and by which rule\naz network watcher test-ip-flow -g rg-network-watcher --direction Inbound --protocol TCP --local 10.0.1.4:1433 --remote 10.0.2.10:50123 --vm vm-pay-app01 -o json"
    ],
    logsToCheck: [
      "Network Security Group Flow Logs (NSG Flow Logs / Traffic Analytics).",
      "Network Watcher diagnostic logs in Log Analytics.",
      "Azure Firewall logs (if traffic routes through a hub firewall)."
    ],
    resolutionSteps: [
      "1. Navigate to VM -> Networking -> Click 'Effective security rules'. This shows the evaluated priority list combining subnet and NIC rules.",
      "2. Look for the rule that denies the target port. Note its Priority number and which NSG owns it.",
      "3. Author a new Inbound rule with a LOWER priority number (e.g., 200) that explicitly allows traffic from the source IP/subnet to the destination port (e.g., TCP 1433 for SQL).",
      "4. Ensure NSGs on both the source VM subnet/NIC (Outbound) and destination VM subnet/NIC (Inbound) permit the traffic.",
      "5. Verify rule provisioning status shows 'Succeeded'."
    ],
    verification: "Run Network Watcher IP Flow Verify again; confirm result shows 'Action: Allow' and lists your new rule name. Test TCP port from client using Test-NetConnection.",
    prevention: [
      "Standardize NSG rule priority schemes (e.g., 100-200 Infrastructure, 200-300 App, 300-400 Database).",
      "Use Application Security Groups (ASGs) instead of hardcoding IP addresses.",
      "Enable NSG Flow Logs with Traffic Analytics for continuous visibility."
    ],
    escalation: "Escalate to Network Architecture L3 if traffic routes through an Azure Firewall or third-party NVA requiring User-Defined Routes (UDR) changes.",
    interviewScenario: "Interview Q: If an NSG is applied to both a Subnet and a NIC, in what order are rules evaluated for inbound traffic? Answer: For INBOUND traffic, Azure evaluates the Subnet NSG first; if allowed, it then evaluates the NIC NSG. Both must permit the traffic. For OUTBOUND traffic, Azure evaluates the NIC NSG first, and if allowed, it evaluates the Subnet NSG. A deny at either level drops the packet immediately."
  },

  {
    id: "tb-net-vnet-peering",
    category: "Azure Networking",
    categoryIcon: "network",
    title: "VNet Peering Connectivity Failures & Gateway Transit Issues",
    severity: "High",
    problem: "Virtual Machines in VNet-A cannot ping or reach Virtual Machines in VNet-B despite VNet Peering being configured.",
    possibleCauses: [
      "Peering status is in 'Initiated' state instead of 'Connected' (peering only created on one side).",
      "Overlapping IP address spaces between the two VNets preventing peering creation.",
      "NSG on target subnet blocking traffic from the remote VNet CIDR block.",
      "'Allow forwarded traffic' or 'Allow gateway transit' checkboxes not selected for Hub-Spoke routing.",
      "VNet Peering does NOT support transitive routing by default (VNet-A cannot reach VNet-C through VNet-B without an NVA/Firewall)."
    ],
    symptoms: [
      "Ping and TCP connections to private IP in peered VNet time out completely.",
      "VNet Peering status in portal displays 'Disconnected' or 'Initiated'.",
      "Network Watcher Connection Troubleshoot reports 'VirtualNetworkPeeringNotConnected'."
    ],
    initialInvestigation: "Go to VNet-A -> Peerings and check Peering status. Check VNet-B -> Peerings and check Peering status. BOTH must show 'Connected'.",
    portalNavigation: "Azure Portal -> Virtual Networks -> [VNet] -> Settings -> Peerings.",
    cliCommands: [
      "# Check Peering status on both VNets\naz network vnet peering list -g rg-payroll-prod --vnet-name vnet-payroll-hub -o table\naz network vnet peering list -g rg-payroll-prod --vnet-name vnet-payroll-spoke01 -o table",
      "# Test connection between VMs across peering\naz network watcher test-connectivity -g rg-network-watcher --source-resource vm-hub01 --dest-resource vm-spoke01 --dest-port 80 -o json"
    ],
    logsToCheck: [
      "VNet Peering Activity Logs.",
      "Network Watcher Next Hop and Connection Troubleshoot logs."
    ],
    resolutionSteps: [
      "1. If Peering status is 'Initiated', create the reciprocal peering link on VNet-B pointing back to VNet-A. Both must show 'Connected'.",
      "2. Check 'Virtual network access' is set to 'Enabled' on both peerings.",
      "3. If hub contains a VPN Gateway that spoke needs to use, check 'Use remote gateway' on Spoke peering and 'Allow gateway transit' on Hub peering.",
      "4. Verify NSGs on both ends allow the remote VNet IP address prefix.",
      "5. If transitive routing across spokes is needed, deploy an Azure Firewall or NVA in the Hub and configure User-Defined Route (UDR) tables pointing 0.0.0.0/0 to the NVA private IP."
    ],
    verification: "Run 'az network watcher test-connectivity' between VMs. Result must return 'ConnectionStatus: Reachable' with zero packet loss.",
    prevention: [
      "Plan IP address space centrally using IPAM to avoid overlapping CIDR blocks.",
      "Automate peering deployments using Bicep/Terraform to ensure reciprocal links are created simultaneously."
    ],
    escalation: "Escalate to Cloud Network Engineering if dynamic BGP route propagation fails across ExpressRoute / VPN Gateways.",
    interviewScenario: "Interview Q: Is Azure VNet Peering transitive? Answer: No, VNet Peering is strictly non-transitive. If VNet-A is peered with VNet-B, and VNet-B is peered with VNet-C, VNet-A cannot talk to VNet-C through VNet-B by default. To enable communication, you must either create a direct peering link between VNet-A and VNet-C, or deploy a Network Virtual Appliance (NVA) / Azure Firewall in VNet-B with User-Defined Routes (UDRs) in the spokes."
  },

  // --------------------------------------------------------------------------
  // AZURE STORAGE TROUBLESHOOTING
  // --------------------------------------------------------------------------
  {
    id: "tb-storage-403",
    category: "Azure Storage",
    categoryIcon: "database",
    title: "Storage Account 403 Forbidden / Authorization Failure",
    severity: "High",
    problem: "Application or administrator receives '403 This request is not authorized to perform this operation' when attempting to upload or read blobs from an Azure Storage Account.",
    possibleCauses: [
      "Storage Account firewall is configured to 'Enabled from selected virtual networks and IP addresses' and client IP is not whitelisted.",
      "User has Azure RBAC 'Reader' or 'Contributor' role instead of 'Storage Blob Data Contributor' (Contributor grants management, not data plane access!).",
      "Shared Access Signature (SAS) token has expired, IP-restricted, or clock skew exceeded.",
      "AllowBlobPublicAccess is set to false and client is attempting anonymous HTTP read.",
      "Private Endpoint DNS resolving to public IP instead of private link IP."
    ],
    symptoms: [
      "HTTP Status Code 403 Forbidden.",
      "Error Code: 'AuthorizationFailure' or 'AuthorizationPermissionMismatch'.",
      "Azure Storage Explorer displays access denied icon next to container."
    ],
    initialInvestigation: "Check the exact error message: Does it say 'AuthenticationFailed' (bad key/token) or 'AuthorizationPermissionMismatch' (RBAC role insufficient) or network firewall block?",
    portalNavigation: "Azure Portal -> Storage accounts -> [Account] -> Networking & Access Control (IAM).",
    cliCommands: [
      "# Check Storage Account public network access state\naz storage account show -g rg-payroll-prod -n stpayroll01 --query 'publicNetworkAccess'\n\n# Check if client IP is permitted in firewall rules\naz storage account network-rule list -g rg-payroll-prod --account-name stpayroll01 -o table\n\n# Test DNS resolution for private endpoint blob\nnslookup stpayroll01.blob.core.windows.net"
    ],
    logsToCheck: [
      "Azure Storage Diagnostic Logs in Log Analytics ($logs / StorageBlobLogs).",
      "Check StatusCode == 403 and AuthenticationType (OAuth vs SAS vs SharedKey)."
    ],
    resolutionSteps: [
      "1. Check Networking: In Storage Account -> Networking, verify if 'Enabled from selected virtual networks' is active. Add your client public IP or ensure request comes from an allowed VNet/subnet.",
      "2. Check RBAC: For Entra ID authentication, assign 'Storage Blob Data Reader' or 'Storage Blob Data Contributor' to the user or Managed Identity under IAM.",
      "3. If using SAS: Regenerate SAS token with appropriate permissions (racwdl), correct start/expiry UTC timestamps, and verify client system clock is synchronized.",
      "4. Private DNS Check: Ensure Private DNS Zone 'privatelink.blob.core.windows.net' has an A record pointing to the Storage Account Private Endpoint IP."
    ],
    verification: "Upload a test blob via Azure CLI using '--auth-mode login': 'az storage blob upload --account-name stpayroll01 -c test -f sample.txt --auth-mode login'. Must return status 200 OK.",
    prevention: [
      "Transition from Shared Keys/SAS to Microsoft Entra ID RBAC for all applications.",
      "Utilize Private Endpoints with centralized Azure Private DNS Zones.",
      "Enable Soft Delete and Container Versioning to safeguard data."
    ],
    escalation: "Escalate to Security Operations if unexpected 403 spikes indicate potential credential revocation or DDoS mitigation engagement.",
    interviewScenario: "Interview Q: A user has 'Contributor' role on an Azure Resource Group containing a Storage Account, but cannot view blobs in Azure Portal. Why? Answer: The 'Contributor' role is a control-plane management role that allows managing resource settings, firewall rules, and keys, but does NOT grant data-plane access to read or write blobs. To read blobs using Entra ID credentials, the user must be assigned the specific data-plane role: 'Storage Blob Data Reader' or 'Storage Blob Data Contributor'."
  },

  // --------------------------------------------------------------------------
  // MICROSOFT ENTRA ID (IAM) TROUBLESHOOTING
  // --------------------------------------------------------------------------
  {
    id: "tb-iam-mfa-signin-blocked",
    category: "Identity & Access Management",
    categoryIcon: "user-check",
    title: "User Blocked by Conditional Access / MFA Registration Failure",
    severity: "High",
    problem: "An employee reports they cannot sign in to Microsoft 365 or Azure Portal. Error message states 'You cannot access this right now' or 'Your sign-in was blocked by organization security policies.'",
    possibleCauses: [
      "Conditional Access policy blocking access due to non-compliant device or untrusted IP location.",
      "MFA method phone number changed or user replaced their mobile device without transferring Microsoft Authenticator.",
      "User account marked as 'At Risk' or sign-in flagged as 'High Risk' by Entra ID Protection.",
      "Account is disabled or locked out due to repeated bad password attempts.",
      "Legacy authentication client (e.g., IMAP/POP3) blocked by modern authentication policy."
    ],
    symptoms: [
      "Entra ID Sign-in Error Code 53003 (Access has been blocked by Conditional Access policies).",
      "Error Code 50074 (User did not pass MFA challenge).",
      "Error Code 50053 (Account is locked because you tried to sign in too many times)."
    ],
    initialInvestigation: "Open Microsoft Entra admin center -> Identity -> Monitoring & health -> Sign-in logs. Filter by user UPN and locate the failed sign-in event.",
    portalNavigation: "Microsoft Entra admin center -> Users -> [User] -> Authentication methods & Sign-in logs.",
    cliCommands: [
      "# Query user sign-in activity and account status via Graph PowerShell\nGet-MgUser -UserId 'rsharma@tenant.com' | Select-Object DisplayName, AccountEnabled, UserPrincipalName\n\n# Check user registered MFA authentication methods\nGet-MgUserAuthenticationMethod -UserId 'rsharma@tenant.com'\n\n# Revoke user active sign-in sessions immediately\nRevoke-MgUserSignInSession -UserId 'rsharma@tenant.com'"
    ],
    logsToCheck: [
      "Microsoft Entra ID Sign-in logs (Interactive & Non-Interactive).",
      "Entra ID Audit logs (check who modified user roles or policies).",
      "Entra ID Protection: Risky Users and Risky Sign-ins logs."
    ],
    resolutionSteps: [
      "1. Open the specific failed sign-in record in Entra Sign-in logs and inspect the 'Conditional Access' tab.",
      "2. Identify the failing policy name and inspect the Grant Control (e.g., failed because device was not compliant or location was not trusted).",
      "3. If MFA method needs reset: Go to Users -> [User] -> Authentication methods -> Click 'Require re-register multifactor authentication'.",
      "4. If account is locked: Navigate to Authentication methods and click 'Revoke MFA sessions' and reset password if compromised.",
      "5. If user is flagged as Risky: Navigate to Entra ID Protection -> Risky users -> Review detection history (e.g., Anonymous IP, Leaked credentials) -> Confirm safe or force password reset."
    ],
    verification: "Ask user to sign in via private/incognito browser window. Check Entra Sign-in logs in real time to verify the new sign-in displays 'Status: Success'.",
    prevention: [
      "Encourage users to register at least two MFA methods (Microsoft Authenticator + FIDO2 security key or phone).",
      "Always pilot new Conditional Access policies in 'Report-Only' mode.",
      "Configure Self-Service Password Reset (SSPR) with combined registration."
    ],
    escalation: "Escalate to Identity Security L3 / SecOps if account shows active signs of compromise (session hijacking or token theft).",
    interviewScenario: "Interview Q: How do you troubleshoot Error Code 53003 in Microsoft Entra ID? Answer: Error 53003 explicitly indicates that the sign-in was blocked by a Conditional Access policy. I navigate to Entra ID Sign-in logs, select the failure event, and click the 'Conditional Access' tab. I review the list of evaluated policies. I look for the policy with Result: Failure, expand it, and examine the grant controls and conditions (such as device compliance, untrusted location, or risk level) to pinpoint exactly why the user did not satisfy policy requirements."
  },

  // --------------------------------------------------------------------------
  // MICROSOFT 365 & EXCHANGE ONLINE TROUBLESHOOTING
  // --------------------------------------------------------------------------
  {
    id: "tb-m365-ndr-550",
    category: "Microsoft 365",
    categoryIcon: "mail",
    title: "Exchange Online Email Delivery Failure (NDR 550 5.1.1 & 5.7.1)",
    severity: "Medium",
    problem: "Sender receives a Non-Delivery Report (NDR) with error code 550 5.1.1 or 550 5.7.1 when attempting to send emails to internal or external recipients.",
    possibleCauses: [
      "NDR 550 5.1.1 (Resolver.RST.RecipientNotFound): Outdated AutoComplete cache in Outlook sending to old LegacyExchangeDN or typo in address.",
      "NDR 550 5.7.1 (Unable to relay / Access denied): Sender blocked by anti-spam outbound policy, SPF/DKIM authentication failure, or mail flow rule restriction.",
      "Distribution group configured to reject messages from external senders ('RequireSenderAuthenticationEnabled : True').",
      "Recipient mailbox is full, disabled, or soft-deleted."
    ],
    symptoms: [
      "Bounce-back email received with 'Remote Server returned 550 5.1.1 / 550 5.7.1'.",
      "Message Trace in Exchange Admin Center displays status 'Failed' or 'Quarantined'."
    ],
    initialInvestigation: "Obtain the full NDR message headers from the sender. Locate the exact diagnostic code and recipient email address. Run a Message Trace in Exchange Admin Center.",
    portalNavigation: "Exchange Admin Center -> Mail flow -> Message trace -> Start a trace.",
    cliCommands: [
      "# Run Message Trace via Exchange Online PowerShell\nGet-MessageTrace -SenderAddress 'sender@external.com' -RecipientAddress 'target@company.com' -StartDate (Get-Date).AddDays(-2) -EndDate (Get-Date)\n\n# Get detailed delivery event logs\nGet-MessageTraceDetail -MessageTraceId '<TraceId>' -RecipientAddress 'target@company.com'\n\n# Check if distribution list accepts external senders\nGet-DistributionGroup -Identity 'all-staff@company.com' | Select-Object Name, RequireSenderAuthenticationEnabled"
    ],
    logsToCheck: [
      "Exchange Admin Center Message Trace Details.",
      "Exchange Online Protection (EOP) Quarantine logs.",
      "Tenant Outbound Spam Filter policy logs."
    ],
    resolutionSteps: [
      "1. For 550 5.1.1 caused by Outlook AutoComplete: Instruct user to click the 'X' next to the recipient entry in Outlook AutoComplete list and manually type address from Global Address List (GAL).",
      "2. For 550 5.7.1 on Distribution Lists: If external senders need to email the list, run 'Set-DistributionGroup -Identity <group> -RequireSenderAuthenticationEnabled $false'.",
      "3. For 550 5.7.1 caused by Outbound Spam: Check EAC -> Security -> Restricted entities. If the user account was compromised and blocked from sending, verify password reset, then click 'Unblock'.",
      "4. Check Mail Flow Rules: Review active Transport Rules for any pattern matching rules rejecting messages with custom NDR text."
    ],
    verification: "Send a test email from the sender address to the recipient; verify delivery in Outlook and confirm Message Trace shows 'Status: Delivered'.",
    prevention: [
      "Ensure SPF, DKIM, and DMARC DNS records are properly configured and published.",
      "Enable Modern Authentication across all tenant clients.",
      "Audit mail flow transport rules quarterly."
    ],
    escalation: "Escalate to Messaging L3 if external domain MX records or third-party email security gateways (e.g., Proofpoint, Mimecast) are rejecting messages.",
    interviewScenario: "Interview Q: A user complains that when they reply to an employee who recently had their mailbox recreated, they get NDR 550 5.1.1. How do you resolve this? Answer: This is commonly caused by the Outlook AutoComplete cache holding the old X.500 address (LegacyExchangeDN) rather than the standard SMTP address. To resolve this, have the user delete the cached contact entry by clicking 'X' in Outlook, or add the old LegacyExchangeDN as an X.500 proxy address on the user's newly created mailbox so cached links resolve seamlessly."
  },

  // --------------------------------------------------------------------------
  // ITSM & OPERATIONAL TROUBLESHOOTING
  // --------------------------------------------------------------------------
  {
    id: "tb-itsm-sev1-bridge",
    category: "ITSM Operations",
    categoryIcon: "alert-circle",
    title: "Major Incident Management (Sev 1 / Sev 2 Bridge Call Execution)",
    severity: "Critical",
    problem: "A mission-critical enterprise service (such as Microsoft Payroll Application) experiences an unexpected production outage affecting thousands of users, triggering a Sev 1 incident.",
    possibleCauses: [
      "Critical infrastructure failure (e.g., Azure SQL Database DTU exhaustion or regional storage throttling).",
      "Unplanned network failure (e.g., NSG rule change or expired VPN Gateway certificate).",
      "Corrupted application release or failed production change implementation.",
      "Third-party upstream dependency outage (e.g., Azure platform outage or identity provider failure)."
    ],
    symptoms: [
      "Automated Sev 1 alert triggered in Microsoft Dynamics 365 / ServiceNow.",
      "Multiple user tickets streaming into service desk simultaneously.",
      "Executive and business leadership requesting immediate status updates."
    ],
    initialInvestigation: "Review the automated alert payload in Dynamics 365; check Azure Service Health and Resource Health to rule out regional Azure outages. Convene the emergency bridge call.",
    portalNavigation: "Microsoft Dynamics 365 / ServiceNow -> Incident Management -> Major Incidents -> Azure Service Health.",
    cliCommands: [
      "# Check Azure Resource Health via CLI\naz rest --method get --url https://management.azure.com/subscriptions/<sub-id>/providers/Microsoft.ResourceHealth/availabilityStatuses?api-version=2020-05-01\n\n# Run quick VM status check across resource group\naz vm list -g rg-payroll-prod -d --query '[].{Name:name, PowerState:powerState, Provisioning:provisioningState}' -o table"
    ],
    logsToCheck: [
      "Azure Service Health dashboard for platform advisories.",
      "Azure Activity Logs for recent deployments, scale events, or configuration changes in the last 2 hours.",
      "Application Insights Live Metrics and failure exceptions."
    ],
    resolutionSteps: [
      "1. Acknowledge the ticket immediately to stop the Response SLA clock; create and host the emergency Microsoft Teams Major Incident Bridge call.",
      "2. Dispatch Initial Incident Notification to business stakeholders within 15 minutes stating the impact, affected services, and bridge details.",
      "3. Direct technical investigation across workstreams (Infrastructure, Application, Database, Security).",
      "4. Prioritize RESTORATION OF SERVICE over root cause: if recent change caused the issue, initiate immediate rollback. If compute node is degraded, redeploy or scale out.",
      "5. Validate service restoration with key business testers.",
      "6. Send Incident Resolution Notification and schedule blameless Root Cause Analysis (RCA) meeting within 48 hours."
    ],
    verification: "Verify transaction telemetry returns to baseline; monitor error rates in Application Insights for 60 minutes post-restoration before closing bridge.",
    prevention: [
      "Enforce rigorous Change Advisory Board (CAB) review for all production changes.",
      "Maintain validated automated rollback runbooks.",
      "Conduct regular Azure Site Recovery (ASR) disaster recovery simulation drills."
    ],
    escalation: "Escalate to Executive Incident Commander and Microsoft Premier Support if Azure platform infrastructure outage exceeds 30 minutes.",
    interviewScenario: "Interview Q: Walk me through your actions during the first 15 minutes of a Sev 1 production outage. Answer: In the first 15 minutes, my focus is ownership, communication, and triage: 1) Acknowledge the incident in Dynamics 365 within SLA. 2) Open the Major Incident Teams bridge and assemble the required L2/L3 infrastructure, database, and application leads. 3) Send the initial stakeholder notification outlining business impact. 4) Check Azure Service Health to confirm whether it is an Azure-wide platform issue or internal. 5) Check recent Azure Activity Logs for any changes implemented during the last window to evaluate an immediate rollback."
  }
];
