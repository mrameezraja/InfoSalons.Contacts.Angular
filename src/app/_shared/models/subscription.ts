export class SubscriptionDto {
    id: number | undefined;
    name: string | undefined;
    stripeId: string | undefined;
    stripePlan: string | undefined;
    quantity: number | undefined;
    trialEndsAt: Date | undefined;
    endAt: Date | undefined;
    creationTime: Date| undefined;
    lastModificationTime: Date | undefined;
    userId: number | undefined;
    editionId: number | undefined;
    constructor() { }
}