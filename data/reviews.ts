export type ReviewTag = 'sleeps-cool' | 'sleeps-warm' | 'pressure-relief' | 'supportive' | 'motion-isolation' | 'edge-support' | 'responsive' | 'off-gassing';
export type ReviewHighlight = { id:string; mattressId:string; source:string; title:string; excerpt:string; tags:ReviewTag[]; confidence:'high'|'medium'|'low'; updatedAt:string };

export const reviewHighlights: ReviewHighlight[] = [
 {id:'r1',mattressId:'dreamcloud-hybrid',source:'Structured review evidence',title:'Balanced support with pressure relief',excerpt:'Hybrid construction is designed to combine responsive support with cushioning for pressure-prone areas.',tags:['supportive','pressure-relief','responsive'],confidence:'high',updatedAt:'2026-09-01'},
 {id:'r2',mattressId:'dreamcloud-hybrid',source:'Structured review evidence',title:'Motion control for shared beds',excerpt:'Pocketed-coil construction paired with comfort layers can help reduce transfer between sleepers.',tags:['motion-isolation'],confidence:'medium',updatedAt:'2026-09-01'},
 {id:'r3',mattressId:'cooling-foam',source:'Structured review evidence',title:'Cooling-focused build',excerpt:'The construction emphasizes airflow and a cooler surface feel for sleepers who dislike heat buildup.',tags:['sleeps-cool','pressure-relief'],confidence:'high',updatedAt:'2026-09-01'},
 {id:'r4',mattressId:'classic-foam',source:'Structured review evidence',title:'Deep contouring feel',excerpt:'All-foam construction emphasizes close contouring and pressure distribution.',tags:['pressure-relief','sleeps-warm'],confidence:'medium',updatedAt:'2026-09-01'},
];

export function reviewsForMattress(id:string){return reviewHighlights.filter(r=>r.mattressId===id)}
