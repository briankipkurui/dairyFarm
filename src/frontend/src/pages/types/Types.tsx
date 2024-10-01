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