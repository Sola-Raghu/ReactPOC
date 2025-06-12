import React from 'react';
import { Meeting } from '../../types'; 
import styles from './MeetingItem.module.css';

interface MeetingItemProps {
    meeting: Meeting;
    onEdit: (meeting: Meeting) => void;
    onDelete: (id: number) => void;    
}

const MeetingItem: React.FC<MeetingItemProps> = ({ meeting, onEdit, onDelete }) => {

    const formatDateTime = (date: string, time: string) => {
        if (!date || !time) return 'N/A';
        const dateTime = new Date(`${date}T${time}`);
        if (isNaN(dateTime.getTime())) return 'N/A';
        return dateTime.toLocaleString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <li className={styles.meetingItem}>
            <div className={styles.meetingDetails}>
                <strong>{meeting.title || 'Untitled Meeting'}</strong>
                <p>Date: {formatDateTime(meeting.date,meeting.startTime)}</p>
                <p>Location: {meeting.location || 'N/A'}</p>
                <p>Attendees:</p>
                <ul>
                    {meeting.attendees && meeting.attendees.length > 0 ? (
                        meeting.attendees.map((attendee, index) => (
                            <li key={index}>{attendee}</li>
                        ))
                    ) : (
                        <li>N/A</li>
                    )}
                </ul>
            </div>
            <div className={styles.meetingActions}>
                <button onClick={() => onEdit(meeting)} className={styles.editButton}>Edit</button>
                <button onClick={() => onDelete(meeting.id)} className={styles.deleteButton}>Delete</button>
            </div>
        </li>
    );
};

export default MeetingItem;