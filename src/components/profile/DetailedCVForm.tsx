import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useForm, useFieldArray, SubmitHandler, Controller } from 'react-hook-form';
import { collection, doc, setDoc, getDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { BaseUser } from '../../types/user';
import type { DetailedCV, WorkExperience, Education, Internship, Certificate, Language, Hobby, Skill, CVSection } from '../../types/cv';
import { Button, TextField, Typography, Box, Grid, IconButton, FormControl, FormControlLabel, Checkbox, MenuItem, Select, InputLabel, Slider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, isValid, parse } from 'date-fns';
import { parseISO } from 'date-fns/parseISO';
import { nl } from 'date-fns/locale/nl';
import './datepicker-custom.css';

// Helper functie om te zorgen dat er geen objecten direct worden gerenderd
const stringToReactNode = (value: any): string | number | null => {
  if (value === null || value === undefined) return null;
  if (typeof value === 'string' || typeof value === 'number') return value;
  if (value instanceof Date) return value.toLocaleDateString();
  // Check if the value is a React element
  if (value && typeof value === 'object' && '$$typeof' in value) {
    console.error('React element cannot be rendered directly as text', value);
    return null; // Don't try to render React elements as strings
  }
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
};

// Interface voor Firebase Timestamp
interface FirebaseTimestamp {
  seconds: number;
  nanoseconds: number;
}

// Type guard functie om te controleren of een object een Firebase Timestamp is
function isFirebaseTimestamp(obj: any): obj is FirebaseTimestamp {
  return obj && typeof obj === 'object' && 'seconds' in obj && 'nanoseconds' in obj;
}

// Interface voor adresgegevens
interface Address {
  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;
  country: string;
}

// Interface voor persoonlijke gegevens sectie
interface PersonalDetails {
  displayName: string;
  email: string;
  phoneNumber: string;
  address: Address;
  profileImageURL?: string;
}

interface DetailedCVFormProps {
  user: BaseUser;
  onSuccess: () => void;
  onError: (message: string) => void;
  setLoading: (loading: boolean) => void;
}

type DateToTimestamp<T> = {
  [K in keyof T]: T[K] extends Timestamp | null
    ? Date | null
    : T[K] extends object
    ? DateToTimestamp<T[K]>
    : T[K];
};

// Interface aanpassing om de vaardigheden toe te voegen
// Gebruik alleen de meest volledige interface definitie met alle velden en optionele beschrijvingen
interface DetailedCVFormInputs {
  overMij: string;
  werkervaring: {
    id: string;
    functie: string;
    bedrijf: string;
    startDatum: Date | null;
    eindDatum: Date | null;
    beschrijving: string;
    isHuidigeFunctie: boolean;
  }[];
  opleiding: {
    id: string;
    opleiding: string;
    instituut: string;
    startDatum: Date | null;
    eindDatum: Date | null;
    beschrijving: string;
    isHuidigeOpleiding: boolean;
  }[];
  stages: {
    id: string;
    functie: string;
    bedrijf: string;
    startDatum: Date | null;
    eindDatum: Date | null;
    beschrijving: string;
    isHuidigeStage: boolean;
  }[];
  certificaten: {
    id: string;
    naam: string;
    uitgever: string;
    datum: Date | null;
    beschrijving: string;
  }[];
  talen: {
    id: string;
    taal: string;
    niveau: string;
    beschrijving?: string;
  }[];
  hobbys: {
    id: string;
    naam: string;
    beschrijving?: string;
  }[];
  vaardigheden: {
    id: string;
    naam: string;
    type: 'soft' | 'hard';
    niveau: number;
    beschrijving?: string;
  }[];
}

// Helper function om een uniek ID te genereren
const generateUniqueId = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

// Functie om Firestore Timestamp om te zetten naar Date
const convertToDate = (timeStamp: FirebaseTimestamp | Date | null): Date | null => {
  if (!timeStamp) return null;
  
  if (timeStamp instanceof Date) return timeStamp;
  
  // Check of het een object is met een seconds property
  if (typeof timeStamp === 'object' && 'seconds' in timeStamp) {
    return new Date(timeStamp.seconds * 1000);
  }
  
  // Als het een numerieke waarde is
  if (typeof timeStamp === 'number') {
    return new Date(timeStamp);
  }
  
  // Als het een string is die een datum voorstelt
  if (typeof timeStamp === 'string') {
    const date = new Date(timeStamp);
    return isNaN(date.getTime()) ? null : date;
  }
  
  return null;
};

// Helper functie om een datum naar een string te formatteren voor invoervelden
const formatDateForInput = (date: Date | FirebaseTimestamp | null | undefined): string => {
  if (!date) return '';
  
  // Converteer eerst naar Date object
  const dateObj = convertToDate(date);
  if (!dateObj) return '';
  
  // Format als YYYY-MM-DD voor input type="date"
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};

// Helper functie om een string naar Timestamp te converteren
const stringToTimestamp = (dateString: string | null): Timestamp | null => {
  if (!dateString) return null;
  
  const date = new Date(dateString);
  return Timestamp.fromDate(date);
};

// Custom DatePicker component voor hergebruik
interface CustomDatePickerProps {
  name: string;
  control: any; // Control uit react-hook-form
  label: string;
  errors: any; // Pass errors object
  placeholder?: string;
  isDisabled?: boolean;
  maxDate?: Date | null;
  minDate?: Date | null;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  name,
  control,
  label,
  errors,
  isDisabled = false,
  placeholder = "Selecteer een datum",
  minDate,
  maxDate
}) => {
  return (
    <div>
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <Controller
        name={name}
        control={control}
        rules={{ required: `${label || 'Datum'} is verplicht` }}
        render={({ field: { onChange, onBlur, value, ref } }) => {
          // Converteer value naar een Date object als het niet null is en geen Date object
          let dateValue: Date | null = null;
          
          if (value) {
            try {
              if (value instanceof Date) {
                dateValue = value;
              } else if (typeof value === 'object' && value !== null && 'seconds' in value) {
                // FirebaseTimestamp
                dateValue = new Date(value.seconds * 1000);
              } else if (typeof value === 'string') {
                // Probeer string te converteren naar Date
                const parsedDate = new Date(value);
                dateValue = !isNaN(parsedDate.getTime()) ? parsedDate : null;
              } else if (typeof value === 'number') {
                // Timestamp in milliseconden
                dateValue = new Date(value);
              }
            } catch (error) {
              console.error(`Error converting date for ${name}:`, error);
              dateValue = null;
            }
          }
          
          return (
            <input
              type="date"
              onChange={(e) => {
                const date = e.target.value ? new Date(e.target.value) : null;
                onChange(date);
              }}
              onBlur={onBlur}
              disabled={isDisabled}
              value={dateValue ? dateValue.toISOString().split('T')[0] : ''}
              className={`w-full px-3 py-2 border ${errors && errors[name.split('.')[0]] ? 'border-red-500' : 'border-gray-300'} rounded-md`}
              aria-invalid={errors && errors[name.split('.')[0]] ? "true" : "false"}
            />
          );
        }}
      />
      {/* Render error message if exists */}
      {errors && errors[name.split('.')[0]] && (
        <p className="mt-1 text-sm text-red-600" role="alert">
          Vul een geldige datum in
        </p>
      )}
    </div>
  );
};

const DetailedCVForm: React.FC<DetailedCVFormProps> = ({ 
  user, 
  onSuccess, 
  onError, 
  setLoading 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [cvData, setCvData] = useState<DetailedCV | null>(null);
  const [activeSection, setActiveSection] = useState<CVSection>('overMij');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Verplaats useMemo naar binnen de component
  const defaultValues = useMemo(() => ({
    overMij: '',
    werkervaring: [],
    opleiding: [],
    stages: [],
    certificaten: [],
    talen: [],
    hobbys: [],
    vaardigheden: [],
  }), []);
  
  const { register, control, handleSubmit, reset, formState: { errors }, getValues, watch } = useForm<DetailedCVFormInputs>({
    defaultValues
  });
  
  // Field arrays voor elk onderdeel van het CV
  const { 
    fields: certificatenFields, 
    append: appendCertificaat, 
    remove: removeCertificaat 
  } = useFieldArray({
    control,
    name: 'certificaten'
  });

  const { 
    fields: opleidingFields, 
    append: appendOpleiding, 
    remove: removeOpleiding 
  } = useFieldArray({
    control,
    name: 'opleiding'
  });

  const { 
    fields: stagesFields, 
    append: appendStage, 
    remove: removeStage 
  } = useFieldArray({
    control,
    name: 'stages'
  });

  const { 
    fields: werkervaringFields, 
    append: appendWerkervaring, 
    remove: removeWerkervaring 
  } = useFieldArray({
    control,
    name: 'werkervaring'
  });

  // Field array voor talen
  const { 
    fields: talenFields, 
    append: appendTaal, 
    remove: removeTaal 
  } = useFieldArray({
    control,
    name: 'talen'
  });

  // Field array voor hobby's
  const { 
    fields: hobbysFields, 
    append: appendHobby, 
    remove: removeHobby 
  } = useFieldArray({
    control,
    name: 'hobbys'
  });

  // Field array voor vaardigheden
  const { 
    fields: vaardighedenFields, 
    append: appendVaardigheid, 
    remove: removeVaardigheid 
  } = useFieldArray({
    control,
    name: 'vaardigheden'
  });

  // Haal de CV-gegevens en gebruikersgegevens op bij het laden van de component
  useEffect(() => {
    const fetchData = async () => {
      if (!user.id) {
        setIsLoading(false);
        return;
      }

      try {
        // 1. Haal de gebruikersgegevens op
        const userDocRef = doc(db, 'users', user.id);
        const userDocSnap = await getDoc(userDocRef);
        
        // 2. Haal de cv subcollectie gegevens op
        const cvDocRef = doc(db, 'users', user.id, 'cv', 'main');
        const cvDocSnap = await getDoc(cvDocRef);

        // Bereid de formulierdata voor
        let formData: Partial<DetailedCVFormInputs> = {
          // Standaardwaarden voor persoonlijke gegevens
          werkervaring: [],
          opleiding: [],
          stages: [],
          certificaten: [],
          talen: [],
          hobbys: [],
          vaardigheden: []
        };

        // Verwerk gebruikersgegevens als die bestaan
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          
          // Controleer of er een detailedCV veld is in userData
          if (userData.detailedCV) {
            const detailedCV = userData.detailedCV;
            
            // CV data toevoegen aan formulierdata
            formData = {
              ...formData,
              overMij: detailedCV.overMij || '',
              werkervaring: (detailedCV.werkervaring || []).map((werk: any) => ({
                ...werk,
                startDatum: werk.startDatum ? convertToDate(werk.startDatum) : null,
                eindDatum: werk.eindDatum ? convertToDate(werk.eindDatum) : null,
                isHuidigeFunctie: Boolean(werk.isHuidigeFunctie)
              })),
              opleiding: (detailedCV.opleiding || []).map((opl: any) => ({
                ...opl,
                startDatum: opl.startDatum ? convertToDate(opl.startDatum) : null,
                eindDatum: opl.eindDatum ? convertToDate(opl.eindDatum) : null,
                isHuidigeOpleiding: Boolean(opl.isHuidigeOpleiding)
              })),
              stages: (detailedCV.stages || []).map((stage: any) => ({
                ...stage,
                startDatum: stage.startDatum ? convertToDate(stage.startDatum) : null,
                eindDatum: stage.eindDatum ? convertToDate(stage.eindDatum) : null,
                isHuidigeStage: Boolean(stage.isHuidigeStage)
              })),
              certificaten: (detailedCV.certificaten || []).map((cert: any) => ({
                id: cert.id || generateUniqueId(),
                naam: cert.naam || '',
                uitgever: cert.uitgever || '',
                datum: cert.datum ? convertToDate(cert.datum) : null,
                beschrijving: cert.beschrijving || ''
              })),
              talen: Array.isArray(detailedCV.talen) ? detailedCV.talen.map((taal: any) => ({
                ...taal,
                niveau: taal.niveau || 'Basis',
                beschrijving: taal.beschrijving || ''
              })) : [],
              hobbys: Array.isArray(detailedCV.hobbys) ? detailedCV.hobbys.map((hobby: any) => ({
                ...hobby,
                naam: hobby.naam || '',
                beschrijving: hobby.beschrijving || ''
              })) : [],
              vaardigheden: Array.isArray(detailedCV.vaardigheden) ? detailedCV.vaardigheden.map((vaardigheid: any) => ({
                ...vaardigheid,
                type: vaardigheid.type === 'soft' || vaardigheid.type === 'hard' ? vaardigheid.type : 'soft',
                niveau: typeof vaardigheid.niveau === 'number' ? vaardigheid.niveau : 1,
                beschrijving: vaardigheid.beschrijving || ''
              })) : []
            };
          } else {
            // Als er geen detailedCV is, gebruik de normale gebruikersgegevens
            formData = {
              ...formData,
              werkervaring: (userData.werkervaring || []).map((werk: any) => ({
                ...werk,
                startDatum: werk.startDatum ? convertToDate(werk.startDatum) : null,
                eindDatum: werk.eindDatum ? convertToDate(werk.eindDatum) : null
              })),
              opleiding: (userData.opleiding || []).map((opl: any) => ({
                ...opl,
                startDatum: opl.startDatum ? convertToDate(opl.startDatum) : null,
                eindDatum: opl.eindDatum ? convertToDate(opl.eindDatum) : null
              })),
              stages: (userData.stages || []).map((stage: any) => ({
                ...stage,
                startDatum: stage.startDatum ? convertToDate(stage.startDatum) : null,
                eindDatum: stage.eindDatum ? convertToDate(stage.eindDatum) : null
              })),
              talen: userData.talen || [],
              hobbys: Array.isArray(userData.hobbys) ? userData.hobbys : [],
              vaardigheden: userData.vaardigheden || []
            };
          }
        }

        // Verwerk CV-gegevens uit subcollectie als die bestaan
        if (cvDocSnap.exists()) {
          const data = cvDocSnap.data() as DetailedCV;
          setCvData(data);
          
          // CV data toevoegen aan formulierdata alleen als er geen detailedCV in userData was
          if (!userDocSnap.exists() || !userDocSnap.data().detailedCV) {
            formData = {
              ...formData,
              overMij: data.overMij || '',
              werkervaring: (data.werkervaring || []).map((werk: any) => ({
                ...werk,
                startDatum: werk.startDatum ? convertToDate(werk.startDatum) : null,
                eindDatum: werk.eindDatum ? convertToDate(werk.eindDatum) : null,
                isHuidigeFunctie: Boolean(werk.isHuidigeFunctie)
              })),
              opleiding: (data.opleiding || []).map((opl: any) => ({
                ...opl,
                startDatum: opl.startDatum ? convertToDate(opl.startDatum) : null,
                eindDatum: opl.eindDatum ? convertToDate(opl.eindDatum) : null,
                isHuidigeOpleiding: Boolean(opl.isHuidigeOpleiding)
              })),
              stages: (data.stages || []).map((stage: any) => ({
                ...stage,
                startDatum: stage.startDatum ? convertToDate(stage.startDatum) : null,
                eindDatum: stage.eindDatum ? convertToDate(stage.eindDatum) : null,
                isHuidigeStage: Boolean(stage.isHuidigeStage)
              })),
              certificaten: (data.certificaten || []).map((cert: any) => ({
                id: cert.id || generateUniqueId(),
                naam: cert.naam || '',
                uitgever: cert.uitgever || '',
                datum: cert.datum ? convertToDate(cert.datum) : null,
                beschrijving: cert.beschrijving || ''
              })),
              talen: Array.isArray(data.talen) ? data.talen.map((taal: any) => ({
                ...taal,
                niveau: taal.niveau || 'Basis',
                beschrijving: taal.beschrijving || ''
              })) : [],
              hobbys: Array.isArray(data.hobbys) ? data.hobbys.map((hobby: any) => ({
                ...hobby,
                naam: hobby.naam || '',
                beschrijving: hobby.beschrijving || ''
              })) : [],
              vaardigheden: Array.isArray(data.vaardigheden) ? data.vaardigheden.map((vaardigheid: any) => ({
                ...vaardigheid,
                type: vaardigheid.type === 'soft' || vaardigheid.type === 'hard' ? vaardigheid.type : 'soft',
                niveau: typeof vaardigheid.niveau === 'number' ? vaardigheid.niveau : 1,
                beschrijving: vaardigheid.beschrijving || ''
              })) : []
            };
          }
        }

        // Reset het formulier met de gecombineerde gegevens
        reset(formData as DetailedCVFormInputs);
      } catch (error) {
        console.error('Fout bij ophalen gegevens:', error);
        onError('Er is een fout opgetreden bij het ophalen van je gegevens');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user.id, reset, onError]);

  // Handle form submission
  const onSubmit = async (data: DetailedCVFormInputs) => {
    if (!user.id) {
      onError('Gebruiker ID is niet beschikbaar');
      return;
    }

    try {
      setLoading(true);
      setIsSubmitting(true);

      console.log('Form data being saved:', data);

      // Zorg ervoor dat alle velden een geldige waarde hebben (geen undefined)
      const cvData: DetailedCV = {
        overMij: data.overMij || '', // Vervang undefined door lege string
        werkervaring: data.werkervaring.map((werk: DateToTimestamp<WorkExperience>) => ({
          id: werk.id || generateUniqueId(),
          functie: werk.functie || '',
          bedrijf: werk.bedrijf || '',
          startDatum: werk.startDatum ? Timestamp.fromDate(werk.startDatum) : null,
          eindDatum: werk.eindDatum ? Timestamp.fromDate(werk.eindDatum) : null,
          beschrijving: werk.beschrijving || '',
          isHuidigeFunctie: Boolean(werk.isHuidigeFunctie)
        })),
        opleiding: data.opleiding.map((opl: DateToTimestamp<Education>) => ({
          id: opl.id || generateUniqueId(),
          opleiding: opl.opleiding || '',
          instituut: opl.instituut || '',
          startDatum: opl.startDatum ? Timestamp.fromDate(opl.startDatum) : null,
          eindDatum: opl.eindDatum ? Timestamp.fromDate(opl.eindDatum) : null,
          beschrijving: opl.beschrijving || '',
          isHuidigeOpleiding: Boolean(opl.isHuidigeOpleiding)
        })),
        stages: data.stages.map((stage: DateToTimestamp<Internship>) => ({
          id: stage.id || generateUniqueId(),
          functie: stage.functie || '',
          bedrijf: stage.bedrijf || '',
          startDatum: stage.startDatum ? Timestamp.fromDate(stage.startDatum) : null,
          eindDatum: stage.eindDatum ? Timestamp.fromDate(stage.eindDatum) : null,
          beschrijving: stage.beschrijving || '',
          isHuidigeStage: Boolean(stage.isHuidigeStage)
        })),
        certificaten: data.certificaten.map((cert: any) => ({
          id: cert.id || generateUniqueId(),
          naam: cert.naam || '',
          uitgever: cert.uitgever || '',
          datum: cert.datum ? Timestamp.fromDate(cert.datum) : null,
          beschrijving: cert.beschrijving || '',
        })),
        talen: data.talen.map(taal => ({
          id: taal.id || generateUniqueId(),
          taal: taal.taal || '',
          niveau: taal.niveau || 'Basis',
          beschrijving: taal.beschrijving || ''
        })),
        hobbys: data.hobbys.map(hobby => ({
          id: hobby.id || generateUniqueId(),
          naam: hobby.naam || '',
          beschrijving: hobby.beschrijving || ''
        })),
        vaardigheden: data.vaardigheden.map(vaardigheid => ({
          id: vaardigheid.id || generateUniqueId(),
          naam: vaardigheid.naam || '',
          type: vaardigheid.type === 'soft' ? 'soft' : 'hard',
          niveau: typeof vaardigheid.niveau === 'number' ? vaardigheid.niveau : 1,
          beschrijving: vaardigheid.beschrijving || ''
        }))
      };

      console.log('Saving CV data to Firestore:', cvData);

      const userRef = doc(db, 'users', user.id);
      await setDoc(userRef, {
        detailedCV: cvData,
        updatedAt: new Date()
      }, { merge: true });

      console.log('CV data saved successfully');
      onSuccess();
    } catch (error) {
      console.error('Fout bij opslaan gegevens:', error);
      onError('Er is een fout opgetreden bij het opslaan van je gegevens');
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };

  // Helper functie voor het toevoegen van certificaten
  const addCertificaat = useCallback(() => {
    setTimeout(() => {
      appendCertificaat({
        id: String(Date.now()),
        naam: '',
        uitgever: '',
        datum: null,
        beschrijving: ''
      });
    }, 0);
  }, [appendCertificaat]);

  // Helper functie voor het toevoegen van een opleiding
  const addOpleiding = useCallback(() => {
    setTimeout(() => {
      appendOpleiding({
        id: String(Date.now()),
        opleiding: '',
        instituut: '',
        beschrijving: '',
        startDatum: null,
        eindDatum: null,
        isHuidigeOpleiding: false
      });
    }, 0);
  }, [appendOpleiding]);

  // Helper functie voor het toevoegen van een stage
  const addStage = useCallback(() => {
    setTimeout(() => {
      appendStage({
        id: String(Date.now()),
        bedrijf: '',
        functie: '',
        beschrijving: '',
        startDatum: null,
        eindDatum: null,
        isHuidigeStage: false
      });
    }, 0);
  }, [appendStage]);

  // Helper functie voor het toevoegen van een werkervaring
  const addWerkervaring = useCallback(() => {
    setTimeout(() => {
      appendWerkervaring({
        id: String(Date.now()),
        functie: '',
        bedrijf: '',
        startDatum: null,
        eindDatum: null,
        beschrijving: '',
        isHuidigeFunctie: false
      });
    }, 0);
  }, [appendWerkervaring]);

  // Helper functie voor het toevoegen van een taal
  const addTaal = useCallback(() => {
    setTimeout(() => {
      appendTaal({
        id: String(Date.now()),
        taal: '',
        niveau: 'Basis'
      });
    }, 0);
  }, [appendTaal]);

  // Helper functie voor het toevoegen van een hobby
  const addHobby = useCallback(() => {
    setTimeout(() => {
      appendHobby({
        id: String(Date.now()),
        naam: ''
      });
    }, 0);
  }, [appendHobby]);

  // Helper functie voor het toevoegen van een vaardigheid
  const addVaardigheid = useCallback((type: 'soft' | 'hard') => {
    setTimeout(() => {
      appendVaardigheid({
        id: String(Date.now()),
        naam: '',
        type: type,
        niveau: 1
      });
    }, 0);
  }, [appendVaardigheid]);

  // Pas de sections array aan om vaardigheden toe te voegen
  const sections: CVSection[] = ['overMij', 'werkervaring', 'opleiding', 'stages', 'certificaten', 'talen', 'hobbys', 'vaardigheden'];

  // Vertaal de sectienamen voor weergave
  const getSectionName = (section: CVSection): string => {
    switch(section) {
      case 'overMij': return 'Over mij';
      case 'werkervaring': return 'Werkervaring';
      case 'opleiding': return 'Opleiding';
      case 'stages': return 'Stages';
      case 'certificaten': return 'Certificaten';
      case 'talen': return 'Talen';
      case 'hobbys': return 'Hobby\'s';
      case 'vaardigheden': return 'Vaardigheden';
      default: return section;
    }
  };

  // Renderlogica
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        <div className="ml-4">CV gegevens laden...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Over mij sectie */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">{getSectionName('overMij')}</h3>
          <div className="bg-white rounded-lg">
            <textarea
              {...register('overMij')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              rows={5}
              placeholder="Vertel iets over jezelf, je motivie en ambities"
            />
          </div>
        </div>

        {/* Werkervaring sectie */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">{getSectionName('werkervaring')}</h3>
          <div className="bg-white rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <button
                type="button"
                onClick={addWerkervaring}
                className="ml-auto px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
              >
                + Toevoegen
              </button>
            </div>

            {werkervaringFields.length === 0 && (
              <p className="text-gray-500 italic mb-4">Nog geen werkervaring toegevoegd.</p>
            )}

            {werkervaringFields.map((field, index) => (
              <div key={field.id} className="mb-6 p-4 border border-gray-200 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Functie</label>
                    <input
                      {...register(`werkervaring.${index}.functie` as const, { required: 'Functie is verplicht' })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      aria-invalid={errors.werkervaring?.[index]?.functie ? "true" : "false"}
                    />
                    {errors.werkervaring?.[index]?.functie && (
                      <p className="mt-1 text-sm text-red-600" role="alert">
                        {typeof errors.werkervaring[index]?.functie?.message === 'string' 
                          ? errors.werkervaring[index]?.functie?.message 
                          : 'Functie is verplicht'}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bedrijf</label>
                    <input
                      {...register(`werkervaring.${index}.bedrijf` as const, { required: 'Bedrijf is verplicht' })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      aria-invalid={errors.werkervaring?.[index]?.bedrijf ? "true" : "false"}
                    />
                     {errors.werkervaring?.[index]?.bedrijf && (
                      <p className="mt-1 text-sm text-red-600" role="alert">
                        {typeof errors.werkervaring[index]?.bedrijf?.message === 'string' 
                          ? errors.werkervaring[index]?.bedrijf?.message 
                          : 'Bedrijf is verplicht'}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <CustomDatePicker
                      name={`werkervaring.${index}.startDatum` as const}
                      control={control}
                      label="Startdatum"
                      errors={errors}
                    />
                  </div>
                  <div>
                    <div className="flex items-center mb-1">
                      <label className="block text-sm font-medium text-gray-700">Einddatum</label>
                      <div className="ml-4">
                        <input
                          type="checkbox"
                          {...register(`werkervaring.${index}.isHuidigeFunctie` as const)}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-600">Huidige functie</span>
                      </div>
                    </div>
                    <CustomDatePicker
                      name={`werkervaring.${index}.eindDatum` as const}
                      control={control}
                      label=""
                      errors={errors}
                      isDisabled={Boolean(watch(`werkervaring.${index}.isHuidigeFunctie`))}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Beschrijving</label>
                  <textarea
                    {...register(`werkervaring.${index}.beschrijving` as const)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Beschrijf je taken en verantwoordelijkheden"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeWerkervaring(index)}
                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md"
                  >
                    Verwijderen
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Opleiding sectie */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">{getSectionName('opleiding')}</h3>
          <div className="bg-white rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <button
                type="button"
                onClick={addOpleiding}
                className="ml-auto px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
              >
                + Toevoegen
              </button>
            </div>

            {opleidingFields.length === 0 && (
              <p className="text-gray-500 italic mb-4">Nog geen opleidingen toegevoegd.</p>
            )}

            {opleidingFields.map((field, index) => (
              <div key={field.id} className="mb-6 p-4 border border-gray-200 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Opleidingsnaam</label>
                    <input
                      {...register(`opleiding.${index}.opleiding` as const, { required: 'Opleidingsnaam is verplicht' })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      aria-invalid={errors.opleiding?.[index]?.opleiding ? "true" : "false"}
                    />
                     {errors.opleiding?.[index]?.opleiding && (
                      <p className="mt-1 text-sm text-red-600" role="alert">{errors.opleiding[index]?.opleiding?.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Onderwijsinstelling</label>
                    <input
                      {...register(`opleiding.${index}.instituut` as const, { required: 'Onderwijsinstelling is verplicht' })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      aria-invalid={errors.opleiding?.[index]?.instituut ? "true" : "false"}
                    />
                    {errors.opleiding?.[index]?.instituut && (
                      <p className="mt-1 text-sm text-red-600" role="alert">{errors.opleiding[index]?.instituut?.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <CustomDatePicker
                      name={`opleiding.${index}.startDatum` as const}
                      control={control}
                      label="Startdatum"
                      errors={errors}
                    />
                  </div>
                  <div>
                    <div className="flex items-center mb-1">
                      <label className="block text-sm font-medium text-gray-700">Einddatum</label>
                      <div className="ml-4">
                        <input
                          type="checkbox"
                          {...register(`opleiding.${index}.isHuidigeOpleiding` as const)}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-600">Huidige opleiding</span>
                      </div>
                    </div>
                    <CustomDatePicker
                      name={`opleiding.${index}.eindDatum` as const}
                      control={control}
                      label=""
                      errors={errors}
                      isDisabled={Boolean(watch(`opleiding.${index}.isHuidigeOpleiding`))}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Beschrijving</label>
                  <textarea
                    {...register(`opleiding.${index}.beschrijving` as const)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Beschrijf de opleiding en relevante informatie"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeOpleiding(index)}
                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md"
                  >
                    Verwijderen
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stages sectie */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">{getSectionName('stages')}</h3>
          <div className="bg-white rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <button
                type="button"
                onClick={addStage}
                className="ml-auto px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
              >
                + Toevoegen
              </button>
            </div>

            {stagesFields.length === 0 && (
              <p className="text-gray-500 italic mb-4">Nog geen stages toegevoegd.</p>
            )}

            {stagesFields.map((field, index) => (
              <div key={field.id} className="mb-6 p-4 border border-gray-200 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Functie</label>
                    <input
                      {...register(`stages.${index}.functie` as const, { required: 'Functie is verplicht' })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      aria-invalid={errors.stages?.[index]?.functie ? "true" : "false"}
                    />
                     {errors.stages?.[index]?.functie && (
                      <p className="mt-1 text-sm text-red-600" role="alert">{errors.stages[index]?.functie?.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bedrijf</label>
                    <input
                      {...register(`stages.${index}.bedrijf` as const, { required: 'Bedrijf is verplicht' })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      aria-invalid={errors.stages?.[index]?.bedrijf ? "true" : "false"}
                    />
                    {errors.stages?.[index]?.bedrijf && (
                      <p className="mt-1 text-sm text-red-600" role="alert">{errors.stages[index]?.bedrijf?.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <CustomDatePicker
                      name={`stages.${index}.startDatum` as const}
                      control={control}
                      label="Startdatum"
                      errors={errors}
                    />
                  </div>
                  <div>
                    <CustomDatePicker
                      name={`stages.${index}.eindDatum` as const}
                      control={control}
                      label="Einddatum"
                      errors={errors}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Beschrijving</label>
                  <textarea
                    {...register(`stages.${index}.beschrijving` as const)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Beschrijf je stage en verantwoordelijkheden"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeStage(index)}
                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md"
                  >
                    Verwijderen
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certificaten sectie */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">{getSectionName('certificaten')}</h3>
          <div className="bg-white rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <button
                type="button"
                onClick={addCertificaat}
                className="ml-auto px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
              >
                + Toevoegen
              </button>
            </div>

            {certificatenFields.length === 0 && (
              <p className="text-gray-500 italic mb-4">Nog geen certificaten toegevoegd.</p>
            )}

            {certificatenFields.map((field, index) => (
              <div key={field.id} className="mb-6 p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between mb-4">
                  <h3 className="font-medium">Certificaat {index + 1}</h3>
                  <button
                    type="button"
                    onClick={() => removeCertificaat(index)}
                    className="text-red-500 px-2 py-1 rounded hover:bg-red-100"
                  >
                    X
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Naam certificaat</label>
                    <input
                      {...register(`certificaten.${index}.naam` as const, { required: 'Naam certificaat is verplicht' })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      aria-invalid={errors.certificaten?.[index]?.naam ? "true" : "false"}
                    />
                    {errors.certificaten?.[index]?.naam && (
                      <p className="mt-1 text-sm text-red-600" role="alert">
                        {typeof errors.certificaten[index]?.naam?.message === 'string' 
                          ? errors.certificaten[index]?.naam?.message 
                          : 'Naam certificaat is verplicht'}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Uitgever</label>
                    <input
                      {...register(`certificaten.${index}.uitgever` as const, { required: 'Uitgever is verplicht' })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      aria-invalid={errors.certificaten?.[index]?.uitgever ? "true" : "false"}
                    />
                    {errors.certificaten?.[index]?.uitgever && (
                      <p className="mt-1 text-sm text-red-600" role="alert">
                        {typeof errors.certificaten[index]?.uitgever?.message === 'string' 
                          ? errors.certificaten[index]?.uitgever?.message 
                          : 'Uitgever is verplicht'}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <CustomDatePicker
                      name={`certificaten.${index}.datum` as const}
                      control={control}
                      label="Datum"
                      errors={errors}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Beschrijving</label>
                  <textarea
                    {...register(`certificaten.${index}.beschrijving` as const)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Beschrijf het certificaat en relevante informatie"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Talen sectie */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">{getSectionName('talen')}</h3>
          <div className="bg-white rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <button
                type="button"
                onClick={addTaal}
                className="ml-auto px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
              >
                + Toevoegen
              </button>
            </div>

            {talenFields.length === 0 && (
              <p className="text-gray-500 italic mb-4">Nog geen talen toegevoegd.</p>
            )}

            {talenFields.map((field, index) => (
              <div key={field.id} className="mb-6 p-4 border border-gray-200 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Taal</label>
                    <input
                      {...register(`talen.${index}.taal` as const, { required: 'Taal is verplicht' })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      aria-invalid={errors.talen?.[index]?.taal ? "true" : "false"}
                    />
                    {errors.talen?.[index]?.taal && (
                      <p className="mt-1 text-sm text-red-600" role="alert">{errors.talen[index]?.taal?.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Niveau</label>
                    <select
                      {...register(`talen.${index}.niveau` as const)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="Basis">Basis</option>
                      <option value="Gemiddeld">Gemiddeld</option>
                      <option value="Goed">Goed</option>
                      <option value="Vloeiend">Vloeiend</option>
                      <option value="Moedertaal">Moedertaal</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeTaal(index)}
                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md"
                  >
                    Verwijderen
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hobbys sectie */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">{getSectionName('hobbys')}</h3>
          <div className="bg-white rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <button
                type="button"
                onClick={addHobby}
                className="ml-auto px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
              >
                + Toevoegen
              </button>
            </div>

            {hobbysFields.length === 0 && (
              <p className="text-gray-500 italic mb-4">Nog geen hobby's toegevoegd.</p>
            )}

            {hobbysFields.map((field, index) => (
              <div key={field.id} className="mb-6 p-4 border border-gray-200 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Naam</label>
                    <input
                      {...register(`hobbys.${index}.naam` as const, { required: 'Naam is verplicht' })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      aria-invalid={errors.hobbys?.[index]?.naam ? "true" : "false"}
                    />
                    {errors.hobbys?.[index]?.naam && (
                      <p className="mt-1 text-sm text-red-600" role="alert">{errors.hobbys[index]?.naam?.message}</p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeHobby(index)}
                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md"
                  >
                    Verwijderen
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vaardigheden sectie */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">{getSectionName('vaardigheden')}</h3>
          <div className="bg-white rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <div>
                <button
                  type="button"
                  onClick={() => addVaardigheid('soft')}
                  className="mr-2 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                >
                  Soft Skills
                </button>
                <button
                  type="button"
                  onClick={() => addVaardigheid('hard')}
                  className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                >
                  Hard Skills
                </button>
              </div>
            </div>

            {vaardighedenFields.length === 0 && (
              <p className="text-gray-500 italic mb-4">Nog geen vaardigheden toegevoegd.</p>
            )}

            {vaardighedenFields.map((field, index) => (
              <div key={field.id} className="mb-6 p-4 border border-gray-200 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Naam</label>
                    <input
                      {...register(`vaardigheden.${index}.naam` as const, { required: 'Naam is verplicht' })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      aria-invalid={errors.vaardigheden?.[index]?.naam ? "true" : "false"}
                    />
                    {errors.vaardigheden?.[index]?.naam && (
                      <p className="mt-1 text-sm text-red-600" role="alert">{errors.vaardigheden[index]?.naam?.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select
                      {...register(`vaardigheden.${index}.type` as const)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="soft">Soft Skill</option>
                      <option value="hard">Hard Skill</option>
                    </select>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Niveau</label>
                  <input
                    {...register(`vaardigheden.${index}.niveau` as const, {
                      setValueAs: (value) => typeof value === 'string' ? parseInt(value, 10) || 0 : value
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    type="number"
                    min="1"
                    max="5"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeVaardigheid(index)}
                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md"
                  >
                    Verwijderen
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md"
          >
            {isSubmitting ? 'Opslaan...' : 'Opslaan'}
          </button>
        </div>
      </form>

      {/* Link om een nieuwe afspraak toe te voegen, alleen tonen voor recruiters */}
      {user.role === 'recruiter' && (
        <div className="flex justify-end">
          <a 
            href="/schedule-meeting" 
            className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Nieuwe afspraak plannen
          </a>
        </div>
      )}
    </div>
  );
};

export default DetailedCVForm;