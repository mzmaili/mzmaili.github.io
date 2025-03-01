---
title: "Configure Hybrid Azure AD joined with non-persistent VDI"
date: 2019-10-08- 00:00:00 +0800
categories:
  - Device Registration
tags:
  - Device Registration
  - Join Types
  - EntraID Devices
  - DeviceManagement
  - IdentityAndSecurity
---
When configuring Hybrid Azure AD joined devices with non-persistent Virtual Desktop Infrastructure (VDI) we face the following challenges:
- Non-persistent VDI machine created when a user signs in, and it destroyed once the user signs out.
- Non-persistent VDI machine connects to Azure AD as hybrid Azure AD joined device when a user signs into it, and if auto hybrid Azure AD join configured correctly.
- Users should sign into a hybrid Azure AD device to acquire Azure PRT which is responsible for single sign on (SSO), and which allows users to pass device-based conditional access policy that requires the user to sign in form hybrid Azure AD device.
- If a non-persistent VDI machine took time to connect itself to Azure AD during the user’s login, the user will sign into a non-hybrid device, and he will not be able to acquire Azure PRT. Hence, SSO will not work for him, and he will be blocked by any device-based conditional access policy that requires the access from hybrid device.
- Azure AD device object remains exist, although the non-persistent VDI machine has destroyed and does not exist anymore after the user signs out from it. This ends up with a huge number of stale device objects in Azure AD.
- Azure AD stale devices should be cleaned up periodically to avoid keeping unwanted objects in Azure AD tenant, and reaching the default quota limit which may cause service interruption due to running out of quota.

In this article, I am demonstrating the steps to configure Hybrid Azure AD joined devices with non-persistent VDI for federated environments taking the above challenges into account.

**Before we start, Keep in mind that Hybrid Azure AD joined for non-persistent VDI (NPVDI) for federated environments requires additional considerations in order to be supported. For more information about supported scenarios, check [supported scenarios](https://docs.microsoft.com/en-us/azure/active-directory/devices/howto-device-identity-virtual-desktop-infrastructure#supported-scenarios) document.**

Now, lets continue. Our goal is to make the user sign in successfully to a hybrid Azure AD domain joined device and acquire Azure PRT which gives him the ability to utilize single Sign-On (SSO), as well as, allows him to access Office 365 resources by passing any conditional access policy requires the access from trusted devices like hybrid Azure AD joined devices.

In the following steps, we will accomplish the following:
- Create a GPO and attach it to VDI machines to run a batch file that executes the command “**dsregcmd /join**” to register the machine to Azure AD when it starts and before the user login to it. (since the user needs to login a connected machine to acquire Azure PRT).
- Configure the same GPO to run another batch file that executes the command “**autoworkplace.exe /leave**” to disconnect the machine from Azure AD when the user sign out. (since the machine destroys once the user log out). <br>
  > This step is only needed for down-level devices, and we do not want to run “dsregcmd /leave” command for current level OS versions.

### 1. Configure join batch file:
- Create a batch file to be run when the user logon to the machine.
- Name the batch file with a meaningful name (e.g. VDIJoin.bat).
- Add the following command to the batch file:<br>
  **dsregcmd /join**

### 2. Configure disjoin batch file (<ins>this step is needed only for down-level devices</ins>):
- Create a batch file to be run when the user log off form the machine.
- Name the batch file with a meaningful name (e.g. VDIDisjoin.bat).
- Add the following command to the batch file:<br>
  **autoworkplace.exe /leave**

### 3. Configure Startup GPO:
- Open “Group Policy Management Console” on domain controller and create a new GPO with a meaningful name (e.g. VDIHybridDevices).
- Edit the above created GPO, and open “Computer Configuration\Windows Settings\ Scripts (Startup/Shutdown)”.
- Choose **Startup** and add the above created batch file in first step.
- Open “User Configuration\Windows Settings\ Scripts (Logon/Logoff)”.
- If you have down-level devices, choose **Logoff** and add the above created batch file in second step.
- Link the GPO to the needed OU that contains NPVDI machines.

Now, we have created the needed GPO so that the machine will be connected to AAD as hybrid Azure AD joined device once it starts, and the user will be able to get PRT and SSO will work when he signs into it as he will sign into a hybrid device.

The next challenge is to avoid keeping unwanted device objects in Azure AD tenant and reaching the default quota limit, you can accomplish this and automate cleaning Azure AD stale devices in an efficient way using Azure AD Device Cleanup script keeping in mind that for non-persistent VDI deployments on Windows current and down-level, you should delete devices that have **ApproximateLastLogonTimestamp** of older than 15 days.

<ins>**Very important notes before you go:**</ins>
- Consider using a prefix for the display name (e.g. NPVDI-) for non-persistant VDI devices to make it easier when implementing cleanup strategy.
- Keep track your Azure AD quanta limit, specially when having large number of VDI machines. For more information, kindly visit [the link](https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/azure-subscription-service-limits#active-directory-limits).
- **DO NOT** execute dsregcmd /leave as part of shutdown/restart process of windows current devices (Windows 10, Windows Server 2016, and Windows Server 2019).
- For Windows down-level (Windows 7, Windows 8.1, Windows Server 2008 R2, Windows Server 2012, and Windows Server 2012 R2), the device will be connected to Azure AD as hybrid device once the user login to it and it will not use “dsregcmd /join” command.
- To clean Windows down-level devices from Azure AD when the user sign out, you can add “autoworkplace.exe /leave” command to the above created GPO.
- Internet connectivity to the following Microsoft resources under the system context should be allowed automatically once Windows 10 device starts to get it registered before the user signs in:
  - https://login.microsoftonline.com
  - https://device.login.microsoftonline.com
  - https://enterpriseregistration.windows.net
- You can verify if the device can access the above Microsoft resources under the system account by using the [Test Device Registration Connectivity](https://learn.microsoft.com/en-us/samples/azure-samples/testdeviceregconnectivity/testdeviceregconnectivity/) script.
- Make sure that the golden/original VDI image is not connected to Azure AD as hybrid device. So, the new VDI machines will register to Azure AD when it starts with a unique device ID.
- If you are relying on the System Preparation Tool (sysprep.exe) and if you are using a pre-Windows 10 1809 image for installation, make sure that image is not from a device that is already registered with Azure AD as hybrid Azure AD joined.
- If you are relying on a Virtual Machine (VM) snapshot to create additional VMs, make sure that snapshot is not from a VM that is already registered with Azure AD as Hybrid Azure AD join.
- You can use [Azure PRT Login Status Report](https://github.com/mzmaili/AzurePRTLoginReport) script to validate Azure PRT.

- 
