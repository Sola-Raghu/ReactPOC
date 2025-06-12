import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Select, { MultiValue } from 'react-select';
import { Meeting, MeetingFormValues } from '../../types';
import Modal from '../../components/Modal/Modal';
import MeetingItem from '../../components/MeetingItem/MeetingItem';
import styles from './NewMeeting.module.css';

interface AttendeeOption {
    value: string;
    label: string;
}

const predefinedAttendees: AttendeeOption[] = [
    { value: 'john.doe@example.com', label: 'John Doe' },
    { value: 'jane.smith@example.com', label: 'Jane Smith' },
    { value: 'michael.brown@example.com', label: 'Michael Brown' },
    { value: 'emily.jones@example.com', label: 'Emily Jones' },
];

const useMeetingContext = () => {
    const [meetings, setMeetings] = useState<Meeting[]>([]);
    const addMeeting = (newMeetingData: Omit<Meeting, 'id'>) => {
        const newMeeting = { ...newMeetingData, id: Date.now() };
        setMeetings(prev => [...prev, newMeeting]);
        console.log("Adding Meeting:", newMeeting);
    };
    const updateMeeting = (updatedMeeting: Meeting) => {
        setMeetings(prev => prev.map(m => m.id === updatedMeeting.id ? updatedMeeting : m));
        console.log("Updating Meeting:", updatedMeeting);
    };
    const deleteMeeting = (id: number) => {
        setMeetings(prev => prev.filter(m => m.id !== id));
        console.log("Deleting Meeting ID:", id);
    };
    return { meetings, addMeeting, updateMeeting, deleteMeeting };
};



const NewMeeting: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMeeting, setEditingMeeting] = useState<Meeting | null>();
    const [selectedAttendees, setSelectedAttendees] = useState<AttendeeOption[]>([]);

    const { meetings, addMeeting, updateMeeting, deleteMeeting } = useMeetingContext();

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isSubmitting }
    } = useForm<MeetingFormValues>();

    useEffect(() => {
        if (editingMeeting) {
            reset({
                ...editingMeeting,
                attendees: (editingMeeting.attendees || []).join(', ')
            });
            setSelectedAttendees(
                (editingMeeting.attendees || []).map((attendee) => ({
                    value: attendee,
                    label: attendee
                }))
            );
        } else {
            reset();
            setSelectedAttendees([]);
        }
    }, [editingMeeting, reset]);

    const handleAttendeeChange = (selectedOptions: MultiValue<AttendeeOption>) => {
        setSelectedAttendees(selectedOptions as AttendeeOption[]);
    };

    const openModalForCreate = () => {
        setEditingMeeting(null);
        setIsModalOpen(true);
    };

    const openModalForEdit = (meeting: Meeting) => {
        setEditingMeeting(meeting);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingMeeting(null);
        reset();
    };

    const onSubmit: SubmitHandler<MeetingFormValues> = (data) => {
        console.log("Form Data Submitted:", data);

        try {
            const attendeesArray = selectedAttendees.map((attendee) => attendee.label);

            if (editingMeeting) {
                updateMeeting({
                    ...data,
                    id: editingMeeting.id,
                    date: data.date || '',
                    startTime: data.startTime || '',
                    endTime: data.endTime || '',
                    attendees: attendeesArray
                });
            } else {
                const { id, ...newMeetingData } = data;
                addMeeting({
                    ...newMeetingData,
                    date: data.date || '',
                    startTime: data.startTime || '',
                    endTime: data.endTime || '',
                    attendees: attendeesArray
                });
            }
            closeModal();
        } catch (error) {
            console.error("Error saving meeting:", error);
        }
    };

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this meeting?')) {
            deleteMeeting(id);
        }
    };


    return (
        <div className={styles.newMeetingPage}>

            <h2>Manage Meetings</h2>
            <button onClick={openModalForCreate} className={styles.createButton}>
                Create New Meeting
            </button>

            <div className={styles.meetingList}>
                <h3>Upcoming Meetings</h3>
                {meetings.length > 0 ? (
                    meetings.map(meeting => (
                        <MeetingItem
                            key={meeting.id}
                            meeting={meeting}
                            onEdit={() => openModalForEdit(meeting)}
                            onDelete={() => handleDelete(meeting.id)}
                        />
                    ))
                ) : (
                    <p className={styles.noMeetings}>No meetings scheduled yet.</p>
                )}
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={editingMeeting ? 'Edit Meeting' : 'Create New Meeting'}
            >
                <form onSubmit={handleSubmit(onSubmit)} className={styles.meetingForm}>
                    <div className={styles.formGroup}>
                        <label htmlFor="title">Title</label>
                        <input
                            id="title"
                            type="text"
                            placeholder="Enter meeting title"
                            {...register("title", {
                                required: "Title is required",
                            })}
                            aria-invalid={errors.title ? "true" : "false"}
                        />
                        {errors.title && <span className={styles.errorMessage}>{errors.title.message}</span>}
                    </div>
                    <div className={styles.formGroup} style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
                        <div>
                            <label htmlFor="date">Date</label>
                            <input
                                id="date"
                                type="date"
                                {...register("date", {
                                    required: "Date is required",
                                })}
                                aria-invalid={errors.date ? "true" : "false"}
                            />
                            {errors.date && <span className={styles.errorMessage}>{errors.date.message}</span>}
                        </div>

                        <div>
                            <label htmlFor="startTime">Start Time</label>
                            <input
                                id="startTime"
                                type="time"
                                {...register("startTime", {
                                    required: "Start time is required",
                                    validate: (value) => {
                                        if (!value) {
                                            return "Start time is required";
                                        }
                                        const startTime = new Date(`${watch("date")}T${value}`);
                                        const now = new Date();
                                        if (isNaN(startTime.getTime())) {
                                            return "Invalid start time";
                                        }
                                        return startTime >= now || "Start time must be in the future";
                                    }
                                })}
                                aria-invalid={errors.startTime ? "true" : "false"}
                            />
                            {errors.startTime && <span className={styles.errorMessage}>{errors.startTime.message}</span>}
                        </div>

                        <div>
                            <label htmlFor="endTime">End Time</label>
                            <input
                                id="endTime"
                                type="time"
                                {...register("endTime", {
                                    required: "End time is required",
                                    validate: (value) => {
                                        if (!value) {
                                            return "End time is required";
                                        }
                                        const endTime = new Date(`${watch("date")}T${value}`);
                                        const startTimeValue = watch("startTime");
                                        if (!startTimeValue) {
                                            return "Start time is invalid or missing";
                                        }
                                        const startTime = new Date(`${watch("date")}T${startTimeValue}`);
                                        if (isNaN(endTime.getTime())) {
                                            return "Invalid end time";
                                        }
                                        if (isNaN(startTime.getTime())) {
                                            return "Start time is invalid or missing";
                                        }
                                        return endTime > startTime || "End time must be after start time";
                                    }
                                })}
                                aria-invalid={errors.endTime ? "true" : "false"}
                            />
                            {errors.endTime && <span className={styles.errorMessage}>{errors.endTime.message}</span>}
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="attendees">Attendees</label>
                        <Select
                            id="attendees"
                            isMulti
                            options={predefinedAttendees}
                            value={selectedAttendees}
                            onChange={handleAttendeeChange}
                            placeholder="Type to search attendees..."
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="location">Location (Optional)</label>
                        <input
                            id="location"
                            type="text"
                            {...register("location")}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="description">Description (Optional)</label>
                        <textarea
                            id="description"
                            rows={4}
                            {...register("description")}
                        />
                    </div>

                    <div className={styles.formActions}>
                        <button type="button" onClick={closeModal} className={styles.cancelButton}>
                            Cancel
                        </button>
                        <button type="submit" disabled={isSubmitting} className={styles.saveButton}>
                            {isSubmitting ? 'Saving...' : (editingMeeting ? 'Update Meeting' : 'Create Meeting')}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default NewMeeting;

