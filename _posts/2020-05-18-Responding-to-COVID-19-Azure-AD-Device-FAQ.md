---
title: "Responding to COVID-19: Azure AD Device FAQ"
date: 2020-05-18 00:00:00 +0800
categories:
  - Device Registration
tags:
  - Device Registration
  - Join Types
  - EntraID Devices
  - DeviceManagement
  - IdentityAndSecurity
---
Responding to COVID-19 (aka. coronavirus) crisis, employees started working from home, and we start receiving many queries about Azure AD Devices. In this article, I am going to answer the most frequently asked questions.
<br><br>
## Does it worth to connect my user’s devices to Azure AD while they are working remotely?!!<br>
By connecting devices to Azure AD, you will reach the best user experience as Azure AD enables single sign-on to devices, apps, and services from anywhere through connected devices. Also, IT professionals get controls they need to manage and secure your organization resources. For more information, kindly visit [https://docs.microsoft.com/en-us/azure/active-directory/devices/overview#getting-devices-in-azure-ad](https://docs.microsoft.com/en-us/azure/active-directory/devices/overview#getting-devices-in-azure-ad) <br>

## What are the available types of connecting devices to Azure AD? <br>
You can connect devices to Azure AD in three different types: Azure AD Registered, Azure AD Joined or Hybrid Azure AD joined depends on your infrastructure. For more information, kindly visit [https://docs.microsoft.com/en-us/azure/active-directory/devices/overview#getting-devices-in-azure-ad](https://docs.microsoft.com/en-us/azure/active-directory/devices/overview#getting-devices-in-azure-ad) <br>

## Do I need an additional license to connect my device to Azure AD? <br>
No, you don’t need an additional license. As soon as you have Azure AD free license which is enabled by default once you have any of office 365 license, any user can connect his device to Azure AD. <br>

## I am working remotely from home, and I am not able to access Office 365 services after resetting my password from my Azure AD joined device. <br>
After resetting your password, you need to log off and login back again with the new password to take a new valid Azure AD PRT which is responsible for Single Sign-On. <br>

## I am working remotely from home, and I am not able to access Office 365 services after resetting my password from my Hybrid Azure AD joined device. <br>
When resetting your password on Hybrid Azure AD joined device, you need to make sure that you have a line of sight to the Domain Controller. So, if you are outside the corporate network, you need to make sure that you are connected via VPN. Then, you need to log off and login back again with the new password to take a new valid Azure AD PRT which is responsible for Single Sign-On.<br>

## Do I still have access to Office 365 resources from Hybrid Azure AD joined device while I am working remotely outside my corporate network? <br>
Yes, you will still have access to O365 resources from Hybrid Azure AD joined devices from outside the corporate network unless you changed your password. <br>

## Is there a way to keep having access to Office 365 resources from Hybrid Azure AD joined devices even if I changed my password while I am outside the corporate network? <br>
If you are using Windows Hello for Business (WHfB) to sign into a Hybrid Azure AD joined device, you will remain having the ability to access Office 365 resources even after you change your password. <br>

## How can I verify the health status of my Azure AD device? <br>
You can verify the health status for all join types (Hybrid Azure AD joined, Azure AD Joined and Azure AD Register) using [Device Registration Troubleshooter Tool](https://aka.ms/DSRegTool)<br>

## How can I verify that Single Sign-On (SSO) is working as expected on my device?  
You can run “dsregcmd /status” command from Hybrid Azure AD joined, or Azure AD joined device and verify if “**AzureAdPrt**” equals “**YES**”. For more information, kindly visit the link: https://docs.microsoft.com/en-us/azure/active-directory/devices/troubleshoot-device-dsregcmd#sso-state <br>

## As an IT professional, I want to understand Hybrid Azure AD device registration steps. 
Device registration high-level steps for Hybrid Azure AD joined: 

1. The device tries to retrieve tenant id and the domain name from registry [HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\CDJ\AAD].
2. If it fails, the device communicates with Local AD (config partition) to get the tenant’s information form Service Connection Point (SCP). You can get SCP information using Device Registration SCP Tool PowerShell.
3. Then, the device communicates with the Azure AD tenant.
4. The device authenticates against either Azure AD or federation service (e.g. ADFS).
5. The device registration process finishes.
6. <br>
For more information, kindly visit the link: [Hybrid Azure AD Device Registration](/_posts/2019-10-20-Hybrid-Azure-AD-Device-Registration.md)<br>

## Why are we facing delays in getting remote devices connected to Azure AD as Hybrid Azure Active Directory join?
Many customers are facing delays in getting devices registered. The time taken to complete device registration depends on many aspects, for example:

- The domain’s type ( Managed or Federated)
- Does the remote device have a line of sight to DC via VPN
- Did the device synced to AAD (with Managed domains)
- When does the device registration process trigger?
For more information, visit Configure hybrid Azure Active Directory join for remote users. <br>

## As an IT professional, I want to know if there is a way to troubleshoot device registration issues. 
You can use the [Device Registration Troubleshooter Tool](https://aka.ms/DSRegTool), which performs more than 30 different tests. This tool helps to identify and fix the most common device registration issues for all join types (Hybrid Azure AD joined, Azure AD Joined and Azure AD Register). <br>

## I am working from home, and I am not able to access cloud resources as Conditional Access Policy mentioned my device is not registered. However, it is connected to Azure AD. 
You have to be sure that the device is connected to Azure AD successfully and verify Azure AD PRT value. For more information, kindly visit the link: [https://docs.microsoft.com/en-us/azure/active-directory/devices/troubleshoot-device-dsregcmd#sso-state](https://docs.microsoft.com/en-us/azure/active-directory/devices/troubleshoot-device-dsregcmd#sso-state )
