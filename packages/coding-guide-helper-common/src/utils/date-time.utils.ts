export const toHhMmSs = (dateIso: string): string => new Date(dateIso).toTimeString().split(' ')[0]
