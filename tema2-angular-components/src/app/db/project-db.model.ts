export interface ProjectDBModel {
  id: number;
  userId: number;
  noOfTeammates: number;
  name: {
    en: string;
    ro: string;
  };
  color: string;
}


