
export interface Story {
  title: string;
  description: string;
  owner: string;
  requiredFunds: bigint;
  currentFunds: bigint;
  released: boolean;
  likes: number;
  hash: string;
}