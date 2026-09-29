import { describe, expect, it } from 'vitest';
import { scoreMattress } from './engine';
import { mattresses } from '@/data/mattresses';
import type { SleepProfile } from '@/lib/types';
const profile:SleepProfile={position:'side',weight:180,firmness:'medium',temperature:'hot',motion:'couple',priority:'pressure',budget:1500,types:['hybrid','foam']};
describe('scoreMattress',()=>{it('returns bounded deterministic scores',()=>{const a=scoreMattress(mattresses[0],profile);const b=scoreMattress(mattresses[0],profile);expect(a).toEqual(b);expect(a.overall).toBeGreaterThanOrEqual(0);expect(a.overall).toBeLessThanOrEqual(100);});it('changes cooling relevance for hot sleepers',()=>{const hot=scoreMattress(mattresses[0],profile);const cold=scoreMattress(mattresses[0],{...profile,temperature:'cold'});expect(hot.cooling).toBeGreaterThan(cold.cooling);});});
