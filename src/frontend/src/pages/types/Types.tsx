export type Cattle = {
    id: number
    name: string
    sex: string
    serialNumber: string
    dateOfBirth: string
    breeds: Breeds
    livestockTypes: livestockTypes
    dateDewormed: any
    dateServed: any
}
export type  FeedingFormulas = {
    id: number
    livestockTypes: livestockTypes
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

export type Incomes = {
    id: number
    incomeTypes: IncomeTypes
    valueChains: ValueChains
    amount: number,
    description: string,
    transactionDate: Date,
    updatedAt: Date
}

export type Expenses = {
    id: number
    expenseTypes: ExpenseTypes
    valueChains: ValueChains
    amount: number,
    description: string,
    transactionDate: Date,
    updatedAt: Date
}

export type IncomeTypes = {
    id: number
    name: string
    description: string
}
export type ExpenseTypes = {
    id: number
    name: string
    description: string
}

export type Breeds = {
    id: number
    name: string
    description: string
}

export type livestockTypes = {
    id: number
    name: string
    description: string
}

export type Roles = {
    id: number,
    name: string,
    createAt: Date,
    updatedAt: Date
}

export type Permissions = {
    id: number,
    name: string,
    createAt: Date,
    updatedAt: Date
}
export type ValueChains = {
    id: number,
    name: string,
    createAt: Date,
    updatedAt: Date
}
export type eachValueChainIncomes = {
    valueChainId: number,
    valueChain: string,
    amount: number
}
export type EachValueChainExpense = {
    valueChainId: number,
    valueChain: string,
    amount: number
}

export type NetProfit = {
    valueChainId: number,
    netProfit: number,
    name: string
}
export type FilterValues = {
    // valueChainId: string,
    startDate: string,
    endDate: string
}