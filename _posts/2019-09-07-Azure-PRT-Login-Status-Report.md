---
title: "Azure PRT Login Status Report"
date: 2019-09-07 00:00:00 +0800
categories:
  - Device Registration
tags:
  - Device Registration
  - Join Types
  - EntraID Devices
  - DeviceManagement
  - IdentityAndSecurity
---
When the user login successfully to Hybrid Azure AD device or Azure AD joined device, he acquires AzureAD PRT which is extremely important to enable Single Sign-on (SSO) and to pass Azure AD Conditional Access Policies that deals with “**Hybrid Azure AD**” and/or “**Complaint**” devices.

Azure AD PRT can be validated by running “**dsregcmd /status**” command as the logged on user. But coming form the fact that it is not an easy process to verify the AzureAD PRT for a huge number of users on their devices as the verification should happen under the user account.

In this article, I am  providing a solution to verify AzureAD PRT, Enterprise PRT and Windows Hello for Business (WHfB) status using a new PowerShell script I wrote.

AzurePRTLoginReport PowerShell script checks AzureAD PRT, Enterprise PRT and Windows Hello for Business (WHfB) status of the users who logged on to Hybrid Azure AD Joined and Azure AD Joined devices. After verifying the above, this PowerShell script shows the result on the Shell screen, grid view and generates CSV/Excel report.

### Why is this script useful?
- To check AzureAD PRT, Enterprise PRT status for the logged on user.
- To check Windows Hello for Business (WHfB) status for the logged on user.
- To automate a schedule task that checks the logged on user status.
- To generate a friendly CSV/Excel report with the status.
- To show the result on Grid View, so you can easily search in the result.

### What does this script do?
1. Checks AzureAD PRT status.
2. Checks Enterprise PRT status.
3. Checks Windows Hello for Business status.
4. Generates CSV/Excel report with the result.

### Prepare the setup before executing the script:
1. Configure shared folder:
    - Create a folder with the name of “UsersLogin” on the file server or the shared storage.
    - Share the folder with a meaningful name (e.g. UsersLogin).
  > [!NOTE]
    Note: you can add “$” character at the end of the share name to make it hidden.
 
2. Create batch file:
- Create a batch file to be run when the user logon to his machine.
- Name the batch file with a meaningful name (e.g. UserLoginInfo.bat).
- Add the following command to the batch file:
  ```PowerShell
  dsregcmd /status > \\FileServer\UsersLogin$\%username%–%computername%.txt
  ```

3. Configure GPO:
- Open “Group Policy Management Console” on domain controller and create a new GPO with a meaningful name (e.g. UserLoginInfo).
- Edit the above created GPO, and open “User Configuration\Windows Settings\ Scripts (Logon/Logoff)”.
- Choose Logon and add the above created batch file.
- Link the GPO to the needed OU, site or domain.

**Now you are ready to execute the PowerShell command to verify Azure PRT status.**

You can always download the updated version directly from the link: [Azure AD PRT Login Report](https://github.com/mzmaili/AzurePRTLoginReport)

### User experience:
- Checking PRT: <br>
  ![Screenshot showing AzurePRTLoginReport script](/assets/images/AzurePRTLoginReport-1.png "AzurePRTLoginReport") 

- The output report: <br>
  ![Screenshot showing AzurePRTLoginReport script CSV output](/assets/images/AzurePRTLoginReport-2.png "AzurePRTLoginReport") 
