---
title: "Do I really need to connect my device to Azure AD?!"
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
Lots of customers are asking if it is important to connect their devices to Azure AD, and what are the benefits of doing this.

Before answering this question, lets discuss first some of the benefits from end users, IT admins and security perspectives that will be gained when connecting devices to Azure AD.

#### End user Experience:
Azure Active Directory allows the users (who connected their device to it) to automatically sign in which means when users sign in successfully once they do not need to enter their passwords to sign in to Azure services anymore. This gives the users an easy access to cloud-based applications without any additional on-premises components.

Also, when connecting devices to Azure AD, end user gains the best Single Sign-On (SSO) experience of utilizing and accessing Azure services like:

- Windows activation.
- Enterprise applications.
- Encryption using Bit-Locker.
- Azure AD app proxy applications.
- Access Windows Store for Business.
- Office 365 services and applications.
- Activate Windows Hello for Business.
- Mobile Device management (Intune).
- Enterprise roaming across joined devices.

#### IT Administrators:
Azure AD provides centralized administration to control and manage the connected devices. Admins can easily control Azure AD devices by doing the following:

- Join devices to Azure AD and control who can do it.
- Enable/Disable Azure AD device.
- Delete devices from Azure AD and control who can do it.
- Wipe corporate data with assistance of Intune MDM.
- Add local admins to the joined devices.
- Retrieve Bit-Locker Recovery keys.
- Control the number of connected devices per user.

#### Security Perspective:
Single sign on (SSO): user has a single identity and SSO is enabled for him to simplify the security model. When user’s roles being changed or the user leaves the organization, access modifications are tied to that single identity, and SSO greatly reduces the efforts needed to change or disable the user’s account. Using Single Sign-on for accounts makes it easier to manage users identities and increases the security capabilities for the organization.

Connecting devices to Azure AD allows administrator to manage how cloud or on-premises devices access the corporate data by Azure Conditional Access Policies. Using Conditional Access policies, administrators make sure that users are accessing resources from devices that meet standards for security and compliance, for instance, admins can control the access to O365 services only from trusted devices (Hybrid Azure AD devices and/or compliant devices).

Intune Mobile Device Management (MDM) solution which is fully integrated with Azure AD gives IT Admins the need power to control, manage and apply security settings in heterogeneous options in order to protect the enrolled devices and keep data protected.

 

Finally, as a conclusion, the answer is **YES** you need to connect your devices to Azure Active Directory to reach the best user experience, device management and to be more secure.
