import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import pincodeData from '../../data/Pincodes.json'; // Import the JSON data
import styles from './RegistrationForm.module.css'; // Import the CSS module

interface RegistrationFormValues {
  profileImage: any;
  name: string;
  email: string;
  contact: string;
  age: number;
  address: string;
  pincode: string;
  city: string;
  district: string;
  state: string;
  country: string;
}

interface PincodeDetails {
  city: string;
  district: string;
  state: string;
  country: string;
}

const pincodeDataTyped: Record<string, PincodeDetails> = pincodeData.pincodeData;

const RegistrationFormReactHook: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<RegistrationFormValues>({
    defaultValues: {
      name: '',
      email: '',
      contact: '',
      age: undefined,
      address: '',
      pincode: '',
      city: '',
      district: '',
      state: '',
      country: 'India',
    },
  });

  const onSubmit: SubmitHandler<RegistrationFormValues> = (data) => {
    console.log('Form data:', data);
    alert("Form Data: " + JSON.stringify(data, null, 2));
  };

    const [profileImage, setProfileImage] = React.useState<string | null>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfileImage(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePincodeChange = (pincode: string) => {
        setValue('pincode', pincode);
        const pincodeDetails = pincodeDataTyped[pincode];
        if (pincodeDetails) {
            setValue('city', pincodeDetails.city);
            setValue('district', pincodeDetails.district);
            setValue('state', pincodeDetails.state);
            setValue('country', pincodeDetails.country);
        } else {
            setValue('city', '');
            setValue('district', '');
            setValue('state', '');
            setValue('country', 'India');
        }
    };


  return (
    <div className={styles.registrationFormContainer}>
      <div className={styles.registrationFormCard}>
        <h1 className={styles.title}>Registration Form</h1>
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div className={styles.formGroup}>
              <label htmlFor="profileImage" className={styles.label}>Profile Image</label>
              <input
                type="file"
                id="profileImage"
                {...register('profileImage')}
                onChange={handleImageChange}
                className={styles.input}
              />
              {profileImage && (
                <img
                  src={profileImage}
                  alt="Profile Preview"
                  className={styles.profileContainer}
                />
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>Name</label>
              <input
                type="text"
                id="name"
                {...register('name', { required: 'Name is required' })}
                className={styles.input}
              />
              {errors.name && <p className={styles.error}>{errors.name.message}</p>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>Email</label>
              <input
                type="email"
                id="email"
                {...register('email', { required: 'Email is required' })}
                className={styles.input}
              />
              {errors.email && <p className={styles.error}>{errors.email.message}</p>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="contact" className={styles.label}>Contact</label>
              <input
                type="text"
                id="contact"
                {...register('contact', { required: 'Contact is required' })}
                className={styles.input}
              />
              {errors.contact && <p className={styles.error}>{errors.contact.message}</p>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="age" className={styles.label}>Age</label>
              <input
                type="number"
                id="age"
                {...register('age', { required: 'Age is required' })}
                className={styles.input}
              />
              {errors.age && <p className={styles.error}>{errors.age.message}</p>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="address" className={styles.label}>Address</label>
              <textarea
                id="address"
                {...register('address', { required: 'Address is required' })}
                className={styles.textarea}
              ></textarea>
              {errors.address && <p className={styles.error}>{errors.address.message}</p>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="pincode" className={styles.label}>Pincode</label>
              <input
                type="text"
                id="pincode"
                {...register('pincode', { required: 'Pincode is required' })}
                onChange={(e) => handlePincodeChange(e.target.value)}
                className={styles.input}
              />
              {errors.pincode && <p className={styles.error}>{errors.pincode.message}</p>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="city" className={styles.label}>City</label>
              <input type="text" id="city" {...register('city')} readOnly className={styles.input} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="district" className={styles.label}>District</label>
              <input type="text" id="district" {...register('district')} readOnly className={styles.input} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="state" className={styles.label}>State</label>
              <input type="text" id="state" {...register('state')} readOnly className={styles.input} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="country" className={styles.label}>Country</label>
              <input type="text" id="country" {...register('country')} readOnly className={styles.input} />
            </div>

            <button type="submit" className={styles.submitButton}>Submit</button>
          </form>
        
      </div>
    </div>
  );
};

export default RegistrationFormReactHook;
