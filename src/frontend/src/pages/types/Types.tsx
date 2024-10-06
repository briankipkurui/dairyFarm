export type Cattle = {
    id: number
    name: string
    sex: string
    serialNumber: string
    dateOfBirth: string
    breeds: Breeds
    livestock: Livestock
    dateDewormed: any
    dateServed: any
}
export type  FeedingFormulas = {
    id: number
    livestockTypes: Livestock
    feedsTypes: FeedsTypes
    quantityKg: number
    feedingFrequency: string
    feedingTime: string
    waterLiters: number
    supplements: string
    createdAt: Date

}

export type FeedingRecords = {
    id: number
    feedingFormulas: FeedingFormulas
    cattle: Cattle
    feedGivenKg: number,
    waterGivenLiters: number,
    remarks: string,
    feedingTime: Date
}

export type Breeds = {
    id: number
    name: string
    description: string
}

export type Livestock = {
    id: number
    name: string
    description: string
}

export type FeedsTypes = {
    id: number
    name: string
    description: string
    proteinPct: string
    fatPct: string
    fiberPct: string
    energy: string
    costPerKg: string
}