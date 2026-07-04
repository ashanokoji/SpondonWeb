export enum Urgency { CRITICAL = 'CRITICAL', MODERATE = 'MODERATE', NORMAL = 'NORMAL' }
export enum RequestStatus { ACTIVE = 'ACTIVE', FULFILLED = 'FULFILLED', EXPIRED = 'EXPIRED', CANCELLED = 'CANCELLED' }
export enum CommunityType { PUBLIC = 'PUBLIC', PRIVATE = 'PRIVATE', SPONDON = 'SPONDON' }
export enum CommunityRole { ADMIN = 'ADMIN', MODERATOR = 'MODERATOR', MEMBER = 'MEMBER' }
export enum DonationStatus { CONFIRMED = 'CONFIRMED', PENDING = 'PENDING' }
export enum UserRole { SUPER_ADMIN = 'SUPER_ADMIN', USER = 'USER' }
export enum MembershipStatus { JOINED = 'JOINED', PENDING = 'PENDING', NONE = 'NONE' }
export enum NotificationType {
    REQUEST = 'REQUEST', JOIN = 'JOIN', DONATION = 'DONATION',
    ADMIN = 'ADMIN', REMINDER = 'REMINDER', BLOOD_REQUEST = 'BLOOD_REQUEST',
    REQUEST_ACCEPTED = 'REQUEST_ACCEPTED', DONATION_CONFIRMED = 'DONATION_CONFIRMED',
    COMMUNITY_JOIN_REQUEST = 'COMMUNITY_JOIN_REQUEST', JOIN_REQUEST_ACCEPTED = 'JOIN_REQUEST_ACCEPTED',
    JOIN_REQUEST_REJECTED = 'JOIN_REQUEST_REJECTED', COMMUNITY_BROADCAST = 'COMMUNITY_BROADCAST',
    SUPERADMIN_ANNOUNCEMENT = 'SUPERADMIN_ANNOUNCEMENT'
}

export interface User {
    uid: string;
    name: string;
    phone: string;
    email: string;
    avatarUrl: string;
    bloodGroup: string;
    dob: Date | null;
    weight: number;
    isDonor: boolean;
    lastDonationDate: Date | null;
    donationInterval: number;
    availabilityOverride: boolean;
    totalDonations: number;
    communityIds: string[];
    district: string;
    upazila: string;
    isPhoneVisible: boolean;
    badges: string[];
    fcmToken: string;
    role: UserRole;
    createdAt: Date | null;
    isBanned: boolean;
    banReason?: string;
    bannedAt: Date | null;
}

export interface BloodRequest {
    id: string;
    communityIds: string[];
    requesterId: string;
    bloodGroup: string;
    urgency: Urgency;
    unitsNeeded: number;
    patientName?: string;
    requesterName: string;
    communityName: string;
    hospital: string;
    address: string;
    donationDateTime: Date | null;
    contactNumber: string;
    patientCondition: string;
    respondents: string[];
    confirmedDonors: string[];
    status: RequestStatus;
    isPinned: boolean;
    createdAt: Date | null;
    expiresAt: Date | null;
}

export interface Community {
    id: string;
    name: string;
    description: string;
    coverUrl: string;
    type: CommunityType;
    adminIds: string[];
    moderatorIds: string[];
    memberIds: string[];
    pendingIds: string[];
    district: string;
    upazila: string;
    bloodGroups: string[];
    memberCount: number;
    donationCount: number;
    isVerified: boolean;
    isSpondon: boolean;
    isSerialEnabled: boolean;
    createdAt: Date | null;
}

export interface Donation {
    id: string;
    requestId: string;
    donorId: string;
    hospital: string;
    bloodGroup: string;
    date: Date | null;
    status: DonationStatus;
    confirmedBy?: string;
}

export interface AppNotification {
    id: string;
    type: NotificationType;
    title: string;
    body: string;
    deepLink: string;
    isRead: boolean;
    createdAt: Date | null;
}
