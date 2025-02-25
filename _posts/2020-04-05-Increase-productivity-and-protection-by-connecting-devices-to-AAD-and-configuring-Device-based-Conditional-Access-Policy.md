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

Previously, I shared an article that answers [Do I really need to connect my device to Azure AD?](https://)! and in this article we will discuss how to configure device-based Conditional Access Policies.

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
