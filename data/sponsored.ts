export type SponsoredPlacement = {
  id: string;
  mattressId: string;
  partner: string;
  label: string;
  verified: boolean;
  lastVerified: string | null;
  disclosure: string;
  active: boolean;
};

export const sponsoredPlacements: SponsoredPlacement[] = [];

export function sponsoredForMattress(mattressId: string) {
  return sponsoredPlacements.filter((item) => item.mattressId === mattressId && item.active);
}
