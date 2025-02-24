---
title: "Do you have dual state devices in your AAD tenant?"
date: 2024-10-24 00:00:00 +0800
categories:
  - Device Registration
tags:
  - Device Registration
  - Join Types
  - EntraID Devices
  - DeviceManagement
  - IdentityAndSecurity
---
# Do you have dual state devices in your AAD tenant?
We have observed recently many customers are asking why they do see the same device has two device objects on Azure AD, and connected twice to Azure AD as Azure AD Registered and Hybrid Azure AD Joined device.<br><br>
In this article, I am going to describe what does dual state mean and how to get rid of this state in the recommended way in the following points:
<br><br>
- Dual state appears when the device being connected to Azure AD as Azure AD Registered, and you enable Hybrid Azure AD Joined. So the device will be connected twice to Azure AD, and you will see two different computer objects for the same device name.
<br><br>
- Starting form Windows 10 1803, with [KB4489894](https://support.microsoft.com/en-us/topic/march-19-2019-kb4489894-os-build-17134-677-6e393b3e-9fec-a83d-9026-16a1a15131f0) applied, dual state being removed automatically from the device itself.
<br><br>
- For pre-Windows 10 1803, its recommended to upgrade them to 1803 (with [KB4489894]([https://web.archive.org/web/20240227065750/https://support.microsoft.com/en-us/help/4489894/windows-10-update-kb4489894](https://support.microsoft.com/en-us/topic/march-19-2019-kb4489894-os-build-17134-677-6e393b3e-9fec-a83d-9026-16a1a15131f0)) applied) at least to remove dual state. Otherwise, dual state should be removed manually from the device itself.
<br><br>
- Also, IT professionals can execute the [cleanup tool](https://download.microsoft.com/download/8/e/f/8ef13ae0-6aa8-48a2-8697-5b1711134730/WPJCleanUp.zip) on pre-Windows 10 1803 devices (by GPO or SCCM) which will unjoin the device and clean workplace account. The device will re-join automatically on the next sign-in.
<br><br>
- You can prevent your domain joined device from being Azure AD registered (which may led to dual state) by adding this registry key:
  - HKLM\SOFTWARE\Policies\Microsoft\Windows\WorkplaceJoin, create REG_DWORD value BlockAADWorkplaceJoin = 1.
<br><br>
- Removing dual state from the devices themselves may not remove them from AAD, so we need to remove them from AAD manually.
<br><br>
- It is recommended to disable stale devices for a grace period before deleting them because you cannot undo a deletion. For more info, visit the link: [How to: Manage stale devices in Azure AD]([https://web.archive.org/web/20240227065750/https://docs.microsoft.com/en-us/azure/active-directory/devices/manage-stale-devices](https://docs.microsoft.com/en-us/azure/active-directory/devices/manage-stale-devices)).
<br><br>
- You can use the following PowerShell script to verify, disable and clean stale devices from AAD: [https://aka.ms/AADDeviceCleanup](https://aka.ms/AADDeviceCleanup)
<br><br>
- Also, you can use the following PowerShell script to troubleshoot all devices join types, verify health state for the device including if it is in dual state or not.
  - [https://aka.ms/DSRegTool](https://aka.ms/DSRegTool)
<br><br>
- Using the following script, you can verify the health status for multiple devices remotely including dual state, and get HTML report when choosing the correct parameter:
[http://aka.ms/HAADJHealthChecker](http://aka.ms/HAADJHealthChecker)
<br><br>
Stay safe until the next article 🙂
