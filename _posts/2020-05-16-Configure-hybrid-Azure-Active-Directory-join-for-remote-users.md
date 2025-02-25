---
title: "Configure hybrid Azure Active Directory join for remote users"
date: 2020-05-16 00:00:00 +0800
categories:
  - Device Registration
tags:
  - Device Registration
  - Join Types
  - EntraID Devices
  - DeviceManagement
  - IdentityAndSecurity
---
The number of users working from home (WFH) increases in the response of COVID-19 (aka. coronavirus) outbreak, and we need to make sure that identities and their information remain protected and secured by connecting devices to Azure AD and configuring Device-based Conditional Access Policy.<br>

Previously, I shared an article and discussed how to [Increase productivity and protection by connecting devices to AAD and configuring Device-based Conditional Access Policy](https://web.archive.org/web/20240227065750/https://azureera.com/configuring-device-based-conditional-access-policy/). <br>

We are receiving lots of queries from customers who are facing challenges in configuring Hybrid Azure AD joined for the remote domain-joined device where users are working from home.<br>

In this article,  we will discuss one of the most repeated challenges, which is connecting remote domain-joined devices to Azure AD as Hybrid Azure AD Joined devices. Also, we will make it more transparent to deal with this challenge to reach out to our needs.<br>

One of the most important prerequisites is making sure that the device has a line of sight to Domain Controller as discussed before in device registration high-level steps. Windows 10 device needs to communicate with the Domain Controller during the device registration process due to the following facts:
1. Retrieve the Service Connection Point (SCP) information, which has Tenant ID and Domain Name, where the device will be registered.
2. Push the self-signed certificate under Active Directory computer account in the _userCertificate_ attribute, and this is a mandatory step to get the device registered for managed domains. Also, to get the device registered if the authentication failed against the federation server, so the device registration falls back to sync join and goes through managed domains steps; this applies for windows 10 1803 and above.

So it is a must to have a line of sight to Domain Controller either by setting inside the corporate network or by connecting to VPN. Without the connection to Domain Controller, the whole device registration process is going to fail.<br>

Many customers are facing delays in getting devices registered. The time taken to complete device registration depends on when the registration process triggers and also depends on the type of domain it is Federated or Managed.<br>

The device registration process triggers when a user signs in to his device. The challenge for most remote users is that they connect to VPN after sign in to the device. So device registration does not succeed as before connecting to the VPN, remote devices do not have a line of sight to DC. Therefore, to get the device registered after VPN, the user needs to trigger device registration manually using one of the following options, this requires the user to have local admin permissions on his remote device.
1. Open Task Scheduler as admin, and run “**Automatic-Device-Join**” task which is located under the path:
    - **Task Scheduler Library >  Microsoft > Windows > Workplace Join**
2. Run CMD as admin, and run the following command:
    - **schtasks /Run /TN “Microsoft\Windows\Workplace Join\Automatic-Device-Join”**

Many IT professionals do not allow end-users to have local admin permissions on their devices. In this case, users will have a delay, and they need to wait an hour to get the device registration process triggers as the device registration process is hardcoded to trigger every hour if the device is domain-joined.<br>

Another delay users are going to face if one of the following applies:
- Users have Managed domain, which requires sync device objects to AAD using AAD connect that syncs objects to AAD every 30 minutes, the default sync cycle.
- Users have Federated domain, and device registration failed against the federation service, so the device will fallback to sync join and uses Managed domain steps. This applies to windows 10 1803 versions and above.

### In conclusion, kindly find the following points:
- Remote users should connect to the VPN to have a line of sight to DC. Then, they need to trigger the device registration process manually if they have local admin permissions. Otherwise, they need to wait an hour to get the device registration process trigger automatically.
- If remote users’ domain is federated, the device registration completes, and the device gets registered directly after the device registration process triggers.
- With a federated domain, if the remote user does have admin permissions, he can trigger the device registration process as described earlier, and he gets his device registered in a matter of seconds.
- With a federated domain, if the remote user does not have admin permissions, he needs to wait an hour to get his device registered. So the delay will be up to one hour after he signs in and connects his device to VPN.
- With managed domains, there are lots of aspects that increase the delay as the following steps should be completed in order:
  - User needs to be connected to the VPN.
  - Device registration process triggers; the device creates a self-signed certificate and pushes it under the AD computer account.
  - AAD Connect syncs the computer object to AAD in its next sync cycle.
  - The device registration process triggers again; the device finds itself in AAD and registers itself successfully.
- With managed domains, if the user does have admin permissions, he can trigger the device registration process manually. Still, he needs to make sure that the device object synced successfully to AAD using AAD Connect before trigger the second device registration process. The delay in this scenario could be up to 30 minutes, which is the default sync cycle.
- With managed domains, if the user does not have admin permissions, delay takes a longer time to get the device registered, which could be up to two hours. In this scenario, after the user signs in and connects to the VPN, he needs to wait an hour to trigger the first device registration process, which creates the self-signed certificate. Then, he needs to wait for the next sync cycle to sync the computer object to AAD. After that, the user needs to keep waiting for the second device registration process to trigger (after an hour) to get the device registered.

### Reduce device registration time
In the next section of this article, I am going to discuss how we can reduce this delay from hours to minutes to get remote devices connected to Azure AD as Hybrid Azure AD Joined devices.<br>

To reduce the delay, especially for remote users who do not have admin permission, we need to think of triggering the device registration process in less than one hour. To accomplish this, we can create the following Group Policy Object that triggers the device registration process every 15 minutes (for example) after it confirms that the device is not connected to AAD.
1. Configure a shared folder:
    - Create a folder with the name of “Scripts” on the file server or the shared storage.
    - Share the folder with a meaningful name (e.g., Scripts).
     > Note: you can add a “$” character at the end of the share name to make it hidden.
2. Create a batch file:
    - Name the batch file with a meaningful name (e.g., Start-DsRegCMD.bat).
    - Add the following command lines to the batch file:
      ```powershell
      dsregcmd /status | findstr /c:”AzureAdJoined : NO”
      if errorlevel 1 (echo notfound) else (schtasks /Run /TN “Microsoft\Windows\Workplace Join\Automatic-Device-Join”)
3. Configure GPO:
    - Open “**Group Policy Management Console**” on the domain controller and create a new GPO with a meaningful name (e.g., DsRegCMD- Task).
    - Link the GPO to the desired Organizational Unit (OU).
    - Edit the above created GPO, and open “Computer Configuration\Preferences\Control Panel Setings\Scheduled Tasks”.
    - Right-click and choose **New > Scheduled Task (At least Windows 7)**
      image
    - In "**General**" tab, configure the following:
      - Choose “**update**” from the “**Action**” dropdown list.
      - Name the task e.g., “**Start-DsRegCMD**”
      - in “when running the task, use the following user account” box, choose “**NT AUTHORITY\System**”
      - Check the “Run with highest privileges” option.
    - In “**Triggers**“ tab, create a new trigger and make it repeat every 15 minutes as the following:
    - In “**Actions**“ tab, create the following new action to run the previously created batch file:
    - In “**Conditions**”  tab, check “**Start only if the following network connection is available**” option and choose “**any connection**” from the dropdown list.
    - In “**Settings**” tab, check both “**Allow task to be run on demand**” and “**If the running task does not end when requested, force it to stop**” options.

After creating the GPO, now we need it to be updated on the user’s machine. End-user can run the “**gpupdate /force**” command even if he does not have admin permissions, and the new task will be created.<br>

Additionally, Group Policy refreshed when a user logs on. It also periodically refreshed; by default, this periodic refresh is performed every 90 minutes with a randomized offset of up to 30 minutes. For more information, visit [Refresh Group Policy](https://docs.microsoft.com/en-us/windows-server/networking/core-network-guide/cncg/server-certs/refresh-group-policy) <br>

Finally, by having the above task scheduler created, the device registration time will be reduced for normal remote end-users to be 15 minutes for federated domains, and up to 30 minutes for managed domains.<br>

Hope this helps, and please stay safe at home 😊








