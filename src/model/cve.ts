export interface ICve {
  id: string;
  cvssV2Score: string;
  cvssV2Vector: string;
  cvssV3Score: string;
  cvssV3Vector: string;
  applicably?: boolean;
}