---
title: "Increase productivity and protection by connecting devices to AAD and configuring Device-based Conditional Access Policy"
date: 2020-04-05 00:00:00 +0800
categories:
  - Device Registration
tags:
  - Device Registration
  - Join Types
  - EntraID Devices
  - DeviceManagement
  - IdentityAndSecurity
---
The number of users working from home (WFH) increases in response of COVID-19 (aka. coronavirus) outbreak, and we need to make sure that identities and their information remain protected and secured by connecting devices to Azure AD and configuring Device-based Conditional Access Policy.

Previously, I shared an article that answers [Do I really need to connect my device to Azure AD?](2019-09-07-Do-I-really-need-to-connect-my-device-to-Azure-AD.md)! and in this article we will discuss how to configure device-based Conditional Access Policies.

When configuring Device-based Conditional Access Policy, customer falls into one of the following scenarios:

### Scenario #1: Cloud customers with no Azure AD Premium license or Intune license.

To configure Device-based conditional access, cloud customers should have both Azure AD Premium license and Intune license. Cloud customers who are not having both licenses, can enable [Azure Active Directory Premium free for one month and sign up for a Microsoft Intune free trial for 30 days](https://azure.microsoft.com/en-us/trial/get-started-active-directory/).

After enabling the tenant for both Azure AD Premium license and Microsoft Intune license, cloud customers will have both Azure AD Premium and Intune licenses and they can go with <ins>**scenario #3**</ins> in this article.

### Scenario #2: Cloud customers with Azure AD Premium license but no Intune license.

Cloud customers who have Azure AD premium license can configure an easy Conditional Access Policies, but they cannot configure Device-based  conditional access policy as users will always fail because their devices are not managed by Intune which is Microsoft MDM solution.

For cloud customers who are having Azure AD Premium license but not Intune license, they can [sign up for a Microsoft Intune free trial for 30 days](learn.microsoft.com/en-us/mem/intune/fundamentals/free-trial-sign-up).

After enabling the tenant for Microsoft Intune, cloud customers will have both Azure AD Premium and Intune licenses and they can go with <ins>**scenario #3**</ins> in this article.

### Scenario #3: Cloud customers with Azure AD Premium and Intune licenses

Cloud users who are having Intune license can connect their devices to Azure AD as Azure AD Joined for corporate devices (aka. CYOD) or as Azure AD Registered for personal devices (aka. BYOD). Also, they can enroll their devices to Intune automatically after they become connected to Azure AD.

In this scenario, IT professionals can protect identities and their information by allowing the access to Office 365 services and applications from compliant devices only. The device will never become compliant before it meets the device compliance policies. More information about device compliance policies can be found in the article, [Set rules on devices to allow access to resources in your organization using Intune](https://docs.microsoft.com/en-us/mem/intune/protect/device-compliance-get-started).

To configure a Conditional Access that Requires compliant devices, visit [Conditional Access: Require compliant devices article](https://docs.microsoft.com/en-US/Azure/active-directory/conditional-access/howto-conditional-access-policy-compliant-device).

### Scenario #4: Hybrid customers with no Azure AD Premium license or Intune license.

Hybrid customers are having local Active Directory as well as Azure Active Directory and they are syncing their users to Azure AD in order to gain the benefits of utilizing Azure cloud resources.

To configure Device-based conditional access, hybrid customers who do not have Azure AD Premium license and do not have Intune license have two options:
- <ins>**Option #1:**</ins> Hybrid customers can enable both [Azure Active Directory Premium free for one month](https://azure.microsoft.com/en-us/trial/get-started-active-directory/) and [sign up for a Microsoft Intune free trial for 30 days](https://learn.microsoft.com/en-us/mem/intune/fundamentals/free-trial-sign-up).

  After enabling the tenant for both Azure AD Premium license and Microsoft Intune license, hybrid customers will have both Azure AD Premium and Intune licenses and they can go with <ins>**scenario #5**</ins> in this article.

- <ins>**Option #2:**</ins>Hybrid customers can enable [Azure Active Directory Premium free for one month](https://azure.microsoft.com/en-us/trial/get-started-active-directory/) only.

  After enabling the tenant for Azure AD Premium license, hybrid customers will have Azure AD Premium license and they can go with <ins>**scenario #6**</ins> in this article.

### Scenario #5: Hybrid customers with Azure AD Premium license and Intune license.

Hybrid customers are having local Active Directory as well as Azure Active Directory and they are syncing their users to Azure AD in order to gain the benefits of utilizing Azure cloud resources.

The number of users working from home (WFH) increases in response of COVID-19 (coronavirus) outbreak, and many of them do not have access to local Active Directly, at the same time, IT professionals need to manage and protect their devices to make sure those devices that accessing corporate data are meeting configuration and security policies. To accomplish this, users need to connect their devices to Azure AD and enroll them to Intune.

Users who are having Intune license can connect their devices to Azure AD as Azure AD Joined for corporate devices (aka. CYOD) or as Azure AD Registered for personal devices (aka. BYOD). Also, they can enroll their devices to Intune automatically after they become connected to Azure AD.

In this scenario, IT professionals can protect identities and their information by allowing the access to Office 365 services and applications from compliant devices only. The device will never become compliant before it meets the device compliance policies. More information about device compliance policies can be found in the article, [Set rules on devices to allow access to resources in your organization using Intune](https://docs.microsoft.com/en-us/mem/intune/protect/device-compliance-get-started)

To configure a Conditional Access that Requires compliant devices, visit [Conditional Access: Require compliant devices article](https://docs.microsoft.com/en-US/Azure/active-directory/conditional-access/howto-conditional-access-policy-compliant-device).

<ins>**Very Important Points:**</ins>
- Users can access on-premises resources from Azure AD Joined devices automatically and Single Sign On (SSO) is working. More information about accessing on-premises resources from Azure AD Joined devices can be found in the article, How SSO to on-premises resources works on Azure AD joined devices
- Also, users can access on-premises resources from Azure AD Joined devices using Windows Hello for Business (WHfB). More information about accessing on-premises resources from Azure AD Joined devices using Windows Hello for Business can be found in the article, Configure Azure AD joined devices for On-premises Single-Sign On using Windows Hello for Business

### Scenario #6: Hybrid customers with Azure AD Premium license but no Intune license.

Hybrid customers are having local Active Directory as well as Azure Active Directory and they are syncing their users to Azure AD in order to gain the benefits of utilizing Azure cloud resources.

The number of users working from home (WFH) increases in response of COVID-19 (coronavirus) outbreak, and IT professionals need to manage and protect their devices to make sure those devices that accessing corporate data are meeting configuration and security policies. To accomplish this, IT professionals join devices to local domain.

Devices of remote users are either connected to the local domain or not. If the device is not connected to local domain, the easiest option is to connect it directly to Azure AD as Azure AD Joined or Azure AD Registered and IT professionals need to go with scenario #4 option #1. Otherwise, if the device is connected to local AD, we have one of the following options:

- <ins>**Option #1:**</ins> Devices are connected to Azure AD as hybrid Azure AD joined:

  Hybrid customers who connect devices to Azure AD as Hybrid Azure AD joined and have Azure AD Premium license, can configure Device-based  conditional access and require the access to Azure cloud resources from Hybrid Azure AD joined devices. More information about configuring Device-based  conditional access to require hybrid Azure AD join devices can be found in the article, [Require Hybrid Azure AD joined devices](https://docs.microsoft.com/en-us/azure/active-directory/conditional-access/require-managed-devices#require-hybrid-azure-ad-joined-devices)

- <ins>**Option #2:**</ins> Device are NOT connected to Azure AD as hybrid Azure AD joined:

  Hybrid customers who have Azure AD Premium license, need to connect devices to Azure AD as hybrid Azure AD joined to configure Device-based  conditional access to require hybrid Azure AD join devices.

In this section we will discuss how to connect devices to Azure AD in both Managed and Federated environments. More information can be found in the article, [Plan your hybrid Azure Active Directory join implementation](https://docs.microsoft.com/en-us/azure/active-directory/devices/hybrid-azuread-join-plan)

#### Managed environment

Hybrid customers who have Managed domains can configure auto Hybrid Azure AD joined using Azure AD connect application. More information about the configuration steps can be found in the article, [Configure hybrid Azure Active Directory join for managed domains](https://docs.microsoft.com/en-us/azure/active-directory/devices/hybrid-azuread-join-managed-domains)

After completing Azure AD connect wizard, Service Connection Point (SCP) will be created under configuration partition which has information about the tenant ID and the Tenant name. Devices in Managed environments should have a line-of-sight connection to local Active Directory either by connecting it to the local network or by using VPN to read SCP information in order to connect itself to Azure AD.

Device registration process for Managed domains depends on Azure AD Connect synchronization cycle which is 30 minutes by default. More information about high level device registration steps can be found in the article, [Hybrid Azure AD Device Registration](2019-10-20-Hybrid-Azure-AD-Device-Registration.md)

#### Federated environment

Hybrid customers who have Federated domains can configure auto Hybrid Azure AD joined using Azure AD connect application. More information about the configuration steps can be found in the article, [Configure hybrid Azure Active Directory join for federated domains](https://docs.microsoft.com/en-us/azure/active-directory/devices/hybrid-azuread-join-federated-domains)

After completing Azure AD connect wizard, Service Connection Point (SCP) will be created under configuration partition which has information about the tenant ID and the Tenant name. Also, ADFS claim rules will be created on Active Directory Federation service if it is managed by Azure AD Connect. If ADFS id not managed by Azure AD connect for some reason, we recommend to create ADFS claim rules using [Azure AD PRT Claim Rules](https://adfshelp.microsoft.com/AadTrustClaims/ClaimsGenerator)

Devices in Federated environments should have a line-of-sight connection to local Active Directory either by connecting it to the local network or by using VPN to read SCP information in order to connect itself to Azure AD.

Device registration process for Federated domains completes in few seconds as the device authenticates directly from ADFS server. More information about high level device registration steps can be found in the article, [Hybrid Azure AD Device Registration](2019-10-20-Hybrid-Azure-AD-Device-Registration.md)

We still do recommend the devices to be synced to Azure AD even if device registration process does not depend on Azure AD Connect synchronization. More information about high level device registration steps can be found in the article, [Hybrid Azure AD Device Registration](2019-10-20-Hybrid-Azure-AD-Device-Registration.md)

Additionally, you can use [Device Registration Troubleshooter tool](https://aka.ms/DSRegTool) which performs more than 30 different tests that help you to identify and fix the most common device registration issues for all join types (Hybrid Azure AD joined, Azure AD Joined and Azure AD Register).

Thanks for reading, and please stay safe at home 😊
