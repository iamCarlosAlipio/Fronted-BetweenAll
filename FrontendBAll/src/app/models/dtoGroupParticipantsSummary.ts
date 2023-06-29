import { User } from './user';
export interface DtoGroupParticipantsSummary {
  idGroup: number;
  imageGroup: string;
  nameGroup: string;
  amountParticipants: number;
  descriptionGroup: string;
  categoryGroup: string;
  userList: User[];
}
