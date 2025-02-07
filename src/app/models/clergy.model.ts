export interface Clergy {
  id: string;
  type: 'priest' | 'bishop' | 'deacon';
  name: string;
  email: string;
  phone: string;
  cpf: string;
  birthDate: Date;
  diocese: string;
  parish: string;
  bio: string;
  ordinationDate: Date;
  ordinatingBishop: string;
  socialMedia: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  ordinationDocument: string;
  identityDocument: string;
  profileImage: string;
  status: 'pending' | 'approved' | 'rejected';
  isActive: boolean;
  lastUpdate: Date;
  createdAt: Date;
  updatedAt: Date;
}