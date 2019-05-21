export class ApplicationInfo {
    version: string | undefined;
    releaseDate: Date;
    features: { [key: string]: boolean; } | undefined;
    constructor() { }
}