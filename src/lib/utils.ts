import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
    return clsx(inputs);
}

export const typeCodeToSlug = (code: string) => code.toLowerCase().replace('/', '-');

export const getTypeSlug = (type: { code: string }) => typeCodeToSlug(type.code);
