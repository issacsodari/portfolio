// ============================================================================
// SEARCHABLE CLOUD COMMAND REFERENCE LIBRARY
// Azure CLI, Azure PowerShell (Az), Microsoft Graph, Exchange Online,
// Windows Networking, and Kusto Query Language (KQL).
// ============================================================================

window.COMMANDS_DATA = [
  // --------------------------------------------------------------------------
  // AZURE CLI (az)
  // --------------------------------------------------------------------------
  {
    id: "cmd-az-vm-list",
    category: "Azure CLI",
    categoryIcon: "cpu",
    command: "az vm list -d -o table",
    syntax: "az vm list [-g <resource-group>] -d -o table",
    purpose: "List all Virtual Machines in a subscription or resource group with real-time power state and private/public IPs.",
    whenToUse: "Daily health checks, inventory audits, or verifying VM power states across production clusters.",
    example: "az vm list -g rg-payroll-prod -d -o table",
    expectedOutput: "Name           ResourceGroup    PowerState    PublicIps    PrivateIps\n-------------  ---------------  ------------  -----------  ------------\nvm-pay-app01   rg-payroll-prod  VM running                 10.0.1.4\nvm-pay-db01    rg-payroll-prod  VM running                 10.0.1.5",
    safety: "Read-Only / Safe",
    safetyColor: "green",
    troubleshooting: "Instantly checks whether VMs are running or deallocated during an outage without navigating the portal.",
    precautions: "Non-destructive. Safe to run at any time in production."
  },
  {
    id: "cmd-az-vm-restart",
    category: "Azure CLI",
    categoryIcon: "cpu",
    command: "az vm restart",
    syntax: "az vm restart -g <resource-group> -n <vm-name>",
    purpose: "Reboot an Azure Virtual Machine operating system.",
    whenToUse: "When guest OS services are unresponsive or after applying patches/configuration changes.",
    example: "az vm restart -g rg-payroll-prod -n vm-pay-app01",
    expectedOutput: "{\n  "startTime": "2026-11-21T14:30:00Z",\n  "status": "Succeeded"\n}",
    safety: "Modifies Resources",
    safetyColor: "yellow",
    troubleshooting: "Recycles the VM OS to clear hung memory threads or restart crashed services.",
    precautions: "Causes temporary service downtime. Must be executed only during approved maintenance windows or with stakeholder approval."
  },
  {
    id: "cmd-az-nic-effective-nsg",
    category: "Azure CLI",
    categoryIcon: "network",
    command: "az network nic show-effective-nsg",
    syntax: "az network nic show-effective-nsg -g <resource-group> -n <nic-name> -o table",
    purpose: "Display the effective Network Security Group rules applied to a specific network interface.",
    whenToUse: "Diagnosing blocked network traffic, port connectivity issues, or rule priority conflicts.",
    example: "az network nic show-effective-nsg -g rg-payroll-prod -n nic-vm-pay-app01 -o table",
    expectedOutput: "NetworkSecurityGroup    Priority  Direction  Access  SourcePortRange  DestinationPortRange\n----------------------  --------  ---------  ------  ---------------  --------------------\nnsg-payroll-subnet      100       Inbound    Allow   *                1433\nDefaultRules/DenyAll    65500     Inbound    Deny    *                *",
    safety: "Read-Only / Safe",
    safetyColor: "green",
    troubleshooting: "Reveals exactly which rule is dropping traffic by combining subnet-level and NIC-level NSG evaluations.",
    precautions: "Read-only command with zero production risk."
  },
  {
    id: "cmd-az-storage-blob-list",
    category: "Azure CLI",
    categoryIcon: "database",
    command: "az storage blob list",
    syntax: "az storage blob list --account-name <name> -c <container> --auth-mode login -o table",
    purpose: "List blobs in a container using Microsoft Entra ID authentication credentials.",
    whenToUse: "Auditing data files, verifying batch report generation, or testing RBAC permissions without access keys.",
    example: "az storage blob list --account-name stpayrollprod -c payroll-reports --auth-mode login -o table",
    expectedOutput: "Name                             BlobType    Length   BlobTier\n-------------------------------  ----------  -------  --------\nPayroll_Nov2026_Final.csv        BlockBlob   5242880  Hot\nTaxSummary_Q3.pdf               BlockBlob   1048576  Hot",
    safety: "Read-Only / Safe",
    safetyColor: "green",
    troubleshooting: "Verifies whether Entra ID role 'Storage Blob Data Reader' is functioning properly.",
    precautions: "Always pass '--auth-mode login' in modern Zero Trust environments to avoid using Shared Keys."
  },
  {
    id: "cmd-az-role-assignment-list",
    category: "Azure CLI",
    categoryIcon: "user-check",
    command: "az role assignment list",
    syntax: "az role assignment list --assignee <upn-or-spn-id> --all -o table",
    purpose: "List all Azure RBAC role assignments granted to a user, group, or service principal.",
    whenToUse: "Security audits, privilege escalation reviews, or diagnosing permission denied errors.",
    example: "az role assignment list --assignee rsharma@company.com --all -o table",
    expectedOutput: "PrincipalName       RoleDefinitionName    Scope\n------------------  --------------------  ------------------------------------------\nrsharma@company.com Contributor           /subscriptions/sub-01/resourceGroups/rg-prod\nrsharma@company.com Storage Blob Reader   /subscriptions/sub-01/.../stpayrollprod",
    safety: "Read-Only / Safe",
    safetyColor: "green",
    troubleshooting: "Confirms whether an engineer or managed identity has the necessary RBAC permissions at the correct scope.",
    precautions: "Read-only. Requires Reader permission at target scopes."
  },

  // --------------------------------------------------------------------------
  // AZURE POWERSHELL (Az Module)
  // --------------------------------------------------------------------------
  {
    id: "cmd-ps-get-azvm-status",
    category: "Azure PowerShell",
    categoryIcon: "terminal",
    command: "Get-AzVM -Status",
    syntax: "Get-AzVM [-ResourceGroupName <rg>] -Status | Select-Object Name, ResourceGroupName, PowerState",
    purpose: "Retrieve the real-time operational power state of virtual machines using the Az module.",
    whenToUse: "Automated morning shift health check scripts and operational dashboards.",
    example: "Get-AzVM -ResourceGroupName 'rg-payroll-prod' -Status | Select-Object Name, PowerState",
    expectedOutput: "Name           PowerState\n----           ----------\nvm-pay-app01   VM running\nvm-pay-app02   VM running\nvm-pay-db01    VM running",
    safety: "Read-Only / Safe",
    safetyColor: "green",
    troubleshooting: "Identifies VMs that failed to start after automated patching or host maintenance.",
    precautions: "Safe for automated execution in scheduled runbooks."
  },
  {
    id: "cmd-ps-get-azbackups",
    category: "Azure PowerShell",
    categoryIcon: "terminal",
    command: "Get-AzRecoveryServicesBackupJob",
    syntax: "Get-AzRecoveryServicesBackupJob -VaultId <vault.ID> -From <date> -Status <status>",
    purpose: "Query backup jobs within a Recovery Services Vault across a specified time range.",
    whenToUse: "Verifying daily backup completion, monitoring SLA compliance, and auditing failed backups.",
    example: "$vault = Get-AzRecoveryServicesVault -Name 'rsv-payroll-prod'; Get-AzRecoveryServicesBackupJob -VaultId $vault.ID -From (Get-Date).AddDays(-1) | Select-Object WorkloadName, Status, Operation",
    expectedOutput: "WorkloadName   Status      Operation\n------------   ------      ---------\nvm-pay-app01   Completed   Backup\nvm-pay-db01    Completed   Backup",
    safety: "Read-Only / Safe",
    safetyColor: "green",
    troubleshooting: "Quickly pinpoints failed backup jobs (e.g., due to VSS snapshot timeout or VM agent failure).",
    precautions: "Querying across very large timeframes (>30 days) can experience API latency."
  },
  {
    id: "cmd-ps-get-azmetric",
    category: "Azure PowerShell",
    categoryIcon: "terminal",
    command: "Get-AzMetric",
    syntax: "Get-AzMetric -ResourceId <resource-id> -MetricName <metric> -TimeGrain <grain>",
    purpose: "Fetch raw metric data from Azure Monitor for any supported cloud resource.",
    whenToUse: "Automated performance threshold auditing and custom health check generation.",
    example: "Get-AzMetric -ResourceId $vm.Id -MetricName 'Percentage CPU' -TimeGrain 00:05:00",
    expectedOutput: "Metric: Percentage CPU\nTimestamp            Average\n---------            -------\n2026-11-21 14:00:00  42.5\n2026-11-21 14:05:00  88.2",
    safety: "Read-Only / Safe",
    safetyColor: "green",
    troubleshooting: "Extracts quantitative historical data to validate whether a CPU or IOPS spike caused a production timeout.",
    precautions: "Read-only."
  },

  // --------------------------------------------------------------------------
  // MICROSOFT GRAPH POWERSHELL
  // --------------------------------------------------------------------------
  {
    id: "cmd-mg-get-user",
    category: "Microsoft Graph",
    categoryIcon: "code",
    command: "Get-MgUser",
    syntax: "Get-MgUser -UserId <upn-or-id> -Property <properties>",
    purpose: "Retrieve comprehensive user profile attributes, account status, and identity properties from Entra ID.",
    whenToUse: "User administration, JML offboarding checks, and diagnosing disabled account issues.",
    example: "Get-MgUser -UserId 'issacsodari8@gmail.com' -Property DisplayName, AccountEnabled, UserPrincipalName, Department, CreatedDateTime",
    expectedOutput: "DisplayName     AccountEnabled  UserPrincipalName       Department\n-----------     --------------  -----------------       ----------\nIssac Sodari    True            issacsodari@tenant.com  CloudOps",
    safety: "Read-Only / Safe",
    safetyColor: "green",
    troubleshooting: "Verifies if account is disabled (AccountEnabled: False) when user reports sign-in failure.",
    precautions: "Requires User.Read.All scope."
  },
  {
    id: "cmd-mg-user-licenses",
    category: "Microsoft Graph",
    categoryIcon: "code",
    command: "Get-MgUserLicenseDetail",
    syntax: "Get-MgUserLicenseDetail -UserId <user-id>",
    purpose: "List all Microsoft 365 license SKUs assigned to a specific user and individual service plans.",
    whenToUse: "Diagnosing missing app tiles (e.g., user missing Teams or Exchange license) or license cost optimization.",
    example: "Get-MgUserLicenseDetail -UserId 'rsharma@tenant.com'",
    expectedOutput: "SkuId                                 SkuPartNumber\n-----                                 -------------\n6fd2c87f-b296-42f0-b197-1e91e994b900  ENTERPRISEPACK (Office 365 E3)",
    safety: "Read-Only / Safe",
    safetyColor: "green",
    troubleshooting: "Confirms whether the Exchange Online service plan within an assigned license is enabled or disabled.",
    precautions: "Read-only."
  },
  {
    id: "cmd-mg-revoke-session",
    category: "Microsoft Graph",
    categoryIcon: "code",
    command: "Revoke-MgUserSignInSession",
    syntax: "Revoke-MgUserSignInSession -UserId <user-id>",
    purpose: "Immediately invalidate all active refresh tokens and browser sessions for an Entra ID user.",
    whenToUse: "Security incident response, compromised credential remediation, or during employee offboarding.",
    example: "Revoke-MgUserSignInSession -UserId 'compromised_user@tenant.com'",
    expectedOutput: "Value\n-----\nTrue",
    safety: "High Impact Action",
    safetyColor: "red",
    troubleshooting: "Forces immediate re-authentication, kicking unauthorized threat actors out of all active web and mobile apps.",
    precautions: "Will disrupt legitimate user work sessions immediately. Execute with security manager or ticket authorization."
  },

  // --------------------------------------------------------------------------
  // EXCHANGE ONLINE POWERSHELL
  // --------------------------------------------------------------------------
  {
    id: "cmd-exo-message-trace",
    category: "Exchange Online",
    categoryIcon: "mail",
    command: "Get-MessageTrace",
    syntax: "Get-MessageTrace -SenderAddress <sender> -RecipientAddress <recipient> -StartDate <date> -EndDate <date>",
    purpose: "Trace the exact delivery path and status of emails through Exchange Online Protection.",
    whenToUse: "Investigating missing emails, bounce-back complaints, and spam quarantine routing.",
    example: "Get-MessageTrace -RecipientAddress 'payroll@company.com' -StartDate (Get-Date).AddDays(-1) -EndDate (Get-Date)",
    expectedOutput: "Received               Sender             Recipient            Status       Subject\n-------------------    -----------------  -------------------  -----------  -------\n2026-11-21 12:04:12    hr@company.com     payroll@company.com  Delivered    Monthly Bonus\n2026-11-21 12:15:30    vendor@bad.com     payroll@company.com  FilteredAsSpam Invoice Q3",
    safety: "Read-Only / Safe",
    safetyColor: "green",
    troubleshooting: "Shows whether an email was Delivered, FilteredAsSpam, Quarantined, or Failed with NDR.",
    precautions: "Exchange stores real-time trace data for 10 days; historical data up to 90 days requires an extended trace report."
  },
  {
    id: "cmd-exo-mailbox-permission",
    category: "Exchange Online",
    categoryIcon: "mail",
    command: "Get-MailboxPermission",
    syntax: "Get-MailboxPermission -Identity <mailbox> | Where-Object { $_.User -notlike 'NT AUTHORITY*' }",
    purpose: "Audit delegate permissions (Full Access) granted on user and shared mailboxes.",
    whenToUse: "Compliance audits, troubleshooting access denied on shared mailboxes, and offboarding checks.",
    example: "Get-MailboxPermission -Identity 'payrollsupport@company.com' | Where-Object { $_.User -notlike 'NT AUTHORITY*' } | Select User, AccessRights",
    expectedOutput: "User                   AccessRights\n----                   ------------\nissacsodari@tenant.com {FullAccess}\nrsharma@tenant.com     {FullAccess}",
    safety: "Read-Only / Safe",
    safetyColor: "green",
    troubleshooting: "Verifies whether a user has been granted FullAccess and whether automapping is enabled.",
    precautions: "Read-only."
  },

  // --------------------------------------------------------------------------
  // KUSTO QUERY LANGUAGE (KQL)
  // --------------------------------------------------------------------------
  {
    id: "cmd-kql-heartbeat",
    category: "KQL (Log Analytics)",
    categoryIcon: "file-text",
    command: "Heartbeat | summarize LastCall = max(TimeGenerated) by Computer",
    syntax: "Heartbeat | where TimeGenerated > ago(1h) | summarize LastHeartbeat = max(TimeGenerated) by Computer | where LastHeartbeat < ago(15m)",
    purpose: "Detect Virtual Machines whose Azure Monitor Agent has stopped reporting.",
    whenToUse: "Infrastructure availability monitoring and proactive host failure detection.",
    example: "Heartbeat\n| where TimeGenerated > ago(1h)\n| summarize LastHeartbeat = max(TimeGenerated) by Computer\n| where LastHeartbeat < ago(15m)",
    expectedOutput: "Computer          LastHeartbeat\n---------------   -----------------------------\nvm-pay-app02      2026-11-21T13:45:00Z",
    safety: "Read-Only / Safe",
    safetyColor: "green",
    troubleshooting: "Quickly pinpoints VMs that have crashed, lost network connectivity, or had the AMA agent stop.",
    precautions: "KQL queries are strictly read-only and have zero impact on live workload performance."
  },
  {
    id: "cmd-kql-signin-failures",
    category: "KQL (Log Analytics)",
    categoryIcon: "file-text",
    command: "SigninLogs | where ResultType != 0",
    syntax: "SigninLogs | where TimeGenerated > ago(24h) and ResultType != 0 | summarize FailureCount = count() by ResultType, ResultDescription | top 5 by FailureCount",
    purpose: "Aggregate top authentication failure reasons across the organization.",
    whenToUse: "Investigating tenant-wide login spikes, brute force attacks, or widespread Conditional Access policy blocks.",
    example: "SigninLogs\n| where TimeGenerated > ago(24h) and ResultType != 0\n| summarize FailureCount = count() by ResultType, ResultDescription\n| top 5 by FailureCount desc",
    expectedOutput: "ResultType  ResultDescription                                        FailureCount\n----------  -------------------------------------------------------  ------------\n50126       Invalid username or password.                            412\n50074       Strong Authentication is required.                       185\n53003       Blocked by Conditional Access policies.                   94",
    safety: "Read-Only / Safe",
    safetyColor: "green",
    troubleshooting: "Isolates systemic authentication issues and correlates them to specific Entra ID policy updates.",
    precautions: "Requires Diagnostic Settings streaming Entra ID SigninLogs to Log Analytics Workspace."
  }
];
