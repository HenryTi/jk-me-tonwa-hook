/*
import { CAgents } from "./CAgents";
import { CDistributors } from "./CDistributors";
import { CGroups } from "./CGroups";
import { CObjects } from "./CObjects";
import { CPosts } from "./CPosts";
import { CStaffs } from "./CStaffs";
*/
import { ModelLink } from '../ModelLink';
import groupsLink from './VGroups';
import distributorsLink from './VDistributors';
import agentsLink from './VAgents';
import postsLink from './VPosts';
import staffsLink from './VStaffs';

export const objectLinks: ModelLink[] = [
    groupsLink,
    distributorsLink,
    agentsLink,
    postsLink,
    staffsLink,
].map(v => ({
    ...v,
}));
/*
export function initCObjects(cSupervise: CSupervise): CObjects[] {
    return [
        new CGroups(cSupervise),
        new CDistributors(cSupervise),
        new CAgents(cSupervise),
        new CPosts(cSupervise),
        new CStaffs(cSupervise),
    ];
}
*/
