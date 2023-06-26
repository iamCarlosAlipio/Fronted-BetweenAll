import { User } from './user';
export interface DtoGroupParticipantsSummary {
  nameGroup: string;
  amountParticipants: number;
  descriptionGroup: string;
  categoryGroup: string;
  userList: User[];
}
