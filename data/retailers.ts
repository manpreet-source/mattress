export type RetailerOffer = { id:string; mattressId:string; retailer:string; url:string; price:number; affiliate:boolean; lastVerified:string; verified:boolean; disclosure:string };

export const retailerOffers: RetailerOffer[] = [];

export function offersForMattress(mattressId:string){return retailerOffers.filter(o=>o.mattressId===mattressId)}

export function getRetailerUrl(offer:RetailerOffer){
  if(!offer.url || !offer.verified) return null;
  try { const u=new URL(offer.url); if(offer.affiliate) u.searchParams.set('utm_source','mattress-match-score'); return u.toString(); } catch { return null; }
}
