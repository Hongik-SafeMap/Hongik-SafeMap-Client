export interface SensitiveInfoResponse {
  sensitiveInfoId: number;
  bloodType: string;
  allergies: string;
  chronicDiseases: string;
  medications: string;
}

export interface SensitiveInfoRequest {
  bloodType: string;
  allergies: string;
  chronicDiseases: string;
  medications: string;
}

export interface EmergencyContact {
  emergencyContactId: number;
  name: string;
  relationship: string;
  phone: string;
}

export type EmergencyContactsResponse = EmergencyContact[];

export interface EmergencyContactsRequest {
  name: string;
  relationship: string;
  phone: string;
}

export interface PasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface MyResponse {
  name: string;
  email: string;
  status: string;
}
