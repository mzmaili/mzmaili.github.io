---
title: "Azure AD Pending Devices"
date: 2019-12-24 00:00:00 +0800
categories:
  - Device Registration
tags:
  - Device Registration
  - Join Types
  - EntraID Devices
  - DeviceManagement
  - IdentityAndSecurity
---
Do you have pending devices in your Azure AD tenant? If so, then this article is definitely for you 🙂

Pending devices indicates that the device has been synchronized successfully using Azure AD connect form your on-premise Active Directory and it is ready for device registration, but is not registered to Azure AD yet.

This also means that the device object in Azure AD waits the device registration process to be triggered and complete successfully to get the device connected to Azure AD as hybrid Azure AD joined device as needed. Learn more about [Hybrid Azure AD Device Registration](/device%20registration/Hybrid-Azure-AD-Device-Registration/) procedure.

The device state could be changed from having a registered state to PENDING, if one of the following actions:
- The device deleted from Azure AD, and then synced back form the on-premise Active Directory.
- The device removed from sync scope and added back.
  
Due to the fact that it is not easy to search for all PENDING devices in Azure AD devices blade. **Get-AADPendingDevices** PowerShell script gives you the power to accomplish the following:
- Retrieve all pending devices from an Azure AD tenant.
- Manage pending devices by removing them form Azure AD tenant.

### Why is this script useful?
- To check pending devices in Azure AD tenant.
- To generate a powerful Excel report with the pending devices.
- To automate Azure AD pending devices cleanup procedure by running it in a scheduled task.
- To show the result on CSV or/and Grid View or/and Excel, so you can easily search in the result.

### What does this script do?
- Verifies the pending devices as per the entered threshold days.
- Cleans pending devices from Azure AD.
- Checks if ‘MSOnline‘ module is installed and updated. If not, it takes care of this.
- Checks if ‘ImportExcel‘ module is installed. If not, it installs and imports it.

### User experience:
- If there is no pending devices in AAD tenant:<br>
  ![Screenshot showing Get-AADPendingDevices script](/assets/images/Get-AADPendingDevices-1.png "Get-AADPendingDevices") 

- CSV file output: <br>
  ![Screenshot showing Get-AADPendingDevices script CSV output](/assets/images/Get-AADPendingDevices-2.png "Get-AADPendingDevices") 

- Excel output: <br>
  ![Screenshot showing Get-AADPendingDevices script Excel output](/assets/images/Get-AADPendingDevices-2.png "Get-AADPendingDevices") 


You can always download the updated version directly from the link: [https://github.com/mzmaili/AADPendingDevices](https://github.com/mzmaili/AADPendingDevices)
