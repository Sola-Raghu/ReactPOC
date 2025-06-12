export interface User {
    name: string;
    email?: string;
}

export interface Movie {
    id: number;
    title: string;
    genre?: string;  
    rating?: number;
    year?: number;
    poster?: string;  
    plot?: string;
}

export interface Meeting {
    id: number;
    title: string;
    date: string; 
    startTime: string;
    endTime: string;
    location?: string;
    attendees?: string[];
    description?: string;
}

export interface MeetingFormValues {
    id?: number; 
    title: string;
    dateTime: string;
    location?: string;
    attendees: string;
    description?: string;
    startTime?: string;
    endTime?: string;
    date?: string;
}