---
title: "Azure AD devices connection types"
date: 2019-10-01 00:00:00 +0800
categories:
  - Device Registration
tags:
  - Device Registration
  - Join Types
  - EntraID Devices
  - DeviceManagement
  - IdentityAndSecurity
---
In a previous article I described why [Do I really need to connect my device to Azure AD](/device%20registration/Do-I-really-need-to-connect-my-device-to-Azure-AD/).
In this article I will describe the available types of having devices connected to Azure AD to gain the benefits of utilizing Office 365 services, and when to use each one of them.


We can connect devices to Azure AD using the following ways:

### Azure AD Registered
- Used for personal devices
- Bring Your Own Device (BYOD)
- Users sign in using the local machine’s account
- Devices could be managed using Intune
- Can be used with the following Operating systems:
  - IOS
  - MacOS
  - Android
  - Windows 10
 
### Azure AD Joined
- Used for company owned devices
- Choose Your Own Device (CYOD)
- Used with windows 10 devices only
- Devices will be joined to Azure AD domain only
- All synced users can be able to login to the machine by default
- Devices could be managed using Intune

### Hybrid Azure AD Joined
- Used for company owned devices
- Choose Your Own Device (CYOD)
- Once the device connected to the local domain, it will be connected automatically to Azure AD
- Devices could be managed by GPO, CCM and/or Intune.
- Used with Windows operating systems.
  - Current devices: Windows 10, Windows Server 2016, and Windows Server 2019
  - Down-level Devices: Windows 7, Windows 8.1, Windows Server 2008 R2, Windows Server 2012, and Windows Server 2012 R2
  
> Note: you can connect your device to Azure AD as long as you have Azure AD license even the free one, and you do not need to pay any extra license.
