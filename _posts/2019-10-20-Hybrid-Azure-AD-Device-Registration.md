---
title: "Hybrid Azure AD Device Registration"
date: 2019-10-20 00:00:00 +0800
categories:
  - Device Registration
tags:
  - Device Registration
  - Join Types
  - EntraID Devices
  - DeviceManagement
  - IdentityAndSecurity
---
In this article, I am discussing device registration for hybrid Azure AD joined devices.
First of all, let’s go through device registration steps:
1. The device tries to retrieve tenant id and domain name from registry [HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\CDJ\AAD].
2. If it fails, the device communicates with Local AD (config partition) to get the tenant’s information form Service Connection Point (SCP). You can get SCP information using [Device Registration Troubleshooter Tool](https://aka.ms/DSRegTool) PowerShell.
3. Then, the device tries to communicate with Microsoft resources under the system context. You can verify if the device can access Microsoft resources under the system account by using the [Test Device Registration Connectivity](https://learn.microsoft.com/en-us/samples/azure-samples/testdeviceregconnectivity/testdeviceregconnectivity/) script.
4. The device authenticates against either Azure AD or federation service (e.g. ADFS).
5. The device registration process finishes.

### Managed vs Federated
In this section, let’s discuss device registration high level steps for Managed and Federated domains
#### Managed Domain
- The device generates a **certificate**. This certificate will be stored under the computer object in local AD.
- AAD Connect application syncs all computer objects that have the ‘**user certificate**’ attribute populated to Azure AD in the next synchronization cycle. (the device will show in Azure AD as a hybrid Azure AD device, and the
- The device **communicates** with Azure AD once again to register itself.
- Azure AD **compares** the device’s certificate with what it has in Azure AD.
- If the device certificates <ins>matched</ins>, the device will be connected to Azure AD as Hybrid Azure AD joined, hence “Registered” value of Azure AD device object will be populated.

#### Federated Domain
- The device communicates with Azure AD to register itself using the SCP.
- Azure AD redirects the device to authenticate against the federation server.
- The device takes a token from the federation server and pass it to Azure AD to register itself.
-  Device registration finishes, and the device present in Azure AD devices section.

### Things to know:
- Device registration in federated domains is faster than managed domains since it does not wait the sync cycle.
- Identity provider should support the following (they are already supported in ADFS):
  - WS-Trust protocol: for windows current versions.
  - WIAORMULTIAUTHN claim : for down-level devices.
- Starting from 1803, if device registration fails with federated domain, it will try to complete the registration using the synced computer/device.
- 1703 or earlier, if the organization requires access to the internet via an outbound proxy, Web Proxy Auto-Discovery (WPAD) must be implemented.
- Starting from 1709, WPAD can be implemented via GPO.
- To verify if the device is able to access Microsoft resources under the system account to register itself, you can use [Test Device Registration Connectivity](https://learn.microsoft.com/en-us/samples/azure-samples/testdeviceregconnectivity/testdeviceregconnectivity/) script.
- Windows 10 devices registered under the machine context.
- Windows down-level registered under the user context.
- Hybrid Azure AD join is currently not supported:
  - If your environment consists of a single AD forest synchronizing identity data to more than one Azure AD tenant.
  - Windows current devices with non-persistent virtual desktop infrastructure (VDI).
  - For FIPS-compliant TPM.
  - For Windows Server running the Domain Controller (DC) rule.
  - On Windows down-level devices when using credential roaming or user profile roaming
- When using “Sysprep” tool with pre-Windows 10 1809 images for installation, make sure that the image is not from a device that is already registered with Azure AD as Hybrid Azure AD join.
- If you are relying on a Virtual Machine (VM) snapshot to create additional VMs, make sure that snapshot is not from a VM that is already registered with Azure AD as Hybrid Azure AD join.
- Dual state being avoided starting from:
  - Windows 10 1809 release
  - Windows 10 1803 release with KB4489894
 
### Important scripts:
[Device Registration SCP Tool](https://aka.ms/DSRegTool)

[Test Device Registration Connectivity](https://learn.microsoft.com/en-us/samples/azure-samples/testdeviceregconnectivity/testdeviceregconnectivity/)

[Hybrid Azure AD Joined Devices Health Checker](https://github.com/mzmaili/HybridDevicesHealthChecker)

