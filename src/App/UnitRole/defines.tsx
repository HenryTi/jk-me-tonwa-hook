import { roleT } from "./res";

export type OnAdminChanged = (userId: number) => Promise<void>;

export function None() {
    return <div className="mx-3 my-3 text-muted small">[ {roleT('none')} ]</div>;
}

export function propertyOf<T>(prop: keyof T) {
    return prop;
}
